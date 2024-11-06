const app = getApp();
const  token= wx.getStorageSync('token');
const apiurl = app.globalData.apiurl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tname:'',
    items: [
    ],
    itemsed: [
    ],
    shs:800,
    yuyue:[{t:'当前预约',act:true},{t:'历史预约',act:false}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.GetData()
  },
  GetData: function(today)
  {
    let that = this
    
    this.setData({
      items:[],
      tname:app.globalData.name,
      // lolo:true
    })
    wx.request({
      url: `${apiurl}/user/getreservationinfo`,
      method:"GET",
      data:{
      },
      header:{
        Authorization:token
      },
      success:(res)=>{
        console.log(res.data.data.reservedinfo.reserved_info2s,'sss')
        let op = res.data.data.reservedinfo.reserved_info2s
        this.setData({
          shs:170*(op.length+1)
        })
        console.log(that.data.shs)
        let ttt =[]
        let sss =[]
        op.forEach(function(item,index){
          let ff = that.compareDates(item.appointment_date,today)
          
          let [y, m, d] = item.appointment_date.split('-');
          let td = `${y}年${parseInt(m, 10)}月${parseInt(d, 10)}日`;
          let t ={
            name:item.meetingroom_name,
            type:item.appointment_type,
            day:td,
            date:item.appointment_date,
            time : item.appointment_time,
            act:false,
            status:item.status
          }
          if(ff!=-1&&t.status==1)
          ttt.push(t)
          else sss.push(t)
        })
        that.setData({
          items:ttt.reverse(),
          itemsed:sss.reverse(),
          lolo:false
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
  changey(e){
    let i = e.currentTarget.dataset.index
    let tt = this.data.yuyue
    if(i){
      tt[1].act=true
      tt[0].act=false
    }
    else{
      tt[0].act=true
      tt[1].act=false
    }
    this.setData({
      yuyue:tt
    })
  },
  PostQuxiao(i){
    let that = this
    console.log(i,'quxiao',this.data.items[i])
    wx.request({
      url: `${apiurl}/user/calreserve`,
      method:'POST',
      header:{
        Authorization:token
      },
      data:{
        appointment_date:this.data.items[i].date,
        meetingroom_name:this.data.items[i].name,
        appointment_time:this.data.items[i].time,
      },
      success:(res)=>{
        console.log(res.data)
        that.GetData()
      },
      fail: (err) =>{
        console.error('nono',err);
      }
    })
  },
  changeAct(e){
    let i = e.currentTarget.dataset.index
    let tt=this.data.itemsed
    tt[i].act=true
    this.setData({
      itemsed:tt
    })
  },
  hideModal(){
    let tt =this.data.items
    tt.forEach((i,k)=>{
      i.act=false
    })
    this.setData({
      items:tt
    })
  },
  delrecord(e){
    let that = this
let i = e.currentTarget.dataset.index
wx.request({
  url: `${apiurl}/user/delreserve`,
  method:'DELETE',
  header:{
    Authorization:token
  },
  data:{
    appointment_date:this.data.itemsed[i].date,
    meetingroom_name:this.data.itemsed[i].name,
    appointment_time:this.data.itemsed[i].time,
  },
  success:(res)=>{
    console.log(res.data,'del')
    that.GetData()
    setTimeout(() => {
      wx.showToast({
        title: '删除成功',
        icon: 'none',
        duration: 500 // 提示框显示的时间（毫秒）
      });
    }, 1000);
    
  },
  fail: (err) =>{
    console.error('nono',err);
  }
})

  },
  navigate: function (e) {
    wx.switchTab({
      url: e.currentTarget.dataset.url,
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
        // 获取今天的日期
        let today = this.formatDate(new Date());
    this.GetData(today)
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
  formatDate: function(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  },
  compareDates(dateStr1, dateStr2) {
    // 将日期字符串转换为 Date 对象
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
  
    // 比较两个日期
    if (date1 > date2) {
      return 1; // date1 更大
    } else if (date1 < date2) {
      return -1; // date2 更大
    } else {
      return 0; // 两个日期相同
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