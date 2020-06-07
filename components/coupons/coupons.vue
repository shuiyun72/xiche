<template>
	<view class="quan-content">
		<view class="box-quan padding">
			<view class="title-top">恭喜你获得</view>
			<view class="title-bottom">洗车优惠券</view>
			<view v-for="(item, index) in zhekouArr" :key="index" class="flex zhekou-box">
				<view class="zhekou-box-left">
					<view class="zhekou">
						1
						<text class="small-text margin-left-xs">折</text>
					</view>
					<view class="zhekou-text">折扣券</view>
				</view>
				<view class="zhekou-box-right">
					<view class="zhekou-name">预约洗车1折优惠</view>
					<view class="zhekou-time">有限期2020.05.12-2020.08.12</view>
				</view>
			</view>
			<view @tap="closeModal(true)" class="padding"><button style="border-radius:40px;" class="cu-btn block text-lg text-bold text-blue bg-white margin-tb-sm lg" type="">立即领取</button></view>
		</view>
		<view class="close-btn margin-top">
			<image @click="closeModal(false)" style="width: 80rpx;height: 80rpx;" src="../../static/index/guanb.png" mode=""></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			zhekouArr: ['1', '2', '3']
		};
	},
	methods: {
		closeModal(type) {
			this.$emit('closeQuanModal',type)
		}
	}
};
</script>

<style lang="scss" scoped>

.box-quan {
	width: 100%;
	height: 850rpx;
	background: linear-gradient(0deg, rgba(72, 163, 255, 1) 0%, rgba(32, 142, 255, 1) 100%);
	border-radius: 20rpx;
	.title-top {
		margin: 0rpx auto;
		font-size: 36rpx;
		color: rgba(255, 255, 255, 1);
	}
	.title-bottom {
		margin: 0rpx auto;
		font-size: 48rpx;
		font-weight: 800;
		color: rgba(255, 255, 255, 1);
	}
	.zhekou-box {
		width: 559rpx;
		height: 149rpx;
		background-image: url(../../static/index/zhekj.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: 30rpx auto 0;
		.zhekou-box-left {
			width: 170rpx;
			.zhekou {
				font-size: 60rpx;
				font-weight: 800;
				color: rgba(225, 0, 63, 1);
				.small-text {
					font-size: 30rpx;
				}
			}
			.zhekou-text {
				margin-top: 10rpx;
				font-size: 20rpx;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}
		}
		.zhekou-box-right {
			margin: 30rpx auto 0;
			.zhekou-name {
				font-size: 28rpx;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}
			.zhekou-time {
				font-size: 20rpx;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				margin-top: 20rpx;
			}
		}
	}
}
</style>
