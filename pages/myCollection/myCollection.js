// pages/learnIng/learnIng.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0, //0资讯、1学习、2活动
    learnData: 0,
    baseurl: app.globalData.baseurl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.getMessage();
    // this.getAudio();
    // this.getClass();
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          clientHeight: res.windowHeight-43
        });
      }
    })

    //资讯
    wx.request({
      method: 'POST',
      dataType: "json",
      url: that.data.baseurl + 'index.php/api/apijsonxcx/collection_list', //请求地址
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "m_id": app.globalData.userInfo.id,
        "type_id": 1
      },

      success: function(res) {
        var length = res.data.data.length;
        that.setData({
          message: res.data.data,
          length: length
        })
      }
    })

    //学习
    wx.request({
      method: 'POST',
      dataType: "json",
      url: that.data.baseurl + 'index.php/api/apijsonxcx/collection_list', //请求地址
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "m_id": app.globalData.userInfo.id,
        "type_id": 2
      },

      success: function(res) {
        var article = []
        var audio = []
        var video = []

        //文章
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].data.type_id == 1) {
            article.push(res.data.data[i])
          }
        }
        that.setData({
          article: article,
          articleLength: article.length,
          // articleHeight: article.length * 305 + 105
        })

        //音频
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].data.type_id == 3) {
            audio.push(res.data.data[i])
          }
        }
        that.setData({
          audio: audio,
          audioLength: audio.length,
        })

        //视频
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].data.type_id == 2) {
            video.push(res.data.data[i])
          }
        }
        that.setData({
          video: video,
          videoLength: video.length,
        })
      }
    })

    //活动
    wx.request({
      method: 'POST',
      dataType: "json",
      url: that.data.baseurl + 'index.php/api/apijsonxcx/collection_list', //请求地址
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "m_id": app.globalData.userInfo.id,
        "type_id": 3
      },

      success: function(res) {
        that.setData({
          activity: res.data.data,
          activityLength: res.data.data.length
        })
      }
    })



  },

  //资讯
  // getMessage: function () {
  //   var that = this;
  // },

  //学习
  // getAudio: function () {
  //   var that = this;
  // },

  //活动
  // getClass: function () {
  //   var that = this;
  // },

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


  //获取当前滑块的index（学习板块）
  bindlearnchange: function(e) {
    const that = this;
    that.setData({
      learnData: e.detail.current
    })
  },
  //点击切换，滑块index赋值（学习板块）
  learncheckCurrent: function(e) {
    const that = this;

    if (that.data.learnData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        learnData: e.target.dataset.current
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
  //跳转到详情信息页
  toArticleDetails: function(e) {
    var that = this
    let item = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../articleDetails/articleDetails?num=' + item,
    })
  },

  //跳转到活动详情页
  toLifeDetails: function(e) {
    var that = this

    var id = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../lifeDetails/lifeDetails?num=' + id,
    })
  },
  //跳转到文章详情页
  toStudyDetails: function(e) {
    var that = this
    console.log(e)
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