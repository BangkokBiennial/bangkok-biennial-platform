import React from 'react';
import SignUpFormBase from './molecules/SignUpFormBase';
import SignInGoogle from '../../molecules/SignInGoogle';
import SignInFacebook from '../../molecules/SignInFacebook';
import SignUpLink from '../../scenes/SignUp/atoms/SignUpLink';

const SignUp = () => {
  return (
    <div className="register">
      <div className="register__content">
        <div className="register__content__inner">
          <div className="register__content__header">
            <div className="register__content__header__title">
              Sign up to join Bangkok Biennial Pavilion
            </div>
          </div>
          <div className="register__content__fields">
            <div className="register__content__form">
              <SignUpFormBase />
            </div>
            <div className="register__content__or">
              <span className="register__content__or__line" />
              <span className="register__content__or__text">
                or
              </span>
              <span className="register__content__or__line" />
            </div>
            <div className="register__content__providers">
              <SignInGoogle />
              <SignInFacebook />
            </div>
          </div>
          <div className="register__content__register">
            <SignUpLink />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
