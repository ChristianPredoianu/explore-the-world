import { getApiData } from '@/utils/api';
import { useLoaderData, LoaderFunctionArgs } from 'react-router-dom';
import CountryDetailsNav from '@/components/nav/CountryDetailsNav';
import EffectCreativeSlider from '@/components/swiper/EffectCreativeSlider';
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

  console.log(countryImages.photos[1]);

  const translations = [
    countryDetails[0].translations.deu,
    countryDetails[0].translations.jpn,
    countryDetails[0].translations.ara,
    countryDetails[0].translations.fra,
    countryDetails[0].translations.rus,
    countryDetails[0].translations.spa,
  ];

  const translationsParagraphs = translations.map((language) => (
    <p key={language.common} className={classes.language}>
      {language.common}
    </p>
  ));

  return (
    <>
      <CountryDetailsNav
        flag={countryDetails[0].flags.png}
        altSpelling={countryDetails[0].altSpellings[0]}
      />
      <main className={classNames('container', classes.main)}>
        <section className={classNames(classes.sectionCountryInfo)}>
          <div className={classes.countryWrapper}>
            <h1 className={classes.countryName}>
              {countryDetails[0].name.common}
            </h1>
            <img
              src={countryDetails[0].flags.png}
              alt='country flag'
              className={classes.countryFlag}
            />
          </div>
          <div className={classes.countryInfo}>
            <h2 className={classes.countryCapital}>
              {countryDetails[0].capital[0]}
            </h2>
            <div className={classes.countryInfoExplore}>
              <h3 className={classes.countryText}>
                {`${countryDetails[0].name.common} you don't know, atypical, unexplored, unique..`}
              </h3>
              <div className={classes.contryExploreWrapper}>
                <h4 className={classes.countryExplore}>Explore</h4>
                <img
                  src={countryDetails[0].flags.png}
                  alt='country flag'
                  className={classes.countryExploreFlag}
                />
              </div>
            </div>
          </div>
          <section className={classes.sectionTranslations}>
            <div>{translationsParagraphs}</div>
            <img
              src={countryImages.photos[0].src.small}
              alt={countryImages.photos[0].alt}
              className={classes.translationsImg}
            />
          </section>
        </section>
        <section className={classNames(classes.sectionPhotos)}>
          <EffectCreativeSlider images={countryImages} />
        </section>
      </main>
    </>
  );
}

export async function fetchCountryDetails({ params }: LoaderFunctionArgs) {
  let countryDetailsUrl = `https://restcountries.com/v3.1/name/${params.countryId}`;
  const countryImagesUrl = `https://api.pexels.com/v1/search?query=${params.countryId}&per_page=15`;

  if (params.countryId === 'england')
    countryDetailsUrl = `https://restcountries.com/v3.1/name/gb`;

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
