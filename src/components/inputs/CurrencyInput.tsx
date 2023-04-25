import classes from '@/components/inputs/CurrencyInput.module.scss';

interface CurrencyInputProps {
  label: string;
  value: number;
  currencyDetails: {
    flag: string;
    currency: string;
  };

  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CurrencyInput({
  label,
  value,
  currencyDetails,
  handleChange,
}: CurrencyInputProps) {
  return (
    <div className={classes.inputWrapper}>
      <label className={classes.label}>{label}</label>
      <input
        type='number'
        value={value}
        className={classes.currencyInput}
        onChange={handleChange}
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
