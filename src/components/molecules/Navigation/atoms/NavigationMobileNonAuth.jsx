import React, { useState } from 'react'
import { Link } from 'gatsby'
import { slide as Menu } from 'react-burger-menu'
import { LANDING, SIGN_IN } from '../../../../constants/routes'

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '30px',
    height: '30px',
    right: '16px',
    top: '16px'
  },
  bmBurgerBars: {
    background: '#000'
  },
  bmBurgerBarsHover: {
    background: ' #fc0000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#000'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%'
  },
  bmMenu: {
    background: '#fffffff5',
    padding: '2.5em 0em 0',
    fontSize: '2.15em',
    // borderRight: '5px solid #000'
  },
  bmMorphShape: {
    fill: '#000'
  },
  bmItemList: {
    padding: '0.8em',
    display: 'flex',
    flexDirection: 'column'
  },
  bmItem: {
    color: '#fc0000',
    marginTop: '12px',
    textDecoration: 'none',
    fontWeight: '800'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

const NavigationAuth = () => {

  return (
    <div className="navbar-mobile">
      <div className="navbar-mobile__inner">
        <div className="navbar-mobile__left">
          <div className="navbar__links">
            <div className="navbar__link">
              <Link to={LANDING}>
                <b>Bangkok Biennial</b>
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-mobile__right">
          <Menu right styles={styles}>
            <Link id="home" className="menu-item" to={LANDING}>Landing</Link>
            <Link id="about" className="menu-item" to={SIGN_IN}>Signin</Link>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default NavigationAuth
