import { useEffect, useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { baseExchangeRateUrl } from '@/utils/urls';
import { IExchangeRates } from '@/types/apiTypes.interface';
import classes from '@/components/currency-exchange/CurrencyExchange.module.scss';

interface CurrencyExchangeProps {
  currency: string;
  countryCode: string;
}

export default function CurrencyExchange({
  currency,
  countryCode,
}: CurrencyExchangeProps) {
  const [countryCurrency, setCountryCurrency] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const exchangeRateUrl = `${baseExchangeRateUrl}${
    import.meta.env.VITE_EXCHANGERATE_API_KEY
  }/latest/${currency}`;

  const supportedCurrenciesUrl = `${baseExchangeRateUrl}${
    import.meta.env.VITE_EXCHANGERATE_API_KEY
  }/codes`;

  const [currencyData] = useFetch<IExchangeRates>(exchangeRateUrl);
  const [currencyCodes] = useFetch<IExchangeRates>(supportedCurrenciesUrl);
  const [countriesData] = useFetch('https://restcountries.com/v3.1/all');

  let currencyOptions;
  if (currencyCodes) {
    currencyOptions = currencyCodes.supported_codes?.map((currencyCode) => (
      <li key={currencyCode[0]} className={classes.currencyOptionItem}>
        {currencyCode[1]}
      </li>
    ));
  }

  const countryFlagImgSrc = `https://flagsapi.com/${countryCode}/flat/16.png`;

  function handleChange(e) {
    setSelectedCurrency(e.target.value);
  }

  function toggleDropDown() {
    setIsSelectOpen(!isSelectOpen);
  }

  return (
    <>
      <article className={classes.currencyCard}>
        <div className={classes.currencyFrom}>
          <div className={classes.inputWrapper}>
            <label htmlFor='currency from' className={classes.label}>
              Amount
            </label>
            <input
              type='number'
              value={countryCurrency}
              onChange={handleChange}
              className={classes.currencyInput}
            />
          </div>
          <div className={classes.currencyWrapper}>
            <p>Swedish Crown</p>
            <div className={classes.countryCurrency}>
              <img src={countryFlagImgSrc}></img>
              <p>SEK</p>
            </div>
          </div>
        </div>
        <FontAwesomeIcon icon={['fas', 'repeat']} className={classes.icon} />
        <div className={classes.currencyTo}>
          <div className={classes.inputWrapper}>
            <label htmlFor='currency to' className={classes.label}>
              You Get
            </label>
            <input
              type='number'
              onChange={(e) => console.log(e.target.value)}
              className={classes.currencyInput}
            />
          </div>
          <div className={classes.selectWrapper}>
            <label htmlFor='currency' className={classes.label}>
              Euro
            </label>
            <div className={classes.dropdown} onClick={toggleDropDown} tabIndex='0'>
              countries
              {isSelectOpen && (
                <ul className={classes.currencyOptionsList}>{currencyOptions}</ul>
              )}
            </div>
          </div>
        </div>
      </article>
      {/*  <img src={countryFlag}></img> */}
    </>
  );
}
