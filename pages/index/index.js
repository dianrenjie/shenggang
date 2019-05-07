//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 3000,
    baseurl: app.globalData.baseurl,
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    this.banner();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  banner: function() {
    var that = this;
    wx.request({
      method: 'POST',
      dataType: "json",
      url: that.data.baseurl + 'index.php/api/apijsonxcx/banner_list',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        var img =[];
        for (var i = 0; i < 4; i++) {
          if (res.data.data[i].image.indexOf('http') == -1) {
            res.data.data[i].image = that.data.baseurl + res.data.data[i].image

          } else {
            res.data.data[i].image = res.data.data[i].image
          }
          img.push(res.data.data[i])
        }
        that.setData({
          img:img
        })
      }
    })
  },

  //跳转到其他页面
  toOther: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    // console.log(index)
    if (index == 1) {
      wx.navigateTo({
        url: '../messageDetails/messageDetails',
      })
    } else if (index == 2) {
      wx.navigateTo({
        url: '../study/study',
      })
    } else if (index == 3) {
      wx.navigateTo({
        url: '../life/life',
      })
    } else if (index == 4) {
      wx.navigateTo({
        url: '../branchPlan/branchPlan',
      })
    } else if (index == 5) {
      wx.navigateTo({
        url: '../address/address',
      })
    } else if (index == 6) {
      wx.navigateTo({
        url: '../matrix/matrix',
      })
    } else if (index == 7) {
      wx.navigateTo({
        url: '../rudang/rudang',
      })
    }
  }
})