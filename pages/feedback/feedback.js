Page({
  data: {
    currentVersion: '1.0.0',
    updateLog: [
      { version: '1.0.0', date: '2024-10-24', details: '体验版本发布' }
    ]
  },

  onLoad: function() {
    // 获取小程序版本号，这里只是一个示例，实际中可能需要调用API获取
    const app = getApp();
    if (app.globalData.version) {
      this.setData({ currentVersion: app.globalData.version });
    }

    // 如果有更详细的更新日志数据，可以在这里设置
  },

  checkForUpdates: function() {
    // 检查更新逻辑
    wx.getUpdateManager().onCheckForUpdate(function(res) {
      if (res.hasUpdate) {
        wx.showModal({
          title: '发现新版本',
          content: '请前往微信小程序设置页进行更新',
          showCancel: false,
          confirmText: '确定',
          success: function() {
            // 引导用户去更新
            wx.navigateToMiniProgram({
              appId: '当前小程序的AppID',
              path: 'pages/index/index',
              extraData: {},
              envVersion: 'release'
            })
          }
        })
      } else {
        wx.showToast({
          title: '已是最新版本',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
});