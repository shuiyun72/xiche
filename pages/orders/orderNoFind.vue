<template>
	<view class="orders_reject_suc">
		
		<view class="no_find_car">
			<image src="../../static/img/weizdcl.png" mode="widthFix" class="img"></image>
		</view>
		<view class="re_mtop4">
			<button class="btn round orange ms" @click="tellPhone">联系客户 ( 一键拨号 ) </button>
		</view>
		<view class="re_mtop4">
			<navigator :url="'./orderCancel?item='+JSON.stringify(info)">
				<button class="btn round orange_n ms">取消订单</button>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{}
			};
		}, 
		methods:{
			tellPhone(){
				uni.makePhoneCall({
				    phoneNumber: this.info.phone
				});
			}
		},
		onLoad(option) {
			this.info = JSON.parse(option.item);
		},
		
	}
</script>

<style lang="scss">
.no_find_car{
	text-align: center;
	padding: 180upx 0 50upx;
	.img{
		width: 60%;
	}
}
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
