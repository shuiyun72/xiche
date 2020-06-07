<template>
	<view class="container" @touchmove.stop.prevent="moveHandle" :style="{ height: viewHeight + 'px' }">
		<swiper class="swiper" :autoplay="false" :style="{ height: viewHeight + 'px' }">
			<swiper-item>
				<view class="swiper-item uni-bg-red main">
					<image id="img-bg" src="../../static/index/bg.png" mode="widthFix"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-green">
					<image id="img-bg" src="../../static/index/bg.png" mode="widthFix"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="box padding-lg">
			<view class="flex justify-between align-center top-cs padding-lg">
				<view class="text-white">
					{{ city }}
					<text class="lg text-white cuIcon-unfold margin-left-xs"></text>
				</view>
				<view @click="goInfoList" class="info-logo">
					<image style="width: 26rpx;height: 26rpx;" src="../../static/index/xiaox.png" mode=""></image>
					<view class="have-info"></view>
				</view>
			</view>
			<view class="index-box padding bg-white">
				<view class="text-bold text-lg">{{ userName }}-欢迎您</view>
				<view class="margin-top-xs flex align-center">
					<image style="width: 26rpx;height: 26rpx;" :src="userTypeSrc" mode=""></image>
					<text class="margin-left-xs name-cs" :class="{ huiy: userType == 1, vip: userType == 2 }">{{ userTypeName[userType] }}</text>
				</view>
				<view class="flex justify-between my-quan">
					<view class="menu-index padding" @click="skipQuan(true)">
						<view class="text-bold text-lg">我的洗车劵</view>
						<view class="flex align-center">
							<text class="text-gray">剩余{{ 12 }}张</text>
							<image class="margin-left-lg" style="width: 95rpx;height: 79rpx;" src="../../static/index/xicj.png" mode=""></image>
						</view>
					</view>
					<view class="menu-index padding" @click="skipActive(true)">
						<view class="text-bold text-lg">购买套餐</view>
						<view class="flex align-center">
							<text class="text-gray">优惠多多</text>
							<image class="margin-left-lg" style="width: 95rpx;height: 79rpx;" src="../../static/index/xicj.png" mode=""></image>
						</view>
					</view>
				</view>
				<view @tap="goWashCar()" class="padding margin-top-lg">
					<button class="cu-btn block bg-blue margin-tb-sm lg" style="height: 100rpx; border-radius: 50rpx;" type="">
						<image style="width: 54rpx;height: 63rpx;" src="../../static/index/yuyan.png" mode=""></image>
						<text class="margin-left margin-top-xs">预约洗车</text>
					</button>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="showFirstLoginModal ? 'show' : ''">
			<view class="cu-dialog" style="background-color:transparent">
				<view>
					<coupons @closeQuanModal="closeQuanModal"></coupons>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="showtoBuyModal ? 'show' : ''">
			<view class="cu-dialog" style="background-color:transparent; width: 520rpx; height: 380rpx;">
				<view class="cu-bar bg-white justify-end">
					<view class="content">购买套餐</view>
					<view class="action" @tap="hidetoBuyModalModal"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="padding bg-white text-lg">
					{{modalText}}
					<view class="flex bg-white justify-between padding-lr margin-top-xs">
						<view @tap="hidetoBuyModalModal(false)" class=""><button class="cu-btn block bg-grey margin-tb-sm lg" type="">取消</button></view>
						<view @tap="hidetoBuyModalModal(true)" class=""><button class="cu-btn block bg-blue margin-tb-sm lg" type="">确定</button></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import coupons from '../../components/coupons/coupons.vue';
	export default {
		components: {
			coupons
		},
		data() {
			return {
				viewHeight: 0,
				city: '郑州', // 当前城市
				userName: '张三',
				userType: 1, //  用户类型 0 游客 1 会员 3 VIP
				userInfoImgArr: ['youk', 'huiy', 'vip'],
				userTypeName: ['游客', '会员', 'VIP会员'],
				showFirstLoginModal: false, // 送折扣券弹框
				showtoBuyModal: true, // 去购买套餐或完善信息弹框
				modalText: '你还没有完善信息，需完善信息才能查看，现在去填写？', // 弹框提示内容
				modalTitle: '购买套餐', // 弹框头部提示文字 以上两项均需要点击按钮之后重新赋值。
			};
		},
		computed: {
			userTypeSrc() {
				return `../../static/index/${this.userInfoImgArr[this.userType]}.png`;
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.viewHeight = res.windowHeight;
					console.log(this.viewHeight); // print 610
				}
			});
		},
		onShow() {},
		methods: {
			goWashCar() {
				uni.navigateTo({
					url:"/pages/orderPage/index"
				})
			},
			moveHandle() {
				return;
			},
			hideModal() {
				this.showFirstLoginModal = false;
			},
			closeQuanModal(type) {
				// 关闭 送券弹框
				
				this.showFirstLoginModal = false;
				this.$nextTick(() => {
					uni.showToast({
						title: '优惠劵领取成功，可在个人中心中查看',
						icon: 'none',
						mask:true
					});
				});
			},
			hidetoBuyModalModal(type) {
				// 关闭提示去购买套餐或提示完善信息弹框
				this.showtoBuyModal = false;
				
				uni.navigateTo({
					url: 'perfectCarInfo'
				})
			},
			goInfoList() {
				uni.navigateTo({
					url: 'infoList'
				})
			},
			skipQuan(type) {
				console.log(type)
				if (type) {
					uni.showModal({
						title: '购买套餐',
						content: '您还没有购买套餐， 没有洗车劵，现在去购买套餐 ',
						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url:"/pages/packagePage/index"
								})
							} else if (res.cancel) {
								
							}
						}
					});
				}
			},
			skipActive(type) {
                 uni.switchTab({
                 	url:"/pages/packagePage/index"
                 })
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		position: relative;

		#img-bg {
			width: 100%;
			height: 100%;
		}

		.box {
			.top-cs {
				width: 100%;
				position: absolute;
				top: 10rpx;
				left: 0;

				.info-logo {
					position: relative;

					.have-info {
						position: absolute;
						right: -2rpx;
						top: -2rpx;
						width: 8rpx;
						height: 8rpx;
						background-color: #ffae04;
					}
				}
			}

			.index-box {
				position: absolute;
				width: 702rpx;
				height: 626rpx;
				background: rgba(255, 255, 255, 1);
				border-radius: 16rpx;
				top: 566rpx;
				left: 24rpx;

				.name-cs {
					color: #208eff;

					&.huiy {
						color: #208eff;
					}

					&.vip {
						color: #ffae04;
					}
				}

				.my-quan {
					margin: 33rpx auto 0;

					.menu-index {
						width: 316rpx;
						height: 180rpx;
						background: rgba(255, 255, 255, 1);
						border: 1px solid rgba(240, 240, 240, 1);
						box-shadow: 0rpx 5rpx 7rpx 0rpx rgba(113, 132, 151, 0.25);
						border-radius: 10rpx;
					}
				}
			}
		}
	}
</style>
