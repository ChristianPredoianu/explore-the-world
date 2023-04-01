import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { ICountriesImages } from '@/types/apiTypes.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'swiper/css';
import 'swiper/css/navigation';
import '@/components/swiper/SlidesAutoSwiper.scss';

interface SwiperDataProps {
  swiperData: ICountriesImages[];
  mostPopularCountries: string[];
}

export default function SlidesAutoSwiper({
  swiperData,
  mostPopularCountries,
}: SwiperDataProps) {
  const [swiperActiveIndex, setSwiperActiveIndex] = useState(1);

  const navigate = useNavigate();

  function goToCountryDetails(country: string) {
    navigate(`country/${country}`);
  }

  const mostPopularCountriesSlides = swiperData.map((country, index) => (
    <SwiperSlide
      key={country.photos[0].id}
      onClick={() => goToCountryDetails(mostPopularCountries[index])}
    >
      <img src={country.photos[0].src.portrait} alt={country.photos[0].alt} />
      <div className='img-overlay'></div>
      <p className='slider-country'>{mostPopularCountries[index]}</p>
    </SwiperSlide>
  ));

  const swiperCta = (
    <>
      <div className='line'></div>
      <p className='counter'>{`0${swiperActiveIndex}`}</p>
      <button className='custom-swiper-button-prev'>
        <FontAwesomeIcon icon={['fas', 'angle-left']} />
      </button>
      <button className='custom-swiper-button-next'>
        <FontAwesomeIcon icon={['fas', 'angle-right']} />
      </button>
    </>
  );

  const pexelsCreditLink = (
    <a
      href='https://www.pexels.com'
      target='_blank'
      rel='noopener nofollow'
      className='pexels'
    >
      Photos provided by Pexels
    </a>
  );

  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={30}
        navigation={{
          nextEl: '.custom-swiper-button-next',
          prevEl: '.custom-swiper-button-prev',
        }}
        modules={[Navigation]}
        onActiveIndexChange={(swiper) => setSwiperActiveIndex(swiper.activeIndex + 1)}
        className='mySwiper'
      >
        {mostPopularCountriesSlides!}
        {swiperCta}
      </Swiper>
      {pexelsCreditLink}
    </>
  );
}
