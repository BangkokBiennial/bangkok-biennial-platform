import React, { Component } from 'react';

import { navigate } from 'gatsby';

import { withFirebase } from '../../../../utils/Firebase';
import { 
  PAVILION_INFO_REGISTER, 
  PAVILION_DETAIL_REGISTER, 
  REGISTRATION_STATUS,
  ADMIN 
} from '../../../../constants/routes';
import RegistrationStatus from '../../../../constants/registrationStatus';
import Input from '../../../atoms/Input';
import Button from '../../../atoms/Button';
import Loading from '../../../atoms/Loading'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  loading: false
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
    this.setState({ loading: true })
    try {
      const socialAuthUser = await this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
      const userSnapshot = await this.props.firebase.getUser(socialAuthUser.user.uid)
      const user = userSnapshot.data()
      await this.setState({ ...INITIAL_STATE });
      await this.setState({ loading: false, error: null })
      if (user.roles === 'admin') {
        await navigate(ADMIN)
        return
      }

      switch (user.registrationStatus) {
        case RegistrationStatus.FINISHED_BASIC:
          // await navigate(PAVILION_DETAIL_REGISTER);
          await navigate(REGISTRATION_STATUS);
          break;
        case RegistrationStatus.FINISHED_ADVANCE:
          await navigate(REGISTRATION_STATUS);
          break;
        default:
          // await navigate(PAVILION_INFO_REGISTER);
          await navigate(REGISTRATION_STATUS);
      }
    } catch (error) {
      await this.setState({ error, loading: false });
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

    if (this.state.loading) {
      return(
        <div style={{ 
          backgroundColor: 'white', 
          width: '100%', 
          height: '100%',
          position: 'absolute',
          top: '0px',
          left: '0px',
          zIndex: 100
        }}>
          <Loading />
        </div>
      )
    }

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
