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
			<text class="yzm" @click="getYZM" v-if="timeout<0">发送验证码</text>
			<text class="yzm" v-if="timeout>=0">{{timeout}}s 重新获取</text>
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
				nickname:"",
				dsf:"",
				accessToken:"",
				timeout:-1,
				toWhere:""
			};
		},
		onLoad(ph) {
			console.log(ph)
			if(ph.openid){
				this.openid = ph.openid;
			}
			if(ph.nickname){
				this.nickname = ph.nickname;
			}
			if(ph.dsf){
				this.dsf = ph.dsf
			}
			if(ph.accessToken){
				this.accessToken =  ph.accessToken
			}
			if(ph.xcx){
				this.toWhere = ph.xcx
			}
		},
		methods:{
			//获取验证码
			getYZM(){
				let data = {
					phone:this.phone,
					from: "login"
				}
				this.$getApi('/api/auth/sendmsg',data,res=>{
					console.log(res)
				},"false")
			},
			//获取验证码
			getYZM(){
				let data = {
					phone:this.phone,
					from: "login"
				}
				this.timeout = 60;
				let interL = setInterval(()=>{
					this.timeout--
					if(this.timeout<0){
						clearInterval(interL)
					}
				},1000)
				this.$getApi('/api/auth/sendmsg',data,res=>{
					console.log(res)
					this.$msg('请在短信中查看验证码')
				},"false")
				
			},
			loginIn(){
				let this_  = this;
				if(this_.phone && this_.yzm){
					if(this_.dsf){
						let dataLLD = {
							phone:this_.phone,
							code:this_.yzm,
							openid:this_.openid,
							access_token:this_.accessToken
						}
						this_.$getApi('/api/auth/weixinLogin',dataLLD,res=>{
							console.log(res)
							this_.$store.commit('login',res.data);
							this_.getInit();				
							setTimeout(()=>{
								this_.getInit(()=>{
									uni.switchTab({
										url:'../home/home'
									})			
								});	
							},500)
						},"false")
					}else{
						let dataLL = {
							phone:this_.phone,
							code:this_.yzm,
							openid:this_.openid,
							nickname:this_.nickname
						}
						// console.log(data)
						this_.$getApi('/api/auth/bindPhone',dataLL,res=>{
							console.log(res)
							this_.$store.commit('login',res.data);			
							setTimeout(()=>{
								this_.getInit(()=>{
									if(this_.toWhere == 'ws'){
										uni.navigateTo({
											url:'../mine/addCar?ws=1'
										})
									}else{
										uni.switchTab({
											url:'../combo/combo'
										})
									}
								});	
							},500)
						},"false")
					}
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
