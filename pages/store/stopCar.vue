<template>
	<view class="stop_car">
		<view v-if="items.length>0">
			<radio-group @change="radioChange" class="car_gro">
				<label v-for="(item, index) in items"  class="item" @click="seItem(item, index)">
					<view >
						<radio :value="item.value" :checked="index === current" class="radio"/>
						<text class="iconfont icontingche"></text>
						<text>{{item.name}}停车位</text>
					</view>
					
				</label>
			</radio-group>
			<view class="info">
				{{itemAdd.city_name}}{{itemAdd.area_name}}{{itemAdd.street_name}}{{itemAdd.house_name}}{{itemAdd.house_detail}}
			</view>
			<view class="sub_btn">
				<button class="btn blue" @click="next">确定</button>
			</view>
		</view>
		<view v-else>
			数据加载中...
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [],
				current: 0,
				currItem:"",
				itemAdd:{}
			};
		},
		onLoad(ph) {
			let phId = ph.id;
			this.$getApi("/api/user/address/detail",{id:phId},res=>{
				this.itemAdd = res.data;
				this.items = res.data.park;
				this.currItem = this.items[0];
			})
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
				let currItem = this.currItem;
				this.$store.commit('setP',{name:currItem.name,id:currItem.id})
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
