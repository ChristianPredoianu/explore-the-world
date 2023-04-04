import { useEffect, useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import classes from '@/components/currency-exchange/CurrencyExchange.module.scss';

interface CurrencyExchangeProps {
  currency: string;
  countryCode: string;
}

export default function CurrencyExchange({
  currency,
  countryCode,
}: CurrencyExchangeProps) {
  const [selectedCurrency, setSelectedCurrency] = useState('');

  const countryFlag = `https://flagsapi.com/${countryCode}/flat/16.png`;

  function handleChange(e) {
    console.log(e.target.value);
    setSelectedCurrency(e.target.value);
  }

  return (
    <>
      <article className={classes.currencyCard}>
        <div className={classes.currencyFrom}>
          <div className={classes.inputWrapper}>
            <label htmlFor='currency from'>Amount</label>
            <input type='text' className={classes.currencyInput} />
          </div>
          <div className={classes.currencyWrapper}>
            <p>Swedish Crown</p>
            <div className={classes.countryCurrency}>
              <img src={countryFlag}></img>
              <p>SEK</p>
            </div>
          </div>
        </div>
        <div className={classes.currencyTo}>
          <div className={classes.inputWrapper}>
            <label htmlFor='currency to'>You Get</label>
            <input type='text' className={classes.currencyInput} />
          </div>
          <div className={classes.selectWrapper}>
            <label htmlFor='currency'>Euro</label>
            <select
              value={selectedCurrency}
              onChange={handleChange}
              className={classes.select}
            >
              <option value='apple'>Apple</option>
              <option value='banana'>Banana</option>
              <option value='orange'>Orange</option>
            </select>
          </div>
        </div>
      </article>
      {/*  <img src={countryFlag}></img> */}
    </>
  );
}
