import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import USER from '../assets/img/user.svg';
import USER2 from '../assets/img/User(2).svg';
import { logout } from '../store/actions/http';

const Navbar = () => {
  const loggedIn = true;

  return (
    <nav className={`nav-bar`}>
      <div className="navigation">
        <input
          type="checkbox"
          className="navigation__checkbox"
          id="nav-toggle"
        />

        <label htmlFor="nav-toggle" className="navigation__button">
          <span className="navigation__icon">&nbsp;</span>
        </label>

        <div className="navigation__background">&nbsp;</div>

        <nav className="navigation__nav">
          <ul className="navigation__list">
            <li className="navigation__item">
              <Link to="/landing" className="navigation__link">
                HOME
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="nav-bar__logo" />

      <ul className="nav-bar__link">
        <li className="nav-bar__link__items">
          <Link to="/landing" className="nav-bar__link__items__link">
            Home
          </Link>
        </li>
      </ul>
      <div className="dropdown">
        <button
          className="dropbtn tab-d"
          style={loggedIn ? { display: 'block' } : { display: 'none' }}
        >
          <img src={USER} alt="user" />
        </button>
        <div className="dropdown-content tab-d" style={{ width: '85px' }}>
          <Link to="/account" className="dropdown-item">
            Dashboard
          </Link>
          <Link to="/product" className="dropdown-item">
            Create Product
          </Link>
          <Link to="#" className="dropdown-item" onClick={() => logout()}>
            Logout
          </Link>
        </div>
        <Link to="/account">
          <img src={USER2} alt="User Logo" className="logo-d" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
