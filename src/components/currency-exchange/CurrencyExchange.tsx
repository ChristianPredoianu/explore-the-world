import { useState, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import CurrencyInput from '@/components/inputs/CurrencyInput';
import SearchInput from '@/components/inputs/SearchInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { currencyCountryCodes } from '@/utils/currencies';
import { IExchangeRates } from '@/types/apiTypes.interface';

import classes from '@/components/currency-exchange/CurrencyExchange.module.scss';
import '@/components/inputs/CurrencyFlags.scss';

interface CurrencyExchangeProps {
  currency: string;
}

export default function CurrencyExchange({ currency }: CurrencyExchangeProps) {
  const baseCurrencyRatesUrl =
    'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';

  const [currencyFromValue, setCurrencyFromValue] = useState(1);
  const [currencyToValue, setCurrencyToValue] = useState(0);
  const [initialCurrency, setInitialCurrency] = useState(currency);
  const [selectedCurrency, setSelectedCurrency] = useState(
    Object.keys(currencyCountryCodes)[0].toLowerCase()
  );
  const [isFlipped, setIsFlipped] = useState(false);
  const [countryFlagFrom, setCountryFlagFrom] = useState(currency.toLowerCase());
  const [countryFlagTo, setCountryFlagTo] = useState('aed');

  const supportedCurrenciesUrl = `${baseCurrencyRatesUrl}/${currency.toLowerCase()}.json`;

  const [initialCurrencyExchRates] = useFetch<IExchangeRates>(supportedCurrenciesUrl);

  const currencyArray = Object.keys(currencyCountryCodes);

  function getExchangeRates(userSelectedCurrency: string) {
    if (userSelectedCurrency !== undefined) {
      setCountryFlagTo(userSelectedCurrency);
      setSelectedCurrency(userSelectedCurrency.toLowerCase());
    }
  }

  function toggleIsFlipped() {
    setIsFlipped(!isFlipped);
  }

  function convert() {
    if (initialCurrencyExchRates) {
      setCurrencyToValue(
        initialCurrencyExchRates[currency.toLowerCase()][initialCurrency.toLowerCase()] *
          currencyFromValue
      );
    }
  }

  function convertTo() {
    if (initialCurrencyExchRates) {
      setCurrencyToValue(
        initialCurrencyExchRates[currency.toLowerCase()][selectedCurrency.toLowerCase()] *
          currencyFromValue
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

  function handleCurrencyFromChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrencyFromValue(+e.currentTarget.value);
  }

  function handleCurrencyToChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrencyToValue(+e.currentTarget.value);
  }

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
    isFlipped ? convert() : convertTo();
  }, [currencyFromValue, selectedCurrency, initialCurrencyExchRates]);

  const searchInput = (
    <div className={classes.searchInputWrapper}>
      <SearchInput
        suggestions={currencyArray}
        placeholder={'Currency'}
        callback={getExchangeRates}
      />
    </div>
  );

  const currencyFrom = (
    <div className={classes.currencyFrom}>
      <CurrencyInput
        label={'Amount'}
        value={+currencyFromValue.toFixed(4)}
        handleChange={handleCurrencyFromChange}
        currencyDetails={{ flag: countryFlagFrom, currency: initialCurrency }}
      />
    </div>
  );

  const currencyTo = (
    <div className={classes.currencyTo}>
      <CurrencyInput
        label={'You get'}
        value={+currencyToValue.toFixed(4)}
        handleChange={handleCurrencyToChange}
        currencyDetails={{
          flag: countryFlagTo.toLowerCase(),
          currency: selectedCurrency,
        }}
      />
    </div>
  );

  return (
    <>
      <article className={classes.currencyCard}>
        {searchInput}
        <div className={classes.currencyWrapper}>
          {currencyFrom}
          <FontAwesomeIcon
            icon={['fas', 'repeat']}
            className={classes.icon}
            onClick={flip}
          />
          {currencyTo}
        </div>
      </article>
    </>
  );
}
