<template>
	<view class="combo_body">
		<view class="combo_title">
			小型汽车车型
		</view>
		<navigator url="./comboList?type=1">
			<view class="car_box">
				<image src="../../static/img/car1.png" mode="widthFix" class="img"></image>
			</view>
		</navigator>
		<view class="combo_title">
			SUV车型
		</view>
		<navigator url="./comboList?type=2">
			<view class="car_box">
				<image src="../../static/img/car2.png" mode="widthFix" class="img"></image>
			</view>
		</navigator>
		<view class="combo_title">
			MPV车型
		</view>
		<navigator url="./comboList?type=3">
			<view class="car_box">
				<image src="../../static/img/car3.png" mode="widthFix" class="img"></image>
			</view>
		</navigator>
		<view class="combo_title">
			综合车型全家桶
		</view>
		<navigator url="./comboList?type=4">
			<view class="car_box">
				<image src="../../static/img/car4.png" mode="widthFix" class="img"></image>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.combo_body {
		border-top: 1upx solid #eee;
		padding: 26upx;

		.combo_title {
			font-weight: bold;
			padding: 26upx 0 16upx;
			color: #666;
		}

		.car_box {
			.img {
				width: 100%;
			}
		}
	}
</style>
