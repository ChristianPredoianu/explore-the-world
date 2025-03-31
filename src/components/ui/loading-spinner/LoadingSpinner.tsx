import classes from '@/components/ui/loading-spinner/LoadingSpinner.module.scss';

export default function LoadingSpinner() {
  return (
    <div className={classes.loader} role='status' aria-live='polite'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  );
}
