import React from 'react';
import { Container } from './styles';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import TestImage from '@Assets/Layouts/blanc.jpeg';

import 'swiper/css';
import 'swiper/css/navigation';

const SwiperImgContainer = () => {
  const swiperSlides = [
    {
      url: TestImage,
    },
    {
      url: TestImage,
    },
    {
      url: TestImage,
    },
    {
      url: TestImage,
    },
    {
      url: TestImage,
    },
    {
      url: TestImage,
    },
  ];

  return (
    <Container>
      <Swiper
        // install Swiper modules
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {swiperSlides.map((item, index) => {
          return <SwiperSlide src={item.url} key={index}></SwiperSlide>;
        })}
      </Swiper>
    </Container>
  );
};

export default SwiperImgContainer;
