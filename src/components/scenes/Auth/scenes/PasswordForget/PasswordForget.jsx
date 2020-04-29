import React, { Component } from 'react';
import PasswordForgetForm from '../../../../molecules/PasswordForget/PasswordForget';

class PasswordForget extends Component {
  render() {
    return (
      <div class="password-forget__container">
        <h1>PasswordForget</h1>
        <PasswordForgetForm />
      </div>
    );
  }
}

export default PasswordForget;
