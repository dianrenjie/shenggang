// pages/notice/notiece.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseurl: app.globalData.baseurl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.notice();
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
  
  //公告通知信息
  notice: function(){
    var that = this 
    wx.request({
      method:'POST',
      dataType:'json',
      url: that.data.baseurl +'index.php/api/apijsonxcx/dope_list',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success : function (res) {
        
        that.setData({
          notice: res.data.data
        })
      }
    })
  }
})