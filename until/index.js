import Vue from 'vue';
import "static/icon/iconfont.css";
import store from '../store';
// let apiUrl = "http://39.100.62.29:9922";
let apiUrl = 'https://yuyue.wsstreet.net';
Vue.prototype.$getApi = function(url, data,callsuc,callerr, method, token) {
	// url = 'System/Login?loginContent=admin&password=123456'
		method = method || 'post';
		token = token || true;
		if(token){
			data.token = uni.getStorageSync('userInfo').remember_token;
		}
		uni.request({
			url: apiUrl +'/api/'+ url, //仅为示例，并非真实接口地址。
			method: method,
			data: data,
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: (res) => {
				callsuc instanceof Function && callsuc(res)
			},
			fail: (err) => {
				callerr instanceof Function && callerr(err)
			}
		});

}
Vue.prototype.$store = store;

const msg = (title, duration=1500, mask=false, icon='none')=>{
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

import lodash from 'lodash';
Vue.prototype._ = lodash;

