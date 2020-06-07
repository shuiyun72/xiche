<template>
	<view class="login">
		<view class="icon_input_sy">
			<view class="iconfont icon19"></view>
			<input class="input" type="text"  v-model="phone" placeholder="请输入手机号"/>
		</view>
		<view class="icon_input_sy">
			<view class="iconfont iconyanzhengma2"></view>
			<input class="input" type="text"  v-model="yzm" placeholder="请输入验证码"/>
			<text class="iconfont iconshouye_shugang_shijiantixing"></text>
			<text class="yzm" @click="getYZM">发送验证码</text>
		</view>
		<view class="sub_top">
			<button class="btn blue ms" @click="loginIn">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:"",
				yzm:"",
				psd:""
			};
		},
		methods:{
			//获取验证码
			getYZM(){
				let data = {
					phone:this.phone,
					from: "login,forget"
				}
				this.$gitApi('auth/sendmsg',data,res=>{
					console.log(res)
				},null,false)
			},
			//重置密码
			loginIn(){
				if(this.phone && this.psd && this.yzm){
					let data = {
						phone:this.phone,
						password:this.psd,
						code:this.yzm
					}
					this.$gitApi('auth/forget/password',data,res=>{
						console.log(res)
						if(res.code == 200){
							uni.navigateTo({
								url:'../home/home'
							})
						}
					},null,false)
				}else{
					this.$msg();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
page{
	background-color: #fff;
}
.sub_top{
	margin-top: 160upx;
}
.login {
	padding: 180upx 60rpx 0 60rpx;
	.iconshouye_shugang_shijiantixing{
		font-size: 38upx;
		color: #999;
	}
	.yzm{
		font-size: 25upx;
		color: $uni-bl;
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
