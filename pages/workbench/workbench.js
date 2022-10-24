// workbench.js
const app = getApp();
const api = app.api;

Component({
  data: {
    selectTasks: [],// 数据集合
    sureTasks: [],// 数据已经点击集合

  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1,
        })
      }
      this.selectTasksData()
    }
  },
  methods: {
    /**
      * 数据赋值设置
      */
    selectTasksData() {
      wx.showLoading({
        mask: true,
        title: "loading...",
      });
      let parmes = {
        getAll: true
      }
      api("/task/queryWorkingTaskList", {
        data: parmes,
        method: "GET",
      })
        .then((res) => {
          let contList = res.data;
          contList && contList.length && contList.forEach(element => {
            if (this.data.sureTasks.includes(element.taskId) && element.refuseActivity) {
              element.refuseActivity = false;
            }
          });
          this.setData({
            selectTasks: contList,
          });
          wx.hideLoading();
        })
        .catch(() => {
          this.setData({
            selectTasks: [],
          });
        })
    },
    /**
     * 详情点击
     */
    taskDetails(event) {
      let sureTasksList = this.data.sureTasks;
      sureTasksList.push(event.currentTarget.dataset.taskid)
      this.setData({
        sureTasks: sureTasksList
      })
      wx.navigateTo({
        url: `/pages/workbenchs/workbenchList/workbenchList?taskId=${event.currentTarget.dataset.taskid}`
      });
    },
  }
})
