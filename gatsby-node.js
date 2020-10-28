const path = require('path')
const firebase = require('firebase')
const config = require('./firebaseConfig')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const PavilionDetail = path.resolve(
    './src/templates/pavilion-detail.js',
  )
  createPage({
    path: '/pavilion-detail/:id',
    matchPath: '/pavilion-detail/:id',
    component: PavilionDetail,
  })
}
