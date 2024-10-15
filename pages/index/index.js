// pages/playground/playground.js
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
        ed: 8
      },
      {
        time: '9:00-10:00',
        ke: 4,
        ed: 8
      },
      {
        time: '10:00-11:00',
        ke: 6,
        ed: 8
      },
      {
        time: '11:00-12:00',
        ke: 8,
        ed: 8
      },
      {
        time: '14:00-15:00',
        ke: 8,
        ed: 8
      },
      {
        time: '15:00-16:00',
        ke: 3,
        ed: 8
      },
      {
        time: '16:00-17:00',
        ke: 8,
        ed: 8
      },
      {
        time: '19:00-20:00',
        ke: 2,
        ed: 8
      },
      {
        time: '20:00-21:00',
        ke: 7,
        ed: 8
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  navigate: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    });
    const app = getApp();
    let v;
    let i = e.currentTarget.dataset.index
    i = parseInt(i)
    if (e.currentTarget.dataset.url == "/pages/order1/order1") {
      v = this.data.items[i].name
      //console.log(this.data.items[i] , "hhhhh")
    } else {
      v = this.data.kkk[i].time
      //console.log(this.data.kkk[i] , "hhhhh")
    }
    // 设置要传递的数据
    app.globalData.sharedData = {
      keys: v
    };
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