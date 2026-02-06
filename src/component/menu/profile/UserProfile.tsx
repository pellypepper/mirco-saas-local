"use client";

import Image from "next/image";
import { Camera, X, User, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Loader from "../../Spinner";
import useUserProfile from "@/hooks/useUserProfile";
import { useMainNavBar } from "@/hooks/MainNavContext";

interface ProviderProfileProps {
  profile: any;
  onClose: () => void;
}

const UserProfile = ({ profile, onClose }: ProviderProfileProps) => {
  const { isDarkMode } = useMainNavBar();

  const {
    formData,
    providerForm,
    loading,
    message,
    error,
    imageUrl,
    fileInputRef,
    handleInputChange,
    handleImageClick,
    handleImageUpload,
    handleSubmit,
  } = useUserProfile(profile);

  /* THEME TOKENS */
  const surface = isDarkMode ? "bg-zinc-800" : "bg-white";
  const surfaceSoft = isDarkMode ? "bg-zinc-900" : "bg-zinc-100";
  const border = isDarkMode ? "border-zinc-700" : "border-zinc-200";

  const textPrimary = isDarkMode ? "text-white" : "text-zinc-900";
  const textMuted = "text-zinc-500";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50 px-4 animate-in fade-in duration-300">
      <div
        className={`w-full max-h-[90vh] overflow-y-auto max-w-lg rounded-3xl shadow-2xl relative animate-in zoom-in duration-500 custom-scrollbar border-2 ${surface} ${border}`}
      >
        {/* HEADER */}
        <div className="sticky top-0 z-10 bg-chart-2 p-6 rounded-t-3xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 md:p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <User size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-3xl font-black text-white">
                  Edit Profile
                </h2>
                <p className="text-white/90 text-sm font-medium">
                  Update your information
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 md:p-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 hover:rotate-90 border border-white/30"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
          </div>
        </div>

        {loading && <Loader message="Updating profile..." />}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center">
            <div className="relative group mb-6">
             

              <div className="relative">
                {imageUrl ? (
                  <div
                    onClick={handleImageClick}
                    className="relative cursor-pointer group/img"
                  >
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-900 shadow-2xl">
                      <Image
                        src={imageUrl}
                        alt="Profile"
                        width={128}
                        height={128}
                        className="object-cover w-full h-full group-hover/img:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                      <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                        <Camera className="text-white w-6 h-6" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={handleImageClick}
                    className={`w-32 h-32 rounded-full flex items-center justify-center cursor-pointer border-4 transition-all duration-300 ${surfaceSoft} ${border}`}
                  >
                    <Camera className="w-8 h-8 text-zinc-500" />
                  </div>
                )}
              </div>

              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <div className="px-3 py-1 bg-zinc-700 rounded-full border-2 border-zinc-900 shadow-lg">
                  <span className="text-white text-xs font-bold uppercase">
                    Change Photo
                  </span>
                </div>
              </div>
            </div>

            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="hidden"
            />
          </div>

          {/* FORM FIELDS */}
          <div className="space-y-5">
            {providerForm.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label
                  htmlFor={field.id}
                  className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${textPrimary}`}
                >
                  <span className="w-1 h-4 bg-chart-4 rounded-full" />
                  {field.label}
                </Label>

                {field.type === "textarea" ? (
                  <textarea
                    id={field.id}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                    className={`w-full rounded-xl px-4 py-3 border-2 resize-none transition-all duration-300 focus:outline-none focus:border-chart-3 ${surfaceSoft} ${border} ${textPrimary}`}
                  />
                ) : (
                  <Input
                    id={field.id}
                    type={field.type}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={handleInputChange}
                    required
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                    className={`w-full rounded-xl px-4 py-3 border-2 transition-all duration-300 focus:outline-none focus:border-chart-3 ${surfaceSoft} ${border} ${textPrimary}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* SUBMIT */}
          <div className={`pt-4 border-t-2 ${border}`}>
            <Button
              type="submit"
              disabled={loading}
              className={`group w-full py-4 rounded-xl font-bold transition-all duration-300 relative overflow-hidden ${
                loading
                  ? `${surfaceSoft} ${border} text-zinc-600`
                  : "bg-chart-2 text-white"
              }`}
            >
        

              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Update Profile
                  </>
                )}
              </span>
            </Button>
          </div>

          {/* FEEDBACK */}
          {message && (
            <div className="bg-chart-3/20 border-2 border-chart-3 rounded-xl p-4">
              <p className="font-bold text-chart-3">{message}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-4">
              <p className="font-bold text-red-500">{error}</p>
            </div>
          )}
        </form>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
         
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #27272a;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #0077b6;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #009689;
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
