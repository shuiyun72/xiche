<template>
	<view class="city_search">
		<view v-for="(t,i) in Car" :key="i">
			<view class="text_title_city" @tap="selectCityTitle">
				{{t.title}}
			</view>
			<view class="city_title" v-for="(tc,ic) in t.lists"  @tap="selectCity(tc)">
				<view class="img_car">
					<image :src="httpp+tc.cover" mode="widthFix" class="img"></image>
				</view>
				<view class="t_t">
					{{tc.name}}
				</view>
				
			</view>
		</view>
		<view class="side_sear">
			<view class="item" v-for="(t,i) in Car"  @click="showSear(i)">
				{{t.title}}
			</view>
		</view>

	</view>
</template>

<script>
	import _ from "../../until/lodash";
	export default {
		data() {
			return {
				seaText: "",
				Car: []
			}
		},
		computed:{
			httpp(){
				return this.$store.state.httpp;
			},
			carBrand(){
				return this.$store.state.carBrand;
			}
		},
		mounted() {
			if(JSON.stringify(this.carBrand) != "[]"){
				let ss = _.keys(this.carBrand,item=>{
					return item
				})
				console.log(ss)
				let sscc = [];
				_.map(ss,itemC=>{
					sscc.push({
						title:itemC,
						lists:this.carBrand[itemC]
					})
				})
				console.log(sscc)
				this.Car = sscc
			}else{
				this.$getApi("/api/user/car/brand",{},res=>{
					console.log(res)
					let ss = _.keys(res.data,item=>{
						return item
					})
					console.log(ss)
					let sscc = [];
					_.map(ss,itemC=>{
						sscc.push({
							title:itemC,
							lists:res.data[itemC]
						})
					})
					console.log(sscc)
					this.Car = sscc
				})
			}
		},
		methods: {
			selectCityTitle(el){
				console.log(el)
			},
			selectCity(el) {
				this.$store.commit('setbrand',el)
				// uni.navigateTo({
				// 	url:'../mine/addCar?car='+el.id
				// })
				uni.navigateBack()
			},
			showSear(num){
				uni.createSelectorQuery().select(".city_search").boundingClientRect(cityBox=>{
					uni.createSelectorQuery().selectAll(".text_title_city").boundingClientRect(cityChild=>{
						let newArray = _.map(cityChild,res=>{
							return res.top - cityBox.top;
						})
						uni.pageScrollTo({
							duration:300,
							scrollTop:newArray[num]
						})
					}).exec()
				}).exec()
				
			}
		}
	}
</script>

<style lang="less">
.side_sear{
	position:fixed;
	top:160rpx;
	right: 0;
	.item{
		padding:3px 6px;
		margin-bottom: 3px;
		// background-color: #eee;
		font-size: 12px;
		text-align: center;
	}				
}
.city_search {
		
		.city_title {
			font-size: 14px;
			color: #777;
			margin: 20rpx 30rpx;
			display: flex;
			padding-top: 20rpx;
			.img_car{
				width: 60upx;
				.img{
					width: 100%;
				}
			}
			.t_t{
				padding-left: 60upx;
			}
			&+.city_title {
				border-top: 1px solid #eee;
			}
		}

		.adress_box {
			margin: 20rpx 30rpx;
			display: flex;
			flex-wrap: wrap;

			.btn {
				display: flex;
				width: 30%;
				justify-content: center;
				border: 1px solid #eee;
				padding: 4px 0;
				border-radius: 4px;
				color: #666;
				margin-bottom: 16rpx;
				margin-right: 16rpx;

				.iconlocation {
					display: inline-block;
					font-size: 14px;
					margin-right: 10rpx;
					padding-top: 3px;
				}

				.text {
					font-size: 14px;
					display: inline-block;
				}
			}
		}

		.text_title,.text_title_city {
			margin: 20rpx 30rpx;
			font-size: 14px;
			color: #777;
			background-color: #f0f0f0;
		}

		.example-body {
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			padding: 0;
			font-size: 14px;
			background-color: #ffffff;
		}
	}
	.city_search_sy {
			position: relative;
	
			.side_sear {
				position: fixed;
				right: 0px;
				top: 140px;
	
				.item {
					font-size: 10px;
					color: #666;
					padding: 6rpx;
				}
			}
	
			.full_search_box {
				display: flex;
				margin: 16rpx 30rpx;
				justify-content: space-between;
	
				.text {
					width: 12%;
					font-size: 14px;
					line-height: 23px;
					padding: 14rpx 0;
					margin-left: 3%;
				}
	
				.full_search {
					display: inline-flex;
					background-color: #ECECEC;
					padding: 14rpx 20rpx;
					border-radius: 20px;
					color: #666;
					flex: 1;
	
					.iconsousuo1 {
						font-size: 14px;
						padding: 0px 8px 0 0;
						line-height: 20px;
					}
	
					.iconguanbi {
						font-size: 14px;
						padding: 4px 6px 0;
						background-color: #C4C4C4;
						line-height: 14px;
						border-radius: 50%;
						transform: scale(0.7);
						color: #fff;
					}
	
					.input {
						font-size: 12px;
						line-height: 20px;
						display: inline-block;
						height: 20px;
						width: 86%;
					}
				}
			}
	
		}
</style>
