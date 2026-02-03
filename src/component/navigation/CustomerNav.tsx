"use client";

import { useRouter } from "next/navigation";
import { NavItem } from "./component/NavItem";
import { SettingsDropdown } from "./component/SettingsDropdown";

interface CustomerNavProps {
  horizontal?: boolean;
  handleLogout: () => void;
  toggleProfile: () => void;
  setOpen?: (open: boolean) => void;
  onChangeEmail: () => void;
  onChangePassword: () => void;
}

const CustomerNav = ({

  setOpen,
  handleLogout,
  toggleProfile,
  onChangeEmail,
  onChangePassword,
}: CustomerNavProps) => {
  const router = useRouter();
  const menuClass =  "flex flex-col w-full ";

  return (
    <ul className={`${menuClass} `}>
      <NavItem className="text-white hover:bg-chart-2" onClick={() => { router.replace("/dashboard/Customer"); setOpen?.(false); }}>Home</NavItem>
      <NavItem className="text-white hover:bg-chart-2" onClick={() => { router.replace("/dashboard/Customer/booking"); setOpen?.(false); }}>View Bookings</NavItem>
      <NavItem className="text-white hover:bg-chart-2" onClick={() => { toggleProfile?.(); setOpen?.(false); }}>Profile</NavItem>

      <SettingsDropdown
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        closeParent={() => setOpen?.(false)}
      />

      <NavItem className="text-white hover:bg-chart-2" onClick={() => { handleLogout(); setOpen?.(false); }}>Logout</NavItem>
    </ul>
  );
};

export default CustomerNav;
