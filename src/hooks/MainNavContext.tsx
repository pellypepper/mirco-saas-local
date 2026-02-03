"use client";
import React, { createContext, useContext, useState , useEffect} from "react";
import { set } from "react-hook-form";

const MainNavContext = createContext<any>(null);

export const MainNavProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isProviderSignup, setIsProviderSignup] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [isExpanded])

  const handleToggle = () => {
    setIsOpen(prev => !prev);
    setIsLogin(false);
    setIsForgotPassword(false);
  };

  const handleProviderSignup = () => {
    setIsProviderSignup(prev => !prev);
    setIsLogin(false);
    setIsOpen(false);
    setIsForgotPassword(false);
  };

  const handleSignup = () => {
    setIsExpanded(true);
    setIsOpen(false);
    setIsProviderSignup(false);
    setIsLogin(false);
    setIsForgotPassword(false);
  }

  const toggleLogin = () => {
    setIsLogin(prev => !prev);
    setIsOpen(false);
    setIsExpanded(false);
    setIsProviderSignup(false);
    setIsForgotPassword(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsLogin(false);
    setIsForgotPassword(false);
    setIsProviderSignup(false);
  };

    function handleForgotPassword() {
    setIsForgotPassword(true);
    setIsLogin(false);
  }

  function handleThemeToggle() {
       setIsDarkMode(prev => !prev);
  }


  return (
    <MainNavContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isProviderSignup,
        setIsProviderSignup,
        isForgotPassword,
        setIsForgotPassword,
        toggleLogin,
        handleToggle,
        handleClose,
        handleProviderSignup,
        isLogin,
        setIsLogin,
        isExpanded,
        setIsExpanded,
         handleSignup,
         handleForgotPassword,
          isDarkMode,
          handleThemeToggle,
          setIsDarkMode,
      }}
    >
      {children}
    </MainNavContext.Provider>
  );
};

export const useMainNavBar = () => {
  const context = useContext(MainNavContext);
  if (!context) {
    throw new Error("useMainNavBar must be used within MainNavProvider");
  }
  return context;
};
