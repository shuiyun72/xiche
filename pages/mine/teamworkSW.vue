<template>
	<view class="page">
		<view class="hezuo_img">
			<image src="../../static/img/logo.png" mode="widthFix" class="img"></image>
		</view>
		<view class="text_p1">
			商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作
		</view>
		<uni-list class="p10_l">
			<uni-list-item title="商务合作电话" rightText="400-9876365" :showArrow="false"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.page{
	background-color: #f0f0f0;
	min-height: 100vh;
}
.p10_l{
	margin: 20upx 0;
}
.hezuo_img{
	text-align: center;
	padding: 50upx 0;
	background-color: #fff;
	.img{
		width: 160upx;
	}
}
.text_p1{
	background-color: #fff;
	padding: 20upx 36upx;
	line-height: 80upx;
}
</style>
