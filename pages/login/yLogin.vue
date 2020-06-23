<template>
	<view class="login">
		<view class="mine_l">
			<image src="../../static/img/mine/logo.png" class="mine_logo" mode="widthFix"></image>
		</view>

		<view class="icon_input_sy">
			<view class="iconfont icon19"></view>
			<input class="input" type="text" v-model="phone" placeholder="请输入手机号" />
		</view>
		<view class="icon_input_sy">
			<view class="iconfont iconyanzhengma2"></view>
			<input class="input" type="text" v-model="yzm" placeholder="请输入验证码" />
			<text class="iconfont iconshouye_shugang_shijiantixing"></text>
			<text class="yzm" @click="getYZM" v-if="timeout<0">发送验证码</text>
			<text class="yzm" v-if="timeout>=0">{{timeout}}s 重新获取</text>
		</view>
		<view class="sub_top">
			<button class="btn blue ms" @click="loginIn">确定</button>
		</view>
		<view class="mine_l_t" @click="oauthC">
			<view class="t">
				选择第三方登录
			</view>
			<image src="../../static/img/weixin.png" mode="widthFix" class="wx"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: "",
				yzm: "",
				psd: "",
				timeout:-1
			};
		},
		onShow() {
			
		},
		onLoad(ph) {
			console.log(ph)
		},
		
		beforeRouteEnter(from,to,next) {
			
				console.log(from,to)
			
		},
		methods: {
			oauthC(){
				let this_ = this;
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
				    console.log(loginRes.authResult);
					this_.$getApi("/api/auth/weixinLogin",{
						access_token:loginRes.authResult.access_token,
						openid:loginRes.authResult.openid
					},res=>{
						console.log(res.data)
						if(res.data.is_bind == 0){
							uni.getUserInfo({
							  provider: 'weixin',
							  success: function (infoRes) {
								  console.log(infoRes)
							    console.log('用户昵称为：' + infoRes.userInfo.nickName);
								uni.navigateTo({
									url:'./login?openid='+loginRes.authResult.openid+'&accessToken='+loginRes.authResult.access_token+"&dsf=1"
								})
							  }
							});
						}else{
							this_.$store.commit('login',res.data);
							setTimeout(()=>{
								this_.getInit(()=>{
									uni.switchTab({
										url:'../home/home'
									})			
								});	
							},200)
						}
					})
				    
				  }
				});
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
				if(this.phone && this.yzm){
					let data = {
						phone:this.phone,
						code:this.yzm
					}
					this.$getApi('/api/auth/phone/login',data,res=>{
						this.$store.commit('login',res.data);
						setTimeout(()=>{
							this.getInit(()=>{
								uni.switchTab({
									url:'../home/home'
								})			
							});	
						},1000)
					},"false")
				}else{
					
				}
			},
			async getInit(call){
				await this.$getApi("/api/user/car/xing",{},res=>{
					this.$store.commit("setCarXing",res.data)
				})
				await this.$getApi("/api/user/car/color",{},res=>{		
					this.$store.commit("setCarColor",res.data)
				})
				await this.$getApi("/api/user/car/brand",{},res=>{
					this.$store.commit("setCarBrand",res.data)
				})
				await this.$getApi("/api/user/car/service",{},res=>{
					this.$store.commit("setService",res.data)
				})
				call instanceof Function && call()
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}
	.mine_l_t{
		text-align: center;
		.t{
			padding: 100upx 0 50upx;
		}
		.wx{
			width: 80upx;
		}
	}
	.mine_l {
		text-align: center;
		margin-bottom: 50upx;
		.mine_logo {
			width: 230upx;
		}
	}

	.sub_top {
		margin-top: 160upx;
	}

	.login {
		padding: 40upx 60rpx 0 60rpx;

		.iconshouye_shugang_shijiantixing {
			font-size: 38upx;
			color: #999;
		}

		.yzm {
			font-size: 25upx;
			color: $uni-bl;
		}
	}

	.login_wjmm {
		font-size: 20upx;
		color: #999;
		padding: 20upx 0 90upx;

		&.b {
			color: #333;
		}
	}
</style>
