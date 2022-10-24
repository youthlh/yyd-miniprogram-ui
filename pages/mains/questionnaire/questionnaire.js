const app = getApp();
const api = app.api;
const addData = app.globalData;

Page({
  data: {
    id: null,
    answer: [
      "1", "0", '', "1"
    ],// 答案集合
    questionnaireTemplate: {
      questionnaireName: "执业资格问卷考试准入",
      questionnaireQuestions: [
        {
          questionSn: 1,
          questionType: 1, // 1=单选题 2=多选题 3=填空题
          questionTitle: "请问您是XX吗？您的身份证号是xx，是否是您本人？", // 问题标题
          deletable: 1, // 是否可删除 0=不可删除 1=可删除
          mustAnswer: 0, // 是否必答 0=否 1=是
          optionSn: null, //  questionType= 1|2启用,选择题的选中选项
          redact: false, // 是否启动编辑
          questionnaireQuestionOptions: [
            {
              optionSn: 1, //  序号
              optionContent: "是的", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 0, //  序号
              optionContent: "不是", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
          ],
        },
        {
          questionSn: 2,
          questionType: 1, // 1=单选题 2=多选题 3=填空题
          questionTitle: "您当前是医药公司的员工或法定代表人、股东、董事、监事吗？", // 问题标题
          deletable: 1, // 是否可删除 0=不可删除 1=可删除
          mustAnswer: 0, // 是否必答 0=否 1=是
          leastOptionNumber: 2, // questionType= 2启用,至少选项个数
          mostOptionNumber: 2, // questionType= 2启用,至多选项个数
          optionSn: null, //  questionType= 1|2启用,选择题的选中选项
          redact: false, // 是否启动编辑
          questionnaireQuestionOptions: [
            {
              optionSn: 1, //  序号
              optionContent: "是的", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 0, //  序号
              optionContent: "不是", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
          ],
        },
        {
          questionSn: 3,
          redact: false, // 是否启动编辑
          questionType: 3, // 1=单选题 2=多选题 3=填空题
          blankType: 0, // questionType= 3启用,填空限制类型 0=不限制 1=日期 2=小数 3=整数
          questionTitle: "请问您擅长的医学领域是哪些呢？(例如:化学制药生物制品、医疗器械、中药、医药流通领域等)", // 问题标题
          deletable: 1, // 是否可删除 0=不可删除 1=可删除
          mustAnswer: 0, // 是否必答 0=否 1=是
        },
        {
          questionSn: 4,
          questionType: 1, // 1=单选题 2=多选题 3=填空题
          questionTitle: "您是否能够遵守【  】对于合规和反商业贿赂的要求？", // 问题标题
          deletable: 1, // 是否可删除 0=不可删除 1=可删除
          mustAnswer: 0, // 是否必答 0=否 1=是
          leastOptionNumber: 2, // questionType= 2启用,至少选项个数
          mostOptionNumber: 2, // questionType= 2启用,至多选项个数
          optionSn: null, //  questionType= 1|2启用,选择题的选中选项
          redact: false, // 是否启动编辑
          questionnaireQuestionOptions: [
            {
              optionSn: 1, //  序号
              optionContent: "可以", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 0, //  序号
              optionContent: "不可以", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
          ],
        },
      ]
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opaction) {
    wx.setNavigationBarTitle({
      title: "问卷详情"
    })
    this.setData({
      id: opaction.personalUserId
    })
    this.selectMyInfo(opaction.personalUserId)
  },

  /**
   * 请求我的数据集
   */
  selectMyInfo(data) {
    let parmes = {
      personalUserId: data
    }
    api('/personaluser/findPersonalUserByIdCard', {
      data: parmes,
      method: 'GET'
    }).then((res) => {
      let questionTitle0 = 'questionnaireTemplate.questionnaireQuestions[0].questionTitle';
      let questionTitle3 = 'questionnaireTemplate.questionnaireQuestions[3].questionTitle';
      this.setData({
        [questionTitle0]: `请问您是${res.data.personalUserName}吗？您的身份证号是${res.data.idCard}，是否是您本人？`,
        [questionTitle3]: `您是否能够遵守  ${res.data.corporationName} 对于合规和反商业贿赂的要求？`
      })
    })
  },

  /**
   * 点击注册验证
   * @param {*} e 
   */
  formSubmit: function (e) {
    let data = e.detail.value
    if (this.data.answer[0] === data['subject0'] && this.data.answer[1] === data['subject1'] && this.data.answer[3] === data['subject3']) {
      this.updatePersonalUser(data['subject2'])
    } else {
      wx.showToast({
        title: "审核未通过，请重新填写",
        icon: "none",
        duration: 3000,
      });
    }
  },

  /**
  * 医学领域提交
  */
  updatePersonalUser(data) {
    let parmes = {
      personalUserId: this.data.id,
      medicalField: data,
    }
    api('/personaluser/updatePersonalUser', {
      data: parmes,
      method: 'PUT'
    }).then((res) => {
      if (res.data) {
        wx.navigateTo({
          url: `/pages/mains/userAgent/userAgent?personalUserId=${this.data.id}`,
        });
      } else {
        wx.showToast({
          title: res.message ? res.message : '提交失败,请稍后再试!',
          icon: "none",
          duration: 3000,
        });
      }

    })
  },
  /**
   * 重置
   * @param {*} e 
   */
  formReset(e) { },

  /**
   * 返回
   */
  goBack() {
    wx.navigateBack({
      delta: 1
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