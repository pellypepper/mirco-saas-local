"use client";

import { useUser } from "@/hooks/UserContext";
import ProviderDashboard from "@/component/dashboard/providerMainDisplay/MainDisplay";



const Providers= () => {

      const { profile } = useUser();
  return (
    <div>
          <ProviderDashboard profile={profile} />
    </div>
  )
}

export default Providers
