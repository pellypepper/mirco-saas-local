"use client";

import { useState, useRef, useEffect } from "react";
import { uploadAvatar, updateProfile, getProviderWithEmail } from "@/services/profileService";

const useUserProfile = (profile: any) => {
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    service_type: profile?.service_type || "",
    phone_number: profile?.phone_number || "",
    bio: profile?.bio || "",
    website: profile?.website || "",
    years_of_experience: profile?.years_of_experience || "",
    location: profile?.location || "",
  });

  const [imageUrl, setImageUrl] = useState(profile?.avatar_url || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const role = profile?.role?.toLowerCase();

  const providerForm =
    role === "provider"
      ? [
          { id: "full_name", label: "Full Name", type: "text" },
          { id: "service_type", label: "Service Type", type: "text" },
              { id: "phone_number", label: "Phone Number", type: "text" },
          { id: "bio", label: "Bio", type: "textarea" },
                      { id: "website", label: "Website", type: "text" },
          { id: "location", label: "Address", type: "text" },
                    { id: "years_of_experience", label: "Years of Experience", type: "text" },
        ]
      : [
          { id: "full_name", label: "Full Name", type: "text" },
          { id: "location", label: "Address", type: "text" },
                      { id: "phone_number", label: "Phone Number", type: "number" },
          { id: "bio", label: "Bio", type: "textarea" },
        ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const url = await uploadAvatar(profile.id, file);
      setImageUrl(url);
      setMessage("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      setError("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await updateProfile(profile.id, role, formData, imageUrl);
      setMessage("Profile updated successfully");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};


export const useGetProviderEmail = (providerId: string) => {
const [providerData, setProviderData] = useState<any>(null);

useEffect(() => {
  async function fetchProvider() {
    const data = await getProviderWithEmail(providerId);
    setProviderData(data);
  }
  fetchProvider();
}, [providerId]);


return providerData;
}



export default useUserProfile;
