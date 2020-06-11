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
			<text class="yzm" @click="getYZM">发送验证码</text>
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
				psd: ""
			};
		},
		methods: {
			oauthC(){
				uni.getProvider({
				    service: 'oauth',
				    success: function (res) {
						console.log(res)
				        console.log(res.provider)
				        if (~res.provider.indexOf('qq')) {
				            uni.login({
				                provider: 'qq',
				                success: function (loginRes) {
				                    console.log(JSON.stringify(loginRes));
				                }
				            });
				        }
				    }
				});
			},
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
						code:this.yzm
					}
					this.$getApi('auth/phone/login',data,res=>{
						uni.setStorageSync('userInfo', res.data);
						console.log(res)
						uni.switchTab({
							url:'../home/home'
						})
						
					},"false")
				}else{
					
				}
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
