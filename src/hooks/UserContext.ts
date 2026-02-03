"use client"; 

import { createContext, useContext } from "react";

interface UserContextType {
  user: any;
  profile: any;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = UserContext.Provider;

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
