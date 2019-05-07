var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    setInter: '', //计时器
    baseurl: app.globalData.baseurl,
    starSelect: 'starSelect',  //收藏后图片
    star: 'star',   //收藏前图片
    mynum: "",    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      mynum: options.num
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    this.audioCtx = wx.createAudioContext('myAudio')


    //文章详情数据
    wx.request({
      method: 'POST',
      dataType: "json",
      url: that.data.baseurl + 'index.php/api/apijsonxcx/learning_detail', //请求地址
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "id": that.data.mynum
      },

      success: function(res) {
        var id = res.data.data.id
        that.setData({
          title: res.data.data.a_title,
          createtime: res.data.data.createtime,
          content: res.data.data.a_content,
          image: res.data.data.a_image,
        })


        //判断是否已收藏
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
            var data = res.data.data
            if (data.length > 0) {
              for (var i = 0; i < data.length; i++) {
                if (data[i].info_id == id) {
                  that.setData({
                    url: that.data.starSelect
                  })
                  break
                } else {
                  that.setData({
                    url: that.data.star
                  })
                }
              }
            } else {
              that.setData({
                url: that.data.star
              })
            }
          }
        })



      }
    })

    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function() {
        var numVal = that.data.num + 1;
        that.setData({
          num: numVal
        });
      }, 1000);
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
    var that = this;
    clearInterval(that.data.setInter)
    var studyTime = that.data.num
     
    //文章学习时长大于15秒算一次学习
    var learnNumber
    if(studyTime>=16){
      learnNumber =  1
    }else{
      learnNumber =  0
    }



    //上传学习时间
    wx.request({
      method: 'POST',
      dataType: "json",
      url: that.data.baseurl + 'index.php/api/apijsonxcx/learning_record_add', //请求地址
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "m_id": app.globalData.userInfo.id,
        "time": studyTime,
        "info_id": that.data.mynum
      }
    })

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

  //收藏
  collect: function() {
    var that = this
    //请求用户信息
    wx.request({
      method: 'POST',
      dataType: 'json',
      url: that.data.baseurl + 'index.php/api/apijson/userinfo',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        //点击收藏
        wx.request({
          method: 'POST',
          dataType: "json",
          url: that.data.baseurl + 'index.php/api/apijsonxcx/collection_add', //请求地址
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            "m_id": app.globalData.userInfo.id,
            "type_id": 2,
            "info_id": that.data.mynum
          },
          success: function(res) {
            console.log(res.data.code)
            if (res.data.code == 0) {
              wx.showToast({

                title: '收藏成功',

                icon: 'loading',

                duration: 1000

              })
            } else {
              wx.showToast({

                title: '你已经收藏',

                icon: 'loading',

                duration: 1000

              })
            }
            that.onReady()
          }
        })

      }
    })
  },




})