import { useEffect, useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { IExchangeRates } from '@/types/apiTypes.interface';
import { baseCurrencyRatesUrl } from '@/utils/urls';

export function useCurrencyConverter(initialCurrency: string) {
  const [rates, loading] = useFetch<IExchangeRates>(
    `${baseCurrencyRatesUrl}/${initialCurrency.toLowerCase()}.json`
  );
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('0');
  const [fromCurrency, setFromCurrency] = useState(initialCurrency);
  const [toCurrency, setToCurrency] = useState('EUR');

  const convert = (value: string, from: string, to: string) => {
    if (!rates) return '0';
    const rate = rates[from.toLowerCase()][to.toLowerCase()];
    return (parseFloat(value) * rate).toFixed(2);
  };

  const flipCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  useEffect(() => {
    if (rates) setToValue(convert(fromValue, fromCurrency, toCurrency));
  }, [fromValue, fromCurrency, toCurrency, rates]);

  return {
    fromValue,
    toValue,
    fromCurrency,
    toCurrency,
    setFromValue,
    setFromCurrency,
    setToCurrency,
    flipCurrencies,
    loading,
  };
}
