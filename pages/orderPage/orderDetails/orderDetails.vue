<template>
	<view>
		<view class="main">
			<view class="main-one same flex-direction flex">
				<view class="one mr-bt20 fs-30">
					<text class="fw-bold">111</text>
					<text class="cl-blue">111</text>
				</view>
				<view class="one cl-333 fs-30">
					<text class="fw-bold">111</text>
					<text class="">111</text>
				</view>
			</view>

			<view class="main-two mr-top20 mr-bt20 fs-30">

				<text class="left cl-333">洗车券</text>
				<text class="right">1张小型汽车劵 减18元</text>
			</view>

			<view class="main-thr same">
				<view class="title">车辆信息</view>
				<view class="msg">
					<view class="flex align-center mr-bt20">
						<text class="left">车牌号：</text>
						<text class="right">111111</text>
					</view>
					<view class="flex align-center mr-bt20">
						<text class="left">车型：</text>
						<text class="right">111111</text>
					</view>
					<view class="flex align-center mr-bt20">
						<text class="left">车辆颜色：</text>
						<text class="right">111111</text>
					</view>
					<view class="flex align-center mr-bt20">
						<text class="left">车辆品牌：</text>
						<text class="right">111111</text>
					</view>
					<view class="flex align-start car-img">
						<text class="left">车辆照片：</text>
						<view class="right">
							<image src="../../../static/houb.png"></image>
						</view>
					</view>
				</view>
			</view>

			<view class="main-thr same">
				<view class="title">地址信息</view>
				<view class="msg">
					<view class="flex align-center mr-bt20">
						<text class="left">洗车地址：</text>
						<text class="right">111111</text>
					</view>
					<view class="flex align-center mr-bt20">
						<text class="left">停车位：</text>
						<text class="right">111111</text>
					</view>

				</view>
			</view>
			<view class="main-thr same">
				<view class="title">联系信息</view>
				<view class="msg">
					<view class="flex align-center mr-bt20">
						<text class="left">联系人：</text>
						<text class="right">111111</text>
					</view>
					<view class="flex align-center mr-bt20">
						<text class="left">联系电话：</text>
						<text class="right">111111</text>
					</view>

				</view>
			</view>
			
			<view class="main-thr same">
				<view class="title">备注信息</view>
				<view class="msg">
					<textarea placeholder="请输入备注信息"></textarea>
			
				</view>
			</view>
			
			<view class="main-thr same">
				<view class="title">订单信息</view>
				<view class="msg">
					<view class="flex align-center mr-bt20">
						<text class="left">订单编号：</text>
						<text class="right">111111</text>
					</view>
					<view class="flex align-center mr-bt20">
						<text class="left">实付款：</text>
						<text class="right">111111</text>
					</view>
			         <view class="flex align-center mr-bt20">
			         	<text class="left">付款时间：</text>
			         	<text class="right">111111</text>
			         </view>
				</view>
			</view>
			
			<view class="main-thr same" v-if="type!=0">
				<view class="title">洗车人员信息</view>
				<view class="info">
					<view class="img">
						<image src="../../../static/bais.png"></image>
					</view>
					<view class="people-info fs-28 cl-333">
						<view class="name">
							<text>姓名</text>
							<text class="cl-blue">联系他/她</text>
						</view>
						<view class="star">
							<view>
								<uni-star value="2" disabled="true" font-size="16"></uni-star>
							</view>
							<text class="mr-lt20">五星</text>
						</view>
						<view class="serve">
							11111
						</view>
					</view>
				</view>
			</view>
			<view class="main-thr same" v-if="type ==2">
				<view class="title">洗车信息</view>
				<view class="photos mr-bt30">
					<view class="photos-title mr-bt20 fs-30 cl-333">
						洗车前照片(前后左右）
					</view>
					<view class="img flex" >
						<image style="width:160rpx;height: 160rpx;" class="mr-rt20" src="../../../static/bais.png" v-for="(i,k) in 4" :key="k"></image>
					</view>
				</view>
				<view class="photos mr-bt30">
					<view class="photos-title mr-bt20 fs-30 cl-333">
					洗车后照片(前后左右）
					</view>
					<view class="img flex" >
						<image style="width:160rpx;height: 160rpx;" class="mr-rt20" src="../../../static/bais.png" v-for="(i,k) in 4" :key="k"></image>
					</view>
				</view>
				<view class="time">完成时间：  1111</view>
			</view>
			
			<view class="main-thr same" v-if="type==3">
				<view class="title">取消信息</view>
				<view class="msg">
					<view class="flex align-center mr-bt20">
						<text class="left">取消原因：</text>
						<text class="right">111111</text>
					</view>
					<view class="flex align-center mr-bt20">
						<text class="left">取消时间：</text>
						<text class="right">111111</text>
					</view>
					
					<view class="flex align-start car-img">
						<text class="left">取消照片：</text>
						<view class="right">
							<image src="../../../static/houb.png"></image>
						</view>
					</view>
				</view>
			</view>
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
                 type:0,
			}
		},
		methods: {

		},
		onLoad(e) {
			this.type = e.type;
		}
	}
</script>

<style lang="scss">
  .same{
	  margin:20rpx 0rpx;
	  background-color: white;
	  padding:35rpx 25rpx;
	  .title{
		  font-size: 30rpx;
		  font-weight: 800;
		  color:#333;
	  }
  }
  .one{
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
  }
  .main{
	  background-color: #eee;
	  min-height: 100vh;
	  
	  .main-two{
		  height: 100rpx;
		  display: flex;
		  align-items: center;
		  justify-content: space-between;
		  background-color: white;
		  padding:0 26rpx;
		  .right{
			  color:#FF0031;
		  }
	  }
	  .main-thr{
		  .title{
			  margin-bottom: 30rpx;
		  }
		  .left{
			  width:190rpx;
			  color:#333;
			  font-size: 30rpx;
		  }
		  .right{
			  display: flex;
			  flex-wrap: wrap;
			  image{
				   width:200rpx;
				   height:200rpx;
				   margin-right: 20rpx;
			  }
		  }
		  
		  .info{
			  display: flex;
			  .img{
				  width:140rpx;
				  height:140rpx;
				  border-radius:70rpx;
				  margin-right: 20rpx;
				  image{
					  width:100%;
					  height: 100%;
				  }
			  }
			  .people-info{
				  display: flex;
				  flex-direction: column;
				  flex:1;
				  .name{
					  display: flex;
					  align-items: center;
					  justify-content: space-between;
					  
				  }
				  .star{
					  margin:20rpx 0;
					  display: flex;
					  text{
						  color: #F99F03;
					  }
				  }
			  }
			  
			  .photos{
				  display: flex;
				  flex-direction: column;
				 
					 
					  image{
						 width:160rpx;
						 height: 160rpx;
					  }
				
			  }
		  }
		  textarea{
			  height: 200rpx;
			  width:100%;
			  background-color: #eee;
			  padding:20rpx;
			  box-sizing: border-box;
		  }
	  }
  }
</style>
