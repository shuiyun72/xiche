<template>
	<view>
		<view class="" >
			<form>
				<view class="cu-form-group flex justify-between">
					<view class="title flex align-center">
						<text class="text-red text-lg margin-top-xs">*</text>
						<text class="margin-left-xs">姓名</text>
					</view>
					<input style="text-align: right;" placeholder="请输入姓名" name="input" />
				</view>
				<view class="cu-form-group flex justify-between">
					<view class="title flex align-center">
						<text class="text-red text-lg margin-top-xs">*</text>
						<text class="margin-left-xs">手机号</text>
					</view>
					<input style="text-align: right;" name="input" placeholder="请输入手机号"/>
				</view>
				<view class="cu-form-group flex justify-between">
					<view class="title flex align-center">
						<text class="text-red text-lg margin-top-xs">*</text>
						<text class="margin-left-xs">车型</text>
					</view>
					<!-- 121 -->
					<view data-target="one" class="action">
						<view class="uni-list">
							<view class="uni-list-cell">
								<view class="uni-list-cell-db">
									<picker @change="bindPickerChange" style="padding-right: 20rpx;" :value="carTypeIndex" :range="array">
										<view class="uni-input">{{ array[carTypeIndex] }}</view>
									</picker>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-form-group flex justify-between">
					<view class="title flex align-center">
						<text class="text-red text-lg margin-top-xs">*</text>
						<text class="margin-left-xs">车牌号</text>
					</view>
					<input style="text-align: right;" placeholder="请填写车牌号" name="input" />
				</view>
				<view class="cu-form-group flex justify-between">
					<view class="title flex align-center">
						<text class="text-red text-lg margin-top-xs">*</text>
						<text class="margin-left-xs">车辆颜色</text>
					</view>
					<!-- 121 -->
					<view data-target="one" class="action" style="padding-right: 20rpx;">请选择车辆颜色</view>
				</view>
				<view class="padding-tb car-main">
					<view class="bg-white car-box" 
					    v-for="(item, index) in carColorArr" :key="index" 
						:class="{ select: selectCarIndex == index }" @click="changeCarIndex(index)">
						<view class="text-white text-small" v-if="index == 0">默认</view>
						<view class="flex justify-center margin-top-xs car-img-cs" :class="{ 'other-style': index != 0 }">
							<image class="" style="width: 123rpx;height: 47rpx;" :src="dealSrc(item.src)" mode=""></image>
						</view>
						<view class=" flex justify-center margin-top-xs">{{ item.color }}</view>
					</view>
				</view>
				<view class="cu-form-group flex justify-between">
					<view class="title flex align-center"><text class="margin-left-xs">车品牌</text></view>
					<!-- 121 -->
					<view @click="showCarList()" data-target="one" class="action" style="padding-right: 20rpx;">请选择车辆品牌></view>
				</view>
				<view class="cu-form-group flex justify-between">
					<view class="title flex align-center"><text class="margin-left-xs">车辆照片</text></view>
					<view data-target="one" class="action" style="padding-right: 20rpx;">请上传照片</view>
				</view>
				<view class="cu-form-group padding">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item, index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg(index)" :data-index="index"><text class="cuIcon-close"></text></view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length < 4"><text class="cuIcon-cameraadd"></text></view>
					</view>
				</view>
				<view class="padding bg-white text-gray">
					<view class="title flex align-center"><text class="margin-left-xs text-gray" style="font-size: 24rpx;">示例：前后左右</text></view>
					<view class="margin-top-xs">
						<image class="margin-right" :src="dealSrc(item)" v-for="(item, index) in carImgExSrc" :key="index" style="width: 138rpx;height: 138rpx;" mode=""></image>
					</view>
				</view>
				<view @tap="next()" class="padding flex justify-center"><button style="width: 640rpx;" class="cu-btn block bg-blue margin-tb-sm lg" type="">下一步</button></view>
			</form>
		</view>
		<!-- <view class="" v-show="showCarList">
			<carList/>
		</view> -->
	</view>
</template>

<script>
	import carList from '../../components/carList/carList.vue'
export default {
	comments:{
		carList
	},
	data() {
		return {
			array: ['请选择车型>', '小型汽车', 'SUV', 'MPV'],
			carTypeIndex: 0,
			carColorArr: [
				{
					color: '白色',
					src: 'bais'
				},
				{
					color: '灰色',
					src: 'huis'
				},
				
			],
			selectCarIndex: 0, // 选择车身颜色索引
			imgList: [],
			carImgExSrc: ['qianb', 'zuoc', 'youc', 'houb'],
			
		};
	},
	methods: {
		bindPickerChange(e) {
			this.carTypeIndex = e.detail.value;
		},
		dealSrc(src) {
			return `../../static/${src}.png`;
		},
		ChooseImage() {
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					this.imgList = this.imgList.concat(res.tempFilePaths);
					// console.log(JSON.stringify();
				}
			});
		},
		DelImg(index) {
			this.imgList.splice(index, 1);
		},
		next () {
			uni.navigateTo({
				url:'addAddressInfoPage'
			})
		},
		changeCarIndex(index){
			this.selectCarIndex = index;
		},
		showCarList(){
			uni.navigateTo({
				url:"/pages/finishCarInfo/carSign/carSign"
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.car-main {
	display: flex;
	width: 780rpx;
	flex-wrap: wrap;
	.car-box {
		width: 160rpx;
		height: 160rpx;
		flex-shrink: 0;
		margin-left: 25rpx;
		margin-bottom: 20rpx;
		&.select {
			background-color: #208eff;
			color: rgba(255, 255, 255, 1);
		}
		.car-img-cs {
			&.other-style {
				margin-top: 45rpx;
			}
		}
		.text-small {
			font-size: 18rpx;
			margin-left: 7rpx;
		}
	}
}
</style>
