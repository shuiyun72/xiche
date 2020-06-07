<template>
	<view>
		<view class="main">
			<view class="main-one width100">
				<!-- #ifdef MP-WEIXIN -->
				<button v-if="flag"> 授权登录</button>
				<text v-else="flag" class="name">姓名</text>

				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<text v-else="flag" class="name">姓名</text>

				<!-- #endif -->

			</view>
			<view class="main-two width100">
				<view class="photo" @click="skip('/pages/myInfoPage/personInfo/personInfo')">
					<image src="../../static/userinfo.png"></image>

				</view>
				<view class="row">
					<view class="left">
						<image src="../../static/my/wodtc.png"></image>
					</view>
					<view class="right cl-333 fs-26 mr-top20" @click="skip('/pages/finishCarInfo/discount/discount','1')">
						我的套餐
					</view>
				</view>
				<view class="row" @click="skip('/pages/myInfoPage/carList/carList')">
					<view class="left">
						<image src="../../static/my/wodclk.png"></image>
					</view>
					<view class="right cl-333 fs-26 mr-top20">
						车辆库
					</view>
				</view>
				<view class="row" @click="skip('/pages/myInfoPage/addrssList/addrssList')">
					<view class="left">
						<image src="../../static/my/dizk.png"></image>
					</view>
					<view class="right cl-333 fs-26 mr-top20">
						地址库
					</view>
				</view>
				<view class="row" @click="skip('/pages/myInfoPage/phoneList/phoneList')">
					<view class="left">
						<image src="../../static/my/shouji.png"></image>
					</view>
					<view class="right cl-333 fs-26 mr-top20">
						手机库
					</view>
				</view>
			</view>

			<view class="main-thr width100">
				<view class="row">
					<view class="left flex align-center">
						<image src="../../static/my/wodqb.png"></image>
						<text class="mr-lt30 cl-333">我的钱包</text>
					</view>
					<view class="right">
						<image src="../../static/my/jinr.png"></image>
					</view>
				</view>
				<view class="row" @click="skip('/pages/finishCarInfo/discount/discount','2')">
					<view class="left flex align-center">
						<image src="../../static/my/wodyhj.png"></image>
						<text class="mr-lt30 cl-333">我的优惠券</text>
					</view>
					<view class="right">
						<image src="../../static/my/jinr.png"></image>
					</view>
				</view>
				<view class="row" @click="skip('/pages/orderPage/elaList/elaList')">
					<view class="left flex align-center">
						<image src="../../static/my/wodpj.png"></image>
						<text class="mr-lt30 cl-333">我的评价</text>
					</view>
					<view class="right">
						<image src="../../static/my/jinr.png"></image>
					</view>
				</view>
				<view class="row" @click="skip('/pages/myInfoPage/about/about','2')">
					<view class="left flex align-center">
						<image src="../../static/my/shangwhz.png"></image>
						<text class="mr-lt30 cl-333">商务合作</text>
					</view>
					<view class="right">
						<image src="../../static/my/jinr.png"></image>
					</view>
				</view>
				<view class="row" @click="skip('/pages/myInfoPage/about/about','1')">
					<view class="left flex align-center">
						<image src="../../static/my/guanywm.png"></image>
						<text class="mr-lt30 cl-333">关于我们</text>
					</view>
					<view class="right">
						<image src="../../static/my/jinr.png"></image>
					</view>
				</view>
				<view class="row"  @click="skip('/pages/set/set','2')">
					<view class="left flex align-center">
						<image src="../../static/my/shez.png"></image>
						<text class="mr-lt30 cl-333">设置</text>
					</view>
					<view class="right">
						<image src="../../static/my/jinr.png"></image>
					</view>
				</view>


			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag: false,
			};
		},
		methods: {
			skip(url, type) {
				uni.navigateTo({
					url: url + "?type=" + type
				})
			}
		}
	}
</script>

<style lang="scss">
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
		background-color: white;

		image {
			width: 100%;
			height: 100%;
		}

		.main-one {
			height: 380rpx;
			background: url(../../static/my/bg.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			justify-content: center;

			.name {
				margin-top: 100rpx;
				color: white;
				font-size: 32rpx;
			}
		}

		.main-two {
			width: 710rpx;
			height: 240rpx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 5px 13px 0px rgba(32, 142, 255, 0.21);
			border-radius: 20rpx;
			margin: -120rpx 0 0;
			position: relative;
			display: flex;
			justify-content: space-around;

			.photo {
				position: absolute;
				width: 152rpx;
				height: 152rpx;
				left: 50%;
				transform: translate(-76rpx, 0);
				top: -76rpx;
				border-radius: 100%;



				border: 6rpx solid rgba(255, 255, 255, 1);
				// box-shadow:0px 8px 10px 0px rgba(32,142,255,0.7);

			}

			.row {
				margin-top: 100rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 54rpx;
					height: 45rpx;
				}

			}
		}

		.main-thr {
			display: flex;
			flex-direction: column;
			margin-top: 30rpx;

			.row {
				padding: 0 40rpx;
				box-sizing: border-box;
				height: 88rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					image {
						width: 44rpx;
						height: 44rpx;
					}
				}

				.right {
					image {
						width: 44rpx;
						height: 44rpx;

					}
				}
			}
		}
	}
</style>
