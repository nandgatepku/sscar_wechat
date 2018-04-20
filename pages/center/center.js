// pages/center/center.js
var util = require('../../utils/util.js')
var app = getApp()
Page({

  data: {
    tempFilePaths: '../../images/555.png',
    obct:'未识别到驾驶证',
    obcdata: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'obj',
      success: function (res) {
        console.log(res.data.openId)
        that.setData({
          nickName:res.data.nickName,
          openId: res.data.openId
        })
      }
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
  
  },

  upimg: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          tempFilePaths: res.tempFilePaths[0]
        })
        console.log(tempFilePaths)
        wx.setStorage({ key: "img", data: tempFilePaths })

        wx.uploadFile({
          url: "https://sscar.ptczn.cn/index.php/index/index/upload",
          filePath: tempFilePaths[0],
          name: 'add_image', //文件对应的参数名字(key)  
          formData: {
            'openId': that.data.openId
          },  //其它的表单信息  
          success: function (res) {
            var obc = JSON.parse(res.data);
            if(1){
              that.setData({
                obct: '识别成功',
                obcdata:obc
              })
            }
            console.log(obc.code)
          }  
        })
      }
    })
  }

})
