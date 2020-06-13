import React from 'react';
import { Link } from 'gatsby';
import { LANDING, PAVILION_INFO_REGISTER, ACCOUNT } from '../../../../constants/routes';
import SignOutButton from './SignOutButton';

const NavigationAuth = () => (
  <div className="navbar">
    <div className="navbar__inner">
      <div className="navbar__left">
        <div className="navbar__links">
          <div className="navbar__link">
            <Link to={LANDING}>Landing</Link>
          </div>
          <div className="navbar__link">
            <Link to={PAVILION_INFO_REGISTER}>Register</Link>
          </div>
          <div className="navbar__link">
            <Link to={ACCOUNT}>Account</Link>
          </div>
        </div>
      </div>

      <div className="navbar__user">
        <div className="navbar__item">
          <SignOutButton />
        </div>
      </div>
    </div>
  </div>
);

export default NavigationAuth;
