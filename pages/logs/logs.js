const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:'13923420245',
    password:'王培正',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  logins: function(e){
    let that = this
    //console.log(this.data.number,'|',this.data.password)
    wx.request({
      url: 'http://10.151.2.183:8085/login/login',
      method:'POST',
      data:{
        number:that.data.number,
        name:that.data.password
      },
      success:(res)=>{
        console.log('yesyes',res.data);
        if(res.data.message=='sql: no rows in result set'){
          wx.showToast({
            title: '请填写正确信息~',
            icon: 'none', // 图标类型，可选值为 "success", "loading", "none"
            duration: 1000, // 显示时间，单位为毫秒，默认为 1500 毫秒
            mask: false, // 是否显示透明蒙层，防止触摸穿透
          });
        }
        if(res.data.message==''){
          wx.showToast({
            title: '登录成功!',
            icon: 'none', // 图标类型，可选值为 "success", "loading", "none"
            duration: 1000, // 显示时间，单位为毫秒，默认为 1500 毫秒
            mask: false, // 是否显示透明蒙层，防止触摸穿透
          });
          setTimeout(() => {
            wx.switchTab({
              url: e.currentTarget.dataset.url,
            })
          }, 1000);
          app.globalData.name= that.data.password
          
      }
      },
      fail: (err) =>{
        console.error('nono',err);
      }
    })

  },
  input1:function(e){
    this.setData({
      number:e.detail.value
    })
  },
  input2:function(e){
    this.setData({
      password:e.detail.value
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