"use client";

import { useState } from "react";

export function useCheckout() {
  const [loading, setLoading] = useState(false);

  const createCheckout = async (payload: any) => {
    setLoading(true);

    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error);
    }

    const { url } = await res.json();
    window.location.href = url;
  };

  return { createCheckout, loading };
}
