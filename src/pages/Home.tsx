import { useLoaderData, useNavigate } from 'react-router-dom';
import { useCountryNames } from '@/hooks/useCountryNames';
import { getApiData } from '@/utils/api';
import MainNav from '@/components/nav/main-nav/MainNav';
import SlidesAutoSwiper from '@/components/swiper/SlidesAutoSwiper';
import SearchInput from '@/components/inputs/search-input/SearchInput';
import { baseCountryImagesUrl } from '@/utils/urls';
import { MOST_POPULAR_COUNTRIES } from '@/config/countries';
import { ICountriesImages } from '@/types/apiTypes.interface';
import backgroundVideo from '@/assets/bg-video-beach.mp4';
import videoFallbackImg from '@/assets/images/explore.jpg';
import classNames from 'classnames';
import classes from '@/pages/Home.module.scss';

export default function Home() {
  const countriesData = useLoaderData() as ICountriesImages[];

  const { countryNames } = useCountryNames();

  const navigate = useNavigate();

  function goToCountryDetails(country: string | undefined) {
    if (!country) return;
    navigate(`/country/${encodeURIComponent(country)}`);
  }

  const heroContent = (
    <div className={classNames('container', classes.heroContent)}>
      <section className={classNames(classes.heroSectionHeadings)}>
        <p className={classes.heroParagraph}>Adventures</p>
        <h1 className={classes.heroPrimaryHeading}>Never stop exploring the world.</h1>
        <h2 className={classes.heroSecondaryHeading}>
          Welcome to Wanderlust Adventures! We help you discover the world's best
          destinations, activities, and accommodations. Our personalized service and
          attention to detail take care of all logistics, so you can focus on making
          unforgettable memories. Start planning your dream trip today!
        </h2>
        <div className={classes.searchInput}>
          <SearchInput
            suggestions={countryNames}
            placeholder={'Search country'}
            callback={goToCountryDetails}
          />
        </div>
      </section>
      <section className={classes.sectionSwiper}>
        <SlidesAutoSwiper
          swiperData={countriesData}
          mostPopularCountries={MOST_POPULAR_COUNTRIES}
        />
      </section>
    </div>
  );

  return (
    <>
      <MainNav />
      <main className={classes.main}>
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={videoFallbackImg}
          className={classes.bgVideo}
          preload='metadata'
        >
          <source src={backgroundVideo} type='video/mp4' />
        </video>
        <div className={classes.overlay}></div>
        {heroContent}
      </main>
    </>
  );
}

export async function fetchData() {
  const countriesPromises = MOST_POPULAR_COUNTRIES.map(
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
