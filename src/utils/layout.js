import React, { Component, Fragment } from 'react';
import { ToastProvider } from 'react-toast-notifications'


import Navigation from '../components/molecules/Navigation/Navigation';
import getFirebase, { FirebaseContext } from './Firebase';
import withAuthentication from './Session/withAuthentication';
import SEO from './SEO';
import '../styles/index.scss';

class Layout extends Component {
  state = {
    firebase: null,
  };

  componentDidMount() {
    const app = import('firebase/app');
    const auth = import('firebase/auth');
    const database = import('firebase/database');

    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0]);

      this.setState({ firebase });
    });
  }

  render() {
    return (
      <ToastProvider autoDismiss={true} autoDismissTimeout={3000}>
        <FirebaseContext.Provider value={this.state.firebase}>
          <AppWithAuthentication {...this.props} />
        </FirebaseContext.Provider>
      </ToastProvider>
      
    );
  }
}

const AppWithAuthentication = withAuthentication(
  ({ hideNav, seo, children }) => (
    <Fragment>
      <SEO {...seo} />
      {!hideNav && <Navigation />}
      {children}
    </Fragment>
  ),
);

export default Layout;
