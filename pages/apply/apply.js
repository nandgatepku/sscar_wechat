// pages/apply/apply.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    driver_front: '../../images/one.jpg',
    driver_back: '../../images/two.jpg',
    driving_front: '../../images/three.jpg',
    driving_back: '../../images/four.jpg',
    studentcard: '../../images/five.jpg',
    car_front: '../../images/audi.png',
    imgadd_driver_front: [],
    imgadd_driver_back: [],
    imgadd_driving_front: [],
    imgadd_driving_back: [],
    imgadd_studentcard:[],
    imgadd_car_front:[],
    is_1_ok: 0,
    is_2_ok: 0,
    is_3_ok: 0,
    is_4_ok: 0,
    is_5_ok: 0,
    is_6_ok: 0,
    obct:'请上传照片',
    studentid:0,
    apply_id:[]
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

  up_driver_front: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var driver_front = res.tempFilePaths
        that.setData({
          driver_front: res.tempFilePaths[0]
        })
        console.log(driver_front)
        wx.setStorage({ key: "img_driver_front", data: driver_front })
// 存入私有文件夹
        wx.uploadFile({
          url: "https://sscar.ptczn.cn/index.php/index/index/upload",
          filePath: driver_front[0],
          name: 'add_image', //文件对应的参数名字(key)  
          formData: {
            'openId': that.data.openId,
            'studentid': that.data.studentid,
            'which_one':1
          },  //其它的表单信息  
          success: function (res) {
            console.log(res);  
            that.setData({
              imgadd_driver_front: res.data,
              is_1_ok: 3,
            })         
            }            
        })        
//公开识别
        wx.uploadFile({
          url: "https://sscar.ptczn.cn/index.php/index/index/recog_driv_front",
          filePath: driver_front[0],
          name: 'add_image', //文件对应的参数名字(key)  
          formData: {
            'openId': that.data.openId,
            'studentid': that.data.studentid,
            'type':1
          },  //其它的表单信息  
          success: function (res) {
            console.log(res);
            var driver_front_data_tmp = JSON.parse(res.data);
            var driver_front_data = JSON.parse(driver_front_data_tmp);
            if (driver_front_data.code == 0){
              console.log(driver_front_data)
              that.setData({
                obct: '识别成功',
                is_1_ok: 1,
              })
              console.log(driver_front_data.data)
              wx.setStorage({ key: "driver_front_data", data: driver_front_data.data.items })
            }else{
              that.setData({
                obct: '未识别到驾驶证',
                is_1_ok: 2,
            })
            }
            console.log(driver_front_data.data.items)
          }  
        })
      }
    })
  },

  up_driving_front: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var driving_front = res.tempFilePaths
        that.setData({
          driving_front: res.tempFilePaths[0]
        })
        console.log(driving_front)
        wx.setStorage({ key: "img_driving_front", data:driving_front })
        // 存入私有文件夹
        wx.uploadFile({
          url: "https://sscar.ptczn.cn/index.php/index/index/upload",
          filePath: driving_front[0],
          name: 'add_image', //文件对应的参数名字(key)  
          formData: {
            'openId': that.data.openId,
            'studentid': that.data.studentid,
            'which_one': 3
          },  //其它的表单信息  
          success: function (res) {
            console.log(res);
            that.setData({
              imgadd_driving_front: res.data,
              is_3_ok: 3,
            })
          }
        })
        //公开识别
        wx.uploadFile({
          url: "https://sscar.ptczn.cn/index.php/index/index/recog_driv_front",
          filePath: driving_front[0],
          name: 'add_image', //文件对应的参数名字(key)  
          formData: {
            'openId': that.data.openId,
            'type': 0
          },  //其它的表单信息  
          success: function (res) {
            console.log(res);
            var driving_front_data_tmp = JSON.parse(res.data);
            var driving_front_data = JSON.parse(driving_front_data_tmp);
            if (driving_front_data.code == 0) {
              that.setData({
                obct: '识别成功',
                is_3_ok: 1,
              })
              wx.setStorage({ key: "driving_front_data", data: driving_front_data.data.items })
            } else {
              that.setData({
                obct: '未识别到行驶证',
                is_3_ok: 2,
              })
            }
            console.log(driving_front_data.data.items)
          }
        })
      }
    })
  },


  up_driver_back: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var driver_back = res.tempFilePaths
        that.setData({
          driver_back: res.tempFilePaths[0]
        })
        console.log(driver_back)
        // 存入私有文件夹
        wx.uploadFile({
          url: "https://sscar.ptczn.cn/index.php/index/index/upload",
          filePath: driver_back[0],
          name: 'add_image', //文件对应的参数名字(key)  
          formData: {
            'openId': that.data.openId,
            'studentid': that.data.studentid,
            'which_one': 2
          },  //其它的表单信息  
          success: function (res) {
            console.log(res);
            that.setData({
              imgadd_driver_back: res.data,
              is_2_ok: 1,
            })
          }
        })
        
      }
    })
  },

  up_driving_back: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var driving_back = res.tempFilePaths
        that.setData({
          driving_back: res.tempFilePaths[0]
        })
        console.log(driving_back)
        // 存入私有文件夹
        wx.uploadFile({
          url: "https://sscar.ptczn.cn/index.php/index/index/upload",
          filePath: driving_back[0],
          name: 'add_image', //文件对应的参数名字(key)  
          formData: {
            'openId': that.data.openId,
            'studentid': that.data.studentid,
            'which_one': 4
          },  //其它的表单信息  
          success: function (res) {
            console.log(res);
            that.setData({
              imgadd_driving_back: res.data,
              is_4_ok: 1,
            })
          }
        })

      }
    })
  },

  up_studentcard: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var studentcard = res.tempFilePaths
        that.setData({
          studentcard: res.tempFilePaths[0]
        })
        console.log(studentcard)
        wx.setStorage({ key: "img_studentcard", data: studentcard })
        // 存入私有文件夹
        wx.uploadFile({
          url: "https://sscar.ptczn.cn/index.php/index/index/upload",
          filePath: studentcard[0],
          name: 'add_image', //文件对应的参数名字(key)  
          formData: {
            'openId': that.data.openId,
            'studentid': that.data.studentid,
            'which_one': 5
          },  //其它的表单信息  
          success: function (res) {
            console.log(res)
            that.setData({
              imgadd_studentcard: res.data,
              is_5_ok: 1,
            })
          }
        })
      }
    })
  },

  up_car_front: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var car_front = res.tempFilePaths
        that.setData({
          car_front: res.tempFilePaths[0]
        })
        console.log(car_front)
        // 存入私有文件夹
        wx.uploadFile({
          url: "https://sscar.ptczn.cn/index.php/index/index/recog_car_front",
          filePath: car_front[0],
          name: 'add_image', //文件对应的参数名字(key)  
          formData: {
            'openId': that.data.openId,
            'studentid': that.data.studentid,
            'which_one': 6
          },  //其它的表单信息  
          success: function (res) {
            console.log(res);
            var car_front_data_tmp = JSON.parse(res.data);
            that.setData({
              imgadd_car_front: car_front_data_tmp.imgadd,
            })
            console.log(car_front_data_tmp.imgadd)
            var car_front_data = JSON.parse(car_front_data_tmp.res);
            if (car_front_data.code == 0) {
              that.setData({
                obct: '识别成功',
                is_6_ok: 1,
              })
              wx.setStorage({ key: "car_front_data", data: car_front_data.data.items })
            } else {
              that.setData({
                obct: '未识别到车牌号'
              })
            }
            console.log(car_front_data.data.items)
          }
        })   
      }
    })
  },

  totxt: function () {
    var that = this;
    wx.request({
      url: 'https://sscar.ptczn.cn/index.php/index/index/sql_photo',
      data: {
        // code: "oneyuan",
        'driver_front': that.data.imgadd_driver_front,
        'driver_back': that.data.imgadd_driver_back,
        'driving_front': that.data.imgadd_driving_front,
        'driving_back': that.data.imgadd_driving_back,
        'studentcard': that.data.imgadd_studentcard,
        'car_front': that.data.imgadd_car_front,
        'openId': that.data.openId,
        'studentid': that.data.studentid
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"  //post
      },

      success: function (res) {
        console.log(res.data.apply_id)
        var apply_id = res.data.apply_id;
        that.setData({
          apply_id: res.data.apply_id
        })
        wx.setStorageSync('apply_id', res.data.apply_id)
      }
    })
    if (this.data.is_1_ok == 1 && this.data.is_2_ok == 1 && this.data.is_3_ok == 1 && this.data.is_4_ok == 1 && this.data.is_5_ok == 1 && this.data.is_6_ok==1){
      wx.navigateTo({
        url: "/pages/txt/txt?apply_id=" + that.data.apply_id
      })
    }else{
      wx.showModal({
        title: '出错啦',
        content: '上传的照片可能未识别成功，请返回尝试。若多次尝试仍出现此提示，可点击坚持提交后手动修改',
        confirmText:'返回尝试',
        cancelText:'坚持提交',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击返回尝试')
          } else if (res.cancel) {
            console.log('用户点击坚持提交')
            
            console.log(that.data.apply_id)
            wx.navigateTo({
              url: "/pages/txt/txt?apply_id=" + that.data.apply_id
            })
          }
        }
      })
    }
  }

})
