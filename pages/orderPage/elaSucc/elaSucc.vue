<template>
	<view class="over-bg-white">
		<view class="top-img text-center"><image style="width: 131rpx;height: 131rpx;" src="../../../static/wanc.png" mode=""></image></view>
		<view class="text-bold text-center title-top">评价成功</view>
		
		
		
		<view class="padding flex justify-center"><button @tap="next(1)" style="width: 640rpx;" class="cu-btn block bg-blue margin-tb-sm lg" type="">查看评价</button></view>
		<view class="padding flex justify-center"><button @tap="next(2)" style="width: 640rpx;" class="cu-btn block line-blue margin-tb-sm lg" type="">返回订单</button></view>
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
			
			switch (type) {
				case 1:
					uni.navigateTo({
						url:"/pages/orderPage/elaList/elaList"
					})
					break;
				case 2:
					uni.switchTab({
	
						url: "pages/orderPage/order/order?navIndex=2"
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
