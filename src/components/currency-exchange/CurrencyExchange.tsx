import { useEffect, useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { currencyCountryCodes } from '@/utils/currencies';
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
  const [inputFlag, setInputFlag] = useState(
    `https://www.countryflagicons.com/FLAT/32/AE.png`
  );
  const [selectedCurrency, setSelectedCurrency] = useState(
    Object.keys(currencyCountryCodes)[0]
  );
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isCurrencyInputOpen, setIsCurrencyInputOpen] = useState(false);

  const supportedCurrenciesUrl =
    'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json';

  const [currencyCodes] = useFetch<IExchangeRates>(supportedCurrenciesUrl);
  const [countriesData] = useFetch('https://restcountries.com/v3.1/all');

  const countryFlagImgSrc = `https://www.countryflagicons.com/FLAT/32/${countryCode}.png`;

  function handleCurrencyChange(e) {
    setIsSelectOpen(true);
    setSelectedCurrency(e.target.value.toUpperCase());
  }

  function handleCurrencyInput() {
    setIsSelectOpen(true);
    setIsCurrencyInputOpen(true);
    console.log(isSelectOpen);
  }

  if (currencyCodes) console.log(currencyCodes);

  function userSelectedCurrency(currency, countryCode) {
    setIsSelectOpen(false);
    setIsCurrencyInputOpen(false);
    setSelectedCurrency(currency);
    setInputFlag(`https://www.countryflagicons.com/FLAT/32/${countryCode}.png`);
  }

  const currencyOptions = Object.keys(currencyCountryCodes).map((currencyCode, i) => (
    <li
      key={i}
      className={classes.currencyListItem}
      onClick={() =>
        userSelectedCurrency(currencyCode, currencyCountryCodes[currencyCode])
      }
    >
      <div className={classes.listItemDiv}>
        {currencyCode}
        <img
          src={`https://www.countryflagicons.com/FLAT/32/${currencyCountryCodes[currencyCode]}.png`}
          alt='country flag'
        />
      </div>
    </li>
  ));

  function handleClickOutside() {
    setIsSelectOpen(false);
    console.log('clicked');
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
            <div className={classes.inputFlag}>
              <div className={classes.selectInputWrapper} onClick={handleCurrencyInput}>
                {!isCurrencyInputOpen && <img src={inputFlag} alt='' />}
                {!isCurrencyInputOpen && <span>{selectedCurrency}</span>}
                {isCurrencyInputOpen && (
                  <input
                    type='text'
                    value={selectedCurrency}
                    className={classes.dropdown}
                    onChange={handleCurrencyChange}
                    onClick={() => setIsSelectOpen(true)}
                  />
                )}
              </div>
            </div>
            {isSelectOpen && (
              <ul className={classes.currencyOptionsList}>{currencyOptions}</ul>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
