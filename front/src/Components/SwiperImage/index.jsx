import React from 'react';
import { Container, Image } from './styles';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import TestImage from '@Assets/Layouts/blanc.jpeg';
import PropTypes from 'prop-types';

import 'swiper/css';
import 'swiper/css/navigation';
import './styles.css';

const SwiperImage = ({ images }) => {
  return (
    <Container>
      <Swiper modules={[Navigation]} slidesPerView={1} navigation>
        {images.map((item, index) => {
          return (
            <SwiperSlide key={item.id}>
              <Image src={item.url} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
};

SwiperImage.propTypes = {
  images: PropTypes.array,
};

export default SwiperImage;
