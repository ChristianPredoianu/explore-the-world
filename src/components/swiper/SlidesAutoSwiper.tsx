import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import LoadingSpinner from '@/components//ui/LoadingSpinner';

import 'swiper/css';
import 'swiper/css/pagination';
import '@/components/swiper/SlidesAutoSwiper.scss';

interface ICountries {
  photos: [{ id: number; alt: string; src: { medium: string } }];
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

  let mostPopularCountriesSlides;

  if (isLoading) {
    mostPopularCountriesSlides = <LoadingSpinner />;
  } else if (countries) {
    mostPopularCountriesSlides = countries.map((country) => (
      <SwiperSlide key={country.photos[0].id}>
        <img src={country.photos[0].src.medium} alt={country.photos[0].alt} />
      </SwiperSlide>
    ));
  }

  useEffect(() => {
    fetchMostPopularCountries();
    console.log(countries);
  }, [mostPopularCountries]);

  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className='mySwiper'
      >
        {mostPopularCountriesSlides}
      </Swiper>
    </>
  );
}
