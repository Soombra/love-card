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

function createCoupon(params) {
  return request.post(`${hosts.coupon}v1/gifts`, { data: params })
}

function getSelfOffers() {
  return request.get(`${hosts.coupon}v1/self/offers`)
}

function getSelfGifts() {
  return request.get(`${hosts.coupon}v1/self/gifts`)
}

module.exports = {
  getFriends,
  addFriend,
  getSelf, 
  createCoupon,
  getSelfOffers,
  getSelfGifts
}