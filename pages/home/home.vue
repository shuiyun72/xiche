<template>
	<view class="home">
		<image src="../../static/img/home/bg.png" class="home_bg"></image>
		<view class="home_body">
			<view class="get_s">
				<view class="address">
					<navigator url="./city">
						<text>中原区</text>
						<text class="iconfont iconai-arrow-down"></text>
					</navigator>
				</view>
				<view class="msg">
					<navigator url="./msg">
						<view class="iconfont iconxiaoxi1"></view>
						<view class="point"></view>
					</navigator>
				</view>
			</view>
			<view class="h_card">
				<view class="h_title">
					张大大-欢迎您
				</view>
				<view class="user_s">
					<text class="iconfont iconyonghuming"></text>
					<text>游客</text>
				</view>
				<view class="libao_list">
					<view class="libao">
						<view class="li_t">
							我的洗车卷
						</view>
						<view class="li_info">
							<view class="l_l">
								剩余12张
							</view>
							<image src="../../static/img/home/xicj.png" mode="widthFix" class="l_r"></image>

						</view>
					</view>
					<view class="libao">
						<view class="li_t">
							我的洗车卷
						</view>
						<view class="li_info">
							<view class="l_l">
								剩余12张
							</view>
							<image src="../../static/img/home/taoc.png" mode="widthFix" class="l_r"></image>
						</view>
					</view>
				</view>
				<navigator url="../orders/toOrder">
					<view class="p_car">
						<text class="iconfont icon-"></text>
						<text>预约洗车</text>
					</view>
				</navigator>
			</view>
		</view>
		<uni-popup type="center" ref="juan0">
			<view class="juan_body">
				<view class="iconfont iconguanbi" @click="closeJuan(0)"></view>
				<view class="ju_title">
					购买套餐
				</view>
				<view class="t">
					您还没有购买套餐,没有洗车券,
					现在去购买套餐
				</view>
				<view class="t_btn">
					<button class="round btn sm default" @click="closeJuan(0)">取消</button>
					<button class="round btn sm  blue" @click="switchTab('../combo/combo')">确定</button>
				</view>
			</view>
		</uni-popup>
		<uni-popup type="center" ref="juan1">
			<view class="juan1_body">
				<view class="ju_title">
					恭喜你获得
				</view>
				<view class="ju_title2">
					洗车优惠券
				</view>
				<view class="item_card" v-for="item in juan1List" :key="item.id">
					<image src="../../static/img/mine/zhekj.png" mode="widthFix" class="img"></image>
					<view class="item_ab">
						<view class="left">
							<view class="p1">
								<text class="t">{{item.num}}</text>
								<text>折</text>
							</view>
							<view class="p2">
								折扣券
							</view>
						</view>
						<view class="right">
							<view class="p3">
								预约洗车{{item.zhe}}折优惠
							</view>
							<view class="p4">
								有效期 {{item.date}}
							</view>
						</view>
					</view>
				</view>
				<view class="t_btn">
					<button class="round btn sm" @click="getQuanSucc">确定</button>
				</view>
			</view>
			<view class="iconfont iconguanbi popup_close_bottom_btn" @click="closeJuan(1)"></view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state: 0,
				juan1List: [{
						num: 1,
						zhe: 1,
						date: "2020.05.12-2020.08.12",
						id: 990
					},
					{
						num: 5,
						zhe: 5,
						date: "2020.05.12-2020.08.12",
						id: 991
					},
					{
						num: 8,
						zhe: 8,
						date: "2020.05.12-2020.08.12",
						id: 992
					}
				]
			};
		},
		mounted() {
			if (this.state == 0) {
				this.$refs['juan0'].open()
			}
			if (this.state == 1) {
				this.$refs['juan1'].open()
			}
		},
		methods: {
			closeJuan(num) {
				this.$refs['juan' + num].close()
			},
			switchTab(url) {
				uni.switchTab({
					url: url
				})
			},
			getQuanSucc() {
				this.$refs['juan1'].close()
				this.$msg('优惠券领取成功,可在个人中心中查看');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.juan1_body {
		background-color: $uni-bl;
		position: relative;
		padding: 26upx 20upx;
		width: 600upx;
		border-radius: 26upx;

		.ju_title {
			color: #fff;
			text-align: center;
		}

		.ju_title2 {
			color: #fff;
			text-align: center;
			font-size: 44upx;
			padding: 6upx 0 20upx;
		}

		.item_card {
			position: relative;

			.item_ab {
				position: absolute;
				top: 0;
				left: 0;
				display: flex;
				padding-top: 36upx;

				.left {
					width: 220upx;
					text-align: center;

					.p1 {
						color: #f00;
						font-weight: bold;

						.t {
							padding-right: 10upx;
							font-size: 50upx;
						}
					}

					.p2 {
						font-size: 22upx;
						transform: scale(.8);
						color: #999;
					}

				}

				.right {
					.p3 {
						font-size: 28upx;
						margin-bottom: 16upx;
					}

					.p4 {
						font-size: 22upx;
						color: #999;
						white-space: nowrap;
						transform: scale(.7) translateX(-90upx);

					}
				}
			}

			.img {
				width: 100%;
			}
		}

		.t_btn {
			button {
				color: $uni-bl;
				padding: 22upx 0;
				margin: 16upx 0;
			}
		}

	}

	.popup_close_bottom_btn {
		background-color: rgba(255, 255, 255, .2);
		width: 80upx;
		height: 80upx;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		margin: 40upx auto 0;
	}

	.juan_body {
		background-color: #fff;
		position: relative;
		padding: 26upx 36upx;
		width: 440upx;
		border-radius: 26upx;

		.iconguanbi {
			position: absolute;
			top: 20upx;
			right: 16upx;
			font-size: 26upx;
		}

		.ju_title {
			text-align: center;
			font-size: 36upx;
			margin-bottom: 30upx;
		}

		.t {
			text-align: center;
			font-size: 26upx;
			color: #666;
			line-height: 46upx;
			margin-bottom: 20upx;
		}

		.t_btn {
			display: flex;

			.btn {
				width: 40%;
			}
		}
	}

	.home {
		position: relative;

		.home_body {
			position: absolute;
			top: 0;
			left: 0;
			color: #fff;
			width: 100vw;
			box-sizing: border-box;
			padding: 70upx 26upx 0;

			.p_car {
				background-color: $uni-bl;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 100upx;
				margin-top: 80upx;

				.icon- {
					font-size: 100upx;
				}
			}

			.libao_list {
				display: flex;
				justify-content: space-between;
				margin-top: 30upx;

				.libao {
					width: 44%;
					box-shadow: 0 0 6upx 2upx #ddd;
					border-radius: 6upx;
					padding: 16upx;
				}

				.li_info {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.l_l {
						color: #999;
					}

					.l_r {
						width: 80upx;
					}
				}
			}

			.h_card {
				background-color: #fff;
				color: #333;
				margin-top: 460upx;
				border-radius: 16upx;
				padding: 24upx 24upx 70upx;

				.h_title {
					font-weight: bold;
				}

				.user_s {
					color: $uni-bl;
					font-size: 28upx;
					margin-top: 6upx;

					.iconfont {
						font-size: 28upx;
						margin-right: 10upx;
						display: inline-block;
					}
				}
			}

			/* #ifdef MP */
			.h_card {
				background-color: #fff;
				color: #333;
				margin-top: 410upx;
			}

			/* #endif */
			.get_s {
				display: flex;
				justify-content: space-between;
				font-size: 28upx;
				color: #eee;

				.iconai-arrow-down {
					font-size: 24upx;
					margin-left: 10upx;
				}

				.iconxiaoxi1 {
					font-size: 30upx;
				}

				.msg {
					position: relative;

					.point {
						position: absolute;
						width: 10upx;
						height: 10upx;
						background-color: $uni-or;
						border-radius: 50%;
						top: 0;
						right: -4upx;
					}
				}
			}
		}
	}

	.home_bg {
		width: 750upx;
		height: 100vh;
	}
</style>
