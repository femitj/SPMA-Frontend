import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import excapeRegExp from 'escape-string-regexp';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';

import { showLoader, hideLoader } from '../helpers/loader';
import AutoSwiper from '../helpers/AutoSwiper';
import Footer from './Footer';
import LOGO from '../assets/img/logo-white.png';
import HOUSE_LOGO from '../assets/img/house1.jpg';
import sweater from '../img/sweater.jpg';
import BATHROOM from '../assets/img/bathroom.svg';
import BED from '../assets/img/bed.svg';
import BASE_URL from '../helpers/checkenv';
import Pagination from './common/pagination';
import { paginate } from '../helpers/paginate';
import { httpGet } from '../store/actions/http';
// import '../assets/css/main.min.css';

toast.configure({
  autoClose: 5000,
  draggable: false,
  hideProgressBar: true,
});

const Landing = (props) => {
  const [totalCount, setTotalCount] = useState(10);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const count = useState(2);
  const [loggedIn, setLoggedIn] = useState(false);

  const getProducts = async () => {
    const res = await httpGet('/product/available_location');
    if (res.code === 200) {
      setProducts(res.data);
    }
  };

  const getAllProducts = async () => {
    const res = await httpGet('/product/all');
    if (res.code === 200) {
      setProducts(res.data);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      getAllProducts();
    } else {
      setLoggedIn(true);
      getProducts();
    }
  }, []);

  const handlePageChange = () => {};

  const handleNextPage = () => {};

  return (
    <div>
      <nav className="nav-bar nav-bar--trans">
        <div className="nav-bar__logo" />
        <ul className="nav-bar__link">
          <li className="nav-bar__link__items">
            <Link
              to="/"
              className="nav-bar__link__items__link nav-bar__link__items__link--white"
            >
              Home
            </Link>
          </li>
          <li className="nav-bar__link__items">
            <Link
              to="/about"
              className="nav-bar__link__items__link nav-bar__link__items__link--white"
            >
              about
            </Link>
          </li>
          <li className="nav-bar__link__items">
            <Link
              to="/contact_us"
              className="nav-bar__link__items__link nav-bar__link__items__link--white"
            >
              contact
            </Link>
          </li>
        </ul>
        <div className="nav-bar__buttons">
          <button
            className="btn btn__nav btn__nav-login"
            onClick={() => props.history.push('/login')}
            style={loggedIn ? { display: 'none' } : { display: 'block' }}
          >
            login
          </button>
          {!loggedIn ? (
            <button
              className="btn btn__nav btn__nav-signin"
              onClick={() => props.history.push('/signup')}
            >
              signup
            </button>
          ) : (
            <button
              className="btn btn__nav btn__nav-signin"
              onClick={() => props.history.push('/account')}
            >
              Dashboard
            </button>
          )}
        </div>
      </nav>
      <header className="header header__landing">
        <AutoSwiper />
        <div className="header__texts">
          <h1 className="header__main">Mega Flash Sales</h1>
          <p className="header__sub">Search products for sale.</p>
        </div>
        <div className="header__bar">
          <span className="header__bar__icon">&#x26B2;</span>
          <input
            type="search"
            name="seach"
            className="header__bar__search"
            placeholder="Search products, brands and categories"
          />
          <select
            name="houseType"
            className="header__bar__dropdown"
            // onChange={this.handleChange}
          >
            <option className="header__bar__option">ALL CITY</option>
            <option value="Ikeja" className="header__bar__option">
              Ikeja
            </option>
          </select>
          <select
            name="salesType"
            className="header__bar__dropdown"
            // onChange={this.handleChange}
          >
            <option className="header__bar__option">ALL CITY</option>
            <option value="lagos" className="header__bar__option">
              Lagos
            </option>
          </select>
          <button
            type="submit"
            className="btn btn__bar"
            onClick={(e) => this.handleClick(e)}
          >
            SEARCH
          </button>
        </div>
      </header>

      <section className="landing">
        <div className="landing__heading">
          <p className="landing__title">
            Showing <span className="red-color2">{totalCount}</span> of
            <span className="red-color2"> {count}</span> results
          </p>
        </div>

        <div className="landing__boxes">
          {/* { loading ?
             <Loader
             type="TailSpin"
             color="#00BFFF"
             height={100}
             width={100}
             // timeout={3000} //3 secs
             /> : everyProps } */}

          {products.length
            ? products.map((item) => (
                <div className="landing__box">
                  <Link to="/comment">
                    <div className="landing__image">
                      {/* onClick={() => this.changeRoute(`/${data.propertyType.toLowerCase()}/${data._id}`)}> */}
                      <img src={sweater} alt="House" className="landing__img" />
                      <div className="landing__overlay"></div>
                      <div className="landing__costs">
                        <p className="landing__cost">‎₦{item.price}</p>
                      </div>
                    </div>
                  </Link>
                  <div className="landing__content">
                    <div className="landing__first">
                      <div className="landing__head">
                        <p className="landing__location">{item.name}</p>
                        <p className="landing__sub">{item.lga}</p>
                      </div>
                      <svg
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          className="landing__like"
                          cx="28"
                          cy="28"
                          r="28"
                          fill="#C9472C"
                          // onClick={ () => this.likeProperty(data._id) }
                        />
                        <g clip-path="url(#clip0)">
                          <path
                            d="M39.9604 23.4968C39.6101 19.6408 36.8809 16.8433 33.4653 16.8433C31.1898 16.8433 29.1063 18.0678 27.9339 20.0304C26.7721 18.0424 24.774 16.8428 22.535 16.8428C19.1199 16.8428 16.3902 19.6404 16.0403 23.4963C16.0126 23.6666 15.8991 24.563 16.2443 26.0247C16.7419 28.1332 17.8912 30.051 19.5671 31.5695L27.9284 39.1572L36.4332 31.57C38.1091 30.051 39.2584 28.1336 39.756 26.0247C40.1012 24.5634 39.9877 23.6671 39.9604 23.4968ZM38.8573 25.8134C38.4031 27.739 37.3503 29.4934 35.8156 30.8836L27.9339 37.9156L20.1875 30.8855C18.65 29.4925 17.5976 27.7385 17.143 25.8129C16.8162 24.4296 16.9505 23.6481 16.951 23.6431L16.9579 23.5965C17.2579 20.2183 19.6031 17.766 22.535 17.766C24.6983 17.766 26.6027 19.0953 27.5065 21.2346L27.9316 22.2422L28.3567 21.2346C29.2461 19.128 31.2512 17.7664 33.4658 17.7664C36.3972 17.7664 38.7428 20.2187 39.0488 23.6408C39.0498 23.6481 39.1841 24.43 38.8573 25.8134Z"
                            fill="white"
                          />
                          <path
                            d="M23.3849 19.6483C20.8399 19.6483 18.7693 21.7188 18.7693 24.2639C18.7693 24.5192 18.9756 24.7255 19.2309 24.7255C19.4861 24.7255 19.6924 24.5192 19.6924 24.2639C19.6924 22.2279 21.349 20.5714 23.3849 20.5714C23.6402 20.5714 23.8465 20.3651 23.8465 20.1098C23.8465 19.8546 23.6397 19.6483 23.3849 19.6483Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(16 16)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              ))
            : 'No product found'}
        </div>

        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          nextPage={handleNextPage}
        />
      </section>
      <Footer styleType={'m-none'} />
    </div>
  );
};

export default Landing;
