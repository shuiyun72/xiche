<template>
	<view class="over-bg-white">
		<view class="top-img text-center"><image style="width: 131rpx;height: 131rpx;" src="../../static/wanc.png" mode=""></image></view>
		<view class="text-bold text-center title-top">套餐购买成功</view>
		<view class="text-bold text-center title-top notice" :class="{ hidd: havePerfectInfo }">您还没有添加车辆和地址信息完善信息后才可下单</view>
		<view v-if="havePerfectInfo" class="padding-lr flex justify-center margin-top-xs"><button @tap="next(1)" style="width: 640rpx;" class="cu-btn block bg-blue margin-tb-sm lg" type="">查看我的洗车劵</button></view>
		<view v-if="havePerfectInfo" class="padding-lr flex justify-center">
			<button @tap="next(2)" style="width: 640rpx;" class="cu-btn block line-blue margin-tb-sm lg" type="">马上下单，预约洗车</button>
		</view>
		<view v-if="!havePerfectInfo" class="padding-lr flex justify-center margin-top">
			<button @tap="next(3)" style="width: 640rpx;" class="cu-btn block bg-blue margin-tb-sm lg" type="">去完善信息</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			havePerfectInfo: true, // 是否完成信息完善
		};
	},
	methods: {
		next(type) {
			console.log(type);
			switch (type) {
				case 1:
					uni.navigateTo({
						url:"/pages/finishCarInfo/discount/discount"
					})
					break;
				case 2:
					uni.navigateTo({
						url: 'perfectCarInfo'
					});
					break;
				case 3:
					uni.navigateTo({
						url: 'addAddressInfoPage'
					});
					break;
				case 4:
					uni.switchTab({
						url: 'index'
					});
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
	font-size: 30rpx;
	font-weight: bold;
	color: rgba(51, 51, 51, 1);
	&.notice{
		margin-top: 20rpx;
	}
	&.hidd {
		visibility: hidden;
	}
}
</style>
