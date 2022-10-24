const app = getApp();
const api = app.api;

Page({
  data: {
    detailsShow: false,  // 是否是查看详情
    activityApproveRecordId: null,
    selectTaskDetail: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opaction) {
    this.setData({
      detailsShow: opaction.detailsShow === "1" ? true : false,
      activityApproveRecordId: opaction && opaction.activityApproveRecordId
    }, () => {
      this.promotionSetdata(opaction.taskId)
    })
  },

  /**
  * 数据赋值设置
  */
  promotionSetdata(taskId) {
    wx.showLoading({
      mask: true,
      title: "loading...",
    });
    let url = "";
    if (this.data.activityApproveRecordId && this.data.activityApproveRecordId !== "undefined") {
      url = `/task/selectTaskDetail/${taskId}?activityApproveRecordId=${this.data.activityApproveRecordId}`
    } else {
      url = `/task/selectTaskDetail/${taskId}`
    }
    api(url, {
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
  * 已答数据
  * @param {*} e 
  */
  hasaData(e) {
    let questionnaireId = e.currentTarget.dataset.questionnaireid;
    let taskId = e.currentTarget.dataset.taskid;
    wx.navigateTo({
      url: `/pages/workbenchs/alreadyTest/alreadyTest?taskId=${taskId}&questionnaireId=${questionnaireId}`
    });
  },
  /**
   * 问卷详情
   */
  minute(e) {
    wx.navigateTo({
      url: `/pages/workbenchs/detailsQuestionnaire/detailsQuestionnaire?questionnaireid=${e.currentTarget.dataset.questionnaireid}`
    });
  },

  /**
   * 完成情况详情
   */
  particulars(event) {
    if (this.data.detailsShow) {
      wx.navigateTo({
        url: `/pages/workbenchs/activeList/active?activityId=${event.currentTarget.dataset.activityid}&taskId=${event.currentTarget.dataset.taskid}`
      });
    } else
      if (this.data.selectTaskDetail.taskStatus == 4) {
        wx.showToast({
          title: "当前任务已结束，不能去完成", //提示的内容,
          icon: 'none', //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
        });
      } else {
        // 详情 修改一个页面 根据状态判断
        wx.navigateTo({
          url: `/pages/workbenchs/activeList/active?activityId=${event.currentTarget.dataset.activityid}&taskId=${event.currentTarget.dataset.taskid}`
        });
      }
  },
  /**
   * 新增活动
   */
  newActivities(event) {
    if (this.data.selectTaskDetail.taskStatus == 4) {
      wx.showToast({
        title: "当前任务已结束，不能新增活动", //提示的内容,
        icon: 'none', //图标,
        duration: 2000, //延迟时间,
        mask: true, //显示透明蒙层，防止触摸穿透,
      });
    } else {
      wx.navigateTo({
        url: `/pages/workbenchs/newActivity/newActivity?taskId=${event.currentTarget.dataset.taskid}&&tasktype=${event.currentTarget.dataset.tasktype}`
      });
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.selectTaskDetail.taskId) {
      this.promotionSetdata(this.data.selectTaskDetail.taskId)
    }
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