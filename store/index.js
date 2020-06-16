import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
console.log(uni.getStorageSync("userInfo"))
let hasLogin = (uni.getStorageSync("userInfo") && uni.getStorageSync("userInfo").id) ? true :false;
console.log("111",hasLogin)
const store = new Vuex.Store({
	state: {
		hasLogin: hasLogin,
		userInfo: uni.getStorageSync("userInfo") || undefined,
		carXing:uni.getStorageSync("carXing") || [],
		carColor:uni.getStorageSync("carColor") || [],
		carBrand:uni.getStorageSync("carBrand") || [],
		carServe:uni.getStorageSync("carServe") || [],
		httpp:"https://yuyue.wsstreet.net/uploads/",
		brand:{name:"请选择车的品牌"},
		orderCar:{name:"请选择车的品牌"},
		orderAddress:{name:"请选择地址"},
		orderP:{name:"请选择停车位"},
		orderPhone:{name:"请选择手机号"},
		torderQuan:{name:"请选择优惠券"},
		selCity:"中原区"
	},
	mutations: {
		//设置洗车券状态
		setCoupon(state){
			state.userInfo.is_take = 1
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: state.userInfo 
			}) 
		},
		setGroupid(state){
			if(state.userInfo.groupid == 0){
				state.userInfo.groupid = 1
				uni.setStorage({//缓存用户登陆状态
					key: 'userInfo',  
					data: state.userInfo 
				}) 
			}
		},
		setQuan(state, data){
			state.torderQuan = data
		},
		setPhone(state, data){
			state.orderPhone = data
		},
		setP(state, data){
			state.orderP = data
		},
		setSelCar(state, data){
			state.orderCar = data
		},
		setAddress(state, data){
			state.orderAddress = data
		},
		brand(state, data){
			state.brand = data;
		},
		setService(state, data){
			state.carServe = data;
			uni.setStorageSync('carServe',data);
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
		setCity(state, data){
			state.selCity = data;
			uni.setStorageSync('carBrand',data);
		},
	},
	actions: {
		
	}
})

export default store
