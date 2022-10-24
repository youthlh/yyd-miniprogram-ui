import { startEid } from './../../../mp_ecard_sdk/main';
var app = getApp();
const api = app.api;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',//会员ID
    signatureImg: '',//签名
    argumentsArr: [],// 富文本内容
    argumentsArrIndex: 0,// 富文本内容下标
    signatureShow: false,// 签名是否显示
    checkboxShow: false,//checkbox是否选中
    authentication: false,//是否禁用认证按钮
  },
  /**
   * 获取富文本内容
   */
  getCont(data) {
    let parmes = {
      personalUserId: data,
    };
    api('/personaluser/findPersonalUserAgreement', {
      data: parmes,
      method: 'GET'
    }).then((res) => {
      if (res.data.length) {
        wx.removeStorageSync("signatureImg")
        this.setData({
          argumentsArrIndex: 0,
          argumentsArr: res.data,
        });
      } else {
        wx.showToast({
          title: "请配置用户协议",
          icon: "none",
          duration: 3000,
        });
      }
    })
  },
  /**
   * 签名
   */
  signatureChange() {
    wx.removeStorageSync("signatureImg");
    this.setData({
      signatureShow: true,
    }, () => {
      wx.navigateTo({
        url: `/pages/mains/signature/signature?personalUserId=${this.data.id}`,
      });
    });

  },
  /**
 *  选择起选择事件
 */
  checkboxChange() {
    this.setData({
      checkboxShow: !this.data.checkboxShow
    })
  },
  /**
   * 确认协议
   */
  sure() {
    let that = this;
    if (this.data.argumentsArrIndex < this.data.argumentsArr.length - 1) {
      this.setData({
        argumentsArrIndex: this.data.argumentsArrIndex + 1,
      });
    } else {
      this.setData({
        authentication: true,
      });
      api("/txyManagement/getEidToken", {
        method: "GET",
      })
        .then((res) => {
          let data = res.data;
          if (data.flag) {
            wx.setStorage({
              key: "bizToken",
              data: data.bizToken,
              success: function () {
                that.goSDK(data.bizToken)
              },
            });
          } else {
            wx.showToast({
              title: data.message ? data.message : "bizToken,请稍后再试",
              icon: "none",
              duration: 3000,
            });
          }
          this.setData({
            authentication: false,
          });
        }).catch(() => {
          this.setData({
            authentication: false,
          });
        })
    }

  },
  /**
   * 返回
   */
  notKnow() {
    wx.switchTab({
      url: "/pages/main/main",
    });
  },
  // 示例方法
  goSDK(token) {
    startEid({
      data: {
        token,
      },
      verifyDoneCallback(res) {
        const { token, verifyDone } = res;
        console.log('收到核身完成的res:', res);
        console.log('核身的token是:', token);
        console.log('是否完成核身:', verifyDone);
        if (verifyDone) {
          app.extraDatas = {
            verifyDone: verifyDone,
            token: token,
          };
          setTimeout(() => {
            wx.reLaunch({
              url: `/pages/mains/showStatusEzt/showStatusEzt?flag=1`,
            });
          }, 200);
        }
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opaction) {
    wx.setNavigationBarTitle({
      title: '用户协议',
    });
    this.setData({
      id: opaction.personalUserId
    }, () => {
      this.getCont(opaction.personalUserId);
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
    let _signatureImg = wx.getStorageSync("signatureImg")
    if (_signatureImg) {
      this.setData({
        signatureImg: _signatureImg,
        signatureShow: true
      })
    } else {
      wx.removeStorageSync("signatureImg");
      this.setData({
        signatureShow: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.removeStorageSync("signatureImg");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { wx.removeStorageSync("signatureImg"); },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },
});
