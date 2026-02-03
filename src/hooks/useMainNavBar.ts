"use client"
import { useState } from "react";

const useMainNavBar = () => {
     const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isProviderSignup, setIsProviderSignup] = useState(false);



  return {
    isOpen,
    setIsOpen,
    isLogin,
    setIsLogin,
    isForgotPassword,
    setIsForgotPassword,
    isProviderSignup,
    setIsProviderSignup,
  
    
  }
}

export default useMainNavBar
