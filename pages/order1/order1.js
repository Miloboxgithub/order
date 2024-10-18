const app = getApp();
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
  dian:'none',
  ymd:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取全局变量中的数据
    
    const sharedData = app.globalData.sharedData;

    // console.log('sharedData:', sharedData);
    this.setData({
      name:sharedData.keys
    })
    this.GetData()
    this.Get_time_items()
  },
  GetData: function()
  {
    let that = this
    this.setData({
      items:[]
    })
    wx.request({
      url: 'http://10.151.2.183:8085/user/meetingroom',
      method:"GET",
      data:{
        ymd:that.data.ymd,
        room_name:that.data.name
      },
      success:(res)=>{
        console.log(res.data.data.SelectRoom.select_room_statuss)
        let op = res.data.data.SelectRoom.select_room_statuss
        let ttt =[]
        op.forEach(function(item,index){
          let t ={
            time : item.start_time.substring(0, 5)+'-'+item.end_time.substring(0, 5),
            p : item.reserved_by_name,
            flag:false
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
  Get_time_items:function(){
    let op =[]
    let ed = app.globalData.futureDates
    console.log(ed)
    ed.forEach(function(item,index){
      let t={
        flag:false,
        zou:item.dayOfWeek,
        date:item.date,
        fD:item.fD
      }
      op.push(t)
    })
    op[0].flag=true
    this.setData({
      time_items:op
    })
  },
  navigate: function (e) {
    wx.navigateTo({url: e.currentTarget.dataset.url});
  },
  forbit: function(){
    wx.showToast({
      title: '这个点已经有人约了哦~',
      icon: 'none', // 图标类型，可选值为 "success", "loading", "none"
      duration: 1000, // 显示时间，单位为毫秒，默认为 1500 毫秒
      mask: false, // 是否显示透明蒙层，防止触摸穿透
    });
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
    this.setData({
      ymd:this.data.time_items[i].fD
    })
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
    setTimeout(() => {
      this.GetData()
    }, 100);

  },
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