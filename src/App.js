import React from 'react';
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";

import { Navigation } from './components/Navigation/Navigation';
import { AdminView } from './views/AdminView';
import { DetailsView } from './views/DetailsView';
import LoginView  from './views/LoginView';
import { HomeView } from './views/HomeView';

import { AuthenticationManger, withAuth } from './components/Authentication/Authentication';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'


function App() {
  return (
    <BrowserRouter>
      <AuthenticationManger>
   ..   <Navigation />

        <Switch>
          <Route exact path="/login"  component={withAuth(LoginView)} />
          <Route exact path="/"  component={HomeView} />
          <PrivateRoute path="/admin"  permissions={['admin']} component={AdminView} />
          <PrivateRoute path="/details"  permissions={['admin']} component={DetailsView} />
          <Redirect from="*" to="/" />
        </Switch>

        </AuthenticationManger>
    </BrowserRouter>
   
  );
}

export default App;
