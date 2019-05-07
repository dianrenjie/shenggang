// pages/mine/mine.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseurl: app.globalData.baseurl,
    text:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getuserInfo();
    var that = this
    wx.request({
      method: 'POST',
      // aysnc:false,
      dataType: 'json',
      url: that.data.baseurl + 'index.php/api/apijsonxcx/userinfo',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
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

          success: function (res) {
            var length = res.data.data.length
            var sum = 0
            for(var i =0 ; i<length;i++){
              
              var time=res.data.data[i].time
              sum+= time*1
            } 
            var studeTime;
            if(sum>0){
              var hour = Math.floor(sum/3600)
              var min = Math.floor(sum/60)%60
              var sec = sum%60
              studeTime =hour +'小时' + min +'分' + sec +'秒'
              that.setData({
                sum: studeTime
              })  
            }else{
              that.setData({
                sum: that.data.text
              }) 
            }        
            
          }
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
  //跳转到个人信息页面
  toPersonMessage: function() {
    var that = this
    wx.navigateTo({
      url: '../personMessage/personMessage',
    })
  },
  //跳转到学习记录页面
  toStudyRecord: function() {
    var that = this
    wx.navigateTo({
      url: '../studyRecord/studyRecord',
    })
  },
  //跳转到我的收藏页面
  toMyCollection: function() {
    var that = this
    wx.navigateTo({
      url: '../myCollection/myCollection',
    })
  },
  //获取个人信息
  getuserInfo: function () {
    var that = this
    if (app.globalData.userInfo.image != null) {
      if (app.globalData.userInfo.image.indexOf('http') == -1) {
        app.globalData.userInfo.image = that.data.baseurl + app.globalData.userInfo.image
      } else {
        app.globalData.userInfo.image = app.globalData.userInfo.image
      }
    }
    that.setData({
      realname: app.globalData.userInfo.realname,
      status: app.globalData.userInfo.status,
      img: app.globalData.userInfo.image
    })
   

  }
})