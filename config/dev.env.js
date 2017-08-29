var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://qifuapi.thinkwit.com"',
  QINIU_CDN_URL: '"http://cdn-qifu.thinkwit.com"'
})
