"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";


const ConfirmModal = ({ showConfirmModal, setShowConfirmModal, selectedBooking, handleConfirmBooking }
  : {
    showConfirmModal: boolean;
    setShowConfirmModal: (open: boolean) => void;
    selectedBooking: any;
    handleConfirmBooking: (id: string) => Promise<void>;
}
) => {
  return (
    <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
            <DialogContent className="sm:max-w-md rounded-3xl p-8 text-center">
              <div className="bg-gradient-to-br from-green-100 to-emerald-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-600 w-10 h-10" />
              </div>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold mb-2">Confirm Booking</DialogTitle>
                <DialogDescription className="text-base text-gray-600">
                  Are you sure you want to confirm this booking for{" "}
                  <span className="font-semibold text-gray-900">
                    {selectedBooking.customer.full_name}
                  </span>
                  ?
                </DialogDescription>
              </DialogHeader>

              <div className="flex gap-3 justify-center mt-6">
                <Button
                  onClick={() => handleConfirmBooking(selectedBooking.id)}
                  className="flex-1 h-12 rounded-xl bg-chart-2 hover:from-chart-2/70 hover:to-chart-3/70"
                >
                  Confirm Booking
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 h-12 rounded-xl border-gray-200 hover:bg-gray-50"
                >
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
  )
}

export default ConfirmModal
