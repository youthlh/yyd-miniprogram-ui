const app = getApp();
const api = app.api;

Page({
  data: {
    resultId: null,
    activityId: null, //当前任务ID
    questionnaireid: null,
    questionnaireTemplate: {},// 模版参数
    stateType: false,//是否是提交成功
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opaction) {
    if (wx.canIUse('hideHomeButton')) {
      wx.hideHomeButton()
    }
    wx.setNavigationBarTitle({
      title: `问卷详情`
    })
    this.setData({
      resultId: opaction.resultId,
      questionnaireid: opaction.questionnaireid,
      activityId: opaction.activityid,
    }, () => {
      this.selectTasksData(opaction.questionnaireid)
    });

  },
  /**
  * 数据赋值设置
  */
  selectTasksData(data) {
    wx.showLoading({
      mask: true,
      title: "loading...",
    });
    let parmes = {
      questionnaireId: data,
    }
    api(`/questionnaire/exhibitionQuestionnaires`, {
      data: parmes,
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
   * input题目选择的输入框
   */
  _bindinput(e) {
    let index = e.currentTarget.dataset.index;
    let index1 = e.currentTarget.dataset.index1;
    let data1 = JSON.parse(JSON.stringify(this.data.questionnaireTemplate));
    data1.questionnaireQuestions[index].questionnaireQuestionOptions[index1]['resultContent'] = e.detail.value
    this.setData({
      questionnaireTemplate: data1
    })
  },
  /**
   * input题目的输入框
   */
  _bindinput1(e) {
    let index = e.currentTarget.dataset.index;
    let data1 = JSON.parse(JSON.stringify(this.data.questionnaireTemplate));
    data1.questionnaireQuestions[index].optionContent = e.detail.value
    this.setData({
      questionnaireTemplate: data1
    })
  },
  /**
   * 单选
   * 选择题change
   */
  groupChange(e) {
    let index = e.currentTarget.dataset.index;
    let data1 = JSON.parse(JSON.stringify(this.data.questionnaireTemplate));
    data1.questionnaireQuestions[index].optionId = Number(e.detail.value)
    this.setData({
      questionnaireTemplate: data1
    })
  },
  /**
   * 多选
   * 选择题change
   */
  groupChange1(e) {
    let index = e.currentTarget.dataset.index;
    let data1 = JSON.parse(JSON.stringify(this.data.questionnaireTemplate));
    e.detail.value.length && e.detail.value.forEach(element => {
      element = Number(element)
    });
    data1.questionnaireQuestions[index].optionIds = e.detail.value
    this.setData({
      questionnaireTemplate: data1
    })
  },
  /**
   * 日期change
   */
  bindPickerChange(e) {
    let index = e.currentTarget.dataset.index;
    let data1 = JSON.parse(JSON.stringify(this.data.questionnaireTemplate));
    data1.questionnaireQuestions[index].dateContent = e.detail.value
    this.setData({
      questionnaireTemplate: data1
    })
  },
  /**
   * 提交答卷
   */
  submit() {
    wx.showLoading({
      mask: true,
      title: "提交中...",
    });
    console.log('tag', JSON.stringify(this.data.questionnaireTemplate))
    let parmes = JSON.parse(JSON.stringify(this.data.questionnaireTemplate));
    let key = this.submitJudgment(parmes.questionnaireQuestions);
    if (key) {
      parmes['activityId'] = this.data.activityId;
      api(`/task/taskQuestionnaireResults`, {
        data: parmes,
        method: "POST",
      })
        .then((res) => {
          if (res.data) {
            wx.hideLoading();
            this.setData({
              stateType: true,
            });
          }
        })
        .catch(() => {
          this.setData({
            questionnaireTemplate: {},
          });
        })
    }

  },
  /**
   * 提交逻辑判断
   */
  submitJudgment(data) {
    let key = true;
    look: for (let index = 0; index < data.length; index++) {
      let element = data[index];
      switch (element.questionType) {
        case 1://单选题
          if (element.mustAnswer === 1 && !element.optionId) {
            wx.hideLoading();
            key = false;
            wx.showToast({
              title: `问题《${element.questionTitle}》为必填项`,
              icon: "none",
              duration: 3000,
            });
            break look;
          }
          break;
        case 2://多选题
          if (element.mustAnswer === 1 && !element.optionIds.length) {
            wx.hideLoading();
            key = false;
            wx.showToast({
              title: `问题《${element.questionTitle}》为必填项`,
              icon: "none",
              duration: 3000,
            });
            break look;
          } else if (element.mustAnswer === 1 && element.leastOptionNumber > element.optionIds.length || element.optionIds.length > element.mostOptionNumber) {
            wx.hideLoading();
            key = false;
            wx.showToast({
              title: `问题《${element.questionTitle}》最少${element.leastOptionNumber}个,最多${element.mostOptionNumber}个`,
              icon: "none",
              duration: 3000,
            });
            break look;
          }
          break;
        case 3://填空题
          if (element.mustAnswer === 1 && (element.blankType === 1 ? !element.dateContent : !element.optionContent)) {
            wx.hideLoading();
            key = false;
            wx.showToast({
              title: `问题《${element.questionTitle}》为必填项`,
              icon: "none",
              duration: 3000,
            });
            break look;
          }
          break;
        default:
          break;
      }
    }
    return key;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.canIUse('hideHomeButton')) {
      wx.hideHomeButton()
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