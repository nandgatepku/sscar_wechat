// pages/main/main.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    have : 0,
    studentid:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    var studentid =[];
    var studentid = decodeURIComponent(options.scene);
    wx.setStorageSync('studentid', studentid); 
    that.setData({
      studentid: decodeURIComponent(options.scene)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.getStorage({
    //   key: 'studentid',
    //   success: function (res) {
    //     // console.log(res.data)
    //     that.setData({
    //       studentid: res.data
    //     })
    //   }
    // });   
  
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

  tolaw: function () {
    var that = this;
    var studentid = this.data.studentid;
    console.log(studentid)
    if (that.data.studentid =='undefined'){
      wx.showModal({
        title: 'error',
        content: '请从微信校园卡服务大厅处扫码进入，以便验证软微师生身份。',
        confirmText: '好的',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确认')
            wx.reLaunch({
              url: "/pages/main/main"
            })
          }
        }
      })
    }else{
      wx.navigateTo({
        url: "/pages/law/law"
      })
    }

  }
})