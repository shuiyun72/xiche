<template>
	<view class="orders">
		<view class="tab_list_sy">
			<view class="item" v-for="(item,index) in tabList" :class="{'active':index == tabSel}" @click="selectTab(item,index)">{{item.text}}</view>
		</view>
		<view class="no_order"  v-if="msgInfo.length == 0">
			<image src="../../static/img/zanwdd.png" mode="widthFix"></image>
		</view>
		<view class="o_card_list" v-for="item in msgInfo" v-if="msgInfo.length > 0">
			<view @click="toDetail(item)">
				<view class="o_title">
					<text class="tt_t"><text class="iconfont icon-"></text> <text>{{item.title}}</text> </text>
					<text>{{itemState(item.stateN)}}</text>
				</view>
				<view class="o_p1">
					<view class="">
						{{item.xing}} {{item.carNum}}
					</view> 
					<view class="">
						￥{{item.amount}}
					</view>
				</view>
				<view class="o_msg_info">
					<text class="iconfont iconshijian"><text>{{item.time}}</text></text>
				</view>
				<view class="o_msg_info">
					<text class="iconfont icontingche"><text>{{item.location}}停车位</text></text>
				</view>
				<view class="o_msg_info">
					<text class="iconfont iconlocation"><text>{{item.address}}</text></text>
				</view>
				<view class="o_msg_info">
					<text class="iconfont iconyonghuming"><text>洗车工{{item.operator ? item.operator.nickname :''}}</text></text>
				</view>
				<view class="o_msg_info flex_bot">
					<text>订单编号 {{item.code}}</text>
					<text class="red_money">实付: ￥{{item.amount}}</text>
				</view>		
			</view>
			<view class="sub_btn info" v-if="item.stateN > 4">
				<view class="blue">
					{{stateMsgFor(item)}}
				</view>
			</view>
			<view class="sub_btn" v-if="tabSel==1 || tabSel==0">
				<view class="nav_to">
					<button class="btn blue sm blue_n round" @click="qxOrderL(item)">取消订单</button>
				</view>
				<view class="nav_to" v-if="tabSel==0">
					<button class="btn blue sm blue round" @click="payTrue(item)">立即付款</button>
				</view>
			</view>
			<view class="sub_btn" v-if="tabSel==3">
				<view class="nav_to">
					<button class="btn blue sm blue_n round" @click="tellKf">联系客服</button>
				</view>
				<navigator :url="'../orders/appraise?item='+JSON.stringify(item)" class="nav_to">
					<button class="btn blue sm blue round" >评价订单</button>
				</navigator>
			</view>
		</view>
		<uni-popup type="center" ref="juan0">
			<view class="juan_body">
				<view class="iconfont iconguanbi" @click.stop="closeJuan(0)"></view>
				<view class="ju_title">
					去完善信息
				</view>
				<view class="t">
					您还没有完善信息,需完善信息,
					才能查看,现在去填写?
				</view>
				<view class="t_btn">
					<button class="round btn sm default" @click.stop="closeJuan(0)">取消</button>
					<button class="round btn sm  blue" @click.stop="addCarH">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state: 1,
				tabSel: 1,
				tabList: [
					{
						text: "待支付",
						type: 0
					},{
						text: "已确定",
						type: 1
					},
					{
						text: "作业中",
						type: 2
					},
					{
						text: "已完成",
						type: 3
					},
					{
						text: "特殊订单",
						type: 4
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
				msgInfo: [],
				timersL:undefined
			}
		},
		mounted() {
			
		},
		onShow() {
			console.log("ssss")
			if (!this.userInfo || this.userInfo.groupid == 0) {
				this.$nextTick(()=>{
					// this.$refs['juan0'].open()
					let this_ = this;
					uni.showModal({
						title: "去完善信息",
						content: "您还没有完善信息,需完善信息,才能查看,现在去填写?",
						confirmText: "确定",
						cancelText: "取消",
						success: function(res) {
							if (res.confirm) {
								// #ifdef MP
								this_.getUserInfoWX();
								// #endif
								// #ifndef MP
								uni.navigateTo({
									url:'../mine/addCar?ws=1'
								})
								// #endif
							}else{
								uni.switchTab({
									url:'../home/home'
								})
							}
						}
					})
				})
				
			}else{
				// try{
				// 	this.$refs['juan0'].close()	
				// }catch(e){
				// 	//TODO handle the exception
				// }
			}
			let this_ = this;
			if(this.hasLogin){
				this.timersL = setInterval(()=>{
					this_.getOrder(this_.tabSel);
				},1000)
			}
			console.log(this)
		},
		onHide() {
			console.log(this)
			console.log("ssscc")
			let this_ = this;
			clearInterval(this_.timersL);
			this.timersL = undefined;
		},
		filters: {
			psd: function(value) {
				if (!value) return ''
				value = value.toString()
				return value.slice(0, 3) + '******'
			}
		},
		onLoad() {
			 uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			let this_ = this;
			setTimeout(function () {
				uni.stopPullDownRefresh();
				if(this_.hasLogin){
					this_.getOrder(this_.tabSel);
				}
			}, 300);
		},
		computed: {
			starC() {
				if (this.person.star == 5) {
					return "五"
				}
			},
			userInfo(){
				return this.$store.state.userInfo;
			},
			hasLogin(){
				return this.$store.state.hasLogin
			}
		},
		methods: {
			getUserInfoWX() {
				let this_ = this;
				if (!this.$store.state.hasLogin) {
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							console.log(loginRes);
							this_.$getApiTime("/api/auth/getopenid", {
								code: loginRes.code
							}, res => {
								console.log(res)
								if (res.data.is_bind == 0) {
									console.log("11")
									uni.getUserInfo({
										provider: 'weixin',
										success: function(infoRes) {
											console.log(infoRes)
											console.log('用户昵称为：' + infoRes.userInfo.nickName);
											uni.navigateTo({
												url: '../login/login?xcx=ws&openid=' + res.data.openid + '&nickname=' + infoRes.userInfo.nickName
											})
										} 
									});
								} else
								if (res.data.is_bind == 1){
									console.log(res)
									this_.$store.commit('login', res.data);
									setTimeout(() => {
										this_.getInit(() => {
											uni.navigateTo({
												url:'../mine/addCar?ws=1&xcx=ws'
											})
										});
									}, 500)
								}
							}, "false")
							// 获取用户信息
						}
					});
				}else{
					uni.navigateTo({
						url:'../mine/addCar?xcx=ws&ws=1'
					})
				}
			},
			payTrue(item){
				let itemS = [].concat(item);
				uni.navigateTo({
					url:"./orderTrue?nc=1&item="+JSON.stringify(itemS)
				})
			},
			
			//显示状态
			stateMsgFor(item){
				// return "121212";
				if(item.userticket && Number(item.amount) > 0){
					return "洗车券和现金已退还至原账户"
				}else
				if(item.userticket){
					return "洗车券已退还至原账户"
				}else
				if(Number(item.amount)>0){
					return "现金已退还至原账户"
				}
			},
			itemState(n){
				switch (n) {
					case 1 : 
						if(this.tabSel == 0 ){
							return "未支付成功" ;
						}else
						if(this.tabSel == 1){
							return "订单已确认" ;
						}
					break;
					case 2 : return "订单已确认" ;break;
					case 3 : return "正在洗车中" ;break;
					case 4 : return "已完成" ;break;
					case 5 : return "洗车工已取消" ;break;
					case 6 : return "洗车工已取消" ;break;
					case 7 : return "本人取消订单" ;break;
				}
			},
			closeJuan() {
				uni.switchTab({
					url:'../home/home'
				})
			},
			addCarH(){
				// #ifdef MP
				this.getUserInfoWX();
				// #endif
				// #ifndef MP
				uni.navigateTo({
					url:'../mine/addCar?ws=1'
				})
				// #endif
			},
			getOrder(type){
				let orderData = {
					type:type,
					page:1,
					paginate:100
				}
				this.$getApi('/api/user/order/list',orderData,res=>{
					console.log(res.data)
					this.msgInfo = res.data.data
				})
			},
			qxOrderL(item){
				let this_ = this;
				uni.showModal({
				    title: '取消订单',
				    content: '是否确定取消订单?取消订单后现金将退至余额账户',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							this_.$getApi('/api/user/order/cancle',{id:item.id},res=>{
								this_.getOrder(this_.tabSel);
							})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			tellKf(){
				let this_ = this;
				uni.showModal({
					title: "联系客服",
					content: "客服电话: " + this_.userInfo.service_tel,
					confirmText: "确定",
					confirmColor: "#208EFF",
					cancelText: "取消",
					success: function(res) {
						if (res.confirm) {
							uni.makePhoneCall({
								phoneNumber: this_.userInfo.service_tel
							});
						}
					}
				})
			},
			reLaunch(url) {
				uni.reLaunch({
					url: url
				})
			},
			selectTab(el, i) {
				this.tabSel = i;
				this.getOrder(el.type);
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

<style lang="scss" scoped>
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
				color: $uni-bl;
				border-bottom: 6upx solid $uni-bl;
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
			background-color: $uni-bl;
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
			background-color: $uni-bl;
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
			margin-top: 20upx;
			&.info{
				text-align: left;
			}
			.nav_to {
				width: 30%;
				display: inline-block;
				margin-left: 20upx;
			}
		}

		.o_title {
			display: flex;
			justify-content: space-between;
			color: $uni-bl;
			font-size: 34upx;
			border-bottom: 2upx solid #eee;
			padding-bottom: 12upx;
			align-items: center;
			.tt_t{
				color: #333;
				display: inline-flex;
				align-items: center;
				font-size: 28upx;
				.icon-{
					font-size: 60upx;
					color: $uni-bl;
					position: relative;
					top: 10upx;
				}
			}
			
		}

		.o_p1 {
			font-size: 32upx;
			padding: 24upx 0;
			display: flex;
			justify-content: space-between;
		}

		.o_msg_info {
			padding: 8upx 0;
			&.flex_bot{
				display:flex;
				justify-content: space-between;
				font-size: 28upx;
				padding-top: 10upx;
				.red_money{
					color: #f00;
					
				}
			}
			// font-size: 32upx;
			.iconfont {
				font-size: 32upx;
				color: #333;

				&.iconzhifeiji {
					color: $uni-bl;
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
				color: $uni-bl;
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
		background-color: $uni-bl;
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
		color: $uni-bl;
	}

	.ml10p {
		margin-left: 10upx;
	}
	.no_order{
		display: flex;
		justify-content: center;
		align-items: center;
		height:70vh ;
	}
</style>
