// pages/playground/playground.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab1:true,
    tab2:false,
    items:[{
      name:'会议室1',
      num:30,
      ke:6,
      ed:9
    },
    {
      name:'会议室2',
      num:20,
      ke:9,
      ed:9
    },
    {
      name:'会议室3',
      num:30,
      ke:6,
      ed:9
    },
    {
      name:'会议室4',
      num:30,
      ke:6,
      ed:9
    },
    {
      name:'会议室5',
      num:30,
      ke:6,
      ed:9
    },
    {
      name:'会议室6',
      num:30,
      ke:6,
      ed:9
    },
    {
      name:'会议室7',
      num:30,
      ke:6,
      ed:9
    },
    {
      name:'会议室8',
      num:30,
      ke:6,
      ed:9
    }
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  tabtab(e){
    if(e.currentTarget.dataset.id==1){
      this.setData({
        tab1:true,
        tab2:false
      })
    }
    else{
      this.setData({
        tab1:false,
        tab2:true
      })
    }
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
      selected: 0
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