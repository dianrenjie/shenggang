// pages/personMessage/personMessage.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData,
    userAddress: '',
    baseurl: app.globalData.baseurl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getuserInfo();
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
  //获取个人信息
  getuserInfo: function() {
    var that = this
    that.setData({
      image: that.data.userInfo.userInfo.image,
      realname: that.data.userInfo.userInfo.realname,
      id_card: that.data.userInfo.userInfo.id_card,
      status: that.data.userInfo.userInfo.status,
      iphone: that.data.userInfo.userInfo.mobile,
      address: that.data.userInfo.userInfo.address,
      age: that.data.userInfo.userInfo.age,
    })

  },
  userAddress: function(e) {
    this.setData({
      userAdd: e.detail.value
    })
  },
  userAge: function(e) {
    this.setData({
      userage: e.detail.value
    })
  },
  //点击修改按钮
  onClick: function(e) {
    
    var that = this;
    if (that.data.userAdd == undefined && that.data.userage == undefined) {
      wx.showToast({
        title: '内容没有修改',
      })
    } else if (that.data.userAdd !== undefined && that.data.userage == undefined){
      wx.request({
        method: 'POST',
        dataType: 'json',
        url: that.data.baseurl + 'index.php/api/apijsonxcx/edituserInfo',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          "id": app.globalData.userInfo.id,
          "address": that.data.userAdd,
        },
        success: function(res) {
          app.globalData.userInfo.address = that.data.userAdd
          if (res.data.code == 0) {
            wx.showToast({

              title: res.data.msg,

              icon: 'loading',

              duration: 1000

            })
          } else {
            wx.showToast({

              title: '内容未修改',

              icon: 'loading',

              duration: 1000

            })
          }
        }

      })
    } else if (that.data.userAdd == undefined && that.data.userage !== undefined) {
      wx.request({
        method: 'POST',
        dataType: 'json',
        url: that.data.baseurl + 'index.php/api/apijsonxcx/edituserInfo',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          "id": app.globalData.userInfo.id,
          "age": that.data.userage,
        },
        success: function(res) {
          app.globalData.userInfo.age = that.data.userage
          if (res.data.code == 0) {
            wx.showToast({

              title: res.data.msg,

              icon: 'loading',

              duration: 1000

            })
          } else {
            wx.showToast({

              title: '内容未修改',

              icon: 'loading',

              duration: 1000

            })
          }
        }

      })
    } else {

      wx.request({
        method: 'POST',
        dataType: 'json',
        url: that.data.baseurl + 'index.php/api/apijsonxcx/edituserInfo',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          "id": app.globalData.userInfo.id,
          "address": that.data.userAdd,
          "age": that.data.userage,
        },
        success: function(res) {
          
          if (res.data.code == 0) {
            wx.showToast({

              title: res.data.msg,

              icon: 'loading',

              duration: 1000

            })
          } else {
            wx.showToast({

              title: '内容未修改',

              icon: 'loading',

              duration: 1000

            })
          }
        }

      })
    }



  }
})