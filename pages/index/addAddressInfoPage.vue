<template>
	<view>
		<view class="">
			<form>
				<view class="cu-form-group flex justify-between align-center">
					<view class="title flex align-center">
						<text class="text-red text-lg margin-top-xs">*</text>
						<text class="margin-left-xs">市</text>
					</view>
					<view data-target="one" class="action flex align-center" >
						<picker @change="bindPickerChange" :value="cityIndex" :range="cityArray" style="padding:0">
							<view class="uni-input">{{cityArray[cityIndex]}}</view>
							
						</picker>
						<image src="../../static/my/jinr.png" style="margin-top:5rpx;width:40rpx;height: 40rpx;"></image>
					</view>
				</view>
				<view class="cu-form-group flex justify-between">
					<view class="title flex align-center">
						<text class="text-red text-lg margin-top-xs">*</text>
						<text class="margin-left-xs">县/区</text>
					</view>
					<view data-target="one" class="action flex align-center" >
						<picker @change="bindPickerChange" :value="cityIndex" :range="cityArray" style="padding:0">
							<view class="uni-input">{{cityArray[cityIndex]}}</view>
							
						</picker>
						<image src="../../static/my/jinr.png" style="margin-top:5rpx;width:40rpx;height: 40rpx;"></image>
					</view>
				</view>
				<view class="cu-form-group flex justify-between">
					<view class="title flex align-center">
						<text class="text-red text-lg margin-top-xs">*</text>
						<text class="margin-left-xs">街道</text>
					</view>
					<view data-target="one" class="action flex align-center" >
						<picker @change="bindPickerChange" :value="cityIndex" :range="cityArray" style="padding:0">
							<view class="uni-input">{{cityArray[cityIndex]}}</view>
							
						</picker>
						<image src="../../static/my/jinr.png" style="margin-top:5rpx;width:40rpx;height: 40rpx;"></image>
					</view>
				</view>
				<view class="cu-form-group flex justify-between">
					<view class="title flex align-center">
						<text class="text-red text-lg margin-top-xs">*</text>
						<text class="margin-left-xs">小区</text>
					</view>
					<view data-target="one" class="action flex align-center" >
						<picker @change="bindPickerChange" :value="cityIndex" :range="cityArray" style="padding:0">
							<view class="uni-input">{{cityArray[cityIndex]}}</view>
							
						</picker>
						<image src="../../static/my/jinr.png" style="margin-top:5rpx;width:40rpx;height: 40rpx;"></image>
					</view>
				</view>
				<view class="cu-form-group flex justify-between">
					<view class="title flex align-center">
						<text class="text-red text-lg margin-top-xs">*</text>
						<text class="margin-left-xs">小区期数/楼栋号</text>
					</view>
					<input style="text-align: right;" placeholder="请填写小区期数/楼栋号" name="input" />
				</view>
				<view class="padding-xs" @click="skipApply">
					<image class="margin-left-xs" style="width: 24rpx;height: 23rpx;" src="../../static/jianz.png" mode=""></image>
					<text class="margin-left-xs">找不到你指定的小区？请点击这里</text>
					<text class="text-blue">申请开通</text>
				</view>
				<view class="cu-form-group flex justify-between">
					<view class="title flex align-center">
						<text class="text-red text-lg margin-top-xs">*</text>
						<text class="margin-left-xs">经常使用的车位1</text>
					</view>
					<input style="text-align: right;" placeholder="请填写车位号/位置描述" name="input" />
				</view>
				<view class="cu-form-group flex justify-between">
					<view class="title flex align-center">
						<text class="margin-left-xs">经常使用的车位2</text>
					</view>
					<input style="text-align: right;" placeholder="请填写车位号/位置描述" name="input" />
				</view>
				<view class="cu-form-group flex justify-between">
					<view class="title flex align-center">
						<text class="margin-left-xs">经常使用的车位3</text>
					</view>
					<input style="text-align: right;" placeholder="请填写车位号/位置描述" name="input" />
				</view>
				<view class="cu-form-group flex justify-between">
					<view class="title flex align-center">
						<text class="margin-left-xs">经常使用的车位4</text>
					</view>
					<input style="text-align: right;" placeholder="请填写车位号/位置描述" name="input" />
				</view>
				<view @tap="next()" class="padding flex justify-center"><button style="width: 640rpx;" class="cu-btn block bg-blue margin-tb-sm lg"
					 type="">提交</button></view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cityArray: ['请选择',"郑州市"],
				cityIndex:0,
				addrArray: ['请选择',"郑州市"],

				streetArray: ['一马路', '二马路'], // 街道列表
				streetIndex: 0, // 选择街道索引
				communityArray: ['小区1', '小区2'],
				communityIndex: 0,
			};
		},
		methods: {
			bindPickerChange(e) {
				this.streetIndex = e.detail.value;
			},
			communityChange(e) {
				this.communityIndex = e.detail.value;
			},
			next() {
				uni.navigateTo({
					url: 'addSuccessPage'
				})
			},
			skipApply(){
				uni.navigateTo({
					url:"/pages/finishCarInfo/applyAddr/applyAddr"
				})
			}
		}
	};
</script>

<style lang="scss"></style>
