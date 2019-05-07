// pages/address/address.js
var app =getApp();
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    baseurl:app.globalData.baseurl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this
    wx.getSystemInfo({
      success: function(res) {
        var heights = res.windowHeight * 750 / res.windowWidth - 300
        that.setData({
          heights: heights
        })
      }
    })
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: function(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
    })
    that.findAddress()
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
  //根据地点查询位置
  findAddress: function() { 
    var that = this
    var qqmapsdk;
    var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
    var varMarkers = [];
    qqmapsdk = new QQMapWX({
      key: 'JJRBZ-KXLW2-Z4XUD-CHLST-SHYEQ-S6BY4'
    });
    qqmapsdk.search({
      keyword: '党建',
      page_size: 20,
      success: function(res) {
        wx.request({
          method: 'POST',
          dataType: "json",
          url:  that.data.baseurl+'index.php/api/apijsonxcx/map_list', //请求地址
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {

            var res = res.data.data
            
            for (var i = 0; i < res.length; i++) {
              
              var trapeze = res[i].add_xy
              let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
              let x = trapeze.split(",")[0] - 0.0065;
              let y = trapeze.split(",")[1] - 0.006;
              let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
              let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
              let lngs = z * Math.cos(theta);
              let lats = z * Math.sin(theta);
              varMarkers.push({
                id: i,
                iconPath: '../../image/address2.png',
                latitude: lats,//小
                longitude: lngs,//大
                width: 20,
                height: 20,
                title: res[i].name,
                address: res[i].address,
                text: res[i].intro,
                phone: res[i].phone
              })

            }
            that.setData({
              markers: varMarkers

            })
          }
        })
      }
    })
  },
  //获取id
  getId: function(e) {
    var that = this
    
    var id = e.markerId
    that.setData({
      id: id,
      title: that.data.markers[id].title,
      address: that.data.markers[id].address,
      text: that.data.markers[id].text,
      phone:that.data.markers[id].phone,
    })
  },
})