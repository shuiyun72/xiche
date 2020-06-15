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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [{}]
			}
		},
		mounted() {
			this.addressInit();
		},
		methods: {
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
				let this_ = this;
				uni.showModal({
				    title: '删除',
				    content: '是否确认删除?',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							this_.$getApi("/api/user/address/del",{id:item.id},res=>{
								this_.addressInit();
								// uni.navigateTo({
								// 	url:'../mine/addAddress'
								// })
							});
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
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
