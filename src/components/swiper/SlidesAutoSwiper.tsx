import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

const mostPopularCountries = [
  'england',
  'italy',
  'spain',
  'japan',
  'greece',
  'argentina',
];

export default function SlidesAutoSwiper() {
  const [countries, setCountries] = useState([]);

  async function fetchMostPopularCountries() {
    const responses = await Promise.all(
      mostPopularCountries.map(async (country) => {
        const res = await fetch(
          `https://api.pexels.com/v1/search?query=${country}&per_page=2`,
          {
            headers: {
              Authorization: import.meta.env.VITE_PEXELS_API_KEY,
            },
          }
        );
        const json = await res.json();

        setCountries(json);
      })
    );
  }

  useEffect(() => {
    fetchMostPopularCountries();
    if (countries) console.log(countries);
  }, []);
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
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}
