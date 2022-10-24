// pages/mains/beforeRealName/beforeRealName.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    stepIndex: 1, //1 视频学习  2 合规考试  3 合规考试通过-下载证书   4 仅下载-合规培训证书下载
    downOnly: false, //是否指定页面为仅下载模式
    certificatePath: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    if (options.stepIndex) {
      //2.合规培训证书下载-进入
      this.setData({
        id: options.personalUserId,
        stepIndex: parseInt(options.stepIndex),
        certificatePath: options.certificatePath
      });
    } else {
      //1.实名认证进入
      if (options.certificatePath && options.certificatePath !== "null") {
        //已有证书
        this.setData({
          id: options.personalUserId,
          stepIndex: 3,
          certificatePath: options.certificatePath
        });
      } else {
        //没有证书
        this.setData({
          id: options.personalUserId,
        });
      }

    }
    console.log("options", options)
    let title = "";
    let index = this.data.stepIndex;
    if (index === 1) {
      title = "合规视频培训学习";
    } else if (index === 2) {
      title = "问卷";
    } else if (index === 3) {
      title = "下载证书";
    } else if (index === 4) {
      title = "合规培训证书下载";
    }
    wx.setNavigationBarTitle({
      title
    });
  },
  //下载保存证书
  downNorm(data) {
    let {
      detail: {
        base64
      }
    } = data;
    //保存图片
    this.downloadReport(base64)
  },
  //获取到服务器的图片地址
  serverUrlChange(data) {
    let {
      detail: {
        serverUrl
      }
    } = data;
    console.log("获取到服务器的图片地址", serverUrl);
    if (serverUrl) {
      this.setData({
        certificatePath: serverUrl,
        stepIndex: 3, //前往下一步
      });
    }
  },
  //切换流程 设置title
  stepChange(data) {
    let {
      detail: {
        index
      }
    } = data;
    console.log("第几步", index);
    this.setData({
      stepIndex: index
    })
    let title = "";
    if (index === 1) {
      title = "合规视频培训学习";
    } else if (index === 2) {
      title = "问卷";
    } else if (index === 3) {
      title = "下载证书";
    } else if (index === 4) {
      title = "合规培训证书下载";
    }
    wx.setNavigationBarTitle({
      title
    });
  },
  /**
   * 返回
   */
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  //将base64图片文件保存至用户系统相册
  downloadReport(base64) {
    const that = this;
    var filepath = wx.env.USER_DATA_PATH + '/个体合作项目合规培训.jpg';
    //获取文件管理器对象
    var aa = wx.getFileSystemManager();
    aa.writeFile({
      filePath: filepath,
      data: base64,
      encoding: 'base64',
      success: res => {
        wx.showLoading({
          title: '正在保存...',
          mask: true
        });
        //保存图片到相册
        wx.saveImageToPhotosAlbum({
          filePath: filepath,
          success: function (res) {
            wx.hideLoading();
            wx.showToast({
              title: '保存成功！',
              icon: 'success',
              duration: 2000 //持续的时间
            })
          },
          fail: function (err) {
            wx.hideLoading();
            if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
              wx.showModal({
                title: '提示',
                content: '需要您授权保存相册',
                showCancel: false,
                success: modalSuccess => {
                  wx.openSetting({
                    success(settingdata) {
                      console.log("settingdata", settingdata)
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限成功,再次点击下载按钮进行保存',
                          showCancel: false,
                        })
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限失败，将无法保存到相册哦~',
                          showCancel: false,
                        })
                      }
                    },
                    fail(failData) {
                      console.log("failData", failData)
                    },
                    complete(finishData) {
                      console.log("finishData", finishData)
                    }
                  })
                }
              })
            }
          }
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})