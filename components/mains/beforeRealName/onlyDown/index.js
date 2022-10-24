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
        if (certificatePath) {
          this.getImg(certificatePath);
        }
      }
    }
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
    //获取展示图片
    getImg(reqUrl) {
      let parmes = {
        data: {
          filePath:reqUrl,
        },
        responseType: 'arraybuffer',
        method: "GET"
      }
      api(`/ftpService/downloadFile`, parmes)
        .then((resbody) => {
          let url = 'data:image/png;base64,' + wx.arrayBufferToBase64(resbody)
          this.setData({
            imgUrl:url,
            base64:resbody
          })
        })
    },
    previewImage: function (e) {
      var imgUrl = this.data.imgUrl;
      wx.previewImage({
        urls: [imgUrl], // 需要预览的图片http链接列表
        current: imgUrl, // 当前显示图片的http链接
      })
    },
    //下载保存证书
    downNorm() {
      this.triggerEvent('downNorm', {
        action: "downNorm",
        url:this.data.imgUrl,
        base64:this.data.base64
      }, {})
    },
    /**
     * 返回
     */
    goBack() {
      wx.navigateBack({
        delta: 1
      })
    },
  }
})