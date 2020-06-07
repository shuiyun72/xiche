<template>
	<view class="box-main">
		<view class="bg-white">
			<view class="package-box padding-lr" v-for="(item, index) in packArr" :key="index">
				<view class="title">{{ item.name }}</view>
				<view @click="goList(index)" class="logo margin-tb"><image style="width: 702rpx;height: 240rpx;" :src="dealSrc(item.imgsrc)" mode=""></image></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			packArr: [
				{
					name: '小型汽车车型',
					imgsrc: 'xctc'
				},
				{
					name: 'SUV车型',
					imgsrc: 'suvtc'
				},
				{
					name: 'MPV车型',
					imgsrc: 'mpvtc'
				},
				{
					name: '综合车型全家桶',
					imgsrc: 'zhtc'
				}
			]
		};
	},
	methods: {
		dealSrc(src) {
			return `../../static/${src}.png`;
		},
		goList(index) {
			uni.navigateTo({
				url:`list?index=${index}`
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.package-box {
	padding-top: 20rpx;
	margin-top: 5rpx;
	height: auto;
	.title {
		font-size: 36rpx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}
}
</style>
