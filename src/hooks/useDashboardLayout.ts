import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { fetchAuthUser, fetchUserProfile, logoutUser } from "@/services/dashboardService";

export function useDashboardLayout() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const toggleProfile = () => {
    setOpen(false);
    setIsMounted(!isMounted);
  };


  const toggleEmail = ()=>{
      setOpen(false);
      setEmailOpen(!emailOpen);
  }

   const togglePassword = ()=>{
      setOpen(false);
      setPasswordOpen(!passwordOpen);
  }

  const handleLogout = useCallback(async () => {
    setLogoutLoading(true);
    try {
      await logoutUser();
      router.replace("/");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLogoutLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const fetchUserProfileData = async () => {
      const { user, userError } = await fetchAuthUser();
      if (userError || !user) {
        setLoading(false);
        return;
      }

      const { data } = await fetchUserProfile(user.id);
      if (data) setProfile(data);
      setUser(user);
      setLoading(false);
    };

    fetchUserProfileData();
  }, []);

  return {
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
  };
}