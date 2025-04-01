import { currencyCountryCodes } from './currencies';

export function getDefaultCurrency(): string {
  return 'EUR';
}

export const getFlagCode = (currency: string): string => {
  const normalizedCurrency = currency.toLowerCase();
  return normalizedCurrency in currencyCountryCodes ? normalizedCurrency : 'usd';
};

export const formatCurrencyValue = (value: string): string => {
  return parseFloat(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
