import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { LinkContainer, panelCSS } from 'styles/loginStyles';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import ContentHeader from 'components/ContentHeader';
import FormContainer from 'containers/FormContainer'; 
import Paragraph from 'components/Paragraph';
import Button from 'components/Button';
import Panel from 'components/Panel';

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {   
    return (
      <div>
          <ContentHeader text="Log In" />          
          <Paragraph text="Please enter your username and password." />
          <Panel title="Account Information" panelCSS={panelCSS}>
            <LoginForm />
            <LinkContainer>
                <Link to="/forgot-password">Forgot your username or password.</Link>
            </LinkContainer>
          </Panel>
          <Button label="Log In" />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });
const withConnect = connect(mapStateToProps);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage); 
