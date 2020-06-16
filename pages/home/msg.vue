<template>
	<view class="msg">
		<view class="msg_item" v-for="(item,index) in msgList">
			<view class="time">
				{{item.created_at}}
			</view>
			<view class="m_box">
				<view class="t_t">
					{{item.title}}
				</view>
				<view class="text">
					{{item.content}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgList:[]
			}
		},
		mounted() {
			this.getMsg();
			setTimeout(function(){
				uni.stopPullDownRefresh();//停止下拉刷新动画
			},100);
		},
		filters:{
			formatDate(value){//value需要过滤的数据
				var date = new Date(value);
				var year = date.getFullYear();
				var month = date.getMonth()+1;
				var day = date.getDate();
				var hours = date.getHours();
				var minutes = date.getMinutes();
				var seconds = date.getSeconds();
				return year+"年"+month+"月"+day+"日 "+hours+":"+minutes+":"+seconds;
			}
		},
		methods:{
			getMsg(){
				this.$getApi("/api/user/my/message",{
					page:1,
					paginate:100
				},res=>{
					this.msgList = res.data.data;
					console.log(this.msgList)
				})
			}
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
	padding-bottom: 60upx;
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
