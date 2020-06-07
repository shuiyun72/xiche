<template>
	<view class="over-bg-white">
		<view class="bg-white padding">
			<view class="pack-name">{{ carArr[carIndex] }}</view>
			<view class="margin-top pack-box" :class="{ select: seleceIndex == index, big:carIndex == 3 }" v-for="(item, index) in apiListDate" :key="index" @click="seleceIndex = index">
				<view class="pack-type">{{ item.name }}</view>
				<view class="flex justify-between">
					<view class="margin-top-xs">
						<view class="pack-name">{{ item.num }}张外部洗车券</view>
						<view class="text-grey margin-top-xs">有限期{{ item.time }}天/直接抵扣使用</view>
					</view>
					<view class="text-right">
						<view class="text-red price">￥ {{ item.price }}</view>
						<view class="text-gray margin-top-xs" style="text-decoration:line-through">原价： {{ item.beforeprice }}</view>
					</view>
				</view>
			</view>
			<view class="pack-name margin-top">套餐说明</view>
			<view class="margin-top bot-cs">{{ text }}</view>
		</view>
		<view @tap="next()" class="cu-bar foot" style="box-shadow: 0;"><button class="cu-btn bg-blue lg" style="width: 750rpx; height: 100rpx;" type="">确定</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			carArr: ['小型汽车套餐', 'SUV车型', 'MPV车型', '综合车型全家桶'],
			carIndex: 0,
			seleceIndex: 0,
			text: '1.套餐里的洗车劵可直接抵扣车辆外部清洗的费用，无需 再另外付费2.请在有限期内使用，超过有效期洗车劵将失效',
			apiListDate: [
				{
					name: '月套餐',
					num: 10,
					time: 30,
					price: 30,
					beforeprice: 90
				},
				{
					name: '季套餐',
					num: 10,
					time: 120,
					price: 130,
					beforeprice: 190
				},
				{
					name: '月套餐',
					num: 10,
					time: 30,
					price: 30,
					beforeprice: 90
				},
				{
					name: '季套餐',
					num: 10,
					time: 120,
					price: 130,
					beforeprice: 190
				},
				{
					name: '月套餐',
					num: 10,
					time: 30,
					price: 30,
					beforeprice: 90
				},
				{
					name: '季套餐',
					num: 10,
					time: 120,
					price: 130,
					beforeprice: 190
				},
				{
					name: '月套餐',
					num: 10,
					time: 30,
					price: 30,
					beforeprice: 90
				},
				{
					name: '季套餐',
					num: 10,
					time: 120,
					price: 130,
					beforeprice: 190
				}
			]
		};
	},
	created() {
		this.carIndex = this.$route.query.index * 1;
	},
	methods:{
		next (){
			uni.navigateTo({
				url:'choosePayWay'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.pack-name {
	font-size: 32rpx;
	font-weight: bold;
	color: rgba(51, 51, 51, 1);
}
.pack-box {
	width: 692rpx;
	height: 160rpx;
	background: rgba(255, 255, 255, 1);
	border: 2rpx solid rgba(243, 243, 243, 1);
	border-radius: 10rpx;
	padding-left: 45rpx;
	padding-right: 43rpx;
	&.select {
		background: rgba(224, 239, 255, 1);
		border: 2rpx solid rgba(32, 142, 255, 1);
	}
	&.big{
		padding-left: 26rpx;
	}
}
.pack-type {
	width: 108rpx;
	height: 41rpx;
	background-image: url(../../static/taocbg.png);
	background-size: 100% 100%;
	background-repeat: no-repeat;
	text-align: center;
	color: rgba(255, 255, 255, 1);
}
.price {
	font-size: 40rpx;
	font-weight: bold;
	color: rgba(255, 0, 49, 1);
	height: 40rpx;
}
.bot-cs {
	padding-bottom: 100rpx;
	display: flex;
	width: 700rpx;
	// height: 300rpx;
}
</style>
