"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProviderNavProps {
  horizontal?: boolean;
  handleLogout?: () => void;
  toggleProfile?: () => void;
  setOpen?: (open: boolean) => void;
  onChangeEmail?: () => void;  
  onChangePassword?: () => void; 
}

const ProviderNav = ({
  horizontal,
  handleLogout,
  setOpen,
  toggleProfile,
  onChangeEmail,
  onChangePassword,
}: ProviderNavProps) => {
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

  const navList = [
    {
      label: "Dashboard",
      action: () => {
        router.replace("/dashboard/Providers");
        setOpen?.(false);
      },
    },
    {
      label: "Availability",
      action: () => {
        router.replace("/dashboard/Providers/availability");
        setOpen?.(false);
      },
    },
    {
      label: "Bookings",
      action: () => {
        router.replace("/dashboard/Providers/booking");
        setOpen?.(false);
      },
    },
    {
      label: "Services",
      action: () => {
        router.replace("/dashboard/Providers/service");
        setOpen?.(false);
      },
    },
    {
      label: "Profile",
      action: () => {
        toggleProfile?.();
        setOpen?.(false);
      },
    },
  ];

  return (
    <div>
      <ul
        className={`flex ${horizontal ? "flex-row space-x-6 items-center" : "flex-col"} w-full relative`}
      >
        {navList.map((item) => (
          <li
            key={item.label}
            onClick={item.action}
            className={`cursor-pointer px-4 py-2 rounded hover:bg-gray-100 transition text-gray-700 font-medium text-center ${
              !horizontal ? "border-b" : ""
            }`}
          >
            {item.label}
          </li>
        ))}

        {/* Settings Dropdown in middle between Profile and Logout */}
   
<li
  ref={settingsRef}
  className={`relative cursor-pointer px-4 py-2 rounded hover:bg-gray-100 transition text-gray-700 font-medium text-center ${
    !horizontal ? "border-b" : ""
  }`}
  role="button"  
  tabIndex={0}
  onClick={() => setSettingsOpen((s) => !s)}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      setSettingsOpen(true);
    }
  }}
  aria-haspopup="menu"
  aria-expanded={settingsOpen}
>
  Setting
  <span className="ml-2 inline-block align-middle transition-transform">
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
    </svg>
  </span>
  {settingsOpen && (
    <ul className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 bg-primary-white border rounded-lg shadow-lg z-20" role="menu">
      <li
        className="cursor-pointer px-4 py-2  hover:bg-gray-100 transition text-gray-800"
        role="menuitem"
        onClick={(e) => {
          e.stopPropagation();
          onChangeEmail?.();
          setSettingsOpen(false);
          setOpen?.(false);
        }}
      >
        Change Email
      </li>
      <li
        className="cursor-pointer px-4 py-2  hover:bg-gray-100 transition text-gray-800"
        role="menuitem"
        onClick={(e) => {
          e.stopPropagation();
          onChangePassword?.();
          setSettingsOpen(false);
          setOpen?.(false);
        }}
      >
        Change Password
      </li>
    </ul>
  )}
</li>


        <li
          onClick={() => {
            handleLogout?.();
            setOpen?.(false);
          }}
          className={`cursor-pointer px-4 py-2 rounded hover:bg-gray-100 transition text-gray-700 font-medium text-center ${
            !horizontal ? "border-b" : ""
          }`}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default ProviderNav;