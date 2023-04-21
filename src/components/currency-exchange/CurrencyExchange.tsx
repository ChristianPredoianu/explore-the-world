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

  const [countryFlag, setCountryFlag] = useState('aed');
  const [countryFlagFrom, setCountryFlagFrom] = useState(currency.toLowerCase());
  const supportedCurrenciesUrl = `${baseCurrencyRatesUrl}/${currency.toLowerCase()}.json`;

  const [initialCurrencyExchRates] = useFetch<IExchangeRates>(supportedCurrenciesUrl);

  const currencyArray = Object.keys(currencyCountryCodes);

  function getExchangeRates(userSelectedCurrency: string) {
    if (userSelectedCurrency !== undefined) {
      setCountryFlag(userSelectedCurrency);
      setSelectedCurrency(userSelectedCurrency.toLowerCase());
    }
  }

  function toggleIsFlipped() {
    setIsFlipped(!isFlipped);
  }

  function handleCurrencyFromChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrencyFromValue(+e.currentTarget.value);
    if (+e.currentTarget.value === 0) {
      setCurrencyFromValue(1);
    }
  }

  function convert() {
    if (initialCurrencyExchRates) {
      setCurrencyToValue(
        initialCurrencyExchRates[currency.toLowerCase()][currency.toLowerCase()] *
          currencyFromValue
      );
    }
  }

  function convertTo() {
    if (initialCurrencyExchRates) {
      setCurrencyToValue(
        initialCurrencyExchRates[currency.toLowerCase()][selectedCurrency] *
          currencyFromValue
      );
    }
  }

  function flip() {
    let temp = currencyFromValue;
    setCurrencyFromValue(currencyToValue);
    setCurrencyToValue(temp);

    let tempFlag = countryFlag;
    setCountryFlag(countryFlagFrom);
    setCountryFlagFrom(tempFlag);

    /*  let tempCurrency = initialCurrency;
    setInitialCurrency(selectedCurrency);
    setSelectedCurrency(tempCurrency); */
  }

  function handleCurrencyToChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrencyToValue(+e.currentTarget.value);
    if (+e.currentTarget.value === 0) {
      setCurrencyToValue(1);
    }
  }

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
        type={'number'}
        value={currencyFromValue}
        handleChange={handleCurrencyFromChange}
        currencyDetails={{ flag: countryFlagFrom, currency: currency }}
      />
    </div>
  );

  const currencyTo = (
    <div className={classes.currencyTo}>
      <CurrencyInput
        label={'You get'}
        type={'number'}
        value={+currencyToValue.toFixed(4)}
        handleChange={handleCurrencyToChange}
        currencyDetails={{
          flag: countryFlag.toLowerCase(),
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
