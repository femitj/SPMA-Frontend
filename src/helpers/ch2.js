import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Swiper from 'react-id-swiper';
import excapeRegExp from "escape-string-regexp";
import BASE_URL from './checkenv'

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

const fetchImages = async () => {
  const prop = await axios
      .get(`${BASE_URL}/investments/${'5dd665bb2aa1b037d47ca80d'}`)
  console.log(prop)
}

const getImages = (folder) => {
  // let filteredImage;
  // const match = new RegExp(excapeRegExp(type), "i");
  // filteredImage = images.filter(img => match.test(img.type));
  return (
    folder.map(img => (
      //if (img.type === 'completion') {  img.type === 'completion' ? img.imgUrl : ''
        <div className="swiper-slide"><img src={img || ''} alt="House" className="inner__img" /></div>
      //}
    ))
  )
}

const getThumbnails = (folder) => {
  // let filteredThumbnail;
  // const match = new RegExp(excapeRegExp(type), "i");
  // filteredThumbnail = images.filter(img => match.test(img.type));
  return (
    folder.map(img => (
      <div style={{width: "30%", marginRight: "10px", marginTop: "10px"}}><img src={img || ''} alt="House" style={{height: "auto", width: "100%"}}/></div>
    ))
  )
}

const getFolders = (type, survey, development, completion) => {
  fetchImages()
  if (type === 'landSurvey'){
    return (
      survey.map(img => (
        //if (img.type === 'completion') {  img.type === 'completion' ? img.imgUrl : ''
          <div className="swiper-slide"><img src={img || ''} alt="House" className="inner__img" /></div>
        //}
      ))
    )
  } else if(type === 'development'){
    return (
      development.map(img => (
        //if (img.type === 'completion') {  img.type === 'completion' ? img.imgUrl : ''
          <div className="swiper-slide"><img src={img || ''} alt="House" className="inner__img" /></div>
        //}
      ))
    )
  }
}

const getFoldersThumb = (type, survey, development, completion) => {
  if (type === 'landSurvey'){
    return (
      survey.map(img => (
        <div style={{width: "30%", marginRight: "10px", marginTop: "10px"}}><img src={img || ''} alt="House" style={{height: "auto", width: "100%"}}/></div>
      ))
    )
  } else if(type === 'development'){
    return (
      development.map(img => (
        <div style={{width: "30%", marginRight: "10px", marginTop: "10px"}}><img src={img || ''} alt="House" style={{height: "auto", width: "100%"}}/></div>
      ))
    )
  }
}

function Gallery(props) {
  console.log(props)

  const getFolders = (type, survey, development, completion) => {
    //fetchImages()
    if (type === 'landSurvey'){
   // let filteredThumbnail;
    //const match = new RegExp(excapeRegExp(type), "i");
    // filteredThumbnail = props.filter(img => match.test(img.type));
    //console.log(filteredThumbnail)
      return (
        props.survey.map(img => (
          //if (img.type === 'completion') {  img.type === 'completion' ? img.imgUrl : ''
            <div className="swiper-slide"><img src={img || ''} alt="House" className="inner__img" /></div>
          //}
        ))
      )
    } else if(type === 'development'){
      return (
        development.map(img => (
          //if (img.type === 'completion') {  img.type === 'completion' ? img.imgUrl : ''
            <div className="swiper-slide"><img src={img || ''} alt="House" className="inner__img" /></div>
          //}
        ))
      )
   }
  }
  
  const getFoldersThumb = (type, survey, development, completion) => {
    if (type === 'landSurvey'){
      return (
        survey.map(img => (
          <div style={{width: "30%", marginRight: "10px", marginTop: "10px"}}><img src={img || ''} alt="House" style={{height: "auto", width: "100%"}}/></div>
        ))
      )
    } else if(type === 'development'){
      return (
        development.map(img => (
          <div style={{width: "30%", marginRight: "10px", marginTop: "10px"}}><img src={img || ''} alt="House" style={{height: "auto", width: "100%"}}/></div>
        ))
      )
    }
  }

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
    {/* <div class="swiper-container gallery-top"> */}
      {/* <div class="swiper-wrapper"> */}
      {/* { props.folder === 'landSurvey' &&
        getImages(props.survey)
      }
      { props.folder === 'development' &&
        getImages(props.development)
      } */}
      { getFolders(props.folder, props.survey, props.development, props.completion)}
      {/* <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
      <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
      <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
      <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
      <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div> */}
      {/* </div> */}
      {/* </div> */}
    </Swiper>
    <Swiper {...thumbnailSwiperParams}>
      {/* <div style={{height: "100px !important"}}> */}
      {/* <div className="swiper-container gallery-thumbs">
      <div class="swiper-wrapper"> */}
      {/* { props.folder === 'landSurvey' &&
        getThumbnails(props.survey)
      }
      { props.folder === 'development' &&
        getImages(props.development)
      } */}

      { getFoldersThumb(props.folder, props.survey, props.development, props.completion)}

        {/* <div style={{width: "30%", marginRight: "10px", marginTop: "10px"}}><img src="../assets/img/abuja7.jpg" alt="House" style={{height: "auto", width: "100%"}}/></div>
        <div style={{width: "30%", marginRight: "10px", marginTop: "10px"}}><img src="../assets/img/abuja7.jpg" alt="House" style={{height: "auto", width: "100%"}} /></div>
        <div style={{width: "30%", marginRight: "10px", marginTop: "10px"}}><img src="../assets/img/abuja7.jpg" alt="House" style={{height: "auto", width: "100%"}} /></div>
        <div style={{width: "30%", marginRight: "10px", marginTop: "10px"}}><img src="../assets/img/abuja7.jpg" alt="House" style={{height: "auto", width: "100%"}} /></div>
        <div style={{width: "30%", marginRight: "10px", marginTop: "10px"}}><img src="../assets/img/abuja7.jpg" alt="House" style={{height: "auto", width: "100%"}} /></div> */}


      {/* </div>
      </div> */}
    </Swiper>
    </div>
  );
}

export default Gallery;

