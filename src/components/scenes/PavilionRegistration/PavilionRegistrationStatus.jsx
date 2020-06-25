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
    </div>
  )
}

export default withFirebase(PavilionRegistrationStatus)