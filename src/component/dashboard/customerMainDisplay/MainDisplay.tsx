"use client";



import { LandingProviderSearch } from "./component/LandingProviderSearch";
import { useRouter } from "next/navigation";
import {FetchProvider} from "@/hooks/useProvider"
import Footer from "../../Homepage/component/Footer";


export default function CustomerDashboard() {

  const router = useRouter();
  const {providers, loading} = FetchProvider();

  return (
 <div>
     <LandingProviderSearch
      providers={providers}
      loading={loading}
      onSelectProvider={(provider) => router.push(`/dashboard/Customer/provider/${provider.id}`)}
    />

    <Footer />
 </div>
  );
}
