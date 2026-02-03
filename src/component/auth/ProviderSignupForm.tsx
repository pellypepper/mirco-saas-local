'use client';

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import Loader from "../Spinner";
import SuccessModal from "../SuccessModal";
import ErrorModal from "../ErrorModal";
import { countries } from "../../data/country";
import { useProviderSignupForm } from "@/hooks/useProviderSignupLogic";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {Mail, Lock, Phone, MapPin, Globe, Wrench, User, CheckCircle, X } from "lucide-react";

export default function ProviderSignupForm({
  onSubmit:  parentOnSubmit,
  setIsLogin,
  setIsProviderSignup,
}:  {
  onSubmit?: (data: any) => void;
  setIsLogin: (value:  boolean) => void;
  setIsProviderSignup: (value: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
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

  const fieldIcons:  { [key: string]: any } = {
    name: User,
    email: Mail,
    password: Lock,
    "phone number": Phone,
    address:  MapPin,
  };

 

  return (
    <>
      <VisuallyHidden>
        <DialogTitle>Become a Service Provider</DialogTitle>
      </VisuallyHidden>

      <VisuallyHidden>
        <DialogDescription>
          Provider signup form to create a service provider account. 
        </DialogDescription>
      </VisuallyHidden>

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
        animate={{ opacity:  1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="overflow-y-auto max-h-[90vh] rounded-3xl custom-scrollbar"
      >
      <Card className="w-full border-none shadow-2xl rounded-3xl overflow-hidden bg-zinc-800 border-2 border-zinc-700 relative">
  
  {/* Your Custom Close Button */}
  <DialogClose asChild>
    <button className="absolute right-4 top-4 z-50 p-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 hover:rotate-90 border border-white/30 group">
      <X className="w-5 h-5 text-white" />
    </button>
  </DialogClose>
         
          <CardHeader className="relative px-8 py-8 text-center space-y-4">
        
            <CardTitle className="text-2xl md:text-3xl font-bold text-white">
              Become a Service Provider
            </CardTitle>

            <CardDescription className="text-sm text-zinc-300">
              Fill out the form below to create your professional profile and start connecting with customers
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/20">
                  <User className="w-5 h-5 text-chart-2" />
                  <h3 className="font-semibold text-white">Personal Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["name", "email", "password", "phone number"]. map((field) => {
                    const Icon = fieldIcons[field];
                    return (
                      <div key={field} className={field === "email" || field === "password" ? "md:col-span-1" :  ""}>
                        <Label
                          htmlFor={field}
                          className="text-white font-medium flex items-center gap-2 mb-2"
                        >
                          <Icon className="w-4 h-4 text-white" />
                          {field.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                        </Label>
                        <Input
                          id={field}
                          type={field === "password" ? "password" : field === "email" ? "email" :  "text"}
                          placeholder={`Enter your ${field. replace("_", " ")}`}
                          {...register(field, { required: `${field.replace("_", " ")} is required` })}
                          className="h-11 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-zinc-400 focus:border-[#009689] focus:ring-[#009689]/50 transition-all"
                        />
                        {errors[field as keyof typeof errors] && (
                          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                            <span>⚠️</span>
                            {errors[field as keyof typeof errors]?.message as string}
                          </p>
                        )}
                      </div>
                    );
                  })}

                  {/* Address - Full Width */}
                  <div className="md:col-span-2">
                    <Label
                      htmlFor="address"
                      className="text-white font-medium flex items-center gap-2 mb-2"
                    >
                      <MapPin className="w-4 h-4 text-white" />
                      Address
                    </Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Enter your address"
                      {...register("address", { required: "Address is required" })}
                      className="h-11 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-zinc-400 focus:border-chart-2 focus:ring-chart-2/50 transition-all"
                    />
                    {errors.address && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <span>⚠️</span>
                        {errors.address?. message as string}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Service Information Section */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/20">
                  <Wrench className="w-5 h-5 text-chart-2" />
                  <h3 className="font-semibold text-white">Service Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Service Type */}
                  <div>
                    <Label
                      htmlFor="service_type"
                      className="text-white font-medium flex items-center gap-2 mb-2"
                    >
                      <Wrench className="w-4 h-4 text-white" />
                      Service Type
                    </Label>
                    <select
                      id="service_type"
                      {...register("service_type", { required: "Service type is required" })}
                      className="w-full h-11 border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:border-chart-2 focus:ring-2 focus: ring-chart-2/50 transition-all bg-white/10 text-white"
                      onChange={(e) => setValue("service_type", e.target.value)}
                    >
                      <option value="" className="bg-zinc-900">Select a service type</option>
                      {serviceTypes.map((type) => (
                        <option key={type} value={type} className="bg-zinc-900">{type}</option>
                      ))}
                      <option value="Other" className="bg-zinc-900">Other</option>
                    </select>
                    {errors.service_type && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <span>⚠️</span>
                        {errors.service_type?.message as string}
                      </p>
                    )}
                  </div>

                  {/* Country */}
                  <div>
                    <Label
                      htmlFor="country"
                      className="text-white font-medium flex items-center gap-2 mb-2"
                    >
                      <Globe className="w-4 h-4 text-white" />
                      Country
                    </Label>
                    <select
                      id="country"
                      {...register("country", { required: "Country is required" })}
                      className="w-full h-11 border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:border-chart-4 focus:ring-2 focus:ring-chart-4/50 transition-all bg-white/10 text-white"
                    >
                      <option value="" className="bg-zinc-900">Select your country</option>
                      {countries.map((country) => (
                        <option key={country} value={country} className="bg-zinc-900 text-white">{country}</option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <span>⚠️</span>
                        {errors.country?.message as string}
                      </p>
                    )}
                  </div>

                  {/* Custom Service Type  */}
                  {selectedServiceType === "Other" && (
                    <div className="md:col-span-2">
                      <Label
                        htmlFor="custom_service_type"
                        className="text-white font-medium flex items-center gap-2 mb-2"
                      >
                        <Wrench className="w-4 h-4 text-white" />
                        Enter New Service Type
                      </Label>
                      <Input
                        id="custom_service_type"
                        placeholder="Enter your custom service type"
                        {...register("custom_service_type", { required: "Please enter a service type" })}
                        className="h-11 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-zinc-400 focus:border-chart-4 focus:ring-chart-4/50 transition-all"
                      />
                      {errors.custom_service_type && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <span>⚠️</span>
                          {errors.custom_service_type?.message as string}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Benefits Box */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 mt-6">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-chart-2" />
                  What you'll get:  
                </h4>
                <ul className="space-y-2 text-sm text-zinc-300">
                  {[
                    "Professional profile visible to thousands of customers",
                    "Manage bookings and schedules in one place",
                    "Secure payment processing",
                    "24/7 customer support",
                    "Marketing tools to grow your business"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-white mt-0.5">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Submit Button */}
              <div className="pt-4 space-y-3">
                <Button
                  type="submit"
                  className="w-full h-12 bg-chart-2 text-white hover:shadow-xl hover:shadow-[#eb7323]/50 hover:scale-105 transition-all duration-300 rounded-xl font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={isSubmitting || loading}
                >
                  {(loading || isSubmitting) ? (
                    <div className="flex items-center gap-2">
                      <Loader />
                      <span>Setting up your profile...</span>
                    </div>
                  ) : (
                    "Create Provider Account"
                  )}
                </Button>

                {error && (
                  <p className="text-sm text-red-400 text-center bg-red-500/20 backdrop-blur-sm py-2 rounded-lg border border-red-500/30">
                    {error}
                  </p>
                )}
                {message && (
                  <p className="text-sm text-green-400 text-center bg-green-500/20 backdrop-blur-sm py-2 rounded-lg border border-green-500/30">
                    {message}
                  </p>
                )}

                {/* Terms */}
                <p className="text-xs text-zinc-400 text-center pt-2">
                  By signing up, you agree to our{" "}
                  <a href="#" className="text-white hover:underline font-medium">
                    Provider Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-white hover:underline font-medium">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0077b6;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #0077b6;
          border-radius: 10px;
          transition: background 0.3s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0077b6;
        }
        
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color:  #0077b6 rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </>
  );
}