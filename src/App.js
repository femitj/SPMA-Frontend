import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Loginpage from './components/Loginpage';
import SignupPage from './components/Signup';
import Landing from './components/Landing';
import Comment from './components/Comment';

import AccountOverview from './components/Account';

import ScrollToTop from './helpers/ScrollToTop';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Product from './components/Product';

function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop>
          <ToastContainer />
          <Switch>
            <Route exact path="/" component={Loginpage} />
            <Route path="/login" component={Loginpage} />
            <Route path="/signup" component={SignupPage} />
            <Route exact path="/landing" component={Landing} />
            <Route path="/account" component={AccountOverview} />
            <Route path="/products" component={Product} />
            <Route path="/comment" component={Comment} />
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
