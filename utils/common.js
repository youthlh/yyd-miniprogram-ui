/**
 * 格式化手机号
 */
const kongge_string = (e) => {
	var kongge_phone = e.replace(/\s*/g, '')
	var result = []
	for (var i = 0; i < kongge_phone.length; i++) {
		if (i == 3 || i == 7) {
			result.push(' ' + kongge_phone.charAt(i))
		} else {
			result.push(kongge_phone.charAt(i))
		}
	}
	kongge_phone = result.join('')
	return kongge_phone
}

/**
 * 格式化银行卡号
 */
const kongge_card = (val) => {
	return val.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
}


/**
 * @param {*} timestamp  时间戳
 * @param {*} type 连接的方式 text(yyyy年mm月dd日) date(yyyy年mm月dd日 hh:mm:ss) 其他(yyyy{{type}}mm{{type}}dd)默认"-"
 * @returns 
 */
const formatDate = (timestamp, type = '-') => {
	let add0 = (m) => {
		return m < 10 ? '0' + m : m
	}
	if (timestamp && typeof timestamp == 'number') {
		//timestamp是整数，否则要parseInt转换,不会出现少个0的情况
		var time = new Date(timestamp)
		var year = time.getFullYear()
		var month = time.getMonth() + 1
		var date = time.getDate()
		var hours = time.getHours()
		var minutes = time.getMinutes()
		var seconds = time.getSeconds()
		switch (type) {
			case "text":
				return `${year}年${add0(month)}月${add0(date)}日`
			case "date":
				return `${year}年${add0(month)}月${add0(date)}日 ${add0(hours)}:${add0(minutes)}:${add0(seconds)}`
			case "time":
				return `${year}/${add0(month)}/${add0(date)} ${add0(hours)}:${add0(minutes)}:${add0(seconds)}`
			case "times":
				return `${add0(hours)}:${add0(minutes)}`;
			default:
				return `${year}${type}${add0(month)}${type}${add0(date)}`
		}
	} else if (timestamp && typeof timestamp == 'string') {
		return timestamp
	} else {
		return '----/--/--'
	}
}
/**
 * 时间差
 */
function timeDifference(start, end) {
	if (start && end) {
		let startTime = new Date(start).getTime(), endTime = new Date(end).getTime();
		let time = endTime - startTime;
		return Math.floor(time / (24 * 3600 * 1000))
	}

}
/** 
身份证掩码
*/
function idCardFormat(str) {
	return str != null ? str.replace(/(\w{6})\w*(\w{4})/, '$1********$2') : null
}
/***
 * 千分位格式化
 */
function toThousands(value) {
	let num = (value || 0).toString(),
		result = "";
	let isDecimal = false;
	let numAttr;
	if (num.indexOf(".") == -1) {
		num = `${num}.00`
	}
	isDecimal = true;
	numAttr = num.split(".");
	num = numAttr[0];
	while (num.length > 3) {
		result = `,${num.slice(-3) + result}`;
		num = num.slice(0, num.length - 3);
	}
	if (num) {
		result = num + result;
	}
	if (isDecimal && numAttr.length > 1) {
		if (numAttr[1].length == 1) {
			numAttr[1] = `${numAttr[1]}0`
		}
		result = `${result}.${numAttr[1]}`;
	}
	return result;
}
/***
 * 数字格式化
 */
function delcommafy(num) {
	if (!num || (num + "").trim() == "") {
		return "";
	}
	num = num.replace(/,/gi, "");
	if (num.indexOf(".") !== -1 && num.split(".")[1] == '00') {
		num = num.split(".")[0]
	}
	return num;
}
/**
 *截流
 */
function debounce(func, wait, val) {
	var context = null
	if (func.timeout) {
		clearTimeout(func.timeout)
	}
	const callNow = !func.timeout
	func.timeout = setTimeout(() => {
		func.timeout = null
	}, wait)
	if (callNow && val) {
		func.call(context, val)
	} else if (callNow) {
		func.call(context)
	}
}
/**
 * 邮箱验证
 * @param str 
 */
function mailboxFormat(str) {
	let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	str = str.replace(/(^\s*)|(\s*$)/g, "");
	return pattern.test(str) ? true : false
}
export default {
	kongge_string,
	kongge_card,
	formatDate,
	idCardFormat,
	toThousands,
	delcommafy,
	debounce,
	timeDifference,
	mailboxFormat
}
