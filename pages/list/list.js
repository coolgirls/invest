// pages/list/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = wx.getStorageSync('loginId');
    wx.request({
      url: app.createUrl('/Contract/GetContract?id='+id),
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log('res', res);
        if (res.data.Success == true) {
          var returns = JSON.parse(res.data.ReturnObject);
          var arr=[];
          for(var i=0;i<returns.length;i++){
            var times = returns[i].ContractDate.substring(0, 9);
            arr.push({
              'ID': returns[i].ID,
              'ContractDate': times,
              'ItemName': returns[i].ItemName,
              'InvestPeriod': returns[i].InvestPeriod,
              'TotalEarning': returns[i].TotalEarning
            })
          }
          that.setData({
            lists: arr
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

  },
  goDetail(e){
    console.log('e',e);
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id='+id,
    })
  }
})