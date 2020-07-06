import React, { useEffect, useState } from 'react';
import { withFirebase } from '../../../utils/Firebase'
import Loading from '../../atoms/Loading'
import RegistrationStatus from '../../../constants/registrationStatus'
import { navigate } from 'gatsby';
import Button from '../../atoms/Button';
import { PAVILION_INFO_REGISTER, PAVILION_DETAIL_REGISTER, REGISTRATION_STATUS } from '../../../constants/routes';

const PavilionRegistrationStatus = ({ firebase }) => {
  const [_initFirebase, setInitFirebase] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})

  useEffect(() => {
    if (firebase && !_initFirebase) {
      setInitFirebase(true)
    }
  }, [firebase])

  useEffect(() => {
    if (firebase && firebase.auth && firebase.auth.currentUser) {
      const fetch = async () => {
        setLoading(true)
        try {
          const userSnapshot = await firebase.getUser(firebase.getCurrentUserId())
          const user = userSnapshot.data()
          await setUser(user)
          setLoading(false)
        } catch (error) {
          console.log(error)
          setLoading(false)
        }
      }

      fetch()
    }
  }, [firebase && firebase.auth && firebase.auth.currentUser])

  const handleOnClick = () => {
    switch (user.registrationStatus) {
      case RegistrationStatus.FINISHED_BASIC:
        navigate(PAVILION_DETAIL_REGISTER);
        break;
      default:
        navigate(PAVILION_INFO_REGISTER);
    }
  }

  if (loading) {
    return (
      <div className="home container">
         <Loading />
      </div>
    )
  }

  const getStatus = (status) => {
    switch (status) {
      case RegistrationStatus.FINISHED_BASIC:
        return '2/3 - you finished the basic information, please click the button below to proceed the second part'
      case RegistrationStatus.FINISHED_ADVANCE:
        return '3/3 - wait for the approval to go public'
      default:
        return '1/3 - please click the button below to proceed the registration'
    }
  }

  return(
    <div className="home container">
      <div className="home__details">
        <h1 className="home__title">Registration Status</h1>
      </div>

      <div className="home__details">
        <h2 className="home__title">Status of Pavilion Registration: </h2>
        <h4> { getStatus(user.registrationStatus)} </h4>
      </div>
      { user.registrationStatus !== RegistrationStatus.FINISHED_ADVANCE 
          && <Button style={{ width: '200px', float: 'left' }} onClick={handleOnClick} text="Register" />}
      {
        user.registrationStatus === RegistrationStatus.FINISHED_ADVANCE
          && (
            <div className="pavilion-registration-status__waiting-for-approval">
              <p className="pavilion-registration-status__waiting-for-approval__text">
                Ok! Now you have finished the process of registering your 
                Pavilion for BB2020 (Bangkok Biennial 2020). What happens next:
              </p>
              <ul>
                <li>
                  The information and materials you have submitted must be validated. 
                  This will happen as quickly as we are able to process it.
                </li>
                <li>
                  The information you submitted on the ‘Basic Info’ section will be made public
                </li>
                <li>
                  a page will be created for your pavilion on the BB2020 website. 
                  You will be able to edit the information and materials on this page 
                  once it becomes available. There will be a period that 
                  you will have access to the page before it is launched to the public. 
                  And even after it is launched to the public, you will still be able to edit it.
                </li>
              </ul>
              <p className="pavilion-registration-status__waiting-for-approval__text">
                If you have any questions/concerns/thoughts/jokes please contact us 
                at bbteam@bangkokbiennial.com . If you need a confirmation letter from us 
                for funding applications of visa applications or anything like that,
                 please also let us know through the same email address.
              </p>
            </div>
          )
      }

    </div>
  )
}

export default withFirebase(PavilionRegistrationStatus)