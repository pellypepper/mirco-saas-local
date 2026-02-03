"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SettingsDropdownProps {
  onChangeEmail: () => void;
  onChangePassword: () => void;
  closeParent?: () => void;
}

export const SettingsDropdown = ({ onChangeEmail, onChangePassword, closeParent }: SettingsDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const firstItemRef = useRef<HTMLLIElement>(null);
  const secondItemRef = useRef<HTMLLIElement>(null);

  // Close on outside click or Esc
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | KeyboardEvent) => {
      if (
        open &&
        ((e instanceof MouseEvent && ref.current && !ref.current.contains(e.target as Node)) ||
          (e instanceof KeyboardEvent && e.key === "Escape"))
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleClickOutside);
    };
  }, [open]);

  // Handle arrow navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      firstItemRef.current?.focus();
    }
  };

  const handleItemKeyDown = (e: React.KeyboardEvent, nextRef?: React.RefObject<HTMLLIElement | null>, action?: () => void) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      nextRef?.current?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      nextRef?.current?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action?.();
      setOpen(false);
      closeParent?.();
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <li
      ref={ref}
      className="relative cursor-pointer text-white px-4 py-2 rounded hover:bg-chart-2 transition font-medium text-center"
      tabIndex={0}
      role="button"
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={() => setOpen((prev) => !prev)}
      onKeyDown={handleKeyDown}
    >
      Settings
      <span className="ml-2 inline-block align-middle transition-transform">
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
        </svg>
      </span>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 bg-zinc-950/80 border-none rounded-lg shadow-lg z-20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            role="menu"
          >
            <li
              ref={firstItemRef}
              className="cursor-pointer px-4 py-2 hover:bg-chart-2 transition text-white"
              role="menuitem"
              tabIndex={-1}
              onClick={() => { onChangeEmail(); setOpen(false); closeParent?.(); }}
              onKeyDown={(e) => handleItemKeyDown(e, secondItemRef, onChangeEmail)}
            >
              Change Email
            </li>
            <li
              ref={secondItemRef}
              className="cursor-pointer px-4 py-2 hover:bg-chart-2 transition text-white"
              role="menuitem"
              tabIndex={-1}
              onClick={() => { onChangePassword(); setOpen(false); closeParent?.(); }}
              onKeyDown={(e) => handleItemKeyDown(e, firstItemRef, onChangePassword)}
            >
              Change Password
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};
