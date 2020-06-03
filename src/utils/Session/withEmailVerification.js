import React, { useState, useEffect } from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import Button from '../../components/atoms/Button';
import Loading from '../../components/atoms/Loading';

const needsEmailVerification = authUser => {
  console.log(authUser)
  return authUser &&
    !authUser.emailVerified &&
    authUser.providerData
      .map(provider => provider.providerId)
      .includes('password');
}
  

const withEmailVerification = Component => {
  const WithEmailVerification = (props) => {

    const [isSent, setIsSent] = useState(false)

    const onSendEmailVerification = async () => {
      await props.firebase.doSendEmailVerification()
      setIsSent(true);
    };

    return (
      <AuthUserContext.Consumer>
        {authUser =>
          needsEmailVerification(authUser) ? (
            <div className="email-verification container">
              {isSent ? (
                <p>
                  E-Mail confirmation sent: Check you E-Mails (Spam
                  folder included) for a confirmation E-Mail.
                  Refresh this page once you confirmed your E-Mail.
                </p>
              ) : (
                <>
                  <p>
                    E-Mail confirmation sent: please Check you E-Mails (Spam folder
                    included) for a confirmation E-Mail or send another confirmation E-Mail.
                  </p>
                  <Button
                    type="button"
                    onClick={onSendEmailVerification}
                    disabled={isSent}
                  >
                    Send another confirmation E-Mail.
                  </Button>
                </>
              )}
            </div>
          ) : (
            <Component {...props} />
          )
        }
      </AuthUserContext.Consumer>
    );
  }

  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
