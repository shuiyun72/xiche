import Vue from 'vue';
import store from '../store';
// let apiUrl = "http://39.100.62.29:9922";
let apiUrl = 'https://yuyue.wsstreet.net';
Vue.prototype.$getApi = function(url, data,callsuc,token) {
	// url = 'System/Login?loginContent=admin&password=123456'
		token = token == "false" ? false : true;
		console.log("token",token);
		let userInfo = uni.getStorageSync('userInfo');
		if(token && userInfo){
			data.token = userInfo.remember_token;
		}
		console.log("data",data)
		uni.request({
			url: apiUrl +'/api/'+ url, //仅为示例，并非真实接口地址。
			method: 'post',
			data: data,
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: (res) => {
				console.log(res)
				if(res.data.code == 200){
					this.$msg(res.data.msg)
					callsuc instanceof Function && callsuc(res.data)
				}else
				if(res.data.code == 401){
					this.$msg("登录已过期,请重新登录")
					uni.reLaunch({
						url:'../login/login'
					})
				}else{
					this.$msg(res.data.msg)
				}
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

Vue.prototype.$httpp = "https://yuyue.wsstreet.net/uploads/";

