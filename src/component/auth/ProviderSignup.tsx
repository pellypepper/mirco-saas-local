'use client';

import { Dialog } from "@/components/ui/dialog";
import ProviderSignupForm from "./ProviderSignupForm";

export default function ProviderSignup({
  setIsLogin,
  open = true,
  onOpenChange = () => {},
  onSubmit: parentOnSubmit,
   setIsProviderSignup
}: {
  setIsLogin: (value: boolean) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: unknown) => void;
  setIsProviderSignup: (value: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <ProviderSignupForm  setIsProviderSignup={setIsProviderSignup} setIsLogin={setIsLogin} onSubmit={parentOnSubmit} onClose={() => onOpenChange(false)} />
    </Dialog>
  );
}
