<template>
	<view>
		<view class="coupon">
			<view class="item_card" v-for="item in juan1List" :key="item.id" @click="selQ(item)">
					<image src="../../static/img/mine/zhekj.png" mode="widthFix" class="img"></image>
					<view class="item_ab">
						<view class="left" >
							<view class="p1">
							<!-- 	{{item}} -->
								<text class="t">{{Number(item.discount)}}</text>
								<text>折</text>
							</view>
							<view class="p2">
								折扣券
							</view>
						</view>
						<view class="right" >
							<view class="p3">
								{{item.title}}
							</view>
							<view class="p4">
								有效期 {{calcDate(item.created_at)}}
									-
									{{calcDate(item.end_time)}}
							</view>
						</view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
			this.$getApi("/api/user/coupon/lists",{type:0},ress=>{
				this.juan1List = ress.data.data
				console.log(ress.data.data )
			})
		},
		methods:{
			calcDate(date){
				 if(date){
					 return date.split(" ")[0]
				 }
			},
			selQ(item){
				console.log(item)
				this.$store.commit('setQuan',{name:item.title,id:item.id});
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.coupon {
		// min-height: 100vh;
		// background-color: #f0f0f0;
		padding: 26upx;

		.item_card {
			position: relative;

			.item_ab {
				position: absolute;
				top: 0;
				left: 0;
				display: flex;
				padding-top: 50upx;

				.left {
					width: 260upx;
					text-align: center;

					.p1 {
						color: $uni-bl;
						font-weight: bold;

						.t {
							padding-right: 10upx;
							font-size: 56upx;
						}
					}

					.p2 {
						font-size: 22upx;
						// transform: scale(.8);
						color: #999;
					}

				}

				.right {
					.p3 {
						font-size: 32upx;
						margin-bottom: 16upx;
					}

					.p4 {
						font-size: 28upx;
						color: #999;
						white-space: nowrap;
						// transform: scale(.7) translateX(-90upx);

					}
				}
			}

			.img {
				width: 100%;
			}
		}

	}
</style>
