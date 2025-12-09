import { useState, useEffect, useCallback } from "react";
import {Service} from "@/types/type";
import { getServices, addService , updateService, deleteService} from "@/services/Services";
import { useUser } from "@/hooks/UserContext";
import { currencies } from "@/data/country";





 const Services = () => {


    const [services, setServices] = useState<Service[]>([]);
    const [serviceName, setServiceName] = useState("");
    const [servicePrice, setServicePrice] = useState("");
   const [serviceCurrency, setServiceCurrency] = useState(currencies[0].code);
  const [serviceDuration, setServiceDuration] = useState("");
    const [serviceDescription, setServiceDescription] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const { profile } = useUser();


const loadServices = useCallback(async (profileId: string) => {
 
  const fetched = await getServices(profileId);
 
  setServices(fetched);
}, []);

     
useEffect(() => {

  loadServices(profile?.id || "");
}, [profile, loadServices]);


const handleAddService = async () => {
  if (!serviceName || !servicePrice) return;


  if (!profile) return;

  if (editingId) {
    // UPDATE
    const updated = await updateService(editingId, {
      title: serviceName,
      price: parseFloat(servicePrice),
      currency: serviceCurrency,
  duration_minutes: Number(serviceDuration),
      description: serviceDescription,
    });

    setServices(services.map(s => s.id === editingId ? updated : s));
    setEditingId(null);
  } else {
    // CREATE
    const newService = await addService(profile.id, {
      title: serviceName,
      price: parseFloat(servicePrice),
      currency: serviceCurrency,
       duration_minutes: Number(serviceDuration),
      description: serviceDescription,
    });

    setServices([...services, newService]);
  }

  setServiceName("");
  setServicePrice("");
  setServiceCurrency(currencies[0].code);
  setServiceDuration("");
  setServiceDescription("");
};

const handleDeleteService = async (id: string) => {
  await deleteService(id);
  setServices(services.filter(s => s.id !== id));

  if (editingId === id) cancelEdit();
};

  const selectedCurrency = currencies.find(c => c.code === serviceCurrency) || currencies[0];

  
  const handleEditService = (service: Service) => {
    setServiceName(service.title);
    setServicePrice(service.price.toString());
    setServiceDescription(service.description || "");
    setServiceCurrency(service.currency || "");
    setServiceDuration(service.duration_minutes ? service.duration_minutes.toString() : "");
    setEditingId(service.id);
  };



  const cancelEdit = () => {
    setServiceName("");
    setServicePrice("");
    setServiceDescription("");
    setServiceCurrency(currencies[0].code);
    setServiceDuration("");
    setEditingId(null);
  };

    return {
        services,
        setServices,
        loadServices,
        handleAddService,
        serviceName,
        setServiceName,
        servicePrice,
        setServicePrice,
        serviceDescription,
        setServiceDescription,
        editingId,
        setEditingId,
        serviceCurrency,
        setServiceCurrency,
        serviceDuration,
        setServiceDuration,
        selectedCurrency,
        currencies,
        cancelEdit,
        handleEditService,
        handleDeleteService

    }
}


export default Services;