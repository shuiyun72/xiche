<template>
	<view class="detail">
		<view class="d_box_sy d_flex">
			<view class="d_title">
				<view class="l_t">
					{{infoMsg.title}}
				</view> 
				<view class="r_t blue">
					{{itemState(infoMsg.stateN,infoMsg.paystatus)}}
				</view>
			</view>
			<view class="d_title small_tt">
				<view class="l_t">
					{{infoMsg.created_at}}
				</view> 
				<view class="r_t">
					{{infoMsg.amount}}元
				</view>
			</view>
		</view>
		<uni-list class="od_t_ss" v-if="infoMsg.userticket">
			<uni-list-item title="洗车券" :showArrow="false">
				<template v-slot:right="">
					<text class="red">{{infoMsg.userticket.title}}</text>
				</template>
			</uni-list-item>
		</uni-list>
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
					{{infoMsg.location}}停车位
				</view>
			</view>
		</view>
		<view class="d_box_sy" v-if="infoMsg.operator">
			<view class="d_title">
				联系信息
			</view>
			<view class="d_msg">
				<view class="d_label">联系人:</view>
				<view class="d_text">
					{{infoMsg.operator.nickname}}
				</view>
			</view>
			<view class="d_msg">
				<view class="d_label">联系电话:</view>
				<view class="d_text">
					{{infoMsg.operator.phone}}
				</view>
			</view>
		</view>
		<view class="d_box_sy" v-if="infoMsg.remark">
			<view class="d_title">
				备注信息
			</view>
			<view class="d_remark">
				{{infoMsg.remark}}
			</view>
		</view>
		<view class="d_box_sy">
			<view class="d_title">
				订单信息
			</view>
			<view class="d_msg">
				<view class="d_label">订单编号:</view>
				<view class="d_text">
					{{infoMsg.code}}
				</view>
			</view>
			<view class="d_msg">
				<view class="d_label">实付款:</view>
				<view class="d_text">
					{{infoMsg.amount}}元
				</view>
			</view>
			<view class="d_msg">
				<view class="d_label">付款时间:</view>
				<view class="d_text">
					{{infoMsg.paytime}}
				</view>
			</view>
		</view>
		<view class="d_box_sy" v-if="infoMsg.stateN > 1 && infoMsg.operator">
			<view class="d_title">
				洗车人员信息
			</view>
			<view class="serve_info_msg">
				<view class="left_img">
					<image class="img" :src="httpp+infoMsg.operator.avatar" mode="widthFix"></image>
				</view>
				<view class="right_info">
					<view class="ttl">
						<view class="name_l">
							{{infoMsg.operator.nickname}}
						</view>
						<view class="blue" @click="tellPhone(infoMsg.operator.phone)" v-if="infoMsg.stateN == 3">
							联系他
						</view>
					</view>
					<view class="star_box">
						<uni-rate :value="infoMsg.operator.star" :margin="5" :size="12" :disabled="true"/>
						<text class="star_n">{{starC(infoMsg.operator.star)}}星</text>
					</view>
					<view class="">
						{{infoMsg.operator.intro}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="d_box_sy" v-if="infoMsg.stateN == 4">
			<view >
				<view class="d_title">
					洗车信息
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
			<view>
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
				<view class="d_msg">
					<view class="d_label lang">完成时间:</view>
					<view class="d_text">
						{{infoMsg.afterTime}}
					</view>
				</view>
			</view>
		</view>
		<view class="d_box_sy" v-show="infoMsg.stateN > 4 && infoMsg.qxCase">
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
	export default {
		data() {
			return {
				carList: ["qianb.png", "houb.png", "zuoc.png", "youc.png"],
				infoMsg: {},
				tabSel: 0,
				currentItem: {}
			};
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.tabSel = option.type;
			this.infoMsg = JSON.parse(option.item);
			console.log(this.infoMsg)
		},
		computed: {
			httpp(){
				return this.$store.state.httpp;
			}
		},
		methods:{
			itemState(n,p){
				switch (n) {
					case 1 : 
						if(p == 0){
							return "未支付成功" ;
						}else{
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
			starC(n) {
				switch(n){
					case 0:return "零";break;
					case 1:return "一";break;
					case 2:return "二";break;
					case 3:return "三";break;
					case 4:return "四";break;
					case 5:return "五";break;
				}
			},
			tellPhone(phone){
				uni.makePhoneCall({
					phoneNumber: phone
				});
			}
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

<style lang="scss" scoped>
	.od_t_ss{
		margin-bottom: 20upx;
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
	.serve_info_msg{
		display: flex;
		.left_img{
			width: 160upx;
			.img{
				width: 100%;
			}
		}
		.right_info{
			flex:1;
			padding-left: 10upx;
			display: inline-flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 20upx 0;
			.ttl{
				display: flex;
				justify-content: space-between;
			}
		}
	}
	.detail {
		background-color: $uni-def;
		padding: 20upx 0 60upx;
	}

	.d_box_sy {
		background-color: #fff;
		margin-bottom: 20upx;
		padding: 26upx;
		font-size: 34upx;
		.small_tt{
			font-size: 28upx;
			color: #999;
		}
		.for_ext {
			display: flex;
			padding-bottom: 20upx;

			.item_img {
				width: 140upx;
				min-height: 140upx;
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
				min-height: 250upx;

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
