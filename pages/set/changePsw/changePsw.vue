<template>
	<view id="password">
		<view class="phone">
			<image class="imgs" src="../../../static/shoujh.png"></image>
			<input type="text" placeholder="请输入手机号" v-model="phone" maxlength="11">
			<view class="getCode" >{{time?seconds+"s后重发":"发送验证码"}}</view>
		</view>
		
		<view class="code width100">
			<image class="imgs" src="../../../static/yanzm.png"></image>
			<input type="text" placeholder="请输入验证码" v-model="code"/>

		</view>
		<button class="confirm" @click="confirm">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                time: false, //验证码
                seconds: 60, //倒计时时间
                timer:null,
				phone:"",
				password:"",
				code:"",
			}
		},
		methods: {
			
		},
		onShow() {
			
		}
	}
</script>

<style lang="scss">
	#password {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100vw;
		padding: 170upx 30upx 0;
		box-sizing: border-box;
		min-height: 100vh;
		background-color: white;
        .phone,
		.password,
		.code {
			position: relative;
            width:570rpx;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #EEEEEE

		}

		.imgs {
			position: absolute;
			left: 0;
			width: 35upx!important;
			height: 44upx!important;
			background-size: 28upx 44upx;

		}

		input {
			padding: 0upx 0 0upx 70upx;
			font-size: 30upx;
			color: #777777;
			flex: 1;
		}

		.phone {
			.getCode {
				padding-left: 30upx;
				border-left: 1px solid #D7D7D7;
				color: #999999;
				font-size: 24upx;
			}
		}

		.confirm{
			width:640rpx;
			height:88rpx;
			background:rgba(32,142,255,1);
			border-radius:16rpx;
			text-align: center;
			line-height: 88upx;
			color: white;
			background: rgba(47, 116, 241, 1);
			margin-top:194upx;
		}

	


	}
</style>
