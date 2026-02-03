"use client";

import { useUser } from "@/hooks/UserContext";
import ProviderDashboard from "@/component/dashboard/providerMainDisplay/MainDisplay";
import { useMainNavBar } from "@/hooks/MainNavContext";



const Providers= () => {
  const {isDarkMode} = useMainNavBar();

      const { profile } = useUser();
  return (
    <div className={` ${isDarkMode ? "bg-zinc-950" : "bg-gray-100"}`}>
          <ProviderDashboard profile={profile} />
    </div>
  )
}

export default Providers
