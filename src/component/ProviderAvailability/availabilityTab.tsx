"use client";
import { Calendar, ChevronLeft, ChevronRight, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import DayCard from "@/component/ProviderAvailability/component/DayCard";
import Loader from "@/component/Spinner";
import useAvailability from "@/hooks/useAvailability";
import { useAvailabilityTab} from "@/hooks/useAvailability";
import SaveSection from "./component/SaveSection";
import SuccessModal from "@/component/SuccessModal";
import ErrorModal from "@/component/ErrorModal";
import ViewAvailabilityModal from "@/component/ProviderAvailability/component/ViewAvailabilityModal";

interface AvailabilityTabProps {
  providerId: string;
}

export default function AvailabilityTab({ providerId }: AvailabilityTabProps) {
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
  
  // ===============================
  // LOADING & ERROR fallback
  // ===============================

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-violet-50/20 to-purple-50/20">
        <Loader message="Loading your availability..." />
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-violet-50/20 to-purple-50/20 text-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-red-600 font-bold text-lg mb-2">
            Failed to load availability
          </p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );

  // ===============================
  // MAIN UI
  // ===============================

  return (
    <div className="min-h-screen   p-6">
      <div className=" mx-auto">
        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-gray-100">
          <div className="flex flex-col gap-6">
            {/* Title Section */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-5">
                <div className="bg-gradient-to-br from-chart-2 to-chart-3 p-2 md:p-4 rounded-2xl shadow-lg">
                  <Calendar className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl md:text-3xl font-black text-gray-900 mb-1">
                    Availability Manager
                  </h1>
                  <p className="text-gray-600 text-xs font-medium">
                    Set your available time slots • {dateLabel}
                  </p>
                </div>
              </div>
              {/* Total Slots Badge */}
              <div className="flex items-center gap-2 bg-gradient-to-br from-chart-2/10 to-chart-3/10 px-5 py-3 rounded-xl border-2 border-chart-2/10">
                <Sparkles size={18} className="text-chart-2" />
                <span className="text-xs font-bold text-gray-700">
                  {getTotalSlots()} Total Slots
                </span>
              </div>
            </div>

            {/* View Toggle & Navigation */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between pt-6 border-t-2 border-gray-100">
              {/* View Toggle */}
              <div className="flex  gap-0.5 md:gap-2">
                <Button
                  variant={view === "week" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setView("week");
                    setTimeOffset(0);
                  }}
                  className={`px-6 py-2 text-xs rounded-xl font-bold transition-all duration-300 ${
                    view === "week"
                      ? "bg-gradient-to-br from-chart-2/80 to-chart-3/80 text-white shadow-lg hover:from-chart-2/90 hover:to-chart-3/90"
                      : "bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-violet-200"
                  }`}
                >
                  <Clock size={16} className="mr-2" />
                  Week
                </Button>

                <Button
                  variant={view === "month" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setView("month");
                    setTimeOffset(0);
                  }}
                  className={`px-6 py-2 text-xs rounded-xl font-bold transition-all duration-300 ${
                    view === "month"
                      ? "bg-gradient-to-br from-chart-2/80 to-chart-3/80 text-white shadow-lg hover:from-violet-700 hover:to-purple-700"
                      : "bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-violet-200"
                  }`}
                >
                  <Calendar size={16} className="mr-2" />
                  Month
                </Button>

                <Button
                  variant={view === "year" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setView("year");
                    setTimeOffset(0);
                  }}
                  className={`px-6 py-2 text-xs rounded-xl font-bold transition-all duration-300 ${
                    view === "year"
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg hover:from-violet-700 hover:to-purple-700"
                      : "bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-violet-200"
                  }`}
                >
                  <Calendar size={16} className="mr-2" />
                  Year
                </Button>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={timeOffset <= 0}
                  onClick={() => setTimeOffset((prev) => prev - 1)}
                  className="px-5 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl font-semibold hover:from-gray-800 hover:to-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl border-0 disabled:from-gray-400 disabled:to-gray-500"
                >
                  <ChevronLeft size={18} className="mr-1" /> Previous
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTimeOffset((prev) => prev + 1)}
                  className="px-5 py-3 bg-gradient-to-br from-chart-2 to-chart-3 text-white rounded-xl cursor-pointer font-semibold hover:from-chart-2/90 hover:to-chart-3/90 transition-all duration-300 shadow-lg hover:shadow-xl border-0"
                >
                  Next <ChevronRight size={18} className="ml-1" />
                </Button>
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
            />
          ))}
        </div>

        {/* FOOTER SAVE */}
        <SaveSection
          setShowAvailabilityModal={setShowAvailabilityModal}
          handleSave={handleLoading}
          getTotalSlots={getTotalSlots}
          daySlots={daySlots}
        />

        {/* SAVE LOADING OVERLAY */}
        {loader && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <Loader message="Saving your availability..." />
            </div>
          </div>
        )}

        {/* MODALS */}
        <ViewAvailabilityModal
          open={showAvailabilityModal}
          onClose={() => setShowAvailabilityModal(false)}
          daySlots={daySlots}
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