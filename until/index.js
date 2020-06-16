import Vue from 'vue';
import store from '../store';
// let apiUrl = "http://39.100.62.29:9922";
let apiUrl = 'https://yuyue.wsstreet.net';
Vue.prototype.$apiUrl = 'https://yuyue.wsstreet.net';
// import Qs from "qs";
Vue.prototype.$getApi = function(url, data, callsuc, token) {
	// url = 'System/Login?loginContent=admin&password=123456'
	token = token == "false" ? false : true;
	data = data ? data : {};
	console.log("token", token);
	let userInfo = uni.getStorageSync('userInfo');
	if (token && userInfo) {
		data.token = userInfo.remember_token;
		data.page = 1;
		data.paginate = 200;
	}
	// console.log("data", data)
	uni.showLoading({
	    title: '加载中'
	});
	uni.request({
		// url: apiUrl +'/api/'+ url +'?'+Qs.stringify(data), //仅为示例，并非真实接口地址。
		url: apiUrl + url,
		method: 'post',
		data: data,
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		success: (res) => {
			uni.hideLoading();
			// console.log(res)this.$msg("您输入的参数有误,请检查")
			if (res.data.code == 200) {
				// this.$msg(res.data.msg)
				callsuc instanceof Function && callsuc(res.data)
			} else
			if (res.data.code == 201) {
				this.$msg("您输入的参数有误,请检查")
			} else
			if (res.data.code == 202) {
				this.$msg("请先绑定手机号")
			} else
			if (res.data.code == 401) {
				this.$msg("登录已过期,请重新登录")
				uni.reLaunch({
					url: '../login/yLogin'
				})
			} else {
				this.$msg(res.data.msg)	
			}
		},
		fail: (err) => {
			callerr instanceof Function && callerr(err)
		}
	});
}
Vue.prototype.$store = store;

const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	title = title || "请输入完整信息";
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
Vue.prototype.$msg = msg;

Vue.prototype.$httpp = "https://yuyue.wsstreet.net/uploads/";
