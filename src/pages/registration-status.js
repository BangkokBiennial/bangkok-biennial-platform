import React from 'react'
import { compose } from 'recompose'
import Layout from '../utils/layout'
import {
  withAuthorization,
  withEmailVerification,
} from '../utils/Session'
import PavilionRegistrationStatus from '../components/scenes/PavilionRegistration/PavilionRegistrationStatus'

const condition = (authUser) => !!authUser
const PavilionRegistrationStatusPage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(PavilionRegistrationStatus)

export default () => {
  return (
    <Layout>
      <PavilionRegistrationStatusPage />
    </Layout>
  )
}
