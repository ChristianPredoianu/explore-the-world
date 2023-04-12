import classes from '@/components/inputs/CurrencyInput.module.scss';

interface CurrencyInputProps {
  label?: string;
  type: string;
  value: number;
}

export default function CurrencyInput({ label, type, value }: CurrencyInputProps) {
  return (
    <div className={classes.inputWrapper}>
      <label className={classes.label}>{label}</label>
      <input type={type} value={value} className={classes.currencyInput} />
    </div>
  );
}
