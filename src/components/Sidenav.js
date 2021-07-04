import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { logout, logOut } from '../store/actions/http';

import USERICON from '../assets/img/user (1).svg';
import TRASNSACTIONICON from '../assets/img/transaction.svg';
import CREDITCARDICON from '../assets/img/credit-card.svg';
import HEARTICON from '../assets/img/heart.svg';

const Sidenav = ({ props }) => {
  const { url } = props.match;

  const linkItems = [
    {
      id: 1,
      url: '/account',
      name: 'My Account',
      icon: USERICON,
    },
    {
      id: 2,
      url: '/products',
      name: 'Products',
      icon: TRASNSACTIONICON,
    },
    {
      id: 3,
      url: '#',
      name: 'Transactions',
      icon: TRASNSACTIONICON,
    },
    {
      id: 4,
      url: '#',
      name: 'Payments',
      icon: CREDITCARDICON,
    },
    {
      id: 5,
      url: '#',
      name: 'Interested Products',
      icon: HEARTICON,
    },
  ];

  return (
    <nav className="account__nav__items">
      {linkItems.map((item) => (
        <Link
          to={item.url}
          className={`account__nav__item ${
            url === item.url ? 'grey-bg' : null
          }`}
        >
          <img src={item.icon} alt="User Icon" className="account__nav__icon" />
          {item.name}
        </Link>
      ))}

      {/* <Link
        to="/saving"
        className={`account__nav__item ${url === '/saving' ? 'grey-bg' : null}`}
      >
        <img
          src="/assets/img/piggybank.svg"
          alt="Piggy Icon"
          className="account__nav__icon"
        />
        Saving
      </Link> */}

      <div className="account__nav__line"></div>
      <Link
        to="#"
        className="account__nav__item"
        className={`account__nav__item ${
          url === '/details' ? 'grey-bg' : null
        }`}
      >
        Details
      </Link>
      <Link
        to="#"
        className="account__nav__item"
        className={`account__nav__item ${
          url === '/password' ? 'grey-bg' : null
        }`}
      >
        Change Password
      </Link>
      <div className="account__nav__line"></div>
      <Link
        to="/login"
        onClick={() => logout()}
        className={`account__nav__item account__nav__item--lo ${
          url === '/login' ? 'grey-bg' : null
        }`}
      >
        LOG OUT
      </Link>
    </nav>
  );
};

export default Sidenav;
