// components/picShow/picShow.js
const app = getApp();
const sMD5 = require('./../../utils/spark-md5.js')
const FileSystemManager = wx.getFileSystemManager()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgList: { //要回显的图片
      type: Array,
      value: []
    },//默认参数
    num: {
      type: Number,
      value: 1
    },//每次最多上传多少
    numSum: {
      type: Number,
      value: 9
    },//一共可以上传多少
    urls: {
      type: String,
      value: ''
    },//上传接口url
    fileType: {
      type: Number,
      value: 0
    },//上传接口参数
    readOnly: {
      type: Boolean,
      value: false
    },//是否只读
    checkAgain: {
      type: Boolean,
      value: true
    },//是否验证重复
  },
  observers: {
    'imgList': function (val) {
      if (val && val.length) {
        this.setData({
          newArr: val,
          cWidth: 0,
          cHeight: 0
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    newArr: [], //上传图片最后的数组
    photoMd5: [], // 上传图片的md5集合
    cWidth: 0,
    cHeight: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    uploadImg() {
      if (this.data.newArr.length == this.data.numSum) {
        return
      }
      let that = this;
      wx.chooseImage({
        count: that.properties.num, //最多可以选择的图片张数,
        sizeType: ['compressed'],//['original', 'compressed']  所选的图片的尺寸
        sourceType: ['album', 'camera'],//选择图片的来源
        success: imgList => {
          if (imgList.tempFilePaths.length + that.data.newArr.length > that.data.numSum) {
            wx.showToast({
              title: `最多可以选择${that.data.numSum}张图片`,
              icon: "none",
              duration: 3000,
            });
          } else {
            wx.showLoading({
              mask: true,
              title: "上传中...",
            });
            let tempFiles = imgList.tempFiles;
            let i = 0;
            var arr = [];
            that.getCanvasImg(that, tempFiles, i, 1, arr);
          }
        },
      });
    },
    /**
     * 选择图片 获取图片MD5
     * 获取文件的md5
     * @param {*} tempFilePaths 
     */
    md5CheckAgain(tempFilePaths) {
      return new Promise((resolve) => {
        FileSystemManager.readFile({
          filePath: tempFilePaths, //选择图片返回的相对路径
          success: res => {
            let spark = new sMD5.ArrayBuffer();
            spark.append(res.data);
            let photoMd5 = spark.end(false);
            resolve(photoMd5)
          },
          fail() {
            resolve()
          }
        })
      })
    },
    /**
     * 压缩图片
     * @param {*} that 
     * @param {*} tempFiles 
     * @param {*} i 
     * @param {*} quality 
     * @param {*} arr 
     * @returns 
     */
    async getCanvasImg(that, tempFiles, i, quality, arr) {
      let photoMd5List = await that.md5CheckAgain(tempFiles[i].path);
      console.log(photoMd5List)
      if (that.data.checkAgain && that.data.photoMd5.length && that.data.photoMd5.includes(photoMd5List)) {
        wx.showToast({
          title: '上传文件重复,请重新选择',
          icon: 'none',
          duration: 3000,
          mask: true,
        })
        setTimeout(() => {
          wx.hideLoading();
        }, 3000);
        return
      } else {
        that.data.photoMd5.push(photoMd5List);
        that.setData({
          photoMd5: that.data.photoMd5
        })
      }
      if (tempFiles[i].size < 5242880) { // 1000K
        arr.push(
          {
            filePath: tempFiles[i].path,
            photoMd5: photoMd5List
          }
        );
        i++;
        if (i == tempFiles.length) { //当图片传完时，停止调用 
          that.getImgUrlList(arr)
          return;
        } else {//若图片还没有传完，则继续调用函数
          that.getCanvasImg(that, tempFiles, i, quality, arr);
        }
        return;
      }
      wx.getImageInfo({
        src: tempFiles[i].path,
        success: function (res) {
          let canvasWidth = res.width;
          let canvasHeight = res.height;
          that.setData({
            cWidth: canvasWidth,
            cHeight: canvasHeight
          })
          const ctx = wx.createCanvasContext('canvas', that);
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
          ctx.drawImage(tempFiles[i].path, 0, 0, canvasWidth, canvasHeight);
          ctx.draw(false, function () {
            setTimeout(() => {
              wx.canvasToTempFilePath({
                canvasId: 'canvas',
                fileType: 'jpg',
                quality: 0.8,
                success: function success(res) {
                  arr.push(
                    {
                      filePath: res.tempFilePath,
                      photoMd5: photoMd5List
                    }
                  );
                  i++;
                  if (i == tempFiles.length) { //当图片传完时，停止调用 
                    that.getImgUrlList(arr)
                    return;
                  } else {//若图片还没有传完，则继续调用函数
                    that.getCanvasImg(that, tempFiles, i, quality, arr);
                  }
                },
                fail: function (e) {
                  wx.hideLoading();
                  wx.showToast({
                    title: '图片上传失败，请重新上传！',
                    icon: 'none',
                    duration: 3000,
                  })
                }
              }, that);
            }, 200);
          }, that);
        }
      })
    },
    /**
     * push
     * @param {*} result1 
     */
    getImgUrlList(result1) {
      let result = this.deepCopy(result1);
      let i = 0;
      var arr = [];
      let that = this;
      this.uploadFile(that, result, i, arr);
    },
    /**
     * 参数复制
     * @param {深拷贝} data
     */
    deepCopy(data) {
      let json = JSON.stringify(data);
      return JSON.parse(json);
    },

    /**
     * 上传图片
     * 接口上传
     * @param {*} that 
     * @param {*} result 
     * @param {*} index 
     * @param {*} newArr1 
     */
    uploadFile(that, result, index, newArr1) {
      let parmes = {
        filePath: result[index]['filePath'],
        formData: {
          fileType: that.properties.fileType,
        },

      }
      app.uploadFile(that.properties.urls, parmes)
        .then((res) => {
          if (res.data) {
            newArr1.push({
              url: result[index]['filePath'],
              photoPath: res.data,
              photoMd5: result[index]['photoMd5']
            })
            if (index == result.length - 1) {
              that.data.newArr = [...that.data.newArr, ...newArr1];
              that.setData({
                newArr: that.data.newArr
              }, () => {

                wx.hideLoading();
                that.triggerEvent("getUploadImg", that.data.newArr)
              })
            } else {
              index++;
              that.uploadFile(that, result, index, newArr1);
            }
          }
        })
    },


    /***
     * 在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作
     */
    previewImg(e) {
      var idx = e.currentTarget.dataset.idx;
      let photoPath = [];
      this.data.newArr.forEach(element => {
        photoPath.push(element.url)
      });
      wx.previewImage({
        current: photoPath[idx], // 当前显示图片的http链接
        urls: photoPath, // 需要预览的图片http链接列表
        showmenu: true,//是否显示长按菜单
      })
    },
    /**
     * 长按
     * 删除图片
     * @param {*} e 
     */
    deleteImage(e) {
      let idx = e.currentTarget.dataset.idx1,
        newArr1 = this.deepCopy(this.data.newArr),
        photoMd51 = this.deepCopy(this.data.photoMd5),
        that = this;
      photoMd51.splice(idx, 1)
      newArr1.splice(idx, 1)
      this.setData({
        newArr: newArr1,
        photoMd5: photoMd51
      }, () => {
        that.triggerEvent("getUploadImg", that.data.newArr)
      })
    }
  },
})