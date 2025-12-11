"use client";

import AvailabilityTab from "@/component/ProviderAvailability/availabilityTab";

  import { useUser } from "@/hooks/UserContext";

export default function AvailabilityPage() {
 


    const {  profile } = useUser();




  return <AvailabilityTab providerId={profile?.id || ""} />;
}
