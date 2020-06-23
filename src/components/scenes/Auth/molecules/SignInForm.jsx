import React, { Component } from 'react';

import { navigate } from 'gatsby';

import { withFirebase } from '../../../../utils/Firebase';
import { PAVILION_INFO_REGISTER, PAVILION_DETAIL_REGISTER, ACCOUNT } from '../../../../constants/routes';
import RegistrationStatus from '../../../../constants/routes';
import Input from '../../../atoms/Input';
import Button from '../../../atoms/Button';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  firebaseInit = () => {
    if (this.props.firebase && !this._initFirebase) {
      this._initFirebase = true;

      this.initialRequest();
    }
  };

  initialRequest = () => {};

  componentDidMount() {
    this.firebaseInit();
  }

  componentDidUpdate() {
    this.firebaseInit();
  }

  onSubmit = async event => {
    const { email, password } = this.state;
    try {
      const socialAuthUser = await this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
      const user = await this.props.firebase.user(socialAuthUser.user.uid)
      switch (user.registrationStatus) {
        case RegistrationStatus.FINISHED_BASIC:
          await navigate(PAVILION_DETAIL_REGISTER);
          break;
        case RegistrationStatus.FINISHED_ADVANCE:
          await navigate(ACCOUNT);
          break;
        default:
          await navigate(PAVILION_INFO_REGISTER);
      }
      await this.setState({ ...INITIAL_STATE });
    } catch (error) {
      this.setState({ error });
    }
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  testFirebase = () => {};

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <>
        <form onSubmit={this.onSubmit}>
          <Input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            labelName="Email"
            errors={error}
            required
          />

          <Input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            labelName="Password"
            className="input--no-margin"
            errors={error}
            required
          />

          <Button disabled={isInvalid} type="submit" text="Log in" />

          { error &&  <p style={{ color: '#FC0000' }}>{error.message}</p> }
        </form>
      </>
    );
  }
}

export default withFirebase(SignInForm);
