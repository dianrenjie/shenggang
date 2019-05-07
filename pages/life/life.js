// pages/life/life.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseurl: app.globalData.baseurl,
    currentData: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getActive();
    this.undoneActive();
    this.finishActive();
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          clientHeight: res.windowHeight,
          status: app.globalData.userInfo.status
        });
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
  //获取当前滑块的index
  bindchange: function(e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function(e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },

  //跳转到活动详情页
  toLifeDetails: function(e) {
    var that = this

    var id = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../lifeDetails/lifeDetails?num=' + id,
    })
  },


  //获取全部活动信息
  getActive: function(e) {
    var that = this;
    wx.request({
      method: 'POST',
      dataType: "json",
      url: that.data.baseurl + 'index.php/api/apijsonxcx/active_list', //请求地址
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {

      },

      success: function(res) {
        var height = res.data.data.length
        that.setData({
          active: res.data.data,
          height:height*72
        })
      }
    })
  },
  //获取未完成活动信息
  undoneActive: function(e) {
    var that = this;
    wx.request({
      method: 'POST',
      dataType: "json",
      url: that.data.baseurl + 'index.php/api/apijsonxcx/active_list', //请求地址
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {

      },

      success: function(res) {
        var undoneActive = []
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].status == 0) {


            undoneActive.push(res.data.data[i])


          }
        }
        that.setData({
          undoneActive: undoneActive
        })

      }
    })
  },
  //获取已完成活动信息
  finishActive: function(e) {
    var that = this;
    wx.request({
      method: 'POST',
      dataType: "json",
      url: that.data.baseurl + 'index.php/api/apijsonxcx/active_list', //请求地址
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {

      },

      success: function(res) {

        var finishActive = []
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].status == 1) {


            finishActive.push(res.data.data[i])


          }
        }
        that.setData({
          finishActive: finishActive
        })

      }
    })
  }


})