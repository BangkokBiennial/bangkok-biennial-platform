'use strict'

module.exports = [
  {
    path: '/pavilion-detail', // the url of the page, example /post/post-slug
    collection: 'pavilion-public', // the name of the collection from firestore
    param: 'id', // the parameter from url, the equivalent of /post/:param
    context: ['title', 'description'], // the fields from the collection that will be requested at build time, then you can access the data from this.props.pageContext
    fileName: 'pavilion-detail', // the file from pages folder
  },
]
