import classes from '@/components/inputs/CurrencyInput.module.scss';

interface CurrencyInputProps {
  label?: string;
  type: string;
  value: number;
  currencyDetails: {
    flag: string;
    currency: string;
  };
}

export default function CurrencyInput({
  label,
  type,
  value,
  currencyDetails,
}: CurrencyInputProps) {
  return (
    <div className={classes.inputWrapper}>
      <label className={classes.label}>{label}</label>
      <input type={type} value={value} className={classes.currencyInput} />
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
