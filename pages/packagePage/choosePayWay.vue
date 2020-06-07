<template>
	<view>
		<view class="bg-white top-main">
			<view class="top-box">
				<view class="flex justify-center text-white price">￥ 75.0</view>
				<view class="flex justify-center text-white pack-name">月套餐</view>
			</view>
		</view>
		<view class="margin-top-lg bg-white padding"><view class="">支付方式</view></view>
		<radio-group class="block" @change="RadioChange">
			<view class="cu-form-group">
				<view class="title flex align-center"><image style="width: 44rpx;height: 44rpx;" src="../../static/weixin.png" mode=""></image><text class="margin-left-xs">微信支付</text></view>
				<radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio>
			</view>
			<!-- #ifndef MP-ALIPAY -->
			<view class="cu-form-group">
				<view class="title flex align-center"><image style="width: 44rpx;height: 44rpx;" src="../../static/zhifb.png" mode=""></image><text class="margin-left-xs">支付宝支付</text></view>
				<radio :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B"></radio>
			</view>
			<view class="cu-form-group">
				<view class="title flex align-center"><image style="width: 44rpx;height: 44rpx;" src="../../static/yue.png" mode=""></image><text class="margin-left-xs">余额支付</text></view>
				<view>
					<radio :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C"></radio>
				</view>
			</view>
			<!-- #endif -->
		</radio-group>
		<!-- <view @tap="next()" class="cu-bar foot" style="box-shadow: 0;"><button class="cu-btn bg-blue lg" style="width: 750rpx; height: 100rpx;" type="">确定</button></view> -->
		<view class="cu-bar foot bg-white" style="box-shadow: 0;">
			<view class="pay-num">
				实付款：<text class="text-red">￥75.0</text>
			</view>
			<view class="">
				<button @click="next" class="bg-blue" style=" width: 250rpx;">确认支付</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			radio:'A',
		};
	},
	methods:{
		RadioChange(e) {
			this.radio = e.detail.value;
		},
		next() {
			uni.navigateTo({
				url:'paySuccessPage'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
	.top-main{
		width:750rpx;
		height:290rpx;
		background:rgba(255,255,255,1);
		margin-top: 0;
		padding-top: 20rpx;
		.top-box {
			width: 702rpx;
			height: 250rpx;
			background: rgba(32, 142, 255, 1);
			border-radius: 10rpx;
			padding-top: 10rpx;
			margin: 0 auto;
			.pack-name{
				font-size:30rpx;
				font-weight:bold;
				color:rgba(255,255,255,1);
				margin-top: 10rpx;
			}
			.price{
				font-size:42rpx;
				font-weight:bold;
				color:rgba(255,255,255,1);
				margin-top: 60rpx;
			}
		}
	}
.pay-num{
	padding-left: 248rpx;
	font-size:28rpx;
	font-weight:bold;
	color:rgba(51,51,51,1);
}
</style>
