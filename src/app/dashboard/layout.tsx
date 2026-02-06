"use client";

import { ReactNode, useState, useEffect } from "react";
import Navbar from "@/component/navigation/DashboardNavbar";
import { UserProvider } from "@/hooks/UserContext";
import UserProfile from "@/component/menu/profile/UserProfile";
import Loader from "@/component/Spinner";
import { ChangeEmailModal, ChangePasswordModal } from "@/component/menu/setting/UserSetting";
import { useDashboardAuth } from "@/hooks/dashboard/useDashboardAuth";
import { useDashboardLayout } from "@/hooks/useDashboardLayout";
import useUserProfile from "@/hooks/useUserProfile";
import Notification from "@/component/Notification";

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children
}: LayoutProps) {
  const [isClient, setIsClient] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

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

  const { notifications } = useUserProfile(profile);

  useDashboardAuth(user, profile, loading);

  // client-side rendering for modals
  useEffect(() => setIsClient(true), []);

  // Notification dropdown animation every 1 minute
 useEffect(() => {
    if (!notifications) return;

    const runNotificationCycle = () => {
      setShowNotification(true);
      
      setTimeout(() => {
        setShowNotification(false);
      }, 10000);
    };

    runNotificationCycle();
    const interval = setInterval(runNotificationCycle, 65000);

    return () => clearInterval(interval);
  }, [notifications]);

  if (loading || !user || !profile) {
    return (
      <div className="p-4 text-center">
        <Loader message="Loading Dashboard..." />
      </div>
    );
  }

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

{notifications && (
<Notification notifications={notifications} showNotification={showNotification} setShowNotification={setShowNotification} />
)}
      {isClient && (
        <>
          {isMounted && <UserProfile profile={profile} onClose={() => setIsMounted(false)} />}
          {emailOpen && <ChangeEmailModal onClose={() => setEmailOpen(false)} />}
          {passwordOpen && <ChangePasswordModal onClose={() => setPasswordOpen(false)} />}
          {logoutLoading && <Loader message="Logging out..." />}
        </>
      )}
    </div>
  );
}