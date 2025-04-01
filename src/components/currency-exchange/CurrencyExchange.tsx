import { useCurrencyExchange } from '@/hooks/useCurrencyExchange';
import CurrencyInput from '@/components/inputs/currency-input/CurrencyInput';
import SearchInput from '@/components/inputs/search-input/SearchInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '@/components/currency-exchange/CurrencyExchange.module.scss';

interface CurrencyExchangeProps {
  currency: string;
}

export default function CurrencyExchange({ currency }: CurrencyExchangeProps) {
  const {
    currencyFromValue,
    setCurrencyFromValue,
    currencyToValue,
    setCurrencyToValue,
    initialCurrency,
    selectedCurrency,
    countryFlagFrom,
    countryFlagTo,
    currencyArray,
    getExchangeRates,
    flip,
  } = useCurrencyExchange(currency);

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

  return (
    <>
      <article className={classes.currencyCard}>
        <div className={classes.searchInputWrapper}>
          <SearchInput
            suggestions={currencyArray}
            placeholder={'Currency'}
            callback={getExchangeRates}
          />
        </div>
        <div className={classes.currencyWrapper}>
          <div className={classes.currencyFrom}>
            <CurrencyInput
              label={'Amount'}
              value={currencyFromValue}
              handleChange={handleCurrencyFromChange}
              handleBlur={handleCurrencyFromBlur}
              currencyDetails={{ flag: countryFlagFrom, currency: initialCurrency }}
            />
          </div>
          <FontAwesomeIcon
            icon={['fas', 'repeat']}
            className={classes.icon}
            onClick={flip}
          />
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
        </div>
      </article>
    </>
  );
}
