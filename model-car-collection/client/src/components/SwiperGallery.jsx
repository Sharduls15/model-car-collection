import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const SwiperGallery = ({ images }) => {
  return (
    <Swiper navigation={true} modules={[Navigation]} className="swiper-gallery">
      {images.map((url, idx) => (
        <SwiperSlide key={idx}>
          <img src={url} alt="car" className="slide-img" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperGallery;
