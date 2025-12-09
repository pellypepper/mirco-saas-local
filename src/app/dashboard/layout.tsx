"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/component/navigation/Navbar";
import { UserProvider } from "@/hooks/UserContext";
import UserProfile from "@/component/menu/profile/UserProfile";
import Loader from "@/component/Spinner";
import { useDashboardLayout } from "@/hooks/useDashboardLayout";
import {ChangeEmailModal, ChangePasswordModal} from "@/component/menu/setting/UserSetting";

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const router = useRouter();
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

  if (loading) return <div className="p-4 text-center"><Loader message="Loading Dashboard..." /></div>;
  if (!user || !profile) {
    router.push("/");
    return null;
  }

  return (
    <div className="p-4 relative">
      <UserProvider value={{ user, profile }}>
        <Navbar
          toggleProfile={toggleProfile}
          open={open}
          setOpen={setOpen}
          handleLogout={handleLogout}
          toggleEmail={toggleEmail}
          togglePassword={togglePassword}
          profile={profile}
        />
        <main>{children}</main>
      </UserProvider>

      
      {/* Profile modal */}
      {isMounted && (
        <UserProfile profile={profile} onClose={() => setIsMounted(false)} />
      )}

    {/* Email modal */}
      {emailOpen && (
        <ChangeEmailModal onClose={() => setEmailOpen(false)} />
      )}

      {/* Password modal */}
      {passwordOpen && (
        <ChangePasswordModal onClose={() => setPasswordOpen(false)} />
      )}


        {/* Logout loader */}
      {logoutLoading && (
        <Loader message="Logging out..." />
      )}
    </div>
  );
}