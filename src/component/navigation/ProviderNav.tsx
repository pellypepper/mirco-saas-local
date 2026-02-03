"use client";
import { useRouter } from "next/navigation";
import { NavItem } from "./component/NavItem";
import { SettingsDropdown } from "./component/SettingsDropdown";

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

  const navList = [
    { label: "Dashboard", path: "/dashboard/Providers" },
    { label: "Availability", path: "/dashboard/Providers/availability" },
    { label: "Bookings", path: "/dashboard/Providers/booking" },
    { label: "Services", path: "/dashboard/Providers/service" },
  ];

  return (
<ul className={`flex ${horizontal ? "flex-row space-x-6 items-center" : "flex-col"}  w-full relative`}>
  {navList.map((item) => (
    <NavItem
      key={item.label}
      onClick={() => {
        router.replace(item.path);
        setOpen?.(false);

      }}
      className="hover:bg-chart-2"
    >
      {item.label}
    </NavItem>
  ))}

  <NavItem onClick={toggleProfile}>Profile</NavItem>

  <SettingsDropdown
    onChangeEmail={onChangeEmail ?? (() => {})}
    onChangePassword={onChangePassword ?? (() => {})}
    closeParent={() => setOpen?.(false)}
  />

  <NavItem
    onClick={() => {
      handleLogout?.();
      setOpen?.(false);
    }}
  >
    Logout
  </NavItem>
</ul>

  );
};

export default ProviderNav;
