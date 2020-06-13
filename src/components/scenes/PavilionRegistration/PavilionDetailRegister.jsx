import React from 'react'
import { withFirebase } from '../../../utils/Firebase';

const PavilionDetailRegister = () => {

  return (
    <div class="home container">
      <div className="home__details">
        <h1 className="home__title">More detail on Pavilion Registration</h1>
      </div>
    </div>
  )
}

export default withFirebase(PavilionDetailRegister)