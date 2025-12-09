"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useUnsavedChangesWarning(hasUnsavedChanges: boolean) {
  const router = useRouter();
  const [nextRoute, setNextRoute] = useState<string | null>(null);
  const [unsavedMessage, setUnsavedMessage] = useState<string | null>(null);

  const confirmNavigation = () => {
    setUnsavedMessage(null);
    if (nextRoute) {
      router.push(nextRoute);
      setNextRoute(null);
    }
  };

  const cancelNavigation = () => {
    setUnsavedMessage(null);
    setNextRoute(null);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    const handleRouteChange = (url: string) => {
      if (hasUnsavedChanges) {
        setNextRoute(url);
        setUnsavedMessage("You have unsaved changes. Leave without saving?");
        throw "Route change aborted";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    router.events?.on("routeChangeStart", handleRouteChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      router.events?.off("routeChangeStart", handleRouteChange);
    };
  }, [hasUnsavedChanges, router]);

  return { unsavedMessage, confirmNavigation, cancelNavigation };
}
