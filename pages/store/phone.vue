<template>
	<view>
		<uni-nav-bar color="#333333" background-color="#ffffff" :status-bar="true" left-icon="arrowleft" title="手机号库" @clickLeft="back" />
		<view class="car_list">
			<view class="item" v-for="item in phoneList" @click="selPhone(item)">
				<view class="part0">
					<view class="name">
						{{item.name}}
					</view>
					<view class="phone">
						{{item.phone}}
					</view>
				</view>
				<view class="part2">
					<view class="item2" @click.stop="editP(item)">
						<text class="iconfont icontianxiegongdan-kuozhan-hebing"></text>
						<text>编辑</text>
					</view>
					<view class="item2" @click.stop="deleteP(item)">
						<text class="iconfont iconqingkongshanchu"></text>
						<text>删除</text>
					</view>
				</view>
			</view>
		</view>
		<view class="add_car_btn" @click="addItem">
			<text class="iconfont icontianjia"></text>
			<text>新建手机号</text>
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
				phoneList: [],
				from:"",
				item:{}
			}
		},
		onShow() {
			this.init();
		},
		onLoad(ph) {
			this.from = ph.from;
		},
		// onBackPress() {
		    
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
			closeJuan(){
				this.$refs['juan0'].close();
			},
			deleteBtn(){
				this.$getApi("/api/user/user/del",{id:this.item.id},resl=>{
					this.$refs['juan0'].close();
					this.init()
				})
			},
			addItem(){
				if(this.from){
					uni.navigateTo({
						url:"../store/addPhone?from=toOrder"
					})
				}else{
					uni.navigateTo({
						url:"../store/addPhone"
					})
				}
			},
			selPhone(item) {
				if(this.from){
					this.$store.commit('setPhone', {
						name: item.phone,
						id: item.id
					});
					uni.navigateTo({
						url:"../orders/toOrder"
					})
				}
			},
			init() {
				this.$getApi("/api/user/user/list", {}, res => {
					console.log(res)
					this.phoneList = res.data
				})
			},
			deleteP(item) {
				// this.$refs['juan0'].open();
				this.item = item;
				let this_ = this;
				uni.showModal({
					title: "删除",
					content: "是否确认删除?",
					confirmText: "确定",
					cancelText: "取消",
					success: function(res) { 
						if (res.confirm) {
						this_.$getApi("/api/user/user/del",{id:this_.item.id},resl=>{
							// this.$refs['juan0'].close();
							this_.init();
							this_.$msg("删除成功");
						})
						}
					}
				})
			},
			editP(item) {
				uni.navigateTo({
					url: '../store/addPhone?item=' + JSON.stringify(item)
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

			.part0 {
				.name {
					font-size: 36upx;
					font-weight: bold;
					color: #666;
				}

				.phone {
					padding: 10upx 0;
					color: #999;
				}
			}
		}
	}
</style>
