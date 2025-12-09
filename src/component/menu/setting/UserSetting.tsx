"use client";

import { useState } from "react";
 import { useChangeEmail, useChangePassword} from "@/hooks/useAuth";

export const ChangeEmailModal = ({ onClose }: { onClose: () => void }) => {
    const [email, setEmail] = useState("");
const { changeEmail, loading, error, message } = useChangeEmail();

 
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-primary-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button
          className="absolute right-6 top-6 text-neutral-400 hover:text-neutral-900"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        <h3 className="text-xl font-semibold mb-4 text-neutral-900">Change Email</h3>

        <input
          type="email"
          placeholder="Enter new email"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:chart-2 bg-neutral-50 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
        {message && <div className="text-sm text-chart-2 mb-2">{message}</div>}

        <div className="flex gap-2">
          <button
            className="flex-1 py-2 bg-chart-2 text-primary-white rounded-lg font-semibold  hover:bg-gray-400 disabled:opacity-60 transition"
        onClick={() => changeEmail(email)}
            disabled={loading}
          >
            {loading ? "Updating…" : "Update Email"}
          </button>
          <button
            className="py-2 px-4 rounded-lg border"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </div>

        <p className="mt-3 text-xs text-neutral-500">
          We will send a confirmation email to the new address. The email change is applied only after the user confirms via the link.
        </p>
      </div>
    </div>
  );
};


export const ChangePasswordModal = ({ onClose }: { onClose: () => void }) => {
const [oldPassword, setOldPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const { changePassword, loading, error, message } = useChangePassword();


  return (
    <div className="fixed  inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-primary-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button
          className="absolute right-6 top-6 text-neutral-400 hover:text-neutral-900"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <h3 className="text-xl font-semibold mb-4 text-neutral-900">Change Password</h3>

        <input
          type="password"
          placeholder="Current password"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:chart-2 bg-neutral-50 mb-3"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New password (min 8 chars)"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:chart-2 bg-neutral-50 mb-3"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm new password"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:chart-2 bg-neutral-50 mb-3"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
        {message && <div className="text-sm text-chart-2">{message}</div>}

        <div className="flex gap-2">
          <button
            onClick={() => changePassword(oldPassword, newPassword, confirmPassword)}
            disabled={loading}
            className="flex-1 py-2 bg-chart-2 text-primary-white rounded-lg font-semibold hover:bg-gray-400 disabled:opacity-60 transition"
          >
            {loading ? "Updating…" : "Update Password"}
          </button>
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-lg border"
            disabled={loading}
          >
            Cancel
          </button>
        </div>

        <p className="mt-3 text-xs text-neutral-500">
          For security, we verify your current password before changing it. You may be asked to sign in again after the change.
        </p>
      </div>
    </div>
  );
};
