import { useLoaderData } from 'react-router-dom';
import MainNav from '@/components/nav/MainNav';
import SlidesAutoSwiper from '@/components/swiper/SlidesAutoSwiper';
import SearchCountryInput from '@/components/inputs/SearchCountryInput';
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

  return (
    <>
      <MainNav />
      <main className={classes.main}>
        <div className={classes.overlay}></div>
        <div className={classNames('container', classes.heroContent)}>
          <section className={classNames(classes.heroSectionHeadings)}>
            <p className={classes.heroParagraph}>Travel website</p>
            <h1 className={classes.heroPrimaryHeading}>
              Never stop exploring the world.
            </h1>
            <h2 className={classes.heroSecondaryHeading}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book.
            </h2>
            <div className={classes.inputWrapper}>
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
      </main>
    </>
  );
}

export async function fetchData() {
  const baseUrl = 'https://api.pexels.com/v1/search?query=';

  const countriesPromises = mostPopularCountries.map((country) =>
    fetch(`${baseUrl}${country}&per_page=1`, {
      headers: {
        Authorization: import.meta.env.VITE_PEXELS_API_KEY,
      },
    }).then((res) => res.json())
  );

  const imgData = Promise.all(countriesPromises).then((imgData: ICountriesImages[]) => {
    return imgData;
  });

  return imgData;
}
