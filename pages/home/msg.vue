<template>
	<view class="msg">
		<view class="msg_item" v-for="i in 3">
			<view class="time">
				2019年5月17日
			</view>
			<view class="m_box">
				<view class="t_t">
					系统消息
				</view>
				<view class="text">
					系统消息系统消息系统消息系统消息系统消息系统消息系统消息系统消息系统消息系统消息系统消息系统消息系统消息系统消息系统消息系统消息系统消
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
page{
	background-color: #f0f0f0;
}
.msg{
	min-height: 100vh;
	background-color: #f0f0f0;
	.msg_item{
		padding: 0 26upx;
		.time{
			text-align: center;
			font-size: 28upx;
			padding: 22upx 0; 
			color: #999;
		}
		.m_box{
			background-color: #fff;
			padding: 20upx 32upx;
			border-radius: 12upx;
			.t_t{
				font-weight: bold;
				text-align: center;
				margin-bottom: 20upx;
				color: #666;
			}
			.text{
				color: #999;
			}
		}
	}
}
</style>
