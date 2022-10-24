//  任务大厅  taskHall 
const app = getApp();
const api = app.api;

Page({
  data: {
    activityId: null,
    taskId: null,
    questionnaireId: null,//问卷id
    answeredQuestionnaires: [],//数据集
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opaction) {
    wx.setNavigationBarTitle({
      title: `已答问卷`
    })
    this.setData({
      activityId: opaction.activityid ? opaction.activityid : null,
      taskId: opaction.taskId ? opaction.taskId : null,
      questionnaireId: opaction.questionnaireId ? opaction.questionnaireId : null,
    }, () => {
      if (opaction.questionnaireId) {
        this.answeredQuestionnairesData1(opaction.questionnaireId, opaction.taskId)
      } else {
        this.answeredQuestionnairesData(opaction.activityid)
      }
    });
  },

  /**
 * 问卷详情
 */
  minute(e) {
    wx.navigateTo({
      url: `/pages/workbenchs/detailsQuestionnaire/detailsQuestionnaire?resultId=${e.currentTarget.dataset.resultid}&haveAnswer=true`
    });
  },
  /**
  * 数据赋值设置
  */
  answeredQuestionnairesData(data) {
    wx.showLoading({
      mask: true,
      title: "loading...",
    });
    let parmes = {
      activityId: data,
    };
    api("/task/answeredQuestionnaire", {
      data: parmes,
      method: "GET",
    })
      .then((res) => {
        this.setData({
          answeredQuestionnaires: res.data,
        });
        wx.hideLoading();
      })
      .catch(() => {
        this.setData({
          answeredQuestionnaires: [],
        });
      })
  },
  /**
  * 数据赋值设置
  */
  answeredQuestionnairesData1(questionnaireId, taskId) {
    wx.showLoading({
      mask: true,
      title: "loading...",
    });
    let parmes = {
      questionnaireId: questionnaireId,
      taskId: taskId,
      getAll: true
    };
    api("/task/selectQuestionnaireDone", {
      data: parmes,
      method: "GET",
    })
      .then((res) => {
        this.setData({
          answeredQuestionnaires: res.data,
        });
        wx.hideLoading();
      })
      .catch(() => {
        this.setData({
          answeredQuestionnaires: [],
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