import { fromJS } from 'immutable';

import {
  LOGIN_POSTED,
} from 'containers/App/constants';

import {
  LOGIN_POST_ERROR,
} from './constants';

const initialState = fromJS({
  fieldData: { 
    data: {
      username: { widget: 'text' },
      password: { widget: 'password' },
    }, 
    errors: [], 
    views: [] 
  },
  loginSuccessful: false,
  error: {},
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_POST_ERROR:
      return state
        .set('error', action.error)
    default:
      return state;
  }
}

export default loginPageReducer;
