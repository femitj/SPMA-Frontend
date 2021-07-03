import axios from 'axios';
import { toast } from 'react-toastify';
import { hideLoader } from '../../helpers/loader';

let baseUrl = '';

if (process.env.REACT_APP_NODE_ENV === 'development') {
  baseUrl = 'http://127.0.0.1:8080';
}

export const httpPost = async (url, postBody) => {
  if (!navigator.onLine) {
    return toast.warn('Please check your internet', 'Opps!', 3000);
  }
  try {
    const res = await axios.post(`${baseUrl}/api/v1${url}`, postBody, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    hideLoader();
    return { er: error.response.data };
  }
};

export const httpPostData = async (url, postBody) => {
  if (!navigator.onLine) {
    return toast.warn('Please check your internet', 'Opps!', 3000);
  }
  try {
    const res = await axios.post(`${baseUrl}/api/v1${url}`, postBody, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    hideLoader();
    return error.response.data;
  }
};

export const httpGet = async (url) => {
  if (!navigator.onLine) {
    return toast.warn('Please check your internet', 'Opps!', 3000);
  }
  try {
    const res = await axios.get(`${baseUrl}/api/v1${url}`, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    hideLoader();
    return error;
    // if (
    //   error.response.data.code === 401 &&
    //   error.response.data.message ===
    //     'Unauthorized, Your token is invalid or expired'
    // ) {
    //   toast.warn(
    //     error.response.data.message || 'Something went wrong. Please retry.',
    //     'Oops!',
    //     3000
    //   );
    //   localStorage.removeItem('api_token');
    //   return (window.location.href = '/login');
    // } else {
    //   return error;
    // }
  }
};

export const httpPut = async (url, postBody) => {
  if (!navigator.onLine) {
    return toast.warn('Please check your internet', 'Opps!', 3000);
  }
  try {
    const res = await axios.put(`${baseUrl}/api/v1${url}`, postBody, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    hideLoader();
    return error;
  }
};

export const httpPatch = async (url, postBody) => {
  if (!navigator.onLine) {
    return toast.warn('Please check your internet', 'Opps!', 3000);
  }
  try {
    const res = await axios.patch(`${baseUrl}/api/v1${url}`, postBody, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const httpDelete = async (url, postBody) => {
  if (!navigator.onLine) {
    return toast.warn('Please check your internet', 'Opps!', 3000);
  }
  try {
    const res = await axios.delete(`${baseUrl}/api/v1${url}`, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    console.log(res);
    return res;
  } catch (error) {
    hideLoader();
    return error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location = '/login';
};
