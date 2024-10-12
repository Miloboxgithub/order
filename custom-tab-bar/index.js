Component({
  data: {
    chans:false,
    selected:0,
    color: "#dbdbdb",
    selectedColor: " #007AFF",
    list: [{
      "pagePath": "/pages/index/index",
      "iconPath": "/img/1.png",
      "selectedIconPath": "/img/11.png",
      "text": "首页"
    } , {
      "pagePath": "/pages/record/record",
      "iconPath": "/img/2.png",
      "selectedIconPath": "/img/22.png",
      "text": "记录"
    }
    , {
      "pagePath": "/pages/person/person",
      "iconPath": "/img/3.png",
      "selectedIconPath": "/img/33.png",
      "text": "个人"
    }]
  },
  attached() {
  },
  methods: {
    
    switchTab(e) {
      //console.log(e)
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  },
})