<template>
	<view class="orders">
		<view class="o_card_sy">
			<view class="info">
				<image :src="httpp+userInfo.avatar" mode="widthFix" class="img" @click="navigatorUrl('./mine')"></image>
				<view class="msg" @click="navigatorUrl('./appraise')">
					<text class="name">{{homeInfo.nickname}}</text>
					<view class="star_box">
						<uni-rate :value="homeInfo.star" :margin="5" :size="12"  />
						<text class="star_n">{{starC}}星</text>
					</view>
					<text class="address">所属小区 : {{userInfo.house && userInfo.house.name}}</text>

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
		
		<view class="o_title_sy" v-show="orderState && msgInfo.length > 0">
			<text class="iconfont iconshouye_shugang_shijiantixing c_or"></text><text class="text">待接单</text>
		</view>
		
		<view class="o_card_list" v-for="item in msgInfo" :key="item.id" v-if="orderState && msgInfo.length > 0" >
			<view class="o_title">
				<text>{{item.title}}</text>
				<text>待接单</text>
			</view>
			<view class="o_p1">
				{{item.xing}} {{item.carNum}}
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
				<text class="iconfont icontingche"><text>{{item.location}}</text></text>
			</view>
			<view class="o_msg_info">
				<text class="iconfont iconlocation"><text>{{item.address}}</text></text>
				<!-- <text class="iconfont iconzhifeiji" v-show="item.stateN==2 || item.stateN==3" @click.stop="toPosition(item)"></text> -->
			</view>
			
			<view class="sub_btn">
				<navigator :url="'../orders/orderReject?item='+JSON.stringify(item)" class="nav_to">
					<button class="btn round sm orange_n">拒绝接单</button>
				</navigator>
				<button class="btn round sm orange nav_to" @click="toosC(item)">确认接单</button>
			</view>
			<view class="o_stop">
				<view @click="isOrderHandle(false)">
					<text>停止</text>
					<text>接单</text>
				</view>
				
			</view>
		</view>
		<view class="o_start" v-show="!orderState">
			<view class="o_start_b">
				<view @click="isOrderHandle(true)">
					<text>开始</text>
					<text>接单</text>
				</view>
			</view>
		</view>
		<view class="o_start" v-show="orderState && msgInfo.length == 0">
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
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				person:{
					name: "张世通",
					star: 5,
					address: "升龙又一城"
				},
				msgInfo: []
			}
		},
		mounted() {
			this.getInit();
			
		},
		computed: {
			...mapState(['hasLogin','userInfo','homeInfo',"httpp"]),
			orderState(){
				return this.$store.getters.orderState
			},
			starC() {
				switch(this.homeInfo.star){
					case 0:return "零";break;
					case 1:return "一";break;
					case 2:return "二";break;
					case 3:return "三";break;
					case 4:return "四";break;
					case 5:return "五";break;
				}
			},
			orderNum(){
				if(this.homeInfo){
					return [
						{tNum:this.homeInfo.day_order,text:"今日单数",type:1},
						{tNum:this.homeInfo.month_order,text:"本月单数",type:2},
						{tNum:this.homeInfo.total_order,text:"累计单数",type:3}
					]
				}else{
					return []
				}
			}
		},
		methods: {
			getInit(){
				this.$getApi("/api/operator/profile",{},res=>{
					this.$store.commit('setHome',res.data);
					console.log(res)
				})
				
			},
			isOrderHandle(el){
				if(el){	
					this.$getApi('/api/operator/start',{},res=>{		
						let orderData = {
							type:1,
							page:1,
							paginate:100
						}
						this.$getApi('/api/operator/orderList',orderData,ress => {
							console.log(ress)
							if(ress.data.data.length > 0){
								this.msgInfo = ress.data.data;
								
							}else{
								this.msgInfo = []
							}
							this.$store.commit('setState',1)
						})
					})
				}else{
					this.$getApi('/api/operator/stop',{},res=>{
						this.$store.commit('setState',0)
					})
				}
			},
			navigatorUrl(url){
				uni.navigateTo({
					url:url
				})
			},
			toosC(el) {
				this.$getApi("/api/operator/order/confirm", {id:el.id}, res => {
					uni.showToast({
						title: '接单成功 , 请准时到达指定地点',
						duration: 2000,
						icon: "none",
						mask: false
					});
					this.getInit();
				})
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
<style lang="scss" scoped>
	page{
		background-color: $uni-def;
	}
	.orders{
		background-color: $uni-def;
		min-height: 90vh;
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
		margin: 0 auto 26upx;
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
