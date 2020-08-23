<template>
	<view class="combo_body">
		<view v-for="item in comboList">
			<view class="combo_title">
				{{item.cat_name}}
			</view>
			<view class="car_box" @click="buyCombo(item)">
				<image :src="httpp+item.cover" mode="widthFix" class="img"></image>
			</view>
		</view>
		<uni-popup type="center" ref="juan0">
			<view class="juan_body">
				<view class="iconfont iconguanbi" @click.stop="closeJuan(0)"></view>
				<view class="ju_title">
					去完善信息
				</view>
				<view class="t">
					您还没有完善信息,需完善信息,
					才能查看,现在去填写?
				</view>
				<view class="t_btn">
					<button class="round btn sm default" @click.stop="closeJuan(0)">取消</button>
					<button class="round btn sm  blue" @click.stop="addCarH">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				comboList: []
			};
		},
		mounted() {
			this.init();
		},
		computed: {
			httpp() {
				return this.$store.state.httpp;
			}
		},
		onShow() {
			// if (!this.userInfo || this.userInfo.groupid != 0) {
			// 	try {
			// 		this.$nextTick(() => {
			// 			this.$refs['juan0'].close();
			// 		})
			// 	} catch (e) {
			// 		//TODO handle the exception
			// 	}
			// }
		},
		onHide() {
			uni.hideToast();
		},
		methods: {
			buyCombo(item) {
				if (this.$store.state.hasLogin) {
					uni.navigateTo({
						url: './comboList?item=' + JSON.stringify(item)
					})
				} else {
					// this.$refs['juan0'].open()
					let this_ = this;
					uni.showModal({
						title: "去完善信息",
						content: "您还没有完善信息,需完善信息,才能查看,现在去填写?",
						confirmText: "确定",
						cancelText: "取消",
						success: function(res) {
							if (res.confirm) {
								this_.getUserInfoWX();
							}
						}
					})
				}
			},
			init() {
				this.$getApi("/api/auth/mall/index", {}, res1 => {
					console.log(res1)
					this.comboList = res1.data
				})
			},
			closeJuan() {
				try {
					this.$refs['juan0'].close()
				} catch (e) {
					//TODO handle the exception
				}
			},
			addCarH() {
				// #ifdef MP
				this.getUserInfoWX();
				// #endif
			},
			getUserInfoWX() {
				let this_ = this;
				if (!this.$store.state.hasLogin) {
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							console.log(loginRes);
							this_.$getApiTime("/api/auth/getopenid", {
								code: loginRes.code
							}, res => {
								console.log(res)
								if (res.data.is_bind == 0) {
									console.log("11")
									// uni.getUserInfo({
									// 	provider: 'weixin',
									// 	success: function(infoRes) {
									// 		console.log(infoRes)
									// 		console.log('用户昵称为：' + infoRes.userInfo.nickName);
									// 		uni.navigateTo({
									// 			url: '../login/login?xcx=home&openid=' + res.data.openid + '&nickname=' + infoRes.userInfo.nickName
									// 		})
									// 	}
									// });
									uni.navigateTo({
										url: '../login/login?xcx=ws&openid=' + res.data.openid + '&wxsq=1'
									})
								}else{
									this_.getInit(() => {
										if(this_.userInfo.is_perfect == 0){
											uni.navigateTo({
												url:'../mine/addCar?ws=1&xcx=ws'
											})
										}else
										if(this_.userInfo.is_perfect == 1){
											uni.navigateTo({
												url:'../mine/addAddress?ws=1&xcx=ws'
											})
										}
									});
								}
							}, "false")
							// 获取用户信息
						}
					});
				}else{
					if(this_.userInfo.is_perfect == 0){
						uni.navigateTo({
							url:'../mine/addCar?ws=1&xcx=ws'
						})
					}else
					if(this_.userInfo.is_perfect == 1){
						uni.navigateTo({
							url:'../mine/addAddress?ws=1&xcx=ws'
						})
					}
				}
			},
			async getInit(call) {
				await this.$getApi("/api/user/car/xing", {}, res => {
					this.$store.commit("setCarXing", res.data)
				})
				await this.$getApi("/api/user/car/color", {}, res => {
					this.$store.commit("setCarColor", res.data)
				})
				await this.$getApi("/api/user/car/brand", {}, res => {
					this.$store.commit("setCarBrand", res.data)
				})
				await this.$getApi("/api/user/car/service", {}, res => {
					this.$store.commit("setService", res.data)
				})
				call instanceof Function && call()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.juan_body {
		background-color: #fff;
		position: relative;
		padding: 26upx 36upx;
		width: 440upx;
		border-radius: 26upx;

		.iconguanbi {
			position: absolute;
			top: 20upx;
			right: 16upx;
			font-size: 26upx;
		}

		.ju_title {
			text-align: center;
			font-size: 36upx;
			margin-bottom: 30upx;
		}

		.t {
			text-align: center;
			font-size: 26upx;
			color: #666;
			line-height: 46upx;
			margin-bottom: 20upx;
		}

		.t_btn {
			display: flex;

			.btn {
				width: 40%;
			}
		}
	}

	.combo_body {
		border-top: 1upx solid #eee;
		padding: 26upx;

		.combo_title {
			font-weight: bold;
			padding: 26upx 0 16upx;
			color: #666;
			font-size: 32upx;
		}

		.car_box {
			.img {
				width: 100%;
			}
		}
	}
</style>
