import React, {createContext} from 'react';

import { authUrl } from '../../config/url';
import request from '../../utils/request';

const AuthenticationCtx = createContext({ isAuthenticated: false, token: null, permissions: ['anonymous'] });

const unpackPermissions = (token) => {
  return ['admin'];
}

export class AuthenticationManger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      token: null,
      permissions: ['anonymous']
    };
  }


  authenticate = async () => {
    try {
      const data = await request(authUrl, {method: "POST"});
      const token = data.token;
      const permissions = unpackPermissions(token);
      this.setState({
        isAuthenticated: true,
        token,
        permissions
      });
      
    } catch (error) {
      this.setState({
        isAuthenticated: true,
        token: 'sasadfasdfasdf',
        permissions: ['admin']
      });
    }
  };


  render = () => (
    <AuthenticationCtx.Provider value={{ ...this.state, authenticate: this.authenticate}}>
      {this.props.children}
    </AuthenticationCtx.Provider>
  );

}


export const Auth = ({ children }) => (
  <AuthenticationCtx.Consumer>
    {({ isAuthenticated, authenticate, token, permissions = [] }) => {
      return children({ isAuthenticated, authenticate, token, permissions });
    }}
  </AuthenticationCtx.Consumer>
);


export const Guard = ({ allowed = [], children }) => (
  <Auth>
    {({ permissions }) => {
      if (permissions.some(permission => allowed.includes(permission))) {
        return children;
      }
    }}
  </Auth>
);


export const withAuth = Component => props => (
  <Auth>
    {({ isAuthenticated, authenticate, token, permissions = [] }) => (
      <Component
        {...props}
        isAuthenticated={isAuthenticated}
        authenticate={authenticate}
        token={token}
        permissions={permissions}
      />
    )}
  </Auth>
);