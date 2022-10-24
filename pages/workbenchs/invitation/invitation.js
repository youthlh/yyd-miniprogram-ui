const app = getApp();
const api = app.api;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    shareShow: true,// 分享是否显示
    taskId: null, //当前任务ID
    activityId: null, //当前任务ID
    taskActivities: {},//数据集
    personalName: '',//姓名
    place: '',//地址
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opaction) {
    wx.setNavigationBarTitle({
      title: `邀请函`
    })
    this.setData({
      activityId: opaction.activityId,
      taskId: opaction.taskId,
    }, () => {
      this.dataSet(opaction)
    });
  },
  /**
   * 数据反显
   */
  dataSet(opaction) {
    wx.showLoading({
      mask: true,
      title: "loading...",
    });
    api(`/task/taskActivities/${opaction.activityId}`, {
      method: "GET",
    })
      .then((res) => {
        let data = res.data;
        this.setData({
          taskActivities: data,
        });
        wx.hideLoading();
      }).catch(() => {
      })
  },
  /**
   * 分享
   */
  onShareAppMessage: function (options) {
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: "邀请函",        // 默认是小程序的名称(可以写slogan等)
      path: `/pages/workbenchs/invitation/invitation?share=true&activityId=${this.data.activityId}&taskId=${this.data.taskId}`,// 默认是当前页面，必须是以‘/’开头的完整路径
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
      // 此处可以修改 shareObj 中的内容
      shareObj.path = `/pages/workbenchs/invitationForeign/invitationForeign?activityId=${this.data.activityId}&taskId=${this.data.taskId}`;
    }
    return shareObj;
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
        shareShow: false
      })
    }
  },
});
