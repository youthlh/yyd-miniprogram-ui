// app.js
import { initEid } from './mp_ecard_sdk/main';
import api from "./api/request";
import publicMethod from "./utils/common";
import address from "./api/appconst";
App({
  appId: wx.getAccountInfoSync().miniProgram.appId, //微信唯一凭证
  api: api.request,
  downloadFile: api.downloadFile,
  uploadFile: api.uploadFile,
  address: address,
  publicMethod: publicMethod,
  globalData: {
    userInfo: null,
    methodList: [], //监听者列表
    loadingShow: false,//全局loading
    shadeShow: false, //做任务遮罩是否显示
  }, //全局参数对象
  topicConfiguration: {
    appId: '',
    welcomeTitle: "",
    textTitle: "",
  },//主题配置
  topicConfigurations: [
    {
      appId: 'wx2eb24ba13b51fe9e',
      welcomeTitle: "YAO有道",
      textTitle: "要有道",
    },
  ],//主题配置集合

  //app 全局属性监听
  watch: function (method) {
    const obj = this.globalData;
    obj.methodList.push(method); //加入到监听者列表中

    Object.defineProperty(this, "globalData", { //这里的 data 对应 上面 globalData 中的 data
      configurable: true,
      enumerable: true,
      set: function (value) { //动态赋值，传递对象，为 globalData 中对应变量赋值
        obj.orderNum = value.orderNum;
        obj.methodList.forEach(element => {
          element ?
            element(value) : ''; // 遍历监听者列表，回调
        });
      },
      get: function () { //获取全局变量值，直接返回全部
        return obj;
      }
    })
  },
  onLaunch() {
    this.topicConfiguration = this.topicConfigurations.filter(element => {
      return element.appId == this.appId
    })[0];//设置当前的微信小程序
    wx.setNavigationBarTitle({
      title: this.topicConfiguration.textTitle,
    });
    initEid();
  },
  onShow(options) {
    const { referrerInfo, scene } = options;
    /* 判断是否从eID数字身份小程序返回 */
    const { appId } = referrerInfo;
    if (scene === 1038 && appId === 'wx0e2cb0b052a91c92') {
      return;
    } else {
      // 执行接入方小程序原本的逻辑
    }
  },
});