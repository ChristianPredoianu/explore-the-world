import { useLoaderData } from 'react-router-dom';
import { getApiData } from '@/utils/api';
import MainNav from '@/components/nav/MainNav';
import SlidesAutoSwiper from '@/components/swiper/SlidesAutoSwiper';
import SearchCountryInput from '@/components/inputs/SearchCountryInput';
import { baseCountryImagesUrl } from '@/utils/urls';
import { ICountriesImages } from '@/types/apiTypes.interface';

import classNames from 'classnames';
import classes from '@/pages/Home.module.scss';

const mostPopularCountries = [
  'United Kingdom',
  'Italy',
  'Spain',
  'Japan',
  'Greece',
  'Argentina',
];

export default function Home() {
  const countriesData = useLoaderData() as ICountriesImages[];

  const heroContent = (
    <div className={classNames('container', classes.heroContent)}>
      <section className={classNames(classes.heroSectionHeadings)}>
        <p className={classes.heroParagraph}>Travel website</p>
        <h1 className={classes.heroPrimaryHeading}>Never stop exploring the world.</h1>
        <h2 className={classes.heroSecondaryHeading}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen
          book.
        </h2>
        <div className={classes.searchInput}>
          <SearchCountryInput />
        </div>
      </section>
      <section className={classes.sectionSwiper}>
        <SlidesAutoSwiper
          swiperData={countriesData}
          mostPopularCountries={mostPopularCountries}
        />
      </section>
    </div>
  );

  return (
    <>
      <MainNav />
      <main className={classes.main}>
        <div className={classes.overlay}></div>
        {heroContent}
      </main>
    </>
  );
}

export async function fetchData() {
  const countriesPromises = mostPopularCountries.map(
    (country) =>
      getApiData(`${baseCountryImagesUrl}${country}&per_page=1`, {
        headers: {
          Authorization: import.meta.env.VITE_PEXELS_API_KEY,
        },
      }) as Promise<string[]>
  );

  const imgData = await Promise.all(countriesPromises);

  return imgData;
}
