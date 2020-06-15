<template>
	<view class="combo_body">
		<view  v-for="item in comboList" :key="item.id">
			<view class="combo_title">
				{{item.cat_name}}
			</view>
			<navigator :url="'./comboList?item='+JSON.stringify(item)">
				<view class="car_box">
					<image :src="$httpp+item.cover" mode="widthFix" class="img"></image>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				comboList:[]
			};
		},
		mounted() {
			this.init();
		},
		methods:{
			init(){
				this.$getApi("/api/auth/mall/index",{},res1=>{
					console.log(res1)
					this.comboList = res1.data
				})
			}
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
