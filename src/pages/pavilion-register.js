import React from 'react'
import { compose } from 'recompose'
import Layout from '../utils/layout'
import {
  withAuthorization,
  withEmailVerification,
} from '../utils/Session'
import PavilionInfoRegister from '../components/scenes/PavilionRegistration/PavilionInfoRegister'

const condition = (authUser) => !!authUser
const PavilionInfoRegisterPage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(PavilionInfoRegister)

export default () => {
  return (
    <Layout>
      <PavilionInfoRegisterPage />
    </Layout>
  )
}
