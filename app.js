// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    this.GetTime()
    // console.log(this.globalData.futureDates)
  },
  GetTime(){
    const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const futureDates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i); // 设置为当前日期加上i天

      const year = date.getFullYear(); // 获取年份
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 获取月份（0-11），所以需要加1并格式化
      const day = date.getDate().toString().padStart(2, '0'); // 获取日并格式化
      const formattedDate = `${month}月${day}日`; // 格式化日期
      const fD = `${year}-${month}-${day}`; // 格式化日期
      const dayOfWeek = daysOfWeek[date.getDay()]; // 获取星期几

      futureDates.push({
        date: formattedDate,
        dayOfWeek: dayOfWeek,
        fD:fD
      }); }
      this.globalData.futureDates=futureDates
  },
  globalData: {
      sharedData: {
        key1:0,
        keys:'',
        arr:[],
        ymd:'',
      },
      name:'无名',
      futureDates:[],
      submit:{
        
      },
      token:''
  }
})
