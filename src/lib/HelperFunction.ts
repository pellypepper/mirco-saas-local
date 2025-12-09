
 export const downloadReceipt = async (bookingId: string, serviceName: string, providerName: string, formattedDate: string, bookingTime: string, location: string, amount: string, booking: any) => {
    if (!booking) return;

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      canvas.width = 800;
      canvas.height = 1000;
      
      // Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 800, 1000);
      
      // Header
      const gradient = ctx.createLinearGradient(0, 0, 800, 0);
      gradient.addColorStop(0, '#10b981');
      gradient.addColorStop(1, '#3b82f6');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 150);
      
      // Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('PAYMENT RECEIPT', 400, 80);
      
      // Booking ID
      ctx.font = '24px Arial';
      ctx.fillText(bookingId, 400, 120);
      
      // Content
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 28px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('Booking Details', 50, 220);
      
      ctx.font = '20px Arial';
      ctx.fillStyle = '#666666';
      
      const details = [
        { label: 'Service:', value: serviceName },
        { label: 'Provider:', value: providerName },
        { label: 'Date:', value: formattedDate },
        { label: 'Time:', value: bookingTime },
        { label: 'Location:', value: location },
        { label: 'Amount Paid:', value: amount }
      ];
      
      let yPos = 280;
      details.forEach(detail => {
        ctx.fillStyle = '#666666';
        ctx.fillText(detail.label, 50, yPos);
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(detail.value, 250, yPos);
        ctx.font = '20px Arial';
        yPos += 60;
      });
      
      // Footer
      ctx.fillStyle = '#10b981';
      ctx.fillRect(0, 900, 800, 100);
      ctx.fillStyle = '#ffffff';
      ctx.font = '18px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Thank you for your booking!', 400, 950);
      ctx.font = '14px Arial';
      ctx.fillText('Generated on: ' + new Date().toLocaleDateString(), 400, 980);
      
      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `receipt-${bookingId}.png`;
        link.click();
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error('Error generating receipt:', error);
      alert('Error generating receipt. Please try again.');
    }
  };

  // Add to calendar
 export const addToCalendar = (bookingId: string, serviceName: string, providerName: string, formattedDate: string, bookingTime: string, location: string, amount: string, booking: any) => {
    if (!booking) return;

    try {
      const eventDate = new Date(formattedDate + ' ' + bookingTime.split(' - ')[0]);
      const endTime = bookingTime.includes(' - ') ? bookingTime.split(' - ')[1] : bookingTime;
      const eventEndDate = new Date(formattedDate + ' ' + endTime);
      
      const formatDate = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      };
      
      const startDate = formatDate(eventDate);
      const endDate = formatDate(eventEndDate);
      
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(serviceName)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(`Booking with ${providerName}\nBooking ID: ${bookingId}`)}&location=${encodeURIComponent(location)}`;
      
      const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${serviceName}
DESCRIPTION:Booking with ${providerName}\\nBooking ID: ${bookingId}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;
      
      const useGoogle = confirm('Add to Google Calendar? (Click OK)\nOr download calendar file? (Click Cancel)');
      
      if (useGoogle) {
        window.open(googleCalendarUrl, '_blank');
      } else {
        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `booking-${bookingId}.ics`;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error adding to calendar:', error);
      alert('Error adding to calendar. Please try again.');
    }
  };

  // Share functionality
  export const shareBooking = async (setShowShareMenu: React.Dispatch<React.SetStateAction<boolean>>, platform: string, bookingId: string, serviceName: string, providerName: string, formattedDate: string, bookingTime: string, location: string, amount: string, booking: any) => {
    const shareText = `I just booked ${serviceName} with ${providerName} for ${formattedDate}!`;
    const shareUrl = window.location.href;
    
    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({
          title: 'My Booking',
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      let url = '';
      switch (platform) {
        case 'twitter':
          url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
          break;
        case 'facebook':
          url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
          break;
        case 'whatsapp':
          url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
          break;
        case 'email':
          url = `mailto:?subject=${encodeURIComponent('My Booking')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
          break;
        case 'copy':
          navigator.clipboard.writeText(shareUrl);
          alert('Link copied to clipboard!');
          setShowShareMenu(false);
          return;
      }
      window.open(url, '_blank');
    }
    setShowShareMenu(false);
  };