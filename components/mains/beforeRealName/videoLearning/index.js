// components/mains/beforeRealName/videoLearning.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // imgUrl: 'https://logosdata.taxhelper.cn:9443/yydtest.jpg',
    imgUrl: './img/videoLearning.jpg',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    previewImage: function (e) {
      var imgUrl = this.data.imgUrl;
      //https地址预览
      // wx.previewImage({
      //   urls: [imgUrl], // 需要预览的图片http链接列表
      //   current: imgUrl, // 当前显示图片的http链接
      // })
    },
    //下一步  -
    nextClick() {
      this.triggerEvent('stepChange', {
        index:2
      }, {}
      )
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
