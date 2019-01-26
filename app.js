//app.js
const {updateSelf} = require('./service/index.js')
App({
  onLaunch: function () {
    if(wx.getStorageInfoSync('token')){
      updateSelf()
    }
  },
  globalData: {
    userInfo: {}
  }
})