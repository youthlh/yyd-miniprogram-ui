//  任务大厅  taskHall 
const app = getApp();
const api = app.api;

Component({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  data: {
    functionalDevice: [], // 功能快数据集合
    functionalDeviceObject: {
      0: {
        img: "/assets/img/taskHallImgs/0.png",
        taskTypeName: `全部`,
        taskType: null
      },
      1: {
        img: "/assets/img/taskHallImgs/1.png",
        taskTypeName: "学术推广会\n（小型）",
        taskType: 1
      },
      2: {
        img: "/assets/img/taskHallImgs/2.png",
        taskTypeName: "医生调研\n访谈",
        taskType: 2
      },
      3: {
        img: "/assets/img/taskHallImgs/3.png",
        taskTypeName: "目标客户信息\n市场调查",
        taskType: 3
      },
      4: {
        img: "/assets/img/taskHallImgs/4.png",
        taskTypeName: "竞品信息\n市场调研",
        taskType: 4
      },
      5: {
        img: "/assets/img/taskHallImgs/5.png",
        taskTypeName: "商业渠道信息\n市场调查",
        taskType: 5
      },
      6: {
        img: "/assets/img/taskHallImgs/6.png",
        taskTypeName: "服务型跟台",
        taskType: 6
      },
      7: {
        img: "/assets/img/taskHallImgs/7.png",
        taskTypeName: "技术型跟台",
        taskType: 7
      },
      8: {
        img: "/assets/img/taskHallImgs/8.png",
        taskTypeName: "招标服务",
        taskType: 8
      },
      9: {
        img: "/assets/img/taskHallImgs/9.png",
        taskTypeName: "二次议价",
        taskType: 9
      },
      10: {
        img: "/assets/img/taskHallImgs/10.png",
        taskTypeName: "新品挂网",
        taskType: 10
      },
      11: {
        img: "/assets/img/taskHallImgs/11.png",
        taskTypeName: "医院准入\n（三级）",
        taskType: 11
      },
      12: {
        img: "/assets/img/taskHallImgs/12.png",
        taskTypeName: "医院准入\n（二级）",
        taskType: 12
      },
      13: {
        img: "/assets/img/taskHallImgs/13.png",
        taskTypeName: "医院准入\n（二级以下）",
        taskType: 13
      },
      14: {
        img: "/assets/img/taskHallImgs/14.png",
        taskTypeName: "连锁药店\n 准入",
        taskType: 14
      },
      15: {
        img: "/assets/img/taskHallImgs/15.png",
        taskTypeName: "单体药店\n准入",
        taskType: 15
      },
      16: {
        img: "/assets/img/taskHallImgs/16.png",
        taskTypeName: "商业流向\n数据收集",
        taskType: 16
      },
      17: {
        img: "/assets/img/taskHallImgs/17.png",
        taskTypeName: "病例征集",
        taskType: 17
      },
      18: {
        img: "/assets/img/taskHallImgs/18.png",
        taskTypeName: "门店督导",
        taskType: 18
      },
      19: {
        img: "/assets/img/taskHallImgs/19.png",
        taskTypeName: "药店拜访",
        taskType: 19
      },
      20: {
        img: "/assets/img/taskHallImgs/20.png",
        taskTypeName: "学术推广会\n（中型）",
        taskType: 20
      },
      21: {
        img: "/assets/img/taskHallImgs/21.png",
        taskTypeName: "学术推广会\n（大型）",
        taskType: 21
      },
      22: {
        img: "/assets/img/taskHallImgs/22.png",
        taskTypeName: "培训会",
        taskType: 22
      },
      23: {
        img: "/assets/img/taskHallImgs/23.png",
        taskTypeName: "网络会议",
        taskType: 23
      },
      24: {
        img: "/assets/img/taskHallImgs/24.png",
        taskTypeName: "新品可行性\n调研",
        taskType: 24
      },
      25: {
        img: "/assets/img/taskHallImgs/25.png",
        taskTypeName: "药品上市后\n临床观察",
        taskType: 25
      },
    },// 功能块对象
    taskTypeName: "全部",
    selectTasks: [],// 数据集合
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
      this.selectTasksData(null)
      this.dicTaskTypeInfosDownList()
    }
  },

  methods: {
    /**
       * 功能块点击
       */
    signature(event) {
      this.selectTasksData(event.currentTarget.dataset)
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
        getAll: true
      };
      data && data.tasktype ? parmes["taskType"] = data.tasktype : "";
      api("/task/selectTasks", {
        data: parmes,
        method: "GET",
      })
        .then((res) => {
          this.setData({
            selectTasks: res.data,
            taskTypeName: data && data.tasktypename ? data.tasktypename : "全部"
          });
          wx.hideLoading();
        })
        .catch(() => {
          this.setData({
            selectTasks: [],
            taskTypeName: "全部"
          });
        })
    },
    /**
    * 任务广场筛选排名
    */
    dicTaskTypeInfosDownList() {
      api("/codetable/dicTaskTypeInfosDownList")
        .then((res) => {
          let functionalDeviceList = [];
          try {
            res.data.forEach(element => {
              let data = this.data.functionalDeviceObject[element.taskType]
              functionalDeviceList.push(data)
            });
            functionalDeviceList.unshift(this.data.functionalDeviceObject[0])
          } catch (error) {
            for (const key in this.data.functionalDeviceObject) {
              functionalDeviceList.push(this.data.functionalDeviceObject[key])
            }
          }
          this.setData({
            functionalDevice: functionalDeviceList,
          });
        })
        .catch(() => {
          let functionalDeviceList = [];
          for (const key in this.functionalDeviceObject) {
            functionalDeviceList.push(this.data.functionalDeviceObject[key])
          }
          this.setData({
            functionalDevice: functionalDeviceList,
          });
        })
    },

    /**
     * 任务点击进入详情
     * @param {*} event 
     */
    selectTaskClick(event) {
      wx.navigateTo({
        url: `/pages/taskHalls/taskHallList/taskHallList?taskId=${event.currentTarget.dataset.taskid}`
      });
    },
  }
})