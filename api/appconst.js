// 网络的域名的路径
let HTTP_BASE_URL = "",
  version = __wxConfig.envVersion;
//开发环境  https://logosdata.taxhelper.cn:9443/yyd/dev/miniprogram
//测试环境：https://logosdata.taxhelper.cn:9443/yyd/test/miniprogram
//外侧/演示环境：https://testyyd.taxhelper.cn/miniprogram
//预生产：https://preyyd.taxhelper.cn:6443/miniprogram
//生产环境: https://www.yaoyoudao.com/miniprogram
switch (version) {
  case "develop": //开发版,测试版
  {
    HTTP_BASE_URL = "https://logosdata.taxhelper.cn:9443/yyd/dev/miniprogram";
  }

  break;
case "trial": //体验版
{
  HTTP_BASE_URL = "https://logosdata.taxhelper.cn:9443/yyd/test/miniprogram";
}

break;
case "release": //正式版
{
  HTTP_BASE_URL = "https://www.yaoyoudao.com/miniprogram";
}
break;
default:
  HTTP_BASE_URL = "https://logosdata.taxhelper.cn:8661/miniprogram";
}

export default {
  HTTP_BASE_URL,
};