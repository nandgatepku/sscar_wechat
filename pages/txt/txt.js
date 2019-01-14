// pages/txt/txt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentid: [],
    apply_id:[]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var apply_id = options.apply_id;
    that.setData({
      apply_id: apply_id
    })
    console.log(this.data.apply_id)
    wx.getStorage({
      key: 'obj',
      success: function (res) {
        // console.log(res.data.openId)
        that.setData({
          nickName: res.data.nickName,
          openId: res.data.openId
        })
      }
    }),

      wx.getStorage({
        key: 'studentid',
        success: function (res) {
          console.log(res.data)
          that.setData({
            studentid: res.data
          })
        }
      });

    wx.getStorage({
      key: 'driver_front_data',
        success: function (res) {
          // console.log(res.data[0].itemstring)
          that.setData({
            driver_id: res.data[0].itemstring,
            driver_name: res.data[1].itemstring,
            driver_car: res.data[7].itemstring,
            driver_end: res.data[9].itemstring,
            driver_auth: res.data[10].itemstring,
            driver_add: res.data[4].itemstring
          })
        }
    }),

    wx.getStorage({
      key: 'driving_front_data',
      success: function (res) {
        // console.log(res.data[0].itemstring)
        that.setData({
          driving_name: res.data[2].itemstring,
          driving_type: res.data[2].itemstring,
          brand: res.data[5].itemstring,
          driving_start: res.data[8].itemstring
        })
      }
    }),

      wx.getStorage({
        key: 'car_front_data',
        success: function (res) {
          // console.log(res.data[0].itemstring)
          that.setData({
            car_number: res.data[0].itemstring
          })
        }
      })  

  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    // console.log(this.data.studentid);
    var studentid = this.data.studentid;
    var that = this;
      
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

  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    var driver_name = e.detail.value.driver_name;
    var car_number = e.detail.value.car_number;
    // console.log(e.detail.value.driver_name);
   
    wx.request({
      url: 'https://sscar.ptczn.cn/index.php/index/index/apply_txt',
      data: {
        'driver_name': e.detail.value.driver_name,
        'car_number': e.detail.value.car_number,
        'telephone': e.detail.value.telephone,
        'driving_name': e.detail.value.driving_name,
        'major_name': e.detail.value.major_name,
        // 'studentid': e.detail.value.studentid,
        'openId': that.data.openId,
        'apply_id': that.data.apply_id
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"  //post
      },
      success: function (res) {
        console.log(res.data)
        wx.showModal({
          title: 'success',
          content: '成功填写申请表，请等待审核。',
          confirmText: '好的',
          showCancel:false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确认')
              wx.switchTab({
                url: "/pages/main/main"
              })
              // wx.reLaunch({
              //   url: "/pages/main/main"
              // })
            }
          }
        })
      }
    })
  }
})