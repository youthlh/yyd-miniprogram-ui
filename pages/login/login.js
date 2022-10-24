// pages/login/login.js
const app = getApp();
const api = app.api;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: "", //手机号
    flag: "1",// 判断是否是第一次登录
    appId: app.appId, //当前小程序的appid
    welcomeTitle: '',//主题文案
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
  delIpt: function () {
    this.setData(
      {
        phone: "",
      },
      () => {
        console.log(this.data.phone);
      }
    );
  },

  /**
   * 获取短信验证码
   * 点击
   */
  getCode() {
    app.publicMethod.debounce(this.yzm, 300);
  },
  /**
   * 获取验证码接口
   * 具体方法/^(?:(?:\+|00)86)?1[3-9]\d{9}$/
   */
  yzm() {
    console.log('tag', this.data.phone)
    if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(this.data.phone)) {
      wx.showToast({
        title: "手机号有误",
        icon: "none",
        duration: 3000,
        mask: true, //显示透明蒙层，防止触摸穿透,
      });
      return false;
    } else {
      wx.showLoading({
        mask: true,
        title: "发送中",
      });
      api("/yyd/login/checkLoginPhone", {
        data: {
          phone: this.data.phone,
          appId: this.data.appId
        },
        method: "POST",
      })
        .then(() => {
          wx.hideLoading();
          wx.navigateTo({
            url: `/pages/authCode/authCode?tel=${this.data.phone}`,
          });
        });
    }
  },
  /**
   * 授权获取手机号
   * 使用第三方账号登录
   */
  getPhoneNumber(e) {
    let that = this;
    wx.login({
      success(res) {
        if (res.code && e.detail.encryptedData) {
          that.phoneLogin(res.code, e.detail.encryptedData, e.detail.iv); //验证登陆
        }
      },
      complete() {
        wx.hideLoading();
      }
    });
  },

  /**
   * 第三方微信登录
   */
  phoneLogin(code, encryptedData, iv) {
    wx.showLoading({
      mask: true,
      title: "正在加载",
    });
    let that = this;
    let data = {
      code: code,
      encryptedData: encryptedData,
      iv: iv,
      appId: that.data.appId,
    };
    api("/yyd/login/checkLoginCodeAndData", {
      data: data,
      method: "POST",
    })
      .then((res) => {
        wx.setStorage({
          key: "token",
          data: res.token,
          success: function () {
            wx.switchTab({
              url: "/pages/taskHall/taskHall",
            });
          },
        });
        wx.hideLoading();
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.setData({
      flag: options.flag ? options.flag : "1",
    });
    this.setData({
      welcomeTitle: app.topicConfiguration.welcomeTitle,
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
    let that = this;
    if (this.data.flag === '1') {
      wx.login({
        success(res) {
          if (res.code) {
            that.checkToken(res.code, that.data.appId); //验证登陆
          }
        },
      });
    }
  },

  /**
  * 验证是否已经登录过
  */
  checkToken(code, appId) {
    wx.showLoading({
      mask: true,
      title: "正在加载",
    });
    let data = {
      code: code,
      appId: appId,
    };
    api("/yyd/login/checkAppletLoginCode", {
      data: data,
      method: "POST",
    })
      .then((res) => {
        if (res.data) {
          wx.setStorage({
            key: "token",
            data: res.token,
            success: function () {
              wx.setStorage({
                key: "token",
                data: res.token,
                success: function () {
                  wx.switchTab({
                    url: "/pages/taskHall/taskHall",
                  });
                },
              });
            },
          });
        }
        wx.hideLoading();
      })
      .catch(() => {
        wx.hideLoading();
      });
  },
});
