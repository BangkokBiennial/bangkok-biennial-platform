import React from 'react'
import Layout from '../utils/layout'
import PavilionDetail from '../components/scenes/PavilionDetail/PavilionDetail'

export default (props) => {
  return (
    <Layout>
      <PavilionDetail {...props} />
    </Layout>
  )
}
