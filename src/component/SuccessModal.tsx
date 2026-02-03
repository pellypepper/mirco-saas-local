'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,  } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function SuccessModal({
  open,
  onClose,
  title = "Success!",
  message = "Your action was completed successfully.",
  buttonText = "OK"
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl text-center p-6">

        
        <VisuallyHidden>
    <DialogTitle>Become a Service Provider</DialogTitle>
  </VisuallyHidden>

    <VisuallyHidden>
    <DialogDescription>
      Provider signup form to create a service provider account.
    </DialogDescription>
  </VisuallyHidden>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col items-center space-y-4"
        >
          <CheckCircle2 className="text-green-500 w-16 h-16" />
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-600">{title}</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">{message}</p>
          <Button onClick={onClose} className="mt-2">
            {buttonText}
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
