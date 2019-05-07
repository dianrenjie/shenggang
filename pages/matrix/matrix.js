// pages/Matrix/Matrix.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseurl: app.globalData.baseurl,
    logs:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.getData();
  },
  getData: function () {
    var that = this;
    wx.request({
      url: that.data.baseurl + 'index.php/api/apijsonxcx/matrix_list',//请求地址
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        var matrixList = res.data.data;
        for (var i = 0; i < matrixList.length; i++) {
          if (matrixList[i].image1.indexOf('http') == -1) {
            matrixList[i].image1 = that.data.baseurl + matrixList[i].image1
          } else {
            matrixList[i].image1 = matrixList[i].image1
          }
        }
        that.setData({
          matrixList: matrixList
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */ 
  onShow: function() {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //跳转到党建矩阵详情页
  toPartyPhotos: function (e) {
    var that = this
    let item = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../partyPhotos/partyPhotos?num=' + item,
    })
  }

})