const app = getApp();
const api = app.api;

Page({
  data: {
    resultId: null,
    questionnaireid: null,
    haveAnswer: false,//是否是已经答的题目
    share: false,//是否是去分享
    questionnaireTemplate: {},// 模版参数
    activityId: null, //当前任务ID
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opaction) {
    this.setData({
      share: opaction.share == 'true' ? true : false,
      haveAnswer: opaction.haveAnswer == 'true' ? true : false,
      resultId: opaction.resultId ? opaction.resultId : null,
      questionnaireid: opaction.questionnaireid ? opaction.questionnaireid : null,
      activityId: opaction.activityid ? opaction.activityid : null,
    }, () => {
      if (opaction.haveAnswer == 'true') {
        this.resultQuestionnaire(opaction.resultId)
      } else {
        this.selectTasksData(opaction.questionnaireid)
      }
    });
  },
  /**
    * 分享
    */
  onShareAppMessage: function (options) {
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: "问卷",        // 默认是小程序的名称(可以写slogan等)
      path: `/pages/workbenchs/detailsQuestionnaire/detailsQuestionnaire?activityid=${this.data.activityId}&share=${this.data.share}&haveAnswer=${this.data.haveAnswer}&resultId=${this.data.resultId}&questionnaireid=${this.data.questionnaireid}`,// 默认是当前页面，必须是以‘/’开头的完整路径
      imageUrl: '',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function (res) {
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {
        }
      },
      fail: function (res) {
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息
        }
      },
    };
    // 来自页面内的按钮的转发
    if (options.from == 'button') {
      shareObj.path = `/pages/workbenchs/detailsForeign/detailsForeign?&resultId=${this.data.resultId}&questionnaireid=${this.data.questionnaireid}&activityid=${this.data.activityId}&haveAnswer=${this.data.haveAnswer}`;
    }
    return shareObj;
  },
  /**
    * 数据赋值设置
    * 带答案
    */
  resultQuestionnaire(data) {
    wx.showLoading({
      mask: true,
      title: "loading...",
    });
    api(`/task/resultQuestionnaire`, {
      data: {
        resultId: data
      },
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
  onShow: function () {
    let pages = getCurrentPages(); //当前页面栈
    if (pages[0].route == "pages/main/main") {
      this.setData({
        share: false
      })
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
})