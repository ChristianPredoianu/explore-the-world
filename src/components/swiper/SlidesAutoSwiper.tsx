import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import LoadingSpinner from '@/components//ui/LoadingSpinner';

import 'swiper/css';
import 'swiper/css/navigation';
import '@/components/swiper/SlidesAutoSwiper.scss';

interface ICountries {
  photos: [{ id: number; alt: string; src: { portrait: string } }];
}

const mostPopularCountries = [
  'england',
  'italy',
  'spain',
  'japan',
  'greece',
  'argentina',
];

export default function SlidesAutoSwiper() {
  const [countries, setCountries] = useState<ICountries[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [swiperActiveIndex, setSwiperActiveIndex] = useState(1);

  function fetchMostPopularCountries() {
    const baseUrl = 'https://api.pexels.com/v1/search?query=';

    setIsLoading(true);

    const countriesPromises = mostPopularCountries.map((country) =>
      fetch(`${baseUrl}${country}&per_page=2`, {
        headers: {
          Authorization: import.meta.env.VITE_PEXELS_API_KEY,
        },
      }).then((res) => res.json())
    );

    Promise.all(countriesPromises).then((data: ICountries[]) => {
      setCountries(data);
      setIsLoading(false);
    });
  }

  let mostPopularCountriesSlides: JSX.Element | React.ReactElement[];

  if (isLoading) {
    mostPopularCountriesSlides = <LoadingSpinner />;
  } else if (countries) {
    mostPopularCountriesSlides = countries.map((country) => (
      <SwiperSlide key={country.photos[0].id}>
        <img src={country.photos[0].src.portrait} alt={country.photos[0].alt} />
      </SwiperSlide>
    ));
  }

  useEffect(() => {
    fetchMostPopularCountries();
  }, [mostPopularCountries]);

  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        onActiveIndexChange={(swiper) => {
          setSwiperActiveIndex(swiper.activeIndex + 1);
          console.log(swiper.activeIndex);
        }}
        className='mySwiper'
      >
        {mostPopularCountriesSlides!}
        <div className='line'></div>
        <p className='counter'>{`0${swiperActiveIndex}`}</p>
      </Swiper>
    </>
  );
}
