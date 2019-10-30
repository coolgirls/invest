// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var id=options.id;
     var that=this;
    wx.request({
      url: app.createUrl('/Contract/GetOneContract?id='+id),
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log('res', res);
        if (res.data.Success == true) {
          var returns = JSON.parse(res.data.ReturnObject);
          var times = returns.ContractDate.substring(0, 9);
          returns.ContractDate=times;
          that.setData({
            details: returns
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

  }
})