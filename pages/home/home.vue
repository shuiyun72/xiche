<template>
	<view class="orders">
		<view class="o_card_sy">
			<view class="info">
				<image src="../../static/img/my/xicg.png" mode="widthFix" class="img" @click="navigatorUrl('./mine')"></image>
				<view class="msg" @click="navigatorUrl('./appraise')">
					<text class="name">{{person.name}}</text>
					<view class="star_box">
						<uni-rate :value="person.star" :margin="5" :size="12"  />
						<text class="star_n">{{starC}}星</text>
					</view>
					<text class="address">所属小区 : {{person.address}}</text>

				</view>
				<view class="set" @click="navigatorUrl('../set/set')">
					<text class="iconfont iconshezhi"></text>
					<view class="set_t">
						设置
					</view>
				</view>
			</view>
			<view class="order_num">
				<view class="item" v-for="item in orderNum" @click="toClassify(item)">
					<view class="num">
						{{item.tNum}}
					</view>
					<view class="text">
						{{item.text}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="o_title_sy" v-show="isOrder && msgInfo.length > 0">
			<text class="iconfont iconshouye_shugang_shijiantixing c_or"></text><text class="text">待接单</text>
		</view>
		
		<view class="o_card_list" v-show="isOrder && msgInfo.length > 0" v-for="item in msgInfo">
			<view class="o_title">
				<text>单次外部清洗</text>
				<text>待接单</text>
			</view>
			<view class="o_p1">
				小型汽车 豫A668899
			</view>
			<view class="o_msg_info">
				<text class="iconfont iconyonghuming"><text>{{item.name}}</text></text>
			</view>
			<view class="o_msg_info">
				<text class="iconfont icondianhua"><text>{{item.phone}}</text></text>
			</view>
			<view class="o_msg_info">
				<text class="iconfont iconshijian"><text>{{item.time}}</text></text>
			</view>
			<view class="o_msg_info">
				<text class="iconfont iconshijian"><text>{{item.p}}</text></text>
			</view>
			<view class="o_msg_info">
				<text class="iconfont iconlocation"><text>{{item.addr}}</text></text>
			</view>
			
			<view class="sub_btn">
				<navigator url="../orders/orderReject" class="nav_to">
					<button class="btn round sm orange_n">拒绝接单</button>
				</navigator>
				<navigator url="./orderReject" class="nav_to">
					<button class="btn round sm orange" @click="toosC">确认接单</button>
				</navigator>
			</view>
			<view class="o_stop">
				<view @click="isOrderHandle(false)">
					<text>停止</text>
					<text>接单</text>
				</view>
				
			</view>
		</view>
		<view class="o_start" v-show="!isOrder">
			<view class="o_start_b">
				<view @click="isOrderHandle(true)">
					<text>开始</text>
					<text>接单</text>
				</view>
			</view>
		</view>
		<view class="o_start" v-show="isOrder && msgInfo.length == 0 ">
			<view class="o_start_b">
				<view @click="isOrderHandle(false)">
					<text>停止</text>
					<text>接单</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isOrder:false,
				person:{
					name: "张世通",
					star: 5,
					address: "升龙又一城"
				},
				orderNum:[
					{tNum:12,text:"今日单数",type:1},
					{tNum:88,text:"本月单数",type:2},
					{tNum:590,text:"累计单数",type:3}
				],
				msgInfo: []
			}
		},
		mounted() {

		},
		computed: {
			starC() {
				if (this.person.star == 5) {
					return "五"
				}
			}
		},
		methods: {
			isOrderHandle(el){
				if(el){
					this.$getApi('operator/start',{},res=>{
						this.$msg(res.msg);
						this.isOrder = true;
						let orderData = {
							type:1,
							page:1,
							paginate:6
						}
						this.$getApi('operator/orderList',orderData,ress => {
							console.log(ress)
						})
					})
				}else{
					this.$getApi('operator/stop',{},res=>{
						this.$msg(res.msg);
						this.isOrder = false;
					})
				}
			},
			navigatorUrl(url){
				uni.navigateTo({
					url:url
				})
			},
			toosC(el){
				if(el == 'jd'){
					uni.showToast({
						title: '接单成功 , 请准时到达指定地点',
						duration: 2000,
						icon:""
					});
				}
			},
			toClassify(item){
				console.log(item)
				uni.navigateTo({
					url:'../classify/classify?item='+JSON.stringify(item)
				})
				
			}
		}
	}
</script>
<style lang="scss">
	page{
		background-color: $uni-def;
	}
	.orders{
		background-color: $uni-def;
		height: 70vh;
		display: flex;
		flex-direction: column;
	}
	.o_start{
		display: flex;
		justify-content: center;
		margin-top: 300upx;
		.o_start_b{
			background-color: $uni-or;
			width: 200upx;
			height: 200upx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			border-radius: 50%;
			color: #fff;
			text{
				display: block;
				font-size: 48upx;
				height:58upx;
				line-height: 1;
			}
		}
	}
	.o_card_list{
		background-color: #fff;
		box-shadow: 2upx 0upx 4upx 4upx #eee;
		width: 94%;
		margin: 0 auto;
		border-radius: 10upx;
		box-sizing: border-box;
		padding: 24upx 30upx;
		position:relative;
		.o_stop{
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
			text{
				display: block;
				height:32upx;
				line-height: 1;
			}
		}
		.sub_btn{
			text-align: right;
			padding-top: 30upx;
			border-top: 1upx solid #eee;
			margin-top: 70upx;
			.nav_to{
				width: 30%;
				display: inline-block;
				margin-left: 20upx;
			}
		}
		.o_title{
			display: flex;
			justify-content: space-between;
			color: $uni-or ;
			font-size: 34upx;
			border-bottom: 2upx solid #eee;
			padding-bottom: 12upx;
		}
		.o_p1{
			font-size: 36upx;
			padding: 24upx 0;
		}
		.o_msg_info{
			.iconfont{
				font-size: 32upx;
				color: #333;
				text{
					padding-left: 12upx;
				}
			}
		}
	}
	.o_title_sy{
		padding: 16upx 0 16upx 6upx;
		.iconfont{
			font-size: 36upx;
		}
		.text{
			font-size: 32upx;
		}
	}
	.o_card_sy {
		background-color: $uni-or;
		padding: 26upx 26upx 32upx;
		.order_num{
			display: flex;
			justify-content: space-between;
			text-align: center;
			padding-top: 40upx;
			color: #fff;
			.num{
				font-size: 46upx;
			}
			.text{
				font-size: 32upx;
				padding-top: 6upx;
			}
		}
		.info {
			display: flex;
			color: #eee;
			justify-content: space-between;
			.set{
				text-align: center;
				.iconshezhi{
					font-size: 30upx;
				}
				.set_t{
					font-size: 22upx;
				}
			}
			.msg{	
				width:60% ;
				.name{
					font-size: 32upx;
				}
				.star_box{
					display: flex;
					align-items:baseline;
					position: relative;
					left: -10upx;
					.star_n{
						font-size: 22upx;
						padding-left: 10upx;
					
					}
					
				}
				.address{
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
</style>
