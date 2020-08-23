<template>
	<view class="address_list">
		<view v-if="addressList.length > 0">
			<view class="item" v-for="(item,index) in addressList" :class="{'active':index == sIndex}" @click="selItem(item,index)">
				<!-- {{item.text}} -->
				{{item.city_name}}{{item.area_name}}{{item.street_name}}{{item.house_detail}}
			</view>
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
				addressList:[],
				sIndex:-1
			};
		},
		onShow(){
			this.$getApi("/api/user/address/list",{},res=>{
				this.addressList = res.data
			})
		},
		methods:{
			selItem(item,i){
				this.sIndex = i;
				this.$store.commit("setAddress",{name:item.street_name+item.house_detail,id:item.id})
			},
			next(){
				uni.navigateBack()
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
