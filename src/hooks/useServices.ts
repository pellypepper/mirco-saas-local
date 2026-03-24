'use client';

import { useState, useEffect, useCallback } from 'react';
import { Service } from '@/types/type';
import { getServices, addService, updateService, deleteService } from '@/services/Services';
import { useUser } from '@/hooks/UserContext';
import { currencies } from '@/data/country';
import { set } from 'react-hook-form';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [errorDeleteMessage, setErrorDeleteMessage] = useState('');
  const [showDeleteError, setShowDeleteError] = useState(false);
  const [serviceCurrency, setServiceCurrency] = useState(currencies[0].code);
  const [serviceDuration, setServiceDuration] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const { profile } = useUser();

  const loadServices = useCallback(async (profileId: string) => {
    const fetched = await getServices(profileId);

    setServices(fetched);
  }, []);

  useEffect(() => {
    loadServices(profile?.id || '');
  }, [profile, loadServices]);

const handleAddService = async () => {
  if (!serviceName || !servicePrice) {
    setErrorMessage('Name and price are required.');
    setShowError(true);
    return;
  }

  if (!profile) {
    setErrorMessage('Profile not loaded.');
    setShowError(true);
    return;
  }

  try {
    if (editingId) {
      // UPDATE
      const updated = await updateService(editingId, {
        title: serviceName,
        price: parseFloat(servicePrice),
        currency: serviceCurrency,
        duration_minutes: Number(serviceDuration),
        description: serviceDescription,
      });

      setServices((prev) =>
        prev.map((s) => (s.id === editingId ? updated : s))
      );

      setEditingId(null);
      setSuccessMessage('Service updated successfully!');
    } else {
      // CREATE
      const newService = await addService(profile.id, {
        title: serviceName,
        price: parseFloat(servicePrice),
        currency: serviceCurrency,
        duration_minutes: Number(serviceDuration),
        description: serviceDescription,
      });

      setServices((prev) => [...prev, newService]);
      setSuccessMessage('Service added successfully!');
    }

    setShowSuccess(true);

    // reset form
    setServiceName('');
    setServicePrice('');
    setServiceCurrency(currencies[0].code);
    setServiceDuration('');
    setServiceDescription('');
  } catch (err) {
    console.error(err);
    setErrorMessage('Something went wrong while saving the service.');
    setShowError(true);
  }
};

const handleDeleteService = async (id: string) => {
  try {
    await deleteService(id);

    setServices((prev) => prev.filter((s) => s.id !== id));

    setDeleteMessage('Service deleted successfully!');
    setShowDelete(true);

    if (editingId === id) {
      cancelEdit();
    }
  } catch (err) {
    console.error(err);
    setErrorDeleteMessage('Failed to delete service.');
    setShowDeleteError(true);
  }
};

  const selectedCurrency = currencies.find((c) => c.code === serviceCurrency) || currencies[0];

  const handleEditService = (service: Service) => {
    setServiceName(service.title);
    setServicePrice(service.price.toString());
    setServiceDescription(service.description || '');
    setServiceCurrency(service.currency || '');
    setServiceDuration(service.duration_minutes ? service.duration_minutes.toString() : '');
    setEditingId(service.id);
  };

  const cancelEdit = () => {
    setServiceName('');
    setServicePrice('');
    setServiceDescription('');
    setServiceCurrency(currencies[0].code);
    setServiceDuration('');
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
    handleDeleteService,
    showSuccess,
    setShowSuccess,
    successMessage,

    showError,
    setShowError,
    errorMessage,
errorDeleteMessage,

    showDeleteError,
    setShowDeleteError,
    showDelete,
    setShowDelete,
    deleteMessage,
  };
};

export default Services;
