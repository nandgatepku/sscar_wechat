// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: '/images/ico1.png',
      id: 0,
      latitude: 39.7585480634,
      longitude: 116.3569092751,
      width: 30,
      height: 30
    }] 
  
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
    wx.showNavigationBarLoading();
    var that = this;
    console.log(that.data.moment);
    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    // 停止下拉动作  
    wx.stopPullDownRefresh();
  
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

  
  openMap: function () {
    wx.openLocation({
      latitude: 39.7585480634,
      longitude: 116.3569092751,
      scale: 14,
      name: '北京大学软件与微电子学院'
    })
  }, 
})