'use client';

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import Loader from "../Spinner";
import SuccessModal from "../SuccessModal";
import ErrorModal from "../ErrorModal";
import { countries } from "../../data/country";
import { useProviderSignupForm } from "@/hooks/useProviderSignupLogic";

export default function ProviderSignupForm({
  onSubmit: parentOnSubmit,
  setIsLogin,
  setIsProviderSignup,
}: {
  onSubmit?: (data: any) => void;
  onClose: () => void;
  setIsLogin: (value: boolean) => void;
  setIsProviderSignup: (value: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    isSubmitting,
    serviceTypes,
    successOpen,
    setSuccessOpen,
    errorOpen,
    setErrorOpen,
    errorMessage,
    selectedServiceType,
    loading,
    error,
    message,
    onSubmit,
  } = useProviderSignupForm(parentOnSubmit);

  return (
    <DialogContent className="sm:max-w-lg w-full p-0">
      <SuccessModal
        open={successOpen}
        onClose={() => {
          setSuccessOpen(false);
          setIsProviderSignup(false);
          setIsLogin(true);
        }}
        title="Provider Created!"
        message="Your provider profile has been successfully set up."
        buttonText="Click to Sign in"
      />
      <ErrorModal
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        title="Signup Failed"
        message={errorMessage}
        buttonText="Close"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18 }}
      >
        <Card className="w-full rounded-none sm:rounded-2xl shadow-lg overflow-hidden">
          <CardHeader className="px-6 py-4">
            <CardTitle className="text-2xl font-bold text-chart-2 text-center">
              Become a Service Provider
            </CardTitle>
            <CardDescription className="text-center">
              Fill out the form below so customers can find your services.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pt-0 pb-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {["name", "email", "password", "phone number", "address"].map((field) => (
                  <div key={field}>
                    <Label htmlFor={field}>
                      {field.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </Label>
                    <Input
                      id={field}
                      type={field === "password" ? "password" : "text"}
                      placeholder={`Enter your ${field.replace("_", " ")}`}
                      {...register(field, { required: `${field.replace("_", " ")} is required` })}
                    />
                    {errors[field] && (
                      <p className="text-xs text-destructive mt-1">
                        {errors[field]?.message as string}
                      </p>
                    )}
                  </div>
                ))}
                <div>
                  <Label htmlFor="service_type">Service Type</Label>
                  <select
                    id="service_type"
                    {...register("service_type", { required: "Service type is required" })}
                    className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
                    onChange={(e) => setValue("service_type", e.target.value)}
                  >
                    <option value="">Select a service type</option>
                    {serviceTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  {errors.service_type && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.service_type?.message as string}
                    </p>
                  )}
                </div>
                {selectedServiceType === "Other" && (
                  <div>
                    <Label htmlFor="custom_service_type">Enter New Service Type</Label>
                    <Input
                      id="custom_service_type"
                      placeholder="Enter your custom service type"
                      {...register("custom_service_type", { required: "Please enter a service type" })}
                    />
                    {errors.custom_service_type && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.custom_service_type?.message as string}
                      </p>
                    )}
                  </div>
                )}
                <div>
                  <Label htmlFor="country">Country</Label>
                  <select
                    id="country"
                    {...register("country", { required: "Country is required" })}
                    className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
                  >
                    <option value="">Select your country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.country?.message as string}
                    </p>
                  )}
                </div>
              </div>
              <div className="pt-2 space-y-2">
                <Button
                  type="submit"
                  className="w-full flex items-center justify-center"
                  disabled={isSubmitting || loading}
                >
                  {(loading || isSubmitting) && (
                    <div className="mr-2">
                      <Loader message="Setting up your provider profile..." />
                    </div>
                  )}
                  {loading || isSubmitting ? "Signing up..." : "Sign up as provider"}
                </Button>
                {error && <p className="text-xs text-destructive text-center">{error}</p>}
                {message && <p className="text-xs text-green-600 text-center">{message}</p>}
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </DialogContent>
  );
}