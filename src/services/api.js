import axios from 'axios';
import qs from 'qs';

export const authenticate = (userData) => {
  userData['username'] = userData['email'];
  return axios({
    url: `${process.env.NEXT_PUBLIC_API_HOST}/auth/jwt/login`,
    method: 'post',
    data: qs.stringify(userData),
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  });
};

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('access-token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const register = (userData) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_HOST}/auth/register`,
    userData
  );
};

export const forgotPass = (userData) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_HOST}/auth/forgot-password`,
    userData
  );
};

export const resetPass = (userData) => {
  delete userData['password2'];
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_HOST}/auth/reset-password`,
    userData
  );
};

export const createHook = (accessToken, userData) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/hook/`, userData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const getAllHooks = async (accessToken) => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_HOST}/hook/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((r) => r.data);
};

export const getHook = (accessToken, id) => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_HOST}/hook/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((r) => r.data);
};

export const getHookHits = (accessToken, id) => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_HOST}/hook/${id}/hits`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((r) => r.data);
};

export const updateHook = (accessToken, data) => {
  return axios
    .put(
      `${process.env.NEXT_PUBLIC_API_HOST}/hook/${data.hookId}`,
      data.values,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
    .then((r) => r.data);
};

export const deleteHook = (accessToken, id) => {
  return axios.delete(`${process.env.NEXT_PUBLIC_API_HOST}/hook/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export default {
  authenticate,
  register,
  forgotPass,
  resetPass,
  createHook,
  getAllHooks,
  getHook,
  getHookHits,
  updateHook,
  deleteHook,
};
