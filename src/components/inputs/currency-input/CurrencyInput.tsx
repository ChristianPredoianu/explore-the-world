import classes from '@/components/inputs/currency-input/CurrencyInput.module.scss';

interface CurrencyInputProps {
  label: string;
  value: string;
  currencyDetails: {
    flag: string;
    currency: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
}

export default function CurrencyInput({
  label,
  value,
  currencyDetails,
  handleChange,
  handleBlur,
}: CurrencyInputProps) {
  return (
    <div className={classes.inputWrapper}>
      <label className={classes.label}>{label}</label>
      <input
        type='number'
        value={isNaN(+value) ? '' : parseFloat(value).toFixed(4)}
        step='0.01'
        className={classes.currencyInput}
        disabled={label === 'You get'}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {currencyDetails && (
        <div className={classes.countryCurrency}>
          <div
            className={`currency-flag currency-flag-${currencyDetails.flag.toLowerCase()}`}
          ></div>
          <p className={classes.currency}>{currencyDetails.currency}</p>
        </div>
      )}
    </div>
  );
}
