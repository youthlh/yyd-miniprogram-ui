Component({
  data: {
    selected: 0, // 当前选择的菜单下标
    dianShow: false, // 是否显示小点
    color: "#A6A6A6",
    selectedColor: "#3874f6",
    allList: [{
      list: [
        {
          "pagePath": "/pages/taskHall/taskHall",
          "text": "任务广场",
          "iconPath": "./../assets/img/taskHalloff.png",
          "selectedIconPath": "./../assets/img/taskHallon.png"
        },
        {
          "pagePath": "/pages/workbench/workbench",
          "text": "做任务",
          "iconPath": "./../assets/img/workbenchoff.png",
          "selectedIconPath": "./../assets/img/workbenchon.png"
        },
        {
          "pagePath": "/pages/main/main",
          "text": "我的",
          "iconPath": "./../assets/img/mainoff.png",
          "selectedIconPath": "./../assets/img/mainon.png"
        }
      ],
    }],
    list: []
  },
  properties: {
  },
  observers: {},
  pageLifetimes: {
  },
  lifetimes: {
    attached: function () {
      let casting = wx.getStorageSync("casting");
      switch (casting) {
        case 1:
          this.setData({
            list: this.data.allList[0].list,
          })
          break;
        case 2:
          this.setData({
            list: this.data.allList[0].list,
          })
          break;

        default:
          this.setData({
            list: this.data.allList[0].list,
          })
          break;
      }
      // 在组件实例进入页面节点树时执行
    },
  },
  methods: {

    /**
     * tab点击
     * @param {*} e 
     */
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  },
})


