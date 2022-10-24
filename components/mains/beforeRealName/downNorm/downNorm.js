// components/mains/beforeRealName/downNorm/downNorm.js
const app = getApp();
const api = app.api;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    certificatePath: {
      type: [Number, String],
      value: "",
      observer: function (certificatePath) {
        if (certificatePath && certificatePath !== "null") {
          this.getImg(certificatePath);
        }
      }
    },
    personalUserId: {
      type: [Number, String],
      value: "",
      observer: function (personalUserId) {
        // console.log("personalUserId", personalUserId)
      }
    },
  },
  lifetimes: {
    attached() {},
    show() {},
    hide() {},
    detached() {},
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrl: '',
    base64:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    previewImage: function (e) {
      var imgUrl = this.data.imgUrl;
      wx.previewImage({
        urls: [imgUrl], // 需要预览的图片http链接列表
        current: imgUrl, // 当前显示图片的http链接
      })
    },
    //获取展示图片
    getImg(reqUrl) {
      let that = this;
      let parmes = {
        data: {
          filePath: reqUrl,
        },
        responseType: 'arraybuffer',
        method: "GET"
      }
      api(`/ftpService/downloadFile`, parmes)
        .then((resbody) => {
          let url = 'data:image/png;base64,' + wx.arrayBufferToBase64(resbody)
          that.setData({
            imgUrl: url,
            base64:resbody
          })
        })
    },
    //下载保存证书
    downNorm() {
      this.triggerEvent('downNorm', {
        action: "downNorm",
        url: this.data.imgUrl,
        base64:this.data.base64
      }, {})
    },
    //开始认证
    nextClick() {
      wx.navigateTo({
        url: `/pages/mains/userAgent/userAgent?personalUserId=${this.data.personalUserId}`,
      });
    },
    /**
     * 返回
     */
    goBack() {
      this.triggerEvent('stepChange', {
        index: 2
      }, {})
    },
  }
})