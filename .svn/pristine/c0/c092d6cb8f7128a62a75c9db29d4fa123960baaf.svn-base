//app.js
const hostUrl = require('./config').hostUrl;
App({
  onLaunch: function () {
  },
  createUrl: function (api) {
    return hostUrl + api;
  },
  globalData: {

  },
  checkLogin: function () {
    //获取缓存的信息
    var username = wx.getStorageSync("username")
    var password = wx.getStorageSync("password")
    console.log('username', username);
    console.log('password', password);


    //判断用户名密码是否为null,如果为null,默认跳转登录
    if (username != '' && password != '') {
      wx.showLoading({
        title: '登录中',
      })
      //请求后台验证用户登陆
      wx.request({
        url: this.createUrl('/Customer/CustomerLogin'),
        method: 'POST',
        data: {
          'CusLoginName': username,
          'CusLoginPwd': password
        },
        success: (res) => {
          console.log('登录', res.data);
          if (res.data.Success == true) {
            wx.hideLoading();
            // //跳转页面,并且关闭当前页面
            // wx.navigateTo({
            //   url: '../index/index'
            // });
          } else {
            wx.redirectTo({
              url: '../login/login'
            });
          }
        },
        fail: function (res) {
          wx.redirectTo({
            url: '../login/login'
          });
        }
      });
    } else {
      wx.redirectTo({
        url: '../login/login'
      });
    }
  }
})