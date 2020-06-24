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
		orderCar:uni.getStorageSync("orderCar") || {name:"请选择车辆"},
		orderAddress:uni.getStorageSync("orderAddress") || {name:"请选择地址"},
		orderP:uni.getStorageSync("orderP") || {name:"请选择停车位"},
		orderPhone:uni.getStorageSync("orderPhone") || {name:"请选择手机号"},
		torderQuan:{name:"请选择优惠券"},
		selCity:"郑州",
		back:1
	},
	mutations: {
		setBack(state,num){
			state.back = num;
		},
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
			state.orderPhone = data;
			uni.setStorage({//缓存用户登陆状态
				key: 'setPhone',  
				data: data 
			}) 
		},
		setP(state, data){
			state.orderP = data
			uni.setStorage({//缓存用户登陆状态
				key: 'setP',  
				data: data 
			}) 
		},
		setSelCar(state, data){
			state.orderCar = data
			uni.setStorage({//缓存用户登陆状态
				key: 'orderCar',  
				data: data 
			}) 
		},
		setAddress(state, data){
			state.orderAddress = data
			uni.setStorage({//缓存用户登陆状态
				key: 'orderAddress',  
				data: data 
			})
		},
		setbrand(state, data){
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
			console.log("change login")
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		},
		clearSe(state) {
			state.brand = {name:"请选择车的品牌"};
			state.orderCar = {name:"请选择车辆"};
			state.orderAddress = {name:"请选择地址"};
			state.orderP = {name:"请选择停车位"};
			state.orderPhone = {name:"请选择手机号"};
			state.torderQuan = {name:"请选择优惠券"};
			state.selCity = "郑州";
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
