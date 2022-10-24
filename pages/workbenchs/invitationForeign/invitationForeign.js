const app = getApp();
const api = app.api;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    taskId: null, //当前任务ID
    activityId: null, //当前任务ID
    taskActivities: {},//数据集
    showPage: '1',//状态选择
    personalName: '',//姓名
    place: '',//地址
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opaction) {
    if (wx.canIUse('hideHomeButton')) {
      wx.hideHomeButton()
    }
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
    let parmes = {
      activityId: opaction.activityId
    }
    api(`/task/getSignIn`, {
      data: parmes,
      method: "GET",
    })
      .then((res) => {
        let data = res.data;
        this.setData({
          taskActivities: data,
        });
        wx.hideLoading();
      }).catch(() => {
        wx.hideLoading();
      })
  },
  /**
   * 签到
   */
  signIn() {
    this.setData({
      showPage: '2',
    });
  },
  /**
   * 获取地址
   */
  chooseLoc: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          place: res.name,
        })
      },
      fail(e) {
        wx.showToast({
          title: e.errMsg,
          icon: 'none',
          duration: 2000,
        })
        that.getLocation()
      }
    })
  },
  getLocation: function () {
    let _this = this;
    wx.getSetting({
      success(res) {
        // 判断定位的授权
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              _this.chooseLoc();
            },
            fail(errMsg) {
              wx.showToast({ title: JSON.stringify(errMsg), icon: 'none' })
            }
          })
        } else {
          _this.chooseLoc();
        }
      }
    })
  },
  /**
  * 签到接口
  * @param {*} e 
  */
  formSubmit: function (e) {
    let data = e.detail.value;
    data.activityId = this.data.activityId;
    if (data.personalName.length && data.place.length) {
      api(`/task/taskActivitySignIns`, {
        data: data,
        method: "POST",
      })
        .then((res) => {
          let data = res.data;
          if (data) {
            this.setData({
              showPage: '3',
            });
          }
        })
    }

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
});
