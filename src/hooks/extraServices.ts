
"use client"; 


import { useState, useCallback, useEffect } from "react";
import { getServices } from "@/services/Services";

const useExtraService = (providerId?: string) => {
  const [services, setServices] = useState<any[]>([]);

  const loadServices = useCallback(async () => {
    if (!providerId) return;
    try {
      const fetched = await getServices(providerId);
      setServices(fetched);
    } catch (err) {
      console.error("Failed to fetch services", err);
    }
  }, [providerId]);

    useEffect(() => {
    loadServices();
  }, [loadServices]);

  return {
    services,

  };
};

export default useExtraService;
