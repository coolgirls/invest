//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
infos:{ }

  },
  onLoad: function () {
    app.checkLogin();
    var that=this;
    var id = wx.getStorageSync('loginId');
    if(id!=''){
      wx.request({
        url: app.createUrl('/RecordInfo/GetPersonInfo?id=' + id),
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log('res', res);
          if (res.data.Success == true) {
            var returns = JSON.parse(res.data.ReturnObject);
            that.setData({
              infos: returns
            })

          } else {
            wx.hideLoading();
            wx.showToast({
              title: res.data.ErrMsg,
              icon: 'none'
            })
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '网络异常',
          });
        }
      });
    }

  },
  //退出
  loginOut(){
    wx.clearStorageSync();
    wx.navigateTo({
      url: '../login/login'
    });
  },
})
