import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

const delayForVisibility = ms => new Promise(res => setTimeout(res, ms));

class LoginView extends Component {
  static propTypes = {
    authenticate: PropTypes.func.isRequired
  };

  state = {
    isLoggingIn: true,
    redirectToReferrer: false,
    hasAuthenticationFailed: false
  };

  componentDidMount = () => {
    const { authenticate } = this.props;
    delayForVisibility(500)
      .then(authenticate)
      .then(() => {
        this.setState({ isLoggingIn: false, redirectToReferrer: true });
      })
      .catch(err => {
        console.log("LoginView - failed authentication path: ", err);
        this.setState({ isLoggingIn: false, hasAuthenticationFailed: true });
      });
  };

  render = () => {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    if (this.state.redirectToReferrer) return <Redirect to={from} />;
    if (this.state.isLoggingIn) return <div>Authenticating user..</div>;
    if (this.state.hasAuthenticationFailed)
      return (<div>Unauthorized - Authentication failed. Please refresh to try again.</div>);
    return <div>Loading...</div>;
  };
}

export default LoginView;
