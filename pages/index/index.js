const {getFriends} = require('../../api/coupon.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // friends: [{
    //   avatar: 'https://medias.zaih.com/Fr7M0DUo3zxkdqLd1q1jL38GPqpf',
    //   nickname: '测试名字1'
    // }, {
    //   avatar: 'https://medias.zaih.com/4798cefa5994a22b4a60a9013c4d_670x320.png',
    //   nickname: '测试名字2'
    // }, {
    //   avatar: 'https://medias.zaih.com/7e9d918043f757fed321c822b879_1080x1920.png',
    //   nickname: '测试名字3'
    // }, {
    //   avatar: 'https://medias.zaih.com/FqO7StTDdrZ0eRi8Q9nAIc6OMRfg',
    //   nickname: '测试名字4'
    // }],
    friends: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getFriends().then(res => {
      this.setData({
        friends: res.data
      })
    }).catch((err) => { })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})