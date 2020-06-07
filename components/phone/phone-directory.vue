<template>
	<view class="phone-main" :style="{height: winHeight + 'px'}">
		<!-- <view class="phone-main-search">
			<navigator :url="'phone-search?phones=' + phonesEscape" hover-class="none">
				<input disabled="false" class="phone-main-input" type="text" placeholder="请输入要搜索的商家名称" />
				<image class="img" src="../../static/img/leibie_sousuo.png"></image>
			</navigator>
		</view> -->
		<view class="main-content">

			<view class="phoneDirectory">
				<phone-list :phones="phones" :letter="letter" :scrollAnimationOFF="scrollAnimationOFF" @change="handlePhoneListIndex"
				 @reset="handleReset" @handleClick="handleClick">
				</phone-list>
				<phone-alphabet :phones="phones" :phoneListIndex="phoneListIndex" @change="handleDatasetKey" @scrollAnimationOFF="handleScrollAnimationOFF"
				 @reset="handleReset">
				</phone-alphabet>
			</view>
		</view>
	</view>
</template>

<script>
	import phoneList from './phone-list.vue'
	import phoneAlphabet from './phone-alphabet.vue'

	export default {
		name: "phone-directory",
		components: {
			phoneList,
			phoneAlphabet
		},
		props: {
			phones: Object,
			hots: Array,
			default: false
		},

		data() {
			return {
				winHeight: 0,
				letter: 'A',
				scrollAnimationOFF: true,
				phoneListIndex: 'A',
				reset: true,
				nodeHeight:"",   //推荐节点高度
			}
		},
		computed: {
			phonesEscape() {
				return escape(JSON.stringify(this.phones))
			}
		},
		mounted() {
			let windowHeight = uni.getSystemInfoSync().windowHeight

			// #ifndef APP-PLUS
			this.winHeight = windowHeight + this.nodeHeight+100;
			//#endif

			//#ifdef APP-PLUS
			this.winHeight = windowHeight -56
			//#endif
			
			if (!this.phones) {
				uni.showToast({
					title: '没有数据',
					icon: "none",
					mask: false,
					duration: 1500
				})
			}


			//加载热门推荐

		},
		methods: {
			handleClick(e) {
				this.$emit('paramClick', e)
			},
			handleDatasetKey(val) {
				this.letter = val
			},
			handleScrollAnimationOFF(val) {
				this.scrollAnimationOFF = val
			},
			handlePhoneListIndex(val) {
				if (this.reset) {
					this.phoneListIndex = val
				}
			},
			handleReset(val) {
				if (val) {
					this.letter = ''
				}
				this.reset = val
			}

		}
	}
</script>

<style>
	.phone-main {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.phoneDirectory {
		display: flex;
		flex-direction: row;
		width:100%;
	}

	.phone-main-search {
		
		padding: 10upx 20upx;
		
		position: relative;
		
        margin:0 auto;
	}

	.phone-main-input {
		background-color: #eee;
		width:560upx;
		height:66upx;
		font-size: 28upx;
		border: 1px solid #e5e5e5;
		border-radius: 66px;
		padding: 10upx 20upx 10upx 60upx;
		box-sizing: border-box;
		
	}
   .img{
	   position:absolute;
	   left:20upx;
	   top:30upx;
	   width:30upx;
	   height: 30upx;
   }

	.main-content {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.hot {
		display: flex;
		flex-direction: column;
		
		width: 100%;
		box-sizing: border-box;
	}

	.hot-title {
		height: 88upx;
		background: #eee;
		color: #333;
		font-size: 32upx;
		margin-bottom: 20upx;
		line-height: 88upx;

		font-weight: bold;
		padding: 0 20upx;
	}

	.hot-city {
		display: flex;
		flex-wrap: wrap;
		padding: 0 40upx;
	}

	.hot-city-item {
		width: 30%;
		margin-right: 2%;
		height: 88upx;
		background: #eee;
		text-align: center;
		line-height: 88upx;
		margin-bottom: 20upx;
	}
</style>
