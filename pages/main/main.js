// pages/main/lomaingin.js
const app = getApp();
const api = app.api;
const addData = app.globalData;
const version1 = __wxConfig.envVersion;
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Component({
  data: {
    version1: version1,
    findPersonalUserInfo: {}, // 用户信息数据集
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl'), // 如需尝试获取用户信息可改为false
    avatarUrl: defaultAvatarUrl,
  },

  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
      this.selectMyInfo()
    }
  },
  methods: {
    onChooseAvatar(e) {
      const {
        avatarUrl
      } = e.detail
      this.setData({
        avatarUrl,
      })
    },
    /**
     * 获取头像
     */
    canIUseOpenDataClick() {
      this.setData({
        canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl')
      })
    },
    /**
     * 退出点击
     */
    logOut() {
      api("/yyd/login/logout", {
          method: "POST",
        })
        .then((res) => {
          if (res.data) {
            wx.removeStorageSync("token");
            setTimeout(() => {
              wx.reLaunch({
                url: "/pages/login/login?flag=1",
              });
            }, 0);
          } else {
            wx.showToast({
              title: res.message ? res.message : '退出失败!', //提示的内容,
              icon: 'none', //图标,
              duration: 3000, //延迟时间,
              mask: true, //显示透明蒙层，防止触摸穿透,
            });
          }
        })
    },
    /**
     * 实名认证
     * @param {*} event 
     */
    authentication(event) {

      if (event.currentTarget.dataset.tenantid === 0) {
        //1.正常跳转
        if (event.currentTarget.dataset.identityverifystatus === 1) {
          wx.showToast({
            title: "已实名", //提示的内容,
            icon: 'success', //图标,
            duration: 2000, //延迟时间,
            mask: true, //显示透明蒙层，防止触摸穿透,
          });
        } else {
          wx.navigateTo({
            url: `/pages/mains/questionnaire/questionnaire?personalUserId=${event.currentTarget.dataset.personaluserid}`
          });
        }
      } else {
        //2.定制跳转
        if (event.currentTarget.dataset.identityverifystatus === 1) {
          wx.showToast({
            title: "已实名", //提示的内容,
            icon: 'success', //图标,
            duration: 2000, //延迟时间,
            mask: true, //显示透明蒙层，防止触摸穿透,
          });
        } else {
          wx.navigateTo({
            url: `/pages/mains/beforeRealName/index?personalUserId=${event.currentTarget.dataset.personaluserid}&certificatePath=${event.currentTarget.dataset.certificatepath}`
          });
        }
      }
    },
    /**
     * 银行卡绑定
     */
    toBindCard(event) {
      switch (event.currentTarget.dataset.cardstatus) {
        case 10:
          wx.showToast({
            title: "处理中...", //提示的内容,
            icon: 'none', //图标,
            duration: 3000, //延迟时间,
            mask: true, //显示透明蒙层，防止触摸穿透,
          });
          break;
        default:
          wx.navigateTo({
            url: `/pages/mains/bankBinding/bankBinding?personalUserId=${event.currentTarget.dataset.personaluserid}&&payAccount=${event.currentTarget.dataset.payaccount}&&phone=${event.currentTarget.dataset.phone}&cardstatus=${event.currentTarget.dataset.cardstatus}`
          });
          break;
      }
    },
    /**
     * 合规培训证书下载
     */
    downNorm(event) {
      let certificatepath = event.currentTarget.dataset.certificatepath;
      if (certificatepath && certificatepath !== "" && certificatepath !== null) {
        wx.navigateTo({
          url: `/pages/mains/beforeRealName/index?personalUserId=${event.currentTarget.dataset.personaluserid}&certificatePath=${event.currentTarget.dataset.certificatepath}&stepIndex=4`
        });
      }else{
        wx.showToast({
          title: "证书未生成！",
          icon: "none",
          duration: 3000,
        });
      }
    },
    /**
     * 已完成任务
     */
    completedTask() {
      wx.navigateTo({
        url: `/pages/mains/completedTask/completedTask`
      });
    },
    /**
     * 我的报告
     */
    reportMain() {
      wx.navigateTo({
        url: `/pages/mains/reportMain/reportMain`
      });
    },
    /**
     * 结算信息
     */
    billingInfo(event) {
      wx.navigateTo({
        url: `/pages/mains/billingInfo/billingInfo?personalUserId=${event.currentTarget.dataset.personaluserid}`
      });
    },
    /**
     * 请求我的数据集
     */
    selectMyInfo() {
      api('/personaluser/findPersonalUserInfo', {
        method: 'GET'
      }).then((res) => {
        this.setData({
          findPersonalUserInfo: res.data
        })
      })
    },
  },
});