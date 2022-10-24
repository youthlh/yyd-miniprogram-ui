//  任务大厅  taskHall 
const app = getApp();
const api = app.api;

Page({
  data: {
    immediatelyType: false, // 立即申请是否禁用
    selectTaskDetail: {}, // 数据集合
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opaction) {
    this.promotionSetdata(opaction.taskId);
  },

  /**
  * 数据赋值设置
  */
  promotionSetdata(taskId) {
    wx.showLoading({
      mask: true,
      title: "loading...",
    });
    api(`/task/selectTaskDetail/${taskId}`, {
      method: "GET",
    })
      .then((res) => {
        wx.setNavigationBarTitle({
          title: `${res.data.taskTypeName}详情`
        })
        this.setData({
          selectTaskDetail: res.data,
        });
        wx.hideLoading();
      })
      .catch(() => {
        this.setData({
          selectTaskDetail: {},
        });
      })
  },
  /**
   * 问卷详情
   */
  minute(e) {
    wx.navigateTo({
      url: `/pages/taskHalls/detailsQuestionnaire/detailsQuestionnaire?questionnaireid=${e.currentTarget.dataset.questionnaireid}`
    });
  },

  /**
   * 立即申请任务
   */
  immediately() {
    this.setData({
      immediatelyType: true
    });
    wx.showLoading({
      mask: true,
      title: "申请任务中...",
    });
    let parmes = {
      taskId: this.data.selectTaskDetail.taskId
    };
    api("/task/applyTask", {
      data: parmes,
      method: "POST",
    })
      .then((res) => {
        wx.hideLoading();
        if (res.data) {

          wx.reLaunch({
            url: `/pages/taskHalls/result/result?typeText=申请任务&pattern=1`
          });
        } else {
          wx.showToast({
            title: res.message ? res.message : "申请任务失败",
            icon: "none",
            duration: 3000,
          });
        }
        this.setData({
          immediatelyType: false
        });
      })
      .catch(() => {
        this.setData({
          immediatelyType: false
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