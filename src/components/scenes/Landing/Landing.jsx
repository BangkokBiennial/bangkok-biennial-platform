import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { SIGN_UP } from '../../../constants/routes';
import { CursorProvider } from '../../../utils/withCursor'
import { withFirebase } from '../../../utils/Firebase';
import Loading from '../../atoms/Loading'

const Landing = ({ firebase }) => {

  const [_initFirebase, setInitFirebase] = useState(false)
  const [loading, setLoading] = useState(true);
  const [pendingPavilions, setPendingPavilions] = useState([]);

  useEffect(() => {
    if (firebase && !_initFirebase) {
      setInitFirebase(true)
      setLoading(false)
    }
  }, [firebase])

  useEffect(() => {
    if (firebase) {
      const fetch = async () => {
        setLoading(true)
        try {
          const basicInfoSnapshot = await firebase.getPavilionBasicInfo();
          const basicInfoData = basicInfoSnapshot.docs.map(b => b.data())
          setPendingPavilions(basicInfoData)
          console.log(basicInfoData)
          setLoading(false)
        } catch (err) {
          setLoading(false)
          console.log(err)
        } 
      }
      fetch()
    }

  }, [firebase])

  if (loading) {
    return (
      <div className="home container">
         <Loading />
      </div>
    )
  }

  return (
    <CursorProvider>
      <div className="landing__container">
        <h2 className="landing__title__main"> BANGKOK BIENNAL </h2>
        <h4 className="landing__title__secondary">Platform</h4>
        <p className="landing__text-content">
          Welcome to Bangkok Biennial 2020’s Pavilion Platform! This is where 
          you register a pavilion to be part of “BB2020”. 
          There are a few steps in the process of registering and you will need to prepare 
          a variety of information so please read all the instructions carefully. 
          Please review this complete list of materials you need to prepare: 
          <a target="_blank" href={'https://www.bangkokbiennial.com/registration'}> REGISTRATION REQUIREMENTS LINK. </a>
          There are 3 initial stages to register your pavilion:
          <ul>
            <li> 1. create an account for your pavilion (on this page). </li>
            <li> 2. fill out the basic information on the next page and submit it to us </li>
            <li> 3. complete the full information on the last page (this third step can be saved and edited up until you press “submit” </li>
          </ul>
          Ready to join BB2020? <Link to={SIGN_UP}> Create an account here </Link>
        </p>
        <h5 className="landing__list-pavilion__title">List of the pending pavilion</h5>
        <div className="landing__list-pavilion__container">
        {
          pendingPavilions.map(pp => (
            <div className="landing__list-pavilion__component">
              <p className="landing__list-pavilion__topic"> Pavilion Name </p>
              <p className="landing__list-pavilion__text">{pp.pavilionName}</p>
              <p className="landing__list-pavilion__topic"> Pavilion Brief Description </p>
              <p className="landing__list-pavilion__text">{pp.pavilionBriefDescription}</p>
              <p className="landing__list-pavilion__topic"> List Of Artists And Curators </p>
              <p className="landing__list-pavilion__text">{pp.listOfArtistsAndCurators}</p>
            </div>
          ))
        }
        </div>
      </div>
    </CursorProvider>
  );
}

export default withFirebase(Landing);
