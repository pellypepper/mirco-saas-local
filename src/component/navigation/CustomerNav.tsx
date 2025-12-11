"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CustomerNavProps {
  horizontal?: boolean; 
  handleLogout: () => void; 
  toggleProfile: () => void;
  setOpen?: (open: boolean) => void;
  onChangeEmail: () => void;  
  onChangePassword: () => void; 
}

const CustomerNav = ({
  horizontal,
  setOpen,
  handleLogout,
  toggleProfile,
  onChangeEmail,
  onChangePassword,
}: CustomerNavProps) => {
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLLIElement>(null);

  // Click outside handler for dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        settingsOpen &&
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [settingsOpen]);

  // List for vertical and horizontal layouts
  if (horizontal) {
    return (
      <ul className="flex flex-row space-x-6 w-full relative items-center">
        <li
          onClick={() => {
            router.replace("/dashboard/Customer");
            setOpen?.(false);
          }}
          className="cursor-pointer px-4 py-2 rounded hover:bg-gray-100 transition text-gray-700 font-medium text-center"
        >
          Home
        </li>
          <li
          onClick={() => {
      router.replace("/dashboard/Customer/booking");
            setOpen?.(false);
          }}
          className="cursor-pointer px-4 py-2 rounded hover:bg-gray-100 transition text-gray-700 font-medium text-center"
        >
         View Bookings
        </li>
        <li
          onClick={() => {
            toggleProfile?.();
            setOpen?.(false);
          }}
          className="cursor-pointer px-4 py-2 rounded hover:bg-gray-100 transition text-gray-700 font-medium text-center"
        >
          Profile
        </li>
          
        
        <li
          ref={settingsRef}
          className="relative cursor-pointer px-4 py-2 rounded hover:bg-gray-100 transition text-gray-700 font-medium text-center"
          tabIndex={0}
                 role="button" 
          onClick={() => setSettingsOpen((s) => !s)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
              setSettingsOpen(true);
            }
          }}
          aria-haspopup="menu"
          aria-expanded={settingsOpen}
        >
          Settings
          <span className="ml-2 inline-block align-middle transition-transform">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
            </svg>
          </span>
          {settingsOpen && (
            <ul className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 bg-primary-white border rounded-lg shadow-lg z-20">
              <li
                className="cursor-pointer px-4 py-2  hover:bg-gray-100 transition text-gray-800"
                onClick={(e) => { e.stopPropagation(); onChangeEmail(); setSettingsOpen(false); setOpen?.(false); }}
              >
                Change Email
              </li>
              <li
                className="cursor-pointer px-4 py-2  hover:bg-gray-100 transition text-gray-800"
                onClick={(e) => { e.stopPropagation(); onChangePassword(); setSettingsOpen(false); setOpen?.(false); }}
              >
                Change Password
              </li>
            </ul>
          )}
        </li>
        <li
          onClick={() => {
            handleLogout();
            setOpen?.(false);
          }}
          className="cursor-pointer px-4 py-2 rounded hover:bg-gray-100 transition text-gray-700 font-medium text-center"
        >
          Logout
        </li>
      </ul>
    );
  } else {
    return (
      <ul className="flex flex-col w-full relative">
        <li
          onClick={() => {
            router.replace("/dashboard/Customer");
            setOpen?.(false);
          }}
          className="cursor-pointer px-4 py-2 rounded hover:bg-gray-100 transition text-gray-700 font-medium text-center border-b"
        >
          Home
        </li>
          <li
          onClick={() => {
      router.replace("/dashboard/Customer/booking");
            setOpen?.(false);
          }}
          className="cursor-pointer px-4 py-2 rounded hover:bg-gray-100 transition text-gray-700 font-medium text-center"
        >
         View Bookings
        </li>
        <li
          onClick={() => {
            toggleProfile?.();
            setOpen?.(false);
          }}
          className="cursor-pointer px-4 py-2 rounded hover:bg-gray-100 transition text-gray-700 font-medium text-center border-b"
        >
          Profile
        </li>
        
        <li
          ref={settingsRef}
          className="relative cursor-pointer px-4 py-2 rounded hover:bg-gray-100 transition text-gray-700 font-medium text-center border-b"
          tabIndex={0}
                 role="button" 
          onClick={() => setSettingsOpen((s) => !s)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
              setSettingsOpen(true);
            }
          }}
          aria-haspopup="menu"
          aria-expanded={settingsOpen}
        >
          Settings
          <span className="ml-2 inline-block align-middle transition-transform">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
            </svg>
          </span>
          {settingsOpen && (
            <ul className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 bg-white border rounded-lg shadow-lg z-20">
              <li
                className="cursor-pointer px-4 py-2 hover:bg-chart-2 transition text-gray-800"
                onClick={(e) => { e.stopPropagation(); onChangeEmail(); setSettingsOpen(false); setOpen?.(false); }}
              >
                Change Email
              </li>
              <li
                className="cursor-pointer px-4 py-2 hover:bg-chart-2 transition text-gray-800"
                onClick={(e) => { e.stopPropagation(); onChangePassword(); setSettingsOpen(false); setOpen?.(false); }}
              >
                Change Password
              </li>
            </ul>
          )}
        </li>
        <li
          onClick={() => {
            handleLogout();
            setOpen?.(false);
          }}
          className="cursor-pointer px-4 py-2 rounded hover:bg-gray-100 transition text-gray-700 font-medium text-center border-b"
        >
          Logout
        </li>
      </ul>
    );
  }
};

export default CustomerNav;