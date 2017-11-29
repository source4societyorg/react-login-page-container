import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { LinkContainer, panelCSS } from 'styles/loginStyles';
import { postLogin } from './actions';
import { logoutUser } from 'containers/App/actions';
import { makeSelectFieldData, makeSelectLoginSuccessful, makeSelectLoginError } from './selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import ContentHeader from 'components/ContentHeader';
import FormContainer from 'containers/FormContainer'; 
import Paragraph from 'components/Paragraph';
import Panel from 'components/Panel';

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {    
    this.props.onMount();
  }

  componentWillReceiveProps(nextProps) {   
    if (true === nextProps.loginSuccessful) {       
      this.props.history.push('/')
    }
  }


  render() {   
    return (
      <div>
          <ContentHeader text="Log In" />          
          <Paragraph>Please enter your username and password.</Paragraph>
          <Panel title="Account Information" panelCSS={panelCSS}>
             <FormContainer
                id={this.props.id}
                labels={this.props.labels}
                fieldData={this.props.fieldData}
                validation={this.props.validation}
                callbackAction={this.props.submitCallback}
                submitLabel="Log In"
            />
            <LinkContainer>
                <Link to="/forgot-password">Forgot your username or password.</Link>
            </LinkContainer>
          </Panel>
      </div>
    );
  }
}

LoginPage.propTypes = {
  id: PropTypes.string,
  labels: PropTypes.array,
  fieldData: PropTypes.object,
  validation: PropTypes.array,
  submitCallback: PropTypes.func,
  loginSuccessful: PropTypes.bool,
  error: PropTypes.object,
};


LoginPage.defaultProps = {
  id: 'login_form',
  labels: ['Username', 'Password'],
  validation: [
    [
      {
        validationType: 'required',
        invalidMessage: 'Username is required',
      },
    ],
    [
      {
        validationType: 'required',
        invalidMessage: 'Password is required',
      },
    ],
  ],
};

export const mapDispatchToProps = (dispatch) => ({
  submitCallback: postLogin,
  onMount: (endpoint) => dispatch(logoutUser()),
});

const mapStateToProps = createStructuredSelector({
  fieldData: makeSelectFieldData(),
  loginSuccessful: makeSelectLoginSuccessful(),
  error: makeSelectLoginError(),
});

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage); 
