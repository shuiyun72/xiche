<template>
	<view class="city_search">
		<view class="city_search_sy">
			<view class="full_search_box">
				<view class="full_search">
					<view class="iconfont iconsousuo1"></view>
					<input type="text" v-model="seaText" placeholder="请输入城市名" class="input" />
				</view>
				<!-- <view class="text">
				搜索
			</view> -->
			</view>
		</view>
		<view class="text_title">
			当前定位
		</view>
		<view class="adress_box">
			<view class="btn this" @tap="selectCity('郑州')">
				<view class="iconfont iconlocation"></view>
				<view class="text">郑州</view>
			</view>
		</view>
		<view class="text_title">
			{{City.hot.title}}
		</view>
		<view class="adress_box">
			<view class="btn" v-for="(t,i) in City.hot.lists"  @tap="selectCity(t)">
				<view class="text">{{t}}</view>
			</view>
		</view>
		<view v-for="(t,i) in City.city" >
			<view class="text_title_city" @tap="selectCityTitle">
				{{t.title}}
			</view>
			<view class="city_title" v-for="(tc,ic) in t.lists"  @tap="selectCity(tc)">
				{{tc}}
			</view>
		</view>
		<view class="side_sear">
			<view class="item" v-for="(t,i) in City.city"  @click="showSear(i)">
				{{t.title}}
			</view>
		</view>

	</view>
</template>

<script>
	import {
		city as City
	} from '../../static/const/city.js';
	import _ from "../../until/lodash";
	export default {
		data() {
			return {
				seaText: "",
				City: City
			}
		},
		methods: {
			selectCityTitle(el){
				console.log(el)
			},
			selectCity(el) {
				this.$store.commit('setCity', el);
				uni.switchTab({
					url: '../home/home'
				});
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

			padding-top: 20rpx;

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
