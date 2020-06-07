<template>
	<view>
		<view class="main flex flex-direction">
			<view class="main-one">
                 问题和意见
			</view>
			<view class="main-two">
                 <textarea placeholder="请简要描述你的问题和意见"></textarea>
			</view>
			<view class="main-one">
                 联系方式
			</view>
			<view class="main-thr">
                  <input placeholder="请留下您的联系方式" maxlength="11"></input>
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

		}
	}
</script>

<style lang="scss">
.main-one{
	display: flex;
	align-items: center;
	padding-left:20rpx;
	color: #333;
	font-size: 28rpx;
	font-weight: 900;
	height: 88rpx;
	
}
.main-two{
	height: 180rpx;
	width:100vw;
	background-color: white;
	textarea{
		height: 100%;
		width:100%;
		padding:20rpx;
		box-sizing: border-box;
	}
}

.main-thr{
	height: 88rpx;
	padding-left:20rpx;
	display: flex;
	align-items: center;
	background-color: white;
} 

.retire{
		width:640rpx;
		height:88rpx;
		background:rgba(32,142,255,1);
		border-radius:16rpx;
		color: white;
		margin-top: 100rpx;
	}
</style>
