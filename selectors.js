/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectLoginPage = (state) => state.get('login');

const makeSelectIsValid = createSelector(
  selectLoginPage,
  (loginPageState) => loginPageState.get('isValid')
);

export {
  selectLoginPage,
  makeSelectIsValid,
};
