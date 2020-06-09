<template>
	<view class="pay">
		<view class="pay_top">
			<view class="bl">
				<view class="t1">￥ {{money}}.0</view>
				<view class="t2">月套餐</view>
			</view>

		</view>
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
				<radio :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B"  class="radio"></radio>
			</view>
			<view class="cu-form-group">
				<view class="item">
					<image style="width: 44rpx;height: 44rpx;" src="../../static/img/yue.png" mode=""></image><text class="margin-left-xs">余额支付</text>
				</view>
				<view>
					<radio :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C"  class="radio"></radio>
				</view>
			</view>
			<!-- #endif -->
		</radio-group>
		<!-- <view @tap="next()" class="cu-bar foot" style="box-shadow: 0;"><button class="cu-btn bg-blue lg" style="width: 750rpx; height: 100rpx;" type="">确定</button></view> -->
		<view class="bottom_c">
			<view class="pay-num">
				实付款：<text class="red">￥75.0</text>
			</view>		
			<view @click="next" class="btn">确认支付</view>	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				radio: 'A',
				money:0
			};
		},
		onLoad(op) {
			this.money = op.money;
		},
		methods: {
			RadioChange(e) {
				this.radio = e.detail.value;
			},
			next() {
				uni.navigateTo({
					url: './successMsg'
				})
				// // #ifndef MP
				// 	uni.requestPayment({
				// 	    provider: 'alipay', // wxpay、alipay
				// 	    orderInfo: 'orderInfo', //微信、支付宝订单数据
				// 	    success: function (res) {
				// 	        console.log('success:' + JSON.stringify(res));
				// 	    },
				// 	    fail: function (err) {
				// 	        console.log('fail:' + JSON.stringify(err));
				// 	    }
				// 	});
				// // #endif
				// // #ifdef MP
				// 	uni.requestPayment({
				// 	    provider: 'wxpay',
				// 	    timeStamp: String(Date.now()),
				// 	    nonceStr: 'A1B2C3D4E5',
				// 	    package: 'prepay_id=wx20180101abcdefg',
				// 	    signType: 'MD5',
				// 	    paySign: '',
				// 	    success: function (res) {
				// 	        console.log('success:' + JSON.stringify(res));
				// 	    },
				// 	    fail: function (err) {
				// 	        console.log('fail:' + JSON.stringify(err));
				// 	    }
				// 	});
				// // #endif
			}
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: #f0f0f0;
	}
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
			padding: 20upx 0;
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
			padding: 20upx 0;
		}
	}
	.pay {
		background-color: #f0f0f0;
		height: 100vh;
		border-top: 1upx solid #eee;

		.cu-form-group {
			display: flex;
			justify-content: space-between;
			padding: 16upx 26upx;
			background-color: #fff;
			border-top: 1upx solid rgba(0,0,0,.1);
			.item{
				display: inline-flex;
				align-items:center ;
				.margin-left-xs{
					margin-left: 10upx;
					font-size: 28upx;
					color: #666;
				}
			}
		}
		.radio{
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
			padding: 20upx 30upx;

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
	}
</style>
