<template>
	<view class="login">
		<view class="icon_input_sy">
			<view class="iconfont icon19"></view>
			<input class="input" type="text"  v-model="phone" placeholder="请输入新的手机号"/>
			<text class="iconfont iconshouye_shugang_shijiantixing"></text>
			<text class="yzm" @click="sendmsg">发送验证码</text>
		</view>
		<view class="icon_input_sy">
			<view class="iconfont iconyanzhengma2"></view>
			<input class="input" type="text"  v-model="yzm" placeholder="请输入验证码"/>
		</view>
		<view class="set_phone">
			<button class="btn  blue ms" @click="next">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:"",
				yzm:""
			};
		},
		methods:{
			sendmsg(){
				let dataL = {
					phone:this.phone,
					from:"forget"
				}
				this.$getApi("/api/auth/sendmsg",dataL)
			},
			next(){
				let dataLl = {
					phone:this.phone,
					code:this.yzm
				}
				this.$getApi("/api/user/my/editInfo",dataLl,res=>{
					uni.switchTab({
						url:"../mine/mine"
					})
				})
			}
		}
	}
</script>

<style lang="scss">
.set_phone{
	margin-top: 300upx;
}
.login {
	padding: 180upx 60rpx 0 60rpx;
	.iconshouye_shugang_shijiantixing{
		font-size: 38upx;
		color: #999;
	}
	.yzm{
		font-size: 25upx;
		// color: $uni-or;
	}
}
.login_wjmm{
	font-size: 20upx;
	color: #999;
	padding: 20upx 0 90upx;
	&.b{
		color: #333;
	}
}
</style>
