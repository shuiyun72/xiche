<template>
	<view class="stop_car">
		<radio-group @change="radioChange" class="car_gro">
			<label v-for="(item, index) in items"  class="item" @click="seItem(item, index)">
				<view >
					<radio :value="item.value" :checked="index === current" class="radio"/>
					<text class="iconfont icontingche"></text>
					<text>{{item.name}}</text>
				</view>
				
			</label>
		</radio-group>
		<view class="info">
			郑州高新区郑州高新区郑州高新区郑州高新区5号楼
		</view>
		<view class="sub_btn">
			<button class="btn blue" @click="next">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [{
						value: '1',
						name: '12号停车位',
						checked: 'true',
						id:1
					},
					{
						value: '2',
						name: '12号停车位',
						id:2
					},
					{
						value: '3',
						name: '20号停车位',
						id:3
					},
					{
						value: '4',
						name: '26号停车位',
						id:4
					},
				],
				current: 0,
				currItem:""
			};
		},
		methods: {
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			seItem(item, index){
				this.currItem = item;
			},
			next(){
				this.$store.commit('setP',{name:this.currItem.name,id:this.currItem.id})
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sub_btn{
		padding:300upx 40upx 0;
		background-color: #f0f0f0;
		.btn{
			padding: 26upx 0;
		}
	}
	.stop_car {
		height: 100vh;
		background-color: #f0f0f0;
		border-top: 1upx solid #eee;
	}
	.info{
		padding: 26upx;
		background-color: #fff;
		color: #999;
	}
	.car_gro{
		display: flex;
		flex-wrap: wrap;
		padding: 26upx 26upx 0;
		background-color: #fff;
		.item{
			width: 50%;
			color: #666;
			margin-bottom: 10upx;
			.icontingche{
				font-size: 30upx;
				margin-right: 20upx;
			}
		}
		.radio{
			transform: scale(.5);
		}
	}
</style>
