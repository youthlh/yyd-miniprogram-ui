import address from "./appconst";

const request = (url, params = {}) => {
  return new Promise((reslove, reject) => {
    wx.request({
      url: `${address.HTTP_BASE_URL}${url}`, //开发者服务器接口地址",
      data: params.data || {}, //请求的参数",
      method: params.method || "GET",
      dataType: params.dataType || "json", //如果设为json，会尝试对返回的数据做一次 JSON.parse
      responseType: params.responseType || null,
      header: params.header || {
        "Content-Type": "application/json",
        token: wx.getStorageSync("token") ? wx.getStorageSync("token") : "",
      },
      success(data) {
        switch (data.statusCode) {
          case 200:
            if (data.data.code === "2000" || params.responseType == "arraybuffer") {
              reslove(data.data);
            } else {
              let nutShow = ["/yyd/login/checkAppletLoginCode"];// 不需要提示的url集合
              if (!nutShow.includes(url)) {
                wx.showToast({
                  title: data.data.message ? data.data.message : "服务开小差",
                  icon: "none",
                  duration: 3000,
                });
              }
              reject(data);
            }
            break;
          case 401:
            wx.removeStorageSync("token");
            wx.reLaunch({
              url: "/pages/login/login?flag=0",
            });
            wx.showToast({
              title: "401",
              icon: "none",
              duration: 3000,
            });
            break;

          default:
            wx.showToast({
              title: data.data.message ? data.data.message : "服务开小差",
              icon: "none",
              duration: 3000,
            });
            reject(data);
            break;
        }
      },
      fail(err) {
        wx.showToast({
          title: "网络开小差",
          icon: "none",
          duration: 18000,
        });
        reject(err);
      },
    });
  });
};
// 下载
const downloadFile = (url) => {
  return new Promise((reslove, reject) => {
    wx.downloadFile({
      url: `${address.HTTP_BASE_URL}${url}`, //开发者服务器接口地址",
      header: {
        token: wx.getStorageSync("token") ? wx.getStorageSync("token") : "",
      },
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          reslove(res.tempFilePath);
        }
      }
    })
  });
};
//上传
const uploadFile = (url, parmes) => {
  return new Promise((reslove, reject) => {
    wx.uploadFile({
      url: `${address.HTTP_BASE_URL}${url}`, //开发者服务器接口地址",
      filePath: parmes.filePath ? parmes.filePath : '',
      name: "file",
      formData: parmes.formData,
      method: parmes.method || "POST",
      header: {
        token: wx.getStorageSync("token") ? wx.getStorageSync("token") : "",
      },
      success(res) {
        if (res.statusCode === 200) {
          let data = JSON.parse(res.data);
          reslove(data);
        }
      }
    })
  });
};

export default {
  request,
  downloadFile,
  uploadFile
};
