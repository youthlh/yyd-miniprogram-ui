const app = getApp();
const api = app.api;

Page({
  data: {
    selectFinishedTask: []
  },
  /**
   * 详情
   */
  selectTaskClick(event) {
    wx.navigateTo({
      url: `/pages/workbenchs/workbenchList/workbenchList?taskId=${event.currentTarget.dataset.taskid}&detailsShow=1`
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.selectTasksData();
  },

  /**
  * 数据赋值设置
  */
  selectTasksData() {
    wx.showLoading({
      mask: true,
      title: "loading...",
    });
    api("/task/selectFinishedTask", {
      data: {
        getAll: true,
      },
      method: "GET",
    })
      .then((res) => {
        this.setData({
          selectFinishedTask: res.data,
        });
        wx.hideLoading();
      })
      .catch(() => {
        this.setData({
          selectFinishedTask: [],
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