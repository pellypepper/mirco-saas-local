'use client';

import { useLoginForm } from "@/hooks/useLoginForm";
import AuthButtons from "./AuthButtons";
import Link from "next/link";
import Loader from "../Spinner";
import SuccessModal from "../SuccessModal";
import ErrorModal from "../ErrorModal";
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

export default function LoginPage({
  setIsForgotPassword,
  setIsLogin,
  setIsOpen,
  handleClose
}: {
  setIsForgotPassword: (value: boolean) => void,
  setIsLogin: (value: boolean) => void,
  setIsOpen: (value: boolean) => void,
  handleClose: () => void
}) {
  const {
    loading,
    errorMsg,
    successOpen,
    errorOpen,
    handleForgotPassword,
    handleSignup,
    handleEmailSignIn,
    handleSuccessClose,
    handleErrorClose
  } = useLoginForm({ setIsForgotPassword, setIsLogin, setIsOpen });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4">
      <SuccessModal
        open={successOpen}
        onClose={handleSuccessClose}
        title="Login Successful!"
        message="Welcome back! Redirecting to your dashboard."
        buttonText="Go to Dashboard"
      />

      <ErrorModal
        open={errorOpen}
        onClose={handleErrorClose}
        title="Login Failed"
        message={errorMsg || "An error occurred while logging in."}
        buttonText="Close"
      />

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="relative text-center">
          <p onClick={handleClose} className="absolute right-10 text-x text-chart-2 font-bold cursor-pointer">X</p>
          <CardTitle className="text-2xl text-chart-2 font-bold">Welcome Back</CardTitle>
          <CardDescription>Log in to access your dashboard</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader message="Logging in..." /> : "Login"}
            </Button>
          </form>

          <div className="flex items-center gap-2 text-gray-500 my-4">
            <div className="flex-1 border-b border-gray-300"></div>
            <p className="text-sm">OR</p>
            <div className="flex-1 border-b border-gray-300"></div>
          </div>

          <AuthButtons />
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center">
            <Link
              href="#"
              onClick={handleForgotPassword}
              className="text-sm text-chart-2 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>
          <div className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="#"
              onClick={handleSignup}
              className="text-chart-2 font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}