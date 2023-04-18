import { useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import CurrencyInput from '@/components/inputs/CurrencyInput';
import SearchInput from '@/components/inputs/SearchInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { currencyCountryCodes } from '@/utils/currencies';
import { IExchangeRates } from '@/types/apiTypes.interface';

import classes from '@/components/currency-exchange/CurrencyExchange.module.scss';
import '@/components/inputs/CurrencyFlags.css';

interface CurrencyExchangeProps {
  currency: string;
  countryCode: string;
}

export default function CurrencyExchange({ currency }: CurrencyExchangeProps) {
  const [countryCurrency, setCountryCurrency] = useState(1);
  const [inputFlag, setInputFlag] = useState(
    `https://www.countryflagicons.com/FLAT/32/AE.png`
  );
  const [selectedCurrency, setSelectedCurrency] = useState(
    Object.keys(currencyCountryCodes)[0]
  );

  const [countryFlag, setCountryFlag] = useState('aed');
  const supportedCurrenciesUrl =
    'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json';

  const [currencyCodes] = useFetch<IExchangeRates>(supportedCurrenciesUrl);

  const currencyArray = Object.keys(currencyCountryCodes);

  function userSelectedCurrency(currency: string, countryCode: string) {
    setSelectedCurrency(currency);
    setInputFlag(`https://www.countryflagicons.com/FLAT/32/${countryCode}.png`);
  }

  function getExchangeRates(currency: string) {
    if (currency !== undefined) {
      setCountryFlag(currency);
      setSelectedCurrency(currency);
    }
  }

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
        value={countryCurrency}
        currencyDetails={{ flag: currency.toLowerCase(), currency: currency }}
      />
    </div>
  );

  const currencyTo = (
    <>
      <div className={classes.currencyTo}>
        <CurrencyInput
          label={'You get'}
          type={'number'}
          currencyDetails={{
            flag: countryFlag.toLowerCase(),
            currency: selectedCurrency,
          }}
        />
      </div>
    </>
  );

  function showSuggestions() {}

  return (
    <>
      <article className={classes.currencyCard}>
        {searchInput}
        <div className={classes.currencyWrapper}>
          {currencyFrom}
          <FontAwesomeIcon icon={['fas', 'repeat']} className={classes.icon} />
          {currencyTo}
        </div>
      </article>
    </>
  );
}
