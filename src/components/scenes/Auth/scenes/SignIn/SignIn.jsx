import React, { Component } from 'react';

import SignInForm from '../../molecules/SignInForm';
import SignInGoogle from '../../molecules/SignInGoogle';
import SignInFacebook from '../../molecules/SignInFacebook';
import SignUpLink from '../../scenes/SignUp/atoms/SignUpLink';
import PasswordForgetLink from '../../../../molecules/PasswordForget/atoms/PasswordForgetLink';

class SignIn extends Component {
  render() {
    return (
      <div className="login">
        <div className="login__content">
          <div className="login__content__inner">
            <div className="login__content__header">
              <div className="login__content__header__title">
                Sign in to Bangkok Biennial Platform
              </div>
            </div>
            <div className="login__content__login-form">
              <div className="login__content__form">
                <SignInForm />
              </div>
              <div className="login__content__password-forget">
                <PasswordForgetLink />
              </div>
              <div className="login__content__or">
                <span className="login__content__or__line" />
                <span className="login__content__or__text">or</span>
                <span className="login__content__or__line" />
              </div>
              <div className="login__content__providers register__content__providers">
                  <SignInGoogle />
              </div>{' '}
              <div className="login__content__creator">
                <div className="login__content__creator__inner">
                  <p>This project is an opensource.</p>
                  <iframe
                    src="https://ghbtns.com/github-btn.html?user=BangkokBiennial&repo=bangkok-biennial-platform&type=star&count=true"
                    frameborder="0"
                    scrolling="0"
                    width="80px"
                    height="20px"
                  />
                </div>
              </div>
            </div>
            <div className="login__content__register">
              <SignUpLink isRegister />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
