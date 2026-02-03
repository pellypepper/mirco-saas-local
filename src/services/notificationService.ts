import { supabase } from "@/libs/supabaseClient";

export type NotificationType = 
   | "new_booking"
  | "booking_cancelled"
  | "booking_confirmed"
  | "booking_pending"
  | "booking_rescheduled"
  | "new_user"
  | "payment_received"
  | "payout_requested"
  | "error"
  | "system";

  const isValidType = (type: string): type is NotificationType => {
  return [
    'new_booking',
    'booking_cancelled',
    'booking_confirmed',
    'booking_pending',
    'booking_rescheduled',
    'new_user',
    'payment_received',
    'payout_requested',
    'error',
    'system',
  ].includes(type);
};


export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  severity: "info" | "success" | "warning" | "error";
  link?: string;
}

export const notificationService = {
  // Subscribe to real-time notifications
subscribeToNotifications: (onNotification: (n: Notification) => void) => {
  const channel = supabase
    .channel('notifications-feed')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
      },
      (payload) => {
        const db = payload.new as any;

        onNotification({
          id: db.id,
          type: isValidType(db.type) ? db.type : 'system',
          title: db.title,
          message: db.message,
          severity: db.severity ?? 'info',
          read: db.read ?? false,
          link: db.link,
          time: notificationService.formatTime(db.created_at),
        });
      }
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
},


  // Get notification icon and color
  getNotificationStyle: (type: NotificationType) => {
    const styles = {
 new_booking: { icon: '📅', color: 'bg-blue-100 text-blue-600' },

  booking_confirmed: { icon: '✅', color: 'bg-green-100 text-green-600' },
  booking_cancelled: { icon: '❌', color: 'bg-red-100 text-red-600' },
  booking_pending: { icon: '⏳', color: 'bg-yellow-100 text-yellow-600' },
  booking_rescheduled: { icon: '🔁', color: 'bg-purple-100 text-purple-600' },

  new_user: { icon: '👤', color: 'bg-green-100 text-green-600' },
  payment_received: { icon: '💰', color: 'bg-emerald-100 text-emerald-600' },
  payout_requested: { icon: '💸', color: 'bg-purple-100 text-purple-600' },

  error: { icon: '⚠️', color: 'bg-red-100 text-red-600' },
  system: { icon: 'ℹ️', color: 'bg-slate-100 text-slate-600' },
    };
    return styles[type] || styles.system;
  },

  // Format relative time
  formatTime: (timestamp: string) => {
    const now = new Date();
    const notifTime = new Date(timestamp);
    const diff = now.getTime() - notifTime.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' :  ''} ago`;
  }
};