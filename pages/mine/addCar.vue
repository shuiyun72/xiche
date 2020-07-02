<template>
	<view>
		<uni-nav-bar color="#333333" background-color="#ffffff" :status-bar="true" left-icon="arrowleft" :title="titleText" @clickLeft="back" />
		<uni-list>
			<uni-list-item-point title="姓名" :showArrow="false" point="true">
				<template v-slot:right="">
					<input type="text" v-model="name" placeholder="客户" class="add_car_input" />
				</template>
			</uni-list-item-point>
			<uni-list-item-point title="手机号" :showArrow="false" point="true">
				<template v-slot:right="">
					<input type="text" v-model="phone" placeholder="请输入手机号" class="add_car_input" />
				</template>
			</uni-list-item-point>
			<uni-list-item-point title="车型" point="true">
				<template v-slot:right="">
					<picker @change="bindPickerChange" v-model="carArrayXingSelect" :range="carArrayXing" range-key="name">
						<view class="uni-input">{{carArrayXing[carArrayXingSelect].name}}</view>
					</picker>
				</template>
			</uni-list-item-point>
			<uni-list-item-point title="车牌号" :showArrow="false" point="true">
				<template v-slot:right="">
					<input type="text" v-model="chepai" placeholder="请填写车牌号" class="add_car_input" />
				</template>
			</uni-list-item-point>
			<uni-list-item-point title="车辆颜色" point="true" :showArrow="false" :rightText="rightTextCarColor"></uni-list-item-point>
			<view class="car_color_list">
				<view class="item" v-for="(item,index) in carColorList" :class="{'active':index == selectColor}" @click="selColor(item,index)">
					<text class="moren" v-show="index == 0">默认</text>
					<image :src="httpp+item.cover" mode="widthFix" class="img"></image>
					<view class="text">
						{{item.name}}
					</view>
				</view>
			</view>
			<uni-list-item-point title="车品牌" point="true" :rightText="brand.name" @click="navigateTo('../home/car')" :showArrow="brand.name == '请选择车的品牌' ? true : false"></uni-list-item-point>
			<uni-list-item-point title="车辆照片" point="true" rightText="请上传照片" :showArrow="false"></uni-list-item-point>
			<view class="photo_list">
				<view class="img_p" @click="chooseImage">
					<image src="../../static/img/shangczp.png" mode="widthFix" class="img"></image>
				</view>
				<block v-for="(image,index) in imageList" :key="index">
					<view class="img_p">
						<image class="img" :src="image" :data-src="image" @tap="previewImage" mode="widthFix"></image>
						<view class="iconfont iconshanchu" @click="deleteImg(index)"></view>
					</view>
				</block>
				<view class="img_p" v-if="oldImg">
					<image class="img" :src="httpp+oldImg"  mode="widthFix"></image>
				</view>
			</view>
			<view class="sm_title">
				示例: 前后左右
			</view>
			<view class="for_ext">
				<view class="item_img" v-for="item in carList">
					<image :src="'../../static/img/'+item.img"></image>
				</view>
			</view>
		</uni-list>
		<view class="sub_btn">
			<button class="btn blue" @click="submitOrder">{{type == 1 ? '下一步' : '确认提交'}}</button>
		</view>
	</view>
</template>

<script>
	import uniListItemPoint from '../../components/uni-list-item-point/uni-list-item-point.vue';
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				name: this.$store.state.userInfo.nickname,
				phone: this.$store.state.userInfo.phone,
				chepai:"",
				carColorList: this.$store.state.carColor,
				selectColor: 0,
				rightTextCarColor: "白色",
				carArrayXing: this.$store.state.carXing,
				carArrayXingSelect: 0,
				imageList: [],
				upimageList:[],
				carList: [{
						img: "qianb.png",
						id: 1210
					},
					{
						img: "houb.png",
						id: 1211
					},
					{
						img: "zuoc.png",
						id: 1212
					},
					{
						img: "youc.png",
						id: 1213
					}
				],
				carId:"",
				type:2,
				fromL:"",
				oldImg:"",
				isTrueImg:true,
				titleText:"添加车辆信息"
			};
		},
		computed: {
			...mapState(["brand",'httpp'])
		},
		onLoad(ph) {
			if(ph.item){
				// uni.setNavigationBarTitle({
				// 	title:'编辑车辆信息'
				// })
				this.titleText = "编辑车辆信息";
				this.type = 2;
				let item = JSON.parse(ph.item);
				console.log(item)
				this.carArrayXingSelect = item.chexing.sort_order;
				this.chepai = item.chepai;
				this.selectColor = item.checolor.sort_order || 0;
				this.$store.commit('setbrand',{name:item.chebrand.name,id:item.chebrand.id});
				this.rightTextCarColor = item.checolor.name;
				this.carId = item.id;
				console.log(item,item.img)
				this.oldImg = item.img;
			}else
			if(ph.ws){
				// uni.setNavigationBarTitle({
				// 	title:'完善信息'
				// })
				this.titleText = "完善信息";
			}else{
				this.$store.commit('setbrand',{name:"请选择车的品牌"})
			}
			
			this.type = ph.ws ? 1 : 2;
			this.fromL = ph.from ? ph.from : "";		
		},
		methods: {
			back(){
				uni.switchTab({
					url:'../home/home'
				})
			},
			//提交订单
			submitOrder(){
				// this.oldImg
				let lastImg = _.cloneDeep(this.upimageList);
				if(this.oldImg){
					lastImg.push(this.oldImg)
				}
				let data = {
					name:this.name,
					phone:this.phone,
					id:this.carId,
					car_xing_id:this.carArrayXing[this.carArrayXingSelect].id,
					chepai:this.chepai,
					car_color_id:this.carColorList[this.selectColor].id,
					car_brand_id:this.brand.id,
					covers:JSON.stringify(lastImg),
					type:this.type
				}
				if(!this.isTrueImg){
					this.$msg("检查图片是否上传成功,请稍后再试");
					return false;
				}
				console.log(data)
				if(this.name && this.phone && this.chepai && this.brand.id && lastImg.length > 0 ){
					this.$getApi("/api/user/mine/addCar",data,res1=>{
						// this.$store.commit('setbrand',{name:"请选择车的品牌"});
						this.$getApi("/api/user/userinfo",{},res=>{
							this.$store.commit('login',res.data);
						})
						if(this.type == 1){
							uni.navigateTo({
								url:'../mine/addAddress?ws=1'
							})
						}else{
							if(this.fromL == 'toOrder'){
								uni.navigateTo({
									url:'../store/car?from=toOrder'
								})
								
							}else{
								uni.navigateTo({
									url:"../store/car"
								})
							}
						}	
					})
				}else{
					this.$msg("请完善信息!")
				}
				
			},
			selColor(item, index) {
				this.selectColor = index;
				this.rightTextCarColor = item.name;
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.carArrayXingSelect = e.detail.value
			},
			chooseImage(){
				let this_ = this;
				this_.isTrueImg = false;
				let token = this_.$store.state.userInfo.remember_token ||
				uni.getStorageSync('userInfo').remember_token ;	
				uni.chooseImage({
					count: 1,
					sizeType:['copressed'],
				    success: (res) => {
				        this.imageList = this.imageList.concat(res.tempFilePaths);				
						console.log(this_.$apiUrl + '/api/auth/upload')
						console.log(res.tempFilePaths[0]);
						uni.uploadFile({
							url:this_.$apiUrl + '/api/auth/upload',
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: {  
								token: token
							  },
							success(res1) {
								this_.$msg("图片上传成功")
								// 显示上传信息
								console.log(JSON.parse(res1.data).data.url)
								this_.upimageList.push(JSON.parse(res1.data).data.url)
								this_.isTrueImg = true;
							}
						});
				    }
				});
			},
			deleteImg(i) {
				this.imageList.splice(i, 1);
				this.upimageList.splice(i, 1);
				if(this.upimageList.length > 0){
					this.isTrueImg  = true;
				}else{
					this.isTrueImg = false;
				}
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
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
	.sub_btn {
		padding: 40upx;
		background-color: #f0f0f0;

		.btn {
			padding: 26upx 0;
		}
	}

	.sm_title {
		padding: 0 0upx 10upx;
		font-size: 26upx;
		color: #999;
		transform: scale(.9);
	}

	.for_ext {
		display: flex;
		padding: 0 26upx 30upx;

		.item_img {
			width: 140upx;
			height: 140upx;
			margin-right: 30upx;

			image {
				width: 100%;
				height: 100%;

			}
		}
	}

	.photo_list {
		padding: 20upx 26upx;
		display: flex;
		flex-wrap: wrap;

		.img_p {
			width: 140upx;
			margin: 0 30upx 30upx 0;
			position: relative;

			.iconshanchu {
				position: absolute;
				top: -16upx;
				right: -16upx;
				color: $uni-or;
			}

			.img {
				width: 140upx;
				height: 140upx;
			}
		}
	}

	.car_color_list {
		display: flex;
		flex-wrap: wrap;
		background-color: #f0f0f0;
		padding: 20upx 26upx 0;

		// justify-content: space-between;
		.item {
			width: 160upx;
			background-color: #fff;
			text-align: center;
			margin-bottom: 20upx;
			padding: 36upx 0 26upx;
			position: relative;
			margin-right: 20upx;

			.moren {
				position: absolute;
				top: 0;
				left: 0;
				color: #fff;
				font-size: 28upx;
				transform: scale(.7);
			}

			&.active {
				background-color: $uni-bl;

				.text {
					color: #fff;
				}
			}

			.img {
				width: 80%;
			}

			.text {
				padding-top: 6upx;
				font-size: 26upx;
			}
		}
	}

	.add_car_input {
		font-size: 26upx;
		text-align: right;
		color: #666;
	}
</style>
