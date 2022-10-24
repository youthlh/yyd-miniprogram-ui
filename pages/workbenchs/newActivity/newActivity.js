// pages/register/register.js
const app = getApp();
const api = app.api;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeTypeKey: false,//是否是修改
    taskId: null, //当前任务ID
    selectTaskDetail: {}, // 全局数据设置
    hospitalIdShow: false,// 是否显示医院下拉框数据集
    ///from 表单数据
    // 1
    activityName: "",//活动名称
    conferenceThemeIdIndex: 0,//会议主题下拉框标识
    conferenceThemeIds: [],//会议主题下拉框参数
    specificationIdIndex: 0,//产品规格下拉框标识
    specificationIds: [],// 产品名称及规格下拉数据
    activityDate: app.publicMethod.formatDate(new Date().getTime()),// 会议日期
    startTime: new Date().getTime(),//会议日期开始时间
    taskEndDatetime: "2099-12-12",//会议日期截止时间
    activityTime: app.publicMethod.formatDate(new Date().getTime(), 'times'), // 会议时间
    regionIdIndex: 0,//任务地区下拉框标识
    regionIds: [],// 任务地区下拉框数据
    activityLocation: "",//会议地点
    gradeIdIndex: 0,//医院等级下标标识
    gradeIds: [], // /医院等级下拉框数据
    departmentName: '',//科室名称
    notes: '',//备注
    //23
    conferenceLink: "",//会议链接
    // 6,7
    specificationIdsList: [], // 多选的选中的产品名称
    // 1=其他 2=综合医院 3=专科医院,0表示没有此配置
    hospitalClassificationIndex: 0, //医院类别下标标识
    hospitalClassifications: [
      {
        label: "其他",
        hospitalClassification: 1
      },
      {
        label: "综合医院",
        hospitalClassification: 2
      },
      {
        label: "专科医院",
        hospitalClassification: 3
      },
    ], //医院类别下拉框数据
    operationClassification: "",// 手术类别名称
    // 服务类别<6>，待选项为：打包，消毒，其他
    // 技术型跟台<7>，此字段为技术类别：待选项为：临床指导，技术跟台，其他
    serviceClassificationIdIndex: 0,//服务类别下标标识
    serviceClassificationIds: {
      6: [
        {
          label: "打包",
          serviceClassificationId: 1
        },
        {
          label: "消毒",
          serviceClassificationId: 2
        },
        {
          label: "其他",
          serviceClassificationId: 3
        },
      ],
      7: [
        {
          label: "临床指导",
          serviceClassificationId: 4
        },
        {
          label: "技术跟台",
          serviceClassificationId: 5
        },
        {
          label: "其他",
          serviceClassificationId: 6
        },
      ],
    }, //服务类别下拉数据

    newPromotion: '',//标题

    // 医院名称弹框选择
    hospitalIds: [],//医院名称下拉框数据
    hospitalIdsCont: 0,//医院名称下拉框数据总个数
    pageSize: 30,// 医院名称每页数据
    currentPage: 1, // 医院名称当前页
    hospitalLevelText: '',//医院搜索的文案
    hospitalIdsSelect: {
      hospitalId: '',
      hospitalName: ''
    },//选中的医院
    questionnaireIdIndex: 0,//问卷名称下标标识
    questionnaireIds: [],//问卷名称下拉框数据

    // checkbox多选框
    productNameShow: false,// 多选产品名称是否显示

  },


  /**
   * 多选产品名称 点击按钮
   */
  specificationClick() {
    if (this.data.specificationIds.length) {
      this.setData({
        specificationIds: JSON.parse(JSON.stringify(this.data.specificationIdsList)),
        productNameShow: true
      })
    } else {
      wx.showToast({
        title: '暂无数据', //提示的内容,
        icon: 'none', //图标,
        duration: 3000, //延迟时间,
      });
    }
  },

  /**
   * 多选产品名称 确定按钮
   * @param {*} event 
   */
  productNameShowSure() {
    this.setData({
      specificationIdsList: JSON.parse(JSON.stringify(this.data.specificationIds)),
    }, () => {
      this.setData({
        productNameShow: false,
      })
    })
  },

  /**
   * 多选产品名称 取消按钮
   * @param {*} e 
   */
  productNameShowFalse() {
    this.setData({
      productNameShow: false,
      specificationIds: JSON.parse(JSON.stringify(this.data.specificationIdsList))
    })
  },


  /**
* checkboxChange 多项选择器change事件
* @param {*} e 
*/
  checkboxChange: function (e) {
    this.data.specificationIds.forEach(element => {
      element['checked'] = false;
    });
    e.detail.value && e.detail.value.length && e.detail.value.forEach((element) => {
      for (let index = 0; index < this.data.specificationIds.length; index++) {
        let data = this.data.specificationIds[index];
        if (Number(element) == data.specificationId) {
          this.data.specificationIds[index]['checked'] = true;
        }
      }
    });
    this.setData({
      specificationIds: this.data.specificationIds
    })
  },

  /**
   * 键盘输入时触发，event.detail = {value, cursor, keyCode}
   * keyCode 为键值，2.1.0 起支持
   * 处理函数可以直接 return 一个字符串，将替换输入框的内容。
   */
  _bindinput: function () { },

  /**
   * 叉号删除input框内容
   */
  delIpt: function (e) {
    let data = e.currentTarget.dataset.type;
    this.setData(
      {
        [data]: "",
      },
      () => {
        // console.log(this.data.phone);
      }
    );
  },
  /**
   * 叉号删除input框内容
   */
  delIpt1: function (e) {
    let data = e.currentTarget.dataset.type;
    this.setData(
      {
        [data]: "",
      },
      () => {
        this.setData({
          hospitalIds: [],
          hospitalIdsCont: 0,
          pageSize: 30,
          currentPage: 1,
        }, () => {
          this.dicHospitals()
        })
      }
    );
  },
  /**
      * 参数复制
      * @param {深拷贝} data
      */
  deepCopy(data) {
    let json = JSON.stringify(data);
    return JSON.parse(json);
  },
  /**
   * 点击注册验证
   * @param {*} e 
   */
  formSubmit: function (e) {
    let data = e.detail.value, keyShow = false;
    console.log(e.detail.value)
    data['taskId'] = this.data.taskId;
    if ([1, 20, 21].includes(this.data.selectTaskDetail.taskType)) {
      let dataList = this.deepCopy(data);
      delete dataList["notes"];
      for (const key in dataList) {
        if (data[key] === "") {
          keyShow = true;
        }
      }
      data['conferenceThemeId'] = this.data.conferenceThemeIds[data['conferenceThemeId']].conferenceThemeId; //会议主题
      data['taskProductSpecifications'] = [{ specificationId: this.data.specificationIds[data['specificationId']].specificationId }]; // 产品名称
      data['activityTime'] = `${data['activityTime']}:00`; // 会议时间
      data['regionId'] = this.data.regionIds[data['regionId']].regionId; //任务地区
      data['hospitalId'] = this.data.hospitalIdsSelect.hospitalId; // 医院名称
      data['gradeId'] = this.data.gradeIds[data['gradeId']].gradeId;// 医院等级
    }
    if ([22].includes(this.data.selectTaskDetail.taskType)) {
      let dataList = this.deepCopy(data);
      delete dataList["notes"];
      for (const key in dataList) {
        if (data[key] === "") {
          keyShow = true;
        }
      }
      data['conferenceThemeId'] = this.data.conferenceThemeIds[data['conferenceThemeId']].conferenceThemeId; //会议主题
      data['taskProductSpecifications'] = [{ specificationId: this.data.specificationIds[data['specificationId']].specificationId }]; // 产品名称
      data['activityTime'] = `${data['activityTime']}:00`; // 会议时间
      data['regionId'] = this.data.regionIds[data['regionId']].regionId; //任务地区
    }
    if ([23].includes(this.data.selectTaskDetail.taskType)) {
      let dataList = this.deepCopy(data);
      delete dataList["notes"];
      for (const key in dataList) {
        if (data[key] === "") {
          keyShow = true;
        }
      }
      data['conferenceThemeId'] = this.data.conferenceThemeIds[data['conferenceThemeId']].conferenceThemeId; //会议主题
      data['taskProductSpecifications'] = [{ specificationId: this.data.specificationIds[data['specificationId']].specificationId }]; // 产品名称
      data['activityTime'] = `${data['activityTime']}:00`; // 会议时间
      data['regionId'] = this.data.regionIds[data['regionId']].regionId; //任务地区
    }
    if ([6, 7].includes(this.data.selectTaskDetail.taskType)) {
      let dataList = this.deepCopy(data);
      delete dataList["notes"];
      for (const key in dataList) {
        if (data[key] === "") {
          keyShow = true;
        }
      }
      let taskProductSpecificationsList = [];
      this.data.specificationIdsList.forEach(element => {
        if (element.checked) {
          taskProductSpecificationsList.push({ specificationId: element.specificationId });
        }
      });
      data['taskProductSpecifications'] = taskProductSpecificationsList; // 产品名称
      delete data['specificationId'];
      data['regionId'] = this.data.regionIds[data['regionId']].regionId; //任务地区
      data['hospitalId'] = this.data.hospitalIdsSelect.hospitalId; // 医院名称
      data['gradeId'] = this.data.gradeIds[data['gradeId']].gradeId;// 医院等级
      data['hospitalClassification'] = this.data.hospitalClassifications[data['hospitalClassification']].hospitalClassification;// 医院等级
      data['serviceClassificationId'] = this.data.serviceClassificationIds[this.data.selectTaskDetail.taskType][data['serviceClassificationId']].serviceClassificationId;// 服务类别
    }
    if ([8, 9, 10].includes(this.data.selectTaskDetail.taskType)) {
      let dataList = this.deepCopy(data);
      for (const key in dataList) {
        if (data[key] === "") {
          keyShow = true;
        }
      }

      data['taskProductSpecifications'] = [{ specificationId: this.data.specificationIds[data['specificationId']].specificationId }]; // 产品名称
      data['regionId'] = this.data.regionIds[data['regionId']].regionId; //任务地区
      this.data.selectTaskDetail.taskType === 9 ? data['hospitalId'] = this.data.hospitalIdsSelect.hospitalId : '' // 医院名称
    }
    if ([11, 12, 13, 14, 15].includes(this.data.selectTaskDetail.taskType)) {
      let dataList = this.deepCopy(data);
      for (const key in dataList) {
        if (data[key] === "") {
          keyShow = true;
        }
      }
      data['taskProductSpecifications'] = [{ specificationId: this.data.specificationIds[data['specificationId']].specificationId }]; // 产品名称
      data['regionId'] = this.data.regionIds[data['regionId']].regionId; //任务地区
    }
    if ([2, 3, 4, 5, 17, 24, 25].includes(this.data.selectTaskDetail.taskType)) {
      let dataList = this.deepCopy(data);
      for (const key in dataList) {
        if (data[key] === "") {
          keyShow = true;
        }
      }
      data['taskProductSpecifications'] = [{ specificationId: this.data.specificationIds[data['specificationId']].specificationId }]; // 产品名称
      data['regionId'] = this.data.regionIds[data['regionId']].regionId; //任务地区
      data['questionnaireId'] = this.data.questionnaireIds[data['questionnaireId']].questionnaireId; // 问卷名称
    }
    if ([18, 19].includes(this.data.selectTaskDetail.taskType)) {
      let dataList = this.deepCopy(data);
      for (const key in dataList) {
        if (data[key] === "") {
          keyShow = true;
        }
      }
      data['taskProductSpecifications'] = [{ specificationId: this.data.specificationIds[data['specificationId']].specificationId }]; // 产品名称
      data['regionId'] = this.data.regionIds[data['regionId']].regionId; //任务地区
    }
    if (keyShow) {
      wx.showToast({
        title: '请填写必填数据',
        icon: 'none',
        duration: 3000,
      })
    } else {
      let method = "POST", text = "新增";
      if (this.data.activeTypeKey) {
        method = "PUT";
        text = "修改";
        data["activityId"] = Number(this.data.activityId);
      }
      let parmes = data;
      api(`/task/taskActivities`, {
        data: parmes,
        method: method,
      })
        .then((res) => {
          if (res.data) {
            wx.showToast({
              title: `${text}成功`,
              icon: "none",
              duration: 2000,
              mask: true, //显示透明蒙层，防止触摸穿透,
            });
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 1500);

          } else {
            wx.showToast({
              title: res.message ? res.message : `${text}失败,请稍后再试`,
              icon: "none",
              duration: 3000,
            });
          }
        })
    }

  },

  /**
   * 重置点击
   * @param {*} e 
   */
  formReset: function (e) {
    console.log(e.detail.value.textarea)
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (opaction) {
    this.setData({
      taskId: opaction.taskId,
      activityId: opaction.activityId,
      activeTypeKey: opaction.activeTypeKey == "true"
    }, () => {
      this.initialized(opaction)
    });

  },
  /**
  *初始化
  * @param {type}
  * @return {type}
  */

  async initialized(opaction) {
    wx.showLoading({
      mask: true,
      title: "loading...",
    });
    await Promise.all([
      this.promotionSetdata(opaction.taskId),
      this.dicTaskConferenceThemes(),
      this.taskProducts(opaction.taskId),
      this.taskActivities(opaction.taskId),
      this.questionnaireNames(opaction.taskId),
      this.dicHospitalGrades(),
      this.dicHospitals(),
    ]);
    // 数据返显示
    this.data.activeTypeKey ? this.dataSet(opaction) : wx.hideLoading();
  },
  /**
 * 数据反显
 */
  dataSet(opaction) {
    wx.setNavigationBarTitle({
      title: "修改活动",
    });
    let parmes = {
      activityId: opaction.activityId
    }
    api(`/task/activityDetail`, {
      data: parmes,
    })
      .then((res) => {
        let contData = res.data;
        if ([1, 20, 21].includes(contData.taskType)) {
          let from = ["conferenceThemeId", "specificationId", "regionId", "gradeId"];
          from.forEach(element => {
            let key = `${element}Index`
            let keys = `${element}s`
            this.setData({
              [key]: this.forSetData(this.data[keys], contData[element], element),
            })
          });
          this.setData({
            hospitalIdsSelect: {
              hospitalId: contData.hospitalId,
              hospitalName: contData.hospitalName
            },
            activityDate: app.publicMethod.formatDate(contData.activityDate),// 日期
            activityTime: app.publicMethod.formatDate(contData.activityTime, 'times'),//时间
          }) // 医院名称
          let from1 = ["activityName", "activityLocation", "departmentName", "notes"];
          from1.forEach(element => {
            this.setData({
              [element]: contData[element]
            })
          });
        }
        if ([22].includes(this.data.selectTaskDetail.taskType)) {
          let from = ["conferenceThemeId", "specificationId", "regionId"];
          from.forEach(element => {
            let key = `${element}Index`
            let keys = `${element}s`
            this.setData({
              [key]: this.forSetData(this.data[keys], contData[element], element),
            })
          });
          this.setData({
            activityDate: app.publicMethod.formatDate(contData.activityDate),// 日期
            activityTime: app.publicMethod.formatDate(contData.activityTime, 'times'),//时间
          }) // 医院名称
          let from1 = ["activityName", "activityLocation", "notes"];
          from1.forEach(element => {
            this.setData({
              [element]: contData[element]
            })
          });
        }
        if ([23].includes(this.data.selectTaskDetail.taskType)) {
          let from = ["specificationId", "conferenceThemeId", "regionId"];
          from.forEach(element => {
            let key = `${element}Index`
            let keys = `${element}s`
            this.setData({
              [key]: this.forSetData(this.data[keys], contData[element], element),
            })
          });
          this.setData({
            activityDate: app.publicMethod.formatDate(contData.activityDate),// 日期
            activityTime: app.publicMethod.formatDate(contData.activityTime, 'times'),//时间
          });
          let from1 = ["activityName", "conferenceLink", "notes"];
          from1.forEach(element => {
            this.setData({
              [element]: contData[element]
            })
          });
        }
        if ([6, 7].includes(this.data.selectTaskDetail.taskType)) {
          let from = ["regionId", "gradeId", "hospitalClassification", "serviceClassificationId"];
          from.forEach(element => {
            let key = `${element}Index`
            let keys = `${element}s`
            this.setData({
              [key]: this.forSetData(this.data[keys], contData[element], element, this.data.selectTaskDetail.taskType),
            })
          });
          this.setData({
            specificationId: contData["taskProductSpecifications"],
            hospitalIdsSelect: {
              hospitalId: contData.hospitalId,
              hospitalName: contData.hospitalName
            },
            activityDate: app.publicMethod.formatDate(contData.activityDate),// 日期
            activityTime: app.publicMethod.formatDate(contData.activityTime, 'times'),//时间
          }, () => {
            this.data.specificationId.forEach(element => {
              this.data.specificationIdsList.forEach(element1 => {
                if (element.specificationId === element1.specificationId) {
                  element1["checked"] = true;
                }
              });
            });
            this.setData({
              specificationIdsList: JSON.parse(JSON.stringify(this.data.specificationIdsList))
            })
          }) // 医院名称
          let from1 = ["activityName", "activityLocation", "departmentName", "operationClassification", "notes"];
          from1.forEach(element => {
            this.setData({
              [element]: contData[element]
            })
          });
        }
        if ([8, 9, 10].includes(this.data.selectTaskDetail.taskType)) {
          let from = ["specificationId", "regionId"];
          from.forEach(element => {
            let key = `${element}Index`;
            let keys = `${element}s`;
            this.setData({
              [key]: this.forSetData(this.data[keys], contData[element], element),
            })
          });
          if (this.data.selectTaskDetail.taskType === 9) {
            this.setData({
              hospitalIdsSelect: {
                hospitalId: contData.hospitalId,
                hospitalName: contData.hospitalName
              },
            }) // 医院名称
          }
          let from1 = ["activityName"];
          from1.forEach(element => {
            this.setData({
              [element]: contData[element]
            })
          });
        }
        if ([11, 12, 13, 14, 15].includes(this.data.selectTaskDetail.taskType)) {
          let from = ["specificationId", "regionId"];
          from.forEach(element => {
            let key = `${element}Index`;
            let keys = `${element}s`;
            this.setData({
              [key]: this.forSetData(this.data[keys], contData[element], element),
            })
          });
          let from1 = ["activityName"];
          from1.forEach(element => {
            this.setData({
              [element]: contData[element]
            })
          });
        }
        if ([16].includes(this.data.selectTaskDetail.taskType)) {
          let from1 = ["activityName"];
          from1.forEach(element => {
            this.setData({
              [element]: contData[element]
            })
          });
        }
        if ([2, 3, 4, 5, 17, 24, 25].includes(this.data.selectTaskDetail.taskType)) {
          let from = ["specificationId", "regionId", "questionnaireId"];
          from.forEach(element => {
            let key = `${element}Index`;
            let keys = `${element}s`;
            this.setData({
              [key]: this.forSetData(this.data[keys], contData[element], element),
            })
          });
          let from1 = ["activityName"];
          from1.forEach(element => {
            this.setData({
              [element]: contData[element]
            })
          });
        }
        if ([18, 19].includes(this.data.selectTaskDetail.taskType)) {
          let from = ["specificationId", "regionId"];
          from.forEach(element => {
            let key = `${element}Index`;
            let keys = `${element}s`;
            this.setData({
              [key]: this.forSetData(this.data[keys], contData[element], element),
            })
          });
          let from1 = ["activityName"];
          from1.forEach(element => {
            this.setData({
              [element]: contData[element]
            })
          });
        }

        wx.hideLoading();
      })
      .catch(() => {
        wx.hideLoading();
      })
  },
  /**
 * 循环便利设置参数
 */
  forSetData(data, id, key, index = 0) {
    let cont = 0;
    if (key == "serviceClassificationId") {
      data[index] && data[index].length && data[index].forEach((element, index) => {
        if (element[key] === id) {
          cont = index;
        }
      });
    } else {
      data && data.length && data.forEach((element, index) => {
        if (element[key] === id) {
          cont = index;
        }
      });
    }
    return cont;
  },
  /**
  * 数据赋值设置
  */
  promotionSetdata(taskId) {
    api(`/task/selectTaskDetail/${taskId}`, {
      method: "GET",
    })
      .then((res) => {
        this.setData({
          selectTaskDetail: res.data,
          newPromotion: res.data.taskTypeName,
          taskEndDatetime: res.data.taskEndDatetime,
        });
      })
  },
  /**
   * 会议主题下拉框接口
   */
  dicTaskConferenceThemes() {
    let parmes = {
      getAll: true
    };
    api("/codetable/dicTaskConferenceThemes/rows", {
      data: parmes,
      method: "GET",
    })
      .then((res) => {
        this.setData({
          conferenceThemeIds: res.data,
        });
      })
      .catch(() => {
        this.setData({
          conferenceThemeIds: [],
        });
      })
  },
  /**
   * 产品规格下拉框接口
   */
  taskProducts(taskId) {
    let parmes = {
      getAll: true,
      taskId: taskId
    };
    api("/task/selectProductSpecificationInfoByTaskId", {
      data: parmes,
      method: "GET",
    })
      .then((res) => {
        this.setData({
          specificationIds: res.data,
          specificationIdsList: res.data,
        });
      })
      .catch(() => {
        this.setData({
          specificationIds: [],
          specificationIdsList: []
        });
      })
  },
  /**
   * 任务地区下拉框接口
   */
  taskActivities(taskId) {
    let parmes = {
      getAll: true,
      taskId: taskId
    };
    api("/task/taskRegions/rows", {
      data: parmes,
      method: "GET",
    })
      .then((res) => {
        this.setData({
          regionIds: res.data,
        });
      })
      .catch(() => {
        this.setData({
          regionIds: [],
        });
      })
  },
  /**
   * 医院等级下拉框接口
   */
  dicHospitalGrades() {
    let parmes = {
      getAll: true,
    };
    api("/codetable/dicHospitalGrades/rows", {
      data: parmes,
      method: "GET",
    })
      .then((res) => {
        this.setData({
          gradeIds: res.data,
        });
      })
      .catch(() => {
        this.setData({
          gradeIds: [],
        });
      })
  },
  /**
     * 问卷名称下拉框接口
     */
  questionnaireNames(taskId) {
    let parmes = {
      getAll: true,
      taskId: taskId
    };
    api("/task/selectTaskQuestionnaireByTaskId", {
      data: parmes,
      method: "GET",
    })
      .then((res) => {
        this.setData({
          questionnaireIds: res.data,
        });
      })
      .catch(() => {
        this.setData({
          questionnaireIds: [],
        });
      })
  },
  /**
   * 下啦加载
   */
  lower() {
    if (this.data.hospitalIds.length < this.data.hospitalIdsCont) {
      this.setData({
        currentPage: ++this.data.currentPage
      }, () => {
        this.dicHospitals()
      })
    } else {
      wx.showToast({ //如果全部加载完成了也弹一个框
        title: '我也是有底线的',
        icon: 'none',
        duration: 1500
      });
    }
  },

  /**
   * 医院下拉框接口
   */
  dicHospitals(hospitalName) {
    let parmes = {
      pageSize: this.data.pageSize,
      currentPage: this.data.currentPage,
      getAll: false,
    };
    hospitalName ? parmes['hospitalName'] = hospitalName : '';
    api("/codetable/dicHospitals/rows", {
      data: parmes,
      method: "GET",
    })
      .then((res) => {
        this.setData({
          hospitalIds: this.data.hospitalIds.concat(res.data),
          hospitalIdsCont: res.count
        });
      })
      .catch(() => {
        this.setData({
          hospitalIds: [],
        });
      })
  },
  /**
   * 键盘点击完成
   */
  bindconfirm() {
    this.setData({
      hospitalIds: [],
      hospitalIdsCont: 0,
      pageSize: 30,
      currentPage: 1,
    }, () => {
      this.dicHospitals(this.data.hospitalLevelText)
    })
  },

  /**
   * pickerChange
   * @param {*} e 
   */
  bindPickerChange(e) {
    let data = e.currentTarget.dataset.type;
    this.setData({
      [data]: e.detail.value
    })
  },
  /**
   * 医院名称弹框
   */
  _bindhospitalId() {
    this.setData({
      hospitalIdShow: !this.data.hospitalIdShow,
    }, () => {
      if (this.data.hospitalIdShow) {
        this.setData({
          hospitalIds: [],
          hospitalIdsCont: 0,
          pageSize: 30,
          currentPage: 1,
        }, () => {
          this.dicHospitals()
        })
      }
    });
  },
  /**
   * 医院点击
   */
  hospitalIdsList(event) {
    this.setData({
      hospitalIdsSelect: {
        hospitalId: event.currentTarget.dataset.hospitalid,
        hospitalName: event.currentTarget.dataset.hospitalname
      }
    }, () => {
      this._bindhospitalId();
    });
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
});
