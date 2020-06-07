import Vue from 'vue'
import Vuex from 'vuex'
 import mutations from './mutations';

Vue.use(Vuex)
	const state = {
		curOrderInfo:{
			car:0,
			address:'',
			park:'',
			washType:0,
			dala:false,
			neishi:false,
			othersServer:false,
			time:'',
			phone:'',
			note:'',
		},
		orderArr:[],
	}

export default new Vuex.Store({
  state,
  mutations,
});
