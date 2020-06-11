<template>
	<view class="orders_reject_suc">
		<view class="icon_msg_sy">
			<view class="iconfont iconselected"></view>
			<view class="text_title">
				提现申请提交成功
			</view>
			<view class="text_info">
				审核通过后20小时内到账,若未及时到账请联系线下客服人员
			</view>
		</view>
		<view class="re_mtop4">
			<button class="btn  blue ms" @click="switchTab('./mine')">返回钱包</button>
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
	.text_title{
		font-weight: bold;
		padding: 30upx 0 20upx;
	}
	.text_info{
		font-size: 28upx;
		color: #999;
		padding: 0 100upx;
	}
}
</style>
