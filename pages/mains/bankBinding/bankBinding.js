const app = getApp();
const api = app.api;
const ocrSDK = require("./../ocrsdk/index");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    appId: app.appId, //当前小程序的appid
    authCode: '获取验证码',
    time: 60,
    cardstatus: '',
    personalUserId: null,// 会员主键
    payAccount: "", // 银行卡号
    phone: "", // 手机号
    verificationCode: "",// 验证码
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
   * 扫描填卡
   */
  scanCard() {
    ocrSDK.start({
      getAuthorization: function () {
        return new Promise((resolve, reject) => {
          wx.request({
            url: `${app.address.HTTP_BASE_URL}/txyManagement/getTemplateKey`, // 填写您服务器端的接口地址，获取临时密钥
            method: "POST",
            success(res) {
              let credentials = res.data.Credentials;
              console.log(credentials)
              resolve({
                tmpSecretId: credentials.TmpSecretId,
                tmpSecretKey: credentials.TmpSecretKey,
                token: credentials.Token,
              })
            },
            fail(err) {
              resolve(err)
              wx.navigateTo({
                url: `/pages/mains/bankBinding/bankBinding?personalUserId=${this.data.personalUserId}&&payAccount=${this.data.payAccount}&&phone=${this.data.phone}&cardstatus=${this.data.cardstatus}`
              });
            }
          })
        })
      },
      ocrType: ocrSDK.OcrType.BANK_CARD,
      cameraConfig: {
        autoMode: true,
        maxTry: 3,
      },
      resultPage: true,
      resultPageConfig: {
        modifiable: true,
      },
      theme: 'primary',
      success: (res) => {
        wx.navigateTo({
          url: `/pages/mains/bankBinding/bankBinding?personalUserId=${this.data.personalUserId}&&payAccount=${res.CardNo}&&phone=${this.data.phone}&cardstatus=${this.data.cardstatus}`
        });
      },
      fail: (error) => {
        wx.showToast({
          title: "识别错误,请稍后再试", //提示的内容,
          icon: 'none', //图标,
          duration: 3000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
        });
        setTimeout(() => {
          wx.navigateTo({
            url: `/pages/mains/bankBinding/bankBinding?personalUserId=${this.data.personalUserId}&&payAccount=${this.data.payAccount}&&phone=${this.data.phone}&cardstatus=${this.data.cardstatus}`
          });
        }, 2500);
        console.log('ocr failed:', error)
      }
    });
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
    if (!this.data.phone) {
      wx.showToast({
        title: "请输入手机号",
        icon: "none",
        duration: 3000,
      });
      return false;
    }
    if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(this.data.phone)) {
      wx.showToast({
        title: "手机号有误",
        icon: "none",
        duration: 3000,
      });
      return false;
    } else {
      wx.showLoading({
        mask: true,
        title: "发送中",
      });
      api("/personaluser/personalUsers/updateBankAccount", {
        data: {
          personalUserId: this.data.personalUserId,
          payAccount: this.data.payAccount,
          phone: this.data.phone,
        },
        method: "POST",
      })
        .then((res) => {
          let data = res.data;
          if (data) {
            this.time();
            wx.hideLoading();
          } else {
            wx.showToast({
              title: res.message ? res.message : '获取失败,请稍后再试',
              icon: "none",
              duration: 3000,
            });
          }
        });
    }
  },
  /**
   * 时间倒计时
   */
  time() {
    let that = this;
    if (this.data.time == 0) {
      this.setData({
        authCode: `获取验证码`,
      });
    } else {
      this.setData({
        authCode: `${this.data.time}S 后重新获取`,
        time: --this.data.time,
      });

      setTimeout(function () {
        that.time();
      }, 1000);
    }
  },

  /**
   * 点击绑定验证
   * @param {*} e 
   */
  formSubmit: function (e) {
    let data = e.detail.value
    wx.showLoading({
      mask: true,
      title: "loading...",
    });
    api("/personaluser/personalUsers/updateBankAccountConfirm", {
      data: {
        personalUserId: this.data.personalUserId,
        payAccount: data.payAccount,
        verificationCode: data.verificationCode,
      },
      method: "POST",
    })
      .then((res) => {
        wx.hideLoading();
        let data = res.data;
        if (data) {
          wx.showToast({
            title: '绑定成功',
            icon: "none",
            duration: 3000,
            mask: true, //显示透明蒙层，防止触摸穿透,
          });
          setTimeout(() => {
            wx.switchTab({
              url: "/pages/main/main",
            });
          }, 1000);

        } else {
          wx.showToast({
            title: data.message ? data.message : '绑定失败,请稍后再试',
            icon: "none",
            duration: 3000,
          });
        }
      });
  },

  /**
   * 重置点击
   * @param {*} e 
   */
  formReset: function () {
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (opaction) {
    this.setData({
      personalUserId: opaction.personalUserId,
      payAccount: "",
      phone: opaction.phone,
      cardstatus: opaction.cardstatus,
    }, () => {
      this.setData({
        payAccount: opaction.payAccount,
      })
      wx.setNavigationBarTitle({
        title: opaction.cardstatus == '30' ? "重新银行卡绑定" : "银行卡绑定"
      })
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
});
