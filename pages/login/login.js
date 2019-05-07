// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:app.globalData,
    phone: '',

    password: '',

    baseurl: app.globalData.baseurl,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  // 获取输入账号 

  phoneInput: function(e) {

    this.setData({

      phone: e.detail.value

    })

  },



  // 获取输入密码 

  passwordInput: function(e) {

    this.setData({

      password: e.detail.value

    })

  },



  // 登录 

  login: function() {

    var that = this
    if (that.data.phone.length == 0) {

      wx.showToast({

        title: '号码不能为空',

        icon: 'loading',

        duration: 1000

      })

    }
    if (that.data.password.length == 0) {
      wx.showToast({

        title: '密码不能为空',

        icon: 'loading',

        duration: 1000

      })
    }
    if (that.data.phone.length != "" && that.data.password.length != "") {
      wx.request({
        method: 'POST',
        dataType: "json",
        url: that.data.baseurl + 'index.php/api/apijsonxcx/login',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          mobile: that.data.phone,
          password: that.data.password
        },
        success: function(res) {
          console.log(res)
          var msg = res.data.msg
          if (msg == "登录成功") {
            that.setData({
              'userInfo.userInfo': res.data.data
            })
            app.globalData.userInfo = res.data.data;
            wx.showToast({

              title: msg,

              icon: 'loading',

              duration: 1000,


            })
            wx.switchTab({



              url: '../index/index'
            })
          } else {
            wx.showToast({

              title: msg,

              icon: 'loading',

              duration: 1000,


            })
          }
        }
      })
    }

  },
  //注册
  register:function(){
    var that = this 
    wx.navigateTo({

      url: '../register/register'
    })
  }
})