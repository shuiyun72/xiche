<template>
	<view>
		<view class="main">
			<view class="main-thr width100">
				<view class="row " @click="skip('/pages/set/changePsw/changePsw')">
					<view class="mr-lt30 cl-333">

						账号与安全
					</view>
					<view class="right">
						<image src="../../static/my/jinr.png"></image>
					</view>
				</view>
				<view class="row" @click="skip('/pages/myInfoPage/advice/advice','2')">
					<view class="mr-lt30 cl-333">

						意见反馈
					</view>
					<view class="right">
						<image src="../../static/my/jinr.png"></image>
					</view>
				</view>
				<view class="row" @click="tip(1)">
					<view class="mr-lt30 cl-333">

						联系客服
					</view>
					<view class="right">
						<image src="../../static/my/jinr.png"></image>
					</view>
				</view>
				<view class="row" @click="skip('/pages/set/agree/agree','2')">
					<view class="mr-lt30 cl-333">

						用户协议
					</view>
					<view class="right">
						<image src="../../static/my/jinr.png"></image>
					</view>
				</view>
				<view class="row" @click="update">
					<view class="mr-lt30 cl-333">

						版本更新
					</view>
					<view class="right">
						100
					</view>
				</view>
				<view class="row" @click="tip(2)">
					<view class="left flex align-center">

						<text class="mr-lt30 cl-333">账号注销</text>
					</view>
					<view class="right">
						<image src="../../static/my/jinr.png"></image>
					</view>
				</view>


			</view>


			<button class="retire fs-32 cl-333 flex align-center justify-center">退出登录</button>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
             tip(index){
				 if(index==1){
					 //客服
					uni.showModal({
						title:"提示",
						content:"客服电话：11111",
						success: () => {
							
						}
					})
				 }else{
					 //注销
					 uni.showModal({
					 	title:"提示",
					 	content:"确认注销账号吗？？",
					 	success: () => {
					 		
					 	}
					 })
				 }
			 },
			skip(url, type) {
				uni.navigateTo({
					url: url + "?type=" + type
				})
			}
		}
	}
</script>

<style lang="scss">
	.main{
		min-height: 100vh;
		
	}
	.main-thr {
		display: flex;
		flex-direction: column;
		margin-top: 1px;
        
		.row {
			padding: 0 20rpx;
			box-sizing: border-box;
			height: 88rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
            background-color: white;
			border-bottom: 1px solid #eee;
			.left {
				font-weight: 900;
			}

			.right {
				image {
					width: 44rpx;
					height: 44rpx;

				}
			}
		}
	}
	
	
	.retire{
		background-color: white;
		
		margin-top: 100rpx;
	}
</style>
