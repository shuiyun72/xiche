<template>
	<view>
		<uni-nav-bar color="#333333" background-color="#ffffff" 
		:status-bar="true" left-icon="arrowleft" title="车辆库" @clickLeft="back" />
		<view class="car_list">
			<view class="item" v-for="i in swMsg" @click="selectCar(i)">
				<view class="part1">
					<image :src="httpp + i.checolor.cover" mode="widthFix" class="l_img"></image>
					<view class="content">
						<view class="t1">
							<view class="l">{{i.chepai}}</view>
							<view class="r">{{i.chexing.name}}</view>
						</view>
						<view class="t1">
							<view class="r">{{i.checolor.name}}</view>
							<view class="r">{{i.chebrand.name}}</view>
						</view>
					</view>
					<image :src="i.img ? httpp + i.img :'../../static/img/youc.png'" mode="widthFix" class="r_img"></image>
				</view>
				<view class="part2">
					<view class="item2" @click.stop="editCar(i)">
						<text class="iconfont icontianxiegongdan-kuozhan-hebing"></text>
						<text>编辑</text>
					</view>
					<view class="item2" @click.stop="deletePs(i)">
						<text class="iconfont iconqingkongshanchu"></text>
						<text>删除</text>
					</view>
				</view>
			</view>
		</view>
			<view class="add_car_btn"  @click="addItem">
				<text class="iconfont icontianjia"></text>
				<text>新建车辆</text>
			</view>
		<uni-popup type="center" ref="juan0">
			<view class="juan_body">
				<view class="iconfont iconguanbi" @click="closeJuan"></view>
				<view class="ju_title">
					删除
				</view>
				<view class="t">
					是否确认删除?
				</view>
				<view class="t_btn">
					<button class="round btn sm default" @click="closeJuan">取消</button>
					<button class="round btn sm  blue" @click="deleteBtn">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swMsg: [],
				from: "",
				item:{}
			}
		},
		onShow() {
			this.$getApi("/api/user/car/list", {}, res => {
				this.swMsg = res.data
			})
		},
		computed:{
			httpp(){
				return this.$store.state.httpp;
			}
		},
		onLoad(ph) {
			console.log(ph)
			if (ph.from) {
				this.from = ph.from;
			}
		},
		// onBackPress() {  
		//   if(this.from) {  
		//     uni.navigateTo({
		//     	url:"../orders/toOrder"
		//     })  
		//     return true;  
		//   }else{
		// 	uni.switchTab({
		// 		url:"../mine/mine"
		// 	})  
		// 	return true; 
		//   }  
		// },
		methods: {
			back(){
				if(this.from) {  
					uni.navigateTo({
						url:"../orders/toOrder"
					})  
					return true;  
				}else{
					uni.switchTab({
						url:"../mine/mine"
					})  
					return true; 
				} 
			},
			addItem(){
				if(this.from){
					uni.navigateTo({
						url:"../mine/addCar?from=toOrder"
					})
				}else{
					uni.navigateTo({
						url:"../mine/addCar"
					})
				}
			},
			closeJuan(){
				// this.$refs['juan0'].close();
			},
			deleteBtn(){
				this.$getApi("/api/user/car/del",{id:this.item.id},resl=>{
					// this.$refs['juan0'].close();
					this.$getApi("/api/user/car/list", {}, res => {
						this.swMsg = res.data
					})
				})
			},
			selectCar(e) {
				console.log(e)
				if (this.from) {
					this.$store.commit('setSelCar', {
						name: e.chepai,
						id: e.id
					})
					uni.navigateBack();
				}	
			},
			editCar(el) {
				console.log(el)
				uni.navigateTo({
					url: '../mine/addCar?item=' + JSON.stringify(el)
				})
			},
			deletePs(item) {
				// this.$refs['juan0'].open();
				let this_ = this;
				uni.showModal({
					title: "删除",
					content: "是否确认删除?",
					confirmText: "确定",
					cancelText: "取消",
					success: function(res) {
						if (res.confirm) {
						this_.$getApi("/api/user/car/del",{id:this_.item.id},resl=>{
							// this.$refs['juan0'].close();
							this_.$getApi("/api/user/car/list", {}, res => {
								this_.swMsg = res.data;
								this_.$msg("删除成功")
							})
						})
						}
					}
				})
				this.item = item;
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
	.add_car_btn {
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: $uni-bl;
		width: 750upx;
		text-align: center;
		color: #fff;
		padding: 26upx 0;
		font-size: 36upx;

		.icontianjia {
			margin-right: 20upx;
		}
	}

	.car_list {
		min-height: 100vh;
		background-color: #f0f0f0;
		border-top: 1upx solid #eee;
		padding-bottom: 200upx;
		.item {
			background-color: #fff;
			padding: 30upx 26upx 20upx;
			margin-bottom: 20upx;

			.part2 {
				display: flex;
				color: #999;
				padding: 24upx 0 16upx 360upx;
				margin-top: 10upx;
				border-top: 1upx solid #eee;

				.item2 {
					margin-left: 40upx;

					.iconfont {
						margin-right: 20upx;
					}
				}
			}

			.part1 {
				display: flex;

				.l_img {
					width: 90upx;
				}

				.content {
					width: 450upx;

					.t1 {
						display: flex;
						font-weight: bold;
						color: #666;
						margin-bottom: 26upx;
						padding: 0 10upx;

						.l {
							width: 200upx;
						}

						.r {
							width: 200upx;
						}
					}
				}

				.r_img {
					width: 160upx;
					height: 160upx;
				}
			}
		}
	}
</style>
