"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

const CancelModal = ({ showCancelModal, setShowCancelModal, selectedBooking, handleCancelBooking }
    :   {
        showCancelModal: boolean;
        setShowCancelModal: (open: boolean) => void;
        selectedBooking: any;
        handleCancelBooking: (id: string) => Promise<void>;
    }
) => {

  return (
    <Dialog open={showCancelModal} onOpenChange={setShowCancelModal}>
            <DialogContent className="sm:max-w-md rounded-3xl p-8 text-center">
              <div className="bg-gradient-to-br from-red-100 to-red-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <XCircle className="text-red-600 w-10 h-10" />
              </div>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold mb-2">Cancel Booking</DialogTitle>
                <DialogDescription className="text-base text-gray-600">
                  Are you sure you want to cancel the booking for{" "}
                  <span className="font-semibold text-gray-900">
                    {selectedBooking.customer.full_name}
                  </span>
                  ? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>

              <div className="flex gap-3 justify-center mt-6">
                <Button
                  variant="destructive"
                  onClick={() => handleCancelBooking(selectedBooking.id)}
                  className="flex-1 h-12 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                >
                  Cancel Booking
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 h-12 rounded-xl border-gray-200 hover:bg-gray-50"
                >
                  Go Back
                </Button>
              </div>
            </DialogContent>
          </Dialog>
  )
}

export default CancelModal