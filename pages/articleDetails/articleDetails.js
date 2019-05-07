var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mynum: '',
    starSelect: 'starSelect',
    star: 'star',
    showVideo: false, //是否展示视频
    baseurl: app.globalData.baseurl,
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
    //详情信息数据
    wx.request({
      method: 'POST',
      dataType: "json",
      url: that.data.baseurl + 'index.php/api/apijsonxcx/article_detail', //请求地址
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        "id": that.data.mynum
      },

      success: function(res) {
         
        var id = res.data.data.id
        
        that.setData({
          title: res.data.data.title,
          createtime: res.data.data.createtime,
          content: res.data.data.content,
          image: res.data.data.image,
          
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
            "type_id": 1
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

  //收藏
  collect: function() {
    var that = this

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
        "type_id": 1,
        "info_id": that.data.mynum
      },
      success: function(res) {
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

  },











})