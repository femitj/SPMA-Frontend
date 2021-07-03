import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

import { showLoader, hideLoader } from '../helpers/loader';
// import LOGO from '../assets/img/logo-white.png';
import shopy from '../img/shopy-bg.jpg';
import BASE_URL from '../helpers/checkenv';
import { httpPost } from '../store/actions/http';

const LoginPage = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const state = {
    data: {},
    error: '',
    displayError: 'none',
    spinner: 'none',
    success: '',
    displaySuccess: 'none',
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoggedIn(true);
    }
  }, []);

  const submitData = async (e) => {
    e.preventDefault();
    showLoader();

    const data = {
      email,
      password,
    };
    const res = await httpPost('/auth/login', data);
    if (res.code === 200) {
      toast.success(res.message);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      hideLoader();
      props.history.push('/landing');
    } else {
      toast.warn(res.er.message);
      hideLoader();
      console.log(res);
    }
  };

  if (loggedIn) {
    return <Redirect to="/account" />;
  }

  return (
    <div>
      <section className="signup">
        <div
          className="signup__banner"
          style={{ background: `url(${shopy})`, backgroundSize: 'cover' }}
        >
          <Link to="/">
            {/* <img src={LOGO} alt="logo" className="signup__logo" /> */}
          </Link>
        </div>
        <div className="signup__forms">
          <h1 className="signup__heading">Welcome Back!</h1>
          <p className="signup__sub mt-1-5p">Purchase at your comfort</p>
          <form
            className="signup__forms__container login1-form"
            style={{ width: '60%' }}
            onSubmit={submitData}
          >
            <div className="input w100">
              <label htmlFor="input__field" className="input__label">
                Email
              </label>
              <input
                type="email"
                className="input__field"
                name="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input w100 lc">
              <label htmlFor="input__field" className="input__label">
                Password
              </label>
              <input
                type="password"
                className="input__field"
                name="password"
                placeholder="Your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div id="">
              <button
                className="btn btn__login"
                style={{ background: 'green' }}
              >
                Log In
              </button>
              <p className="signup__acct mt-3">
                Don’t have an account yet?
                <Link to="/signup" className="signup__acct signup__acct__link">
                  {' '}
                  Sign Up
                </Link>
              </p>
              <div id="autn-info">
                <div id="spinner" style={{ display: state.spinner }}>
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
                {/* <!-- Error Alert --> */}
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  style={{ display: state.displayError }}
                >
                  <strong>Error!</strong> {state.error}
                  <button type="button" className="close" data-dismiss="alert">
                    &times;
                  </button>
                </div>

                {/* <!-- Success Alert --> */}
                <div
                  className="alert alert-success alert-dismissible fade show"
                  style={{ display: state.displaySuccess }}
                >
                  <strong>Success!</strong> {state.success}
                  <button type="button" className="close" data-dismiss="alert">
                    &times;
                  </button>
                </div>
              </div>
            </div>
            <br />
          </form>

          <a href="#" className="signup__terms">
            By signing up you are agreeing to lofty heights's terms of service,
            Privacy Policy
          </a>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
