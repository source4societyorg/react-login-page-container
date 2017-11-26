import { select, call, put, takeLatest } from 'redux-saga/effects';
import { POST_LOGIN } from './constants';
import { loginPostError } from './actions';
import { loginPosted } from 'containers/App/actions';
import ApiInterface from 'utils/apiInterface';


export function* postLoginData(action) { 
  if(action.isValid) {
      try {             
        const result = yield call(apiInterface, action);
        if (!result.status) {
          throw result.error;
        }

        const jwt = result.results.jwt;  
        if(typeof jwt === 'undefined') {
            throw new Error('Auth failed.');
        }
        yield put(loginPosted(jwt));
      } catch (err) {    
        yield put(loginPostError(err));
      } 
  }
}

export default function* loginData() {
  yield takeLatest(POST_LOGIN, postLoginData);
}
