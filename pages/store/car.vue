<template>
	<view>
		<view class="car_list">
			<view class="item" v-for="i in swMsg" :key="i.id" @click="selectCar(i)">
				<view class="part1">
					<image :src="$httpp + i.checolor.cover" mode="widthFix" class="l_img"></image>
					<view class="content">
						<view class="t1">
							<view class="l">{{i.chepai}}</view>
							<view class="r">{{i.chexing.name}}</view>
						</view>
						<view class="t1">
							<view class="r">{{i.checolor.name}}</view>
							<view class="r">{{i.chebrand.name}}</view>
						</view>
					</view>
					<image :src="i.img ? $httpp + i.img :'../../static/img/youc.png'" mode="widthFix" class="r_img"></image>
				</view>
				<view class="part2">
					<view class="item2" @click="editCar(i)">
						<text class="iconfont icontianxiegongdan-kuozhan-hebing"></text>
						<text>编辑</text>
					</view>
					<view class="item2" @click="deleteP(i)">
						<text class="iconfont iconqingkongshanchu"></text>
						<text>删除</text>
					</view>
				</view>
			</view>
		</view>
		<navigator url="../mine/addCar">
		<view class="add_car_btn">
			<text class="iconfont icontianjia"></text>
			<text>新建车辆</text>
		</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swMsg:[],
				from:""
			}
		},
		mounted() {
			this.$getApi("/api/user/car/list",{},res=>{		
				this.swMsg = res.data
			})
		},
		onLoad(ph) {
			console.log(ph)
			if(ph.from){
				this.from = ph.from;
			}
		},
		methods: {
			selectCar(e){
				console.log(e)
				if(this.from){
					this.$store.commit('setSelCar',{name:e.chepai,id:e.id})
				}
				uni.navigateBack();
			},
			editCar(el){
				console.log(el)
				uni.navigateTo({
					url:'../mine/addCar?item='+ JSON.stringify(el)
				})
			},
			deleteP(item){
				let this_ = this;
				console.log(item)
				uni.showModal({
				    title: '删除',
				    content: '是否确认删除?',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							this_.$getApi("/api/user/car/del",{id:item.id},resl=>{
								uni.reLaunch({
									url:'./publicMsg'
								})
							})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.add_car_btn{
	position: fixed;
	left: 0;
	bottom: 0;
	background-color: $uni-bl;
	width: 750upx;
	text-align: center;
	color: #fff;
	padding: 26upx 0;
	font-size: 36upx;
	.icontianjia{
		margin-right: 20upx;
	}
}
.car_list{
	height: 100vh;
	background-color: #f0f0f0;
	border-top: 1upx solid #eee;
	.item{
		background-color:#fff;
		padding: 30upx 26upx 20upx;
		margin-bottom: 20upx;
		.part2{
			display: flex;		
			color: #999;
			padding: 24upx 0 16upx 360upx;
			margin-top: 10upx;
			border-top: 1upx solid #eee;
			.item2{
				margin-left: 40upx;
				.iconfont{
					margin-right: 20upx;
				}
			}
		}
		.part1{
			display: flex;
			.l_img{
				width: 90upx;
			}
			.content{
				width: 450upx;
				.t1{
					display:flex;
					font-weight: bold;
					color: #666;
					margin-bottom: 26upx;
					padding:0 10upx;
					.l{
						width: 200upx;
					}
					.r{
						width: 200upx;
					}
				}
			}
			.r_img{
				width: 160upx;
				height: 160upx;
			}
		}
	}
}
</style>
