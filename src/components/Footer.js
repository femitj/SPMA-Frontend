import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const Footer = (props) => {
  const { location, styleType } = props;
  const { pathname } = location;
  // console.log(styleType)
  return (
    <footer className={`footer ${styleType ? styleType : ''}`}>
      <div className="footer__content">
        <div className="footer__link">
          <ul className="footer__link__items">
            <li className="footer__link__item">
              <p className="footer__link__title">Quick Links</p>
            </li>
            <li className="footer__link__item">
              <Link
                to="/about"
                className="footer__link__text footer__link__text__link"
              >
                About Us
              </Link>
            </li>
            <li className="footer__link__item">
              <Link
                to="#"
                className="footer__link__text footer__link__text__link"
              >
                Partners & Programs
              </Link>
            </li>
            <li className="footer__link__item">
              <Link
                to="#"
                className="footer__link__text footer__link__text__link"
              >
                Terms and Conditions
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer__contact">
          <p className="footer__link__title">CONTACT</p>
          <p className="footer__link__text">
            Block G, House 4, Adebola Road, Lagos.
          </p>
          <p className="footer__link__text">0809 222 2109, 01 291 4247</p>
          <p className="footer__link__text">info@spma.com</p>
        </div>
        <div className="footer__subcribe">
          <p className="footer__link__title">NEWSLETTER</p>
          <p className="footer__link__text">
            Recieve latest updates and news directly from our team
          </p>
          <div className="footer__input-container">
            <input
              type="text"
              placeholder="What’s your email address"
              className="footer__input"
            />
            <button type="submit" className="footer__input__btn">
              Subscribe
            </button>
          </div>
        </div>

        <div className="footer__apps">
          <p className="footer__link__title">Also find us on</p>
          <div className="footer__buttons">
            <a href="#" className="footer__button">
              <img
                src="../assets/img/google-play-download-android-app.svg"
                alt="Instagram"
                className="footer__button__img"
              />
            </a>
            <a href="#" className="footer__button">
              <img
                src="../assets/img/appstore-apple.svg"
                alt="Instagram"
                className="footer__button__img"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="footer__line"></div>
      <div className="footer__bottom">
        <p className="footer__copyright">©2018 - SPMA | All right reserved</p>
        <div className="footer__social-medias">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <a href="#">
              <g clipPath="url(#clip0)">
                <path
                  className="footer__social-media"
                  d="M20 3.79875C19.2562 4.125 18.4637 4.34125 17.6375 4.44625C18.4875 3.93875 19.1363 3.14125 19.4413 2.18C18.6488 2.6525 17.7737 2.98625 16.8412 3.1725C16.0887 2.37125 15.0162 1.875 13.8462 1.875C11.5762 1.875 9.74875 3.7175 9.74875 5.97625C9.74875 6.30125 9.77625 6.61375 9.84375 6.91125C6.435 6.745 3.41875 5.11125 1.3925 2.6225C1.03875 3.23625 0.83125 3.93875 0.83125 4.695C0.83125 6.115 1.5625 7.37375 2.6525 8.1025C1.99375 8.09 1.3475 7.89875 0.8 7.5975C0.8 7.61 0.8 7.62625 0.8 7.6425C0.8 9.635 2.22125 11.29 4.085 11.6712C3.75125 11.7625 3.3875 11.8062 3.01 11.8062C2.7475 11.8062 2.4825 11.7912 2.23375 11.7362C2.765 13.36 4.2725 14.5537 6.065 14.5925C4.67 15.6837 2.89875 16.3412 0.98125 16.3412C0.645 16.3412 0.3225 16.3262 0 16.285C1.81625 17.4562 3.96875 18.125 6.29 18.125C13.835 18.125 17.96 11.875 17.96 6.4575C17.96 6.27625 17.9537 6.10125 17.945 5.9275C18.7587 5.35 19.4425 4.62875 20 3.79875Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </a>
          </svg>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <a href="#">
              <path
                className="footer__social-media"
                d="M5.2711 10.652H7.46341V19.6774C7.46341 19.8556 7.60778 20 7.78599 20H11.5031C11.6813 20 11.8257 19.8556 11.8257 19.6774V10.6945H14.346C14.5099 10.6945 14.6477 10.5716 14.6665 10.4088L15.0492 7.08609C15.0597 6.99469 15.0308 6.90313 14.9696 6.83453C14.9084 6.7659 14.8208 6.7266 14.7288 6.7266H11.8259V4.64375C11.8259 4.0159 12.1639 3.6975 12.8308 3.6975C12.9258 3.6975 14.7288 3.6975 14.7288 3.6975C14.907 3.6975 15.0514 3.55305 15.0514 3.37492V0.324961C15.0514 0.146758 14.907 0.00238281 14.7288 0.00238281H12.113C12.0946 0.00148438 12.0536 0 11.9932 0C11.5393 0 9.96173 0.0891015 8.71552 1.23555C7.33474 2.50602 7.52669 4.02715 7.57255 4.2909V6.72652H5.27106C5.09286 6.72652 4.94849 6.8709 4.94849 7.0491V10.3294C4.94853 10.5075 5.0929 10.652 5.2711 10.652Z"
                fill="white"
              />
            </a>
          </svg>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <a href="#">
              <path
                className="footer__social-media"
                d="M2.3112 0.000854492H15.6899C16.9609 0.000854492 18 1.15579 18 2.56805V17.4333C18 18.8451 16.9609 19.9993 15.6899 19.9993H2.3112C1.04016 19.9993 0 18.8451 0 17.4333V2.56805C0 1.15579 1.04016 0.000854492 2.3112 0.000854492ZM13.1128 2.22199C12.6665 2.22199 12.3025 2.62805 12.3025 3.12365V5.27792C12.3025 5.77372 12.6665 6.17885 13.1128 6.17885H15.1469C15.5925 6.17885 15.9573 5.77372 15.9573 5.27792V3.12365C15.9573 2.62805 15.5925 2.22199 15.1469 2.22199H13.1128ZM15.965 8.45792H14.3813C14.5315 9.00292 14.6129 9.57765 14.6129 10.1752C14.6129 13.5007 12.1069 16.1979 9.01692 16.1979C5.9277 16.1979 3.42168 13.5007 3.42168 10.1752C3.42168 9.57765 3.50388 9.00292 3.65334 8.45792H2.001V16.9067C2.001 17.3443 2.32254 17.7002 2.71596 17.7002H15.2504C15.6442 17.7002 15.965 17.3443 15.965 16.9067V8.45792ZM9.01698 6.06525C7.02138 6.06525 5.40258 7.80712 5.40258 9.95779C5.40258 12.1063 7.02138 13.8495 9.01698 13.8495C11.0137 13.8495 12.6325 12.1063 12.6325 9.95779C12.6325 7.80705 11.0137 6.06525 9.01698 6.06525Z"
                fill="white"
              />
            </a>
          </svg>
        </div>
      </div>
    </footer>
  );
};

export default withRouter(Footer);
