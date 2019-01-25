const request = require('../utils/request')
const {hosts} = require('../config.js')

function login ({code, ...params}) {
  return request.post(`${hosts.auth}v1/oauth/jwt?code=${code}`, {data: params})
}

module.exports = {
  login
}