import axios from "axios";
import qs from "qs";

export const authenticate = userData => {
  userData['username'] = userData['email']
  return axios({
    url: `${process.env.NEXT_PUBLIC_API_HOST}/auth/jwt/login`,
    method: 'post',
    data: qs.stringify(userData),
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}

export const register = userData => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/auth/register`, userData)
}

export const forgotPass = userData => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/auth/forgot-password`, userData)
}

export const resetPass = (userData) => {
  // userData['token'] = localStorage.getItem('access-token');
  delete userData['password2'];
  return axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/auth/reset-password`, userData)
}

export const createHook = (accessToken, userData) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/hook/`, userData, {headers: {Authorization: `Bearer ${accessToken}`}})
}

export const getAllHooks = (accessToken) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/hook/`, {headers: {Authorization: `Bearer ${accessToken}`}})
    .then(r => r.data)
}

export default {
  authenticate,
  register,
  forgotPass,
  resetPass,
  createHook,
  getAllHooks,
}
