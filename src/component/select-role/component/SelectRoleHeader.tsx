"use client";

interface SelectRoleHeaderProps {
  textPrimary: string;
  textSecondary: string;
}

export default function SelectRoleHeader({ textPrimary, textSecondary }: SelectRoleHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h1 className={`text-3xl md:text-5xl font-black ${textPrimary} mb-4`}>
        Choose Your Account Type
      </h1>
      <p className={`text-md md:text-lg ${textSecondary}`}>
        Select how you want to use our platform
      </p>
    </div>
  );
}