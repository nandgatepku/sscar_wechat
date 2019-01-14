//app.js
App({
  globalData: {
    userInfo: null
  },
  onLaunch: function () {
    var API_URL = "https://sscar.ptczn.cn/index.php/index/index/wxlogin";
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
            var encryptedData = info['encryptedData']; 
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
  }

})