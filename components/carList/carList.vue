<template>	
	<view class="page">
		<scroll-view class="scrollList" scroll-y :scroll-into-view="scrollViewId" :style="{height:winHeight + 'px'}">
			<view class="topspan">
				<view class="toppd">
					<view class="dw_tit">当前定位</view>
					<view class="re_txt">
						<view class="bgicon">{{urrent_city}}</view>
					</view>
					<view class="dw_tit">热门城市</view>
					<!-- <text @click="hotcity(郑州)">郑州</text> -->
					<view class="re_txt" >
						<block v-for="(list, key) in hot" :key="key">
							<text @click="hotcity(list.name)">{{list.name}}</text>
						</block>
					</view>
				</view>
			</view>
			<view class="uni-list">
				<block v-for="(list, key) in lists" :key="key">
					<block v-if="list.data.length">
						<view class="uni-list-cell-divider" :id="list.letter">
							{{list.letter.toUpperCase()}}
						</view>
						<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list.data" :key="item.id"
						 :class="list.data.length -1 == index ? 'uni-list-cell-last' : ''" @click="citylist(item.name)">
							<view class="uni-list-cell-navigate" >
								{{item.name}}
							</view>
						</view>
					</block>
				</block>
			</view>
		</scroll-view>
		<view class="uni-indexed-list-bar" :class="touchmove ? 'active' : ''" @touchstart="touchStart" @touchmove="touchMove"
		 @touchend="touchEnd" @touchcancel="touchCancel" :style="{height:winHeight + 'px'}">
			<text class="uni-indexed-list-text"> #</text>
			<text v-for="(list,key) in lists" :key="key" class="uni-indexed-list-text" :class="touchmoveIndex == key ? 'active' : ''"
			 :style="{height:itemHeight + 'px',lineHeight:itemHeight + 'px'}">{{list.letter.toUpperCase()}}</text>
		</view>
		<view class="uni-indexed-list-alert" v-if="touchmove">
			{{lists[touchmoveIndex].letter.toUpperCase()}}
		</view>
	</view>
</template>

<script>
	// var airportDate = require("../../../common/airport.js");

	export default {
		data() {
			return {
				title: 'grid',
				// lists: airportDate.list,
				hot:['1'],
				lists:['a','b'],
				touchmove: false,
				touchmoveIndex: -1,
				itemHeight: 0,
				winHeight: 0,
				scrollViewId: "",
				titleHeight: 10,
				urrent_city:'北京',
			}
		},
		onLoad(options){
			console.log(options)
			if(options){
				this.urrent_city= options.text;
			}else{
				this.urrent_city= '请选择城市'
			}
			uni.showLoading({
				title: '加载中'
			});
			uni.request({
				url: this.configs.url + '/api/cities',
				method: 'POST',
				data: {},
				success: (res) => {
					uni.hideLoading();
					console.log(res)
					this.hot= res.data.data.hot
					this.lists = res.data.data.list
					// plus.nativeUI.alert(JSON.stringify(res))
				},
				fail:(res) => {
					uni.showToast({
						title: '数据请求错误!'
					});
				}
			})
			this.hot= res.data.data.hot
		},
		onShow(options) {
			let winHeight = uni.getSystemInfoSync().windowHeight ;
			this.itemHeight = winHeight / 25 ;
			this.winHeight = winHeight;			
		},
		methods: {
			// 热门城市点击
			hotcity: function(e){
				this.urrent_city=e;
				uni.setStorageSync('city', e);
				uni.switchTab({
					url:'../index?city='+e
				})
			},
			// 城市点击
			citylist: function(e){
				// console.log(e)
				this.urrent_city=e;
				uni.setStorageSync('city', e);
				console.log(e)
				uni.switchTab({
					url:'../index?city='+e
				})
			},
			touchStart(e) {
				this.touchmove = true;
				let pageY = e.touches[0].pageY ;				
				let index = Math.floor((pageY - this.titleHeight) / this.itemHeight) ;
				let item = this.lists[index];
				if (item) {
					this.scrollViewId = item.letter;
					this.touchmoveIndex = index;
				}
			},
			touchMove(e) {
				let pageY = e.touches[0].pageY ;
				let index = Math.floor((pageY - this.titleHeight) / this.itemHeight);
				let item = this.lists[index];
				if (item) {
					this.scrollViewId = item.letter;
					this.touchmoveIndex = index;
				}
			},
			touchEnd() {
				this.touchmove = false;
				this.touchmoveIndex = -1;
			},
			touchCancel() {
				this.touchmove = false;
				this.touchmoveIndex = -1;
			}
		}
	}
</script>

<style lang="scss">
	
	.re_txt{
		display: flex;
		flex-direction: row;
		align-content: center;
		align-items: center;
		justify-content: flex-start;
		text-align: center;
		flex-wrap:wrap;
	}
	.re_txt text{
		background: #fff;
		color: #333;
		width:30%;
		height: 60upx;
		line-height: 60upx;
		border-radius:5upx;
		margin-right: 20upx;
		margin-bottom: 20upx;
	}
	.bgicon{
		padding-left: 30upx;
		/* background:#fff url(../../../static/dw.png) no-repeat; */
		background-size: 22upx 28upx;
		background-position: 20upx 15upx;
		color: #333;
		padding: 0 50upx;
		height: 60upx;
		line-height: 60upx;
		border-radius:5upx;
		margin-right: 20upx;
		margin-bottom: 20upx;
	}
	.dw_tit{
		font-size:14px;
		color: #666;
		padding: 20upx 0;
	}
	.topspan{
		background:#f7f7f7 ;
		padding:0 30upx 30upx 30upx;
	}
	.page {
		display: flex;
		flex-direction: row;
	}

	.scrollList {
		flex: 1;
		height: 100vh;
	}

	.uni-indexed-list-bar {
		width: 46upx;
		height: 100vh;
		background-color: lightgrey;
		display: flex;
		flex-direction: column;
	}

	.uni-indexed-list-bar.active {
		background-color: rgb(200, 200, 200);
	}

	.uni-indexed-list-text {
		color: #aaa;
		font-size: 22upx;
		text-align: center;
	}

	.uni-indexed-list-bar.active .uni-indexed-list-text {
		color: #333;
	}

	.uni-indexed-list-text.active,
	.uni-indexed-list-bar.active .uni-indexed-list-text.active {
		color: #007AFF;
	}

	.uni-indexed-list-alert {
		position: absolute;
		z-index: 20;
		width: 160upx;
		height: 160upx;
		left: 50%;
		top: 50%;
		margin-left: -80upx;
		margin-top: -80upx;
		border-radius: 80upx;
		text-align: center;
		line-height: 160upx;
		font-size: 70upx;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
