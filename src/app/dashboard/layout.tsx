'use client';

import { ReactNode, useState, useEffect } from 'react';
import Navbar from '@/component/navigation/DashboardNavbar';
import { UserProvider } from '@/hooks/UserContext';
import UserProfile from '@/component/menu/profile/UserProfile';
import Loader from '@/component/Spinner';
import { ChangeEmailModal, ChangePasswordModal } from '@/component/menu/setting/UserSetting';
import { useDashboardAuth } from '@/hooks/dashboard/useDashboardAuth';
import { useDashboardLayout } from '@/hooks/useDashboardLayout';
import useUserProfile from '@/hooks/useUserProfile';
import Notification from '@/component/Notification';
import { useMainNavBar } from '@/hooks/MainNavContext';

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const [isClient, setIsClient] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

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
    handleLogout,
  } = useDashboardLayout();

  const { notifications } = useUserProfile(profile);

  useDashboardAuth(user, profile, loading);
  const { isDarkMode } = useMainNavBar();
  
  useEffect(() => setIsClient(true), []);

   useEffect(() => {
    const update = () => setIsOnline(navigator.onLine);

    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);

    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  useEffect(() => {
  const timer = setTimeout(() => {
    setTimeoutReached(true);
  }, 8000); // 8s fallback

  return () => clearTimeout(timer);
}, []);

  // Notification dropdown 
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

if (!profile && loading && !timeoutReached) {
  return (
    <div className="p-4 text-center">
      <Loader message="Loading Dashboard..." />
    </div>
  );
}

 if (!isOnline) {
    return (
      <div className="p-4 text-center">
        <p>No internet connection</p>
        <p>Reconnecting automatically...</p>
      </div>
    );
  }

  return (
       <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-950' : 'bg-white'}`}>
      <UserProvider value={{ loading, user, profile }}>
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
        <Notification
          notifications={notifications}
          showNotification={showNotification}
          setShowNotification={setShowNotification}
        />
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
