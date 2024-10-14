// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [{
      v: '班会'
    }, {
      v: '学术交流'
    }, {
      v: '演唱会排练'
    }, {
      v: '团建'
    }],
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  navigate: function (e) {
    wx.switchTab({
      url: e.currentTarget.dataset.url,
    })
    const app = getApp();

    // 设置要传递的数据
    app.globalData.sharedData = {
      key1: 1
    };
  },
  chantype: function (e) {
    console.log(e.currentTarget.dataset.index)
    let op = e.currentTarget.dataset.index
    this.setData({
      type: this.data.types[op].v
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})