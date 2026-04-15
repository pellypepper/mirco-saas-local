'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function useUnsavedChangesWarning(hasUnsavedChanges: boolean) {
  const router = useRouter();
  const pathname = usePathname();

  const [nextRoute, setNextRoute] = useState<string | null>(null);
  const [unsavedMessage, setUnsavedMessage] = useState<string | null>(null);

  const currentPathRef = useRef(pathname);

  const confirmNavigation = () => {
    setUnsavedMessage(null);
    if (nextRoute) {
      currentPathRef.current = nextRoute;
      router.push(nextRoute);
      setNextRoute(null);
    }
  };

  const cancelNavigation = () => {
    setUnsavedMessage(null);
    setNextRoute(null);
  };

  // Detect route changes
  useEffect(() => {
    if (pathname !== currentPathRef.current) {
      if (hasUnsavedChanges) {
        setNextRoute(pathname);
        setUnsavedMessage('You have unsaved changes. Leave without saving?');

        // revert navigation
        router.push(currentPathRef.current);
      } else {
        currentPathRef.current = pathname;
      }
    }
  }, [pathname, hasUnsavedChanges, router]);

  // Handle browser refresh / close
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return { unsavedMessage, confirmNavigation, cancelNavigation };
}