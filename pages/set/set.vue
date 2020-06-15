<template>
	<view>
		<uni-list>
			<uni-list-item title="修改手机号" @click="navigatorUrl('./setPhone')"></uni-list-item>
			<uni-list-item title="修改密码" @click="navigatorUrl('./setPsd')"></uni-list-item>
			<uni-list-item title="联系客服" @click="tellServe"></uni-list-item>
			<uni-list-item title="用户协议"></uni-list-item>
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
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			};
		},
		computed:{
			...mapState(['hasLogin', 'userInfo','homeInfo']),
		},
		methods: {
			navigatorUrl(url) {
				uni.navigateTo({
					url: url
				})
			},
			tellServe() {
				let this_ = this;
				uni.showModal({
					title: "联系客服",
					content: "客服电话: "+this_.homeInfo.tel,
					confirmText: "确定",
					confirmColor: "#f00",
					cancelText: "取消",
					success: function(res) {
						if (res.confirm) {
							uni.makePhoneCall({
								phoneNumber: this_.homeInfo.tel
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
