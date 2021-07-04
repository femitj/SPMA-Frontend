import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import { showLoader, hideLoader } from '../helpers/loader';
import Header from './Navbar';
import Footer from './Footer';
import Sidenav from './Sidenav';
import AccountTable from './AccountTable';
import BASE_URL from '../helpers/checkenv';
import { toast } from 'react-toastify';

const PaystackPop = window.PaystackPop;

const AccountOverview = (props) => {
  const [loggedIn, setLoggedIn] = useState(true);
  const state = {
    user: '',
    payments: [],
    properties: [],
    totalBought: 0,
    totalInvestment: 0,
    token: '',
    totalProperties: 0,
    loaded: false,
  };

  if (!loggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Header />
      <main className="account">
        <div className="account__nav">
          <Sidenav props={props} />
        </div>
        <div className="account__contents">
          <div className="account__content tab-d">
            <h1 className="account__heading">Account Overview</h1>
            <div className="account__overviews">
              <div className="account__details">
                <div className="account__details__header">
                  <p className="account__details__heading">ACCOUNT DETAILS</p>
                </div>
                <div className="account__details__body">
                  <div className="account__details__transactions">
                    <p className="account__details__number">{0}</p>
                    <p className="account__details__sub">Transactions</p>
                  </div>
                  <div className="account__details__investments">
                    <div className="account__details__investment">
                      <p className="account__details__purchase">
                        <span className="account__details__pur-title">{0}</span>
                        Products
                      </p>
                      <p className="account__details__purchase">
                        <span className="account__details__pur-title">{0}</span>{' '}
                        Purchase
                      </p>
                    </div>
                  </div>
                </div>
                <div className="account__details__pendings">
                  <h5 className="account__details__pending__title">
                    Pending Payments
                  </h5>
                  {state.loaded ? (
                    <div className="account__details__pending">
                      <div>{200}</div>
                    </div>
                  ) : (
                    // <div className="account__details__pending">
                    //   <a href="#" className="account__details__pending__link">Duplex, Eti Osa - 10,000 Naira</a>
                    //   <button className="btn btn__lil-pay">Pay Now</button>
                    // </div>
                    <p>No pending payment found</p>
                  )}
                </div>
              </div>
              {state.loaded ? (
                <div className="account__transaction account__transaction--2">
                  <div className="account__trans__items">
                    <div className="account__trans__imgs">
                      <img
                        src="assets/img/trans-img-1.png"
                        alt="Transaction Image"
                        className="account__trans__img account__trans__img--2"
                      />
                    </div>
                    <div className="account__trans__info">
                      <div className="account__trans__text">
                        <p className="account__house account__house--2">
                          {'Rent'}
                        </p>
                        <p className="account__location account__location--2">
                          {'Surulere'}
                        </p>
                      </div>
                      <Link
                        className="btn btn__view btn__view--3"
                        style={{
                          textDecoration: 'none',
                          textAlign: 'center',
                        }}
                      >
                        View
                      </Link>
                    </div>
                  </div>
                  <div className="account__trans__statuses">
                    <div className="account__trans__status account__trans__status--2">
                      <p className="account__trans__type account__trans__type--2">
                        Number of Units
                      </p>
                      <p className="account__trans__unit account__trans__unit--2">
                        {1}
                      </p>
                    </div>
                    <div className="account__trans__line"></div>
                    <div className="account__trans__status account__trans__status--2">
                      <p className="account__trans__type account__trans__type--2">
                        Type
                      </p>
                      <p className="account__trans__unit account__trans__unit--2">
                        {'buy'}
                      </p>
                    </div>
                    <div className="account__trans__line"></div>
                    <div className="account__trans__status account__trans__status--2">
                      <p className="account__trans__type account__trans__type--2">
                        Amount Due
                      </p>
                      <p className="account__trans__unit account__trans__unit--2 red-color">
                        ‎{0}
                      </p>
                    </div>
                    <div className="account__trans__line"></div>
                    <div className="account__trans__status account__trans__status--2">
                      <p className="account__trans__type account__trans__type--2">
                        Status
                      </p>
                      <p className="account__trans__unit account__trans__unit--2 blue-color">
                        {''}
                      </p>
                    </div>
                    <div className="account__trans__line"></div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="account__overview">
              <table>
                <thead>
                  <tr>
                    <th className="payment__text">Recent Transactions</th>
                    <th className="phone-d">&nbsp;</th>
                    <th className="phone-d">&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                  </tr>
                  <tr>
                    <td className="payment__sub phone-sx-d">DATE</td>
                    <td className="payment__sub phone-d">PROPERTY</td>
                    <td className="payment__sub phone-d">AMOUNT RECEIVED</td>
                    <td className="payment__sub">AMOUNT PAYED</td>
                    <td className="payment__sub">MODE OF PAYMENT</td>
                  </tr>
                </thead>
                {state.loaded ? (
                  <AccountTable data={[]} />
                ) : (
                  <div
                    id="spinner"
                    style={{ textAlign: 'center', padding: '5%' }}
                  >
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
                {/* </tbody> */}
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountOverview;
