"use client";

const ProviderModal = ({ selectedProvider, setSelectedProvider }: { selectedProvider: any; setSelectedProvider: React.Dispatch<React.SetStateAction<any | null>> }) => {
  return (
    <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProvider(null)}>
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-chart-2/80 to-chart-3/80 px-8 py-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {selectedProvider.full_name}
                  </h2>
                  <p className="text-indigo-100 text-sm">
                    {selectedProvider.service_type} • {selectedProvider.location}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProvider(null)}
                  className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all">
                  <span className="text-2xl leading-none">✕</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Contact Information */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-chart-2/80 rounded-full mr-3"></span>
                    Contact Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Email:</span>
                      <span className="text-slate-800 font-medium">
                        {selectedProvider.email}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Phone:</span>
                      <span className="text-slate-800 font-medium">
                        {selectedProvider.phone_number || "—"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Website:</span>
                      <span className="text-slate-800 font-medium truncate ml-2">
                        {selectedProvider.website || "—"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Country:</span>
                      <span className="text-slate-800 font-medium">
                        {selectedProvider.country}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Business Details */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-chart-3/80 rounded-full mr-3"></span>
                    Business Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Experience:</span>
                      <span className="text-slate-800 font-medium">
                        {selectedProvider.years_of_experience
                          ? `${selectedProvider.years_of_experience} years`
                          : "—"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Payout Status:</span>
                      <span
                        className={`font-medium px-2 py-1 rounded-full text-xs ${
                          selectedProvider.payout_enabled
                            ? "bg-green-100 text-chart-2"
                            : "bg-red-100 text-red-700"
                        }`}>
                        {selectedProvider.payout_enabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Stripe Account:</span>
                      <span className="text-slate-800 font-medium text-xs truncate ml-2">
                        {selectedProvider.stripe_account_id || "—"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-gradient-to-br from-chart-2/10 to-chart-3/10 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-chart-2/80 rounded-full mr-3"></span>
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-slate-500 text-sm mb-1">Total Revenue</p>
                    <p className="text-2xl font-bold text-chart-2">
                      ${Number(selectedProvider.revenue || 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-slate-500 text-sm mb-1">Total Bookings</p>
                    <p className="text-2xl font-bold text-chart-3">
                      {selectedProvider.bookings?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Monthly Revenue */}
              {selectedProvider.monthly?.length > 0 && (
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                    Monthly Revenue Breakdown
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedProvider.monthly.map((m: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-white rounded-lg p-3 border border-slate-200">
                        <p className="text-xs text-slate-500 mb-1">{m.month}</p>
                        <p className="text-lg font-semibold text-slate-800">
                          ${Number(m.total || 0).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
  )
}

export default ProviderModal
