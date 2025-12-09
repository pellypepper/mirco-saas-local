"use client";

import { useResetPasswordForm } from "@/hooks/useResetPasswordForm";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Loader from "../../component/Spinner";
import SuccessModal from "../../component/SuccessModal";
import ErrorModal from "../../component/ErrorModal";

export default function ResetPasswordPage() {
  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    successOpen,
    setSuccessOpen,
    errorOpen,
    setErrorOpen,
    errorMessage,
    handleSubmit,
  } = useResetPasswordForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <SuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="Password Reset Successfully!"
        message="You will be redirected to login shortly."
        buttonText="Close"
      />
      <ErrorModal
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        title="Error"
        message={errorMessage}
        buttonText="Close"
      />

      <Card className="w-full max-w-md shadow-lg rounded-2xl overflow-hidden">
        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30">
            <Loader message="Updating password..." />
          </div>
        )}

        <CardHeader className="text-center px-6 py-4 text-chart-2">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>Enter a new password to secure your account</CardDescription>
        </CardHeader>

        <CardContent className="px-6 py-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Updating..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}