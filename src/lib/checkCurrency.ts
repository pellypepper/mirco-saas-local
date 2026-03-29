export const getCurrencySymbol = (currency: string): string => {
    
  const symbols: Record<string, string> = {
  
    GBP: '£',
    USD: '$',
    EUR: '€',
    JPY: '¥',
    CAD: '$',
    AUD: '$',
    CHF: '₣',
    CNY: '¥',
    HKD: '$',
    SGD: '$',
    NZD: '$',

    NGN: '₦',
    ZAR: 'R',
    KES: 'KSh',
    GHS: '₵',
    EGP: '£',
 
    AED: 'د.إ',
    SAR: '﷼',
    INR: '₹',
    PKR: '₨',
    BDT: '৳',
    IDR: 'Rp',
    MYR: 'RM',
    PHP: '₱',
    THB: '฿',
    VND: '₫',
    KRW: '₩',
    TWD: 'NT$',

    SEK: 'kr',
    NOK: 'kr',
    DKK: 'kr',
    PLN: 'zł',
    CZK: 'Kč',
    HUF: 'Ft',
    RON: 'lei',
    TRY: '₺',
    RUB: '₽',
    UAH: '₴',
    ILS: '₪',

    BRL: 'R$',
    MXN: '$',
    ARS: '$',
    CLP: '$',
    COP: '$',
    PEN: 'S/',
  };

  return symbols[currency?.toUpperCase()] ?? currency;
};