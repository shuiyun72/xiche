<template>
	<view class="order_true">
		<view class="order_info">
			<view class="od_title">
				<view class="t">
					单次内部清洗、打蜡
				</view>
				<view class="money">
					28元
				</view>
			</view>
			<view class="msg" v-for="i in 6">
				<view class="l_t">
					车牌号:
				</view>
				<view class="r_c">
					豫A668899
				</view>
			</view>
		</view>
		<uni-list class="od_t">
			<uni-list-item title="洗车券" :showArrow="false">
				<template v-slot:right="">
					<text class="red">无</text>
				</template>
			</uni-list-item>
		</uni-list>
		<uni-list class="od_t">
			<uni-list-item title="优惠券" rightText="8折折扣券"></uni-list-item>
		</uni-list>
		<view class="pay_type">支付方式</view>
		<radio-group class="block" @change="RadioChange">
			<view class="cu-form-group">
				<view class="item">
					<image style="width: 44rpx;height: 44rpx;" src="../../static/img/weixin.png" mode=""></image><text class="margin-left-xs">微信支付</text>
				</view>
				<radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A" class="radio"></radio>
			</view>
			<!-- #ifndef MP-ALIPAY -->
			<view class="cu-form-group">
				<view class="item">
					<image style="width: 44rpx;height: 44rpx;" src="../../static/img/zhifb.png" mode=""></image><text class="margin-left-xs">支付宝支付</text>
				</view>
				<radio :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B" class="radio"></radio>
			</view>
			<view class="cu-form-group">
				<view class="item">
					<image style="width: 44rpx;height: 44rpx;" src="../../static/img/yue.png" mode=""></image><text class="margin-left-xs">余额支付</text>
				</view>
				<view>
					<radio :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C" class="radio"></radio>
				</view>
			</view>
			<!-- #endif -->
		</radio-group>
		<view class="bottom_c">
			<view class="pay-num">
				实付款：<text class="red">￥22.4</text>
			</view>		
			<view @click="next" class="btn">立即支付</view>	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				radio: 'A',
			};
		},
		methods: {
			RadioChange(e) {
				this.radio = e.detail.value;
			},
			next() {
				uni.navigateTo({
					url: './orderSuccess'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bottom_c{
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		width: 750upx;
		font-size: 26upx;
		
		.pay-num{
			width: 70%;
			background-color: #fff;
			padding: 30upx 0;
			box-sizing: border-box;
			padding-left: 280upx;
			color: #333;
			.red{
				color: #f00;
			}
		}
		.btn{
			width: 30%;
			background-color: $uni-bl;
			color: #fff;
			text-align: center;
			padding: 30upx 0;
		}
	}
	.cu-form-group {
		display: flex;
		justify-content: space-between;
		padding: 16upx 26upx;
		background-color: #fff;
		border-top: 1upx solid rgba(0, 0, 0, .1);

		.item {
			display: inline-flex;
			align-items: center;

			.margin-left-xs {
				margin-left: 10upx;
				font-size: 28upx;
				color: #666;
			}
		}
	}

	.radio {
		transform: scale(.8);
	}

	.pay_type {
		background-color: #fff;
		margin-top: 36upx;
		font-size: 28upx;
		padding: 20upx 26upx;
	}

	.pay_top {
		background-color: #fff;
		padding: 10upx 30upx;

		.bl {
			background-color: $uni-bl;
			text-align: center;
			color: #fff;
			padding: 60upx 0;
			border-radius: 16upx;
		}

		.t1 {
			font-size: 36upx;
			margin-bottom: 20upx;
		}
	}


	.pay_type {
		background-color: #fff;
		margin-top: 20upx;
		font-size: 28upx;
		padding: 20upx 26upx;
	}

	.order_true {
		border-top: 1upx solid #eee;
		background-color: #f0f0f0;
		min-height: 100vh;
	}

	.od_t {
		margin-top: 20upx;
	}

	.order_info {
		background-color: #fff;
		padding: 20upx 26upx;

		.msg {
			display: flex;
			font-size: 32upx;
			font-weight: bold;
			color: #999;
			padding: 10upx 0;

			.l_t {
				width: 160upx;
			}
		}

		.od_title {
			display: flex;
			font-weight: bold;
			justify-content: space-between;
			font-size: 36upx;
			padding: 10upx 0;

			.t {
				color: #666;
			}

			.money {
				color: #f00;
			}
		}
	}
</style>
