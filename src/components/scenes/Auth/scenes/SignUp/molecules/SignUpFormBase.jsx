import React, { Component } from 'react'
import { withFirebase } from '../../../../../../utils/Firebase'
import {
  PAVILION_INFO_REGISTER,
  REGISTRATION_STATUS,
} from '../../../../../../constants/routes'
import RegistrationStatus from '../../../../../../constants/registrationStatus'
import { navigate } from 'gatsby'
import Input from '../../../../../atoms/Input'
import Button from '../../../../../atoms/Button'
import Loading from '../../../../../atoms/Loading'

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
  loading: false,
}

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use'

const ERROR_MSG_ACCOUNT_EXISTS = `
    An account with this E-Mail address already exists.
    Try to login with this account instead. If you think the
    account is already used from one of the social logins, try
    to sign in with one of them. Afterward, associate your accounts
    on your personal account page.
  `

class SignUpFormBase extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = async (event) => {
    const { email, passwordOne } = this.state
    await this.setState({ loading: true })
    try {
      const socialAuthUser = await this.props.firebase.doCreateUserWithEmailAndPassword(
        email,
        passwordOne,
      )
      await this.props.firebase.user(socialAuthUser.user.uid).set({
        username: this.state.username,
        email: socialAuthUser.user.email,
        roles: 'user',
        registrationStatus: RegistrationStatus.NEW_USER,
      })
      await this.props.firebase.doSendEmailVerification()
      await this.setState({ ...INITIAL_STATE })
      await this.setState({ loading: false })

      // navigate(PAVILION_INFO_REGISTER);
      navigate(REGISTRATION_STATUS)

      event.preventDefault()
    } catch (error) {
      if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
        error.message = ERROR_MSG_ACCOUNT_EXISTS
      }
      console.log(error)

      await this.setState({ loading: false, error })
    }
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onChangeCheckbox = (event) => {
    this.setState({ [event.target.name]: event.target.checked })
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === ''

    return (
      <div>
        <Input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          required={true}
          labelName="Username"
        />

        <Input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          required={true}
          labelName="Email"
        />

        <Input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          required={true}
          labelName="Password"
        />

        <Input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          required={true}
          labelName="Confirm Password"
          className="input--no-margin"
        />

        <Button
          type="submit"
          disabled={isInvalid || this.state.loading}
          onClick={this.onSubmit}
          style={{ height: '60px' }}
        >
          {this.state.loading ? (
            <Loading
              size={24}
              containerStyle={{ marginTop: '-10px' }}
            />
          ) : (
            'sign up'
          )}
        </Button>

        {error && (
          <p class="register__form__error">{error.message}</p>
        )}
      </div>
    )
  }
}

export default withFirebase(SignUpFormBase)
