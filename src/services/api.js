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

export default {
  authenticate,
  register
}