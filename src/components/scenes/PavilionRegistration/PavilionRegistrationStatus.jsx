import React, { useEffect, useState } from 'react'
import { withFirebase } from '../../../utils/Firebase'
import { useToasts } from 'react-toast-notifications'
import Loading from '../../atoms/Loading'
import ClipLoader from 'react-spinners/ClipLoader'
import RegistrationStatus from '../../../constants/registrationStatus'
import { navigate } from 'gatsby'
import CheckBox from '../../atoms/CheckBox'
import Button from '../../atoms/Button'
import {
  PAVILION_INFO_REGISTER,
  PAVILION_DETAIL_REGISTER,
  REGISTRATION_STATUS,
} from '../../../constants/routes'

const PavilionRegistrationStatus = ({ firebase }) => {
  const { addToast } = useToasts()

  const [_initFirebase, setInitFirebase] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})
  const [bbTakePlaced, setBbTakePlaced] = useState([])
  const [loadSending, setLoadSending] = useState(false)
  const [allowedToSubmit, setAllowedToSubmit] = useState(true)

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
          const userSnapshot = await firebase.getUser(
            firebase.getCurrentUserId(),
          )
          const userData = userSnapshot.data()
          if (userData.dateLaunch) {
            setBbTakePlaced(userData.dateLaunch)
            setAllowedToSubmit(false)
          }
          await setUser(userData)
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
        navigate(PAVILION_DETAIL_REGISTER)
        break
      default:
        navigate(PAVILION_INFO_REGISTER)
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
        return '2/3 - you finished the basic information. please wait for the next registration.'
      case RegistrationStatus.FINISHED_ADVANCE:
        return '3/3 - wait for the approval to go public.'
      default:
        return '1/3 - please wait for the next registration.'
    }
  }

  const dateLaunch = {
    OCT31_TO_NOV21_2020: 'OCT31_TO_NOV21_2020',
    MAR13_TO_APR3_2021: 'MAR13_TO_APR3_2021',
    SEP17_TO_OCT9_2021: 'SEP17_TO_OCT9_2021',
    NONE_OF_THE_ABOVE: 'NONE_OF_THE_ABOVE',
  }

  const isChecked = (date) => bbTakePlaced.find((el) => el === date)
  const toggle = (date) => {
    isChecked(date)
      ? setBbTakePlaced(bbTakePlaced.filter((el) => el !== date))
      : setBbTakePlaced([...bbTakePlaced, date])
  }

  const onSubmit = async () => {
    setLoadSending(true)

    try {
      await firebase.updateUser(firebase.getCurrentUserId(), {
        dateLaunch: bbTakePlaced,
      })
      setLoadSending(false)
      setAllowedToSubmit(false)
      addToast('Thank you! the information is saved successfully.', {
        appearance: 'success',
      })
    } catch (error) {
      setLoadSending(false)
      await addToast(`${error.message}`, {
        appearance: 'error',
        autoDismiss: false,
      })
    }
  }

  const renderCheckDateBox = () => (
    <>
      <p>
        In which period(s) of BB2020 will your Pavilion take place?
        select all that apply
      </p>
      <CheckBox
        disabled={!allowedToSubmit}
        onClick={() => toggle(dateLaunch.OCT31_TO_NOV21_2020)}
        value={isChecked(dateLaunch.OCT31_TO_NOV21_2020)}
        staticLabel="Oct 31st-Nov 21st 2020"
      />
      <CheckBox
        disabled={!allowedToSubmit}
        onClick={() => toggle(dateLaunch.MAR13_TO_APR3_2021)}
        value={isChecked(dateLaunch.MAR13_TO_APR3_2021)}
        staticLabel="March 13th-April 3rd 2021"
      />
      <CheckBox
        disabled={!allowedToSubmit}
        onClick={() => toggle(dateLaunch.SEP17_TO_OCT9_2021)}
        value={isChecked(dateLaunch.SEP17_TO_OCT9_2021)}
        staticLabel="Sept 17th-Oct 9th  2021"
      />
      <CheckBox
        disabled={!allowedToSubmit}
        onClick={() => toggle(dateLaunch.NONE_OF_THE_ABOVE)}
        value={isChecked(dateLaunch.NONE_OF_THE_ABOVE)}
        staticLabel="none of the above"
      />
      <Button disabled={!allowedToSubmit} onClick={onSubmit}>
        submit
      </Button>
    </>
  )

  return (
    <div className="home container">
      <div className="home__details">
        <h1 className="home__title">Registration Status</h1>
      </div>

      <div className="home__details">
        <h2 className="home__title">
          Status of Pavilion Registration:{' '}
        </h2>
        <h4> {getStatus(user.registrationStatus)} </h4>
      </div>
      {user.registrationStatus !==
        RegistrationStatus.FINISHED_ADVANCE && (
        <Button
          style={{ width: '200px', float: 'left' }}
          onClick={handleOnClick}
          text="Register"
        />
      )}
      {user.registrationStatus ===
        RegistrationStatus.FINISHED_ADVANCE && (
        <div className="pavilion-registration-status__waiting-for-approval">
          <p className="pavilion-registration-status__cautious-text">
            May I have your attention, please ?
          </p>
          <div className="pavilion-registration-status__date-box">
            {loadSending ? (
              <div
                style={{
                  position: 'relative',
                  left: 'calc(50% - 17.5px)',
                }}
              >
                <ClipLoader />
              </div>
            ) : (
              renderCheckDateBox()
            )}
          </div>

          <p className="pavilion-registration-status__waiting-for-approval__text">
            Ok! Now you have finished the process of registering your
            Pavilion for BB2020 (Bangkok Biennial 2020). What happens
            next:
          </p>
          <ul>
            <li>
              The information and materials you have submitted must be
              validated. This will happen as quickly as we are able to
              process it.
            </li>
            <li>
              The information you submitted on the ‘Basic Info’
              section will be made public
            </li>
            <li>
              a page will be created for your pavilion on the BB2020
              website. You will be able to edit the information and
              materials on this page once it becomes available. There
              will be a period that you will have access to the page
              before it is launched to the public. And even after it
              is launched to the public, you will still be able to
              edit it.
            </li>
          </ul>
          <p className="pavilion-registration-status__waiting-for-approval__text">
            If you have any questions/concerns/thoughts/jokes please
            contact us at bbteam@bangkokbiennial.com . If you need a
            confirmation letter from us for funding applications of
            visa applications or anything like that, please also let
            us know through the same email address.
          </p>
        </div>
      )}
    </div>
  )
}

export default withFirebase(PavilionRegistrationStatus)
