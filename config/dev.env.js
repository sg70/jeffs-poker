'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FIREBASE_APIKEY: '"AI...io"',
  FIREBASE_DBURL: '"https://sg-testproject.firebaseio.com"',
  FIREBASE_PROJECT: '"sg-testproject"'
})
