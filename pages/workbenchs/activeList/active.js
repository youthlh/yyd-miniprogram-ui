const app = getApp();
const api = app.api;

Page({
  data: {
    activityId: null,// 推广会或医生访谈ID
    taskActivities: {},//数据集
    taskActivitySignIns: [],// 签到详情list
    taskActivityPlanPhotos: [], //会议方案照片
    taskActivityScenePhotos: [], //会议现场照片
    taskActivityPhotos: [],// 上传中标通知照片
    _num: 9,
    _fileType: 9,
    urls: '/ftpService/uploadFile',
    readOnly: false,
    shadeShow: false,//遮罩是否显示



    // form 表单数据
    // 11,12,13
    hospitalClassificationIndex: 0, //医院类别下标 1=其他 2=综合医院 3=专科医院
    hospitalClassifications: [
      {
        label: '综合医院',
        hospitalClassification: 2
      },
      {
        label: '专科医院',
        hospitalClassification: 3
      },
      {
        label: '其他',
        hospitalClassification: 1
      },
    ], // 医院类别数据select
    hospitalNatureIndex: 0,// 医院性质 1= 其他 2= 公立 3= 军队 4= 股份 5= 民营, 0表示没有此配置
    hospitalNatures: [
      {
        label: '公立',
        hospitalNature: 2
      },
      {
        label: '军队',
        hospitalNature: 3
      },
      {
        label: '股份',
        hospitalNature: 4
      },
      {
        label: '民营',
        hospitalNature: 5
      },
      {
        label: '其他',
        hospitalNature: 1
      },
    ],//医院性质select
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
    // 
    departmentName: "", //科室
    outpatientDailyCount: null, //门诊日流量（人次）
    doctorCount: null, //医生数量（人）
    bedCount: null, //床位数量（张）
    competitorName: "",//竞品名称
    competitorMonthlySales: "",//竞品月销量
    pharmaceuticalMeetingFrequencyIndex: 0,// 药事会召开频率下标 1=其他 2=每周一次 3=每半月一次 4=每月一次
    pharmaceuticalMeetingFrequencys: [
      {
        label: '每周一次',
        pharmaceuticalMeetingFrequency: 2
      },
      {
        label: '每半月一次',
        pharmaceuticalMeetingFrequency: 3
      },
      {
        label: '每月一次',
        pharmaceuticalMeetingFrequency: 4
      },
      {
        label: '其他',
        pharmaceuticalMeetingFrequency: 1
      },
    ],// 药事会召开频率select
    existProblemIndex: 0,//有无慢病医保点或老年医学科 0=无 1=有
    existProblems: [
      {
        label: '无',
        existProblem: 0
      },
      {
        label: '有',
        existProblem: 1
      },
    ],// 有无慢病医保点或老年医学科select
    hospitalAdvantage: "", // 医院优势及潜力
    //14,15
    chainDrugstoresScale: "",//连锁药店规模(家)
    drugstoreName: "",//药店名称
    drugstoreDailyCount: "",//药店日客流量(人次)
    firstCompetitorName: "",//竞品名称(销量第1名)
    firstCompetitorMonthlySales: "",//竞品月销量(销量第1名)
    secondCompetitorName: "",//竞品名称(销量第2名)
    secondCompetitorMonthlySales: "",//竞品月销量(销量第2名)
    promotionalActivityFrequencyIndex: 0,//促销活动频次 1=其他 2=每周一次 3=每半月一次 4=每月一次
    promotionalActivityFrequencys: [
      {
        label: '每周一次',
        promotionalActivityFrequency: 2
      },
      {
        label: '每半月一次',
        promotionalActivityFrequency: 3
      },
      {
        label: '每月一次',
        promotionalActivityFrequency: 4
      },
      {
        label: '其他',
        promotionalActivityFrequency: 1
      },
    ],//促销活动频次
    whetherMedicalInsuranceIndex: 0, // 是否支持医保 1- 是，0-否
    whetherMedicalInsurances: [
      {
        label: '否',
        whetherMedicalInsurance: 0
      },
      {
        label: '是',
        whetherMedicalInsurance: 1
      },
    ],// 是否支持医保select
    drugstoreAdvantage: "",//药店优势
    //18
    drugstoreClassificationIndex: 0,//药店类别下标 1=其他 2=单体药店 3=连锁药店
    drugstoreClassifications: [
      {
        label: '单体药店',
        drugstoreClassification: 2
      },
      {
        label: '连锁药店',
        drugstoreClassification: 3
      },
      {
        label: '其他',
        drugstoreClassification: 1
      },
    ],//药店类别select
    displayLocationIndex: 0,//陈列位置下标 1=好 2=中 3=差
    displayLocations: [
      {
        label: '好',
        displayLocation: 1
      },
      {
        label: '中',
        displayLocation: 2
      },
      {
        label: '差',
        displayLocation: 3
      },
    ],//陈列位置select
    displayEffectIndex: 0,//陈列效果下标 1=好 2=中 3=差
    displayEffects: [
      {
        label: '好',
        displayEffect: 1
      },
      {
        label: '中',
        displayEffect: 2
      },
      {
        label: '差',
        displayEffect: 3
      },
    ],//陈列效果select
    productSalesIndex: 0,//产品销量下标 1=好 2=中 3=差
    productSaless: [
      {
        label: '好',
        productSales: 1
      },
      {
        label: '中',
        productSales: 2
      },
      {
        label: '差',
        productSales: 3
      },
    ],//产品销量select
    productInventoryIndex: 0,//产品库存下标 1=正常 2=过高 3=过低
    productInventorys: [
      {
        label: '正常',
        productInventory: 1
      },
      {
        label: '过高',
        productInventory: 2
      },
      {
        label: '过低',
        productInventory: 3
      },
    ],//产品库存select
    competitorName: "", //竞品名称
    competitorMonthlySales: "", //竞品月销量
    promotionFrequencyIndex: 0,//促销频次评估 1=其他 2=每周一次 3=每半月一次 4=每月一次
    promotionFrequencys: [
      {
        label: '每周一次',
        promotionFrequency: 2
      },
      {
        label: '每半月一次',
        promotionFrequency: 3
      },
      {
        label: '每月一次',
        promotionFrequency: 4
      },
      {
        label: '其他',
        promotionFrequency: 1
      },
    ], // 促销频次评估select
    promotionEffectIndex: 0,//促销效果  1=好 2=中 3=差
    promotionEffects: [
      {
        label: '好',
        promotionEffect: 1
      },
      {
        label: '中',
        promotionEffect: 2
      },
      {
        label: '差',
        promotionEffect: 3
      },
    ], // 促销效果selects
    supervisorConclusion: "", // 督导结论
    //19
    visitSummary: "",//拜访总结
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opaction) {
    this.setData({
      activityId: opaction.activityId,
      taskId: opaction.taskId,
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
    await Promise.all([
      this.dicHospitals()
    ]);
    // 数据返显示
    this.taskActivitiesData(opaction.activityId)
  },
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
 * pickerChange
 * @param {*} e 
 */
  bindPickerChange(e) {
    let data = e.currentTarget.dataset.type;
    this.setData({
      [data]: e.detail.value
    }, () => {
      if (data == "drugstoreClassificationIndex" && e.detail.value == 0) {
        this.setData({
          chainDrugstoresScale: null
        })
      }
    })
  },
  /**
   * 
   * @param {*} activityId 
   */
  _bindinput() {
    //
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
  * 数据赋值设置
  */
  taskActivitiesData(activityId) {
    wx.showLoading({
      mask: true,
      title: "loading...",
    });
    let parmes = {
      activityId: activityId
    }
    api(`/task/activityDetail`, {
      data: parmes,
    })
      .then((res) => {
        wx.setNavigationBarTitle({
          title: `${res.data.activityName}详情`
        })
        // < !--1=未提交 10 = 已提交, 待审核 11 = 审核不通过 20 = 审核通过, 带验收 21 = 验收不通过 30 = 验收通过-- >
        this.setData({
          taskActivities: res.data,
          activitySummary: res.data.activitySummary,
          readOnly: res.data.activityStatus === 1 || res.data.activityStatus === 11 ? true : false
        }, () => {
          let contData = res.data;
          if ([1, 20, 21, 22, 23].includes(this.data.taskActivities.taskType)) {
            this.setData({
              taskActivityPlanPhotos: [], //会议方案照片
              taskActivityScenePhotos: [], //会议现场照片
            }, () => {
              if (res.data.activityStatus !== 1) {
                let i = 0;
                contData.taskActivityPlanPhotos.length && this.downloadFilePic(contData.taskActivityPlanPhotos, 'taskActivityPlanPhotos', contData.taskActivityPlanPhotos.length, i);
                contData.taskActivityScenePhotos.length && this.downloadFilePic(contData.taskActivityScenePhotos, 'taskActivityScenePhotos', contData.taskActivityScenePhotos.length, i);
              }
            });
          }
          if ([6, 7].includes(this.data.taskActivities.taskType)) {
            this.getTaskActivitySignIns();
          }
          if ([8, 9, 10, 16].includes(this.data.taskActivities.taskType)) {
            this.setData({
              taskActivityPhotos: [],
            }, () => {
              if (res.data.activityStatus !== 1) {
                let i = 0;
                contData.taskActivityPhotos.length && this.downloadFilePic(contData.taskActivityPhotos, 'taskActivityPhotos', contData.taskActivityPhotos.length, i)
              }
            });
          }
          if ([11, 12, 13].includes(this.data.taskActivities.taskType)) {
            if (res.data.activityStatus !== 1) {
              // Index
              let from = ["hospitalClassification", "hospitalNature", "pharmaceuticalMeetingFrequency", "existProblem"];
              from.forEach(element => {
                let key = `${element}Index`
                let keys = `${element}s`
                this.setData({
                  [key]: this.forSetData(this.data[keys], res.data[element], element),
                })
              });
              this.setData({
                shadeShow: res.data.activityStatus === 1 || res.data.activityStatus === 11 ? false : true,
                hospitalIdsSelect: {
                  hospitalId: contData.hospitalId,
                  hospitalName: contData.hospitalName
                },
                taskActivityPhotos: [],
              }, () => {
                let i = 0;
                contData.taskActivityPhotos.length && this.downloadFilePic(contData.taskActivityPhotos, 'taskActivityPhotos', contData.taskActivityPhotos.length, i)
              }) // 医院名称等...
              let from1 = ["departmentName", "outpatientDailyCount", "doctorCount", "bedCount", "competitorName", "competitorMonthlySales", "hospitalAdvantage"];
              from1.forEach(element => {
                this.setData({
                  [element]: contData[element]
                })
              });
            }
          }
          if ([14, 15].includes(this.data.taskActivities.taskType)) {
            if (res.data.activityStatus !== 1) {
              // Index
              let from = ["promotionalActivityFrequency", "whetherMedicalInsurance"];
              from.forEach(element => {
                let key = `${element}Index`
                let keys = `${element}s`
                this.setData({
                  [key]: this.forSetData(this.data[keys], res.data[element], element),
                })
              });
              this.setData({
                shadeShow: res.data.activityStatus === 1 || res.data.activityStatus === 11 ? false : true,
                taskActivityPhotos: [],
              }, () => {
                let i = 0;
                contData.taskActivityPhotos.length && this.downloadFilePic(contData.taskActivityPhotos, 'taskActivityPhotos', contData.taskActivityPhotos.length, i)
              })
              let from1 = ["chainDrugstoresScale", "drugstoreName", "drugstoreDailyCount", "firstCompetitorName", "firstCompetitorMonthlySales", "secondCompetitorName", "secondCompetitorMonthlySales", "drugstoreAdvantage"];
              from1.forEach(element => {
                this.setData({
                  [element]: contData[element]
                })
              });
            }
          }
          if ([18].includes(this.data.taskActivities.taskType)) {
            if (res.data.activityStatus !== 1) {
              // Index
              let from = ["drugstoreClassification", "displayLocation", "displayEffect", "productSales", "productInventory", "promotionFrequency", "promotionEffect", "whetherMedicalInsurance"];
              from.forEach(element => {
                let key = `${element}Index`
                let keys = `${element}s`
                this.setData({
                  [key]: this.forSetData(this.data[keys], res.data[element], element),
                })
              });
              this.setData({
                shadeShow: res.data.activityStatus === 1 || res.data.activityStatus === 11 ? false : true,
              })
              let from1 = ["drugstoreName", "competitorName", "competitorMonthlySales", "supervisorConclusion"];
              from1.forEach(element => {
                this.setData({
                  [element]: contData[element]
                })

              });
            }
          }
          if ([19].includes(this.data.taskActivities.taskType)) {
            if (res.data.activityStatus !== 1) {
              // Index
              let from = ["drugstoreClassification", "promotionalActivityFrequency", "whetherMedicalInsurance"];
              from.forEach(element => {
                let key = `${element}Index`
                let keys = `${element}s`
                this.setData({
                  [key]: this.forSetData(this.data[keys], res.data[element], element),
                })
              });
              this.setData({
                shadeShow: res.data.activityStatus === 1 || res.data.activityStatus === 11 ? false : true,
              })
              let from1 = ["chainDrugstoresScale", "drugstoreName", "drugstoreDailyCount", "firstCompetitorName", "firstCompetitorMonthlySales", "secondCompetitorName", "secondCompetitorMonthlySales", "visitSummary"];
              from1.forEach(element => {
                this.setData({
                  [element]: contData[element]
                })

              });
            }
          }

          wx.hideLoading();
        });

      })
      .catch(() => {
        this.setData({
          taskActivities: {},
        });
      })
  },
  /**
  * 循环便利设置参数
  */
  forSetData(data, id, key) {
    let cont = 0;
    data && data.length && data.forEach((element, index) => {
      if (element[key] === id) {
        cont = index;
      }
    });
    console.log('tag', cont)
    return cont;
  },
  /**
  * 数据赋值设置
  */
  taskActivitiesDataShow(activityId) {
    let parmes = {
      activityId: activityId
    }
    api(`/task/activityDetail`, {
      data: parmes,
    })
      .then((res) => {
        this.setData({
          taskActivities: res.data,
          readOnly: res.data.activityStatus === 1 || res.data.activityStatus === 11 ? true : false
        });
      })
  },
  /**
   * 获取图片
   */
  downloadFilePic(data, type, num = 1, index) {
    let parmes = {
      data: {
        filePath: data[index]['photoPath'],
      },
      responseType: 'arraybuffer',
      method: "GET"
    }
    api(`/ftpService/downloadFile`, parmes)
      .then((res) => {
        let dataCont = this.data[type].slice(0)
        let url = 'data:image/png;base64,' + wx.arrayBufferToBase64(res)
        dataCont.push(
          {
            url: url,
            photoMd5: data[index].photoMd5,
            photoPath: data[index].photoPath
          }
        )
        this.setData({
          [type]: dataCont
        }, () => {
          index++
          if (index !== num) {
            this.downloadFilePic(data, type, num, index)
          } else {
            return
          }
        });
      })
  },
  /**
   * 数据赋值设置
   * 签到详情
   */
  getTaskActivitySignIns() {
    let parmes = {
      activityId: this.data.activityId
    };
    api("/task/getTaskActivitySignIns", {
      data: parmes,
      method: "GET",
    })
      .then((res) => {
        this.setData({
          taskActivitySignIns: res.data,
        });
      })
      .catch(() => {
        this.setData({
          taskActivitySignIns: [],
        });
      })
  },
  /**
   * 已答数据
   * @param {*} e 
   */
  hasaData(e) {
    let activityId = e.currentTarget.dataset.activityid;
    let taskId = e.currentTarget.dataset.taskid;
    wx.navigateTo({
      url: `/pages/workbenchs/alreadyTest/alreadyTest?taskId=${taskId}&activityid=${activityId}`
    });
  },
  /**
   * 问卷详情
   * 分享
   */
  minute(e) {
    wx.navigateTo({
      url: `/pages/workbenchs/detailsQuestionnaire/detailsQuestionnaire?questionnaireid=${e.currentTarget.dataset.questionnaireid}&share=true&activityid=${this.data.activityId}`
      // url: `/pages/workbenchs/detailsForeign/detailsForeign?questionnaireid=${e.currentTarget.dataset.questionnaireid}&share=true&activityid=${this.data.activityId}`
    });
  },
  /**
   * 完成情况详情
   */
  particulars(event) {
    wx.navigateTo({
      url: `/pages/workbenchs/promotion/promotion/promotion?activityId=${event.currentTarget.dataset.activityid}`
    });
  },

  /**
   * 新增活动
   */
  newActivities(event) {
    wx.navigateTo({
      url: `/pages/workbenchs/promotion/newPromotion/newPromotion?taskId=${event.currentTarget.dataset.taskid}`
    });
  },
  /**
   * 中标通知照片和商业流向数据照片和准入成功流向单照片
   * 新增图片
   */
  getUploadtaskActivityPhotos(event) {
    let taskActivityPhotos1 = []
    event.detail.forEach(element => {
      taskActivityPhotos1.push({
        url: element.url,
        photoPath: element.photoPath,
        photoMd5: element.photoMd5
      })
    });
    this.setData({
      taskActivityPhotos: taskActivityPhotos1
    })
  },
  /**
   * 上传会议方案照片：
   * 新增图片
   */
  getUploadImg(event) {
    let taskActivityPlanPhotos1 = []
    event.detail.forEach(element => {
      taskActivityPlanPhotos1.push({
        url: element.url,
        photoPath: element.photoPath,
        photoMd5: element.photoMd5
      })
    });
    this.setData({
      taskActivityPlanPhotos: taskActivityPlanPhotos1
    })
  },
  /**
   * 上传会议现场照片：
   * 新增图片
   */
  getUploadImg1(event) {
    let taskActivityScenePhotos1 = []
    event.detail.forEach(element => {
      taskActivityScenePhotos1.push({
        url: element.url,
        photoPath: element.photoPath,
        photoMd5: element.photoMd5
      })
    });
    this.setData({
      taskActivityScenePhotos: taskActivityScenePhotos1
    })
  },
  /**
   * 提交任务
   */
  formSubmit: function (e) {
    let keyShow = false;
    let data = e.detail.value;
    if ([1, 20, 21, 22, 23].includes(this.data.taskActivities.taskType)) {
      if (!data.activitySummary || !this.data.taskActivityPlanPhotos.length || !this.data.taskActivityScenePhotos.length) {
        keyShow = true;
      }
      data["taskActivityPlanPhotos"] = JSON.parse(JSON.stringify(this.data.taskActivityPlanPhotos));
      data["taskActivityScenePhotos"] = JSON.parse(JSON.stringify(this.data.taskActivityScenePhotos));
      data["taskActivityPlanPhotos"].forEach(element => {
        element.url = ""
      });
      data["taskActivityScenePhotos"].forEach(element => {
        element.url = ""
      });
    }
    if ([8, 9, 10, 16].includes(this.data.taskActivities.taskType)) {
      if (!data.activitySummary || !this.data.taskActivityPhotos.length) {
        keyShow = true;
      }
      data["taskActivityPhotos"] = JSON.parse(JSON.stringify(this.data.taskActivityPhotos));
      data["taskActivityPhotos"].forEach(element => {
        element.url = ""
      });
    }
    if ([11, 12, 13].includes(this.data.taskActivities.taskType)) {
      for (const key in data) {
        if (data[key] === "") {
          keyShow = true;
        }
      }
      if (!this.data.taskActivityPhotos.length) {
        keyShow = true;
      }
      data["hospitalClassification"] = this.data.hospitalClassifications[data["hospitalClassification"]]["hospitalClassification"];
      data["hospitalNature"] = this.data.hospitalNatures[data["hospitalNature"]]["hospitalNature"];
      data['hospitalId'] = this.data.hospitalIdsSelect.hospitalId; // 医院名称
      data["pharmaceuticalMeetingFrequency"] = this.data.pharmaceuticalMeetingFrequencys[data["pharmaceuticalMeetingFrequency"]]["pharmaceuticalMeetingFrequency"];
      data["existProblem"] = this.data.existProblems[data["existProblem"]]["existProblem"];
      data["taskActivityPhotos"] = JSON.parse(JSON.stringify(this.data.taskActivityPhotos));
      data["taskActivityPhotos"].forEach(element => {
        element.url = ""
      });

    }
    if ([14, 15].includes(this.data.taskActivities.taskType)) {
      for (const key in data) {
        if (data[key] === "") {
          keyShow = true;
        }
      }
      if (!this.data.taskActivityPhotos.length) {
        keyShow = true;
      }
      data["promotionalActivityFrequency"] = this.data.promotionalActivityFrequencys[data["promotionalActivityFrequency"]]["promotionalActivityFrequency"]
      data["whetherMedicalInsurance"] = this.data.whetherMedicalInsurances[data["whetherMedicalInsurance"]]["whetherMedicalInsurance"]
      data["taskActivityPhotos"] = JSON.parse(JSON.stringify(this.data.taskActivityPhotos));
      data["taskActivityPhotos"].forEach(element => {
        element.url = ""
      });
    }
    if ([18].includes(this.data.taskActivities.taskType)) {
      for (const key in data) {
        if (data[key] === "") {
          keyShow = true;
        }
      }
      data["drugstoreClassification"] = this.data.drugstoreClassifications[data["drugstoreClassification"]]["drugstoreClassification"]
      data["displayLocation"] = this.data.displayLocations[data["displayLocation"]]["displayLocation"]
      data["displayEffect"] = this.data.displayEffects[data["displayEffect"]]["displayEffect"]
      data["productSales"] = this.data.productSaless[data["productSales"]]["productSales"]
      data["productInventory"] = this.data.productInventorys[data["productInventory"]]["productInventory"]
      data["promotionFrequency"] = this.data.promotionFrequencys[data["promotionFrequency"]]["promotionFrequency"]
      data["promotionEffect"] = this.data.promotionEffects[data["promotionEffect"]]["promotionEffect"]
      data["whetherMedicalInsurance"] = this.data.whetherMedicalInsurances[data["whetherMedicalInsurance"]]["whetherMedicalInsurance"]
    }
    if ([19].includes(this.data.taskActivities.taskType)) {
      for (const key in data) {
        if (data[key] === "") {
          keyShow = true;
        }
      }
      data["drugstoreClassification"] = this.data.drugstoreClassifications[data["drugstoreClassification"]]["drugstoreClassification"]
      data["promotionalActivityFrequency"] = this.data.promotionalActivityFrequencys[data["promotionalActivityFrequency"]]["promotionalActivityFrequency"]
      data["whetherMedicalInsurance"] = this.data.whetherMedicalInsurances[data["whetherMedicalInsurance"]]["whetherMedicalInsurance"]
    }

    if (keyShow) {
      wx.showToast({
        title: '请填写必填数据',
        icon: 'none',
        duration: 3000,
      })
    } else {
      let that = this;
      wx.showModal({
        title: that.data.taskActivities.taskTypeName,
        content: `您确定提交${that.data.taskActivities.taskTypeName}吗？`,
        success(res) {
          if (res.confirm) {
            that.submitTask1(data)
          } else if (res.cancel) {
          }
        }
      })
    }
  },
  /**
   * 提交任务1
   */
  submitTask1(data) {
    let that = this;
    wx.showLoading({
      mask: true,
      title: "提交中...",
    });
    let parmes = data;
    parmes["activityId"] = this.data.activityId
    parmes["taskId"] = this.data.taskId
    api("/task/submitActivity", {
      data: parmes,
      method: "POST",
    })
      .then((res) => {
        if (res.data) {
          wx.showToast({
            title: '提交成功',
            duration: 2000,
            mask: true,
            success: function () {
              setTimeout(() => {
                that._back()
              }, 1000);
            }
          })
        } else {
          wx.showToast({
            title: res.message ? res.message : '提交失败',
            icon: 'none',
            duration: 3000,
            mask: true,
          })
        }
      })
  },

  /**
   * 修改
   * @param {*} e 
   */
  _recompose(e) {
    let activityId = e.currentTarget.dataset.activityid;
    let taskId = e.currentTarget.dataset.taskid;
    wx.navigateTo({
      url: `/pages/workbenchs/newActivity/newActivity?activityId=${activityId}&taskId=${taskId}&activeTypeKey=true`
    });
  },

  /***
   * 删除
   */
  _delete(e) {
    let data = e.currentTarget.dataset.activityid
    let that = this;
    wx.showModal({
      content: `您确定删除 ${this.data.taskActivities.activityName} ？`,
      success(res) {
        if (res.confirm) {
          that._delete1(data)
        } else if (res.cancel) {
        }
      }
    })
  },
  /**
   * 删除1
   */
  _delete1(data) {
    let that = this;
    api(`/task/taskActivities/${data}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.data) {
          wx.showToast({
            title: '删除成功',
            duration: 2000,
            icon: 'none',
            mask: true,
            success: function () {
              setTimeout(() => {
                that._back()
              }, 1000);
            }
          })
        }
      })
  },
  /**
   * 返回
   */
  _back() {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 邀请函
   */
  invitations(e) {
    let activityId = e.currentTarget.dataset.activityid;
    let taskId = e.currentTarget.dataset.taskid;
    wx.navigateTo({
      url: `/pages/workbenchs/invitation/invitation?activityId=${activityId}&taskId=${taskId}`
      // url: `/pages/workbenchs/invitationForeign/invitationForeign?activityId=${activityId}&taskId=${taskId}` // 外部打开展示
    });
  },
  /**
   * 签到详情
   */
  checkDetails(e) {
    let activityId = e.currentTarget.dataset.activityid;
    let taskId = e.currentTarget.dataset.taskid;
    wx.navigateTo({
      url: `/pages/workbenchs/checkDetails/checkDetails?activityId=${activityId}&taskId=${taskId}`
    });
  },
  /**
   * 23
   * 推广活动-网络会议任务
   * 签到详情
   */
  checkDetailsDirect(e) {
    let activityId = e.currentTarget.dataset.activityid;
    let taskId = e.currentTarget.dataset.taskid;
    wx.navigateTo({
      url: `/pages/workbenchs/directSign/directSign?activityId=${activityId}&taskId=${taskId}&readOnly=${this.data.readOnly}`
    });
  },
  /**
   * 6,7
   * 技术服务下所有任务类型通用任务详情
   * 签到详情
   */
  personalSign(e) {
    let activityId = e.currentTarget.dataset.activityid;
    let taskId = e.currentTarget.dataset.taskid;
    wx.navigateTo({
      url: `/pages/workbenchs/personalSign/personalSign?activityId=${activityId}&taskId=${taskId}`
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
    if (this.data.activityId) {
      this.taskActivitiesDataShow(this.data.activityId);
      if ([6, 7].includes(this.data.taskActivities.taskType)) {
        this.getTaskActivitySignIns();
      }
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