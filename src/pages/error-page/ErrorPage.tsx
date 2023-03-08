import { useRouteError } from 'react-router-dom';
import classes from '@/pages/error-page/ErrorPage.module.scss';

export default function ErrorPage() {
  const error: any = useRouteError();

  return (
    <div className={classes.errorPage}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
