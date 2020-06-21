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
				openid:"",
				nickname:""
			};
		},
		onLoad(ph) {
			console.log(ph)
			this.openid = ph.openid;
			this.nickname = ph.nickname;
		},
		methods:{
			//获取验证码
			getYZM(){
				let data = {
					phone:this.phone,
					from: "login"
				}
				this.$getApi('auth/sendmsg',data,res=>{
					console.log(res)
				},"false")
			},
			loginIn(){
				if(this.phone && this.yzm){
					let data = {
						phone:this.phone,
						code:this.yzm,
						openid:this.openid,
						nickname:this.nickname
					}
					this.$getApi('/api/auth/bindPhone',data,res=>{
						console.log(res)
						this.$store.commit('login',res.data);
						this.getInit();				
						setTimeout(()=>{
							this.getInit(()=>{
								uni.switchTab({
									url:'../home/home'
								})			
							});	
						},500)
					},"false")
				}else{
					
				}
			},
			getInit(call){
				this.$getApi("/api/user/car/xing",{},res=>{
					uni.setStorageSync('carXing',res.data);
				})
				this.$getApi("/api/user/car/color",{},res=>{
					uni.setStorageSync('carColor',res.data);
				})
				this.$getApi("/api/user/car/brand",{},res=>{
					uni.setStorageSync('carBrand',res.data);
				})
				call instanceof Function && call()
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
