const app = getApp();
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
    type: '',
    ymd:'',
    name:'',
    st:'',
    et:'',
    rname:'',
    phone:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //this.PostData()
    let exe=app.globalData.submit
    this.setData({
      ymd:exe.ymd,
      name:exe.room_name,
      st:exe.ts.substring(0,5),
      et:exe.ts.substring(6)
    })
  },
  PostData: function()
  {
    let that = this
    this.setData({
      items:[]
    })
    wx.request({
      url: 'http://10.151.2.183:8085/user/reserved',
      method:"POST",
      data:{
        ymd:that.data.ymd,
        room_name:that.data.name,
        start_time:that.data.st,
        end_time:that.data.et,
        reserved_by_name:that.data.rname,
        reserved_by_phone:that.data.phone,
        meetingtype:that.data.type
      },
      success:(res)=>{
        console.log(res)
        that.navigate()
      },
      fail: (err) =>{
        console.error('nono',err);
      }
    })
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