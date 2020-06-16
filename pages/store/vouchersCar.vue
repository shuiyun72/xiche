<template>
	<view>
		<view class="tab_list_sy">
			<view class="item" v-for="(item,index) in tabList" :class="{'active':index == tabSel}" @click="selectTab(item,index)">{{item.text}}</view>
		</view>
		<view class="bg10_f"></view>
		<view class="coupon">
			<view class="item_card" v-for="item in juan1List" :key="item.id">
				
				<image :src="'../../static/img/mine/juanxxc.png'"  class="img" v-if="tabSel == 0"></image>
				<image :src="'../../static/img/mine/juanhs.png'"  class="img" v-else></image>
				<view class="info_img">
					<image src="../../static/img/mine/yisy.png"  class="sm_img" v-show="tabSel == 1"></image>
				</view>
				<view class="info_img">
					<image src="../../static/img/mine/yigq.png"  class="sm_img" v-show="tabSel == 2"></image>
				</view>
				
				<view class="item_ab">
					<view class="left">
						<view class="p1">
							<text>{{item.chexing.name}}</text>
						</view>
						<view class="p2">
							月套餐
						</view>
					</view>
					<view class="right">
						<view class="p3">
							{{item.title}}
						</view>
						<view class="p3c" v-show="tabSel == 1">
							订单编号: {{item.order}}
						</view>
						<view class="p4">
							<text v-show="tabSel == 0">有效期: {{item.start_time.split(" ")[0]}}-{{item.end_time.split(" ")[0]}}</text>
							<text v-show="tabSel == 1">使用日期: {{item.created_at.split(" ")[0]}}</text>
							<text v-show="tabSel == 2">过期日期: {{item.end_time.split(" ")[0]}}</text>
							
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
						type: "小轿车",
						zhe: "外部洗车券",
						date: "2020.05.12-2020.08.12",
						id: 990,
						bg:"juanxxc.png"
					},
					{
						type: "SUV",
						zhe: "外部洗车券",
						date: "2020.05.12-2020.08.12",
						id: 993,
						bg:"juansuv.png"
					},
				],
				juan1ListY: [{
						type: "小轿车",
						zhe: "外部洗车券",
						order:"12345678911",
						date: "2020.05.12",
						id: 990,
						bg:"juanhs.png"
					},
					{
						type: "SUV",
						zhe: "外部洗车券",
						order:"12345678911",
						date: "2020.05.12",
						id: 993,
						bg:"juanhs.png"
					},
				],
				juan1ListYY: [{
						type: "小轿车",
						zhe: "外部洗车券",
						date: "2020.05.12",
						id: 990,
						bg:"juanhs.png"
					},
					{
						type: "SUV",
						zhe: "外部洗车券",
						date: "2020.05.12",
						id: 993,
						bg:"juanhs.png"
					},
				],
				juan1List:[]
			};
		},
		computed:{
			juan1ListType(){
				if(this.tabSel == 0){
					return this.juan1ListD;
				}else
				if(this.tabSel == 1){
					return this.juan1ListY;
				}else
				if(this.tabSel == 2){
					return this.juan1ListYY;
				}
			}
		},
		mounted() {
			this.getTicket(0)
		},
		methods:{
			getTicket(type){
				this.$getApi("/api/user/ticket/list",{type:type},res=>{
					
					this.juan1List = res.data.data;
					console.log(this.juan1List)
				})
			},
			selectTab(el, i) {
				this.tabSel = i;
				this.getTicket(this.tabSel);
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
					height: 70upx;
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
	
					.p1 {
						color: #fff;
						margin-bottom: 10upx;

					}
	
					.p2 {
						font-size: 22upx;
						// transform: scale(.8);
						color: #fff;
					}
	
				}
	
				.right {
					.p3 {
						font-size: 32upx;
						margin-bottom: 16upx;
					}
					.p3c{
						font-size: 28upx;
						color: #999;
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
				height: 200upx;
			}
		}
	
	}
</style>
