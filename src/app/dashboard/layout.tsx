"use client";

import { ReactNode, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "@/component/navigation/Navbar";
import { UserProvider } from "@/hooks/UserContext";
import UserProfile from "@/component/menu/profile/UserProfile";
import Loader from "@/component/Spinner";
import { useDashboardLayout } from "@/hooks/useDashboardLayout";
import { ChangeEmailModal, ChangePasswordModal } from "@/component/menu/setting/UserSetting";

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    user,
    profile,
    loading,
    logoutLoading,
    open,
    setOpen,
    isMounted,
    setIsMounted,
    toggleProfile,
    toggleEmail,
    emailOpen,
    setEmailOpen,
    togglePassword,
    passwordOpen,
    setPasswordOpen,
    handleLogout
  } = useDashboardLayout();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && (!user || !profile)) {
      router.replace("/");
    }
  }, [user, profile, loading, router]);

  // ---- ROLE ACCESS MAP ----
  const roleAccessMap = useMemo(
    () => ({
      customer: [
        "/dashboard/Customer",
        "/dashboard/Customer/booking",
      ],
      provider: [
        "/dashboard/Providers",
        "/dashboard/Providers/booking",
        "/dashboard/Providers/availability",
        "/dashboard/Providers/service",
      ],
      admin: ["/dashboard/Admin",
        "/dashboard/Admin/revenue"
      ],
    }),
    []
  );

  // ---- ROLE-BASED PROTECTION ----
  useEffect(() => {
    if (!profile || !profile.role) return; // prevent crash
    const allowedRoutes = roleAccessMap[profile.role as keyof typeof roleAccessMap] ?? [];
    const isAllowed = allowedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (!isAllowed) {
      router.replace(
        `/dashboard/${
          profile.role === "customer"
            ? "Customer"
            : profile.role === "provider"
            ? "Providers"
            : "Admin"
        }`
      );
    }
  }, [pathname, profile, router, roleAccessMap]);

  // Loading
  if (loading || !profile || !user) {
    return (
      <div className="p-4 text-center">
        <Loader message="Loading Dashboard..." />
      </div>
    );
  }

  // ---- RENDER ----
  return (
    <div>
      <UserProvider value={{ user, profile }}>
        <Navbar
          user={user}
          profile={profile}
          open={open}
          setOpen={setOpen}
          toggleProfile={toggleProfile}
          toggleEmail={toggleEmail}
          togglePassword={togglePassword}
          handleLogout={handleLogout}
        />
        <main>{children}</main>
      </UserProvider>

      {isMounted && (
        <UserProfile profile={profile} onClose={() => setIsMounted(false)} />
      )}

      {emailOpen && <ChangeEmailModal onClose={() => setEmailOpen(false)} />}
      {passwordOpen && (
        <ChangePasswordModal onClose={() => setPasswordOpen(false)} />
      )}

      {logoutLoading && <Loader message="Logging out..." />}
    </div>
  );
}
