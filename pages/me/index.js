//index.js
//获取应用实例
const {addFriend} = require('../../api/coupon.js')
const app = getApp()
const {updateSelf} = require('../../service/index.js')
const {login} = require('../../api/auth.js')

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inviter_id: ''
  },
  addFriend (){
    if(this.data.inviter_id){
      addFriend({friend_id: +this.data.inviter_id}).then(() => {
        console.log('添加成功')
      })
    }
  },
  bindViewTap () {
    wx.previewImage({
      urls: [this.data.userInfo.avatar]
    })
  },
  onLoad (options) {
    if (options.inviter_id) {
      this.setData({
        inviter_id: options.inviter_id
      })
    }
    if (wx.getStorageSync('userInfo').user_id){
      this.addFriend()
    }
  },
  onShow () {
    updateSelf().then(() => {
      this.syncUserInfo()
    })
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
    let {userInfo,iv,encryptedData} = e.detail
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
    let inviter_id = this.data.userInfo.user_id
    return {
      title: '一般人我不分享的，用力点',
      path: 'pages/me/index?inviter_id=' + inviter_id,
      imageUrl: ''
    }
  }
})