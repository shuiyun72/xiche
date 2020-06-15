<template>
	<view class="money_box">
		<view class="m_top">
			<view class="t_img">
				<image src="../../static/img/mine/qianb.png" mode="widthFix" class="img"></image>
			</view>
			<view class="m_top_body">
				<view class="ti1">
					账户余额 (元)
				</view>
				<view class="money">
					<view class="num">
						{{money}}
					</view>
					<view class="btn_b">
						<navigator url="./withdrawMoney">
							<button class="btn">提现</button>
						</navigator>
					</view>
				</view>
			</view>
		</view>
		<view class="bg10_f"></view>
		<view class="title_l_icon">
			<view class="v1"></view> 余额明细
		</view>
		<view class="order_money" v-for="item in msg">
			<view class="o_m_l">
				<view class="t">
					{{item.note}}
				</view>
				<view class="date">
					{{item.created_at}}
				</view>
			</view>
			<view class="o_m_r">
				{{item.type == 1 ?'+':'-'}}{{item.amount}}元
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg:[]
			};
		},
		computed:{
			money(){
				return this.$store.state.userInfo.money;
			}
		},
		mounted() {
			this.$getApi("/api/user/money",{},res1=>{
				console.log(res1)
				this.msg = res1.data.data
			})
		}
	}
</script>

<style lang="scss" scoped>
	.order_money{
		padding: 20upx 26upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1upx solid #eee;
		.t{
			font-weight: bold;
			margin-bottom: 10upx;
		}
		.date{
			font-size: 28upx;
			color: #999;
		}
	}
.bg10_f{
	background-color: #f0f0f0;
	height: 20upx;
}
.title_l_icon{
	padding: 20upx 26upx;
	display: flex;
	align-items: center;
	color: $uni-bl ;
	.v1{
		height: 36upx;
		width: 6upx;
		background-color: $uni-bl;
		margin-right: 20upx;
	}
}
.m_top{
	padding: 16upx;
	position: relative;
	.img{
		width: 100%;
	}
	.m_top_body{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		box-sizing: border-box;
		padding: 110upx 100upx 0;
		color: #fff;
		.ti1{
			margin-bottom: 50upx;
		}
		.money{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.num{
				font-size: 50upx;
			}
			.btn{
				background-color: transparent;
				border: 1upx solid #fff;
				color: #fff;
				padding: 10upx 40upx;
				border-radius: 40upx;
			}
		}
	}
}
</style>
