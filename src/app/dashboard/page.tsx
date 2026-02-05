"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/UserContext";

export default function DashboardPage() {
  const { profile } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!profile) return;
    
 
    if (profile.role === "customer") router.push("/dashboard/Customer");
    if (profile.role === "provider") router.push("/dashboard/Providers");
    if (profile.role === "admin") router.push("/dashboard/Admin");
  }, [profile, router]);

  return null;
}
