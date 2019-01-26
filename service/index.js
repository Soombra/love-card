const {getSelf} = require('../api/coupon.js')
function updateSelf () {
  const app = getApp()
  return getSelf().then(res => {
    wx.setStorageSync('userInfo', res.data)
  }).catch(err => {
    console.log(err)
    wx.setStorageSync('userInfo', {})
  })
}

module.exports = {
  updateSelf
}