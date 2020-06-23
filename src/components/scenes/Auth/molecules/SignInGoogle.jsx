import React, { Component } from 'react';

import { navigate } from 'gatsby';

import { withFirebase } from '../../../../utils/Firebase';
import { PAVILION_INFO_REGISTER } from '../../../../constants/routes';
import RegistrationStatus from '../../../../constants/registrationStatus';

import { FaGoogle } from 'react-icons/fa';

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInGoogle extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        return this.props.firebase.user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            roles: 'user',
            registrationStatus: RegistrationStatus.NEW_USER
          });
      })
      .then(() => {
        this.setState({ error: null });
        navigate(PAVILION_INFO_REGISTER);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form
        className="login__content__providers__item login__content__providers__item--google"
        onSubmit={this.onSubmit}
      >
        <button type="submit">
          <FaGoogle />
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(SignInGoogle);
