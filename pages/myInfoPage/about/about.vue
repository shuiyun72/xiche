<template>
	<view>
		<view class="main flex flex-direction align-center">
			<view class="main-one flex flex-direction align-center">
				<view class="img">
					<image src="../../../static/logo.png"></image>
				</view>
				<view class="content">
					商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作商务合作
				</view>
			</view>
			<view class="main-two mr-top20 cl-333" v-if="type==2"> 
				<view class="left fs-30">商务合作电话</view>
				<view class="right fs-28">11111111</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:1,
			}
		},
		methods: {
			
		},
		
		
		onLoad(e) {
			if(e.type ==1){
				//优惠券
				this.type =1;
				uni.setNavigationBarTitle({
					title:"关于我们"
				})
			}else{
				//折扣券
				this.type =2;
				uni.setNavigationBarTitle({
					title:"商务合作"
				})
			}
		}
	}
</script>

<style lang="scss">
.main{
	.main-one,.main-two{
		background-color: white;
	}
	.main-one{
		
		.img{
			padding:60rpx 0;
			width:193rpx;
			height:211rpx;
			image{
				width:100%;
				height: 100%;
			}
		}
		.content{
			padding:0 100rpx;
			
			font-size: 30rpx;
			margin-bottom: 30rpx;
		}
	}
	.main-two{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0 20rpx;
		width:750rpx;
		height:88rpx;
		background:rgba(255,255,255,1);
		box-sizing: border-box;
		
	}
}
</style>
