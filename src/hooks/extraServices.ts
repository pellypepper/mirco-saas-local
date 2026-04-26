'use client';

import { useState, useCallback, useEffect } from 'react';
import { getServices } from '@/services/Services';

const useExtraService = (providerId?: string) => {
  const [services, setServices] = useState<any[]>([]);

  const loadServices = useCallback(async () => {
    if (!providerId) return;
    try {
      const fetched = await getServices(providerId);
      setServices(fetched);
    } catch (err) {
    throw new Error(`Failed to load services: ${err instanceof Error ? err.message : String(err)}`);
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
