import {getFriends, createCoupon} from '../../api/coupon.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friends: [],
    showLayer: false,
    showCreateCoupon : '',
    date_start: '2019-02-01',
    date_end: '2019-02-01',
    friend_id: '',
    title: '',
    count: 0,
    remark: ''
  },
  showCreateCoupon(e){
    console.log(e.currentTarget.dataset.friendId)
    this.setData({
      showCreateCoupon: 'show',
      friend_id: e.currentTarget.dataset.friendId
    })
  },
  hideCreateCoupon(){
    this.setData({
      showCreateCoupon: '',
    })
  },
  startDateChange (e) {
    this.setData({
      date_start: e.detail.value
    })
  },
  endDateChange (e) {
    this.setData({
      date_end: e.detail.value
    })
  },
  submitCoupon(){
      let { title, count, remark, date_start, date_end } = this.data
      if (!title || !count || !remark){
        wx.showToast({
          title: '您有未填写项',
          icon: 'none'
        })
        return
      }
      createCoupon({
        title,
        remark,
        date_start,
        date_end,
        count: +count,
        friend_id: this.data.friend_id
      }).then(res => {
        console.log('赠送成功')
        this.hideCreateCoupon()
      }).catch(err =>{
        wx.showToast({
          title: '赠送失败，请稍后再试',
          icon: 'none'
        })
      })
    },
  handleInput (e) {
      let obj = {}
      obj[e.currentTarget.dataset.name] = e.detail.value
      this.setData(obj)
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