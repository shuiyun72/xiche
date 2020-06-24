<template>
	<view class="home">
		<image src="../../static/img/home/bg.jpg" class="home_bg"></image>
		<view class="home_body">
			<view class="get_s">
				<view class="address">
					<navigator url="./city">
						<text>{{selCity}}</text>
						<text class="iconfont iconai-arrow-down"></text>
					</navigator>
				</view>
				<view class="msg">
					<navigator url="./msg">
						<view class="iconfont iconxiaoxi1"></view>
						<view class="point"></view>
					</navigator>
				</view>
			</view>
			<view class="h_card">
				<view class="h_title">
					{{userInfo && userInfo.nickname || '游客'}}-欢迎您
				</view>
				<view class="user_s">
					<text class="iconfont iconyonghuming"></text>
					<text>{{group}}</text>
				</view>
				<view class="libao_list">
					<view class="libao" @click="getXCQ">
						<view class="li_t">
							我的洗车券
						</view>
						<view class="li_info">
							<view class="l_l">
								剩余{{userInfo && userInfo.ticket_num ? userInfo.ticket_num : 0}}张
							</view>
							<image src="../../static/img/home/xicj.png" mode="widthFix" class="l_r"></image>

						</view>
					</view>
					<view class="libao" @click="switchTab('../combo/combo')">
						<view class="li_t">
							购买套餐
						</view>
						<view class="li_info">
							<view class="l_l">
								优惠多多
							</view>
							<image src="../../static/img/home/taoc.png" mode="widthFix" class="l_r"></image>
						</view>
					</view>
				</view>
				<view class="p_car" @click="toOrder">
					<text class="iconfont icon-"></text>
					<text>预约洗车</text>
				</view>
			</view>
		</view>
		<uni-popup type="center" ref="juan2">
			<view class="juan_body">
				<view class="iconfont iconguanbi" @click="closeJuan(2)"></view>
				<view class="ju_title">
					购买套餐
				</view>
				<view class="t">
					您还没有购买套餐,没有洗车券,
					现在去购买套餐
				</view>
				<view class="t_btn">
					<button class="round btn sm default" @click="closeJuan(2)">取消</button>
					<button class="round btn sm  blue" @click="switchTab('../combo/combo')">确定</button>
				</view>
			</view>
		</uni-popup>
		<uni-popup type="center" ref="juan0">
			<view class="juan_body">
				<view class="iconfont iconguanbi" @click="closeJuan(0)"></view>
				<view class="ju_title">
					去完善信息
				</view>
				<view class="t">
					您还没有完善信息,需完善信息才能下单,现在去填写?
				</view>
				<view class="t_btn">
					<button class="round btn sm default" @click="closeJuan(0)">取消</button>
					<button class="round btn sm  blue" @click="addCarH">确定</button>
				</view>
			</view>
		</uni-popup>
		<uni-popup type="center" ref="juan1">
			<view class="juan1_body">
				<view class="ju_title">
					恭喜你获得
				</view>
				<view class="ju_title2">
					洗车优惠券
				</view>
				<scroll-view scroll-y="true" class="scroll-Y">
				<view class="item_card" v-for="item in juan1List">
					<image src="../../static/img/mine/zhekj.png" mode="widthFix" class="img"></image>
					<view class="item_ab">
						<view class="left">
							<view class="p1">
								<text class="t">{{Number(item.money)}}</text>
								<text>元</text>
							</view>
							<view class="p2">
								满减券
							</view>
						</view>
						<view class="right">
							<view class="p3">
								<!-- 预约洗车{{item.title}}折优惠 -->
								{{item.title}}
							</view>
							<view class="p4">
								有效期 {{item.created_at && item.created_at.split(" ")[0]}}
								-
								{{item.end_time && item.end_time.split(" ")[0]}}
							</view>
						</view>
					</view>
				</view>
				</scroll-view>
				<view class="t_btn">
					<button class="round btn sm" @click="getQuanSucc">确定</button>
				</view>
			</view>
			<view class="iconfont iconguanbi popup_close_bottom_btn" @click="closeJuan(1)"></view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				juan1List: [],
				getQuan: undefined
			};
		},
		mounted() {
			console.log("homemounted")
			
		},
		onShow() {
			let this_ = this;
			// #ifndef MP
			if (!this_.hasLogin) {
				uni.reLaunch({
					url: '../login/yLogin'
				})
			} else {
				if (this_.userInfo && this_.userInfo.is_take < 1) {
					this_.getQList()
				}
			}
			// #endif
			// #ifdef MP
			
			if(!this.hasLogin){
				this.xcxisLogin();
				this_.getQList();
			}
			// #endif
			if (this.hasLogin) {
				this.$getApi("/api/user/userinfo", {}, res => {
					this.$store.commit('login', res.data);
				})
			}
			try {
				this.$nextTick(() => {
					this.$refs['juan0'].close();
					this.$refs['juan2'].close();
				})
			} catch (e) {
				//TODO handle the exception
			}
				
		},
		onHide() {
			console.log("onHide1112121000")
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'selCity']),
			group() {
				if (this.userInfo) {
					switch (this.userInfo.groupid) {
						case 1:
							return "会员";
							break;
						case 2:
							return "vip会员";
							break;
						default:
							return "游客";
							break;
					}
				} else {
					return "游客"
				}
			}
		},
		methods: {
			xcxisLogin(){
				let this_ = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes);
						this_.$getApiTime("/api/auth/getopenid", {
							code: loginRes.code
						}, res => {
							console.log(res)
							if (res.data.is_bind == 1){
								console.log(res)
								this_.$store.commit('login', res.data);
								setTimeout(() => {
									this_.getInit(() => {
										this_.$msg("登录成功")
									});
								}, 500)
							}
						}, "false")
					},
				})
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
									uni.getUserInfo({
										provider: 'weixin',
										success: function(infoRes) {
											console.log(infoRes)
											console.log('用户昵称为：' + infoRes.userInfo.nickName);
											uni.navigateTo({
												url: '../login/login?xcx=ws&openid=' + res.data.openid + '&nickname=' + infoRes.userInfo.nickName
											})
										} 
									});
								} else
								if (res.data.is_bind == 1){
									console.log(res)
									this_.$store.commit('login', res.data);
									setTimeout(() => {
										this_.getInit(() => {
											uni.navigateTo({
												url:'../mine/addCar?ws=1&xcx=ws'
											})
										});
									}, 500)
								}
							}, "false")
							// 获取用户信息
						}
					});
				}else{
					uni.navigateTo({
						url:'../mine/addCar?xcx=ws&ws=1'
					})
				}
			},
			addCarH() {
				// #ifdef MP
				this.getUserInfoWX();
				// #endif
				// #ifndef MP
				uni.navigateTo({
					url:'../mine/addCar?ws=1'
				})
				// #endif
			},
			//home弹窗优惠券
			getQList() { 
				this.$getApi("/api/auth/coupon/list", {}, res => {
					console.log(res.data)
					this.juan1List = res.data;
					this.$refs['juan1'].open()
				})	
			},
			//跳转洗车券
			getXCQ() {
				if(this.hasLogin){
					if (this.userInfo.ticket_num > 0) {
						uni.navigateTo({
							url: '../store/vouchersCar'
						})
					} else {
						// this.$refs['juan2'].open()
						let this_ = this;
						uni.showModal({
							title: "购买套餐",
							content: "您还没有购买套餐,没有洗车券,现在去购买套餐?",
							confirmText: "确定",
							cancelText: "取消",
							success: function(res) {
								if (res.confirm) {
									uni.switchTab({
										url:"../combo/combo"
									})
								}
							}
						})
					}
				}else{
					// this.$refs['juan2'].open()
					uni.showModal({
						title: "购买套餐",
						content: "您还没有购买套餐,没有洗车券,现在去购买套餐?",
						confirmText: "确定",
						cancelText: "取消",
						success: function(res) {
							if (res.confirm) {
							uni.switchTab({
								url:"../combo/combo"
							})
							}
						}
					})
				}
			},
			//预约洗车
			toOrder() {
				if (!this.userInfo || this.userInfo.groupid == 0) {
					// this.$refs['juan0'].open()
					let this_ = this;
					uni.showModal({
						title: "去完善信息",
						content: "您还没有完善信息,需完善信息,才能查看,现在去填写?",
						confirmText: "确定",
						cancelText: "取消",
						success: function(res) {
							if (res.confirm) {
								// #ifdef MP
								this_.getUserInfoWX();
								// #endif
								// #ifndef MP
								uni.navigateTo({
									url:'../mine/addCar?ws=1'
								})
								// #endif
							}
						}
					})
				} else {
					uni.navigateTo({
						url: '../orders/toOrder'
					})
				}
			},
			closeJuan(num) {
				console.log(num)
				if (num == 1) {
					if(this.hasLogin){
						this.$getApi("/api/user/coupon/cancle", {}, res => {
							this.$refs['juan1'].close()
							this.$store.commit("setCoupon");
						});
					}else{
						this.$refs['juan1'].close()
					}
				} else {
					this.$refs['juan' + num].close()
				}
			},
			switchTab(url) {
				uni.switchTab({
					url: url
				})
			},
			getQuanSucc() {
				if(this.hasLogin){
					this.$getApi("/api/user/coupon/take", {}, res => {
						this.$refs['juan1'].close()
						this.$msg('优惠券领取成功,可在个人中心中查看');
						this.$store.commit("setCoupon");
					});
				}else{
					this.getUserInfoWX();
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
	.scroll-Y{
		max-height: 560upx;
	}
	.juan1_body {
		background-color: $uni-bl;
		position: relative;
		padding: 26upx 20upx;
		width: 600upx;
		border-radius: 26upx;

		.ju_title {
			color: #fff;
			text-align: center;
		}

		.ju_title2 {
			color: #fff;
			text-align: center;
			font-size: 44upx;
			padding: 6upx 0 20upx;
		}

		.item_card {
			position: relative;

			.item_ab {
				position: absolute;
				top: 0;
				left: 0;
				display: flex;
				padding-top: 36upx;

				.left {
					width: 220upx;
					text-align: center;

					.p1 {
						color: $uni-bl;
						font-weight: bold;

						.t {
							padding-right: 10upx;
							font-size: 50upx;
						}
					}

					.p2 {
						font-size: 22upx;
						transform: scale(.8);
						color: #999;
					}

				}

				.right {
					.p3 {
						font-size: 28upx;
						margin-bottom: 16upx;
					}

					.p4 {
						font-size: 22upx;
						color: #999;
						white-space: nowrap;
						transform: scale(.7) translateX(-90upx);

					}
				}
			}

			.img {
				width: 100%;
			}
		}

		.t_btn {
			button {
				color: $uni-bl;
				padding: 22upx 0;
				margin: 16upx 0;
			}
		}

	}

	.popup_close_bottom_btn {
		background-color: rgba(255, 255, 255, .2);
		width: 80upx;
		height: 80upx;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		margin: 40upx auto 0;
	}

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

	.home {
		position: relative;

		.home_body {
			position: absolute;
			top: 0;
			left: 0;
			color: #fff;
			width: 100vw;
			box-sizing: border-box;
			padding: 70upx 26upx 0;

			.p_car {
				background-color: $uni-bl;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 100upx;
				margin-top: 80upx;

				.icon- {
					font-size: 100upx;
				}
			}

			.libao_list {
				display: flex;
				justify-content: space-between;
				margin-top: 30upx;

				.libao {
					width: 44%;
					box-shadow: 0 0 6upx 2upx #ddd;
					border-radius: 6upx;
					padding: 16upx;
				}

				.li_info {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.l_l {
						color: #999;
					}

					.l_r {
						width: 80upx;
					}
				}
			}

			.h_card {
				background-color: #fff;
				color: #333;
				margin-top: 460upx;
				border-radius: 16upx;
				padding: 24upx 24upx 70upx;

				.h_title {
					font-weight: bold;
				}

				.user_s {
					color: $uni-bl;
					font-size: 28upx;
					margin-top: 6upx;

					.iconfont {
						font-size: 28upx;
						margin-right: 10upx;
						display: inline-block;
					}
				}
			}

			/* #ifdef MP */
			.h_card {
				background-color: #fff;
				color: #333;
				margin-top: 410upx;
			}

			/* #endif */
			.get_s {
				display: flex;
				justify-content: space-between;
				font-size: 28upx;
				color: #eee;

				.iconai-arrow-down {
					font-size: 24upx;
					margin-left: 10upx;
				}

				.iconxiaoxi1 {
					font-size: 30upx;
				}

				.msg {
					position: relative;

					.point {
						position: absolute;
						width: 10upx;
						height: 10upx;
						background-color: $uni-or;
						border-radius: 50%;
						top: 0;
						right: -4upx;
					}
				}
			}
		}
	}

	.home_bg {
		width: 750upx;
		height: 100vh;
	}
</style>
