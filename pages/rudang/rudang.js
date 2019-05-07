// pages/rudang/rudang.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    baseurl: app.globalData.baseurl,
    cont: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this

    wx.request({
      method: 'POST',
      dataType: "json",
      url: that.data.baseurl + 'index.php/api/base/allorganization',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        var data = res.data.data
        var arr1 = []
        for (var i = 0; i < data.length; i++) {
          arr1.push(data[i])
          if (data[i].shop.length > 0) {
            for (var j = 0; j < data[i].shop.length; j++) {
              arr1.push(data[i].shop[j])
              if (data[i].shop[j].shop.length > 0) {
                for (var x = 0; x < data[i].shop[j].shop.length; x++) {
                  arr1.push(data[i].shop[j].shop[x])
                }
              }
            }
          }

        }
        that.setData({
          arr: arr1
        })
      }
    })
  },
  bindPickerChange(e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value,
      o_id: this.data.arr[e.detail.value].o_id
    })
  },
  submit() {
    var that = this
    if (app.globalData.userInfo.status == 0) {
      if (this.data.o_id == undefined) {
        wx.showToast({

          title: "请选择组织",

          icon: 'loading',

          duration: 1000,


        })
      } else {
        if (this.data.cont == '') {
          wx.showToast({

            title: "请填写入党原因",

            icon: 'loading',

            duration: 1000,


          })
        } else {
          if (app.globalData.userInfo.address == "" || app.globalData.userInfo.address == "null") {
            wx.showToast({

              title: "请先完善个人信息！",

              icon: 'loading',

              duration: 1000,


            })
          } else {
            wx.request({
              method: 'POST',
              dataType: "json",
              data: {
                mobile: app.globalData.userInfo.mobile,
                id_card: app.globalData.userInfo.id_card,
                gender: app.globalData.userInfo.gender,
                address: app.globalData.userInfo.address,
                organ_id: that.data.o_id,
                reason: that.data.cont
              },
              url: that.data.baseurl + 'index.php/api/apijsonxcx/member_add',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function(res) {
                var data = res.data.data
                wx.showToast({

                  title: res.data.msg,

                  icon: 'loading',

                  duration: 1000,


                })
                if (res.data.code == 0) {
                  setTimeout(function() {
                    wx.switchTab({



                      url: '../index/index'
                    })
                  }, 1500)

                }


              }
            })
          }

        }
      }
    } else {
      wx.showToast({

        title: "您已经是党员了！",

        icon: 'loading',

        duration: 1000,


      })
    }

  },
  handleNewRealname: function(e) {
    this.setData({
      cont: e.detail.value
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

  }
})