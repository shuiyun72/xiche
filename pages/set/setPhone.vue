<template>
	<view class="login">
		<view class="icon_input_sy">
			<view class="iconfont icon19"></view>
			<input class="input" type="text"  v-model="phone" placeholder="请输入新的手机号"/>
			<text class="iconfont iconshouye_shugang_shijiantixing"></text>
			<text class="yzm" @click="getCode">发送验证码</text>
		</view>
		<view class="icon_input_sy">
			<view class="iconfont iconyanzhengma2"></view>
			<input class="input" type="text"  v-model="yzm" placeholder="请输入验证码"/>
		</view>
		<view class="set_phone">
			<button class="btn round orange ms" @click="next">确定</button>
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
			getCode(){
				this.$getApi("/api/auth/sendmsg",{
					phone:this.phone,
					from:"login"
				},res=>{
					console.log(res)
				})
			},
			next(){
				this.$getApi("user/my/editInfo",{
					phone:this.phone,
					code:this.yzm
				},res=>{
					console.log()
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
