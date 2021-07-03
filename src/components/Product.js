import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from 'react-google-places-autocomplete';
import Header from './Navbar';
import Footer from './Footer';
import Sidenav from './Sidenav';
import { showLoader, hideLoader } from '../helpers/loader';
import { httpGet, httpPost } from '../store/actions/http';
import moment from 'moment';
import { toast } from 'react-toastify';
import { GOOGLE_MAPS_APIKEY } from './Signup';

const Product = (props) => {
  const [productList, setProductList] = useState([]);
  const [data, setData] = useState({
    name: '',
    description: '',
    quantity: 0,
    imageUrl: '',
    mapCordinate: '',
    price: '',
    lga: '',
  });
  const [gps, setGps] = useState({});

  const getProducts = async () => {
    const res = await httpGet('/product/me');
    if (res.code === 200) {
      setProductList(res.data);
    }
  };

  useEffect(() => getProducts(), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoader();

    const postData = {
      ...data,
      address: gps.label,
    };

    const res = await httpPost('/product/create', postData);
    if (res.code === 201) {
      toast.success(res.message);
      getProducts();
      hideLoader();
    } else {
      toast.warn(res.message);
      hideLoader();
    }
  };

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
            setData({ ...data, lga: newInfo[i].long_name });
          } else if (
            newInfo[i].types.find(
              (item) => item === 'administrative_area_level_1'
            )
          ) {
            setData({ ...data, lga: newInfo[i].long_name });
          }
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Header />
      <header className="account__header">
        <Link to="/account" className="account__arrow">
          &larr;
        </Link>
        <p className="account__main">Products</p>
      </header>
      <main className="account">
        <div className="account__nav tab-d">
          <Sidenav props={props} />
        </div>
        <div className="account__content">
          <h1 className="account__heading">Products</h1>
          <div className="account__payment">
            <div
              style={{
                borderBottom: '0.75px solid #d6d6d6',
                padding: '10px',
                width: '96%',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Recent Product
            </div>
            <table>
              <tr>
                <th className="payment__sub" style={{ width: '13%' }}>
                  DATE
                </th>
                <th className="payment__sub phone-d">Title</th>
                <th className="payment__sub">Price</th>
                <th className="payment__sub">Address</th>
                <th className="payment__sub">Area</th>
                <th className="payment__sub">Status</th>
                <th>&nbsp;</th>
              </tr>
              {/* </thead> */}
              <tbody>
                {productList.length
                  ? productList.map((item) => (
                      <tr key={Math.random()}>
                        <td className="payment__text phone-sx-d">
                          {moment(item.created_at).format('YYYY-MMMM-DD')}
                        </td>
                        <td className="payment__text phone-sx-d">
                          {item.name}
                        </td>
                        <td className="payment__text phone-d">
                          ₦{item.price}{' '}
                        </td>
                        <td className="payment__text">{item.address}</td>
                        <td className="payment__text">{item.lga}</td>
                        <td className="payment__text">{item.status}</td>
                        <td>
                          <div></div>
                        </td>
                        <td>&nbsp;</td>
                      </tr>
                    ))
                  : 'No product found'}
              </tbody>
            </table>
          </div>
          <h1 className="account__heading mt-5">Create Product</h1>
          <form className="signup__forms__container signup__forms__container--2">
            <div className="input">
              <label
                htmlFor="input__field"
                className="input__label input__label--acct"
              >
                Name
              </label>
              <input
                required
                type="text"
                className="input__field"
                name="name"
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div className="input">
              <label
                htmlFor="input__field"
                className="input__label input__label--acct"
              >
                Description
              </label>
              <input
                required
                type="text"
                className="input__field"
                name="description"
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
            </div>
            <div className="input">
              <label
                htmlFor="input__field"
                className="input__label input__label--acct"
              >
                Quantity
              </label>
              <input
                required
                type="number"
                className="input__field"
                name="quantity"
                onChange={(e) => setData({ ...data, quantity: e.target.value })}
              />
            </div>
            <div className="input">
              <label
                htmlFor="input__field"
                className="input__label input__label--acct"
              >
                Address
              </label>
              <GooglePlacesAutocomplete
                selectProps={{
                  // styles: {
                  //   input: (provided) => ({
                  //     ...provided,
                  //     fontSize: '2.6rem',
                  //     padding: '1rem',
                  //     width: '100%',
                  //   }),
                  // },
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
              <label
                htmlFor="input__field"
                className="input__label input__label--acct"
              >
                Price
              </label>
              <input
                required
                type="text"
                className="input__field empty"
                name="price"
                onChange={(e) => setData({ ...data, price: e.target.value })}
              />
            </div>
            <div className="input">
              <label
                htmlFor="input__field"
                className="input__label input__label--acct"
              >
                Image
              </label>
              <input
                required
                type="file"
                className="input__field empty"
                name="dob"
                onChange={(e) =>
                  setData({ ...data, imageUrl: e.target.value[0] })
                }
              />
            </div>
            <button
              type="submit"
              className="btn btn__details"
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Product;
