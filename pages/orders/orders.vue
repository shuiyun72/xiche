<template>
	<view class="orders">
		<view class="tab_list_sy">
			<view class="item" v-for="(item,index) in tabList" :class="{'active':index == tabSel}" @click="selectTab(item,index)">{{item.text}}</view>
		</view>

		<view class="o_card_list" v-for="item in msgInfo">
			<view @click="toDetail(item)">
				<view class="o_title">
					<text>{{item.type}}</text>
					<text>{{item.state}}</text>
				</view>
				<view class="o_p1">
					{{item.car}} {{item.carP}}
				</view>
				<view class="o_msg_info">
					<text class="iconfont iconyonghuming"><text>{{item.name}}</text></text>
				</view>
				<view class="o_msg_info">
					<text class="iconfont icondianhua"><text>{{item.phone | psd}}</text></text>
					<text class="tell_phone" @click.stop="tellPhone(item.phone)" v-show="tabSel==1">拨打电话</text>
				</view>
				<view class="o_msg_info">
					<text class="iconfont iconshijian"><text>{{item.time}}</text></text>
				</view>
				<view class="o_msg_info">
					<text class="iconfont iconshijian"><text>{{item.p}}</text></text>
				</view>
				<view class="o_msg_info">
					<text class="iconfont iconlocation"><text>{{item.addr}}</text></text>
					<text class="iconfont iconzhifeiji" v-show="tabSel==1" @click.stop="toPosition(item)"></text>
				</view>
				<view class="o_msg_info" v-show="item.ftime && tabSel==2">
					<text class="iconfont iconxuanzhong"><text>{{item.ftime}}</text></text>
				</view>
				<view class="o_msg_info" v-show="tabSel==3">
					<text class="iconfont iconcuowu"><text>{{item.ntime}}</text></text>
				</view>
				<view class="o_msg_info" v-show="tabSel==3">
					<text class="iconfont iconwendang"><text>{{item.cause}}</text></text>
				</view>
			</view>
			<view class="sub_btn" v-show="tabSel==0">
				<navigator url="./orderReject" class="nav_to">
					<button class="btn round sm orange_n">拒绝接单</button>
				</navigator>
				<button class="btn round sm orange nav_to" @click="toosC('jd')">确认接单</button>
			</view>
			<view class="sub_btn" v-show="tabSel==1 && cState!=4">
				<navigator :url="'./orderNoFind?phone='+item.phone" class="nav_to">
					<button class="btn round sm orange_n">未找到车辆</button>
				</navigator>
				<navigator url="../orders/orderWork" class="nav_to">
					<button class="btn round sm orange">开始洗车</button>
				</navigator>
			</view>
			<view class="sub_btn" v-show="cState==4">
				<navigator :url="'../orders/orderWork?cState='+cState+'&item='+JSON.stringify(item)" class="nav_to">
					<button class="btn round sm orange">确认完成</button>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cState: 4,
				tabSel: 0,
				tabList: [{
						text: "待接单",
						type: 0
					},
					{
						text: "待完成",
						type: 1
					},
					{
						text: "已完成",
						type: 2
					},
					{
						text: "特殊订单",
						type: 3
					}
				],
				person: {
					name: "张世通",
					star: 5,
					address: "升龙又一城"
				},
				orderNum: [{
						tNum: 12,
						text: "今日单数",
						type: 1
					},
					{
						tNum: 88,
						text: "今日单数",
						type: 2
					},
					{
						tNum: 590,
						text: "今日单数",
						type: 3
					}
				],
				msgInfo: [{
						type: "单次外部清洗",
						state: "待接单",
						car: "小型汽车",
						carP: "豫A668899",
						name: "张倩倩",
						phone: "13233333333",
						time: "2020-05-06 13:00-14:00",
						p: "12号停车位",
						addr: "郑州市中关区郑州市中关区郑州市",
						ftime: "2020-05-06 13:58",
						ntime: "2020-05-06 13:58",
						cause: "到达指定位置未找到指定车辆"
					},
					{
						type: "单次外部清洗",
						state: "待接单",
						car: "小型汽车",
						carP: "豫A668899",
						name: "张倩倩",
						phone: "13233333333",
						time: "2020-05-06 13:00-14:00",
						p: "12号停车位",
						addr: "郑州市中关区郑州市中关区郑州市",
						ftime: "2020-05-06 13:58",
						ntime: "2020-05-06 13:58",
						cause: "到达指定位置未找到指定车辆"
					}
				]
			}
		},
		filters: {
			psd: function(value) {
				if (!value) return ''
				value = value.toString()
				return value.slice(0, 3) + '******'
			}
		},
		computed: {
			starC() {
				if (this.person.star == 5) {
					return "五"
				}
			}
		},
		onLoad() {
			this.getOrder(1);
		},
		methods: {
			getOrder(type){
				let orderData = {
					type:type,
					page:1,
					paginate:100
				}
				this.$getApi('operator/orderList',orderData,res=>{
					console.log(res)
				})
			},
			selectTab(el, i) {
				this.tabSel = i;
			},
			tellPhone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			toPosition(item) {
				uni.openLocation({
					latitude: 34.775651, //要去的纬度-地址       
					longitude: 113.674715, //要去的经度-地址
					name: '东大街', //地址名称
					address: '12号', //详细地址名称
					success: function() {
						console.log('导航成功');
					},
					fail: function(error) {
						console.log(error)
					}

				})
			},
			toosC(el) {
				if (el == 'jd') {
					uni.showToast({
						title: '接单成功 , 请准时到达指定地点',
						duration: 2000,
						icon: "none",
						mask: false
					});
				}
			},
			toDetail(item) {
				uni.navigateTo({
					url: './orderDetail?type=' + this.tabSel + '&item=' + JSON.stringify(item)
				})
			}
		}
	}
</script>
<style lang="scss">
	.tab_list_sy {
		display: flex;
		font-size: 36upx;
		justify-content: space-around;
		background-color: #fff;
		margin-bottom: 26upx;
		border-top: 2upx solid #eee;

		.item {
			border-bottom: 6upx solid transparent;
			padding: 20upx 0 16upx;

			&.active {
				color: $uni-or;
				border-bottom: 6upx solid $uni-or;
			}
		}
	}

	page {
		background-color: $uni-def;
	}

	.orders {

		display: flex;
		flex-direction: column;
	}

	.o_start {
		height: 60vh;
		display: flex;
		justify-content: center;
		align-items: center;

		.o_start_b {
			background-color: $uni-or;
			width: 200upx;
			height: 200upx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			border-radius: 50%;
			color: #fff;

			text {
				display: block;
				font-size: 48upx;
				height: 58upx;
				line-height: 1;
			}
		}
	}

	.o_card_list {
		background-color: #fff;
		box-shadow: 2upx 0upx 4upx 4upx #eee;
		width: 94%;
		margin: 0 auto;
		border-radius: 10upx;
		box-sizing: border-box;
		padding: 24upx 30upx;
		position: relative;
		margin-bottom: 26upx;

		.o_stop {
			position: absolute;
			right: -16upx;
			top: 50%;
			margin-top: -50upx;
			background-color: $uni-or;
			color: #fff;
			width: 120upx;
			height: 120upx;
			font-size: 26upx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			border-radius: 50%;

			text {
				display: block;
				height: 32upx;
				line-height: 1;
			}
		}

		.sub_btn {
			text-align: right;
			padding-top: 30upx;
			border-top: 1upx solid #eee;
			margin-top: 70upx;

			.nav_to {
				width: 30%;
				display: inline-block;
				margin-left: 20upx;
			}
		}

		.o_title {
			display: flex;
			justify-content: space-between;
			color: $uni-or;
			font-size: 34upx;
			border-bottom: 2upx solid #eee;
			padding-bottom: 12upx;
		}

		.o_p1 {
			font-size: 36upx;
			padding: 24upx 0;
		}

		.o_msg_info {

			// font-size: 32upx;
			.iconfont {
				font-size: 32upx;
				color: #333;

				&.iconzhifeiji {
					color: $uni-or;
					margin-left: 10upx;
				}

				text {
					padding-left: 12upx;
					font-size: 32upx;
				}
			}

			.tell_phone {
				font-size: 28upx;
				margin-left: 30upx;
				color: $uni-or;
			}
		}
	}

	.o_title_sy {
		padding: 16upx 0 16upx 6upx;

		.iconfont {
			font-size: 36upx;
		}

		.text {
			font-size: 32upx;
		}
	}

	.o_card_sy {
		background-color: $uni-or;
		padding: 26upx 26upx 32upx;

		.order_num {
			display: flex;
			justify-content: space-between;
			text-align: center;
			padding-top: 40upx;
			color: #fff;

			.num {
				font-size: 46upx;
			}

			.text {
				font-size: 32upx;
				padding-top: 6upx;
			}
		}

		.info {
			display: flex;
			color: #eee;
			justify-content: space-between;

			.set {
				text-align: center;

				.iconshezhi {
					font-size: 30upx;
				}

				.set_t {
					font-size: 22upx;
				}
			}

			.msg {
				width: 60%;

				.name {
					font-size: 32upx;
				}

				.star_box {
					display: flex;
					align-items: baseline;
					position: relative;
					left: -10upx;

					.star_n {
						font-size: 22upx;
						padding-left: 10upx;

					}

				}

				.address {
					font-size: 22upx;
				}
			}

			.img {
				width: 120upx;
				height: 120upx;
				padding-top: 10upx;

				img {
					width: 100%;
				}
			}
		}
	}

	.o_or {
		color: $uni-or;
	}

	.ml10p {
		margin-left: 10upx;
	}
</style>
