import { getApiData } from '@/utils/api';
import { useLoaderData, LoaderFunctionArgs } from 'react-router-dom';
import CountryDetailsNav from '@/components/nav/CountryDetailsNav';
import classNames from 'classnames';
import classes from '@/pages/CountryDetails.module.scss';

export default function CountryDetails() {
  const data = useLoaderData();

  console.log(data);

  return (
    <>
      <CountryDetailsNav
        flag={data[0].flags.png}
        altSpelling={data[0].altSpellings[0]}
      />
      <main className={classNames('container', classes.main)}>
        <section className={classNames(classes.sectionCountryInfo)}>
          <div className={classes.countryWrapper}>
            <h1 className={classes.countryName}>{data[0].name.common}</h1>
            <img
              src={data[0].flags.png}
              alt='country flag'
              className={classes.countryFlag}
            />
          </div>
          <div className={classes.countryInfo}>
            <h2 className={classes.countryCapital}>{data[0].capital[0]}</h2>
            <div className={classes.countryInfoExplore}>
              <h3 className={classes.countryText}>
                {`${data[0].name.common} you don't know, atypical, unexplored, unique..`}
              </h3>
              <div className={classes.contryExploreWrapper}>
                <h4 className={classes.countryExplore}>Explore</h4>
                <img
                  src={data[0].flags.png}
                  alt='country flag'
                  className={classes.countryExploreFlag}
                />
              </div>
            </div>
          </div>
        </section>
        <section className={classNames(classes.sectionPhotos)}>
          {/* <h1>photos</h1> */}
        </section>
      </main>
    </>
  );
}

export async function fetchCountryDetails({ params }: LoaderFunctionArgs) {
  let url = `https://restcountries.com/v3.1/name/${params.countryId}`;

  if (params.countryId === 'england')
    url = `https://restcountries.com/v3.1/name/gb`;

  return await getApiData(url);
}
