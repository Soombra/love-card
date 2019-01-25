//index.js
//获取应用实例
const app = getApp()
const {
  login
} = require('../../api/auth.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inviter_id: ''
  },

  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    let {
      userInfo,
      iv,
      encryptedData
    } = e.detail
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.login({
      success: (res) => {
        if (res.code) {
          let params = {
            username: encryptedData,
            password: iv,
            auth_approach: 'wxapp',
            code: res.code
          }
          if (this.data.inviter_id) {
            params.inviter_id = this.data.inviter_id
          }
          login(params).then((res) => {
            wx.setStorageSync('token', res.data.access_token)
            wx.setStorageSync('id', res.data.user_id)
          }).catch((err) => {
            console.log('请求失败', err)
          })
        }
      }
    })
  },
  onShareAppMessage() {
    let inviter_id = wx.getStorageSync('id')
    return {
      title: '一般人我不分享的，用力点',
      path: 'pages/index/index?inviter_id=' + inviter_id,
      imageUrl: ''
    }
  }
})