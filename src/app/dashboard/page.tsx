// dashboard/page.tsx
"use client";

import { useUser } from "../../hooks/UserContext";
import CustomerDashboard from "@/component/dashboard/customerMainDisplay/MainDisplay";
import ProviderDashboard from "@/component/dashboard/providerMainDisplay/MainDisplay";
import AdminDashboard from "@/component/admin/admin";


export default function DashboardPage() {
  const { profile } = useUser();
 



  return (
    <div className="mt-3 ">
    

      {profile.role === "provider" ? (
        <ProviderDashboard profile={profile} />
      ) : profile.role === "admin" ? (
          < AdminDashboard />
      ) : (
        <CustomerDashboard />
      )}

     
    </div>
  );
}
