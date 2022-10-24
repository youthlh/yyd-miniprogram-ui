const app = getApp();
const api = app.api;

Page({
  data: {
    taskId: null, //当前任务ID
    activityId: null, //当前任务ID
    readOnly: true, // 是否只读
    taskActivitySignIns: [],//数据详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opaction) {
    wx.setNavigationBarTitle({
      title: `签到详情`
    })
    this.setData({
      activityId: opaction.activityId,
      taskId: opaction.taskId,
      readOnly: opaction.readOnly == "true",
    }, () => {
      this.getTaskActivitySignIns()
    });
  },

  /**
   * 添加签到用户
   */
  addSign() {
    let that = this;
    wx.showModal({
      title: '用户姓名',
      editable: true,
      placeholderText: "请输入用户姓名",
      cancelColor: "#233347",
      confirmColor: "#669CF6",
      success(res) {
        if (res.confirm) {
          that.formSubmit({ personalName: res.content })
        }
      }
    })
  },
  /**
 * 签到接口
 * @param {*} e 
 */
  formSubmit(data) {
    let that = this;
    data["activityId"] = this.data.activityId;
    api(`/task/taskActivitySignIns`, {
      data: data,
      method: "POST",
    })
      .then((res) => {
        let data = res.data;
        if (data) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000,
            success() {
              that.getTaskActivitySignIns()
            }
          })
        }
      })
  },


  /**
  * 数据赋值设置
  */
  getTaskActivitySignIns() {
    wx.showLoading({
      mask: true,
      title: "loading...",
    });
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
        wx.hideLoading();
      })
      .catch(() => {
        this.setData({
          taskActivitySignIns: [],
        });
        wx.hideLoading();
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