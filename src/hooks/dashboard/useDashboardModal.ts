
"use client";

import { useState } from "react";

export const useDashboardModals = () => {
  const [isMounted, setIsMounted] = useState(false); 
  const [emailOpen, setEmailOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const toggleProfile = () => setIsMounted((prev) => !prev);
  const toggleEmail = () => setEmailOpen((prev) => !prev);
  const togglePassword = () => setPasswordOpen((prev) => !prev);

  return {
    isMounted,
    setIsMounted,
    emailOpen,
    setEmailOpen,
    passwordOpen,
    setPasswordOpen,
    toggleProfile,
    toggleEmail,
    togglePassword,
  };
};
