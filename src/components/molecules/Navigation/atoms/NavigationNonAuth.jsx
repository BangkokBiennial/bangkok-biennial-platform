import React from 'react'
import { Link } from 'gatsby'
import {
  LANDING,
  SIGN_IN,
  SIGN_UP,
} from '../../../../constants/routes'

const NavigationNonAuth = () => (
  <div className="navbar">
    <div className="navbar__inner">
      <div className="navbar__left">
        <div className="navbar__links">
          <div className="navbar__link">
            <Link to={LANDING}>
              <b>Bangkok Biennial</b>
            </Link>
          </div>
        </div>
      </div>

      <div className="navbar__right">
        <div className="navbar__links">
          <div className="navbar__link">
            <Link to={SIGN_IN}>Sign in</Link>
          </div>
          {/* <div className="navbar__link">
            <Link to={SIGN_UP}>Sign up</Link>
          </div> */}
        </div>
      </div>
    </div>
  </div>
)

export default NavigationNonAuth
