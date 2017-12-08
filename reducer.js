import { fromJS } from 'immutable';

import {
  LOGIN_POSTED,
} from 'containers/App/constants';

import {
  CHANGE_FIELD,
} from 'containers/FormContainer/constants';

import {
  LOGIN_POST_ERROR,
} from './constants';

const initialState = fromJS({
  fieldData: { 
    data: {
      username: { widget: 'text', },
      password: { widget: 'password', },
      rememberMe: { widget: 'checkbox', layout: 'inline-block', },
    }, 
    errors: [], 
    views: [], 
  },
  error: {},
  loginSuccessful: false,
  submitEnabled: true,
  rememberMe: false,
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_POSTED:     
      return state
        .set('loginSuccessful', typeof action.jwt !== 'undefined' && action.jwt !== null)
    case CHANGE_FIELD:
      return state
        .set('error', initialState.get('error'))
    case LOGIN_POST_ERROR:         
      return state
        .set('error', fromJS(action.error))
    default:
      return state;
  }
}

export default loginPageReducer;
