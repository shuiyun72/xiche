<template>
	<view class="orders_reject_suc">
		
		<view class="icon_msg_sy">
			<view class="iconfont iconselected"></view>
			<view class="text">
				取消订单成功
			</view>
		</view>
		<view class="re_mtop4">
			<button class="btn round orange ms" @click="switchTab('../home/home')">返回首页</button>
		</view>
		<view class="re_mtop4">
			<navigator url="../mine/addCar">
				<button class="btn round orange_n ms" @click="switchTab('../orders/orders')">返回订单</button>
			</navigator>
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
			switchTab(el){
				uni.switchTab({
				    url: el
				});
			}
		}
	}
</script>

<style lang="scss">
.orders_reject_suc{
	border-top: 1upx solid #eee;
	padding: 0 26upx;
}
.re_mtop4{
	margin-top:4vh;
	padding: 0 20upx;
}
.icon_msg_sy{
	text-align: center;
	padding: 80upx 0 40upx;
	.iconselected{
		font-size: 120upx;
		color:#F2933C ;
	}
	.text{
		font-size: 32upx;
		color: #666;
		padding-top: 30upx;
	}
}
</style>
