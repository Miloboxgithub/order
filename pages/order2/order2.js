const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time_items: [{
        flag: true,
        zou: '周一',
        date: '9月30日'
      },
      {
        flag: false,
        zou: '周二',
        date: '10月1日'
      },
      {
        flag: false,
        zou: '周三',
        date: '10月2日'
      },
      {
        flag: false,
        zou: '周四',
        date: '10月3日'
      },
      {
        flag: false,
        zou: '周五',
        date: '10月4日'
      },
      {
        flag: false,
        zou: '周六',
        date: '10月5日'
      },
      {
        flag: false,
        zou: '周日',
        date: '10月6日'
      }
    ],
    name: [],
    items: [{
        time: '会议室1 （30人）',
        p: ''
      },
      {
        time: '会议室2 （10人）',
        p: 'A老师'
      },
      {
        time: '会议室3 （20人）',
        p: 'B老师'
      },
      {
        time: '会议室4 （10人）',
        p: 'C老师'
      },
      {
        time: '会议室5 （20人）',
        p: 'D老师'
      },
      {
        time: '会议室6 （30人）',
        p: ''
      },
      {
        time: '会议室7 （40人）',
        p: ''
      },
      {
        time: '会议室8 （10人）',
        p: ''
      },
      {
        time: '会议室9 （20人）',
        p: ''
      },
    ],
    isSelect: false, //展示类型？
    ymd: '',
    len:'',
    lolo:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    const sharedData = app.globalData.sharedData;

    console.log('sharedData:', sharedData);
    this.setData({
      name: sharedData.arr,
      len:sharedData.arr.length
    })
    this.Get_time_items()
    setTimeout(() => {
      this.GetData()
    }, 100);
    
  },
  GetData: function () {
    let that = this
    this.setData({
      items: [],
      lolo:true
    })
    wx.request({
      url: 'https://ehuiyue.buteck.com/api/user/meetingtime',
      method: "GET",
      header: {
        Authorization: app.globalData.token
      },
      data: {
        ymd: that.data.ymd,
        all_time: that.data.name
      },
      success: (res) => {
        //[0].select_time_statuss
        //console.log('aifbhdsbfds',res.data.data.meeting_time)
        let op = res.data.data.meeting_time
        let ttt = []
        op.forEach(function (item, index) {
          let cg = item.select_time_statuss
          let t = {}
          cg.forEach(function (ite, ind) {
            t = {
              time: ite.room_name,
              capacity: ite.capacity,
              p: ite.reserved_by_name
            }
            if (ttt.length) {
              let fff = 1
              ttt.forEach(function (its, ins) {
                if (its.time === t.time) {
                  fff = 0
                  if (!its.p) {
                    ttt[ins] = t
                  }
                }
              })
              if (fff) ttt.push(t)
            } else {
              ttt.push(t)
            }
          })

        })
        that.setData({
          items: ttt,
          lolo:false
        })
      },
      fail: (err) => {
        console.error('nono', err);
      }
    })
  },
  Get_time_items: function () {
    let that = this
    let op = []
    let ed = app.globalData.futureDates
    let ymds = app.globalData.sharedData.ymd
    ed.forEach(function (item, index) {
      let t = {
        flag: false,
        zou: item.dayOfWeek,
        date: item.date,
        fD: item.fD
      }
      if(t.fD==ymds){
        t.flag=true
        that.setData({
          ymd: t.fD
        })
      }
      op.push(t)
    })
    //op[0].flag = true
    this.setData({
      time_items: op,
      timelen:ed.length
    })
  },
  navigate: function (e) {
    let i = e.currentTarget.dataset.index
    app.globalData.submit = {
      ymd: this.data.ymd,
      room_name: this.data.items[i].time,
      ts: this.data.name,
    }
    wx.navigateTo({
      url: e.currentTarget.dataset.url
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

  },
  //点击控制下拉框的展示、隐藏
  select: function () {
    var isSelect = this.data.isSelect
    this.setData({
      isSelect: !isSelect
    })
  },
  //点击下拉框选项，选中并隐藏下拉框
  getType: function (e) {
    console.log(e)
    let value = e.currentTarget.dataset.type
    console.log(value)
    this.setData({
      type: value,
      // isSelect: false,
    })
  },
  changeFlag(e) {
    let i = e.currentTarget.dataset.index
    this.setData({
      ymd: this.data.time_items[i].fD
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