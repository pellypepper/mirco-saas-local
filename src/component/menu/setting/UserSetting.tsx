"use client";

import { useState } from "react";
import { useChangeEmail, useChangePassword } from "@/hooks/useAuth";
import {
  Mail,
  Lock,
  X,
  CheckCircle,
  AlertCircle,
  Shield,
  Key,
} from "lucide-react";
import { useMainNavBar } from "@/hooks/MainNavContext";


/* ========================================================= */
/* ===================== CHANGE EMAIL ====================== */
/* ========================================================= */

export const ChangeEmailModal = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const { changeEmail, loading, error, message } = useChangeEmail();
  const { isDarkMode } = useMainNavBar();

  /* THEME TOKENS */
  const surface = isDarkMode ? "bg-zinc-800" : "bg-white";
  const surfaceSoft = isDarkMode ? "bg-zinc-900" : "bg-zinc-100";
  const border = isDarkMode ? "border-zinc-700" : "border-zinc-200";
  const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
  const textMuted = "text-zinc-500";

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div
        className={`border-2 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in ${surface} ${border}`}
      >
        {/* Header */}
        <div className="bg-chart-2 p-6 flex justify-between items-center">
          <div className="flex gap-3">
            <div className="p-3 bg-white/20 rounded-xl border border-white/30">
              <Mail className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">Change Email</h3>
              <p className="text-white/90 text-sm">
                Update your email address
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-xl hover:rotate-90 transition"
          >
            <X className="text-white" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Input */}
          <div className="space-y-2">
            <label
              className={`text-sm font-bold uppercase tracking-wider flex gap-2 ${textPrimary}`}
            >
              <span className="w-1 h-4 bg-chart-2 rounded-full" />
              New Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your new email"
                className={`w-full pl-12 py-3 border-2 rounded-xl ${surfaceSoft} ${border} ${textPrimary} placeholder-zinc-500 focus:border-chart-3 outline-none transition`}
              />
            </div>
          </div>

          {error && <Message type="error" text={error} />}
          {message && <Message type="success" text={message} />}

          {/* Buttons */}
          <div className={`flex gap-3 pt-4 border-t-2 ${border}`}>
            <button
              onClick={onClose}
              disabled={loading}
              className={`flex-1 py-3 border-2 rounded-xl font-bold ${surfaceSoft} ${border} ${textPrimary}`}
            >
              Cancel
            </button>

            <button
              onClick={() => changeEmail(email)}
              disabled={loading || !email}
              className={`group flex-1 py-3 rounded-xl font-bold text-white relative overflow-hidden ${
                loading || !email
                  ? `${surfaceSoft} ${border} text-zinc-600`
                  : "bg-chart-2 hover:shadow-[0_0_30px_rgba(235,115,35,0.3)]"
              }`}
            >
              {!loading && email && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition duration-1000" />
              )}
              <span className="relative">
                {loading ? "Updating..." : "Update Email"}
              </span>
            </button>
          </div>

          <InfoNote
            text="We will send a confirmation email to the new address. Changes apply after confirmation."
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
};

/* ========================================================= */
/* =================== CHANGE PASSWORD ===================== */
/* ========================================================= */
export const ChangePasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isDarkMode } = useMainNavBar();


  /* THEME TOKENS */
  const surface = isDarkMode ? "bg-zinc-800" : "bg-white";
  const border = isDarkMode ? "border-zinc-700" : "border-zinc-200";

  const { changePassword, loading, error, message } = useChangePassword();

  const passwordsMatch =
    newPassword.length > 0 &&
    confirmPassword.length > 0 &&
    newPassword === confirmPassword;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className={`${border} ${surface} rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in`}>
        {/* Header */}
        <div className="bg-chart-2 p-6 flex justify-between items-center">
          <div className="flex gap-3">
            <div className="p-3 bg-white/20 rounded-xl border border-white/30">
              <Lock className="text-white" />
            </div>
            <div>
              <h3 className={`text-2xl font-black text-white`}>
                Change Password
              </h3>
              <p className="text-white/90 text-sm">
                Update your password
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-xl hover:rotate-90 transition"
          >
            <X className="text-white" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <PasswordInput
            label="Current Password"
            icon={<Key />}
            value={oldPassword}
            onChange={setOldPassword}
          />

          <PasswordInput
            label="New Password"
            icon={<Lock />}
            value={newPassword}
            onChange={setNewPassword}
          />

          <PasswordInput
            label="Confirm Password"
            icon={<CheckCircle />}
            value={confirmPassword}
            onChange={setConfirmPassword}
          />

          {!passwordsMatch && confirmPassword && (
            <p className="text-red-400 text-sm font-semibold">
              Passwords do not match
            </p>
          )}

          {error && <Message type="error" text={error} />}
          {message && <Message type="success" text={message} />}

          <div className={`flex gap-3 pt-4 border-t-2 ${isDarkMode ? "border-zinc-700" : "border-zinc-200"}`}>
            <button
              onClick={onClose}
              disabled={loading}
              className={`flex-1 py-3 rounded-xl font-bold border-2 transition ${
                isDarkMode
                  ? "bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800"
                  : "bg-white border-zinc-300 text-zinc-900 hover:bg-zinc-50"
              }`}
            >
              Cancel
            </button>

            <button
              onClick={() =>
                changePassword(oldPassword, newPassword, confirmPassword)
              }
              disabled={
                loading ||
                !oldPassword ||
                !newPassword ||
                !confirmPassword ||
                !passwordsMatch
              }
              className={`group flex-1 py-3 rounded-xl font-bold text-white relative overflow-hidden transition ${
                loading || !passwordsMatch
                  ? isDarkMode
                    ? "bg-zinc-900 border-2 border-zinc-700 text-zinc-600"
                    : "bg-zinc-200 border-2 border-zinc-300 text-zinc-400"
                  : "bg-chart-2 hover:shadow-[0_0_30px_rgba(235,115,35,0.3)]"
              }`}
            >
              <span className="relative">
                {loading ? "Updating..." : "Update Password"}
              </span>
            </button>
          </div>

          <InfoNote
            text="For security, you may be asked to sign in again after changing your password."
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
};

/* ========================================================= */
/* ================== SHARED COMPONENTS ==================== */
/* ========================================================= */

import { Eye, EyeOff } from 'lucide-react'; 

interface PasswordInputProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  id?: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
}

const PasswordInput = ({ 
  label, 
  icon, 
  value, 
  onChange,
  id,
  placeholder,
  autoComplete = "current-password",
  error
}: PasswordInputProps) => {
  const { isDarkMode } = useMainNavBar();
  const [showPassword, setShowPassword] = useState(false);

  /* THEME TOKENS */
  const surface = isDarkMode ? "bg-zinc-900" : "bg-zinc-100";
  const border = isDarkMode ? "border-zinc-700" : "border-zinc-200";
  const errorBorder = "border-red-500";
  const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
  const textMuted = "text-zinc-500";
  const textError = "text-red-500";
  
  const inputId = id || `password-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="space-y-2">
      <label 
        htmlFor={inputId}
        className={`text-sm font-bold uppercase tracking-wider flex gap-2 ${textPrimary}`}
      >
        <span className="w-1 h-4 bg-chart-2 rounded-full" />
        {label}
      </label>
      <div className="relative">
        <span className={`absolute left-4 top-1/2 -translate-y-1/2 ${textMuted}`}>
          {icon}
        </span>
        <input
          id={inputId}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`w-full pl-12 pr-12 py-3 ${surface} ${error ? errorBorder : border} rounded-xl ${textPrimary} focus:border-chart-3 outline-none transition`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={`absolute right-4 top-1/2 -translate-y-1/2 ${textMuted} hover:${textPrimary} transition`}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && (
        <p id={`${inputId}-error`} className={`text-sm ${textError}`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;

const Message = ({ type, text }: any) => (
  <div
    className={`border-2 rounded-xl p-4 flex gap-3 ${
      type === "error"
        ? "bg-red-500/20 border-red-500 text-red-400"
        : "bg-chart-3/20 border-chart-3 text-chart-3"
    }`}
  >
    <AlertCircle />
    <p className="text-sm font-semibold">{text}</p>
  </div>
);

const InfoNote = ({
  text,
  isDarkMode,
}: {
  text: string;
  isDarkMode: boolean;
}) => (
  <div
    className={`border-2 rounded-xl p-4 flex gap-3 transition ${
      isDarkMode
        ? "bg-zinc-900 border-zinc-700 text-zinc-400"
        : "bg-zinc-50 border-zinc-200 text-zinc-600"
    }`}
  >
    <Shield className={`${isDarkMode ? "text-chart-2" : "text-chart-2"}`} />
    <p className="text-xs">{text}</p>
  </div>
);