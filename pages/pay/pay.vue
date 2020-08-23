<template>
	<view class="pay">
		<view class="pay_top">
			<view class="bl">
				<view class="t1">￥ {{money}}</view>
				<view class="t2">月套餐</view>
			</view>

		</view>
		
		<view class="pay_type">支付方式</view>
		<radio-group class="block" @change="RadioChange">
			<view class="cu-form-group">
				<view class="item">
					<image style="width: 44rpx;height: 44rpx;" src="../../static/img/weixin.png" mode=""></image><text class="margin-left-xs">微信支付</text>
				</view>
				<radio :class="radio=='wepay'?'checked':''" :checked="radio=='wepay'?true:false" value="wepay" class="radio"></radio>
			</view>
			<!-- #ifndef MP -->
			<!-- <view class="cu-form-group">
				<view class="item">
					<image style="width: 44rpx;height: 44rpx;" src="../../static/img/zhifb.png" mode=""></image><text class="margin-left-xs">支付宝支付</text>
				</view>
				<radio :class="radio=='alipay'?'checked':''" :checked="radio=='alipay'?true:false" value="alipay"  class="radio"></radio>
			</view> -->
			<!-- #endif -->
			<view class="cu-form-group">
				<view class="item">
					<image style="width: 44rpx;height: 44rpx;" src="../../static/img/yue.png" mode=""></image><text class="margin-left-xs">余额支付</text>
				</view>
				<view>
					<radio :class="radio=='money'?'checked':''" :checked="radio=='money'?true:false" value="money"  class="radio"></radio>
				</view>
			</view>
		</radio-group>
		
		<!-- <view @tap="next()" class="cu-bar foot" style="box-shadow: 0;"><button class="cu-btn bg-blue lg" style="width: 750rpx; height: 100rpx;" type="">确定</button></view> -->
		<view class="bottom_c">
			<view class="pay-num">
				实付款：<text class="red">￥{{money}}</text>
			</view>		
			<view @click.stop="next" class="btn">确认支付</view>	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				radio: 'money',
				money:0,
				typeId:""
			};
		},
		onShow() {
			// // #ifdef MP
			// 	this.radio = 'minipay'
			// // #endif
			// // #ifndef MP
			// 	this.radio = 'money'
			// // #endif
		},
		onLoad(op) {
			this.money = JSON.parse(op.item).current_price;
			this.typeId = JSON.parse(op.item).cate_id;
		},
		computed:{
			payType() {
				switch (this.radio) {
					case 'wepay':
						// #ifndef MP
						return 'wepay';
						// #endif
						// #ifdef MP
						return 'minipay'
						// #endif
						break;
					case 'alipay':
						return 'alipay';
						break;
					case 'money':
						return 'money';
						break;
				}
			}
		},
		methods: {
			RadioChange(e) {
				this.radio = e.detail.value;
			},
			next() {
				let dataL = {
					id:this.typeId,
					payment:this.payType
				};
				let this_ = this;
				this.$getApi("/api/user/ticket/buy",dataL,resbuy=>{
					console.log(resbuy)
					console.log(this_.payType)
					if(this_.payType == "wepay"){
						uni.requestPayment({
						    provider: 'wxpay',
						    orderInfo: JSON.parse(resbuy.data.payinfo), //微信、支付宝订单数据
						    success: function (res) {
								this_.$getApi("/api/user/userinfo",{},resss=>{
									this_.$store.commit('login',resss.data);
								})
								if(this_.$store.state.userInfo.groupid != 0){
									uni.navigateTo({
										url:'./successMsg'
									})
								}else{
									setTimeout(()=>{
										uni.navigateTo({
											url:'../mine/addCar?ws=1'
										})
									},600)
								}
						    },
						    fail: function (err) {
						        console.log('fail:' + JSON.stringify(err));
						    }
						});
					}else
					if(this_.payType == "alipay"){
						uni.requestPayment({
						    provider: 'alipay',
						    orderInfo: resbuy.data.payinfo, //微信、支付宝订单数据
						    success: function (res) {
								this_.$getApi("/api/user/userinfo",{},resss=>{
									this_.$store.commit('login',resss.data);
								})
								if(this_.$store.state.userInfo.groupid != 0){
									uni.navigateTo({
										url:'./successMsg'
									})
								}else{
									setTimeout(()=>{
										uni.navigateTo({
											url:'../mine/addCar?ws=1'
										})
									},600)
								}
						    },
						    fail: function (err) {
						        console.log('fail:' + JSON.stringify(err));
						    }
						});
					}else
					if(this_.payType == "money"){
						this_.$getApi("/api/user/userinfo",{},resss=>{
							this_.$store.commit('login',resss.data);
						})
						if(this_.$store.state.userInfo.groupid != 0){
							uni.navigateTo({
								url:'./successMsg'
							})
						}else{
							setTimeout(()=>{
								uni.navigateTo({
									url:'../mine/addCar?ws=1'
								})
							},600)
						}
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
										url:'./successMsg'
									})
								}else{
									setTimeout(()=>{
										uni.navigateTo({
											url:'../mine/addCar?ws=1'
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
			}
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: #f0f0f0;
	}
	.bottom_c{
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		width: 750upx;
		font-size: 26upx;
		
		.pay-num{
			width: 70%;
			background-color: #fff;
			padding: 20upx 0;
			box-sizing: border-box;
			padding-left: 280upx;
			color: #333;
			.red{
				color: #f00;
			}
		}
		.btn{
			width: 30%;
			background-color: $uni-bl;
			color: #fff;
			text-align: center;
			padding: 20upx 0;
		}
	}
	.pay {
		background-color: #f0f0f0;
		height: 100vh;
		border-top: 1upx solid #eee;

		.cu-form-group {
			display: flex;
			justify-content: space-between;
			padding: 16upx 26upx;
			background-color: #fff;
			border-top: 1upx solid rgba(0,0,0,.1);
			.item{
				display: inline-flex;
				align-items:center ;
				.margin-left-xs{
					margin-left: 10upx;
					font-size: 28upx;
					color: #666;
				}
			}
		}
		.radio{
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
			padding: 20upx 30upx;

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
	}
</style>
