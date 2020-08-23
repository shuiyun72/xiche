<template>
	<view class="ssss_b">
		<view class="order_true" v-for="item in cellItem">
			
			<view class="order_info">
				<view class="od_title">
					<view class="t">
						{{item.title}}
					</view>
					<view class="money">
						{{item.amount}}元
					</view>
				</view>
				<view class="other_order" v-if="item.service.length > 0">
					<view class="item_ot" v-for="iC in item.service">
						<text>{{iC.name}}</text>
						<text class="red">￥{{iC.price}}</text>
					</view>
					<view class="item_ot" v-if="Number(item.ticket_money) > 0">
						<text>单次清洗</text>
						<text class="red">￥{{item.ticket_money}}</text>
					</view>
					<view class="item_ot" v-if="Number(item.more_money) > 0">
						<text>额外费用</text>
						<text class="red">￥{{item.more_money}}</text>
					</view>
				</view>
				<view class="msg">
					<view class="l_t"> 车牌号: </view>
					<view class="r_c"> {{item.carNum}} </view>
				</view>
				<view class="msg">
					<view class="l_t"> 时间: </view>
					<view class="r_c"> {{item.time}} </view>
				</view>
				<view class="msg">
					<view class="l_t"> 停车位: </view>
					<view class="r_c"> {{item.location}} (停车位)</view>
				</view>
				<view class="msg">
					<view class="l_t"> 地址: </view>
					<view class="r_c"> {{item.address}} </view>
				</view>
				<view class="msg">
					<view class="l_t"> 联系人: </view>
					<view class="r_c"> {{item.name}} </view>
				</view>
				<view class="msg">
					<view class="l_t"> 订单编号: </view>
					<view class="r_c"> {{item.code}} </view>
				</view>
			</view>
			<uni-list class="od_t xc">
				<uni-list-item title="洗车券" :showArrow="false">
					<template v-slot:right="">
						<text class="red" v-if="!item.userticket">无</text>
						<text class="red" v-else>{{item.userticket.title}}</text>
					</template>
				</uni-list-item>
			</uni-list>
			
		</view>
		<uni-list class="od_t" v-if="isNc">
			<uni-list-item title="优惠券" :rightText="oderQuan.name" @click="selQUan"></uni-list-item>
		</uni-list>
		
		<view class="pay_type">支付方式</view>
		<radio-group class="block" @change="RadioChange">
			<view class="cu-form-group">
				<view class="item">
					<image style="width: 44rpx;height: 44rpx;" src="../../static/img/weixin.png" mode=""></image><text class="margin-left-xs">微信支付</text>
				</view>
				<radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A" class="radio"></radio>
			</view>
			<!-- #ifndef MP -->
			<!-- <view class="cu-form-group">
				<view class="item">
					<image style="width: 44rpx;height: 44rpx;" src="../../static/img/zhifb.png" mode=""></image><text class="margin-left-xs">支付宝支付</text>
				</view>
				<radio :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B" class="radio"></radio>
			</view> -->
			<!-- #endif -->
			<view class="cu-form-group">
				<view class="item">
					<image style="width: 44rpx;height: 44rpx;" src="../../static/img/yue.png" mode=""></image><text class="margin-left-xs">余额支付</text>
				</view>
				<view>
					<radio :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C" class="radio"></radio>
				</view>
			</view>
		</radio-group>
		
		<view class="bottom_c">
			<view @click="next" class="btn">立即支付</view>
			<view class="pay-num">
				实付款：<text class="red">￥{{totalAmount}}</text>
			</view>
		</view>
	</view>

</template>

<script>
	import _ from "../../until/lodash";
	export default {
		data() {
			return {
				radio: 'C',
				cellItem: [],
				isNc: true,
				userCoupon:"",
				isUserCoupon:true
			};
		},
		onLoad(ph) {
			if (ph.nc) {
				this.isNc = false
			} else {
				this.isNc = true
			}
			this.cellItem = JSON.parse(ph.item)
			console.log(this.cellItem)
			this.userCoupon = ph.user_coupon;
			console.log(this.userCoupon)
			this.isUserCoupon = this.userCoupon == "[]" ? false :true;

		},
		onShow() {

		},
		computed: {
			totalAmount() {
				let mm = 0;
				_.map(this.cellItem, item => {
					mm += Number(item.amount)
				})
				if(this.oderQuan.money){
					mm = mm - this.oderQuan.money
				}
				return mm
			},
			oderQuan() {
				return this.$store.state.torderQuan
			},
			payType() {
				
				switch (this.radio) {
					case 'A':
						// #ifndef MP
						return 'wepay';
						// #endif
						// #ifdef MP
						return 'minipay'
						// #endif
						break;
					case 'B':
						return 'alipay';
						break;
					case 'C':
						return 'money';
						break;
				}
				
				
			}
		},
		methods: {
			RadioChange(e) {
				this.radio = e.detail.value;
			},
			// thisText
			next() {
				console.log("支付")
				let ordernos;
				let this_ = this;
				if (this.cellItem.length > 1) {
					ordernos = _.map(this.cellItem, res => {
						return res.order_no
					})[0];
				} else {
					ordernos = _.map(this.cellItem, res => {
						return res.order_no
					}).toString();
				}
				let dataL = {
					order_no: ordernos,
					payment: this.payType,
					// payment:"minipay",
					user_coupon_id: this.oderQuan.id ? this.oderQuan.id : ""
				}
				console.log(dataL)
				this.$getApi("/api/user/order/pay", dataL, resbuy => {
					console.log(resbuy)
					console.log(this_.payType)
					if(this_.payType == "wepay") {
						console.log("wepay")
						uni.requestPayment({
						    provider: 'wxpay',
						    orderInfo: JSON.parse(resbuy.data.payinfo), //微信、支付宝订单数据
						    success: function (res) {
								this_.$store.commit('setQuan', {
									name: "请选择优惠券"
								})
								uni.reLaunch({
									url:'./orderSuccess'
								})
								console.log(res)
						        console.log('success:' + JSON.stringify(res));
						    },
						    fail: function (err) {
						        console.log('fail:' + JSON.stringify(err));
						    }
						});
					} else
					if(this_.payType == "alipay") {
						uni.requestPayment({
						    provider: 'alipay',
						    orderInfo: resbuy.data.payinfo, //微信、支付宝订单数据
						    success: function (res) {
								this_.$store.commit('setQuan', {
									name: "请选择优惠券"
								})
								uni.reLaunch({
									url:'./orderSuccess'
								})
								console.log(res)
						        console.log('success:' + JSON.stringify(res));
						    },
						    fail: function (err) {
						        console.log('fail:' + JSON.stringify(err));
						    }
						});
					} else
					if (this_.payType == "money") {
						this_.$store.commit('setQuan', {
							name: "请选择优惠券"
						})
						uni.reLaunch({
							url:'./orderSuccess'
						})
					}else{
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: resbuy.data.payinfo.timeStamp,
							nonceStr: resbuy.data.payinfo.nonceStr,
							package: resbuy.data.payinfo.package,
							signType: resbuy.data.payinfo.signType,
							paySign: resbuy.data.payinfo.paySign,
							success: function (res) {
								this_.$getApi("/api/user/userinfo",{},resss=>{
									this_.$store.commit('login',resss.data);
								})
								if(this_.$store.state.userInfo.groupid != 0){
									uni.navigateTo({
										url:'../pay/successMsg'
									})
								}else{
									setTimeout(()=>{
										uni.navigateTo({
											url:'../pay/successMsg'
										})
									},600)
								}
							},
							fail: function (err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
					}
				})
				// uni.navigateTo({
				// 	url: './orderSuccess'
				// })
			},
			selQUan() {
				if(this.isUserCoupon){
					uni.navigateTo({
						url: '../store/coupon?userCoupon'+this.userCoupon
					})
				}else{
					this.$msg("无优惠券")
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.other_order{
		display: flex;
		background-color: #fff;
		padding: 20upx 0;
		color: #666;
		flex-wrap: wrap;
		.item_ot{
			margin-right: 40upx;
			min-width: 300upx;
			.red{
				margin-left: 10upx;
			}
		}
	}
	.ssss_b {
		padding-bottom: 60upx;
		background-color: #f0f0f0;
		padding-bottom: 200upx;
		min-height: 100vh;
	}

	.bottom_c {
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		width: 750upx;
		font-size: 26upx;
		background-color: #fff;
		flex-direction: row-reverse;

		.pay-num {
			background-color: #fff;
			padding: 30upx 30upx 30upx 0;
			box-sizing: border-box;
			color: #333;

			.red {
				color: #f00;
			}
		}

		.btn {
			width: 260upx;
			background-color: $uni-bl;
			color: #fff;
			text-align: center;
			padding: 30upx 0;
		}
	}

	.cu-form-group {
		display: flex;
		justify-content: space-between;
		padding: 16upx 26upx;
		background-color: #fff;
		border-top: 1upx solid rgba(0, 0, 0, .1);

		.item {
			display: inline-flex;
			align-items: center;

			.margin-left-xs {
				margin-left: 10upx;
				font-size: 28upx;
				color: #666;
			}
		}
	}

	.radio {
		transform: scale(.8);
	}

	.pay_type {
		background-color: #fff;
		margin-top: 36upx;
		font-size: 28upx;
		padding: 20upx 26upx;
	}

	.pay_top {
		background-color: #fff;
		padding: 10upx 30upx;

		.bl {
			background-color: $uni-bl;
			text-align: center;
			color: #fff;
			padding: 60upx 0;
			border-radius: 16upx;
		}

		.t1 {
			font-size: 36upx;
			margin-bottom: 20upx;
		}
	}


	.pay_type {
		background-color: #fff;
		margin-top: 20upx;
		font-size: 28upx;
		padding: 20upx 26upx;
	}

	.order_true {
		border-top: 1upx solid #eee;
		background-color: #f0f0f0;
		margin-top: 20upx;
	}

	.od_t {
		margin-top: 20upx;
		&.xc{
			margin-top: 0;
			padding-top: 20upx;
		}
	}

	.order_info {
		background-color: #fff;
		padding: 20upx 26upx;

		.msg {
			display: flex;
			font-size: 28upx;
			// font-weight: bold;
			color: #999;
			padding: 10upx 0;

			.l_t {
				width: 160upx;
			}
		}

		.od_title {
			display: flex;
			font-weight: bold;
			justify-content: space-between;
			font-size: 36upx;
			padding: 10upx 0;

			.t {
				color: #666;
			}

			.money {
				color: #f00;
			}
		}
	}
</style>
