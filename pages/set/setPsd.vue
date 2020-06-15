<template>
	<view class="login">
		<view class="icon_input_sy">
			<view class="iconfont iconjiesuo"></view>
			<input class="input" type="text"  v-model="oldPsd" placeholder="请输入旧密码"/>
		</view>
		<view class="icon_input_sy">
			<view class="iconfont iconjiesuo"></view>
			<input class="input" type="password"  v-model="newPsd" placeholder="请输入新密码"/>
		</view>
		<view class="icon_input_sy">
			<view class="iconfont iconjiesuo"></view>
			<input class="input" type="password"  v-model="tNewPsd" placeholder="请重新输入新密码"/>
		</view>
		<view class="set_phone">
			<button class="btn round orange ms" @click="next">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPsd:"",
				newPsd:"",
				tNewPsd:""
			}
		},
		methods:{
			next(){
				this.$getApi("/api/operator/editPwd",{
					password:this.oldPsd,
					newpassword:this.newPsd,
					repassword:this.tNewPsd
				},res=>{
					this.$msg(res.msg)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.set_phone{
	margin-top: 200upx;
}
.login {
	padding: 180upx 60rpx 0 60rpx;
	.iconshouye_shugang_shijiantixing{
		font-size: 38upx;
		color: #999;
	}
	.yzm{
		font-size: 25upx;
		// color: $uni-or;
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
