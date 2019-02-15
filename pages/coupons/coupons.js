// pages/coupons.js
import {getSelfOffers, getSelfGifts} from '../../api/coupon.js'

const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coupons: [],
        typeDict: {
            'gifts': '我收到的券',
            'offers': '我赠送的券'
        },
        coupon_type: '',
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: this.data.typeDict[options.type]
        })
        this.setData({
            coupon_type: options.type
        })
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
        let r_method = '';
        if (this.data.coupon_type === 'offers') {
            r_method = getSelfOffers
        } else {
            r_method = getSelfGifts
        }
        r_method().then(res => {
            this.setData({
                coupons: res.data
            })
        }).catch((err) => {
        })
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