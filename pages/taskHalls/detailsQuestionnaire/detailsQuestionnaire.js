//  任务大厅  taskHall 
const app = getApp();
const api = app.api;

Page({
  data: {
    questionnaireTemplate: {},// 模版参数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opaction) {
    this.selectTasksData(opaction.questionnaireid)
  },

  /**
  * 数据赋值设置
  */
  selectTasksData(data) {
    wx.showLoading({
      mask: true,
      title: "loading...",
    });
    api(`/questionnaire/questionnaires/${data}`, {
      method: "GET",
    })
      .then((res) => {
        this.setData({
          questionnaireTemplate: res.data,
        });
        wx.hideLoading();
      })
      .catch(() => {
        this.setData({
          questionnaireTemplate: {},
        });
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

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
})