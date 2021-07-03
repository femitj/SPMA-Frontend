import React from 'react';
import Swiper from 'react-id-swiper';

const Autoplay = () => {
  const params = {
    // spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 5500,
      // disableOnInteraction: false
    },
    // pagination: {
    //   el: '.swiper-pagination',
    //   clickable: true
    // },
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev'
    // }
  }
  return (
    <Swiper {...params}>
      <div style={{background: "linear-gradient(0deg, rgba(0, 0, 0, 0.56), rgba(0, 0, 0, 0.56)), url(https://res.cloudinary.com/eddy983/image/upload/v1573055980/image-4.webp)", backgroundSize: "cover", backgroundPosition: "center"}}></div>
      <div style={{background: "linear-gradient(0deg, rgba(0, 0, 0, 0.56), rgba(0, 0, 0, 0.56)), url(https://res.cloudinary.com/eddy983/image/upload/v1573055985/image-2.webp)", backgroundSize: "cover", backgroundPosition: "center"}}></div>
      <div style={{background: "linear-gradient(0deg, rgba(0, 0, 0, 0.56), rgba(0, 0, 0, 0.56)), url(https://res.cloudinary.com/eddy983/image/upload/v1568726864/architecture-beautiful-exterior-106399.jpg)", backgroundSize: "cover", backgroundPosition: "center"}}></div>
      <div style={{background: "linear-gradient(0deg, rgba(0, 0, 0, 0.56), rgba(0, 0, 0, 0.56)), url(https://res.cloudinary.com/eddy983/image/upload/v1573055980/image.webp)", backgroundSize: "cover", backgroundPosition: "center"}}></div>
      <div>Slide #5</div>
    </Swiper>
  )
};
export default Autoplay;
  