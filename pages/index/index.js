const app = getApp();
const token = wx.getStorageSync('token');
const apiurl = app.globalData.apiurl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab1: true,
    tab2: false,
    time_items: [],
    items: [],
    kkk: [{
        time: '08:00-09:00',
        flag: false,
        status: 0,
      },
      {
        time: '09:00-10:00',
        status: 0,
        flag: false
      },
      {
        time: '10:00-11:00',
        status: 0,
        flag: false
      },
      {
        time: '11:00-12:00',
        status: 0,
        flag: false
      },
      {
        time: '12:00-13:00',
        status: 0,
        flag: false
      },
      {
        time: '13:00-14:00',
        status: 0,
        flag: false
      },
      {
        time: '14:00-15:00',
        status: 0,
        flag: false
      },
      {
        time: '15:00-16:00',
        status: 0,
        flag: false
      },
      {
        time: '16:00-17:00',
        status: 0,
        flag: false
      },
      {
        time: '17:00-18:00',
        status: 0,
        flag: false
      },
      {
        time: '18:00-19:00',
        status: 0,
        flag: false
      },
      {
        time: '19:00-20:00',
        status: 0,
        flag: false
      },
    ],
    ymd: '',
    lolo: false,
    hvh: 100,
    yue: false,
    types: [{
        v: '班会'
      }, {
        v: '学术交流'
      }, {
        v: '项目会议'
      }, {
        v: '团建'
      }, {
        v: '商务洽谈'
      },
      {
        v: '培训'
      },
      {
        v: '其他'
      }
    ],
    type: '',
    rem: true,
    bgheight: 75,
    droom: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.Get_time_items()
    setTimeout(() => {
      this.GetData1()
    }, 100);

    // this.getWeather()
    // 获取今天的日期
    let today = this.formatDate(new Date());
    // 更新数据
    let [y, m, d] = today.split('-');
    today = `${y}年${parseInt(m, 10)}月${parseInt(d, 10)}日`;
    this.setData({
      today: today
    });
  },
  dakai() {
    let tt = this.data.kkk
    let tans = []
    tt.forEach((i, k) => {
      if (i.flag) {
        tans.push(i.time)
      }
    })
    if (tans.length) {
      this.setData({
        yue: true,
        tans
      })
      //隐藏tabber
      this.getTabBar().setData({
        chans: !this.getTabBar().data.chans
      })
    } else {
      wx.showToast({
        title: '请选择时段',
        icon: 'none',
        duration: 1000 // 提示框显示的时间（毫秒）
      });
    }
  },
  chantype: function (e) {
    let op = e.currentTarget.dataset.index
    this.setData({
      type: this.data.types[op].v
    })
  },
  ququ() {
    this.setData({
      rem: !this.data.rem
    })
  },
  hideview() {
    this.setData({
      yue: false
    })
    //隐藏tabber
    this.getTabBar().setData({
      chans: false
    })
  },
  GetData1: function () {
    let that = this
    this.setData({
      items: [],
      lolo: true
    })
    wx.request({
      url: `${apiurl}/user/meetingroomnum`,
      method: "GET",
      header: {
        Authorization: token
      },
      data: {},
      success: (res) => {
        console.log('data1', res.data);
        let op = res.data.data.meetingroomnumoutput.meetingroom_nums
        let ttt = []
        op.forEach(function (item, index) {
          let t = {
            name: item.name,
            num: item.capacity,
            act: false
          }
          ttt.push(t)
        })
        ttt[0].act = true
        that.setData({
          items: ttt,
          lolo: false,
          hvh: 17 * op.length
        })
        this.checkRoomst(this.data.items[0].name)
        this.KongXian()
      },
      fail: (err) => {
        console.error('nono', err);
      }
    })

  },
  checkRoomst(e) {
    console.log(this.data.ymd, e)
    let kkk = this.data.kkk
    kkk.forEach((i, k) => {
      i.flag = false
    })
    this.setData({
      lolo: true,
      kkk,
      droom: e
    })
    let that = this
    wx.request({
      url: `${apiurl}/user/meetingroom`,
      method: "GET",
      header: {
        Authorization: token
      },
      data: {
        appointment_date: that.data.ymd,
        meetingroom_name: e
      },
      success: (res) => {
        console.log('checkst', res.data.data.SelectRoom.status);
        let st = res.data.data.SelectRoom.status
        let os = that.data.kkk
        for (let i = 0; i < 12; i++) {
          os[i].status = st[i]
        }
        this.setData({
          kkk: os
        })
        this.setData({
          lolo: false
        })
      },
      fail: (err) => {
        console.error('nono', err);
      }
    })
  },
  KongXian(e) {
    let tarr = this.data.time_items
    let rarr = this.data.items
    let that = this
    tarr.forEach((i, k) => {

      const date = i.fD
      let flgg = 0
      rarr.forEach((ii, kk) => {
        const rname = ii.name
        wx.request({
          url: `${apiurl}/user/meetingroom`,
          method: "GET",
          header: {
            Authorization: token
          },
          data: {
            appointment_date: date,
            meetingroom_name: rname
          },
          success: (res) => {
            // console.log(date, rname, res.data.data.SelectRoom.status);
            let st = res.data.data.SelectRoom.status
            for (let j = 0; j < 12; j++) {
              if (!st[j]) {
                break
              }
              if (j == 11) {
                flgg++
              }
            }
            if (flgg == rarr.length) {
              let karr = that.data.time_items
              karr.forEach((is, ks) => {
                if (ks == k) {
                  is.kong = true
                }

              })
              that.setData({
                time_items: karr
              })
            }
          },
          fail: (err) => {
            console.error('nono', err);
          }
        })
      })
    })
  },
  changeRoom(e) {
    let t = parseInt(e.currentTarget.dataset.index)
    let tt = this.data.items
    this.checkRoomst(tt[t].name)
    tt.forEach((item, index) => {
      item.act = false
      if (index == t) {
        item.act = true
      }
    })
    this.setData({
      items: tt
    })
  },
  yuyues() {
    let that = this
    if (this.data.type.length == 0) {
      wx.showToast({
        title: '请填写会议内容',
        icon: 'none',
        duration: 1200 // 提示框显示的时间（毫秒）
      });
    } else if (!this.data.rem) {
      wx.showToast({
        title: '请阅读会议室使用规定并勾选',
        icon: 'none',
        duration: 1200 // 提示框显示的时间（毫秒）
      });
    } else {
      wx.request({
        url: `${apiurl}/user/reserved`,
        method: "POST",
        header: {
          Authorization: token
        },
        data: {
          appointment_date: this.data.ymd,
          meetingroom_name: this.data.droom,
          alltime: this.data.tans,
          appointment_type: this.data.type
        },
        success: (res) => {
          console.log('yuyue', res.data.data);
          if (res.data.data.message == 'success') {
            app.globalData.sharedData = {
              key1: 1
            };
            wx.switchTab({
              url: '/pages/record/record',
            })
            that.hideview()
          } else {
            wx.showToast({
              title: '预约失败，请稍后再试',
              icon: 'none',
              duration: 1000 // 提示框显示的时间（毫秒）
            });
          }
        },
        fail: (err) => {
          console.error('nono', err);
        }
      })
    }
  },
  handleDescriptionInput(e) {
    this.setData({
      type: e.detail.value
    })
    console.log(this.data.type)
  },
  GetData2: function () {
    // let that = this
    // this.setData({
    //   kkk: [],
    //   lolo:true
    // })
    // wx.request({
    //   url: '  https://ehuiyue.buteck.com/api/user/getmeetingtime',
    //   method: "GET",
    //   header: {
    //     Authorization: token
    //   },
    //   data: {
    //     ymd: that.data.ymd
    //   },
    //   success: (res) => {
    //     console.log('data2', res.data.data.MeetingTimeStates);
    //     let op = res.data.data.MeetingTimeStates
    //     let ttt = []
    //     op.forEach(function (item, index) {
    //       let t = {
    //         time: item.start_time.substring(0, 5) + '-' + item.end_time.substring(0, 5),
    //         ke: item.re,
    //         ed: item.total,
    //         flag: false
    //       }
    //       ttt.push(t)
    //     })
    //     ttt = ttt.slice(0,-2)
    //     that.setData({
    //       kkk: ttt,
    //       lolo:false
    //     })
    //   },
    //   fail: (err) => {
    //     console.error('nono', err);
    //   }
    // })
  },
  Get_time_items: function () {
    let that = this
    let op = []
    let ed = app.globalData.futureDates
    ed.forEach(function (item, index) {

      let t = {
        flag: false,
        zou: that.convertWeekdayToZhouji(item.dayOfWeek),
        date: that.extractDay(item.date),
        fD: item.fD,
        kong: false
      }
      if (item.today) {
        t.flag = true;
        app.globalData.sharedData.ymd = t.fD;
        t.date = '今'
      }
      op.push(t)
    })
    //op[0].flag = true
    this.setData({
      time_items: op,
      timelen: ed.length
    })
    this.setData({
      ymd: app.globalData.sharedData.ymd
    })
  },
  convertWeekdayToZhouji(weekday) {
    const weekdayMap = {
      '星期一': '周一',
      '星期二': '周二',
      '星期三': '周三',
      '星期四': '周四',
      '星期五': '周五',
      '星期六': '周六',
      '星期日': '周日'
    };
    return weekdayMap[weekday] || weekday;
  },
  extractDay(dateString) {
    const parts = dateString.match(/(\d+)月(\d+)日/);
    if (parts && parts.length > 2) {
      return parseInt(parts[2], 10);
    }
    return dateString;
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
        ymd: this.data.ymd
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
        ymd: this.data.ymd
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
  changeFlag(e) {
    let i = e.currentTarget.dataset.index
    let to = this.data.items
    let roomname
    to.forEach((i, k) => {
      if (i.act) {
        roomname = i.name
      }
    })
    this.setData({
      ymd: this.data.time_items[i].fD
    })
    let [y, m, d] = this.data.ymd.split('-');
    let xymd = `${y}年${parseInt(m, 10)}月${parseInt(d, 10)}日`;
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
      time_items: op,
      xymd
    })

    setTimeout(() => {
      this.checkRoomst(roomname)
    }, 100);

  },
  getWeather(e) {
    let that = this
    // wx.request({
    //   url: 'https://apis.map.qq.com/ws/location/v1/ip',
    //   method: 'GET',
    //   data: {
    //       key: 'GU7BZ-7CHKZ-VTMX5-TRGXN-PUBYT-XNFKE', // 替换为您的实际密钥
    //       output: 'json'
    //   },
    //   success(ress) {
    //     console.log(ress)
    //       const { latitude, longitude } = ress.data.result.location;


    const latitude = 22.69681
    const longitude = 114.401147
    const key = '9ec4b623160141459b16b5d334f5140e'
    wx.request({
      url: `https://geoapi.qweather.com/v2/city/lookup?location=${longitude},${latitude}&key=${key}`,
      success(res) {
        console.log(res.data.location[0].adm1); //市
        console.log(res.data.location[0].name); //qu
        that.setData({
          shi: res.data.location[0].adm1,
          qu: res.data.location[0].name
        })
        wx.request({
          url: `https://devapi.qweather.com/v7/weather/now?location=${longitude},${latitude}&key=${key}`,
          success(res) {
            console.log(res.data.now);
            that.setData({
              icon: res.data.now.icon,
              tianqi: res.data.now.text,
              temp: res.data.now.temp,
              fengxiang: res.data.now.windDir, //fengxiang 
              dengji: res.data.now.windScale,
              humi: res.data.now.humidity,
              pa: res.data.now.pressure,
              see: res.data.now.vis,
              jiangshui: res.data.now.precip,
              time: res.data.updateTime.slice(11, 16)
            })
            wx.request({
              url: `https://devapi.qweather.com/v7/indices/1d?type=1,2,3,4,5&location=${longitude},${latitude}&key=${key}`,
              success(res) {
                console.log(res);
                that.setData({
                  AQI: res.data.daily[4].category,
                  jiance: res.data.daily[0].category,
                  PM: res.data.daily[1].category,
                })
              }
            })
          }
        })
      }

    })
    // }
    // });


  },
  formatDate: function (date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  },
  navigates: function (e) {
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    this.GetData1()
    this.Get_time_items()
    // this.GetData2()
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