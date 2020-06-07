<template>
	<view>
		<view class="">
			<form>
				<view class="cu-form-group flex justify-between">
					<view class="title flex align-center">
						<text class="text-red text-lg margin-top-xs">*</text>
						<text class="margin-left-xs">姓名</text>
					</view>
					<view data-target="one" class="action flex align-center" >
						<input type="text" placeholder="请填写姓名" style="text-align: right;"/>
					</view>
				</view>
				<view class="cu-form-group flex justify-between">
					<view class="title flex align-center">
						<text class="text-red text-lg margin-top-xs">*</text>
						<text class="margin-left-xs">手机号</text>
					</view>
					<view data-target="one" class="action flex align-center" >
						<input type="text" placeholder="请填写手机号" style="text-align: right;"/>
					</view>
				</view>
				<view class="cu-form-group flex justify-between align-center">
					<view class="title flex align-center">
						<text class="text-red text-lg margin-top-xs">*</text>
						<text class="margin-left-xs">市</text>
					</view>
					<view data-target="one" class="action flex align-center" >
						<picker @change="bindPickerChange" :value="cityIndex" :range="cityArray" style="padding:0">
							<view class="uni-input">{{cityArray[cityIndex]}}</view>
							
						</picker>
						<image src="../../../static/my/jinr.png" style="margin-top:5rpx;width:40rpx;height: 40rpx;"></image>
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
						<image src="../../../static/my/jinr.png" style="margin-top:5rpx;width:40rpx;height: 40rpx;"></image>
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
						<image src="../../../static/my/jinr.png" style="margin-top:5rpx;width:40rpx;height: 40rpx;"></image>
					</view>
				</view>
				<view class="cu-form-group flex justify-between">
					<view class="title flex align-center">
						<text class="text-red text-lg margin-top-xs">*</text>
						<text class="margin-left-xs">小区</text>
					</view>
					<view data-target="one" class="action flex align-center" >
						<input type="text" placeholder="请填写小区名称" style="text-align: right;"/>
					</view>
				</view>
				
			</form>
			
			<view @tap="next()" class="padding flex justify-center"><button style="width: 640rpx;margin-top:100rpx" class="cu-btn block bg-blue margin-tb-sm lg"
				 type="">提交</button></view>
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
			}
		},
		methods: {
			next(){
				uni.navigateTo({
					url:"/pages/finishCarInfo/applySucc/applySucc"
				})
			}
		}
	}
</script>

<style>

</style>
