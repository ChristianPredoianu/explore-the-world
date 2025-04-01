import { useState, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import CurrencyInput from '@/components/inputs/currency-input/CurrencyInput';
import SearchInput from '@/components/inputs/search-input/SearchInput';
import { currencyCountryCodes } from '@/utils/currencies';
import { useExchangeRates } from '@/hooks/useExchangeRates';
import { IExchangeRates } from '@/types/apiTypes.interface';
/* import { baseCurrencyRatesUrl } from '@/utils/urls'; */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '@/components/currency-exchange/CurrencyExchange.module.scss';
import '@/components/inputs/CurrencyFlags.scss';

interface CurrencyExchangeProps {
  currency: string;
}

export default function CurrencyExchange({ currency }: CurrencyExchangeProps) {
  const [currencyFromValue, setCurrencyFromValue] = useState('1');
  const [currencyToValue, setCurrencyToValue] = useState('0');
  const [initialCurrency, setInitialCurrency] = useState(currency);
  const [selectedCurrency, setSelectedCurrency] = useState(
    Object.keys(currencyCountryCodes)[47]
  );
  const [isFlipped, setIsFlipped] = useState(false);
  const [countryFlagFrom, setCountryFlagFrom] = useState(currency.toLowerCase());
  const [countryFlagTo, setCountryFlagTo] = useState('eur');
  console.log(currency);
  /*   const supportedCurrenciesUrl = `${baseCurrencyRatesUrl}/${currency.toLowerCase()}.json`; */

  /*   const [initialCurrencyExchRates] = useFetch<IExchangeRates>(supportedCurrenciesUrl); */
  const exchangeRates = useExchangeRates(currency);

  const currencyArray = Object.keys(currencyCountryCodes);

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
    if (exchangeRates) {
      setCurrencyToValue(
        parseFloat(
          (
            exchangeRates[currency.toLowerCase()][selectedCurrency.toLowerCase()] *
            +currencyFromValue
          ).toString()
        ).toFixed(2)
      );
    }
  }

  function flipConversion() {
    if (exchangeRates) {
      setCurrencyToValue(
        parseFloat(
          (
            +currencyFromValue /
            exchangeRates[currency.toLowerCase()][initialCurrency.toLowerCase()]
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

  function handleCurrencyFromChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseFloat(e.target.value.replace(',', '.'));
    setCurrencyFromValue(newValue.toString());
  }

  function handleCurrencyToChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrencyToValue(e.currentTarget.value);
  }

  function handleCurrencyFromBlur() {
    setCurrencyFromValue(currencyFromValue.toLocaleString());
  }

  function handleCurrencyToBlur() {
    setCurrencyFromValue(currencyToValue.toLocaleString());
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
    isFlipped ? flipConversion() : initialConversion();
  }, [currencyFromValue, selectedCurrency, exchangeRates]);

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
        value={currencyFromValue}
        handleChange={handleCurrencyFromChange}
        handleBlur={handleCurrencyFromBlur}
        currencyDetails={{ flag: countryFlagFrom, currency: initialCurrency }}
      />
    </div>
  );

  const flipIcon = (
    <FontAwesomeIcon icon={['fas', 'repeat']} className={classes.icon} onClick={flip} />
  );

  const currencyTo = (
    <div className={classes.currencyTo}>
      <CurrencyInput
        label={'You get'}
        value={currencyToValue}
        handleChange={handleCurrencyToChange}
        handleBlur={handleCurrencyToBlur}
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
          {flipIcon}
          {currencyTo}
        </div>
      </article>
    </>
  );
}
