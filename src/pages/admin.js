import React from 'react'
import { compose } from 'recompose'
import Layout from '../utils/layout'
import AdminPanel from '../components/scenes/Admin/AdminPanel'
import { withAuthorization } from '../utils/Session'

const condition = (authUser) =>
  !!authUser && authUser.roles === 'admin'
const AdminPanelPage = compose(withAuthorization(condition))(
  AdminPanel,
)

export default () => (
  <Layout>
    <AdminPanelPage />
  </Layout>
)
