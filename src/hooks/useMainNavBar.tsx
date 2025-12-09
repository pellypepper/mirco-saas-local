"use client"
import { useState } from "react";

const useMainNavBar = () => {
     const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isProviderSignup, setIsProviderSignup] = useState(false);

  const toggleLogin = () => {
    setIsLogin(!isLogin);
    setIsOpen(false);
    setIsForgotPassword(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setIsLogin(false);
    setIsForgotPassword(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsLogin(false);
    setIsForgotPassword(false);
    setIsProviderSignup(false);
  };

  const handleProviderSignup = () => {
    setIsProviderSignup(!isProviderSignup);
    setIsLogin(false);
    setIsOpen(false);
    setIsForgotPassword(false);
  };
  return {
    isOpen,
    setIsOpen,
    isLogin,
    setIsLogin,
    isForgotPassword,
    setIsForgotPassword,
    isProviderSignup,
    setIsProviderSignup,
    toggleLogin,
    handleToggle,
    handleClose,
    handleProviderSignup,
    
  }
}

export default useMainNavBar
