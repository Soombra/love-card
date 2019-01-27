const {getFriends} = require('../../api/coupon.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friends: [],
    showLayer: false
  },
  handleGive(e){
    this.setData({
      showLayer: true,
      selectedFriend: e.currentTarget.dataset.friend
    })
  },
  closeLayer(){
    this.setData({
      showLayer: false,
      selectedFriend: {}
    })
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