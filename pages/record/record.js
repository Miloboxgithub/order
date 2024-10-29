const app = getApp();
const  token= wx.getStorageSync('token');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tname:'',
    items: [{
      name:'会议室A',
        type: '班会',
        day: '9月29日',
        time: '9:00-10:00'
      },
      {
        name:'会议室B',
        type: '班会',
        day: '9月29日',
        time: '9:00-10:00'
      }, {
        name:'会议室C',
        type: '班会',
        day: '9月29日',
        time: '9:00-10:00'
      }
    ],
    shs:800
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.GetData()
  },
  GetData: function()
  {
    let that = this
    
    this.setData({
      items:[],
      tname:app.globalData.name
    })
    wx.request({
      url: 'https://ehuiyue.buteck.com/api/user/getreservationinfo',
      method:"GET",
      data:{
        reserved_by_name:that.data.tname
      },
      header:{
        Authorization:token
      },
      success:(res)=>{
        console.log(res.data.data.reservedinfo.reserved_info2s,'sss')
        let op = res.data.data.reservedinfo.reserved_info2s
        this.setData({
          shs:150*(op.length+1)
        })
        console.log(that.data.shs)
        let ttt =[]
        op.forEach(function(item,index){
          let t ={
            name:item.room_name,
            type:item.meetingtype,
            day:item.ymd,
            time : item.start_time.substring(0, 5)+'-'+item.end_time.substring(0, 5)
          }
          ttt.push(t)
        })
        that.setData({
          items:ttt
        })
      },
      fail: (err) =>{
        console.error('nono',err);
      }
    })
  },
  quxiao:function(e) {
    let that=this
    wx.showModal({
      title: '提示', // 提示的标题
      content: '您确定要取消预约吗', // 提示的内容
      showCancel: true, // 是否显示取消按钮
      cancelText: '取消', // 取消按钮的文字
      cancelColor: '#000000', // 取消按钮的文字颜色
      confirmText: '确定', //确定按钮的文字
      confirmColor: '#3CC51F', // 确定按钮的文字颜色
      success: function (res) {
        if (res.confirm) {
          
          console.log('用户点击了确定');
          // 执行一些操作
          const index = e.currentTarget.dataset.index; // 获取点击元素的索引
          that.PostQuxiao(index)
          let items = that.data.items; // 获取当前数据

          // 从数组中移除指定索引的元素
          items.splice(index, 1);

          // 更新页面数据
          that.setData({
            items: items
          });
          
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
  PostQuxiao(i){

    console.log(i,'quxiao',this.data.items[i])
    wx.request({
      url: 'https://ehuiyue.buteck.com/api/user/delreserve',
      method:'DELETE',
      header:{
        Authorization:token
      },
      data:{
        ymd:this.data.items[i].day,
        room_name:this.data.items[i].name,
        start_time:this.data.items[i].time.substring(0,5),
        end_time:this.data.items[i].time.substring(6,11),
        meeting_type:this.data.items[i].type,
        reserved_by_name:this.data.tname
      },
      success:(res)=>{
        console.log(res)
      },
      fail: (err) =>{
        console.error('nono',err);
      }
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    this.GetData()
    // 获取全局变量中的数据
    let sharedData = app.globalData.sharedData;
    console.log('sharedData:', sharedData);
    if(sharedData.key1){
      wx.showModal({
        title: '您已预定成功！', // 提示的标题
        showCancel: false, // 是否显示取消按钮
        cancelText: '取消', // 取消按钮的文字
        cancelColor: '#000000', // 取消按钮的文字颜色
        confirmText: '确定', //确定按钮的文字
        confirmColor: '#3CC51F', // 确定按钮的文字颜色
        success: function (res) {
        },
        fail: function (err) {
          console.error('调用失败：', err);
        }
      });
      app.globalData.sharedData.key1= 0
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