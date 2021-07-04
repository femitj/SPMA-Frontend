import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from 'react-google-places-autocomplete';
import { toast } from 'react-toastify';
import { showLoader, hideLoader } from '../helpers/loader';
import shopy from '../img/shopy.jpg';
import { httpPost } from '../store/actions/http';

export const GOOGLE_MAPS_APIKEY = process.env.REACT_APP_GOOGLE_KEY;

const SignupPage = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gps, setGps] = useState({});
  const [address, setAddress] = useState('');

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

  const handleMapAddress = (address) => {
    geocodeByPlaceId(address.value.place_id)
      .then((results) => {
        console.log(results[0]);
        const newInfo = results[0].address_components;
        for (let i = 0; newInfo.length; i++) {
          if (
            newInfo[i].types.find(
              (item) => item === 'administrative_area_level_2'
            )
          ) {
            // console.log(newInfo[i].long_name);
            setAddress(newInfo[i].long_name);
          } else if (
            newInfo[i].types.find(
              (item) => item === 'administrative_area_level_1'
            )
          ) {
            setAddress(newInfo[i].long_name);
          }
        }
      })
      .catch((error) => console.error(error));
  };

  const submitData = async (e) => {
    e.preventDefault();
    showLoader();
    const data = {
      firstName,
      lastName,
      email,
      password,
      lga: address,
      address: gps.label,
    };
    const res = await httpPost('/auth/signup', data);
    if (res.code === 201) {
      toast.success(res.message);
      hideLoader();
      props.history.push('/login');
    } else {
      toast.warn(res.message);
      hideLoader();
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
          <h1 className="signup__heading">Welcome to SMPA</h1>
          <p className="signup__sub mt-1-5p">Purchase at your comfort</p>
          <p className="signup__acct mt-3">
            Already have an account?{' '}
            <Link to="/login" className="signup__acct signup__acct__link">
              Log In
            </Link>
          </p>
          <form className="signup__forms__container" onSubmit={submitData}>
            <div className="input">
              <label htmlFor="input__field" className="input__label">
                First Name
              </label>
              <input
                type="text"
                className="input__field"
                placeholder="Your first name"
                onChange={(e) => setFirstName(e.target.value)}
                name="firstName"
                required
              />
            </div>
            <div className="input">
              <label htmlFor="input__field" className="input__label">
                Last Name
              </label>
              <input
                type="text"
                className="input__field"
                placeholder="Your last name"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <label htmlFor="input__field" className="input__label">
                Email
              </label>
              <input
                type="email"
                className="input__field"
                placeholder="Email address"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <label htmlFor="input__field" className="input__label">
                Address
              </label>
              <GooglePlacesAutocomplete
                selectProps={{
                  gps,
                  onChange: (val) => {
                    setGps(val);
                    handleMapAddress(val);
                  },
                }}
                apiKey={GOOGLE_MAPS_APIKEY}
              />
            </div>
            <div className="input">
              <label htmlFor="input__field" className="input__label">
                Password
              </label>
              <input
                type="password"
                className="input__field"
                placeholder="Your password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <label htmlFor="input__field" className="input__label">
                Confirm Password
              </label>
              <input
                type="password"
                className="input__field"
                placeholder="Your password again"
                name="confrmpwd"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div id="">
              <button
                type="submit"
                className="btn btn__login"
                style={{ background: 'green', padding: '1.5rem' }}
              >
                Sign up
              </button>
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

export default SignupPage;
