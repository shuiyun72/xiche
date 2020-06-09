<template>
	<view class="orders_reject_suc">
		
		<view class="icon_msg_sy">
			<view class="iconfont iconselected"></view>
			<view class="text">
				感谢您的信息提交我们将尽快开通
			</view>
			<view class="text">
				此区域的洗车服务
			</view>
		</view>
		<view class="re_mtop4">
			<button class="btn  blue ms" @click="navigateTo('./addAddress')">返回上一级</button>
		</view>
		<view class="re_mtop4 mt10">
			<button class="btn  blue_n ms" @click="switchTab('../home/home')">返回首页</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}, 
		methods:{
			navigateTo(url){
				uni.navigateTo({
					url:url
				})
			},
			switchTab(el){
				uni.switchTab({
				    url: el
				});
			}
		}
	}
</script>

<style lang="scss" scoped>

.orders_reject_suc{
	border-top: 1upx solid #eee;
	padding: 0 26upx;
}
.re_mtop4{
	&.mt10{
		margin-top: 60upx;
	}
	margin-top:2vh;
	padding: 0 20upx;
}
.icon_msg_sy{
	text-align: center;
	padding: 80upx 0 40upx;
	.iconselected{
		font-size: 120upx;
		color:$uni-bl ;
	}
	.text{
		font-size: 32upx;
		color: #666;
		padding-top: 30upx;
	}
}
</style>
