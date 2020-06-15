<template>
	<view class="page">
		<view class="hezuo_img">
			<image src="../../static/img/logo.png" mode="widthFix" class="img"></image>
		</view>
		<view class="text_p1" v-html="swMsg">
			<!-- {{swMsg.content}} -->
		</view>
<!-- 		<view class="text_p1">
			预约洗车预约洗车预约洗车预约洗车预约洗车预约洗车预约洗车预约洗车预约洗车预约洗车预约洗车预约洗车预约洗车预约洗车预约洗车预约洗车预约洗车
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swMsg:""
			};
		},
		mounted() {
			this.$getApi("/api/user/my/hezuo",{},res=>{
				let  swM = res.data.content;
				this.phone =  res.data.tel;
				const regex = new RegExp('<img','gi')
				swM = swM.replace(regex,`<img style="max-width:100%;"`);
				this.swMsg = swM;
			})
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
