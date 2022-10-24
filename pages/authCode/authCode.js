// pages/authCode/authCode.js
const app = getApp();
const api = app.api;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tel: "", //电话号码
    value: "", // 实际输入的值
    btnAble: false, //按钮禁用状态
    codeTitleShow: false, //验证码错误提示显示
    times: "", //验证码文字
    wait: 60, //倒计时时间
    timeDisable: true, //获取验证码是否禁用
  },
  /**
   * 验证码输入框事件
   */
  _bindinput(e) {
    if (e.detail.value.length == 6) {
      this.setData({
        btnAble: true,
      });
    } else {
      this.setData({
        btnAble: false,
      });
    }
  },
  /**
   * 登录
   */
  login() {
    let that = this;
    wx.login({
      success(res) {
        if (res.code) {
          that.checkVerificationCode(res.code); //验证登陆
        }
      },
    });
  },

  /**
   * 验证码校验接口
   */
  checkVerificationCode(code) {
    if (this.data.value.length == 6) {
      let params = {
        phone: this.data.tel,
        code: code,
        verificationCode: this.data.value,
        appId: app.appId,
      };

      api("/yyd/login/checkVerificationCode", {
        data: params,
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
        })
    }
  },

  /**
   * 验证码倒计时
   */
  timesCount() {
    if (this.data.wait === 0) {
      this.sendMessage();
    }
  },
  /**
   * 时间倒计时
   */
  time(o) {
    let that = this;
    if (this.data.wait == 0) {
      this.setData({
        times: `点击重新获取验证码`,
      });
    } else {
      this.setData({
        times: `${this.data.wait}秒后重新获取验证码`,
        wait: --this.data.wait,
      });

      setTimeout(function () {
        that.time(o);
      }, 1000);
    }
  },
  /**
   * 获取验证码
   */
  sendMessage() {
    api("/yyd/login/sendAppletVerificationCode", {
      data: {
        phone: this.data.tel,
        appId: app.appId
      },
      method: "POST",
    })
      .then(() => {
        this.setData({
          wait: 60,
        });
        wx.showToast({
          title: "发送成功",
          icon: "success",
          duration: 3000,
        });
        this.time(this);
      })
      .catch((res) => {
        wx.showToast({
          title: res.data.message ? res.data.message : "系统错误,请稍后再试",
          icon: "none",
          duration: 3000,
          mask: true, //显示透明蒙层，防止触摸穿透,
        });
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tel: options.tel,
    });
    this.sendMessage()
  },
});
