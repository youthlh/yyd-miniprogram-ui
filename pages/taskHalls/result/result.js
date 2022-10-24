Page({
  data: {
    status: {
      type: true,
      typeText: "",
      introduce: "",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opaction) {
    switch (opaction.pattern) {
      case "0":
        this.setData({
          status: {
            type: false,
            typeText: opaction.typeText,
            introduce: opaction.typeText + '失败',
          },
        });
        break;
      case "1":
        this.setData({
          status: {
            type: true,
            typeText: opaction.typeText,
            introduce: opaction.typeText + '成功',
          },
        });
        break;

      default:
        break;
    }
  },

  /**
   * 返回
   */
  back() {
    wx.switchTab({
      url: "/pages/workbench/workbench",
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

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