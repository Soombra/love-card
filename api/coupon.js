const request = require('../utils/request')
const { hosts } = require('../config.js')

function getFriends() {
  return request.get(`${hosts.coupon}v1/self/friends`)
}
function addFriend (params) {
  return request.post(`${hosts.coupon}v1/friends`, { data: params})
}
function getSelf() {
  return request.get(`${hosts.coupon}v1/self`)
}

function giveCoupon(params) {
  return request.post(`${hosts.coupon}v1/gifts`, { data: params })
}

module.exports = {
  getFriends,
  addFriend,
  getSelf, 
  giveCoupon
}