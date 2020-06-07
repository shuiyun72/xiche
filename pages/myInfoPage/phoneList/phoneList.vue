<template>
	<view id="address">

		<view class="list">
			<!-- 常用地址管理 -->


			<!-- 图标显示 -->
			<!-- <view v-if="homeList.length ==0" class="noAdd">
					<view class="img">
						<image src="../../../static/my/wuj.png"></image>
					</view>

					<text>赶快去添加联系人信息吧！</text>
				</view> -->
			<!-- 地址列表 -->
			<view class="row " v-for="(row,index) in 3" :key="index" @click="selectAddr(row)">
				<view class="row-top flex-direction flex">
					<view class="top-one fs-32 cl-333">
						姓名：joe
					</view>
					<view class="top-two fs-28 cl-666">
                        手机号：11111111111
						
					</view>
				</view>
				<view class="row-bottom">
					<view class="left">
						<!-- <image :src="row.is_default==1 ?src2:src1"></image>
						<view :class="row.is_default==1?'selected':'noSelect'">{{row.is_default==1?"默认地址":"其他地址"}}</view> -->
					</view>
					<view class="right">
						<view class="jianju" @tap.stop="edit(row)">
							<image src="../../../static/bianj.png"></image>
							<view>编辑</view>
						</view>
						<view @click.stop="removeH(index,row.id)">
							<image src="../../../static/shanc.png"></image>
							<view>删除</view>
						</view>
					</view>
				</view>
			</view>

		</view>

		<view class="add" @tap="add">

			<view class="icon tianjia"></view>新增车辆

		</view>



	</view>
</template>
<script>
	export default {




		data() {
			return {
				src1: '../../../static/address.png',
				src2: '../../../static/address-s.png',
				typeClass: 'home',
				subState: 1,
				isSelect: false,
				homeList: [],
				selfList: [],
				homeLen: "",
				selfLen: "",
				type: 1,
			};
		},
		// onLoad(e) {
		// 	if (e.type == 'select') {
		// 		this.isSelect = true;

		// 	}else if(e.type==2){
		// 		this.type=2;
		// 	}else if(e.type==1){
		// 		this.type=1;
		// 	}
		// 	this.firstLoad()
		// },
		mounted() {

		},
		methods: {
			firstLoad() {

				this.request({
					url: this.config.url + "user-get-address",
					data: {

					},
					method: "get",
					success: (res) => {

						if (res.data.code == 1) {
							this.homeList = res.data.list
						} else {
							uni.showToast({
								title: res.data.msg
							})
						}
					}
				})
			},
			// 删除我的收货地址
			removeH(row, id) {
				var _this = this;
				uni.showModal({
					title: '提示',
					content: '是否确认删除？',

					cancelText: '取消',
					confirmText: '确认',
					confirmColor: "#14CC21",
					success: res => {
						if (res.confirm) {
							var home = _this.homeList;

							this.homeList.splice(row, 1)
							this.request({
								url: this.config.url + "del-users-address",
								data: {

									address_id: id,
								},
								method: "post",
								success: (res) => {
									if (res.data.code == 1) {

									}
								}
							});
						} else if (res.cancel) {

						}

					},

				});
			},



			edit(row) {
				var type = JSON.stringify(row)

				uni.navigateTo({
					url: "/pages/person/address/edit/edit?type=" + type
				});

			},
			clear(row) {
				console.log(row)
			},
			add() {
				uni.navigateTo({
					url: "/pages/index/addAddressInfoPage"
				})
			},
			select(row) {
				//是否需要返回地址(从订单确认页跳过来选收货地址)
				if (!this.isSelect) {
					return;
				}
				uni.setStorage({
					key: 'selectAddress',
					data: row,
					success() {
						uni.navigateBack();
					}
				})
			},
			//选择送货方式的地址
			selectAddr(row) {
				if (this.type == 1) {
					uni.setStorage({
						key: "address",
						data: row,
						success: () => {
							uni.navigateBack({

							})
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	// #address uni-modal .uni-modal{
	// 	background:rgba(22,208,255,0.15);
	// }
	image {
		width: 100%;
		height: 100%;
	}

	view {
		display: flex;
	}

	@font-face {
		font-family: "HMfont-home";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMIAAsAAAAABvwAAAK8AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgqBSIFAATYCJAMMCwgABCAFhG0HVBskBsiusClj9ljNiEIaBdizs389YOCARVDt99mzu+8dMMpzQEn5KEAZRez+yRDbSDIixkYo1tF/+vv5OxYJFk2VghXWbbzzPn8D/OMG3vvXGTU90ZFhOrNJROZwCRGjj/Iry36wAbfSxBsuNGggeG9sMbJKDd7xg8vpr4ACmWdZLnMtGxMwwUD3wCiywi3oDWMXuITzBNpNc4BP3j5/Q1thTQvE1SQiaOd8isKSrUJds7aIVyqt6XECAF6Gj49/sBcUSZVZc09duQng/CfPcXTVrIs+gj+fBWwTGZsghbhcGzurJhgZ1S6rt2fXipDmCv5PyNMltf2HRxJEzSrsBKtIk9wU32WS+E1w14UZ1HFiG+QkJg3ODWmyn5/20eOvTz5LnR6l8aWDT5Sn3wLtYlfNe7RIik/fN961C3Vftf6YZLr5ZMcjU/LExqD9u3LzvKE8KQtBGAp9ilm1XbAK2m83TdlozEvQ0Zbrh8HBMrKDB03MjRwHaJKP2f5jf+NfDvML4f+tHQX8+EJvkwL1z9Mqwfi/kd+zq+hCS5+LynN5piObGRlNaNedmrJc/R7jVUO3agmtOT7zJy32WkjWahGihbQJlQ5bklpT7ENotyG3ucOAjpoobVi3BxB6HSDp9h2yXne0kDSoDPtBrTdQaHc61D07LEezm1Im4wBLc2z6UoaO0bpR8SdHLifNCkPKL+s4CaLX5Skm77hknWNBdxLt9SzEmkqBWXAZ57lgSyVl37YaZqMzt7tWd6OtshTQdYJixLAAKplDTT5RCv3Bplu6/ycWcXJEW+pqrL+YGkuGR14unh7onazsVXcv13RNRPb0mBCqUaKAssDCcjsmUKt+VIr5zJbGiMjIGTfqV+sr21pfUXxALmvCmpMjRY5i9G5CZepynIyYZOr+sksyR2W0UHLiChIrRmXfA0E') format('woff2');
	}

	.icon {
		font-family: "HMfont-home" !important;
		font-size: 60upx;
		font-style: normal;
		color: #000000;

		&.bianji {
			&:before {
				content: "\e61b";
			}
		}

		&.tianjia {
			&:before {
				content: "\e81a";
			}

			margin-left:20upx;
		}
	}



	#address .on {

		border-bottom: 5upx solid rgba(20, 204, 33, 1);
		font-weight: bold;
		color: rgba(20, 204, 33, 1);
	}

	.add {
		position: fixed;
		bottom: 0upx;

		width: 100vw;
		height: 94rpx;
		background: #208EFF;

		display: flex;
		justify-content: center;
		align-items: center;
		color: white;

		.tianjia {
			margin-right: 15upx;
			padding-top: 8upx;
		}

		.icon {
			height: 80upx;
			color: #fff;
			font-size: 28upx;
			justify-content: center;
			align-items: center;
		}

	}

	#address {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;


		box-sizing: border-box;
	}


	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-bottom: 160rpx;


		.noAdd {
			padding-top: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			image {
				width: 119upx;
				height: 141upx;
				margin-bottom: 60upx;
			}

			text {
				font-size: 28upx;
				color: rgba(102, 102, 102, 1);
			}
		}



		.row {
			display: flex;
			flex-direction: column;
			font-size: 28upx;
			margin-bottom: 20rpx;
			padding: 0rpx 30rpx;
			background: white;

			.row-top {
				
				border-bottom: 1px dashed #cecece;
                 padding:30rpx 0;
				.get-position {
					font-size: 32upx;
					color: rgba(51, 51, 51, 1);
					font-weight: bold;
				}

				.top-one {
					display: flex;
					margin-bottom: 10rpx;
					flex-wrap: wrap;
                   .item{
					   display: flex;
					   align-items: center;
					   width: 50%;
					   margin-bottom: 10rpx;
					   image{
						   width:28rpx;
						   height:28rpx;
						   margin-right: 20rpx;
					   }
				   }

				}

				.top-two {
					.img {
						width: 140rpx;
						height: 140rpx;
					
					}
				}
			}

			.row-bottom {

				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20upx;
				border-bottom: 1px solid #eee;

				.left {
					display: flex;
					color: rgba(153, 153, 153, 1);

					.selected {
						color: #E60000;
					}

					image {
						width: 36upx;
						height: 36upx;
						margin-right: 8upx;
					}
				}

				.right {
					display: flex;
					color: rgba(153, 153, 153, 1);

					view {
						display: flex;
						justify-content: flex-start;
						align-items: center;

						image {
							margin-right: 8upx;
						}
					}

					.jianju {
						margin-right: 60upx;
					}

					// view:nth-child(2){
					// 	margin-left:80upx;
					// 	
					// }
					image {
						width: 36upx;
						height: 36upx;
					}
				}
			}
		}

	}
</style>
