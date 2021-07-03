import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swiper from 'react-id-swiper';
import excapeRegExp from "escape-string-regexp";
import BASE_URL from './checkenv'

// id, imgUrl, type, propertyId
const images = [
  {
    // land & survey '../assets/img/abuja7.jpg'
    id: 1,
    imgUrl: 'https://res.cloudinary.com/lms-center/image/upload/v1574687074/abuja7_gavexf.jpg',
    type: 'landSurvey'
  },
  {
    // land & survey
    id: 2,
    imgUrl: 'https://res.cloudinary.com/lms-center/image/upload/v1574687074/abuja7_gavexf.jpg',
    type: 'landSurvey',
  },
  {
    // land & survey
    id: 3,
    imgUrl: 'https://res.cloudinary.com/lms-center/image/upload/v1574687074/abuja7_gavexf.jpg',
    type: 'landSurvey',
  },
  {
    // land & survey
    id: 4,
    imgUrl: 'https://res.cloudinary.com/lms-center/image/upload/v1574687074/abuja7_gavexf.jpg',
    type: 'landSurvey',
  },
  {
    // development '../assets/img/house1.jpg'
    id: 5,
    imgUrl: 'https://res.cloudinary.com/lms-center/image/upload/v1574687065/house1_ye3xux.jpg',
    type: 'development',
  },
  {
    // development
    id: 6,
    imgUrl: 'https://res.cloudinary.com/lms-center/image/upload/v1574687065/house1_ye3xux.jpg',
    type: 'development',
  },
  {
    // development
    id: 7,
    imgUrl: 'https://res.cloudinary.com/lms-center/image/upload/v1574687065/house1_ye3xux.jpg',
    type: 'development',
  },
  {
    // development
    id: 8,
    imgUrl: 'https://res.cloudinary.com/lms-center/image/upload/v1574687065/house1_ye3xux.jpg',
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

//const folder = ['https://res.cloudinary.com/lms-center/image/upload/v1574687065/house1_ye3xux.jpg', 'https://res.cloudinary.com/lms-center/image/upload/v1574687065/house1_ye3xux.jpg', 'https://res.cloudinary.com/lms-center/image/upload/v1574687065/house1_ye3xux.jpg']

const folders = [];

const fetchImages = async () => {
  const prop = await axios
      .get(`${BASE_URL}/investments/${'5dd665bb2aa1b037d47ca80d'}`)
  //console.log(prop.data.data.land_survey_image)
  const { development_image } = prop.data.data
  development_image.map(img => folders.push(img))
}

const getImages = (type, folder) => {
  // let filteredImage;
  if(type === 'surveyImages'){
    let newFolder = [];
    folder.surveyImages.map(img => newFolder.push(img))
    return (
      newFolder.map(img => (
        //if (img.type === 'completion') {  img.type === 'completion' ? img.imgUrl : ''
          <div><img src={img} alt="House" className="inner__img" /></div>
        //}
      ))
    )
  }

  if(type === 'developmentImages'){
    let newFolder = [];
    folder.developmentImages.map(img => newFolder.push(img))
    return (
      newFolder.map(img => (
          <div><img src={img} alt="House" className="inner__img" /></div>
        //}
      ))
    )
  }

  if(type === 'completionImages'){
    let newFolder = [];
    folder.completionImages.map(img => newFolder.push(img))
    return (
      newFolder.map(img => (
          <div><img src={img} alt="House" className="inner__img" /></div>
        //}
      ))
    )
  }
  
}

const getThumbnails = (type, folder) => {
  let filteredThumbnail;

  if(type === 'surveyImages'){
    let newFolder = [];
    folder.surveyImages.map(img => newFolder.push(img))
    return (
      newFolder.map(img => (
        <div style={{width: "30%", marginRight: "10px", marginTop: "10px", opacity: "0.3!important"}}><img src={img} alt="House" style={{height: "auto", width: "100%"}}/></div>
      ))
    )
  }

  if(type === 'developmentImages'){
    let newFolder = [];
    folder.developmentImages.map(img => newFolder.push(img))
    return (
      newFolder.map(img => (
        <div style={{width: "30%", marginRight: "10px", marginTop: "10px", opacity: "0.3!important"}}><img src={img} alt="House" style={{height: "auto", width: "100%"}}/></div>
      ))
    )
  }

  if(type === 'completionImages'){
    let newFolder = [];
    folder.completionImages.map(img => newFolder.push(img))
    return (
      newFolder.map(img => (
        <div style={{width: "30%", marginRight: "10px", marginTop: "10px", opacity: "0.3!important"}}><img src={img} alt="House" style={{height: "auto", width: "100%"}}/></div>
      ))
    )
  }

}

function Gallery(props) {
  //fetchImages()
  // --- folder = landSurvey; survey
  //console.log(props)
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    slidesPerView: 'auto',
    spaceBetween: 10,
    observer: true,
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
    observer: true,
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
    <div>
    <Swiper {...gallerySwiperParams}>
      { getImages(props.folder, props) }
    </Swiper>
    <Swiper {...thumbnailSwiperParams}>
      { getThumbnails(props.folder, props)}
    </Swiper>
    </div>
  );
}

export default Gallery;

