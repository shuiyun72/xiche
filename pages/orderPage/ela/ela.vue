<template>
	<view>
		<view class="main flex flex-direction align-center">
			<view class="main-one cl-333 fs-56">
				订单已完成
			</view>
			<view class="main-two cl-666 fs-32">
				请评价一下洗车工吧
			</view>
			<view class="main-thr">
				
			</view>
			<view class="main-four flex flex-direction align-center">
				<view class="left cl-666 fs-28 mr-bt30">评价洗车工</view>
				<view class="right">
					<uni-star value="5"  font-size="20"></uni-star>
				</view>
			</view>
			
			<view class="main-five">
				<text class="mr-rt30 mr-bt30" 
				:class="item.default?'active':''" 
				v-for="(item,k) in elaList" 
				:key="k"
				@click="select(item,k)">{{item.title}}</text>
			</view>
			<view class="main-six">
				<textarea placeholder="请输入评价内容"></textarea>
			</view>
			<button 
			class="cl-fff fs-32 flex align-center justify-center confirm"
			@click="confirm">提交</button>
		</view>
	</view>
</template>

<script>
	
	import uniStar from "../../../components/rate/rate.vue"
	export default {
		components:{
			uniStar
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
			select(item,index){
				this.elaList[index].default=!item.default;
			},
			confirm(){
				uni.reLaunch({
					url:"/pages/orderPage/elaSucc/elaSucc"
				})
			}
		}
	}
</script>

<style>
    .main{
		padding:80rpx 30rpx 0;
		min-height: 100vh;
		box-sizing: border-box;
		background-color: white;
	}
	.main-two{
		margin:26rpx 0 50rpx;
	}
	.main-thr{
		width:441rpx;
		height:0px;
		
		border:1px dashed rgba(153,153,153,1);
	}
	.main-four{
		margin: 56rpx 0;
	}
	.main-five{
		display: flex;
		flex-wrap: wrap;
		
	}
	.main-five text{
		height: 40rpx;
		border-radius: 20rpx;
		padding:0 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #999;
	}
	.main-five .active{
		color:#208EFF;
		border:1px solid #208EFF;
	}
	
	.main-six{
		margin:50rpx 0 80rpx;
		width:690rpx;
		height:220rpx;
		background:rgba(255,255,255,1);
		border:1px solid #999;
		border-radius:10px;
	}
	.main-six textarea{
		width:100%;
		height: 100%;
		padding:20rpx;
		box-sizing: border-box;
	}
	.confirm{
		width:640rpx;
		height:88rpx;
		background:rgba(32,142,255,1);
		border-radius:16px;
	}
</style>
