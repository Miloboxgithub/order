const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab1: true,
    tab2: false,
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
    items: [{
        name: '会议室1',
        num: 30,
        ke: 6,
        ed: 9
      },
      {
        name: '会议室2',
        num: 20,
        ke: 9,
        ed: 9
      },
      {
        name: '会议室3',
        num: 30,
        ke: 6,
        ed: 9
      },
      {
        name: '会议室4',
        num: 30,
        ke: 6,
        ed: 9
      },
      {
        name: '会议室5',
        num: 30,
        ke: 6,
        ed: 9
      },
      {
        name: '会议室6',
        num: 30,
        ke: 6,
        ed: 9
      },
      {
        name: '会议室7',
        num: 30,
        ke: 6,
        ed: 9
      },
      {
        name: '会议室8',
        num: 30,
        ke: 6,
        ed: 9
      }
    ],
    kkk: [{
        time: '8:00-9:00',
        ke: 8,
        ed: 8,
        flag: false
      },
      {
        time: '9:00-10:00',
        ke: 4,
        ed: 8,
        flag: false
      },
      {
        time: '10:00-11:00',
        ke: 6,
        ed: 8,
        flag: false
      },
      {
        time: '11:00-12:00',
        ke: 8,
        ed: 8,
        flag: false
      },
      {
        time: '14:00-15:00',
        ke: 8,
        ed: 8,
        flag: false
      },
      {
        time: '15:00-16:00',
        ke: 3,
        ed: 8,
        flag: false
      },
      {
        time: '16:00-17:00',
        ke: 8,
        ed: 8,
        flag: false
      },
      {
        time: '19:00-20:00',
        ke: 2,
        ed: 8,
        flag: false
      },
      {
        time: '20:00-21:00',
        ke: 7,
        ed: 8,
        flag: false
      },
    ],
    ymd: '',
    lolo:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.Get_time_items()
    setTimeout(() => {
      this.GetData1()
    this.GetData2()
    }, 100);
    this.getWeather()
    // 获取今天的日期
    const today = this.formatDate(new Date());
    // 更新数据
    this.setData({
      today: today
    });
  },

  GetData1: function () {
    let that = this
    this.setData({
      items: [],
      lolo:true
    })
    console.log(this.data.ymd)
    wx.request({
      url: 'https://ehuiyue.buteck.com/api/user/getmeetingroom',
      method: "GET",
      header: {
        Authorization: app.globalData.token
      },
      data: {
        ymd: that.data.ymd
      },
      success: (res) => {
        console.log('data1', res.data);
        let op = res.data.data.meeting_room.meetingroomnums
        let ttt = []
        op.forEach(function (item, index) {
          let t = {
            name: item.roomname,
            ke: item.re,
            ed: item.total,
            num: item.capacity
          }
          ttt.push(t)
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
  GetData2: function () {
    let that = this
    this.setData({
      kkk: [],
      lolo:true
    })
    wx.request({
      url: '  https://ehuiyue.buteck.com/api/user/getmeetingtime',
      method: "GET",
      header: {
        Authorization: app.globalData.token
      },
      data: {
        ymd: that.data.ymd
      },
      success: (res) => {
        console.log('data2', res.data.data.MeetingTimeStates);
        let op = res.data.data.MeetingTimeStates
        let ttt = []
        op.forEach(function (item, index) {
          let t = {
            time: item.start_time.substring(0, 5) + '-' + item.end_time.substring(0, 5),
            ke: item.re,
            ed: item.total,
            flag: false
          }
          ttt.push(t)
        })
        that.setData({
          kkk: ttt,
          lolo:false
        })
      },
      fail: (err) => {
        console.error('nono', err);
      }
    })
  },
  Get_time_items: function () {
    let that =this
    let op = []
    let ed = app.globalData.futureDates
    ed.forEach(function (item, index) {
      
      let t = {
        flag: false,
        zou: item.dayOfWeek,
        date: item.date,
        fD: item.fD
      }
      if(item.today){t.flag=true; app.globalData.sharedData.ymd = t.fD}
      op.push(t)
    })
    //op[0].flag = true
    this.setData({
      time_items: op
    })
    this.setData({
      ymd:  app.globalData.sharedData.ymd 
    })
  },
  navigate: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    });
    let i = e.currentTarget.dataset.index
    i = parseInt(i)
    if (e.currentTarget.dataset.url == "/pages/order1/order1") {
      let v;
      v = this.data.items[i].name
      // 设置要传递的数据
      app.globalData.sharedData = {
        keys: v,
        ymd:this.data.ymd
      };
    } else {
      let v = []
      this.data.kkk.forEach(function (item, index) {
        if (item.flag) {
          v.push(item.time)
        }
      })
      app.globalData.sharedData = {
        arr: v,
        ymd:this.data.ymd
      };
    }

  },
  choices: function (e) {
    let i = e.currentTarget.dataset.index
    let op = this.data.kkk
    op.forEach(function (item, index) {
      if (index == i) {
        item.flag = !item.flag
      }
    })
    this.setData({
      kkk: op
    })
  },
  changeTitle: function (newTitle) {
    wx.setNavigationBarTitle({
      title: newTitle,
      success: function (res) {
        // 成功更改标题
      },
      fail: function (err) {
        // 更改标题失败
        console.error('更改标题失败：', err);
      }
    });
  },
  tabtab(e) {
    if (e.currentTarget.dataset.id == 1) {
      this.setData({
        tab1: true,
        tab2: false
      })
      this.changeTitle('首页');
    } else {
      this.setData({
        tab1: false,
        tab2: true
      })
      this.changeTitle('会议室预约时段');
    }
  },
  changeFlag(e) {
    let i = e.currentTarget.dataset.index
    this.setData({
      ymd: this.data.time_items[i].fD
    })
    // console.log(this.data.ymd)
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
      this.GetData1()
      this.GetData2()
    }, 100);

  },
  getWeather(e){
    let that=this
    wx.getLocation({
        type: 'wgs84',
        success (res) {
         console.log(res);
          const latitude = res.latitude
          const longitude = res.longitude
          const key='9ec4b623160141459b16b5d334f5140e'
          wx.request({
            url:`https://geoapi.qweather.com/v2/city/lookup?location=${longitude},${latitude}&key=${key}`,
            success(res){
                console.log(res.data.location[0].adm1);//市
                console.log(res.data.location[0].name);//qu
                that.setData({
                    shi:res.data.location[0].adm1,
                    qu:res.data.location[0].name
                })
                wx.request({
                  url: `https://devapi.qweather.com/v7/weather/now?location=${longitude},${latitude}&key=${key}`,
                  success(res){
                      console.log(res.data.now);
                      that.setData({
                        icon:res.data.now.icon,
                        tianqi:res.data.now.text,
                        temp:res.data.now.temp,
                        fengxiang:res.data.now.windDir,//fengxiang 
                        dengji:res.data.now.windScale,
                        humi:res.data.now.humidity,
                        pa:res.data.now.pressure,
                        see:res.data.now.vis,
                        jiangshui:res.data.now.precip,
                        time:res.data.updateTime.slice(11,16)                         
                      })
                      wx.request({
                        url:`https://devapi.qweather.com/v7/indices/1d?type=1,2,3,4,5&location=${longitude},${latitude}&key=${key}`,
                        success(res){
                            console.log(res);
                            that.setData({
                                AQI:res.data.daily[4].category,
                                jiance:res.data.daily[0].category,
                                PM:res.data.daily[1].category,
                              })
                        }
                      })
                  }
                })
            }
            
          })
        },

    })
  },
  formatDate: function(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
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
    this.GetData1()
    this.GetData2()
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