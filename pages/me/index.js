//index.js
//获取应用实例
const {addFriend} = require('../../api/coupon.js')
const app = getApp()
const {updateSelf} = require('../../service/index.js')
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
  addFriend (){
    if(this.data.inviter_id){
      addFriend({friend_id: this.data.inviter_id}).then(() => {
        console.log('添加成功')
      })
    }
  },
  onLoad (options) {
    console.log('打印id', options.inviter_id)
    if (options.inviter_id) {
      this.setData({
        inviter_id: options.inviter_id
      })
    }
    if (app.globalData.isLogin){
      this.addFriend()
    }
  },
  onShow () {
    this.syncUserInfo()
  },
  syncUserInfo() {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo && userInfo.user_id) {
      this.setData({
        hasUserInfo: true,
        userInfo: userInfo
      })
    }
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
            updateSelf().then(() => {
              this.syncUserInfo()
            })
            this.addFriend()
          }).catch((err) => {
            console.log('请求失败', err)
          })
        }
      }
    })
  },
  onShareAppMessage() {
    let inviter_id = wx.getStorageSync('id')
    console.log('转发参数', inviter_id)
    return {
      title: '一般人我不分享的，用力点',
      path: 'pages/me/index?inviter_id=' + inviter_id,
      imageUrl: ''
    }
  }
})