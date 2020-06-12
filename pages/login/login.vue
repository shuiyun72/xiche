<template>
	<view class="login">
		<view class="icon_input_sy">
			<view class="iconfont icon19"></view>
			<input class="input" type="text" v-model="phone" placeholder="请输入手机号" />
		</view>
		<view class="icon_input_sy">
			<view class="iconfont iconjiesuo"></view>
			<input class="input" type="password" v-model="psd" placeholder="请输入密码" />
		</view>
		<view class="t_right login_wjmm">
			<navigator url="./loginFind">
				<text class="link">忘记密码</text>
			</navigator>
		</view>
		<view>
			<button class="btn round orange ms" @click="loginIn">登录</button>
		</view>
		
		<button open-type="getUserInfo" @getuserinfo="getUserInfo">weixin</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: "",
				psd: ""
			};
		},
		methods: {
			getUserInfo({
				detail
			}) {
				console.log(detail)
				if (detail.userInfo) {
					uni.showToast({
						icon: 'none',
						title: '登陆成功'
					});
					// this.toMain(detail.userInfo.nickName);
				} else {
					uni.showToast({
						icon: 'none',
						title: '登陆失败'
					});
				}
			},
			loginIn() {
				console.log(this.phone,this.psd)
				if (this.phone && this.psd) {
					let data = {
						phone: this.phone,
						password: this.psd
					}
					this.$getApi('auth/login', data, res => {
						uni.setStorageSync('userInfo', res.data);
						uni.switchTab({
							url: '../home/home'
						})	
					}, "false")
				} else {
					this.$msg()
				}
			},
			///pages/home/home
			switchTab(el) {
				uni.switchTab({
					url: el
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.login {
		padding: 180upx 60rpx 0 60rpx;
	}

	.login_wjmm {
		font-size: 20upx;
		color: #999;
		padding: 20upx 0 90upx;
	}
</style>
