import React, { useState, useEffect } from 'react'

import SignInForm from '../../molecules/SignInForm'
import SignInGoogle from '../../molecules/SignInGoogle'
import { withFirebase } from '../../../../../utils/Firebase'
import SignUpLink from '../../scenes/SignUp/atoms/SignUpLink'
import PasswordForgetLink from '../../../../molecules/PasswordForget/atoms/PasswordForgetLink'
import Loading from '../../../../atoms/Loading'

const SignIn = ({ firebase }) => {
  const [_initFirebase, setInitFirebase] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (firebase && !_initFirebase) {
      setInitFirebase(true)
      setLoading(false)
    }
  }, [firebase])

  if (loading) {
    return (
      <div className="home container">
        <Loading />
      </div>
    )
  }

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
            <SignInGoogle firebase={firebase} />
          </div>{' '}
          <div className="login__content__creator">
            <div className="login__content__creator__inner">
              <p>This project is an opensource.</p>
              <iframe
                src="https://ghbtns.com/github-btn.html?user=BangkokBiennial&repo=bangkok-biennial-platform&type=star&count=true"
                frameBorder="0"
                scrolling="0"
                width="80px"
                height="20px"
              />
            </div>
          </div>
          {/* <div className="login__content__register">
            <SignUpLink isRegister />
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default withFirebase(SignIn)
