// components/mains/beforeRealName/normExam/normExam.js;
const app = getApp();
const api = app.api;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    personalUserId: {
      type: [Number, String],
      value: "",
      observer: function (personalUserId) {
        // console.log("personalUserId", personalUserId)
      }
    },
    certificatePath: {
      type: [Number, String],
      value: "",
      observer: function (certificatePath) {
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    id: null,
    answer: [
      "", "", "", "",
      //验证单选
      "4", "3", "1", "2", "1",
      "1", "2", "4", "4", "4"
    ], // 正确-答案集合
    questionnaireTemplate: {
      questionnaireName: "个体合作项目合规考试",
      des: "欢迎您参加本次合规考试，一共10题，单选题，满分可继续完成认证并获得证书。",
      questionnaireQuestions: [{
          questionSn: "",
          redact: false, // 是否启动编辑
          questionType: 3, // 1=单选题 2=多选题 3=填空题
          blankType: 0, // questionType= 3启用,填空限制类型 0=不限制 1=日期 2=小数 3=整数
          questionTitle: "您的姓名：", // 问题标题
          deletable: 1, // 是否可删除 0=不可删除 1=可删除
          mustAnswer: 0, // 是否必答 0=否 1=是
        },
        {
          questionSn: "",
          redact: false, // 是否启动编辑
          questionType: 3, // 1=单选题 2=多选题 3=填空题
          blankType: 0, // questionType= 3启用,填空限制类型 0=不限制 1=日期 2=小数 3=整数
          questionTitle: "您的城市：", // 问题标题
          deletable: 1, // 是否可删除 0=不可删除 1=可删除
          mustAnswer: 0, // 是否必答 0=否 1=是
        },
        {
          questionSn: "",
          redact: false, // 是否启动编辑
          questionType: 3, // 1=单选题 2=多选题 3=填空题
          blankType: 0, // questionType= 3启用,填空限制类型 0=不限制 1=日期 2=小数 3=整数
          questionTitle: "您区域博瑞霖经理姓名：", // 问题标题
          deletable: 1, // 是否可删除 0=不可删除 1=可删除
          mustAnswer: 0, // 是否必答 0=否 1=是
        },
        {
          questionSn: "",
          redact: false, // 是否启动编辑
          questionType: 3, // 1=单选题 2=多选题 3=填空题
          blankType: 0, // questionType= 3启用,填空限制类型 0=不限制 1=日期 2=小数 3=整数
          questionTitle: "您的手机号码：", // 问题标题
          deletable: 1, // 是否可删除 0=不可删除 1=可删除
          mustAnswer: 0, // 是否必答 0=否 1=是
        },
        //10道单选题
        {
          questionSn: 1,
          questionType: 1, // 1=单选题 2=多选题 3=填空题
          questionTitle: "有关合规承诺函的内容，哪个说法是不正确的？", // 问题标题
          deletable: 1, // 是否可删除 0=不可删除 1=可删除
          mustAnswer: 0, // 是否必答 0=否 1=是
          optionSn: null, //  questionType= 1|2启用,选择题的选中选项
          redact: false, // 是否启动编辑
          questionnaireQuestionOptions: [{
              optionSn: 1, //  序号
              optionContent: "合规承诺函全称是合规与反商业贿赂承诺函", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 2, //  序号
              optionContent: "如果违背合规承诺描述，会追究法律责任", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 3, //  序号
              optionContent: "合规承诺函要求签字承诺", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 4, //  序号
              optionContent: "合规承诺函一共有5条描述", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
          ],
        },
        {
          questionSn: 2,
          questionType: 1, // 1=单选题 2=多选题 3=填空题
          questionTitle: "有关合规承诺函的内容依据，哪个说法是不正确的？", // 问题标题
          deletable: 1, // 是否可删除 0=不可删除 1=可删除
          mustAnswer: 0, // 是否必答 0=否 1=是
          optionSn: null, //  questionType= 1|2启用,选择题的选中选项
          redact: false, // 是否启动编辑
          questionnaireQuestionOptions: [{
              optionSn: 1, //  序号
              optionContent: "《中华人民共和国药品管理法》", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 2, //  序号
              optionContent: "博瑞霖合规管理制度", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 3, //  序号
              optionContent: "《中华人民共和国宪法》", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 4, //  序号
              optionContent: "《RDPAC法规政策》(42家外商制药企业)", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
          ],
        },
        {
          questionSn: 3,
          questionType: 1, // 1=单选题 2=多选题 3=填空题
          questionTitle: "合规承诺函的不允许对客户输送不当利益，不当利益描述不正确的是？", // 问题标题
          deletable: 1, // 是否可删除 0=不可删除 1=可删除
          mustAnswer: 0, // 是否必答 0=否 1=是
          optionSn: null, //  questionType= 1|2启用,选择题的选中选项
          redact: false, // 是否启动编辑
          questionnaireQuestionOptions: [{
              optionSn: 1, //  序号
              optionContent: "饮料", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 2, //  序号
              optionContent: "黄金首饰物品", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 3, //  序号
              optionContent: "购物卡", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 4, //  序号
              optionContent: "现金", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
          ],
        },
        {
          questionSn: 4,
          questionType: 1, // 1=单选题 2=多选题 3=填空题
          questionTitle: "有关合规承诺函中相关利益方描述，不正确的是？", // 问题标题
          deletable: 1, // 是否可删除 0=不可删除 1=可删除
          mustAnswer: 0, // 是否必答 0=否 1=是
          optionSn: null, //  questionType= 1|2启用,选择题的选中选项
          redact: false, // 是否启动编辑
          questionnaireQuestionOptions: [{
              optionSn: 1, //  序号
              optionContent: "与博瑞霖的区域经理是亲戚", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 2, //  序号
              optionContent: "与博瑞霖公司某一个员工是同学", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 3, //  序号
              optionContent: "与第三方合同签约方某一员工是双胞胎", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 4, //  序号
              optionContent: "与博瑞霖公司某一个员工是夫妻", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
          ],
        },
        {
          questionSn: 5,
          questionType: 1, // 1=单选题 2=多选题 3=填空题
          questionTitle: "合规承诺函中有关产品宣传资料，描述不正确的是？", // 问题标题
          deletable: 1, // 是否可删除 0=不可删除 1=可删除
          mustAnswer: 0, // 是否必答 0=否 1=是
          optionSn: null, //  questionType= 1|2启用,选择题的选中选项
          redact: false, // 是否启动编辑
          questionnaireQuestionOptions: [{
              optionSn: 1, //  序号
              optionContent: "可以从百度网下载宣传资料", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 2, //  序号
              optionContent: "不允许把现场资料发给非医疗卫生人士", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 3, //  序号
              optionContent: "不允许自己制作宣传资料", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 4, //  序号
              optionContent: "可以从博瑞霖获得医学部批准的宣传资料", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
          ],
        },
        {
          questionSn: 6,
          questionType: 1, // 1=单选题 2=多选题 3=填空题
          questionTitle: "合规承诺函中有关对可疑行为可向企业客户汇报，描述不正确的是？", // 问题标题
          deletable: 1, // 是否可删除 0=不可删除 1=可删除
          mustAnswer: 0, // 是否必答 0=否 1=是
          optionSn: null, //  questionType= 1|2启用,选择题的选中选项
          redact: false, // 是否启动编辑
          questionnaireQuestionOptions: [{
              optionSn: 1, //  序号
              optionContent: "对可疑不合规事件或行为，可发微信向博瑞霖经理汇报", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 2, //  序号
              optionContent: "对可疑不合规事件或行为，可发邮箱：compliance@brilliancepharm.com", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 3, //  序号
              optionContent: "对可疑不合规事件或行为，可用电话向博瑞霖经理汇报", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 4, //  序号
              optionContent: "对可疑不合规事件或行为，可用电话向第三方公司项目经理汇报", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
          ],
        },
        {
          questionSn: 7,
          questionType: 1, // 1=单选题 2=多选题 3=填空题
          questionTitle: "合规承诺函中对于如果你违背承诺，描述不正确的是？", // 问题标题
          deletable: 1, // 是否可删除 0=不可删除 1=可删除
          mustAnswer: 0, // 是否必答 0=否 1=是
          optionSn: null, //  questionType= 1|2启用,选择题的选中选项
          redact: false, // 是否启动编辑
          questionnaireQuestionOptions: [{
              optionSn: 1, //  序号
              optionContent: "可能会被追究法律责任", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 2, //  序号
              optionContent: "可以辞职", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 3, //  序号
              optionContent: "可能被逮捕", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 4, //  序号
              optionContent: "可能会产生巨额赔偿", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
          ],
        },
        {
          questionSn: 8,
          questionType: 1, // 1=单选题 2=多选题 3=填空题
          questionTitle: "有关国家最新法规政策，描述不正确的是？", // 问题标题
          deletable: 1, // 是否可删除 0=不可删除 1=可删除
          mustAnswer: 0, // 是否必答 0=否 1=是
          optionSn: null, //  questionType= 1|2启用,选择题的选中选项
          redact: false, // 是否启动编辑
          questionnaireQuestionOptions: [{
              optionSn: 1, //  序号
              optionContent: "不合规的业务行为有可能会受到同行的举报", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 2, //  序号
              optionContent: "企业员工或外部业务合作人违规违法，会追究企业法人责任", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 3, //  序号
              optionContent: "外部业务合作人同样必须接受企业的合规培训", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 4, //  序号
              optionContent: "只有合规考试100分，就不会发生不合规行为", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
          ],
        },
        {
          questionSn: 9,
          questionType: 1, // 1=单选题 2=多选题 3=填空题
          questionTitle: "任务派单后要求提供任务实施证据链，以下描述不正确的是？", // 问题标题
          deletable: 1, // 是否可删除 0=不可删除 1=可删除
          mustAnswer: 0, // 是否必答 0=否 1=是
          optionSn: null, //  questionType= 1|2启用,选择题的选中选项
          redact: false, // 是否启动编辑
          questionnaireQuestionOptions: [{
              optionSn: 1, //  序号
              optionContent: "每月需要收集工作质量反馈表", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 2, //  序号
              optionContent: "每月需要汇总辅助学术会议总结", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 3, //  序号
              optionContent: "每天需要在手机软件上录入带定位工作记录单", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 4, //  序号
              optionContent: "辅助会议需要拍会议录像视频", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
          ],
        },
        {
          questionSn: 10,
          questionType: 1, // 1=单选题 2=多选题 3=填空题
          questionTitle: "任务派单后要求提供任务实施证据链，以下描述不正确的是？", // 问题标题
          deletable: 1, // 是否可删除 0=不可删除 1=可删除
          mustAnswer: 0, // 是否必答 0=否 1=是
          optionSn: null, //  questionType= 1|2启用,选择题的选中选项
          redact: false, // 是否启动编辑
          questionnaireQuestionOptions: [{
              optionSn: 1, //  序号
              optionContent: "合法性", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 2, //  序号
              optionContent: "真实性", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 3, //  序号
              optionContent: "合理性", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
            {
              optionSn: 4, //  序号
              optionContent: "计划性", // 选项内容
              allowFill: 0, // 是否允许填空 0=否 1=是
            },
          ],
        },
      ]
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //下一步  -
    nextClick() {
      this.triggerEvent('stepChange', {
        index: 3
      }, {})
    },
    /**
     * 返回
     */
    goBack() {
      this.triggerEvent('stepChange', {
        index: 1
      }, {})
    },


    /**
     * 点击注册验证
     * @param {*} e 
     */
    formSubmit(e) {
      let data = e.detail.value;
      console.log("做题情况：", data);
      if (data['subject0'] === "" || data['subject1'] === "" || data['subject2'] === "" || data['subject3'] === "") {
        wx.showToast({
          title: "【姓名】【城市】【经理姓名】【手机号码】不能为空！",
          icon: "none",
          duration: 3000,
        });
        return
      }
      // 匹配手机号
      let phoneReg = /^[1][3,4,5,6.7,8,9][0-9]{9}$/;
      let phoneFlag = phoneReg.test(data['subject3']);
      if (!phoneFlag) {
        wx.showToast({
          title: "手机号码格式不正确！",
          icon: "none",
          duration: 3000,
        });
        return;
      }
      //验证单选是否选完
      let isFinish=true;
      for(let ansNth=4;ansNth<=13;ansNth++){
        if(data[`subject${ansNth}`]===""){
          isFinish=false
        }
      }
      if(!isFinish){
        wx.showToast({
          title: "请您完成所有单选题！",
          icon: "none",
          duration: 3000,
        });
        return
      }

      //开始 验证单选题
      let allFlag=true;//true 满分  false 有错题
      let allGrade=0;//单选题总分100
      for(let ansNth=4;ansNth<=13;ansNth++){
        if(this.data.answer[ansNth] === data[`subject${ansNth}`]){
          allGrade+=10;
        }else{
          allFlag=false;
        }
      }
      // console.log("考试是否通过",allFlag,"单选题得分",allGrade)
  
      if (allFlag) {
        //10道单选，满分答案，调用生成图片接口，开始提交 
        this.updatePersonalUser()
      } else {
        wx.showModal({
          title: ``,
          content:`您的合规考试未通过，得分为${allGrade}分，预祝您下次通过。`,
          showCancel:false,
          success (res) {
            if (res.confirm) {
              //返回我的
              wx.switchTab({
                url: "/pages/main/main",
              });
            } else if (res.cancel) {
              //用户点击取消
            }
          }
        })
      }
    },

    /**
     * 生成预览图片
     */
    updatePersonalUser() {
      let parmes = {
        // personalUserId: this.data.id,
      }
      api('/personaluser/createCertificates', {
        data: parmes,
        method: 'GET'
      }).then((res) => {
        // console.log("生成图片成功", res);
        this.triggerEvent('serverUrlChange', {
          serverUrl: res.data
        }, {})
      }, (err) => {
        // console.log("生成图片失败", err);
      })
    },
  }
})