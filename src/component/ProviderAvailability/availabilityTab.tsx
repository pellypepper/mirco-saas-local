"use client";
import { Calendar, ChevronLeft, ChevronRight, Sparkles, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import DayCard from "@/component/ProviderAvailability/component/DayCard";
import Loader from "@/component/Spinner";
import useAvailability from "@/hooks/useAvailability";
import { useAvailabilityTab } from "@/hooks/useAvailability";
import SaveSection from "./component/SaveSection";
import SuccessModal from "@/component/SuccessModal";
import ErrorModal from "@/component/ErrorModal";
import ViewAvailabilityModal from "@/component/ProviderAvailability/component/ViewAvailabilityModal";
import { useMainNavBar } from "@/hooks/MainNavContext";


interface AvailabilityTabProps {
  providerId: string;
}

export default function AvailabilityTab({ providerId }: AvailabilityTabProps) {
  const { isDarkMode } = useMainNavBar(); // Add this hook
  
  const {
    today,
    daySlots,
    newSlot,
    setNewSlot,
    getTotalSlots,
    errorModal,
    setErrorModal,
    successModal,
    setSuccessModal,
    loading,
    error,
    addCustomSlot,
    removeSlot,
    handleSave,
  } = useAvailability(providerId);

  const { 
    view,
    setView,
    timeOffset,
    setTimeOffset,
    datesToShow,
    dateLabel,
    handleAddSlot,
    handleRemoveSlot,
    handleLoading,
    showAvailabilityModal,
    setShowAvailabilityModal,
    loader,
    unsavedMessage,
    errorMessage,
    cancelNavigation,
    confirmNavigation
  } = useAvailabilityTab(today, addCustomSlot, removeSlot, handleSave, errorModal);

  /* THEME TOKENS */
  const bgPrimary = isDarkMode ? "bg-zinc-950" : "bg-white";
  const bgSecondary = isDarkMode ? "bg-zinc-800" : "bg-white";
  const border = isDarkMode ? "border-zinc-700" : "border-zinc-200";
  const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
  const textSecondary = isDarkMode ? "text-zinc-400" : "text-zinc-600";
  const textError = isDarkMode ? "text-red-400" : "text-red-600";
  const bgError = isDarkMode ? "bg-red-500/20" : "bg-red-100";
  const borderError = isDarkMode ? "border-red-500" : "border-red-300";
  
  if (loading)
    return (
      <div className={`flex items-center justify-center min-h-screen ${bgPrimary}`}>
        <Loader message="Loading your availability..." />
      </div>
    );

  if (error)
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen ${bgPrimary} text-center px-4`}>
        <div className={`${bgSecondary} border-2 ${border} rounded-3xl shadow-2xl p-8 max-w-md`}>
          <div className={`w-16 h-16 ${bgError} rounded-full flex items-center justify-center mx-auto mb-4 border-2 ${borderError}`}>
            <svg className={`w-8 h-8 ${textError}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className={`${textError} font-black text-xl mb-2`}>Failed to load availability</p>
          <p className={`${textSecondary} text-sm`}>{error}</p>
        </div>
      </div>
    );

  return (
    <div className={`min-h-screen ${bgPrimary} p-4 md:p-6 transition-colors duration-300`}>
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute top-0 right-1/4 w-96 h-96 bg-chart-2/30 rounded-full blur-3xl ${isDarkMode ? "opacity-5" : "opacity-5"}`}></div>
        <div className={`absolute bottom-1/4 left-1/4 w-80 h-80 bg-chart-2/30 rounded-full blur-3xl ${isDarkMode ? "opacity-5" : "opacity-10"}`}></div>
      </div>

      <div className="relative mx-auto max-w-8xl">
        {/* HERO HEADER */}
        <div className="mb-8">
          <div className="relative bg-gradient-to-br from-chart-2 to-chart-3 rounded-3xl shadow-2xl p-6 md:p-8  overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24"></div>
            
            {/* Geometric pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>

            <div className="relative">
              {/* Title Section */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="relative p-3 md:p-4 bg-chart-2 rounded-2xl shadow-lg">
                      <Calendar className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-4xl font-black text-white mb-1">
                      Availability Manager
                    </h1>
                    <p className="text-white/80 text-sm md:text-base font-medium flex items-center gap-2">
                      <Clock size={14} />
                      {dateLabel}
                    </p>
                  </div>
                </div>

                {/* Total Slots Badge */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-white rounded-2xl blur-md opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative flex items-center gap-3 bg-white/20 backdrop-blur-xl px-6 py-3 rounded-2xl border-2 border-white/30">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Sparkles size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white/70 text-xs font-bold uppercase">Total Slots</p>
                      <p className="text-2xl font-black text-white">{getTotalSlots()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* View Toggle & Navigation */}
              <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between pt-6 border-t-2 border-white/20">
                {/* View Toggle */}
                <div className="flex gap-2">
                  {[
                    { value: "week", label: "Week", icon: Clock },
                    { value: "month", label: "Month", icon: Calendar },
                    { value: "year", label: "Year", icon: Calendar }
                  ].map(({ value, label, icon: Icon }) => (
                    <Button
                      key={value}
                      size="sm"
                      onClick={() => {
                        setView(value as any);
                        setTimeOffset(0);
                      }}
                      className={`px-4 md:px-6 py-2.5 text-xs md:text-sm rounded-xl font-bold transition-all duration-300 ${
                        view === value
                          ? "bg-white text-chart-2 shadow-lg hover:bg-zinc-800 hover:text-white"
                          : "bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 hover:border-white"
                      }`}
                    >
                      <Icon size={16} className="mr-2" />
                      {label}
                    </Button>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    disabled={timeOffset <= 0}
                    onClick={() => setTimeOffset((prev) => prev - 1)}
                    className={`px-5 py-2.5 ${isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-zinc-300"} border-2 ${textPrimary} rounded-xl font-bold ${
                      isDarkMode ? "hover:bg-zinc-700" : "hover:bg-zinc-100"
                    } disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300`}
                  >
                    <ChevronLeft size={18} className="mr-1" /> Previous
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => setTimeOffset((prev) => prev + 1)}
                    className="px-5 py-2.5 bg-white text-chart-2 rounded-xl font-bold hover:bg-white/90 transition-all duration-300 shadow-lg"
                  >
                    Next <ChevronRight size={18} className="ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div
          className={`grid gap-6 mb-8 ${
            view === "week"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : view === "month"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
              : "grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7"
          }`}
        >
          {datesToShow.map((date) => (
            <DayCard
              key={date.toISOString()}
              date={date}
              today={today}
              daySlots={daySlots}
              newSlot={newSlot}
              addCustomSlot={handleAddSlot}
              removeSlot={handleRemoveSlot}
              setNewSlot={setNewSlot}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>

        {/* FOOTER SAVE */}
        <SaveSection
          setShowAvailabilityModal={setShowAvailabilityModal}
          handleSave={handleLoading}
          getTotalSlots={getTotalSlots}
          daySlots={daySlots}
               isDarkMode={isDarkMode}
        />

        {/* SAVE LOADING OVERLAY */}
        {loader && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
            <div className={`${bgSecondary} border-2 ${border} rounded-3xl p-8 shadow-2xl`}>
              <Loader message="Saving your availability..." />
            </div>
          </div>
        )}

        {/* MODALS */}
        <ViewAvailabilityModal
          open={showAvailabilityModal}
          onClose={() => setShowAvailabilityModal(false)}
          daySlots={daySlots}
               isDarkMode={isDarkMode}
        />

        {successModal && (
          <SuccessModal
            open
            message={successModal}
            onClose={() => setSuccessModal(null)}
          />
        )}

        {errorModal && (
          <ErrorModal
            open={!!errorMessage}
            title={unsavedMessage ? "Unsaved Changes" : "Something went wrong"}
            message={errorMessage || ""}
            onClose={() => {
              if (unsavedMessage) cancelNavigation();
              else setErrorModal(null);
            }}
            onConfirm={unsavedMessage ? confirmNavigation : undefined}
            confirmText="Leave"
          />
        )}
      </div>
    </div>
  );
}