<template>
	<view>
		<view class="main flex flex-direction">
			<view class="main_one">
				<app-tabs :tabs="tabs" v-model="tabIndex" @change="changeIndex"></app-tabs>
			</view>
			<view class="main_two" v-if="list.length">
				<view class="row mr-bt40 flex flex-direction" v-for="(item, k1) in 3" :key="k1" @click="skip(item.id,k1)">
					<view class="row_one flex flex-direction bd-b-eee align-center" @click="skip">
						<view class="width100 one flex  justify-between bd-b-eee align-center fs-28">
							<view class="left flex align-center ">
								<view class="img">
									<image src="../../../static/order/dancwb.png"></image>
								</view>
								<view class="title  cl-333 mr-lt20">
									单词外部清洗
								</view>
							</view>
							<view class="right cl-blue ">

								{{tabIndex==0?"订单已确认":tabIndex==1?"正在洗车中":tabIndex==2?"已完成":tabIndex==3?"已取消":''}}

							</view>
						</view>
						<view class="two width100 flex align-center justify-between cl-333 mr-top30 mr-bt40">
							<view class="left fs-30 ">
								<text>擎车型号</text>
								<text class="mr-lt30">汽车车牌号</text>

							</view>
							<view class="right fs-22">

								￥18

							</view>
						</view>
						<view class="thr width100">
							<view class="img">
								<image src="../../../static/order/shij.png"></image>
							</view>
							<view class="title">
								单词外部清洗
							</view>
						</view>
						<view class="thr width100">
							<view class="img">
								<image src="../../../static/order/tingcw.png"></image>
							</view>
							<view class="title">
								单词外部清洗
							</view>
						</view>
						<view class="thr width100">
							<view class="img">
								<image src="../../../static/order/diz.png"></image>
							</view>
							<view class="title">
								单词外部清洗
							</view>
						</view>
						<view class="thr width100">
							<view class="img">
								<image src="../../../static/order/reny.png"></image>
							</view>
							<view class="title">
								单词外部清洗
							</view>
						</view>
						<view class="four width100 flex  justify-between align-center">
							<view class="left fs-28 cl-333">
								订单编号:1234568790234
							</view>
							<view class="right fs-22">
								<text class="">实付款：</text>
								<text class="">￥</text>
								<text class="fs-26">0</text>
							</view>
						</view>
					</view>
					<view class="row_two ">
						<view v-if="tabIndex==0" class="tab0 width100 flex  align-center mr-bt20 mr-top20 justify-end" style="width:100%;justify-content: space-between;">
                             <button plain class="cancel cl-blue" @click="relate(0)">取消订单</button>
							
						</view>
						<view class="tab3 cl-blue fs-28 flex  align-center mr-bt20 mr-top20" v-if="tabIndex==3">
							洗车劵已退还至账户

						</view>
						<view class="tab2 width100 flex  align-center mr-bt20 mr-top20 justify-end" v-if="tabIndex==2">
							<button class="connect mr-rt30 cl-blue"  plain  @click="relate(1)">联系客服</button>
							<button class="ela" @click="relate(2)">评价订单</button>

						</view>
						

					</view>
				</view>
				<load-more v-show="type==1 && discountList.length == 0 && tabIndex == 0" :loadingType="loadingType"></load-more>

			</view>
		
		    <view  style="background-color: white;" 
			v-else="list.length" class="flex flex-direction align-center main_two">
				
					<image src="../../../static/order/zanwdd.png" style="margin-top:150rpx;width:628rpx;height: 446rpx;"></image>
			        <!-- <text class="mr-top20 cl-blue">暂无订单</text> -->
			</view>
		</view>


	</view>
</template>

<script>
	import appTabs from "@/components/app-tabs/app-tabs"
	import loadMore from '@/components/load-more/load-more.vue'
	export default {
		components: {
			appTabs,
			loadMore
		},
		data() {
			return {
				nextPage: "",
				loadingType: 0,
				tabs: ["已确认", "作业中", "已完成", "特殊订单"],
				tabIndex: 0, //默认常用地址

				list: [],
			}
		},
		onLoad(e) {
             if(e.navIndex){
				 this.navIndex = e.navIndex;
			 }

		},

		//触底加载更多数据
		onReachBottom() {
			if (this.nextPage) {
				if (this.tabIndex == 0) {
					this.init(this.nextPage);
				} else {
					//发票
					this.getList(this.nextPage);
				}

			}
		},
		methods: {
			changeIndex(e) {
				console.log(e)
				this.tabIndex = e;
			},
			skip(){
				uni.navigateTo({
					url:"/pages/orderPage/orderDetails/orderDetails?type="+this.tabIndex
				})
			},
			relate(index){
				switch(index){
					case 0:
					uni.showModal({
						title:"取消订单",
						content:"是否确认取消订单？取消订单后现金将退至余额账户",
						success: () => {
							
						},
						fail: () => {
							
						}
					});
					break;
					case 1:
					uni.showModal({
						title:"联系客服",
						content:"客服电话：0374-2935009",
						success: () => {
							
						},
						fail: () => {
							
						}
					});
					break;
					case 2:
					uni.navigateTo({
						url:"/pages/orderPage/ela/ela"
					})
					break;
				}
			}
		}
	}
</script>

<style lang="scss">
	.add_msg {
		position: fixed;
		bottom: 100rpx;
		margin: 0 45rpx;
		width: 660rpx;
		height: 88rpx;
		background: linear-gradient(-7deg, rgba(178, 151, 108, 1), rgba(188, 162, 119, 1));
		border: 1px solid rgba(215, 215, 215, 1);
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;

		color: rgba(255, 255, 255, 1);
	}

	.main {
		padding-bottom: 0rpx;
		background-color: #eee;
		min-height: 100vh;

		.main_one {
			position: fixed;
			top: 0;
			width: 100vw;
			height: 88rpx;
			border-top: 1px solid #eee;
            flex-shrink: 0;
		}

		.main_two {
			margin-top: 110rpx;

		}
	}
	
	.main_two{
		padding:30rpx 24rpx;
		
		flex:1;
		.row{
			padding:0 20rpx;
			background-color: white;
			border-radius: 20rpx;
			.row_one{
				
				.one{
					height: 80rpx;
					.img{
						width:39rpx;
						height:46rpx;
						margin-right: 20rpx;
						image{
							width:100%;
							height: 100%;
						}
					}
					
				}
				.thr{
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;
					.img{
						width:24rpx;
						height:24rpx;
						image{
							width:100%;
							height: 100%;
						}
					}
					.title{
						font-size: 28rpx;
						color: #333;
						margin-left:10rpx;
					}
				}
				
				.four{
					margin:8rpx 0;
					.left{
						
					}
					
					.right{
					    color:#FF0031;
					}
				}
			}
			
			.row_two{
				display: flex;
				align-items: center;
				height: 90rpx;
				position: relative;
				button{
					width:170rpx;
					height:58rpx;
					font-size: 24rpx;
					border-radius:29rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					right:20rpx;
				}
				.tab2 .connect{
					
					right:210rpx;
				}
				.cancel,.connect{
					border:1px solid rgba(31,141,255,1);
					color:rgba(31,141,255,1);
				}
				.ela{
					background:rgba(31,141,255,1);
					color:white;
				}
			}
		}
	}
</style>
