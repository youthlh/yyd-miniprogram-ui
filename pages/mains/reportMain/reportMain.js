const app = getApp();
const api = app.api;
const FileSystemManager = wx.getFileSystemManager()

Page({
  data: {
    dateYear: new Date().getFullYear(),// 默认时间
    reportMainList: [], // 任务报告数据集合
  },

  /**
   * 日期组件change
   */
  bindDateYearChange: function (e) {
    this.setData({
      dateYear: e.detail.value
    }, () => {
      this.selectReportsData();
    })
  },
  /**
   * 下载点击
   */
  selectReportClick(e) {
    wx.showLoading({
      mask: true,
      title: "loading...",
    });
    let data = e.currentTarget.dataset;
    app.downloadFile(`/ftpService/downloadFile?filePath=${data.reportpath}`)
      .then((res) => {
        wx.hideLoading();
        // 直接看分享或者自己保存
        wx.openDocument({
          filePath: res,
          fileType: "pdf",
          showMenu: true,
          success: function (res) {
            res;
            // wx.showToast({
            //   title: "分享",
            //   icon: "none",
            //   duration: 1500,
            //   mask: true, //显示透明蒙层，防止触摸穿透,
            // });
          }
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.selectReportsData();
  },

  /**
  * 数据赋值设置
  */
  selectReportsData() {
    wx.showLoading({
      mask: true,
      title: "loading...",
    });
    let parmes = {
      reportPeriodYear: this.data.dateYear
    };
    api("/personalreport/personalReports/miniList", {
      data: parmes,
      method: "GET",
    })
      .then((res) => {
        this.setData({
          reportMainList: res.data,
        })
        wx.hideLoading();
      })
      .catch(() => {
        this.setData({
          reportMainList: [],
        });
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
});