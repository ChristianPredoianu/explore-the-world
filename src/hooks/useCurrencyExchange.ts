import { useState, useEffect } from 'react';
import { currencyCountryCodes } from '@/utils/currencies';
import { IExchangeRates } from '@/types/apiTypes.interface';
import { baseCurrencyRatesUrl } from '@/utils/urls';
import { useFetch } from './useFetch';

export function useCurrencyExchange(currency: string) {
  const [currencyFromValue, setCurrencyFromValue] = useState('1');
  const [currencyToValue, setCurrencyToValue] = useState('0');
  const [initialCurrency, setInitialCurrency] = useState(currency);
  const [selectedCurrency, setSelectedCurrency] = useState(
    Object.keys(currencyCountryCodes)[47]
  );
  const [isFlipped, setIsFlipped] = useState(false);
  const [countryFlagFrom, setCountryFlagFrom] = useState(currency.toLowerCase());
  const [countryFlagTo, setCountryFlagTo] = useState('eur');

  const supportedCurrenciesUrl = `${baseCurrencyRatesUrl}/${currency.toLowerCase()}.json`;

  const [initialCurrencyExchRates] = useFetch<IExchangeRates>(supportedCurrenciesUrl);

  const currencyArray = Object.keys(currencyCountryCodes);

  useEffect(() => {
    setInitialCurrency(currency);
    setCountryFlagFrom(currency.toLowerCase());
  }, [currency]);

  useEffect(() => {
    if (!isFlipped) {
      setInitialCurrency(currency);
      setCountryFlagFrom(currency.toLowerCase());
    }
  }, [isFlipped]);

  useEffect(() => {
    isFlipped ? flipConversion() : initialConversion();
  }, [currencyFromValue, selectedCurrency, initialCurrencyExchRates]);

  function getExchangeRates(userSelectedCurrency: string) {
    if (isFlipped) {
      setIsFlipped(false);
      setCurrencyFromValue('1');
    }

    if (userSelectedCurrency !== undefined) {
      setCountryFlagTo(userSelectedCurrency);
      setSelectedCurrency(userSelectedCurrency);
    }
  }

  function toggleIsFlipped() {
    setIsFlipped(!isFlipped);
  }

  function initialConversion() {
    if (initialCurrencyExchRates) {
      setCurrencyToValue(
        parseFloat(
          (
            initialCurrencyExchRates[currency.toLowerCase()][
              selectedCurrency.toLowerCase()
            ] * +currencyFromValue
          ).toString()
        ).toFixed(2)
      );
    }
  }

  function flipConversion() {
    if (initialCurrencyExchRates) {
      setCurrencyToValue(
        parseFloat(
          (
            +currencyFromValue /
            initialCurrencyExchRates[currency.toLowerCase()][
              initialCurrency.toLowerCase()
            ]
          ).toString()
        ).toFixed(2)
      );
    }
  }

  function flip() {
    toggleIsFlipped();

    let tempValue = currencyFromValue;
    setCurrencyFromValue(currencyToValue);
    setCurrencyToValue(tempValue);

    let tempFlag = countryFlagTo;
    setCountryFlagTo(countryFlagFrom);
    setCountryFlagFrom(tempFlag);

    let tempCurrency = initialCurrency;
    setInitialCurrency(selectedCurrency.toUpperCase());
    setSelectedCurrency(tempCurrency);
  }

  return {
    currencyFromValue,
    setCurrencyFromValue,
    currencyToValue,
    setCurrencyToValue,
    initialCurrency,
    selectedCurrency,
    isFlipped,
    countryFlagFrom,
    countryFlagTo,
    currencyArray,
    getExchangeRates,
    initialConversion,
    flipConversion,
    flip,
  };
}
