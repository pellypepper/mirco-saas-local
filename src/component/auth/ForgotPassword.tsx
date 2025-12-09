"use client";


import { useForgotPassword } from "../../hooks/useAuth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "../Spinner";
import SuccessModal from "../SuccessModal";
import ErrorModal from "../ErrorModal";

export default function ForgotPassword({
  setIsForgotPassword,
  setIsLogin,
}: {
  setIsForgotPassword: (value: boolean) => void;
  setIsLogin: (value: boolean) => void;
}) {

    const {handleBackToLogin, loading, setEmail, email, handleSubmit, successOpen, setSuccessOpen, errorOpen, setErrorOpen, errorMessage } = useForgotPassword({setIsForgotPassword, setIsLogin});




  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4">
      {/* Success Modal */}
      <SuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="Reset Email Sent!"
        message="Check your inbox for the password reset link."
        buttonText="Close"
      />

      {/* Error Modal */}
      <ErrorModal
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        title="Failed"
        message={errorMessage}
        buttonText="Close"
      />

      <Card className="w-full max-w-md shadow-lg animate-in fade-in-50 relative">
        {/* Loader overlay */}
        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 rounded-md">
            <Loader message="Sending reset link..." />
          </div>
        )}

        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-gray-500">
            Enter your email to receive a password reset link
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            variant="ghost"
            type="button"
            onClick={handleBackToLogin}
            className="text-sm text-chart-2 hover:underline"
          >
            Back to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
