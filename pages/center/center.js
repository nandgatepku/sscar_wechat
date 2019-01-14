// pages/center/center.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    tempFilePaths: '../../images/555.png',
    obct:'请上传照片',
    obcshow : 0,
    obcname: [],
    obcid:[],
    obccar:[],
    obcend:[],
    obcauth:[],
    obcadd:[],
    studentid:[],
    wx_img:[]    
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
          openId: res.data.openId,
          wx_img: res.data.avatarUrl,
        })
      }
    });
    wx.getStorage({
      key: 'studentid',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          studentid: res.data
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this;
    console.log(this.data.studentid);
    var studentid = this.data.studentid;
    var openId = this.data.openId;
    wx.request({
      url: 'https://sscar.ptczn.cn/index.php/index/index/get_data_api',
      data: {
        'studentid': studentid
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"  //post
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          name: res.data.name,
          major_name: res.data.major_name,
          telephone: res.data.telephone
        })
      }
    }),
      wx.request({
      url: 'https://sscar.ptczn.cn/index.php/index/index/get_apply_id_api',
        data: {
          'openId': openId
        },
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"  //post
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
           'apply_id':res.data.res
          })
        }
      })

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
  
  }

})
