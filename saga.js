import { select, call, put, takeLatest } from 'redux-saga/effects';
import { SUBMITTED_FORM } from 'containers/FormContainer/constants';
import { LOGOUT_POSTED } from 'containers/App/constants';
import { loginPostError } from './actions';
import { loginPosted } from 'containers/App/actions';
import ApiInterface from 'utils/apiInterface';
import jwt_decode from 'jwt-decode';

const apiInterface = new ApiInterface();

export function* postLoginData(action) {
  if(action.isValid) {
      try {         
        let result = yield call([apiInterface, 'login'], action.formValues.getIn(['login_form', 'username', 'value'],''), action.formValues.getIn(['login_form', 'password','value'],''));  
 
        if(typeof result === 'string') {
            result = JSON.parse(result);
        } 
 
        if (typeof result === 'undefined' || typeof result.status === 'undefined' || result.status === false) {          
          throw new Error(result.errors.message);
        }

        const jwt = result.result.jwt;  
        if(typeof jwt === 'undefined') {
            throw new Error('Auth failed.');
        }        

        const jwtClaims = jwt_decode(jwt);      
        const userId = jwtClaims.userId || '';
        const username = jwtClaims.username || '';
        const expires = jwtClaims.expires || 0;
        const userRoles = jwtClaims.roles || [];

        const rememberMe = action.formValues.getIn(['login_form', 'rememberMe', 'checked']);
        if( rememberMe ) {
          localStorage.setItem('jwt', jwt);
          localStorage.setItem('username', username);
          localStorage.setItem('expires', expires);
          localStorage.setItem('userRoles', JSON.stringify(userRoles));
          localStorage.setItem('jwtClaims', JSON.stringify(jwtClaims));
        }

        yield put(loginPosted(jwt, userId, username, userRoles, expires, jwtClaims));
      } catch (err) { 
        console.log(err);
        yield put(loginPostError({message: err.message || 'An unexpected error', type: 'alert'}));
      } 
  }
}

export function* postLogoutEffects(action) {
    localStorage.clear();
}

export default function* loginData() {
  yield takeLatest(SUBMITTED_FORM, postLoginData);
  yield takeLatest(LOGOUT_POSTED, postLogoutEffects);
}
