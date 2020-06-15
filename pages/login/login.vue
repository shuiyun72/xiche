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
			loginIn() {
				console.log(this.phone, this.psd)
				if (this.phone && this.psd) {
					let data = {
						phone: this.phone,
						password: this.psd
					}
					this.$getApi('/api/auth/login', data, res => {
						this.$store.commit('login', res.data);
						setTimeout(() => {
							uni.switchTab({
								url: '../home/home'
							})
						}, 1000)
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
		box-sizing: border-box;
		min-height: 100vh;
		background-color: #fff;
	}

	.login_wjmm {
		font-size: 20upx;
		color: #999;
		padding: 20upx 0 90upx;
	}
</style>
