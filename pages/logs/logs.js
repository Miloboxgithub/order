const app = getApp();
const apiurl = app.globalData.apiurl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:'',
    password:'',
    rem:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let number = wx.getStorageSync('number');
    let password = wx.getStorageSync('password');
    this.setData({
      number,
      password
    })
  },
  logins: function(e){
    let code = wx.getStorageSync('code');
    let wechatname
    let that = this
    //console.log(this.data.number,'|',this.data.password)
    wx.request({
      url: `${apiurl}/login/login`,
      method:'POST',
      data:{
        sno:that.data.number,
        name:that.data.password,
        // code:code,
        // wechatname:wechatname
      },
      success:(res)=>{
        console.log('yesyes',res.data);
        
        if(res.data.data.message=='Success'){
          wx.showToast({
            title: '登录成功!',
            icon: 'none', // 图标类型，可选值为 "success", "loading", "none"
            duration: 1000, // 显示时间，单位为毫秒，默认为 1500 毫秒
            mask: false, // 是否显示透明蒙层，防止触摸穿透
          });
          app.globalData.name= that.data.password
          app.globalData.token=res.data.data.token
          wx.setStorageSync('name', that.data.password);
          wx.setStorageSync('token', res.data.data.token);
          wx.setStorageSync('number', that.data.number);
          wx.setStorageSync('password', that.data.password);
          setTimeout(() => {
            wx.switchTab({
              url: e.currentTarget.dataset.url,
            })
          }, 1000);
          //console.log(app.globalData.token)
      }
      else{
        wx.showToast({
          title: '请填写正确信息~',
          icon: 'none', // 图标类型，可选值为 "success", "loading", "none"
          duration: 1000, // 显示时间，单位为毫秒，默认为 1500 毫秒
          mask: false, // 是否显示透明蒙层，防止触摸穿透
        });
      }
      },
      fail: (err) =>{
        console.error('nono',err);
      }
    })
    // wx.getUserProfile({
    //   desc: '用于完善个人资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    //   success: res => {
    //     //console.log('用户信息：', res.userInfo);
    //     wechatname = res.userInfo.nickName
    //     // 这里可以将用户信息发送到服务器进行进一步处理


    //   },
    //   fail: err => {
    //     console.error('获取用户信息失败：', err);
    //   }
    // });


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
  rems:function(){
    this.setData({
      rem:!this.data.rem
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