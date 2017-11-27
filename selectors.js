import { createSelector } from 'reselect';

const selectLoginPage = (state) => state.get('loginPage');

const makeSelectFieldData = () => createSelector(
  selectLoginPage, 
  (formState) => formState.get('fieldData')
);

const makeSelectLoginSuccessful = () => createSelector(
  selectLoginPage,
  (formState) => formState.get('loginSuccessful')
);

const makeSelectLoginError = () => createSelector(
  selectLoginPage,
  (formState) => formState.get('error')
);

export {
  selectLoginPage,
  makeSelectLoginSuccessful,
  makeSelectFieldData,
  makeSelectLoginError,
};
