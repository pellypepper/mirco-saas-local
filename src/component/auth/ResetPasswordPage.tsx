'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // ✅ add this
import { useEffect } from 'react';
import { useResetPasswordForm } from '@/hooks/useResetPasswordForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Loader from '../../component/Spinner';
import SuccessModal from '../../component/SuccessModal';
import ErrorModal from '../../component/ErrorModal';
import { useMainNavBar } from '@/hooks/MainNavContext';

import { MeshGradient } from '@paper-design/shaders-react';
import { KeyRound, Lock, ShieldCheck } from 'lucide-react';

export default function ResetPasswordPage() {
  const { setIsLogin } = useMainNavBar();
  const searchParams = useSearchParams();
  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    setErrorMessage,
    successOpen,
    setSuccessOpen,
    errorOpen,
    setErrorOpen,
    errorMessage,
    handleSubmit,
    tokenVerified,
  } = useResetPasswordForm();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      setErrorMessage(decodeURIComponent(error));
      setErrorOpen(true);
    }
  }, [searchParams, setErrorMessage, setErrorOpen]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
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

      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
        {/* Mesh Gradient Background */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <MeshGradient
            colors={['#219ebc', '#219ebc', '#219ebc', '#219ebc']}
            distortion={0.8}
            speed={0.6}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Decorative gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-chart-3/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-chart-2/20 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Main Card */}
      <Card className="relative z-10 w-full h-auto max-w-md mx-4 border-none shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden">
        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-3xl">
            <Loader message="Updating password..." />
          </div>
        )}

        {/* Header */}
        <CardHeader className="text-center px-8 ">
          <div className="flex justify-center">
            <div className="relative">
              <div className="relative bg-chart-2 p-4 rounded-2xl shadow-lg">
                <KeyRound className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <CardTitle className="text-xl md:text-2xl font-bold text-white">
              Reset Password
            </CardTitle>
            <CardDescription className="text-gray-300 text-sm md:text-base">
              Enter a new password to secure your account
            </CardDescription>
          </div>

          {/* Status Indicator */}
          {tokenVerified ? (
            <div className="flex items-center justify-center gap-2 text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg py-2 px-4">
              <ShieldCheck className="w-4 h-4" />
              <span>Token verified successfully</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-yellow-400 text-sm bg-yellow-500/10 border border-yellow-500/20 rounded-lg py-2 px-4 animate-pulse">
              <Lock className="w-4 h-4" />
              <span>Verifying reset token...</span>
            </div>
          )}
        </CardHeader>

        <CardContent className="px-8 ">
          <form onSubmit={handleSubmit} className="">
            {/* New Password */}
            <div className="space-y-2">
              <Label
                htmlFor="newPassword"
                className="text-white font-medium flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-chart-4" />
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={!tokenVerified}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-chart-2 focus:ring-chart-2/50 h-12 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Must be at least 6 characters long</p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2 mt-2">
              <Label
                htmlFor="confirmPassword"
                className="text-white font-medium flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-chart-4" />
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={!tokenVerified}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-chart-2 focus:ring-chart-2/50 h-12 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-10 md:h-12 bg-chart-2 hover:bg-chart-2/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-3"
              disabled={loading || !tokenVerified}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Updating Password...
                </span>
              ) : !tokenVerified ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5" />
                  Reset Password
                </span>
              )}
            </Button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
            <p className="text-xs text-gray-300 text-center leading-relaxed">
              <span className="font-semibold text-white">Security Tip:</span> Use a strong password
              with a mix of letters, numbers, and special characters.
            </p>
          </div>
        </CardContent>

        {/* Footer Text */}
        <div className="  text-center">
          <p className="text-sm text-gray-400">
            Remember your password?{' '}
            <Link
              href="/"
              className="text-white hover:text-chart-3 font-semibold transition-colors duration-200"
              onClick={() => setIsLogin(true)}
            >
              Sign in instead
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
