<template>
	<view>
		<uni-list>
			<uni-list-item title="账号和安全"  @click="navigatorUrl('./editPhone')"></uni-list-item>
			<uni-list-item title="意见反馈" @click="navigatorUrl('./ideaFor')"></uni-list-item>
			<uni-list-item title="联系客服" @click="tellServe"></uni-list-item>
			<uni-list-item title="清楚缓存" @click="clearSe"></uni-list-item>
			<uni-list-item title="版本更新" :showArrow="false">
				<template v-slot:right="">
					V1.01
				</template>
			</uni-list-item>
			<uni-list-item title="账号注销" @click="delUser"></uni-list-item>
		</uni-list>
		<view class="login_out" @click="loginOut">
			退出登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		computed:{
			serviceTel(){
				return this.$store.state.userInfo.service_tel;
			}
		},
		methods: {
			navigatorUrl(url) {
				uni.navigateTo({
					url: url
				})
			},
			delUser(){
				let this_ = this;
				uni.showModal({
					title: "账户注销",
					content: "需要账户注销吗?注销后将无法使用此账号登陆,确定?",
					confirmText: "确定",
					confirmColor: "#ff0000",
					cancelText: "取消",
					success: function(res) {
						if (res.confirm) {
							this_.$getApi("/api/user/writeOff",{},res=>{
								this_.$store.commit("logout")
								// #ifdef MP
								uni.switchTab({
									url:'../home/home'
								})
								// #endif
								// #ifndef MP
								uni.reLaunch({
									url:'../login/yLogin'
								})
								// #endif
								
							})
						}
					}
				})
			},
			tellServe() {
				let this_ = this;
				uni.showModal({
					title: "联系客服",
					content: "客服电话: " + this_.serviceTel,
					confirmText: "确定",
					confirmColor: "#208EFF",
					cancelText: "取消",
					success: function(res) {
						if (res.confirm) {
							uni.makePhoneCall({
								phoneNumber: this_.serviceTel
							});
						}
					}
				})
			},
			clearSe(){
				this.$store.commit('clearSe')
				this.$msg("缓存清除完成")
			},
			loginOut(){
				console.log("退出登录")
				try {
				    uni.removeStorageSync('userInfo');
					this.$store.commit('logout')
				} catch (e) {
				    // error
				}
				// #ifdef MP
				uni.switchTab({
					url:'../home/home'
				})
				// #endif
				// #ifndef MP
				uni.reLaunch({
					url: '../login/yLogin'
				})
				// #endif
				
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f0f0f0;
	}

	.login_out {
		font-size: 28upx;
		background-color: #fff;
		margin-top: 140upx;
		text-align: center;
		padding: 26upx 0;
	}
</style>
