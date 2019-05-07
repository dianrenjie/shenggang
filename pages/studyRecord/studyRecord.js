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

    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          clientHeight: res.windowHeight - 44
        });
      }
    })

    //学习记录
    wx.request({
      method: 'POST',
      dataType: "json",
      url: that.data.baseurl + 'index.php/api/apijsonxcx/learning_record_list', //请求地址
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "m_id": app.globalData.userInfo.id
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
        })

        //音频
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].data.type_id == 3) {
            audio.push(res.data.data[i])
          }
          
        }
        for(var i = 0; i< audio.length;i++){
          if(audio[i].data.m_url.indexOf('http') ==-1){
            audio[i].data.m_url = that.data.baseurl+audio[i].data.m_url
          }else{
            audio[i].data.m_url = audio[i].data.m_url
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
        for (var i = 0; i < video.length; i++) {
          if (video[i].data.v_url.indexOf('http') == -1) {
            video[i].data.v_url = that.data.baseurl + video[i].data.v_url

          } else {
            video[i].data.v_url = video[i].data.v_url
          }

        }
        that.setData({
          video: video,
          videoLength: video.length,
        })
        
        var a = video.length
        var b = audio.length
        var c = article.length
        if (a > b) {
          if (a > c) {
            that.setData({
              height: a * 305
            })
          } else {
            that.setData({
              height: c * 305
            })
          }
        } else {
          if (b > c) {
            that.setData({
              height: b * 305
            })
          } else {
            that.setData({
              height: c * 305
            })
          }
        }

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