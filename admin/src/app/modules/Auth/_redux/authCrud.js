import axios from "axios";
import {API_URL} from '../../../pages/constants.js';

export const LOGIN_URL = API_URL + "auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = API_URL + "user/me";

export function login(username, password, client = 'admin') {
  return axios.post(LOGIN_URL, { username, password, client });
}

export function requestPassword(username) {
  return axios.post(REQUEST_PASSWORD_URL, { username });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
