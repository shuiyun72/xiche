<template>
	<view>
		<view class="combo_body">
			<view class="combo_title">
				{{comboTitle}}
			</view>
			<view class="taocan_box" :class="{'active':index == selType}" v-for="(item,index) in comboListData"
			 @click="selectItem(item,index)">
				<view class="iconl">
					<!-- {{item.class}} -->
					月套餐
				</view>
				<view class="info_s">
					<view class="t">
						{{item.title}}
					</view>
					<view class="money">
						￥{{item.current_price}}
					</view>
				</view>
				<view class="info_m">
					<view class="t">
						有限期{{item.day}}天/直接抵扣使用
					</view>
					<view class="o_money">
						原价:{{item.original_price}}
					</view>
				</view>
			</view>
			<view class="combo_title">
				套餐说明
			</view>
			<view class="p">
				1. 套餐里的洗车券可直接抵扣车辆外部清洗的费用,无需再另外付费
			</view>
			<view class="p">
				2. 请在有限期内使用,超过有效期洗车券将失效
			</view>
			<view class="p">
				3. 最终解释权归APP所有
			</view>
		</view>
		<view class="buy_btn" @click="payC">
			立即购买
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				comboListData: [],
				selType: 0,
				comboTitle:"",
				corrItem:{}
			}
		},
		onLoad(op) {
			this.init(op.item);
		},
		mounted() {
			this.corrItem = this.comboListData[0]
		},
		methods:{
			init(item){
				let itemL = JSON.parse(item);
				this.comboTitle = itemL.cat_name;
				this.$getApi("/api/auth/mall/list",{id:itemL.id},res1=>{
					console.log(res1)
					this.comboListData = res1.data;
					this.corrItem = res1.data[0];
				})
			},
			selectItem(item,index){
				this.selType = index;
				this.corrItem = item;
			},
			payC(){
				uni.navigateTo({
					url:'../pay/pay?item='+JSON.stringify(this.corrItem) 
				})	
			}
		}
	}
</script>

<style lang="scss" scoped>
	.buy_btn {
		background-color: $uni-bl;
		text-align: center;
		color: #fff;
		padding: 26upx 0;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750upx;
		
	}
	.combo_body {
		border-top: 1upx solid #eee;
		padding: 26upx;

		.p {
			margin-bottom: 26upx;
			color: #888;
		}

		.combo_title {
			font-weight: bold;
			padding: 26upx 0 16upx;
			color: #666;
			margin-bottom: 10upx;
		}

		.taocan_box {
			border: 4upx solid #eee;
			border-radius: 16upx;
			margin-bottom: 26upx;
			padding: 0 50upx;

			&.active {
				border: 4upx solid #81BFFF;
				background-color: #E0EFFF;
			}

			.iconl {
				background-color: $uni-bl;
				width: 120upx;
				color: #fff;
				font-size: 28upx;
				text-align: center;
				border-radius: 0 0 12upx 12upx;
				padding: 4upx 0;
			}

			.info_s {
				display: flex;
				justify-content: space-between;
				font-weight: bold;
				font-size: 36upx;
				margin: 16upx 0;

				.t {
					color: #333;
				}

				.money {
					color: #f00;
				}
			}

			.info_m {
				display: flex;
				justify-content: space-between;
				color: #999;
				font-size: 30upx;
				margin-bottom: 16upx;

				.o_money {
					text-decoration: line-through;
				}
			}
		}
	}
</style>
