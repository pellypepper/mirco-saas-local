import { useState, useEffect } from "react";
import { fetchProviderProfile, fetchProviderById } from "@/services/providerService";
import { set } from "react-hook-form";



export const useProvider  = (providerId: string) => {

  const [providerData, setProviderData] = useState<any | null>(null);
    const [providerLoading, setProviderLoading] = useState(true);




   useEffect(() => {
        if (!providerId) return;


    const getProvider = async () => {
         setProviderLoading(true);
        try {
        const p = await fetchProviderById(providerId);
        setProviderData(p);
      } catch (err) {
        console.error("Failed to fetch provider", err);
      }finally {
        setProviderLoading(false);
      }
    };
    getProvider( );
  }, [providerId]);


    return{
   
        providerData,
        providerLoading,
    }

}


export const FetchProvider = () => {
    const [providers, setProviders] = useState<any[]>([]);
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        const fetchProviders = async () => {
          setLoading(true);
            const fetchedProviders = await fetchProviderProfile();
            setProviders(fetchedProviders ?? []);
            setLoading(false);
        };

        fetchProviders();
    }, []);

    return { providers, loading };
}



