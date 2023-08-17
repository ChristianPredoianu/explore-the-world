import { useRef } from 'react';
import { getApiData } from '@/utils/api';
import { useLoaderData, LoaderFunctionArgs } from 'react-router-dom';
import CountryDetailsNav from '@/components/nav/country-details-nav/CountryDetailsNav';
import EffectCreativeSlider from '@/components/swiper/EffectCreativeSlider';
import { Weather } from '@/components/weather/Weather';
import AirQualityCard from '@/components/cards/air-quality/AirQualityCard';
import AirQualityTable from '@/components/ui/air-quality-table/AirQualityTable';
import CountryMap from '@/components/map/CountryMap';
import ReactCalendar from '@/components/calendar/ReactCalendar';
import CurrencyExchange from '@/components/currency-exchange/CurrencyExchange';
import { baseCountryDetailsUrl, baseCountryImagesUrl } from '@/utils/urls';
import {
  ICountryDetailsData,
  ICountryDetails,
  ICountriesImages,
} from '@/types/apiTypes.interface';
import classNames from 'classnames';
import classes from '@/pages/CountryDetails.module.scss';

export default function CountryDetails() {
  const countryDetailsData = useLoaderData() as ICountryDetailsData;

  const [countryDetails, countryImages] = countryDetailsData.data;

  const countryDetail = countryDetails[0];
  const countryCode = countryDetails[0].cca2;

  const sectionMapRef = useRef<HTMLElement>(null);

  const currency = Object.keys(countryDetail.currencies);

  const translations = [
    { id: 1, language: countryDetails[0].translations.deu },
    { id: 2, language: countryDetails[0].translations.jpn },
    { id: 3, language: countryDetails[0].translations.ara },
    { id: 4, language: countryDetails[0].translations.fra },
    { id: 5, language: countryDetails[0].translations.rus },
    { id: 6, language: countryDetails[0].translations.spa },
  ];

  const translationsParagraphs = translations.map((language) => (
    <p key={language.id} className={classes.language}>
      {language.language.common}
    </p>
  ));

  function scrollToSection() {
    if (sectionMapRef.current) sectionMapRef.current.scrollIntoView();
  }

  const sectionCountryInfo = (
    <section className={classNames(classes.sectionCountryInfo)}>
      <div className={classes.countryWrapper}>
        <h1 className={classes.countryName}>{countryDetail.name.common}</h1>
        <img
          src={countryDetail.flags.png}
          alt='country flag'
          className={classes.countryFlag}
        />
      </div>
      <div className={classes.countryInfo}>
        {countryDetail.capital && (
          <h2 className={classes.countryCapital}>{countryDetails[0].capital[0]}</h2>
        )}
        <div className={classes.countryInfoExplore}>
          <h3 className={classes.countryText}>
            {`${countryDetail.name.common} you don't know, atypical, unexplored, unique..`}
          </h3>
          <div className={classes.contryExploreWrapper}>
            <button className={classes.countryExplore} onClick={scrollToSection}>
              Explore
            </button>
            <img
              src={countryDetail.flags.png}
              alt='country flag'
              className={classes.countryExploreFlag}
            />
          </div>
        </div>
      </div>
      <section className={classes.sectionTranslations}>
        <div>{translationsParagraphs}</div>
        {countryImages.photos[0] && (
          <img
            src={countryImages.photos[0].src.medium}
            alt={countryImages.photos[0].alt}
            className={classes.translationsImg}
          />
        )}
      </section>
    </section>
  );

  const sectionPhotos = (
    <section className={classNames(classes.sectionPhotos)}>
      <EffectCreativeSlider images={countryImages} />
    </section>
  );

  const sectionWeather = (
    <section className={classes.sectionWeather}>
      <Weather latlng={countryDetails[0].latlng} />
    </section>
  );

  const sectionAirQuality = (
    <section className={classes.sectionAirQuality}>
      <h4 className='sectionHeading'>{`Air Quality in ${countryDetail.name.common}`}</h4>
      <div className={classes.airQualityWrapper}>
        <AirQualityCard
          coords={countryDetail.latlng}
          country={countryDetail.name.common}
        />
        <AirQualityTable />
      </div>
    </section>
  );

  const sectionMap = (
    <section className={classes.sectionMap} ref={sectionMapRef}>
      <h4 className='sectionHeading'>{`Map of ${countryDetail.name.common}`}</h4>
      <CountryMap coords={countryDetails[0].latlng} />
    </section>
  );

  const sectionCalendar = (
    <section className={classes.sectionCalendar}>
      <h4 className='sectionHeading'>{`${countryDetail.name.common}'s holidays`}</h4>
      <ReactCalendar countryCode={countryCode} />
    </section>
  );

  const sectionCurrencyExchange = (
    <section className={classes.sectionCurrencyExchange}>
      <h4 className='sectionHeading'>Currency Exchange</h4>
      <CurrencyExchange currency={currency[0]} />
    </section>
  );

  return (
    <>
      <CountryDetailsNav
        flag={countryDetail.flags.png}
        altSpelling={countryDetail.altSpellings[0]}
      />
      <>
        <main className={classNames('container', classes.main)}>
          {sectionCountryInfo}
          {sectionPhotos}
        </main>
        <div className='container'>
          {sectionWeather}
          {sectionAirQuality}
          {sectionMap}
          {sectionCalendar}
          {sectionCurrencyExchange}
        </div>
      </>
    </>
  );
}

export async function fetchCountryDetails({ params }: LoaderFunctionArgs) {
  let countryDetailsUrl = `${baseCountryDetailsUrl}${params.countryId}`;
  const countryImagesUrl = `${baseCountryImagesUrl}${params.countryId}&per_page=15`;

  if (params.countryId === 'India')
    countryDetailsUrl = `${baseCountryDetailsUrl}Republic%20of%20India`;

  const countryDetailsPromise = getApiData(countryDetailsUrl) as Promise<
    ICountryDetails[]
  >;
  const countryImagesPromise = getApiData(countryImagesUrl, {
    headers: {
      Authorization: import.meta.env.VITE_PEXELS_API_KEY,
    },
  }) as Promise<ICountriesImages>;

  const data = await Promise.all([countryDetailsPromise, countryImagesPromise]);

  return { data };
}
