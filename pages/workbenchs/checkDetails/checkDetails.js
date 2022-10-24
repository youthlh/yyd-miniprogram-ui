const app = getApp();
const api = app.api;

Page({
  data: {
    taskId: null, //当前任务ID
    activityId: null, //当前任务ID
    taskActivitySignIns: [],//数据详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opaction) {
    wx.setNavigationBarTitle({
      title: `签到详情`
    })
    this.setData({
      activityId: opaction.activityId,
      taskId: opaction.taskId,
    }, () => {
      this.getTaskActivitySignIns(opaction)
    });
  },


  /**
  * 数据赋值设置
  */
  getTaskActivitySignIns(opaction) {
    wx.showLoading({
      mask: true,
      title: "loading...",
    });
    let parmes = {
      activityId: opaction.activityId
    };
    api("/task/getTaskActivitySignIns", {
      data: parmes,
      method: "GET",
    })
      .then((res) => {
        this.setData({
          taskActivitySignIns: res.data,
        });
        wx.hideLoading();
      })
      .catch(() => {
        this.setData({
          taskActivitySignIns: [],
        });
        wx.hideLoading();
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

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