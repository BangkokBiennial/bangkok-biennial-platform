import React, { useState, useEffect } from 'react'
import { navigate, Link } from 'gatsby'
import { withFirebase } from '../../../utils/Firebase'
import Loading from '../../atoms/Loading'
import { useToasts } from 'react-toast-notifications'
import { transformToPublicThumbnails } from '../../../utils/transform'
import { SIGN_UP } from "../../../constants/routes"
import DateLaunch from "../../../constants/dateLaunch"

const Landing = ({ firebase }) => {
  const { addToast } = useToasts()

  const [_initFirebase, setInitFirebase] = useState(false)
  const [loading, setLoading] = useState(true)
  const [
    publicPavilionThumbnails,
    setPublicPavilionThumbnails,
  ] = useState([])

  const fetchPublicPavilion = async () => {
    setLoading(true)
    try {
      const publicPavilionSnapshot = await firebase.getPavilionPublicInfo()
      const publicPavilionData = publicPavilionSnapshot.docs.map(
        (b) => b.data(),
      )
      const pavilionUsersData = await Promise.all(
        publicPavilionData.map(async ppd => {
          const userSnapshot = await firebase.getUser(ppd.id)
          const user = userSnapshot.data()
          return {
            ...ppd,
            user
          }
        })
      )

      const pavilionThumbnails = transformToPublicThumbnails(
        pavilionUsersData,
      )

      setPublicPavilionThumbnails(pavilionThumbnails)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      addToast(`${error.message}`, {
        appearance: 'error',
        autoDismiss: false,
      })
    }
  }

  useEffect(() => {
    if (firebase && !_initFirebase) {
      setInitFirebase(true)
      setLoading(false)
    }
  }, [firebase])

  useEffect(() => {
    if (firebase) {
      fetchPublicPavilion()
    }
  }, [firebase])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="landing__container">
      <div className="landing__header">
        <div className="landing__title__main-wrapper">
          <h2 className="landing__title__main"> BANGKOK </h2>
          <h2 className="landing__title__main"> BIENNIAL </h2>
        </div>
        <div>
          <p className="landing__title__welcome">
            {' '}
            Welcome to Bangkok Biennial 2020’s Pavilion Platform!
          </p>
        </div>
      </div>
      <div className="landing__text-content">
        Welcome to Bangkok Biennial 2020’s Pavilion Platform! This
        is where you register a pavilion to be part of “BB2020”.
        There are a few steps in the process of registering and you
        will need to prepare a variety of information so please read
        all the instructions carefully. Please review this complete
        list of materials you need to prepare:
        <a
          target="_blank"
          href={'https://www.bangkokbiennial.com/registration'}
        >
          {' '}
          REGISTRATION REQUIREMENTS LINK.{' '}
        </a>
        There are 3 initial stages to register your pavilion:
        <ul>
          <li>
            {' '}
            1. create an account for your pavilion (on this page).{' '}
          </li>
          <li>
            {' '}
            2. fill out the basic information on the next page and
            submit it to us{' '}
          </li>
          <li>
            {' '}
            3. complete the full information on the last page (this
            third step can be saved and edited up until you press
            “submit”{' '}
          </li>
        </ul>
        Ready to join BB2020?{' '}
        <Link to={SIGN_UP}> Create an account here </Link>
      </div>

      <h5 className="landing__list-pavilion__title">
        BB2020 2<sup>st</sup> phase pavilions (Mar 13<sup>th</sup> -
        Apr 3<sup>rd</sup>, 2020)
      </h5>
      <h6 className="landing__list-pavilion__subtitle">
        3<sup>rd</sup> phase pavilions to follow
        Sept. 17<sup>th</sup> - Oct 9<sup>th</sup>, 2021
      </h6>
      <div className="landing__list-pavilion__container">
        {publicPavilionThumbnails.filter(pt => pt.user.dateLaunch.includes(DateLaunch.MAR13_TO_APR3_2021)).map((pt) => (
          <div
            onClick={() => navigate(`/pavilion-detail/${pt.id}`)}
            className="landing__thumbnail__component"
          >
            <p className="landing__thumbnail__topic"> {pt.name}</p>
            <p className="landing__thumbnail__content">
              {' '}
              {pt.description}
            </p>
          </div>
        ))}
      </div>

      <h5 className="landing__list-pavilion__title">
        BB2020 1<sup>st</sup> phase pavilions (Oct 31<sup>st</sup> -
        Nov 21<sup>st</sup>, 2020)
      </h5>
      <div className="landing__list-pavilion__container">
        {publicPavilionThumbnails.filter(pt => pt.user.dateLaunch.includes(DateLaunch.OCT31_TO_NOV21_2020)).map((pt) => (
          <div
            onClick={() => navigate(`/pavilion-detail/${pt.id}`)}
            className="landing__thumbnail__component"
          >
            <p className="landing__thumbnail__topic"> {pt.name}</p>
            <p className="landing__thumbnail__content">
              {' '}
              {pt.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default withFirebase(Landing)
