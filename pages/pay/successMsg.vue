<template>
	<view class="orders_reject_suc">
		
		<view class="icon_msg_sy">
			<view class="iconfont iconselected"></view>
			<view class="text">
				套餐购买成功
			</view>
			<view class="text" v-if="userInfo.groupid == 0">
				您还没有添加车辆和地址信息完善信息后才可下单
			</view>
		</view>
		<view class="re_mtop4"  v-if="userInfo.groupid == 0">
			<button class="btn  blue ms" @click="navigateTo('../mine/addCar?ws=1')">去完善信息</button>
		</view>
		<view class="re_mtop4">
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
		computed:{
			userInfo(){
				return this.$store.state.userInfo;
			}
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

<style lang="scss">
.orders_reject_suc{
	border-top: 1upx solid #eee;
	padding: 0 26upx;
}
.re_mtop4{
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
