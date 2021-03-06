const { basicToken } = require('../config.js')
const request = {}
let methods = ['get', 'post', 'put', 'delete']

methods.forEach((item, index, arr) => {
  request[item] = (url, {headers, ...params} = {}) => {
    let header = headers || {}
    header.Authorization = wx.getStorageSync('token') ? 'JWT ' + wx.getStorageSync('token') : basicToken
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        ...params,
        method: item.toUpperCase(),
        header,
        success: (res) => {
          if (parseInt(res.statusCode / 100) === 2){
            resolve(res)
          } else {
            reject(res)
          }
        },
        fail: (err) => reject(err)
      })
    })
  }
})
module.exports = request