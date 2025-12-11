"use client";



import { LandingProviderSearch } from "./component/LandingProviderSearch";
import { useRouter } from "next/navigation";
import {FetchProvider} from "@/hooks/useProvider"


export default function CustomerDashboard() {

  const router = useRouter();
  const {providers, loading} = FetchProvider();

  return (
    <LandingProviderSearch
      providers={providers}
      loading={loading}
      onSelectProvider={(provider) => router.push(`/dashboard/Customer/provider/${provider.id}`)}
    />
  );
}
