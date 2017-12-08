import {
  POST_LOGIN,
  LOGIN_POST_ERROR,
} from './constants';

export function loginPostError(error) {
  return {
    type: LOGIN_POST_ERROR,
    error
  };
}

export function postLogin(isValid, formValues) {
  return {
    type: POST_LOGIN,
    isValid,
    formValues
  };
}

