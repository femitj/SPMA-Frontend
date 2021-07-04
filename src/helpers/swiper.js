import React, { useState, useEffect } from 'react';
import Swiper from 'react-id-swiper';
const [gallerySwiper, getGallerySwiper] = useState(null);
const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
const gallerySwiperParams = {
  getSwiper: getGallerySwiper,
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
};
const thumbnailSwiperParams = {
  getSwiper: getThumbnailSwiper,
  spaceBetween: 10,
  centeredSlides: true,
  slidesPerView: 'auto',
  touchRatio: 0.3,
  slideToClickedSlide: true
};
useEffect(() => {
  if (
    gallerySwiper !== null &&
    gallerySwiper.controller &&
    thumbnailSwiper !== null &&
    thumbnailSwiper.controller
  ) {
    gallerySwiper.controller.control = thumbnailSwiper;
    thumbnailSwiper.controller.control = gallerySwiper;
  }
}, [gallerySwiper, thumbnailSwiper]);

export { gallerySwiperParams, thumbnailSwiperParams };
