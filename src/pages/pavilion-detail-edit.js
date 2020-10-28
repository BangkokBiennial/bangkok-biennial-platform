import React from 'react'
import { compose } from 'recompose'
import Layout from '../utils/layout'
import {
  withAuthorization,
  withEmailVerification,
} from '../utils/Session'
import PavilionDetailRegister from '../components/scenes/PavilionRegistration/PavilionDetailRegister'

const condition = (authUser) => !!authUser
const PavilionDetailRegisterPage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(PavilionDetailRegister)

export default () => {
  return (
    <Layout>
      <PavilionDetailRegisterPage isPublic />
    </Layout>
  )
}
