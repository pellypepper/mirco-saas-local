"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import {
  fetchAvailability,
  saveAvailability,
  getProviderAvailability,
  deleteSlot,
} from "@/services/availabilityService";

import { TimeSlot , AvailabilityRecord} from "@/types/type";
import useUnsavedChangesWarning from "./useUnsavedChangeWarning";


export default function useAvailability(providerId: string) {
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return d;
  });

  const [daySlots, setDaySlots] = useState<Record<string, TimeSlot[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorModal, setErrorModal] = useState<string | null>(null);
   const [availability, setAvailability] = useState<AvailabilityRecord[]>([]);
  const [successModal, setSuccessModal] = useState<string | null>(null);
  const [newSlot, setNewSlot] = useState<
    Record<string, { start: string; end: string }>
  >({});

  // Format to AM/PM label
  const formatTime = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const suffix = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2, "0")} ${suffix}`;
  };

  // ---------------------------------------
  // LOAD AVAILABILITY FROM BACKEND
  // ---------------------------------------

const loadAvailability = useCallback(async () => {
  try {
    setLoading(true);

    const data = await fetchAvailability(providerId);

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const grouped: Record<string, TimeSlot[]> = {};

    data
      .filter((item) => item.date >= today) // ⬅️ Only today or future
      .forEach((item) => {
        if (!grouped[item.date]) grouped[item.date] = [];

        grouped[item.date].push({
          id: item.id || `${item.date}-${item.start_time}`,
          start: item.start_time,
          end: item.end_time,
          label: `${formatTime(item.start_time)} - ${formatTime(item.end_time)}`,
          isSaved: true,
        });
      });

    setDaySlots(grouped);
    setError(null);
  } catch (err: any) {
    console.error(err);
    setError(err.message || "Failed to load availability");
  } finally {
    setLoading(false);
  }
}, [providerId]);


  // ---------------------------------------
  // VALIDATION
  // ---------------------------------------

  const validateTimeSlot = (
    start: string,
    end: string,
    date: string
  ): string | null => {
    if (!start || !end) return "Please select both start and end times";

    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const startMin = sh * 60 + sm;
    const endMin = eh * 60 + em;

    if (endMin <= startMin) return "End time must be after start time";

    // Check overlap
    for (const slot of daySlots[date] || []) {
      const [slotStartH, slotStartM] = slot.start.split(":").map(Number);
      const [slotEndH, slotEndM] = slot.end.split(":").map(Number);
      const slotStart = slotStartH * 60 + slotStartM;
      const slotEnd = slotEndH * 60 + slotEndM;

      const overlap =
        (startMin >= slotStart && startMin < slotEnd) ||
        (endMin > slotStart && endMin <= slotEnd) ||
        (startMin <= slotStart && endMin >= slotEnd);

      if (overlap) return "Time slot overlaps with an existing slot";
    }

    return null;
  };

  // ---------------------------------------
  // ADD SLOT (returns boolean)
  // ---------------------------------------

  const addCustomSlot = (date: string): boolean => {
    const slotData = newSlot[date];

    if (!slotData?.start || !slotData?.end) {
      setErrorModal("Please select both start and end times");
      return false;
    }

    const error = validateTimeSlot(slotData.start, slotData.end, date);
    if (error) {
      setErrorModal(error);
      return false;
    }

    const id = `${date}-${Date.now()}`;
    const label = `${formatTime(slotData.start)} - ${formatTime(slotData.end)}`;

    setDaySlots((prev) => ({
      ...prev,
      [date]: [
        ...(prev[date] || []),
        { id, ...slotData, label, isSaved: false },
      ].sort((a, b) => a.start.localeCompare(b.start)),
    }));

    setNewSlot((prev) => ({ ...prev, [date]: { start: "", end: "" } }));
    setSuccessModal("Time slot added successfully ✅");

    return true;
  };

  // ---------------------------------------
  // REMOVE SLOT (returns boolean)
  // ---------------------------------------

  const removeSlot = async (date: string, id: string): Promise<boolean> => {
    const target = daySlots[date]?.find((s) => s.id === id);

    setDaySlots((prev) => ({
      ...prev,
      [date]: prev[date]?.filter((slot) => slot.id !== id) || [],
    }));

    try {
      // Delete only if it was saved to DB before
      if (target?.isSaved) {
        await deleteSlot(id);
      }

      setSuccessModal("Time slot removed successfully ✅");
      return true;
    } catch (err) {
      console.error("Error deleting slot:", err);
      setErrorModal("Failed to delete slot");
      return false;
    }
  };

  // ---------------------------------------
  // SAVE ONLY NEW SLOTS
  // ---------------------------------------

  const handleSave = async () => {
    const unsaved = Object.entries(daySlots).flatMap(([date, slots]) =>
      slots
        .filter((slot) => !slot.isSaved)
        .map((slot) => ({
          provider_id: providerId,
          date,
          start_time: slot.start,
          end_time: slot.end,
          is_booked: false,
        }))
    );

    if (unsaved.length === 0) {
      setErrorModal("No new time slots to save — everything is already saved.");
      return;
    }

    try {
      await saveAvailability(unsaved);
      setSuccessModal("New time slots saved successfully 🎉");

      // Mark new slots as saved
      setDaySlots((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((date) => {
          updated[date] = updated[date].map((slot) => ({
            ...slot,
            isSaved: true,
          }));
        });
        return updated;
      });
    } catch (err) {
      console.error(err);
      setErrorModal("Failed to save new availability");
    }
  };

const getTotalSlots = () => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  return Object.entries(daySlots)
    .filter(([date]) => date >= today) // only today or future
    .reduce((total, [, slots]) => total + slots.length, 0);
};


  useEffect(() => {
    if (providerId) loadAvailability();
  }, [providerId, loadAvailability]);

  useEffect( () => {
    if (!providerId) return;

    const fetch = async () => {
       setLoading(true);
      try {
        const slots = await getProviderAvailability(providerId);
        setAvailability(slots);
      } catch (err) {
        console.error("Failed to fetch availability", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [providerId]);


  return {
    today,
    days,
    daySlots,
    availability,
    newSlot,
    setNewSlot,
    loadAvailability,
    addCustomSlot,
    removeSlot,
    handleSave,
    getTotalSlots,
    loading,
    error,
    errorModal,
    setErrorModal,
    successModal,
    setSuccessModal,
  };
}


export function useAvailabilityTab  (today: Date, addCustomSlot: (date: string) => boolean, removeSlot:  (date: string, id: string) => Promise<boolean>, handleSave:  ()=>void, errorModal: string | null) {


 const [view, setView] = useState<"week" | "month" | "year">("week");
  const [timeOffset, setTimeOffset] = useState(0);
  const [loader, setLoader] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);

  // 🔹 Track unsaved changes
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
const { unsavedMessage, confirmNavigation, cancelNavigation } = useUnsavedChangesWarning(hasUnsavedChanges);

const errorMessage = unsavedMessage || errorModal


 
  //  Wrap slot actions to mark unsaved changes
  const handleAddSlot = (date: string) => {
   
    const changed = addCustomSlot(date);
 
    if (changed) setHasUnsavedChanges(true);

  };

  const handleRemoveSlot = async (date: string, id: string) => {
    const changed = await removeSlot(date, id);
    if (changed) setHasUnsavedChanges(true);
  };


  // SAVE handling
  const handleLoading = async () => {
    setLoader(true);
    await handleSave();
    setLoader(false);
    setHasUnsavedChanges(false); 
  };


  // CALENDAR date calculations
const datesToShow = useMemo(() => {
    const startDate = new Date(today);

    if (view === "week") {
      startDate.setDate(today.getDate() + timeOffset * 7);
      return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        return d;
      });
    }

    if (view === "month") {
      startDate.setMonth(today.getMonth() + timeOffset);
      startDate.setDate(1);
      const daysInMonth = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        0
      ).getDate();
      return Array.from({ length: daysInMonth }, (_, i) => {
        const d = new Date(startDate);
        d.setDate(i + 1);
        return d;
      });
    }

    if (view === "year") {
      startDate.setFullYear(today.getFullYear() + timeOffset);
      startDate.setMonth(0);
      startDate.setDate(1);

      const dates: Date[] = [];
      for (let m = 0; m < 12; m++) {
        const daysInMonth = new Date(startDate.getFullYear(), m + 1, 0).getDate();
        for (let d = 1; d <= daysInMonth; d++) {
          dates.push(new Date(startDate.getFullYear(), m, d));
        }
      }
      return dates;
    }

    return [];
  }, [today, timeOffset, view]);



  const dateLabel = useMemo(() => {
    if (view === "week") {
      const start = datesToShow[0];
      const end = datesToShow[6];
      return `${start.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} - ${end.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}`;
    }
    if (view === "month") {
      const month = datesToShow[0]?.toLocaleDateString("en-US", {
        month: "long",
      });
      const year = datesToShow[0]?.getFullYear();
      return `${month} ${year}`;
    }
    if (view === "year") return datesToShow[0]?.getFullYear().toString();

    return "";
  }, [datesToShow, view]);



  return {

    view,
    setView,
    timeOffset,
    setTimeOffset,
    loader,
    showAvailabilityModal,
    setShowAvailabilityModal,
    handleAddSlot,
    handleRemoveSlot,
    handleLoading,
    datesToShow,
    dateLabel,
    errorMessage,
    confirmNavigation,
    cancelNavigation,
    unsavedMessage,
    errorModal,
  
  }
}


export function useAvailabilityCalendar (groupedSlots: Record<string, TimeSlot[]>) {
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [weekOffset, setWeekOffset] = useState(0);

  /**(YYYY-MM-DD) for the next 7 days */
  const get7DayRange = () => {
    const start = new Date();
    start.setDate(start.getDate() + weekOffset * 7);

    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d.toISOString().split("T")[0];
    });
  };

  // For week view 
  const weekDates = get7DayRange();

  // Month view 
  const sortedDates = Object.keys(groupedSlots).sort((a, b) =>
    new Date(a).getTime() - new Date(b).getTime()
  );

  const displayDates = viewMode === "week" ? weekDates : sortedDates;

  /** next/prev */
  const hasPrevWeek = weekOffset > 0;
  const hasNextWeek = true;

  /** Time period color system */
  const getTimePeriod = (timeString: string) => {
    const hour = parseInt(timeString.split(":")[0]);
    if (hour < 12) return { label: "Morning", color: "from-amber-400 to-orange-500" };
    if (hour < 17) return { label: "Afternoon", color: "from-blue-400 to-indigo-500" };
    return { label: "Evening", color: "from-purple-400 to-pink-500" };
  };

  /** Group by morning/afternoon/evening */
  const groupSlotsByPeriod = (slots: any[]) => {
    const grouped: Record<string, any[]> = { Morning: [], Afternoon: [], Evening: [] };
    slots.forEach(slot => {
      const period = getTimePeriod(slot.start_time);
      grouped[period.label].push(slot);
    });
    return grouped;
  };


  return{
    
    viewMode,
    setViewMode,
    weekOffset,
    setWeekOffset,
    weekDates,
    displayDates,
    hasPrevWeek,
    hasNextWeek,
    getTimePeriod,
    groupSlotsByPeriod,
    sortedDates,

    
  }
}


export function useAvailabilityFooter (availability: AvailabilityRecord[], sortedDates: string[]) {
 // Today (midnight for clean comparison)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter future/present slots only
  const upcomingAvailability = availability.filter(slot => {
    const d = new Date(slot.date);
    d.setHours(0, 0, 0, 0);
    return d >= today;
  });

  // Filter dates that are today or later
  const upcomingDates = sortedDates.filter(dateStr => {
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    return d >= today;
  });

  const totalSlots = upcomingAvailability.length;
  const availableDays = upcomingDates.length;
  const avg = availableDays > 0 ? Math.round(totalSlots / availableDays) : 0;

  return {
    totalSlots,
    availableDays,
    avg
  }
}