import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentSession, upsertUserProfile } from "@/services/authService";

export function useRoleSelection() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"customer" | "provider" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (!selectedRole) return;

    setLoading(true);
    setError("");

    try {
      const session = await getCurrentSession();
      const user = session?.user;

      if (!user) {
        router.replace("/login");
        return;
      }

      await upsertUserProfile(
        user.id,
        selectedRole,
        user.user_metadata?.full_name || user.email?.split("@")[0] || "User"
      );

      router.replace("/dashboard");
    } catch (err: any) {
      console.error("Error setting role:", err);
      setError(err.message || "Failed to set role. Please try again.");
      setLoading(false);
    }
  };

  return {
    selectedRole,
    setSelectedRole,
    loading,
    error,
    handleContinue,
  };
}