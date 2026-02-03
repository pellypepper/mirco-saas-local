
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const roleAccessMap = {
  customer: ["/dashboard/Customer", "/dashboard/Customer/booking"],
  provider: [
    "/dashboard/Providers",
    "/dashboard/Providers/booking",
    "/dashboard/Providers/availability",
    "/dashboard/Providers/service",
  ],
  admin: ["/dashboard/Admin", "/dashboard/Admin/revenue", "/dashboard/Admin/booking"],
};

export const useDashboardAuth = (user: any, profile: any, loading: boolean) => {
  const router = useRouter();
  const pathname = usePathname();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && (!user || !profile)) {
      router.replace("/");
    }
  }, [user, profile, loading, router]);

  // Role-based route protection
  useEffect(() => {
    if (!profile?.role) return;

    const allowedRoutes = roleAccessMap[profile.role as keyof typeof roleAccessMap] ?? [];
    const isAllowed = allowedRoutes.some((route) => pathname.startsWith(route));

    if (!isAllowed) {
      router.replace(`/dashboard/${profile.role === "customer" ? "Customer" : profile.role === "provider" ? "Providers" : "Admin"}`);
    }
  }, [pathname, profile, router]);

  return roleAccessMap;
};
