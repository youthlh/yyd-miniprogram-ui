// pages/register/register.js
const app = getApp();
const api = app.api;
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		appId: app.appId, //当前小程序的appid
		code: null,//唯一标识
		welcomeTitle: '',//主题文案

		tenantId: null,// 租户唯一ID
		personalUserName: "",// 姓名
		idCard: "",// 身份证号
		email: "",// 邮箱
		address: "",// 联系地址
		phone: "",// 手机号
		verificationCode: "",// 验证码
		verificationCodeText: '获取验证码',

		wait: 60,//等待时间
	},

	/**
	 * 键盘输入时触发，event.detail = {value, cursor, keyCode}
	 * keyCode 为键值，2.1.0 起支持
	 * 处理函数可以直接 return 一个字符串，将替换输入框的内容。
	 */
	_bindinput: function () { },

	/**
	 * 叉号删除input框内容
	 */
	delIpt: function (e) {
		let data = e.currentTarget.dataset.type;
		this.setData(
			{
				[data]: "",
			},
			() => {
				// console.log(this.data.phone);
			}
		);
	},
	/**
	 * 获取验证码
	 * 
	 */
	getCode() {
		if (!this.data.phone) {
			wx.showToast({
				title: "请输入手机号",
				icon: "none",
				duration: 3000,
			});
			return false;
		}
		if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(this.data.phone)) {
			wx.showToast({
				title: "手机号有误",
				icon: "none",
				duration: 3000,
			});
			return false;
		} else {
			this.selectComponent('#captcha').show()
		}
	},
	// 验证码验证结果回调
	handlerVerify(ev) {
		// 如果使用了 mpvue，ev.detail 需要换成 ev.mp.detail
		if (ev.detail.ret === 0) {
			this.captchaVerification(ev.detail.ticket)
			// 验证成功
		} else {
			wx.showToast({
				title: "验证失败,请稍后再试",
				icon: "none",
				duration: 2000,
				mask: true, //显示透明蒙层，防止触摸穿透,
			});
			// 验证失败
			// 请不要在验证失败中调用refresh，验证码内部会进行相应处理
		}
	},
	/**
	 * 验证码验证结果后操作
	 */
	captchaVerification(ticket) {
		let parmes = {
			ticket: ticket,
		}
		api(`/txyManagement/getDescribeCaptchaMiniResult`, {
			data: parmes,
			method: "POST",
		})
			.then((res) => {
				if (res.data) {
					this.sendVerificationCode()
				} else {
					wx.showToast({
						title: "验证失败,请稍后再试",
						icon: "none",
						duration: 2000,
					});
				}
			})
	},
	/**
	 * 发送短信验证码
	 */
	sendVerificationCode() {
		let parmes = {
			phone: this.data.phone,
		}
		api(`/yyd/login/sendRegisterVerificationCode`, {
			data: parmes,
			method: "POST",
		})
			.then((res) => {
				if (res.data) {
					this.time()
				}
			})
	},

	// 验证码准备就绪
	handlerReady() {
		console.log('验证码准备就绪')
	},
	// 验证码弹框准备关闭
	handlerClose() {
		console.log('验证码弹框准备关闭')
	},
	// 验证码出错
	handlerError(ev) {
		wx.showToast({
			title: ev.detail.errMsg ? ev.detail.errMsg : "验证失败,请稍后再试",
			icon: "none",
			duration: 2000,
			mask: true, //显示透明蒙层，防止触摸穿透,
		});
	},
	/**
	 * 时间倒计时
	 */
	time() {
		let that = this;
		if (this.data.wait == 0) {
			this.setData({
				verificationCodeText: `获取验证码`,
				wait: 60,
			});
		} else {
			this.setData({
				verificationCodeText: `${this.data.wait}S 重新获取`,
				wait: --this.data.wait,
			});

			setTimeout(function () {
				that.time();
			}, 1000);
		}
	},

	/**
	 * 点击注册验证
	 * @param {*} e 
	 */
	formSubmit: function (e) {
		let parmes = e.detail.value;
		parmes.email ? '' : parmes.email = `${parmes.phone}@yaoyoudao.com`
		parmes['tenantId'] = this.data.tenantId;
		parmes['appId'] = this.data.appId;
		parmes['code'] = this.data.code;
		api(`/yyd/login/register`, {
			data: parmes,
			method: "POST",
		})
			.then((res) => {
				if (res.data) {
					wx.setStorage({
						key: "token",
						data: res.token,
						success: function () {
							wx.showToast({
								title: "注册成功",
								icon: "none",
								duration: 3000,
								mask: true, //显示透明蒙层，防止触摸穿透,
							});
							setTimeout(() => {
								wx.switchTab({
									url: "/pages/taskHall/taskHall",
								});
							}, 3000);

						},
					});
				}
			})
	},

	/**
	 * 重置点击
	 * @param {*} e 
	 */
	formReset: function (e) {
		console.log(e.detail.value.textarea)
	},
	/**
	 * 生命周期函数--监听页面加载
	 */

	onLoad: function (options) {
		this.setData({
			welcomeTitle: app.topicConfiguration.welcomeTitle,
		})
		let qrUrl = options.q;
		if (qrUrl) { // 二维码进入的情况
			qrUrl = decodeURIComponent(qrUrl);  //  获取二维码中带的地址及参数
			//  解析二维码中地址中的参数   name为二维码中地址带的参数名  	如index/index?name=xxx&uid=xxx
			var eid = this.getQueryVariable(qrUrl, "eid");
			this.setData({
				tenantId: eid
			})
		}
		if (wx.canIUse('hideHomeButton')) {
			wx.hideHomeButton()
		}
	},
	/**
	 * GetQueryString   二维码参数转换提取
	 * 参数
	 * url      二维码参数
	 * name     需要提取的参数
	 */
	getQueryVariable(url, variable) {
		var query = url.split('?')[1]
		var vars = query.split('&')
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=')
			if (pair[0] == variable) {
				return pair[1]
			}
		}
		return false
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		if (wx.canIUse('hideHomeButton')) {
			wx.hideHomeButton()
		}
		let that = this
		wx.login({
			success(res) {
				if (res.code) {
					that.setData({
						code: res.code,
					})
				}
			},
		})
	},
});
