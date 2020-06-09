<template>
	<view>
		<view class="car_list">
			<view class="item" v-for="i in 3">
				<view class="part1">
					<image src="../../static/img/heis.png" mode="widthFix" class="l_img"></image>
					<view class="content">
						<view class="t1">
							<view class="l">豫A668899</view>
							<view class="r">小型汽车</view>
						</view>
						<view class="t1">
							<view class="r">蓝色</view>
							<view class="r">别克GL8</view>
						</view>
					</view>
					<image src="../../static/img/tup.png" mode="widthFix" class="r_img"></image>
				</view>
				<view class="part2">
					<view class="item2">
						<text class="iconfont icontianxiegongdan-kuozhan-hebing"></text>
						<text>编辑</text>
					</view>
					<view class="item2">
						<text class="iconfont iconqingkongshanchu"></text>
						<text>删除</text>
					</view>
				</view>
			</view>
		</view>
		<view class="add_car_btn">
			<text class="iconfont icontianjia"></text>
			<text>新建车辆</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.add_car_btn{
	position: fixed;
	left: 0;
	bottom: 0;
	background-color: $uni-bl;
	width: 750upx;
	text-align: center;
	color: #fff;
	padding: 26upx 0;
	font-size: 36upx;
	.icontianjia{
		margin-right: 20upx;
	}
}
.car_list{
	height: 100vh;
	background-color: #f0f0f0;
	border-top: 1upx solid #eee;
	.item{
		background-color:#fff;
		padding: 30upx 26upx 20upx;
		margin-bottom: 20upx;
		.part2{
			display: flex;		
			color: #999;
			padding: 24upx 0 16upx 360upx;
			margin-top: 10upx;
			border-top: 1upx solid #eee;
			.item2{
				margin-left: 40upx;
				.iconfont{
					margin-right: 20upx;
				}
			}
		}
		.part1{
			display: flex;
			.l_img{
				width: 90upx;
			}
			.content{
				width: 450upx;
				.t1{
					display:flex;
					font-weight: bold;
					color: #666;
					margin-bottom: 26upx;
					padding:0 10upx;
					.l{
						width: 200upx;
					}
					.r{
						width: 200upx;
					}
				}
			}
			.r_img{
				width: 160upx;
			}
		}
	}
}
</style>
