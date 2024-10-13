// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  navigate: function (e) {
    wx.navigateTo({url: e.currentTarget.dataset.url});
  },
  wei: function(){
    wx.showModal({
      title: '提示', // 提示的标题
      content: '该功能板块未开发', // 提示的内容
      showCancel: true, // 是否显示取消按钮
      cancelText: '取消', // 取消按钮的文字
      cancelColor: '#000000', // 取消按钮的文字颜色
     confirmText: '确定', //确定按钮的文字
      confirmColor: '#3CC51F', // 确定按钮的文字颜色
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击了确定');
          // 执行一些操作
        } else if (res.cancel) {
          console.log('用户点击了取消');
          // 执行其他操作
        }
      },
      fail: function (err) {
        console.error('调用失败：', err);
      }
    });
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
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 2
    })
  }
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