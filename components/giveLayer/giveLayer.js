// components/giveLayer/giveLayer.js
const { giveCoupon } = require('../../api/coupon.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    friend: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: '',
    count: '',
    remark: '',
    date_start: '',
    date_end: '',
    requesting: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleInput (e) {
      console.log(e)
      let obj = {}
      obj[e.currentTarget.dataset.name] = e.detail.value
      this.setData(obj)
    },
    handleClose(){
      this.triggerEvent('close')
    },
    handleSubmit(){
      if(this.data.requesting){
        return
      }
      this.setData({
        requesting: true
      })
      let { title, count, remark, date_start, date_end } = this.data
      if (!title || !count || !remark){
        wx.showToast({
          title: '您有未填写项',
          icon: 'none'
        })
        this.setData({
          requesting: false
        })
        return
      }
      
      giveCoupon({
        title,
        remark,
        date_start,
        date_end,
        count: +count,
        friend_id: this.properties.friend.user_id
      }).then(res => {
        console.log('赠送成功')
        this.setData({
          requesting: false
        })
        this.handleClose()
      }).catch(err =>{
        console.log(err)
        this.setData({
          requesting: false
        })
        wx.showToast({
          title: '赠送失败，请稍后再试',
          icon: 'none'
        })
      })
    }
  }
})
