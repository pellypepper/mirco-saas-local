"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, Calendar, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const detailModal = ({ selectedBooking, formatDate, formatTime, showDetailsModal, setShowDetailsModal }: {
    selectedBooking: any;
    formatDate: (dateString: string) => string;
    formatTime: (dateString: string) => string;
    showDetailsModal: boolean;
    setShowDetailsModal: (open: boolean) => void;
}) => {
  return (
     <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
            <DialogContent className="sm:max-w-lg rounded-3xl p-0 overflow-hidden border-0">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-chart-2 to-chart-3 p-8 text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold mb-2">
                    Booking Details
                  </DialogTitle>
                  <DialogDescription className="text-indigo-100">
                    Complete information about this appointment
                  </DialogDescription>
                </DialogHeader>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                  <div className="bg-gradient-to-r from-chart-2 to-chart-3 w-16 h-16 rounded-2xl flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedBooking.customer.full_name}
                    </h3>
                    <p className="text-gray-600">{selectedBooking.services.title}</p>
                       <p className="text-gray-600">{selectedBooking.services.description}</p>
                    
                  
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2.5 rounded-xl">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Date</p>
                      <p className="text-base font-semibold text-gray-900">
                        {formatDate(selectedBooking.booking_date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-2.5 rounded-xl">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Time</p>
                      <p className="text-base font-semibold text-gray-900">
                        {formatTime(selectedBooking.booking_date)}
                      </p>
                    </div>
                  </div>

                  

                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-2.5 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Status</p>
                      <Badge
                        variant={
                          selectedBooking.status === "confirmed"
                            ? "default"
                            : selectedBooking.status === "pending"
                            ? "outline"
                            : "destructive"
                        }
                        className={`
                          ${selectedBooking.status === "confirmed" ? "bg-green-100 text-green-700 border-green-200" : ""}
                          ${selectedBooking.status === "pending" ? "bg-blue-100 text-blue-700 border-blue-200" : ""}
                          ${selectedBooking.status === "cancelled" ? "bg-red-100 text-red-700 border-red-200" : ""}
                          mt-1 px-3 py-1 text-xs font-semibold rounded-full
                        `}
                      >
                        {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-2 rounded-xl border border-green-200">
                      <span className="text-xl font-bold text-gray-900">
                        {selectedBooking.currency}{selectedBooking.amount}
                      </span>
                      <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                        TOTAL
                      </span>
                    </div>
                </div>

                <Button
                  onClick={() => setShowDetailsModal(false)}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-chart-2 to-chart-3 hover:from-chart-3 hover:to-chart-2"
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
  )
}

export default detailModal
