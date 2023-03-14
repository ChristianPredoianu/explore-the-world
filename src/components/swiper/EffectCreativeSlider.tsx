import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative } from 'swiper';
import { ICountriesImages } from '@/types/apiTypes.interface';
import { Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-creative';
import '@/components/swiper/EffectCreativeSlider.scss';

interface EffectCreativeSliderProps {
  images: ICountriesImages;
}

export default function EffectCreativeSlider({
  images,
}: EffectCreativeSliderProps) {
  images.photos.shift();

  const imgSlides = images.photos.map((image) => (
    <SwiperSlide
      key={image.id}
      style={{
        backgroundImage: `url('${image.src.large2x}')`,
      }}
    ></SwiperSlide>
  ));

  return (
    <>
      <Swiper
        grabCursor={true}
        effect={'creative'}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        modules={[EffectCreative, Autoplay]}
        className='mySwiper2'
      >
        {imgSlides}
      </Swiper>
    </>
  );
}
