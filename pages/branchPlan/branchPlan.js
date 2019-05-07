// pages/branchPlan/branchPlan.js
var app=getApp();
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
  onLoad: function () {
    this.getBranch();
    
  },

  // 页面数据
  getBranch: function () {
    var that = this;
    wx.request({
      method: 'POST',
      dataType: "json",
      url: that.data.baseurl + 'index.php/api/apijsonxcx/article_list',//请求地址
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "cate_id": 30
      },

      success: function (res) {
        var length = res.data.data.length
        that.setData({
          branch: res.data.data,
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
  //跳转到详细计划页面
  toPlan:function(e){
    
    let item = e.currentTarget.dataset.item.id;
    
    

    var that = this
    wx.navigateTo({
      url: '../planDetails/planDetails?num='+item,
    })
  }
})