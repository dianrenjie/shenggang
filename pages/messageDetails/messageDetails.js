// pages/messageDetails/messageDetails.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    baseurl: app.globalData.baseurl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCurrent();
    this.getNews();
    this.getActivity();
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight - 44
        });
      }
    })

  },


  //时政要闻
  getCurrent: function () {
    var that = this;
    wx.request({
      method: 'POST',
      dataType: "json",
      url: that.data.baseurl +'index.php/api/apijsonxcx/article_list',//请求地址
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, 
      data: {
        "cate_id": 19
      },
      
      success: function (res) {
        var length = res.data.data.length
        that.setData({
          current:res.data.data,
        })
      }
    })
  },

  //新闻聚焦
  getNews: function () {
    var that = this;
    wx.request({
      method: 'POST',
      dataType: "json",
      url: that.data.baseurl + 'index.php/api/apijsonxcx/article_list',//请求地址
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "cate_id": 20
      },

      success: function (res) {
        that.setData({
          news: res.data.data,
        })
      }
    })
  },

  //党员活动
  getActivity: function () {
    var that = this;
    wx.request({
      method: 'POST',
      dataType: "json",
      url: that.data.baseurl + 'index.php/api/apijsonxcx/article_list',//请求地址
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "cate_id": 21
      },
      
      success: function (res) {
        that.setData({
          activity: res.data.data,
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
  //跳转到详情信息页
  toArticleDetails: function(e) {
    var that = this
    let item = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../articleDetails/articleDetails?num=' + item,
    })
  },
   //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  }

})