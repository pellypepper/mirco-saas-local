"use client";

import { MapPin,   Mail, Phone, Globe, Briefcase, Users, } from "lucide-react";
import { useGetProviderEmail } from "@/hooks/useUserProfile";
import useExtraService from "@/hooks/extraServices";




const About = ({ provider }: { provider: any }) => {
  const providerWithEmail = useGetProviderEmail(provider.id);
  const { services} = useExtraService(provider.id);



  return (
      <div className="px-8 pb-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main About Content */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Users size={24} className="text-chart-2" />
                    </div>
                    <h2 className="md:text-2xl text-xl font-bold text-gray-900">About Me</h2>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
                    <p className="text-gray-700 text-[12px] leading-relaxed">
                      {provider.bio || "No biography provided yet."}
                    </p>
                  </div>
                </div>
                {/* Specializations/Skills */}
                {services && services.length > 0 && (
  <div>
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 border-chart-2/10  rounded-lg">
        <Briefcase size={24} className="text-chart-2" />
      </div>
      <h3 className="md:text-xl text-lg font-bold text-gray-900">Services</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {services.map((service: any) => (
        <span
          key={service.id}
          className="px-4 py-2 text-sm bg-white border-2 border-chart-2/30 rounded-full text-chart-2 font-medium hover:bg-purple-50 transition-colors"
        >
          {service.title} 
        </span>
      ))}
    </div>
  </div>
)}

                {/* Education/Certifications */}
                {/* {provider.education && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <GraduationCap size={24} className="text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Education & Credentials</h3>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-3">
                      {provider.education.map((edu: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700">{edu}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )} */}
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin size={20} className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-gray-500">Location</div>
                        <div className="text-gray-900 text-[14px]">{provider.location}</div>
                      </div>
                    </div>

                    {providerWithEmail && (
                      <div className="flex items-start gap-3">
                        <Mail size={20} className="text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-gray-500">Email</div>
                          <div className="text-gray-900 break-all text-[14px]">{providerWithEmail.email}</div>
                        </div>
                      </div>
                    )}

                    {provider.phone_number && (
                      <div className="flex items-start gap-3">
                        <Phone size={20} className="text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-gray-500">Phone</div>
                          <div className="text-gray-900 text-[14px]">{provider.phone_number}</div>
                        </div>
                      </div>
                    )}

                    {provider.website && (
                      <div className="flex items-start gap-3">
                        <Globe size={20} className="text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-gray-500">Website</div>
                          <a
                            href={provider.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-chart-2 text-[14px] hover:text-chart-2 hover:underline"
                          >
                            Visit Website
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pricing */}
                {provider.hourly_rate && (
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                    <h3 className="text-lg font-bold mb-2">Session Rate</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold">${provider.hourly_rate}</span>
                      <span className="text-indigo-200 text-lg">/hour</span>
                    </div>
                    <p className="text-indigo-100 text-sm mt-2">
                      Professional consultation fee
                    </p>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Experience</span>
                      <span className="font-bold text-gray-900">
                        {provider.years_of_experience || "N/A"} years
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Clients Served</span>
                      <span className="font-bold text-gray-900">
                        {provider.clients_served || "N/A"}+
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Response Time</span>
                      <span className="font-bold text-gray-900">
                        {provider.response_time || "< 24h"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default About
