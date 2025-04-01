import { useEffect } from 'react';
import { useExchangeRates } from '@/hooks/useExchangeRates';
import { useCurrencyConversion } from '@/hooks/useCurrencyConversion';
import CurrencyInput from '@/components/inputs/currency-input/CurrencyInput';
import SearchInput from '@/components/inputs/search-input/SearchInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '@/components/currency-exchange/CurrencyExchange.module.scss';
import '@/components/inputs/CurrencyFlags.scss';

interface CurrencyExchangeProps {
  currency: string;
}

export default function CurrencyExchange({ currency }: CurrencyExchangeProps) {
  const initialCurrencyExchRates = useExchangeRates(currency);

  const {
    currencyFromValue,
    currencyToValue,
    selectedCurrency,
    countryFlagFrom,
    countryFlagTo,
    currencyArray,
    isFlipped,
    getExchangeRates,
    flip,
    handleCurrencyFromChange,
    handleCurrencyToChange,
    handleCurrencyFromBlur,
    handleCurrencyToBlur,
    initialConversion,
    flipConversion,
    setInitialCurrency,
  } = useCurrencyConversion(currency);

  useEffect(() => {
    setInitialCurrency(currency);
  }, [currency, setInitialCurrency]);

  useEffect(() => {
    if (initialCurrencyExchRates) {
      isFlipped
        ? flipConversion(initialCurrencyExchRates)
        : initialConversion(initialCurrencyExchRates);
    }
  }, [currencyFromValue, selectedCurrency, initialCurrencyExchRates, isFlipped]);

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
        currencyDetails={{ flag: countryFlagFrom, currency: currency }}
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
    <article className={classes.currencyCard}>
      {searchInput}
      <div className={classes.currencyWrapper}>
        {currencyFrom}
        {flipIcon}
        {currencyTo}
      </div>
    </article>
  );
}
