import React, { useState, useEffect } from 'react'
import { AuthUserContext } from '../../../utils/Session'

import NavigationAuth from './atoms/NavigationAuth'
import NavigationNonAuth from './atoms/NavigationNonAuth'
import NavigationMobileNonAuth from './atoms/NavigationMobileNonAuth'

const Navigation = () => {

  const [isMobile, setDesktop] = useState(window.innerWidth < 376);

  const updateMedia = () => {
    setDesktop(window.innerWidth < 376);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  
  return (
    <AuthUserContext.Consumer>
      {(authUser) =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          isMobile
            ? ( <NavigationMobileNonAuth/ >)
            : ( <NavigationNonAuth /> ) 
        )
      }
    </AuthUserContext.Consumer>
  )
}

export default Navigation
