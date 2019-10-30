// pages/login/login.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     username:'',
     password:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取缓存的信息
    var usernames = wx.getStorageSync("username")
    var passwords = wx.getStorageSync("password")

    this.setData({
      username: usernames,
      password: passwords
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
  bindAccout(e){
    this.setData({
      username:e.detail.value
    })
  },
  bindPass(e){
    this.setData({
      password: e.detail.value
    })
  },
  goLogin(){
    var that=this;
    var name = this.data.username;
    var pass = this.data.password;
    if (name != '' && pass != '') {
      wx.showLoading({
        title: '登录中',
      })
      wx.request({
        url: app.createUrl('/Customer/CustomerLogin'),
        method: 'POST',
        data: {
          'CusLoginName': name,
          'CusLoginPwd': pass
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log('登', res);
          if (res.data.Success == true) {
            var returns = JSON.parse(res.data.ReturnObject);
            console.log('returns',returns);
            var id = returns.Id;
            wx.setStorageSync("username", name);
            wx.setStorageSync("password", pass);
            wx.setStorageSync("loginId", id);
            wx.navigateTo({
              url: '../index/index',
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
    }else{
      wx.showToast({
        title: '账号和密码不能为空',
        icon: 'none'
      })
    }
  }
})