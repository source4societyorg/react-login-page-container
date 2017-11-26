import { fromJS } from 'immutable';

import {
  LOGIN_POSTED,
} from 'containers/App/constants';

const initialState = fromJS({
  fieldData: { data: {}, errors: [], views: [] },
  formValues: {},
  isValid: false,
  error: {},
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_POST_ERROR:
      return state
        .set('error', action.error)
    case LOGIN_POSTED:     
      return state
        .set('loginSuccessful', true)   
    default:
      return state;
  }
}

export default loginPageReducer;
