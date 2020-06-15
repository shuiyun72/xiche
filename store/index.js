import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
console.log(uni.getStorageSync("userInfo"))
let hasLogin = (uni.getStorageSync("userInfo") && uni.getStorageSync("userInfo").id) ? true :false;
console.log("111",hasLogin)
const store = new Vuex.Store({
	state: {
		hasLogin: hasLogin,
		userInfo: uni.getStorageSync("userInfo") || {},
		homeInfo: uni.getStorageSync("userInfo") || {},
		httpp:"https://yuyue.wsstreet.net/uploads/",
		orderState:false
	},
	mutations: {
		setState(state, data){
			state.orderState = data;
		},
		brand(state, data){
			state.brand = data;
		},
		setCarXing(state, data){
			state.carXing = data;
			uni.setStorageSync('carXing',data);
		},
		setCarColor(state, data){
			state.carColor = data;
			uni.setStorageSync('carColor',data);
		},
		setCarBrand(state, data){
			state.carBrand = data;
			uni.setStorageSync('carBrand',data);
		},
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
			console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		},
		setHome(state, provider) {
			state.homeInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'homeInfo',  
			    data: provider  
			}) 
		},
	},
	actions: {
		
	}
})

export default store
