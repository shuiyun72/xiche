<template>
	<view class="over-bg-white padding-lr">
		<view class="border-cs need-top-border"></view>
		<view class="login-box border padding flex align-center"><image class="login-logo" src="../../static/logo.png" mode=""></image></view>
		<view class="form-cs">
			<form>
				<view class="cu-form-group margin-top">
					<image style="width: 46rpx;height: 46rpx;" src="../../static/shoujh.png" mode=""></image>
					<input class="margin-left" placeholder="请输入手机号" name="input" />
				</view>
				<view class="cu-form-group flex justify-between">
					<view class="flex">
						<image style="width: 46rpx;height: 46rpx;display: inline-block;" src="../../static/yanzm.png" mode=""></image>
						<input class="margin-left" style="width: 200rpx;" placeholder="请输入验证码" name="input" />
					</view>
					<view v-if="time == 60" @click="receiveCode" class="codein text-blue">发送验证码</view>
					<view v-else class="codein">{{time}}s后重新发送</view>
				</view>
				<view class="cu-form-group"></view>
			</form>
		</view>
		<view @tap="next()" class="padding"><button class="cu-btn block bg-blue margin-tb-sm lg" type="">确定</button></view>
		<view class="padding other-login"><view class="wechat-login-box">选择第三方登录</view></view>
		<view class="wechat-logo flex align-center justify-center margin-top">
			<image style="width: 55rpx;height: 45rpx;" src="../../static/wxdl.png" mode=""></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			time: 60,
			timer: null,
		};
	},
	methods: {
		receiveCode() {
			// 点击接收验证码
			this.timer = setInterval(()=>{
				if (this.time > 0) {
				    this.time --;
				} else {
					this.time = 60;
					clearInterval(this.timer);
				}
			},1000)
		},
		next () {
			// app 登录页面 点击跳转首页 前期先做成跳转微信登陆之后手机号授权
			uni.navigateTo({
				url:'phoneAuthorization'
			})
		}
	},
	beforeDestroy() {
		clearInterval(this.timer);
	}
};
</script>

<style lang="scss" scoped>
.login-box {
	.login-logo {
		width: 220rpx;
		height: 220rpx;
		margin: 27rpx auto 0;
	}
}
.form-cs {
	width: 570rpx;
	margin: 0 auto;
	.codein {
		border-left: 2rpx #999999 solid;
		padding-left: 30rpx;
	}
}
.other-login {
	width: 600rpx;
	margin: 20rpx auto 0;
	position: relative;
	border-top: 1px #ECECEC solid;
	.wechat-login-box{
		position: absolute;
		width: 240rpx;
		top: -23rpx;
		font-size:28rpx;
		font-weight:bold;
		color:rgba(102,102,102,1);
		text-align: center;
		background:rgba(255,255,255,1);
		left: 180rpx;
	}
}
.wechat-logo{
	
}
</style>
