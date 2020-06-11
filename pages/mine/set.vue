<template>
	<view>
		<uni-list>
			<uni-list-item title="账号和安全"  @click="navigatorUrl('./editPhone')"></uni-list-item>
			<uni-list-item title="意见反馈" @click="navigatorUrl('./ideaFor')"></uni-list-item>
			<uni-list-item title="联系客服" @click="tellServe"></uni-list-item>
			<uni-list-item title="清楚缓存"></uni-list-item>
			<uni-list-item title="版本更新" :showArrow="false">
				<template v-slot:right="">
					V1.01
				</template>
			</uni-list-item>
			<uni-list-item title="账号注销"></uni-list-item>
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
		methods: {
			navigatorUrl(url) {
				uni.navigateTo({
					url: url
				})
			},
			tellServe() {
				uni.showModal({
					title: "联系客服",
					content: "客服电话: 0374-2935009",
					confirmText: "确定",
					confirmColor: "#208EFF",
					cancelText: "取消",
					success: function(res) {
						if (res.confirm) {
							uni.makePhoneCall({
								phoneNumber: '0374-2935009'
							});
						}
					}
				})
			},
			loginOut(){
				console.log("退出登录")
				try {
				    uni.removeStorageSync('userInfo');
				} catch (e) {
				    // error
				}
				console.log("退出登录")
				uni.reLaunch({
					url: '../login/login'
				})
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
