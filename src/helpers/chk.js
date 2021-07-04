import React, { useState, useEffect } from 'react';
import Swiper from 'react-id-swiper';
import excapeRegExp from "escape-string-regexp";

// id, imgUrl, type, propertyId
const images = [
  {
    // land & survey
    id: 1,
    imgUrl: '../assets/img/abuja7.jpg',
    type: 'landSurvey'
  },
  {
    // land & survey
    id: 2,
    imgUrl: '../assets/img/abuja7.jpg',
    type: 'landSurvey',
  },
  {
    // land & survey
    id: 3,
    imgUrl: '../assets/img/abuja7.jpg',
    type: 'landSurvey',
  },
  {
    // land & survey
    id: 4,
    imgUrl: '../assets/img/abuja7.jpg',
    type: 'landSurvey',
  },
  {
    // development
    id: 5,
    imgUrl: '../assets/img/house1.jpg',
    type: 'development',
  },
  {
    // development
    id: 6,
    imgUrl: '../assets/img/house1.jpg',
    type: 'development',
  },
  {
    // development
    id: 7,
    imgUrl: '../assets/img/house1.jpg',
    type: 'development',
  },
  {
    // development
    id: 8,
    imgUrl: '../assets/img/house1.jpg',
    type: 'development',
  },
  {
    // completion
    id: 9,
    imgUrl: '../assets/img/images.jpg',
    type: 'completion',
  },
  {
    // completion
    id: 10,
    imgUrl: '../assets/img/images.jpg',
    type: 'completion',
  },
  {
    // completion
    id: 11,
    imgUrl: '../assets/img/images.jpg',
    type: 'completion',
  },
  {
    // completion
    id: 12,
    imgUrl: '../assets/img/images.jpg',
    type: 'completion',
  }
];

const getImages = (folder) => {
  folder.map(img => console.log(img))


  // let filteredImage;
  // const match = new RegExp(excapeRegExp(type), "i");
  // filteredImage = images.filter(img => match.test(img.type));
  return (
    folder.map(img => (
      //if (img.type === 'completion') {  img.type === 'completion' ? img.imgUrl : ''
        <div className="swiper-slide"><img src={'../assets/img/abuja7.jpg'} alt="House" className="inner__img" /></div>
      //}
    ))
  )
}

const getThumbnails = (type) => {
  let filteredThumbnail;
  const match = new RegExp(excapeRegExp(type), "i");
  filteredThumbnail = images.filter(img => match.test(img.type));
  return (
    filteredThumbnail.map(img => (
      <div style={{width: "30%", marginRight: "10px", marginTop: "10px"}}><img src={img.imgUrl} alt="House" style={{height: "auto", width: "100%"}}/></div>
    ))
  )
}

function Gallery(props) {
  // console.log(props.development)
  //props.development.map(img => console.log(img))
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
  return (
    // <div className="inner__main--1" style={{marginBottom: "200px"}}>
    <div>
    <Swiper {...gallerySwiperParams}>
      {/* { getImages(props.folder) } */}
      { props.folder === 'landSurvey' &&
        getImages(props.survey)
        // ( props.survey(img => (
        //     <div className="swiper-slide"><img src={img} alt="House" className="inner__img" /></div>
        //   ))
        // )
      }
      { props.folder === 'development' &&
        getImages(props.development)
        // ( props.development(img => (
        //     <div className="swiper-slide"><img src={img} alt="House" className="inner__img" /></div>
        //   ))
        // )
      }
      { props.folder === 'completion' &&
        getImages(props.completion)
        // ( props.completion(img => (
        //     <div className="swiper-slide"><img src={img} alt="House" className="inner__img" /></div>
        //   ))
        // )
      }
    </Swiper>
    <Swiper {...thumbnailSwiperParams}>
      { getThumbnails(props.folder)}
    </Swiper>
    </div>
  );
}

export default Gallery;

