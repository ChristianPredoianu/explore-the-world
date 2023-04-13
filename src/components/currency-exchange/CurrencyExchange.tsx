import { useEffect, ChangeEvent, useState } from 'react';
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCurrencyInputOpen, setIsCurrencyInputOpen] = useState(false);
  const [isCloseOpen, setIsCloseOpen] = useState(false);
  const [isCurrencyDivOpen, setIsCurrencyDivOpen] = useState(true);
  const [countryFlag, setCountryFlag] = useState('aed');
  const [isShowSuggestions, setIsShowSuggestions] = useState(false);

  const supportedCurrenciesUrl =
    'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json';

  const [currencyCodes] = useFetch<IExchangeRates>(supportedCurrenciesUrl);
  /*   const [countriesData] = useFetch('https://restcountries.com/v3.1/all'); */

  const countryFlagImgSrc = `https://www.countryflagicons.com/FLAT/32/${countryCode}.png`;

  function userSelectedCurrency(currency: string, countryCode: string) {
    setIsDropdownOpen(false);
    setIsCurrencyInputOpen(false);
    setIsCurrencyDivOpen(true);
    setSelectedCurrency(currency);
    setInputFlag(`https://www.countryflagicons.com/FLAT/32/${countryCode}.png`);
  }

  function handleMultiInputChange(e: ChangeEvent<HTMLInputElement>) {
    setSelectedCurrency(e.target.value);
  }

  function handleMultiInputClick() {
    setIsDropdownOpen(!isDropdownOpen);
    setIsCurrencyDivOpen(!isCurrencyDivOpen);
  }

  function handleMultiInputClose() {
    setIsCurrencyDivOpen(false);
  }

  function getExchangeRates(currency: string) {
    setCountryFlag(currency);
    setSelectedCurrency(currency);
  }

  const currencyFrom = (
    <div className={classes.currencyFrom}>
      <CurrencyInput label={'Amount'} type={'number'} value={countryCurrency} />
      <div className={classes.countryCurrency}>
        <img src={countryFlagImgSrc}></img>
        <p>{currency}</p>
      </div>
    </div>
  );

  const currencyArray = Object.keys(currencyCountryCodes);

  /*   const currencyOptions = Object.keys(currencyCountryCodes).map((currencyCode, i) => (
    <li
      key={i}
      className={classes.currencyListItem}
      onClick={() =>
        userSelectedCurrency(currencyCode, currencyCountryCodes[currencyCode])
      }
    >
      <div className={classes.listItemDiv}>
        <img
          src={`https://www.countryflagicons.com/FLAT/32/${currencyCountryCodes[currencyCode]}.png`}
          alt='country flag'
        />
        {currencyCode}
      </div>
    </li>
  )); */

  function showSuggestions() {}

  return (
    <>
      <article className={classes.currencyCard}>
        {currencyFrom}
        <FontAwesomeIcon icon={['fas', 'repeat']} className={classes.icon} />
        <div className={classes.currencyTo}>
          <CurrencyInput label={'You get'} type={'number'} />
          <div
            className={classes.multiInput}
            onMouseEnter={() => setIsCloseOpen(true)}
            onMouseLeave={() => setIsCloseOpen(false)}
          >
            <div className={classes.currency}>
              {isCurrencyDivOpen && (
                <>
                  {countryFlag && (
                    <div
                      className={`currency-flag currency-flag-${countryFlag.toLowerCase()}`}
                    ></div>
                  )}
                  <p>{selectedCurrency}</p>
                </>
              )}
              {!isCurrencyDivOpen && (
                <FontAwesomeIcon
                  icon={['fas', 'search']}
                  className={classes.searchIcon}
                />
              )}
            </div>
            <SearchInput
              suggestions={currencyArray}
              isShowSuggestions={isShowSuggestions}
              setIsShowSuggestions={setIsShowSuggestions}
              placeholder={'Currency'}
              callback={getExchangeRates}
            />
            {/* 
            <input
              type='text'
              value={selectedCurrency}
              onChange={handleMultiInputChange}
              className={classes.currencyInput}
              onClick={handleMultiInputClick}
            /> */}
            <div className={classes.inputControls}>
              {isCloseOpen && (
                <FontAwesomeIcon
                  icon={['fas', 'xmark']}
                  className={classes.inputIcon}
                  onClick={handleMultiInputClose}
                />
              )}

              <FontAwesomeIcon
                icon={['fas', 'chevron-down']}
                className={classes.inputIcon}
                onClick={showSuggestions}
              />

              <FontAwesomeIcon
                icon={['fas', 'chevron-up']}
                className={classes.inputIcon}
                onClick={() => setIsDropdownOpen(false)}
              />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
