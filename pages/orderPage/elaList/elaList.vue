<template>
	<view>
		<view class="main">
			<view class="row flex flex-direction ">
				<view class="row-one">
					<view class="left mr-rt20 bd-b-eee">
						<image src="../../../static/my/ping.png"></image>
					</view>
					<view class="right fs-28 cl-333">
						订单编号：168678956220
					</view>
					
				</view>
				<view class="row-two row-one">
					<view class="left mr-rt20">
						<image src="../../../static/my/ping.png"></image>
					</view>
					<view class="right fs-28 cl-333">
						订单编号：168678956220
					</view>
				</view>
				
				<view class="row-thr flex align-center mr-bt30">
					<view class="left ">
						<uni-star value="5"  font-size="16" disabled="true"></uni-star>
					</view>
					<view class="right">
						五星
					</view>
				</view>
				
				<view class="row-five">
					<text class="mr-rt30 mr-bt30" 
					
					v-for="(item,k) in elaList" 
					:key="k"
					@click="select(item,k)">{{item.title}}</text>
				</view>
				<view class="row-six fs-28 cl-333">
					这个师傅很专业，很认真，给我清洗的很干净
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniStar from "../../../components/rate/rate.vue"
	import loadMore from '@/components/load-more/load-more.vue'
	export default {
		components:{
			uniStar,
			loadMore
		},
		data() {
			return {
				elaList:[
					{title:"不错",default:true},
					{title:"不错1",default:false},
					{title:"不错2",default:false},
					{title:"不错3",default:false},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	
	.main{
		padding:20rpx 24rpx;
		display: flex;
		flex-direction: column;
		.row{
			width:100%;
			padding:0 20rpx 30rpx;
			box-sizing: border-box;
			background-color: white;
			margin-bottom: 30rpx;
			border-radius: 20rpx;
			.row-one{
				height: 80rpx;
				display: flex;
				align-items: center;
				image{
					width:36rpx;
					height:36rpx;
					
					border-radius:50%;
				}
			}
			.row-two{
				image{
					width:80rpx;
					height:80rpx;
					border-radius:40rpx;
				}
			}
			.row-thr{
				.right{
					color:#FAA003;
					font-size: 24rpx;
					margin-left:20rpx;
					margin-top:5rpx;
				}
			}
			
		}
	}
	
.row-five{
		display: flex;
		flex-wrap: wrap;
		
	}
	.row-five text{
		height: 40rpx;
		border-radius: 20rpx;
		padding:0 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #999;
	}
	
</style>
