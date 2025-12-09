"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Loader from "../../Spinner";
import useUserProfile from "@/hooks/useUserProfile";

interface ProviderProfileProps {
  profile: any;
  onClose: () => void;
}

const UserProfile = ({ profile, onClose }: ProviderProfileProps) => {
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
  


  return (
    <div className="fixed layout inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4">
      <div className="w-full door max-h-[90vh] overflow-y-auto  max-w-md bg-white rounded-xl shadow-lg p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Edit Profile</h2>

        {loading && <Loader message="Loading..." />}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Image */}
          <div className="relative flex justify-center">
            {imageUrl ? (
              <div
                className="relative cursor-pointer group"
                onClick={handleImageClick}
              >
                <Image
                  src={imageUrl}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="object-cover rounded-full w-20 h-20 mb-2"
                />
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <Camera className="text-white w-6 h-6" />
                </div>
              </div>
            ) : (
              <div
                className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition"
                onClick={handleImageClick}
              >
                <Camera className="text-gray-600 w-6 h-6" />
              </div>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="hidden"
            />
          </div>

          {/* Dynamic Form Fields */}
          {providerForm.map((field) => (
            <div key={field.id} className="space-y-1">
              <Label htmlFor={field.id}>{field.label}</Label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.id}
                  value={formData[field.id as keyof typeof formData]}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                  rows={4}
                />
              ) : (
                <Input
                  id={field.id}
                  type={field.type}
                  value={formData[field.id as keyof typeof formData]}
                  onChange={handleInputChange}
                  required
                />
              )}
            </div>
          ))}

          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </Button>

          {message && <p className="text-green-600 mt-2">{message}</p>}
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
