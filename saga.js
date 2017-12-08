import { select, call, put, takeLatest } from 'redux-saga/effects';
import { SUBMITTED_FORM } from 'containers/FormContainer/constants';
import { loginPostError } from './actions';
import { loginPosted } from 'containers/App/actions';
import ApiInterface from 'utils/apiInterface';

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

        if(action.formValues.getIn(['login_form','rememberMe','checked'],false)) {
            localStorage.setItem('jwt',jwt);
        }

        yield put(loginPosted(jwt));
      } catch (err) {                 
        yield put(loginPostError({message: err.message || 'An unexpected error', type: 'alert'}));
      } 
  }
}

export default function* loginData() {
  yield takeLatest(SUBMITTED_FORM, postLoginData);
}
