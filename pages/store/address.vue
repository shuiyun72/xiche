<template>
	<view class="address_list">
		<view class="item" v-for="(item,index) in addressList" :class="{'active':index == sIndex}" @click="selItem(index,item)">
			{{item.text}}
		</view>
		<view class="sub_btn">
			<button class="btn blue" @click="next">确认</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressList:[
					{text:"郑州高频新区郑州高频新区2号楼"},
					{text:"郑州高频新区郑州高频新区3号楼"},
					{text:"郑州高频新区郑州高频新区4号楼"}
				],
				sIndex:-1,
				thisItem:{}
			};
		},
		methods:{
			selItem(i,item){
				this.sIndex = i;
				this.thisItem = item;
			},
			next(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sub_btn{
		padding:280upx 40upx 0;
		background-color: #f0f0f0;
		.btn{
			padding: 26upx 0;
		}
	}
.address_list{
	border-top: 1upx solid #eee;
	height: 100vh;
	background-color: #f0f0f0;
	.item{
		background-color: #fff;
		padding:30upx 26upx;
		margin-bottom: 20upx;
		&.active{
			background-color: #666;
			color: #fff;
		}
	}
}
</style>
