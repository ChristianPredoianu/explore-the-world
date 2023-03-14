import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative } from 'swiper';
import { ICountriesImages } from '@/types/apiTypes.interface';

import 'swiper/css';
import 'swiper/css/effect-creative';
import '@/components/swiper/EffectCreativeSlider.scss';

interface EffectCreativeSliderProps {
  images: ICountriesImages;
}

export default function EffectCreativeSlider({
  images,
}: EffectCreativeSliderProps) {
  images.photos.splice(0, 1);

  return (
    <>
      <Swiper
        grabCursor={true}
        effect={'creative'}
        onSwiper={(swiper) => console.log(swiper)}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        modules={[EffectCreative]}
        className='mySwiper2'
      >
        <SwiperSlide
          style={{
            backgroundImage: `url('${images.photos[0].src.large2x}')`,
          }}
        ></SwiperSlide>
        <SwiperSlide
          style={{
            backgroundImage: `url('${images.photos[1].src.large2x}')`,
          }}
        ></SwiperSlide>
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
