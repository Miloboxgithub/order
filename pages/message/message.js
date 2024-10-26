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
    ymd: '',
    name: '',
    st: '',
    et: '',
    rname: '',
    phone: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //this.PostData()
    let exe = app.globalData.submit
    console.log(exe.ts, 'zuo')
    this.setData({
      ymd: exe.ymd,
      name: exe.room_name,
      rname:app.globalData.name
    })
  },
  PostData: function (e) {
    let urls = e.currentTarget.dataset.url
    let that = this
    this.setData({
      items: []
    })
    let exe = app.globalData.submit
    let ll =exe.ts.length-1
    for(let i=0;i<=ll;i++){
      this.setData({
        st: exe.ts[i].substring(0, 5),
        et: exe.ts[i].substring(6, 11)
      })
    wx.request({
      url: 'https://ehuiyue.buteck.com/api/user/reserved',
      method: "POST",
      header: {
        Authorization: app.globalData.token
      },
      data: {
        ymd: that.data.ymd,
        room_name: that.data.name,
        start_time: that.data.st,
        end_time: that.data.et,
        reserved_by_name: that.data.rname,
        reserved_by_phone: that.data.phone,
        meetingtype: that.data.type
      },
      success: (res) => {
        console.log(res.data.data.message,'sdsdsdsdsds')
        if(res.data.data.message=='Success')
        that.navigate(urls)
        else{
          wx.showToast({
            title: '请填写正确信息~',
            icon: 'none', // 图标类型，可选值为 "success", "loading", "none"
            duration: 1000, // 显示时间，单位为毫秒，默认为 1500 毫秒
            mask: false, // 是否显示透明蒙层，防止触摸穿透
          });
        }
      },
      fail: (err) => {
        console.error('nono', err);
      }
    })
  }
  },
  navigate: function (e) {
    app.globalData.sharedData = {
      key1: 1
    };
    wx.switchTab({
      url: e,
    })
  },
  chantype: function (e) {
    console.log(e.currentTarget.dataset.index)
    let op = e.currentTarget.dataset.index
    this.setData({
      type: this.data.types[op].v
    })
  },
  input1:function(e){
    this.setData({
      rname:e.detail.value
    })
  },
  input2:function(e){
    this.setData({
      phone:e.detail.value
    })
  },
  input3:function(e){
    this.setData({
      type:e.detail.value
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