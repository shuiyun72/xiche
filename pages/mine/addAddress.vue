<template>
	<view class="address_sss">
		<uni-nav-bar color="#333333" background-color="#ffffff" 
		:status-bar="true" left-icon="arrowleft" title="添加地址信息" @clickLeft="back" />
		<uni-list>
			<uni-list-item-point title="市" point="true" rightText="郑州市" :showArrow="false">
				<!-- <template v-slot:right="">
				<picker @change="shiListC" :value="shiListSel" :range="shiList" range-key="name">
					<view class="uni-input">{{shiList[shiListSel].name}}</view>
				</picker>
				</template> -->
			</uni-list-item-point>
			<uni-list-item-point title="县/区" point="true" :showArrow="false">
				<template v-slot:right="">
					<picker @change="quListC" :value="quListSel" :range="quList" range-key="name" >
						<view class="pick_flex">
							<text class="uni-input">{{quList[quListSel]?quList[quListSel].name:'请选择县/区'}}</text>
							<text class="iconfont iconjiantou"></text>
						</view>
					</picker>
				</template>
			</uni-list-item-point>
			<uni-list-item-point title="街道" point="true" @click="routeListCh" :showArrow="false">
				<template v-slot:right="">
					<picker @change.stop="routeListC" :value="routeListSel" :range="routeList" range-key="name" :disabled="disJiedao">
						<view class="pick_flex">
							<text class="uni-input">{{routeList[routeListSel]?routeList[routeListSel].name:'请选择街道'}}</text>
							<text class="iconfont iconjiantou"></text>
						</view>
					</picker>
				</template>
			</uni-list-item-point>
			<uni-list-item-point title="小区" point="true" @click="areaListCh" :showArrow="false">
				<template v-slot:right="">
					<picker @change="areaListC" :value="areaListSel" :range="areaList" range-key="name" :disabled="disJiedao">
						<view class="pick_flex">
							<text class="uni-input">{{areaList[areaListSel]?areaList[areaListSel].name:"请选择小区"}}</text>
							<text class="iconfont iconjiantou"></text>
						</view>
					</picker>
				</template>
			</uni-list-item-point>
			<uni-list-item-point title="小区期数/楼栋号" :showArrow="false" point="true">
				<template v-slot:right="">
					<input type="text" v-model="xiaoquInp" placeholder="请填写小区期数/楼栋号" class="add_car_input" />
				</template>
			</uni-list-item-point>
		</uni-list>
		<view class="address_info">
			<text class="iconfont icongaiicon-"></text>
			<text>找不到你所指定的小区?请点击这里</text>
			<text class="blue" @click="navigateTo('./dredgeON')">申请开通</text>
		</view>
		<uni-list>
			<uni-list-item-point title="经常使用的停车位1" point=true :showArrow="false">
				<template v-slot:right="">
					<input type="text" v-model="inpNum1" placeholder="请填写车位号 / 位置描述" class="add_car_input" />
				</template>
			</uni-list-item-point>
			<uni-list-item-point title="经常使用的停车位2" :showArrow="false">
				<template v-slot:right="">
					<input type="text" v-model="inpNum2" placeholder="请填写车位号 / 位置描述" class="add_car_input" />
				</template>
			</uni-list-item-point>
			<uni-list-item-point title="经常使用的停车位3" :showArrow="false">
				<template v-slot:right="">
					<input type="text" v-model="inpNum3" placeholder="请填写车位号 / 位置描述" class="add_car_input" />
				</template>
			</uni-list-item-point>
			<uni-list-item-point title="经常使用的停车位4" :showArrow="false">
				<template v-slot:right="">
					<input type="text" v-model="inpNum4" placeholder="请填写车位号 / 位置描述" class="add_car_input" />
				</template>
			</uni-list-item-point>
		</uni-list>
		<view class="sub_btn">
			<button class="btn blue" @click="next">提交</button>
		</view>
	</view>
</template>

<script>
	import uniListItemPoint from '../../components/uni-list-item-point/uni-list-item-point.vue'
	export default {
		data() {
			return {
				shiList: [{
					name: '请选择小区'
				}],
				shiListSel: "",
				quList: [{
					name: '请选择县/区'
				}],
				quListSel: "",
				routeList: [{
					name: '请选择街道'
				}],
				routeListSel: "",
				areaList: [{
					name: '请选择小区'
				}],
				areaListSel: "",
				xiaoquInp: "",
				inpNum1: "",
				inpNum2: "",
				inpNum3: "",
				inpNum4: "",
				id: "",
				lng: 113.33,
				lat: 33.03,
				disJiedao: true,
				disArea: true,
				ws:""

			};
		},
		mounted() {
			this.getLocal(151, 2, 'quList');
			let this_ = this;
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					this_.lng = res.longitude;
					this_.lat = res.latitude;
					console.log(this_.lng, this_.lat)
				}
			});
		},
		onLoad(ph) {
			if (ph.item) {
				uni.setNavigationBarTitle({
					title: "编辑地址信息"
				})
				let phItem = JSON.parse(ph.item);
				console.log(phItem);
				this.shiList = [{
					name: phItem.city_name,
					id: phItem.city_id
				}];
				this.quList = [{
					name: phItem.area_name,
					id: phItem.area_id
				}];
				this.routeList = [{
					name: phItem.street_name,
					id: phItem.street_id
				}];
				this.areaList = [{
					name: phItem.house_name,
					id: phItem.house_id
				}];
				this.xiaoquInp = phItem.house_detail;
				this.inpNum1 = phItem.park[0] ? phItem.park[0].name : "";
				this.inpNum2 = phItem.park[1] ? phItem.park[1].name : "";
				this.inpNum3 = phItem.park[2] ? phItem.park[2].name : "";
				this.inpNum4 = phItem.park[3] ? phItem.park[3].name : "";
				this.id = phItem.id;
			} else {
				this.getLocal(151, 2, 'quList');
			}
			if(ph.ws){
				this.ws = ph.ws;
			}
		},
		// onBackPress(op) {  	
		//    if(this.ws == 1){
		// 	   console.log("bace2")
		// 	  uni.switchTab({
		// 	  	url:"../home/home"
		// 	  })
		// 	   return true;
		//    }
		  
		// },
		computed: {
			parksList() {
				let parksListO = [];
				if (this.inpNum1) {
					parksListO.push(this.inpNum1);
				}
				if (this.inpNum2) {
					parksListO.push(this.inpNum2);
				}
				if (this.inpNum3) {
					parksListO.push(this.inpNum3);
				}
				if (this.inpNum4) {
					parksListO.push(this.inpNum4);
				}
				return JSON.stringify(parksListO);
			}
		},
		methods: {
			back(){
				if(this.ws == 1){
					console.log("bace2")
					uni.switchTab({
						url:"../home/home"
					})
					return true;
				}else{
					uni.navigateBack({
						delta:1
					})
				}
			},
			getLocal(id, type, event) {
				this.$getApi("/api/auth/area", {
					pid: id,
					type: type
				}, res => {
					this[event] = res.data;
				});
			},
			// shiListC(e){
			// 	this.shiListSel = e.detail.value;
			// 	this.getLocal(this.shiList[this.shiListSel].id,2,'quList');
			// },
			quListC(e) {
				console.log(e)
				this.quListSel = e.detail.value
				if(this.quList[this.quListSel]){
					this.getLocal(this.quList[this.quListSel].id, 3, 'routeList');
				}
				this.disJiedao = false;
			},
			routeListCh() {
				if(this.routeList[this.routeListSel]){
					this.getLocal(this.quList[this.quListSel].id, 3, 'routeList')
				}
				console.log("routeListCh")
				if (this.disJiedao == true) {
					this.$msg("请先选择县/区")	
				}
			},
			routeListC(e) {
				this.routeListSel = e.detail.value
				console.log(this.routeListSel)
				console.log(this.routeList[this.routeListSel].id)
				this.$getApi("/api/auth/house", {
					pid: this.routeList[this.routeListSel].id
				}, res => {
					console.log()
					let resData = JSON.stringify(res.data) == "[]" ? [{
						name: '请选择小区'
					}] : res.data;
					this.areaList = resData;
					this.disArea = false;
				});
			},
			areaListCh() {
				if (this.disArea == true) {
					this.$msg("请先选择街道")
				}
			},
			areaListC(e) {
				this.areaListSel = e.detail.value
			},
			next() {
				let dataL = {
					id: this.id,
					city_id: 151,
					area_id: this.quList[this.quListSel].id,
					street_id: this.routeList[this.routeListSel].id,
					house_id: this.areaList[this.areaListSel].id,
					house_detail: this.xiaoquInp,
					lng: this.lng,
					lat: this.lat,
					parks: this.parksList
				}
				if (this.quList[this.quListSel].id &&
					this.routeList[this.routeListSel].id &&
					this.areaList[this.areaListSel].id &&
					this.xiaoquInp &&
					this.parksList) {
					this.$getApi("/api/user/address/add", dataL, res => {
						this.$store.commit("setGroupid");
						this.$getApi("/api/user/userinfo", {}, res => {
							this.$store.commit('login', res.data);
							if(this.ws){
								uni.switchTab({
									url:'../home/home'
								})
							}else{
								uni.navigateTo({
									url: '../store/addressList'
								})
							}
						})

					});
				} else {
					this.$msg("请完善信息")
				}

			},
			navigateTo(url) {
				uni.navigateTo({
					url: url

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.address_sss{
		picker{
			width: 100%;
			.pick_flex{
				display: flex;
				justify-content: flex-end;
				.iconjiantou{
					color: #cccccc;
					font-size: 46upx;
				}
			}
		}
		
	}
	.sub_btn {
		padding: 154upx 40upx;
		background-color: #f0f0f0;

		.btn {
			padding: 26upx 0;
		}
	}

	.uni-input {
		color: #999;
	}

	.add_car_input {
		font-size: 26upx;
		text-align: right;
		color: #666;
	}

	.address_info {
		font-size: 26upx;
		background-color: #f0f0f0;
		padding: 20upx 26upx;
		color: #999;

		.icongaiicon- {
			font-size: 26upx;
			color: #999;
			margin-right: 10upx;
		}

		.blue {
			color: $uni-bl;
		}
	}
</style>
