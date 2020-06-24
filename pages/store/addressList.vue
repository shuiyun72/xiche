<template>
	<view class="page">
		<view class="add_list_address" v-for="i in dataList">
			<view class="p_list">
				<view class="item_p" v-for="it in i.park">
					<text class="iconfont icontingche"></text>
					<text>{{it.name}}号停车位</text>
				</view>
			</view>
			<view class="info">
				{{i.province_name}}{{i.city_name}}{{i.area_name}}{{i.street_name}}{{i.house_name}}{{i.house_detail}}
			</view>
			<view class="part2">
				<view class="item2">
					<navigator :url="'../mine/addAddress?item='+JSON.stringify(i)">
						<text class="iconfont icontianxiegongdan-kuozhan-hebing"></text>
						<text>编辑</text>
					</navigator>
				</view>
				<view class="item2" @click="deleteP(i)">
					<text class="iconfont iconqingkongshanchu"></text>
					<text>删除</text>
				</view>
			</view>
		</view>
		<navigator url="../mine/addAddress">
			<view class="add_car_btn">
				<text class="iconfont icontianjia"></text>
				<text>新建地址</text>
			</view>
		</navigator>
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
				dataList: [],
				item:{}
			}
		},
		mounted() {
			this.addressInit();
		},
		methods: {
			closeJuan(){
				this.$refs['juan0'].close();
			},
			deleteBtn(){
				this.$getApi("/api/user/address/del",{id:this.item.id},resl=>{
					// this.$refs['juan0'].close();
					this.addressInit()
				})
			},
			addressInit(){
				this.$getApi("/api/user/address/list",{},res=>{
					console.log(res)
					this.dataList = res.data;
					// uni.navigateTo({
					// 	url:'../mine/addAddress'
					// })
				});
			},
			deleteP(item){
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
						this_.$getApi("/api/user/address/del",{id:this_.item.id},resl=>{
							// this.$refs['juan0'].close();
							this_.addressInit()
							this_.$msg("删除成功")
						})
						}
					}
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
	.add_car_btn{
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: $uni-bl;
		width: 750upx;
		text-align: center;
		color: #fff;
		padding: 26upx 0;
		font-size: 36upx;
		.icontianjia{
			margin-right: 20upx;
		}
	}
	.page{
		background-color: #f0f0f0;
		min-height: 100vh;
	}
	.add_list_address {
		background-color: #fff;
		margin-bottom: 20upx;
		.part2{
			display: flex;		
			color: #999;
			padding: 24upx 0 16upx 360upx;
			margin-top: 10upx;
			border-top: 1upx solid #eee;
			.item2{
				margin-left: 40upx;
				.iconfont{
					margin-right: 20upx;
				}
			}
		}
		.info{
			font-size: 28upx;
			color: #666;
			padding: 0upx 26upx 10upx;
		}
		.p_list {
			display: flex;
			flex-wrap: wrap;
			padding: 20upx 26upx;

			.item_p {
				width: 46%;
				margin-bottom: 6upx;

				.icontingche {
					font-size: 28upx;
					margin-right: 10upx;
				}
			}
		}
	}
</style>
