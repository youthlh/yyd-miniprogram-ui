const app = getApp();
const api = app.api;

Page({
  data: {
    functionalDevice: []
  },
  /**
   * 签名
   */
  signature() {
    wx.navigateTo({
      url: '/pages/mains/signature/signature'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opaction) {
    wx.setNavigationBarTitle({
      title: "结算信息"
    })
    this.selectMyInfo(opaction.personalUserId)
  },

  /**
   * 请求数据集
   */
  selectMyInfo(data) {
    let params = {
      personalUserId: data
    }
    api('/settlement/personalSettlementInformation', {
      data: params,
      method: 'GET'
    }).then((res) => {
      this.setData({
        functionalDevice: res.data
      })
    })
  },
  /**
   * 查看任务
   */
  viewingTasks(event) {
    wx.navigateTo({
      url: `/pages/workbenchs/workbenchList/workbenchList?taskId=${event.currentTarget.dataset.taskid}&detailsShow=1&activityApproveRecordId=${event.currentTarget.dataset.activityapproverecordid}`
    });
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