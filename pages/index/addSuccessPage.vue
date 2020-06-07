<template>
	<view class="over-bg-white">
		<view class="top-img text-center"><image style="width: 131rpx;height: 131rpx;" src="../../static/wanc.png" mode=""></image></view>
		<view class="text-bold text-center title-top">信息添加成功</view>
		<view class="padding flex justify-center"><button @tap="next(1)" style="width: 640rpx;" class="cu-btn block bg-blue margin-tb-sm lg" type="">去下单</button></view>
		<view class="padding flex justify-center"><button @tap="next(2)" style="width: 640rpx;" class="cu-btn block line-blue margin-tb-sm lg" type="">继续添加车辆</button></view>
		<view class="padding flex justify-center"><button @tap="next(3)" style="width: 640rpx;" class="cu-btn block line-blue margin-tb-sm lg" type="">继续添加地址</button></view>
		<view class="padding flex justify-center"><button @tap="next(4)" style="width: 640rpx;" class="cu-btn block line-blue margin-tb-sm lg" type="">返回首页</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods:{
		next(type) {
			console.log(type);
			switch (type) {
				case 1:
				uni.switchTab({
					url:'../orderPage/index'
				});
				break;
				case 2:
				uni.navigateTo({
					url:'perfectCarInfo'
				});
				break;
				case 3:
				uni.navigateTo({
					url:'addAddressInfoPage'
				});
				break;
				case 4:
				uni.switchTab({
					url:'index'
				})
				break;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.top-img {
	margin: 121rpx auto 0;
}
.title-top {
	margin-top: 60rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: rgba(51, 51, 51, 1);
}
</style>
