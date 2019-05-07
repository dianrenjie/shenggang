// pages/learnIng/learnIng.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0, //0文章站、1音频站、2党课
    baseurl: app.globalData.baseurl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getArticle();
    this.getAudio();
    this.getClass();
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

  //文章
  getArticle: function() {
    var that = this;
    wx.request({
      method: 'POST',
      dataType: "json",
      url: that.data.baseurl + 'index.php/api/apijsonxcx/learning_list', //请求地址
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "source_id": 2,
        "type_id": 1
      },

      success: function(res) {
        var length = res.data.data.length;
        that.setData({
          article: res.data.data,
          length: length * 330
        })
      }
    })
  },

  //音频
  getAudio: function() {
    var that = this;
    wx.request({
      method: 'POST',
      dataType: "json",
      url: that.data.baseurl + 'index.php/api/apijsonxcx/learning_list', //请求地址
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "source_id": 2,
        "type_id": 3
      },

      success: function(res) {
        that.setData({
          audio: res.data.data,


        })
      }
    })
  },

  //党课
  getClass: function() {
    var that = this;
    wx.request({
      method: 'POST',
      dataType: "json",
      url: that.data.baseurl + 'index.php/api/apijsonxcx/learning_list', //请求地址
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "source_id": 2,
        "type_id": 2
      },

      success: function(res) {
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].v_image != null) {
            if (res.data.data[i].v_image.indexOf('http') == -1) {
              res.data.data[i].v_image = that.data.baseurl + res.data.data[i].v_image

            } else {
              res.data.data[i].v_image = res.data.data[i].v_image
            }
          }
        }
        that.setData({
          class: res.data.data

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
  //关闭封面，展示视频
  showVideo: function() {
    var that = this
    that.setData({
      showVideo: true,
    })
  },
  //跳转到文章详情页
  toStudyDetails: function(e) {
    var that = this

    let item = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../studyDetails/studyDetails?num=' + item,
    })
  },
  //跳转到音频详情页
  toAudioDetails: function(e) {
    var that = this
    let item = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../audioDetails/audioDetails?num=' + item,
    })
  },
  //跳转到党课详情页
  toClassDetails: function(e) {
    var that = this
    let item = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../classDetails/classDetails?num=' + item,
    })
  }

})