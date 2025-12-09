"use client";

import { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import { useSearchParams } from "next/navigation";
import ErrorModal from "@/component/ErrorModal";

export default function Home() {

   const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const [showError, setShowError] = useState(false);

  // Open modal if there's a message
  useEffect(() => {
    if (message) setShowError(true);
  }, [message]);
  return (
    <main className="  h-screen p-4">
      <Navbar />

 {message && (
        <ErrorModal
          open={showError}
          message={message}
          onClose={() => setShowError(false)}
        />
      )}
    </main>
  );
}

 