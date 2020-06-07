<template>
	<view>
		<form v-for="(item, index) in orderArr" :key="index">
			<view class="cu-form-group flex justify-between" :class="{'margin-top':index != 0}" v-if="orderArr.length > 1">
				<view class="title flex align-center">
					<text class="margin-left-xs text-lg text-blue">预约订单{{ index + 1 }}</text>
				</view>
				<view data-target="one" class="action" style="padding-right: 20rpx;">删除</view>
			</view>
			<view class="cu-form-group flex justify-between">
				<view class="title flex align-center">
					<text class="text-red text-lg margin-top-xs">*</text>
					<text class="margin-left-xs">车辆</text>
				</view>
				<view data-target="one" class="action" style="padding-right: 20rpx;">请选择车辆></view>
			</view>
			<view class="cu-form-group flex justify-between">
				<view class="title flex align-center">
					<text class="text-red text-lg margin-top-xs">*</text>
					<text class="margin-left-xs">洗车地址</text>
				</view>
				<view data-target="one" class="action" style="padding-right: 20rpx;">请选择地址></view>
			</view>
			<view class="cu-form-group flex justify-between">
				<view class="title flex align-center">
					<text class="text-red text-lg margin-top-xs">*</text>
					<text class="margin-left-xs">停车位</text>
				</view>
				<view data-target="one" class="action" style="padding-right: 20rpx;">请选择停车位></view>
			</view>
			<view class="cu-form-group flex justify-between margin-top">
				<view class="title flex align-center">
					<text class="text-red text-lg margin-top-xs">*</text>
					<text class="margin-left-xs">洗车内容选择</text>
				</view>
			</view>
			<view class="flex bg-white padding">
				<view class="tc-box" v-for="(i,k) in 3" :key="k" @click="changeRaido(k)">
					<view class="tc-name flex align-center">
						<radio   :checked="radio == k" :value="k"></radio>
						<text class="title-top-cs">单次外部清洗</text>
					</view>
					<view class="title-cs">
						<image style="width: 42rpx;height: 16rpx;" src="../../static/washCar/vip.png" mode=""></image>
						<text class="name-text">洗车券1张</text>
					</view>
					<view class="introduce">会员小型￥18元</view>
					<view class="introduce">会员SUV￥22元</view>
					<view class="introduce">会员MVP￥26元</view>
				</view>
			
			</view>
			<view class="bg-white text-gray padding-lr" style="padding-top: 10rpx;">其他服务（现金支付）</view>
			<view class=" bg-white qita-serve">
				<checkbox-group class="padding flex justify-between align-center" @change="CheckboxChange">
					<view class="cu-form-group cs-gro">
						<checkbox :class="checkbox[0].checked ? 'checked' : ''" :checked="checkbox[0].checked ? true : false" value="A"></checkbox>
						<view class="title one">
							打蜡
							<text class="text-red">￥12</text>
						</view>
					</view>
					<view class="cu-form-group cs-gro">
						<checkbox class="" :class="checkbox[1].checked ? 'checked' : ''" :checked="checkbox[1].checked ? true : false" value="B"></checkbox>
						<view class="title one">
							内饰清洗
							<text class="text-red">￥16</text>
						</view>
					</view>
					<view class="cu-form-group cs-gro">
						<checkbox class=" " :class="checkbox[2].checked ? 'checked' : ''" :checked="checkbox[2].checked ? true : false" value="C"></checkbox>
						<view class="title one">
							其他服务
							<text class="text-red">￥18</text>
						</view>
					</view>
				</checkbox-group>
			</view>
			<view class="cu-form-group flex justify-between align-center">
				<view class="title flex align-center">
					<text class="text-red text-lg margin-top-xs">*</text>
					<text class="margin-left-xs">洗车时间</text>
				</view>
				<view data-target="one" class="action flex align-center" >
					<picker @change="bindPickerChange" :value="cityIndex" mode="multiSelector" :range="cityArray" style="padding:0">
						<view class="uni-input">{{cityArray[cityIndex]}}</view>
						
					</picker>
					<image src="../../static/my/jinr.png" style="margin-top:5rpx;width:40rpx;height: 40rpx;"></image>
				</view>
			</view>
			<view class="cu-form-group flex justify-between">
				<view class="title flex align-center">
					<text class="text-red text-lg margin-top-xs">*</text>
					<text class="margin-left-xs">联系电话</text>
				</view>
				<view data-target="one" class="action flex align-center" >
					
						
					<input type="text" disabled placeholder="请选择电话" style="text-align: right;"/>
					<image src="../../static/my/jinr.png" style="margin-top:5rpx;width:40rpx;height: 40rpx;"></image>
				</view>
			</view>
			<view class="cu-form-group flex justify-between margin-top padding">
				<view class="title flex align-center"><text class="margin-left-xs">备注信息</text></view>
			</view>
			<view class="bg-white padding" style="padding-top: 0;">
				<textarea style="padding: 20rpx;background-color: rgba(246,246,246,1);width: 702rpx;height: 180rpx;" value="" placeholder="请在这里输入备注信息" />
			</view>
		</form>
		<view @click="addOrder" class="padding flex align-center">
			<image style="width: 33rpx;height: 33rpx;" src="../../static/washCar/add.png" mode=""></image>
			<text class="text-blue margin-left-xs">继续添加洗车订单</text>
		</view>
		<view class="padding">
			<view class="flex justify-center font-bold">
				<text>本次服务费</text>
				<text class="text-red">￥28元</text>
			</view>
			<view class="flex justify-center margin-top-xs font-bold">
				<text>
					购买VIP套餐本次将节省
					<text class="text-blue">￥5.5元</text>
					，点击
					<text class="text-blue">购买VIP套餐</text>
				</text>
			</view>
		</view>
		<view @tap="next()" class="padding flex justify-center"><button style="width: 640rpx;" class="cu-btn block bg-blue margin-tb-sm lg" type="">确认下单</button></view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			cityArray: [[1,2],[1,2,3]],
			cityIndex:0,
			radio: 1,
			checkbox: [
				{
					value: 'A',
					checked: true
				},
				{
					value: 'B',
					checked: true
				},
				{
					value: 'C',
					checked: false
				}
			],
			orderList: []
		};
	},
	computed: {
		...mapState(['curOrderInfo', 'orderArr'])
	},
	created() {
		if (this.orderArr.length == 0) {
			this.$store.commit('UPDATA_ORDER_LIST', this.curOrderInfo);
		}
	},
	methods: {
		RadioChange(e) {
			this.radio = e.detail.value;
		},
		CheckboxChange(e) {
			var items = this.checkbox,
				values = e.detail.value;
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				items[i].checked = false;
				for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
					if (items[i].value == values[j]) {
						items[i].checked = true;
						break;
					}
				}
			}
		},
		addOrder() {
			this.$store.commit('UPDATA_ORDER_LIST', this.curOrderInfo);
		},
		changeRaido(k){
			console.log(k)
			this.radio = k;
		}
	}
};
</script>

<style lang="scss" scoped>
.tc-box {
	width: 286rpx;
	height: 266rpx;
	border-radius: 10rpx;
	background-image: url(../../static/washCar/jiag.png);
	background-size: 100% 100%;
	background-repeat: no-repeat;
	.tc-name {
		margin: 16rpx;
		.title-top-cs {
			font-size: 24rpx;
			font-weight: bold;
			color: rgba(255, 255, 255, 1);
		}
		.check-box {
			// margin: 10rpx 10rpx 18rpx 10rpx;
			transform: scale(0.7);
		}
	}
	.title-cs {
		margin-left: 29rpx;
		margin-bottom: 10rpx;
		.name-text {
			font-size: 22rpx;
			font-weight: bold;
			color: rgba(250, 160, 3, 1);
			margin-left: 10rpx;
		}
	}
	.introduce {
		font-size: 22rpx;
		font-weight: 500;
		color: rgba(32, 142, 255, 1);
		line-height: 36rpx;
		margin-left: 29rpx;
	}
}
.cu-form-group {
	&.cs-gro {
		padding: 0;
		border: 0;
	}
}
.qita-serve {
	.title {
		font-size: 30rpx;
		font-weight: 500;
		padding-right: 0;
		&.one {
			margin-left: 10rpx;
		}
	}
}
</style>
