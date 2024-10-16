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
  name:'会议室1',
  items:[
    {time:'8：00~9：00',p:'' ,flag:false},
    {time:'9：00~10：00',p:'A老师',flag:false},
    {time:'10：00~11：00',p:'B老师',flag:false},
    {time:'11：00~12：00',p:'C老师',flag:false},
    {time:'14：00~15：00',p:'D老师',flag:false},
    {time:'15：00~16：00',p:'',flag:false},
    {time:'16：00~17：00',p:'',flag:false},
    {time:'19：00~20：00',p:'',flag:false},
    {time:'20：00~21：00',p:'',flag:false},
  ],
  dian:'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  navigate: function (e) {
    wx.navigateTo({url: e.currentTarget.dataset.url});
  },
  choices: function(e){
    let that =this
    let ff =false
    console.log(e)
    let i = e.currentTarget.dataset.index
    let op = this.data.items
    op.forEach(function(item,index){
      if(index==i){
        item.flag=!item.flag
      }
      if(item.flag){
        ff=true
      }
    })
    if(ff){
      this.setData({
        dian:'auto'
      })
    }
    else{
        this.setData({
          dian:'none'
        })
    }
    this.setData({
      items:op
    })
  },
  changeFlag(e) {
    let i = e.currentTarget.dataset.index
    let op = this.data.time_items
    op.forEach(function (item, index) {
      if (index == i) {
        item.flag = true
      } else {
        item.flag = false
      }
    })
    this.setData({
      time_items: op
    })
  },
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 获取全局变量中的数据
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