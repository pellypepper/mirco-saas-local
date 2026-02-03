"use client"; 

import { useState, useEffect } from 'react';
import { notificationService, type Notification as NotificationType } from '@/services/notificationService';

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Load notifications from localStorage
    const stored = localStorage.getItem('admin_notifications');
    if (stored) {
      const parsed = JSON. parse(stored);
      setNotifications(parsed);
      setUnreadCount(parsed.filter((n: NotificationType) => !n.read).length);
    }

    // Subscribe to real-time notifications
    const unsubscribe = notificationService. subscribeToNotifications((notification) => {
      setNotifications((prev) => {
        const updated = [notification, ...prev].slice(0, 50); // Keep last 50
        localStorage.setItem('admin_notifications', JSON.stringify(updated));
        return updated;
      });
      setUnreadCount((prev) => prev + 1);

      // Show browser notification if permission granted
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/logo.png',
          badge: '/logo.png',
        });
      }

      // Play notification sound
      try {
        const audio = new Audio('/notification.mp3');
        audio.volume = 0.5;
        audio.play();
      } catch (error) {
        console.log('Could not play notification sound');
      }
    });

    // Request browser notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => {
      unsubscribe();
    };
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      localStorage.setItem('admin_notifications', JSON.stringify(updated));
      setUnreadCount(updated.filter((n) => !n.read).length);
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      localStorage.setItem('admin_notifications', JSON.stringify(updated));
      setUnreadCount(0);
      return updated;
    });
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.removeItem('admin_notifications');
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      localStorage.setItem('admin_notifications', JSON.stringify(updated));
      setUnreadCount(updated.filter((n) => !n.read).length);
      return updated;
    });
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearAll,
    deleteNotification,
  };
}