'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string; // For close button
  onConfirm?: () => void; // Optional confirm action (for unsaved changes)
  confirmText?: string;   // Text for confirm button
}

export default function ErrorModal({
  open,
  onClose,
  title = "Something went wrong",
  message = "An error occurred. Please try again.",
  buttonText = "Close",
  onConfirm,
  confirmText = "Confirm"
}: ErrorModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl text-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col items-center space-y-4"
        >
          <XCircle className="text-red-500 w-16 h-16" />
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-600">{title}</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">{message}</p>

          <div className="flex gap-4 mt-2">
            {/* Close / Cancel */}
            <Button variant="destructive" onClick={onClose}>
              {buttonText}
            </Button>

            {/* Optional Confirm / Leave */}
            {onConfirm && (
              <Button variant="outline" onClick={onConfirm}>
                {confirmText}
              </Button>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
