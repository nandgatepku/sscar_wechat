//app.js
App({

  globalData: {
    userInfo: null
  },
  onLaunch: function () {

    var API_URL = "https://sscar.ptczn.cn/index.php/index/index/wxlogin";
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var that = this;
    wx.login({
      success: function (res) {
        var code = res['code'];
        //2.小程序调用wx.getUserInfo得到rawData, signatrue, encryptData.
        wx.getUserInfo({
          success: function (info) {
            console.log(info);
            var rawData = info['rawData'];
            var signature = info['signature'];
            var encryptData = info['encryptData'];
            var encryptedData = info['encryptedData']; //注意是encryptedData不是encryptData...坑啊
            var iv = info['iv'];

            //3.小程序调用server获取token接口, 传入code, rawData, signature, encryptData.
            wx.request({
              url: API_URL,
              method: 'GET',
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              data: {
                "code": code,
                "rawData": rawData,
                "signature": signature,
                "encryptData": encryptData,
                'iv': iv,
                'encryptedData': encryptedData
              },
              success: function (res) {
                console.log(res.data);
                var obj = JSON.parse(res.data);
                if (res.statusCode != 200) {
                  wx.showModal({
                    title: '登录失败'
                  });
                } 
                else {
                  wx.setStorageSync('obj',obj)
                }
                typeof func == "function" && func(res.data);
              }
            });
          }
        });

      }
    });

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

})