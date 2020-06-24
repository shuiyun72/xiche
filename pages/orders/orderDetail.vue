<template>
	<view class="detail">
		<view class="d_box_sy">
			<view class="d_title">
				<text>订单编号{{infoMsg.code}}</text><text class="t_or">{{itemState(infoMsg.stateN)}}</text>
			</view>
			<view class="d_title">
				{{infoMsg.title}}
			</view>
			<view class="d_msg">
				<view class="d_text">
					{{infoMsg.time}}
				</view>
			</view>
		</view>
		<view class="d_box_sy">
			<view class="d_title">
				联系信息
			</view>
			<view class="d_msg">
				<view class="d_label">联系人:</view>
				<view class="d_text">
					{{infoMsg.name}}
				</view>
			</view>
			<view class="d_msg">
				<view class="d_label">联系电话:</view>
				<view class="d_text">
					{{infoMsg.phone | psd}}
				</view>
			</view>
		</view>
		<view class="d_box_sy">
			<view class="d_title">
				车辆信息
			</view>
			<view class="d_msg">
				<view class="d_label">车牌号:</view>
				<view class="d_text">
					{{infoMsg.carNum}}
				</view>
			</view>
			<view class="d_msg">
				<view class="d_label">车型:</view>
				<view class="d_text">
					{{infoMsg.xing}}
				</view>
			</view>
			<view class="d_msg">
				<view class="d_label">车辆颜色:</view>
				<view class="d_text">
					{{infoMsg.color}}
				</view>
			</view>
			<view class="d_msg">
				<view class="d_label">车辆品牌:</view>
				<view class="d_text">
					{{infoMsg.carBrand}}
				</view>
			</view>
			<view class="d_msg" v-if="infoMsg.img">
				<view class="d_label">车辆照片:</view>
				<view class="d_img">
					<image :src="httpp+infoMsg.img" mode="widthFix" class="img"></image>
				</view>
			</view>
		</view>
		<view class="d_box_sy">
			<view class="d_title">
				地址信息
			</view>
			<view class="d_msg">
				<view class="d_label">洗车地址:</view>
				<view class="d_text">
					{{infoMsg.address}}
				</view>
			</view>
			<view class="d_msg">
				<view class="d_label">停车位:</view>
				<view class="d_text">
					{{infoMsg.location}}
				</view>
			</view>
		</view>
		<view class="d_box_sy">
			<view class="d_title">
				备注信息
			</view>
			<view class="d_remark">
				{{infoMsg.remark}}
			</view>
		</view>
		<view class="d_box_sy">
			<view v-show="tabSel == 1 || tabSel == 2">
				<view class="d_title">
					洗车信息
				</view>
				<view class="d_msg">
					<view class="d_label lang">开始洗车时间:</view>
					<view class="d_text">
						{{infoMsg.beforeTime}}
					</view>
				</view>
				<view class="d_msg">
					<view class="d_text">
						洗车前照片 (前后左右)
					</view>
				</view>
				<view class="for_ext">
					<view class="item_img" v-for="(img,index) in infoMsg.beforeimglist" :key="index">
						<image :src="httpp+img"></image>
					</view>
				</view>
			</view>
			<view v-show="tabSel == 2">
				<view class="d_msg">
					<view class="d_label lang">洗车完成时间:</view>
					<view class="d_text">
						{{infoMsg.afterTime}}
					</view>
				</view>
				<view class="d_msg">
					<view class="d_text">
						洗车后照片 (前后左右)
					</view>
				</view>
				<view class="for_ext">
					<view class="item_img" v-for="(img,index) in infoMsg.afterimglist" :key="index">
						<image :src="httpp+img"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="d_box_sy" v-show="tabSel == 3">
			<view class="d_title">
				取消信息
			</view>
			<view class="d_msg">
				<view class="d_label">取消原因:</view>
				<view class="d_text">
					{{infoMsg.qxCase}}
				</view>
			</view>
			<view class="d_msg">
				<view class="d_label">取消时间:</view>
				<view class="d_text">
					{{infoMsg.qxTime}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				carList: ["qianb.png", "houb.png", "zuoc.png", "youc.png"],
				infoMsg: {},
				tabSel: 0
			};
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.tabSel = option.type;
			this.infoMsg = JSON.parse(option.item);
			console.log(this.infoMsg )
		},
		methods:{
			itemState(n){
				switch (n) {
					case 1 : return "待接单" ;break;
					case 2 : return "待完成" ;break;
					case 3 : return "正在洗车" ;break;
					case 4 : return "已完成" ;break;
					case 5 : return "本人取消订单" ;break;
					case 6 : return "本人拒绝订单" ;break;
					case 7 : return "客户取消订单" ;break;
				}
			}
		},
		computed: {
			...mapState(['httpp'])
		},
		filters: {
			psd: function(value) {
				if (!value) return ''
				value = value.toString()
				return value.slice(0, 3) + '******'
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		background-color: $uni-def;
		padding: 20upx 0 60upx;
	}

	.d_box_sy {
		background-color: #fff;
		margin-bottom: 20upx;
		padding: 26upx;
		font-size: 34upx;

		.for_ext {
			display: flex;
			padding-bottom: 20upx;

			.item_img {
				width: 140upx;
				height: 140upx;
				margin-right: 30upx;

				image {
					width: 100%;
					height: 100%;

				}
			}
		}

		.d_remark {
			background-color: $uni-def;
			font-size: 24upx;
			padding: 20upx;
			color: #888;
			height: 200upx;
		}

		.d_title {
			display: flex;
			justify-content: space-between;
			margin-bottom: 16upx;
		}

		.d_msg {
			color: #666;
			padding-bottom: 16upx;
			display: flex;
			font-size: 32upx;

			.d_label {
				width: 24%;

				&.lang {
					width: 240upx;
				}
			}

			.d_img {
				width: 250upx;
				height: 250upx;

				.img {
					width: 100%;
				}
			}

			.d_text {
				width: 76%;
			}
		}
	}

	.t_or {
		color: $uni-or;
	}
</style>
