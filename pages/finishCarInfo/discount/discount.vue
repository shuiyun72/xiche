<template>
	<view>
		<view class="main">
			<view class="main_one">
				<app-tabs  :tabs="tabs" v-model="tabIndex" @change="changeIndex"></app-tabs>
			</view>
			<view class="main_two">
				<view class="flex flex-direction align-center no-thing mr-top60" 
				      v-show="type==1 && discountList.length == 0 && tabIndex == 0">
					<image src="../../../static/my/wuj.png" style="width:320rpx;height: 240rpx;"></image>
					<text class="fs32 cl-333 mr-top10">无可用洗车劵，赶紧去购买套餐吧!</text>
				</view>
				<!-- 洗车券 -->
				<view class="box flex flex-direction " v-show="type==1 && discountList.length != 0">
					<view class="row align-center flex" :class="countType==1?'car1':countType==2?'car2':'car3'">
						<view class="left flex flex-direction align-center cl-fff fs-36">
							<text class="">小轿车</text>
							<text class="">月套餐</text>
						</view>
						<view class="right flex flex-direction align-center  fs-26">
							<text class="fw-bold fs-32">1111</text>
							<text class="cl-black" v-show="tabIndex==1">1111</text>
							<text class="cl-black">1111</text>
						</view>
						
						<image v-show="tabIndex==2" src="../../../static/my/yigq.png" class="outDate"></image>
						<image v-show="tabIndex==1" src="../../../static/my/yisy.png" class="used"></image>
					</view>
				</view>
				<!-- 优惠券 -->
				<view class="box flex flex-direction" v-show="type==2">
					<view class="row align-center flex" 
					    :class="type==2 ? 'car4':''">
						<view class="left flex flex-direction align-center cl-fff fs-36">
							<text :class="tabIndex==0?'cl-blue':''" class="fw-bold">1111</text>
							<text class="cl-black">折扣券</text>
						</view>
						<view class="right flex flex-direction align-center  fs-26">
							<text class="fw-bold fs-32">1111</text>
							<text class="cl-black" v-show="tabIndex==1">1111</text>
							<text class="cl-black">1111</text>
						</view>
						<image v-show="tabIndex==2" src="../../../static/my/yigq.png" class="outDate"></image>
						<image v-show="tabIndex==1" src="../../../static/my/yisy.png" class="used"></image>
					</view>
				</view>
				<load-more  v-show="type==1 && discountList.length == 0 && tabIndex == 0" :loadingType="loadingType"></load-more>
				
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import appTabs from "@/components/app-tabs/app-tabs"
	import loadMore from '@/components/load-more/load-more.vue'
	export default {
		components: {
			appTabs,
			loadMore
		},
		data() {
			return {
				nextPage:"",
				loadingType:0,
				tabs: ["待使用", "已使用","已过期"],
				tabIndex: 0, //默认常用地址
				
				type:0,
				discountList:[,,,,],
				countType:1, //1小轿车 2suv 3mvp
			}
		},
		onLoad(e) {
			
		    if(e.type ==1){
				//优惠券
				this.type =1;
				uni.setNavigationBarTitle({
					title:"我的洗车券"
				})
			}else{
				//折扣券
				this.type =2;
				uni.setNavigationBarTitle({
					title:"优惠券"
				})
			}
		},
		
		//触底加载更多数据
		onReachBottom(){
			
		},
		methods: {
			changeIndex(e){
				console.log(e)
				this.tabIndex = e;
			}
		}
	}
</script>

<style lang="scss">
	.add_msg{
		position: fixed;
		bottom: 100rpx;
		margin: 0 45rpx;
		width:660rpx;
		height:88rpx;
		background:linear-gradient(-7deg,rgba(178,151,108,1),rgba(188,162,119,1));
		border:1px solid rgba(215,215,215,1);
		border-radius:16rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size:32rpx;
		
		color:rgba(255,255,255,1);
	}
	.main{
		padding-bottom: 200rpx;
		background-color: #eee;
		min-height: 100vh;
		.main_one{
			position: fixed;
			top:0;
			width:100vw;
			height: 88rpx;
			border-top:1px solid #eee;
			
		}
		.main_two{
			margin-top:110rpx;
		
		}
	}
	
	.main_two{
		padding:36rpx;
		background-color: white;
		min-height: 100vh;
		.row{
			position: relative;
			width:100%;
			height: 180rpx;
			.left{
				margin-left:70rpx;
			}
			.right{
				margin-left:130rpx;
			}
			.outDate,.used{
				position: absolute;
				right:34rpx;
				top:20rpx;
				width:98rpx;
				height:75rpx;
			}
			
			
		}
		.car2{
			background:url(../../../static/my/juansuv.png);
			background-size: 100% 100%;
		}.car1{
			background:url(../../../static/my/juanxxc.png);
			background-size: 100% 100%;
		}.car3{
			background:url(../../../static/my/juanmpv.png);
			background-size: 100% 100%;
		}
		.car4{
			background:url(../../../static/my/zhekj.png);
			background-size: 100% 100%;
		}
		
	}
	
	
</style>
