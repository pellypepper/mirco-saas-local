"use client";

import  ServiceHeader from "@/component/ProviderService/component/serviceHeader";
import ServiceMain from "@/component/ProviderService/component/serviceMain";
import ServiceGrid from "@/component/ProviderService/component/serviceGrid";
import Services from "@/hooks/useServices";

export default function ServicesPage() {
  const { 
    services,
    currencies,
    selectedCurrency,
    handleAddService,
    serviceName,
    setServiceName,
    servicePrice,
    setServicePrice,
    serviceDescription,
    setServiceDescription,
    editingId,
    handleEditService,
    serviceCurrency,
    setServiceCurrency,
    serviceDuration,
    setServiceDuration,
    cancelEdit,
    handleDeleteService
  } = Services();

  const totalRevenue = services.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className=" mx-auto space-y-6">
        
        {/* HERO HEADER */}
        <ServiceHeader
          services={services} 
          totalRevenue={totalRevenue}
          selectedCurrency={selectedCurrency}
          serviceCurrency={serviceCurrency}

        />

        {/* ADD/EDIT SERVICE FORM */}
     <ServiceMain
          handleAddService={handleAddService}
          serviceName={serviceName}
          setServiceName={setServiceName}
          servicePrice={servicePrice}
          setServicePrice={setServicePrice}
          serviceDescription={serviceDescription}
          setServiceDescription={setServiceDescription}
          editingId={editingId}
          serviceCurrency={serviceCurrency}
          setServiceCurrency={setServiceCurrency}
          serviceDuration={serviceDuration}
          setServiceDuration={setServiceDuration}
          cancelEdit={cancelEdit}
          selectedCurrency={selectedCurrency}
          currencies={currencies}

        />

        {/* SERVICES GRID */}
        <ServiceGrid
          services={services}
         currencies={currencies}
          handleEditService={handleEditService}
          handleDeleteService={handleDeleteService}
        />
      </div>
    </div>
  );
}