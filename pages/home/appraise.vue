<template>
	<view class="appraise">
		<view class="appraise_body">
			<view class="item" v-for="item in commentsList" :key="item.id">
				<view class="a_title">
					<text class="ping">评</text>
					<text class="p">匿名评价</text>
				</view>
				<view class="star_box">
					<uni-rate :value="item.star" :margin="5" :size="16" disabled="false"/>
					<text class="star_n">{{starC(item.star)}}星</text>
				</view>
				<view class="grow_btn_app">
					<view class="item_btn" v-for="itemC in item.tags">
						<button class="btn default_n round sm active">{{itemC}}</button>
					</view>
				</view>
				<view class="a_raise">
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
				myA: [{
						star: 4,
						type: 1,
						text: "这个师傅很专业 , 很认真 , 给我清洗的很干净",
						id: 6
					},
					{
						star: 5,
						type: 1,
						text: "这个师傅很专业,很认真,给我清洗的很干净",
						id: 7
					}
				],
				orderReject: [{
						cause: "服务态度好",
						text: "两个订单距离太远,无法及时赶到",
						id: 1003
					},
					{
						cause: "不错",
						text: "订单时间不够,无法及时赶到",
						id: 1004
					},
					{
						cause: "汽车清洗的很干净",
						text: "订单订单过多,无法及时赶到",
						id: 1005
					}
				],
				rejectIndex: 0,
				commentsList: []
			};
		},
		computed: {

		},
		mounted() {
			this.$getApi("/api/operator/comments", {}, res => {
				console.log(res)
				this.commentsList = res.data.data;
				console.log(res.data)
			})
		},
		methods: {
			starC(n) {
				switch (n) {
					case 0:
						return "零";
						break;
					case 1:
						return "一";
						break;
					case 2:
						return "二";
						break;
					case 3:
						return "三";
						break;
					case 4:
						return "四";
						break;
					case 5:
						return "五";
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
	.appraise {
		height: 100vh;
		background-color: $uni-def;
	}

	.grow_btn_app {
		display: flex;
		justify-content: start;
		padding: 30upx 0 30upx;

		.item_btn {
			margin-right: 30upx;

			.btn {
				font-size: 24upx;
			}
		}
	}

	.appraise_body {
		padding: 24upx;

		.item {
			background-color: #fff;
			margin-bottom: 26upx;
			padding: 24upx;
			border-radius: 20upx;

			.a_raise {
				font-size: 32upx;
				color: #666;
				padding-bottom: 20upx;
			}

			.a_title {
				margin-bottom: 20upx;

				.ping {
					display: inline-flex;
					width: 60upx;
					height: 60upx;
					background-color: $uni-or;
					color: #fff;
					font-size: 36upx;
					justify-content: center;
					align-items: center;
					border-radius: 50%;
					transform: scale(.7);
					margin-right: 30upx;
				}

				.p {
					font-size: 36upx;
				}
			}

			.star_box {
				display: flex;
				align-items: baseline;

				.star_n {
					align-items: baseline;
					font-size: 30upx;
					margin-left: 30upx;
				}
			}
		}
	}
</style>
