<template>
	<view>
		<view class="tab_list_sy">
			<view class="item" v-for="(item,index) in tabList" :class="{'active':index == tabSel}" @click="selectTab(item,index)">{{item.text}}</view>
		</view>
		<view class="bg10_f"></view>
		<view class="coupon">
			<view class="item_card" v-for="item in juan1ListType" :key="item.id">
				<image src="../../static/img/mine/zhekj.png" mode="widthFix" class="img"></image>
				<view class="info_img">
					<image src="../../static/img/mine/yisy.png" mode="widthFix" class="sm_img" v-show="tabSel == 1"></image>
				</view>
				<view class="info_img">
					<image src="../../static/img/mine/yigq.png" mode="widthFix" class="sm_img" v-show="tabSel == 2"></image>
				</view>
				
				<view class="item_ab">
					<view class="left" :class="{'long':tabSel != 0}">
						<view class="p1">
						<!-- 	{{item}} -->
							<text class="t">{{Number(item.discount)}}</text>
							<text>折</text>
						</view>
						<view class="p2">
							折扣券
						</view>
					</view>
					<view class="right" :class="{'long':tabSel != 0}">
						<view class="p3">
							{{item.title}}
						</view>
						<view class="p4">
							有效期 {{item.created_at && item.created_at.split(" ")[0]}}
								-
								{{item.end_time && item.end_time.split(" ")[0]}}
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
				tabList: [{
						text: "待使用",
						type: 0
					},
					{
						text: "已使用",
						type: 1
					},
					{
						text: "已过期",
						type: 2
					}
				],
				tabSel:0,
				juan1ListD: [{
						num: "1",
						zhe: "1",
						date: "2020.05.12-2020.08.12",
						id: 990,
						bg:"juanxxc.png"
					},
					{
						num: "2",
						zhe: "1",
						date: "2020.05.12-2020.08.12",
						id: 993,
						bg:"juansuv.png"
					}
				],
				juan1ListY: [{
						num: "1",
						zhe: "1",
						date: "2020.05.12-2020.08.12",
						id: 990,
						bg:"juanxxc.png"
					},
					{
						num: "2",
						zhe: "1",
						date: "2020.05.12-2020.08.12",
						id: 993,
						bg:"juansuv.png"
					}
				],
				juan1ListYY: [{
						num: "1",
						zhe: "1",
						date: "2020.05.12-2020.08.12",
						id: 990,
						bg:"juanxxc.png"
					},
					{
						num: "2",
						zhe: "1",
						date: "2020.05.12-2020.08.12",
						id: 993,
						bg:"juansuv.png"
					}
				],
				juan1ListType :[]
			};
		},
		computed:{
			// juan1ListType(){
			// 	if(this.tabSel == 0){
			// 		return this.juan1ListD;
			// 	}else
			// 	if(this.tabSel == 1){
			// 		return this.juan1ListY;
			// 	}else
			// 	if(this.tabSel == 2){
			// 		return this.juan1ListYY;
			// 	}
			// }
		},
		mounted() {
			this.getInit(0);
		},
		methods:{
			getInit(type){
				this.$getApi("/api/user/coupon/lists",{type:type},ress=>{
					this.juan1ListType = ress.data.data
					console.log(this.juan1ListType )
				})
			},
			selectTab(el, i) {
				this.tabSel = i;
				this.getInit(el.type);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bg10_f{
		height: 20upx;
		background-color: #f0f0f0;
	}
.tab_list_sy {
		display: flex;
		font-size: 36upx;
		justify-content: space-around;
		background-color: #fff;
		border-top: 2upx solid #eee;

		.item {
			border-bottom: 6upx solid transparent;
			padding: 20upx 0 16upx;

			&.active {
				color: $uni-bl;
				border-bottom: 6upx solid $uni-bl;
			}
		}
	}
	.coupon {
		// min-height: 100vh;
		// background-color: #f0f0f0;
		padding: 26upx;
	
		.item_card {
			position: relative;
			.info_img{
				position: absolute;
				top: 30upx;
				right: 50upx;
				width: 80upx;
				z-index:2;
				.sm_img{
					width: 100%;
				}
			}
			.item_ab {
				position: absolute;
				top: 0;
				left: 0;
				display: flex;
				padding-top: 50upx;
	
				.left {
					width: 260upx;
					text-align: center;
					&.long{
						.p1{
							color: #999;
						}
						.p2{
							color: #999;
						}
					}
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
					&.long{
						.p3{
							color: #999;
						}
					}
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
