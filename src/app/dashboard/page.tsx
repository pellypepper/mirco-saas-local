// dashboard/page.tsx
"use client";

import { useUser } from "../../hooks/UserContext";
import CustomerDashboard from "@/component/dashboard/customerMainDisplay/MainDisplay";
import ProviderDashboard from "@/component/dashboard/providerMainDisplay/MainDisplay";


export default function DashboardPage() {
  const {  profile } = useUser();
 



  return (
    <div className="mt-3 ">
    

      {profile.role === "provider" ? (
        <ProviderDashboard profile={profile} />
      ) : (
        <CustomerDashboard />
      )}

     
    </div>
  );
}
