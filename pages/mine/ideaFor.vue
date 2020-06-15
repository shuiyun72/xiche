<template>
	<view class="idea_for">
		<view class="tit">
			问题和意见
		</view>
		<textarea v-model="yijian" placeholder="请简单描述你的问题和意见"  class="textarea"/>
		<view class="tit">
			联系方式
		</view>
		<input type="text" v-model="phone" class="input" placeholder="请留下您的联系方式"/>
		<view class="sub_btn">
			<button class="btn blue" @click="next">提 交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yijian:"",
				phone:""
			};
		},
		methods:{
			next(){
				let dataL = {
					contact:this.phone,
					content:this.yijian
				}
				this.$getApi("/api/user/my/feedback",dataL,res=>{
					uni.reLaunch({
						url:'./ideaForMsg'
					})
				});
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sub_btn{
		padding:200upx 40upx 0;
		background-color: #f0f0f0;
		.btn{
			padding: 26upx 0;
		}
	}
.idea_for{
	background-color: #f0f0f0;
	height: 100vh;
	.textarea{
		background-color: #fff;
		width: 100%;
		font-size: 26upx;
		padding: 20upx 26upx;
		height: 160upx;
	}
	.tit{
		padding: 20upx 26upx;
	}
	.input{
		background-color: #fff;
		width: 100%;
		font-size: 26upx;
		padding: 20upx 26upx;
	}
}
</style>
