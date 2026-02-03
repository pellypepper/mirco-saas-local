"use client";
import { ReactNode } from "react";

interface NavItemProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export const NavItem = ({ onClick, children, className }: NavItemProps) => (
  <li
    onClick={onClick}
    className={`cursor-pointer px-4 py-2 rounded  transition text-white font-medium text-center ${className || ""}`}
  >
    {children}
  </li>
);
