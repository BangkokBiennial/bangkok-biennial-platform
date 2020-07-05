import React, { Component } from 'react';
import { Link } from 'gatsby';
import { SIGN_UP } from '../../../constants/routes';

class Landing extends Component {
  render() {
    return (
      <div className="landing__container">
        <h1 className="landing__title__main"> Bangkok Biennial 2020</h1>
        <h2 className="landing__title__secondary">The Platform</h2>
        <p className="landing__text-content">
          Welcome to Bangkok Biennial 2020’s Pavilion Platform! This is where 
          you register a pavilion to be part of “BB2020”. 
          There are a few steps in the process of registering and you will need to prepare 
          a variety of information so please read all the instructions carefully. 
          Please review this complete list of materials you need to prepare: 
          <a href={'https://www.bangkokbiennial.com/registration'}> REGISTRATION REQUIREMENTS LINK. </a>
          There are 3 initial stages to register your pavilion:
          <ul>
            <li> 1. create an account for your pavilion (on this page). </li>
            <li> 2. fill out the basic information on the next page and submit it to us </li>
            <li> 3. complete the full information on the last page (this third step can be saved and edited up until you press “submit” </li>
          </ul>
          Ready to join BB2020? <Link to={SIGN_UP}> Create an account here </Link>
        </p>
      </div>
    );
  }
}

export default Landing;
