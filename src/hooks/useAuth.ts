import { useState, useEffect } from "react";
import { supabase } from "../libs/supabaseClient";
import { useRouter } from "next/navigation";
import { getCurrentSession, getUserRole } from "@/services/authService";

// Hook for email/password signup
export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName , role : "customer"} }
      });

      if (error) {
        setError(error.message);
      } else if (data?.user) {
        setMessage("Signup successful! Please check your email to confirm your account.");
      }

      return data;
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { signUp, loading, error, message };
};


export const useProviderSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const signUpProvider = async (
    email: string,
    password: string,
    fullName: string,
    serviceType: string,
    location: string,
    country: string,

  ) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: "provider",
            service_type: serviceType,
            location,
            country,
       
          }
        }
      });

      if (error) setError(error.message);
      else if (data?.user) setMessage("Provider signup successful! Please check your email to confirm your account.");

      return data;
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { signUpProvider, loading, error, message };
};


// sending password reset email
export const useForgotPassword = ({setIsForgotPassword, setIsLogin}: {setIsForgotPassword: (value: boolean) => void; setIsLogin: (value: boolean) => void;}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
    const [email, setEmail] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendResetEmail = async (email: string, redirectTo?: string) => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectTo || `${window.location.origin}/reset-password`,
      });

      if (error) setError(error.message);
      else setMessage("Check your email for the password reset link!");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorOpen(false);

    try {
      const result = await sendResetEmail(email);

      if (result?.error) {
        setErrorMessage(result.error.message || "Failed to send reset link.");
        setErrorOpen(true);
      } else {
        setSuccessOpen(true);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Something went wrong.");
      setErrorOpen(true);
    } finally {
      setLoading(false);
    }
  };

  
  const handleBackToLogin = () => {
    setIsForgotPassword(false);
    setIsLogin(true);
  };

  return {handleBackToLogin, sendResetEmail, loading, message, error, handleSubmit, email, setEmail, successOpen, setSuccessOpen, errorOpen, setErrorOpen, errorMessage };
};

// Hook for resetting password
export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resetPassword = async (newPassword: string) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) setError(error.message);
      else setMessage("Password successfully updated!");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, message, error };
};


export function useAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const processSession = async () => {
      const session = await getCurrentSession();
      const user = session?.user;

      if (!user) {
        // No session, redirect to login
        router.replace("/login");
        return;
      }

      const { profile, error } = await getUserRole(user.id);

      if (!profile?.role) {
             router.replace("/?message=Please create an account first");
      } else if (error) {
        // No role found, redirect to login with message
        router.replace("/?message=Error fetching profile. Please log in again.");
      } else {
        // User has a role, go to dashboard
        router.replace("/dashboard");
      }
    };

    processSession();
  }, [router]);
}

export const useChangeEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const changeEmail = async (newEmail: string) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (!newEmail || !/\S+@\S+\.\S+/.test(newEmail)) {
        setError("Invalid email address.");
        return;
      }

      //Get current user's email
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const currentEmail = session?.user?.email;

      if (newEmail === currentEmail) {
        setError("You are already using this email.");
        return;
      }

      // Check if new email exists
      const res = await fetch("/api/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Failed checking email.");
        return;
      }

      if (data.exists) {
        setError("Email already exists. Please use another one.");
        return;
      }

      // Update email
      const { error: updateError } = await supabase.auth.updateUser({ email: newEmail });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setMessage(
        "A confirmation email has been sent to your new address. Please verify to complete the change."
      );
    } catch (err: any) {
      setError(err.message || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { changeEmail, loading, error, message };
};


export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (!currentPassword) {
        setError("Current password required.");
        return;
      }
      if (newPassword.length < 8) {
        setError("New password must be at least 8 characters.");
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("New password and confirmation do not match.");
        return;
      }

      // Get current user email
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const email = session?.user?.email;
      if (!email) {
        setError("User not logged in.");
        return;
      }

      // Reauthenticate by signing in again
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: currentPassword,
      });

      if (signInError) {
        setError("Incorrect current password.");
        return;
      }

      // Now update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setMessage("Password successfully updated.");
    } catch (err: any) {
      setError(err.message || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error, message };
};
