<template>
	<view class="to_order">
		<uni-list>
			<uni-list-item-point title="选择车辆" point="true" rightText=""  @click="navigateTo('../store/car')"></uni-list-item-point>
			<view class="part1">
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
			</view>
			<uni-list-item-point title="洗车地址" point="true" rightText="请选择地址" @click="navigateTo('../store/address')"></uni-list-item-point>
			<uni-list-item-point title="停车位" point="true" rightText="请选择停车位" @click="navigateTo('../store/stopCar')"></uni-list-item-point>
		</uni-list>
		<uni-list class="mt10">
			<uni-list-item-point title="洗车内容选择" point="true" :showArrow="false" rightText=""></uni-list-item-point>
		</uni-list>
		<view class="car_com">
			<radio-group @change="radioChange" class="sel_car_com">
				<label v-for="(item, index) in itemsCarList" :key="item.value">
					<view class="item">
						<image src="../../static/img/jiag.png" mode="widthFix" class="img"></image>
						<view class="item_b">
							<view class="part1">
								<radio :value="item.value" :checked="index === current" class="radio" />
								<text class="t">{{item.value}}</text>
							</view>
							<view class="part2">
								<image src="../../static/img/vip.png" mode="widthFix" class="vip_img"></image> {{item.title}}
							</view>
							<view class="p">{{item.p1}}</view>
							<view class="p">{{item.p2}}</view>
							<view class="p">{{item.p3}}</view>
						</view>
					</view>
				</label>
			</radio-group>
		</view>
		<view class="other_s">
			<view class="title">
				其他服务(现金支付)
			</view>
			<checkbox-group @change="checkboxChange" class="checkbox_other">
				<label v-for="item in checkboxOther" :key="item.value">
					<view class="item">
						<checkbox :value="item.value" :checked="item.checked" class="checkbox" />
						<text>{{item.name}}</text>
						<text class="red">￥{{item.money}}</text>
					</view>
				</label>
			</checkbox-group>
		</view>
		<uni-list class="time_pick">
			<uni-list-item-point title="清洗时间"  point="true">
				<template v-slot:right="">
				<picker mode="multiSelector" @columnchange="rinseTimeChange" :value="rinseTimeSel" :range="rinseTimeList">
					<view class="uni-input">
						<text v-show="JSON.stringify(rinseTimeSel) == '[0,0]'">请选择时间</text>
						<text v-show="JSON.stringify(rinseTimeSel) != '[0,0]'">{{rinseTimeList[0][rinseTimeSel[0]]}},{{rinseTimeList[1][rinseTimeSel[1]]}}</text>	
					</view>
				</picker>
				</template>
			</uni-list-item-point>
		</uni-list>
		<uni-list>
			<uni-list-item-point title="联系电话" point="true" rightText="13899999999" @click="navigateTo('../store/phone')"></uni-list-item-point>
		</uni-list>
		<view class="bezhu">
			<view class="title">
				备注信息
			</view>
			<textarea :value="vTextarea" placeholder="请在这里填写备注信息" class="textarea"/>
		</view>
		<view class="c_add_or">
			<text class="iconfont icontianjia"></text>
			<text>继续添加洗车订单</text>
		</view>
		<view class="buy_vip">
			<view class="bp1">
				<text>本次服务总价 <text class="red">￥28元</text></text>
			</view>
			<view class="bp2">
				<text>购买VIP套餐本次将节省 <text class="blue">5.5元</text>,点击 <text class="blue" @click="switchTab('../combo/combo')">购买VIP套餐</text></text>
			</view>
		</view>
		<view class="sub_btn">
			<button class="btn blue" @click="subBtn">确认下单</button>
		</view>
	</view>
</template>

<script>
	import uniListItemPoint from '../../components/uni-list-item-point/uni-list-item-point.vue'
	export default {
		data() {
			return {
				itemsCarList: [],
				current: 1,
				checkboxOther: [],
				rinseTimeList: [
					['10日', '11日', '12日', '13日', '14日'],
					['上午0:00-8:00', '晚上20:00-24:00']
				],
				rinseTimeSel:[0,0],
				vTextarea:""
			};
		},
		onLoad() {
			console.log(this.$store)
		},
		methods: {
			radioChange(e) {
				console.log(e.detail.value)
			},
			checkboxChange(e) {
				var items = this.checkboxOther,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.value)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
			},
			rinseTimeChange(e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				// this.rinseTimeList[e.detail.column] = e.detail.value
				// this.$forceUpdate()
				
				if(e.detail.column == 0){
					console.log(e.detail)
					this.rinseTimeSel.splice(0, 1, e.detail.value)
					// this.rinseTimeSel[0] = this.rinseTimeList[0][e.detail.value]
				}else
				if(e.detail.column == 1){
					console.log(e.detail)
					this.rinseTimeSel.splice(1, 1, e.detail.value)
					// this.rinseTimeSel[1] = this.rinseTimeList[1][e.detail.value]
					//this.rinseTimeList[1] = e.detail.value
				}
				this.$forceUpdate()
			},
			navigateTo(url){
				uni.navigateTo({
					url:url
				})
			},
			switchTab(url){
				uni.switchTab({
					url:url 
				})
			},
			subBtn(){
				uni.navigateTo({
					url:'./orderTrue'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mt10 {
		margin-top: 22upx;
	}
	.buy_vip{
		text-align: center;
		font-weight: bold;
		color: #777;
		padding-top: 100upx;
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
	.sub_btn{
		padding:80upx 40upx;
		background-color: #f0f0f0;
		.btn{
			padding: 26upx 0;
		}
	}
	.c_add_or{
		color: $uni-bl;
		display: flex;
		align-items: center;
		padding: 26upx;
		.icontianjia{
			width: 40upx;
			margin-right: 20upx;
		}
	}
	.bezhu{
		background-color: #fff;
		padding: 10upx 26upx;
		.textarea{
			background-color: #f0f0f0;
			height: 180upx;
			font-size: 26upx;
			padding: 20upx;
			box-sizing: border-box;
			margin: 10upx 0;
		}
	}
	.time_pick{
		margin: 20upx 0;
	}
	.other_s {
		padding: 0 26upx;
		background-color: #fff;

		.title {
			color: #666;
		}

		.checkbox_other {
			display: flex;
			.item{
				// margin-right: 20upx;
				display: inline-flex;
				white-space: nowrap;
				align-items: baseline;
				.red{
					color: #f00;
				}
				.checkbox{
					transform: scale(.6);
				}
			}
		}
	}

	.to_order {
		border-top: 1upx solid #eee;
		background-color: #f0f0f0;
	}

	.car_com {
		.sel_car_com {
			display: flex;
			background-color: #fff;
			border-top: 1upx solid #eee;
			padding: 10upx 16upx 0;

			.item {
				width: 300upx;
				position: relative;

				.item_b {
					position: absolute;
					left: 0;
					top: 0;
					padding: 10upx;

					.radio {
						transform: scale(.5);
					}

					.part1 {
						white-space: nowrap;
						display: inline-flex;
						align-items: baseline;

						.t {
							color: #fff;
							font-size: 26upx;
							transform: scale(.8) translateX(-40upx);
						}

					}

					.part2 {
						padding: 20upx 0 6upx 20upx;

						.vip_img {
							width: 50upx;
							margin-right: 10upx;
						}

						color: #FAA003;
						font-size: 28upx;
					}

					.p {
						color: $uni-bl;
						font-size: 26upx;
						padding: 0 0 0 20upx;
					}
				}

				.img {
					width: 100%;
				}
			}
		}
	}
</style>
