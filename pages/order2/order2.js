// pages/order1/order1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time_items:[{
      flag:true,
      zou:'周一',
      date:'9月30日'
    },
    {
      flag:false,
      zou:'周二',
      date:'10月1日'
    }
    ,
    {
      flag:false,
      zou:'周三',
      date:'10月2日'
    }
    ,
    {
      flag:false,
      zou:'周四',
      date:'10月3日'
    }
    ,
    {
      flag:false,
      zou:'周五',
      date:'10月4日'
    }
    ,
    {
      flag:false,
      zou:'周六',
      date:'10月5日'
    }
    ,
    {
      flag:false,
      zou:'周日',
      date:'10月6日'
    }
  ],
  name:'11：00~12：00',
  items:[
    {time:'会议室1 （30人）',p:''},
    {time:'会议室2 （10人）',p:'A老师'},
    {time:'会议室3 （20人）',p:'B老师'},
    {time:'会议室4 （10人）',p:'C老师'},
    {time:'会议室5 （20人）',p:'D老师'},
    {time:'会议室6 （30人）',p:''},
    {time:'会议室7 （40人）',p:''},
    {time:'会议室8 （10人）',p:''},
    {time:'会议室9 （20人）',p:''},
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  navigate: function (e) {
    wx.navigateTo({url: e.currentTarget.dataset.url});
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
    const app = getApp();
    const sharedData = app.globalData.sharedData;

    console.log('sharedData:', sharedData);
    this.setData({
      name:sharedData.keys
    })
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