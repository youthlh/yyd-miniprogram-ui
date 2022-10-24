const app = getApp();
const api = app.api;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    resultStatus: true, //状态
  },
  /**
   * 修改用户信息
   */
  getUserInfo(token) {
    wx.showLoading({
      title: "Loading...",
      mask: true,
    });
    let parmes = {
      bizToken: token
    }
    api('/txyManagement/getEidResult', {
      data: parmes,
      method: 'GET'
    }).then((res) => {
      let data = res.data;
      if (data.flag) {
        wx.hideLoading();
        this.setData({
          resultStatus: res.data
        })
      } else {
        this.setData({
          resultStatus: false
        })
        wx.showToast({
          title: data.message ? data.message : 'TK,请稍后再试!',
          icon: "none",
          duration: 3000,
        });
      }
    })
      .catch(() => {
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () { },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _bizToken = wx.getStorageSync("bizToken")

    if (_bizToken) {
      this.getUserInfo(_bizToken);
    }
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },
  /**
   * 返回函数
   */
  back() {
    wx.switchTab({
      url: "/pages/main/main",
    });
  },
});
