"use client";
import useOAuthLogin from "@/hooks/useOAuthLogin";
import Loader from "../Spinner";

export default function AuthButtons() {
  const { handleOAuth, loadingProvider } = useOAuthLogin();

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        onClick={() => handleOAuth("google")}
        disabled={loadingProvider === "google"}
        className="flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded"
      >
        {loadingProvider === "google" ? <Loader message="Logging in..." /> : "Login with Google"}
      </button>
    </div>
  );
}
