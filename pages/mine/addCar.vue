<template>
	<view>
		<uni-list>
			<uni-list-item-point title="姓名" point="true" :showArrow="false" rightText="客户"></uni-list-item-point>
			<uni-list-item-point title="手机号"  point="true" :showArrow="false" rightText="13245689087"></uni-list-item-point>
			<uni-list-item-point title="车型"  point="true">
				<template v-slot:right="">
				<picker @change="bindPickerChange" :value="carArrayXingSelect" :range="carArrayXing" range-key="name">
					<view class="uni-input">{{carArrayXing[carArrayXingSelect].name}}</view>
				</picker>
				</template>
			</uni-list-item-point>
			<uni-list-item-point title="车牌号" :showArrow="false" point="true">
				<template v-slot:right="">
					<input type="text" value="" placeholder="请填写车牌号" class="add_car_input"/>
				</template>
			</uni-list-item-point>
			<uni-list-item-point title="车辆颜色"  point="true" :showArrow="false" :rightText="rightTextCarColor"></uni-list-item-point>
			<view class="car_color_list">
				<view class="item" v-for="(item,index) in carColorList" :class="{'active':index == selectColor}" @click="selColor(item,index)">
					<text class="moren" v-show="index == 0">默认</text>
					<image :src="'../../static/img/'+item.img" mode="widthFix" class="img"></image>
					<view class="text">
						{{item.text}}
					</view>
				</view>
			</view>
			<uni-list-item-point title="车品牌" rightText="请选择车的品牌" @click="navigateTo('../home/car')"></uni-list-item-point>
			<uni-list-item-point title="车辆照片" rightText="请上传照片" :showArrow="false"></uni-list-item-point>
			<view class="photo_list">
				<view class="img_p" @click="chooseImage">
					<image src="../../static/img/shangczp.png" mode="widthFix" class="img"></image>		
				</view>
				<block v-for="(image,index) in imageList" :key="index">
					<view class="img_p">
						<image class="img" :src="image" :data-src="image" @tap="previewImage" mode="widthFix"></image>
						<view class="iconfont iconshanchu" @click="deleteImg(index)"></view>
					</view>
				</block>
			</view>
			<view class="sm_title">
				示例: 前后左右
			</view>
			<view class="for_ext">
				<view class="item_img" v-for="item in carList" :key="item.id">
					<image :src="'../../static/img/'+item.img"></image>
				</view>
			</view>
		</uni-list>
		<view class="sub_btn">
			<button class="btn blue" @click="navigateTo('./addAddress')">下一步</button>
		</view>
	</view>
</template>

<script>
	import uniListItemPoint from '../../components/uni-list-item-point/uni-list-item-point.vue'
	export default {
		data() {
			return {
				carColorList:[
					{img:"../../static/img/1.png",text:"白色",id:0},
					{img:"../../static/img/huis.png",text:"灰色",id:1},
					{img:"../../static/img/heis.png",text:"黑色",id:2},
					{img:"../../static/img/jins.png",text:"香槟色",id:3},
					{img:"../../static/img/hongs.png",text:"红色",id:4},
					{img:"../../static/img/zhongs.png",text:"棕色",id:5},
					{img:"../../static/img/lans.png",text:"蓝色",id:6},
					{img:"../../static/img/1.png",text:"其他",id:7}
				],
				selectColor:0,
				rightTextCarColor:"请选择车辆颜色",
				carArrayXing: [{name:'请选择车型'},{name:'小型汽车'},{name: 'SUV'}, {name:'MPV'}],
				carArrayXingSelect: 0,
				imageList:[],
				carList:[
					{img:"qianb.png",id:1210},
					{img:"houb.png",id:1211},
					{img:"zuoc.png",id:1212},
					{img:"youc.png",id:1213}
				],
				
			};
		},
		methods:{
			selColor(item,index){
				this.selectColor = index;
				this.rightTextCarColor = item.text;
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.carArrayXingSelect = e.detail.value
			},
			chooseImage(){
				uni.chooseImage({
				    success: (res) => {
						console.log(res,res.tempFilePaths)
				        this.imageList = this.imageList.concat(res.tempFilePaths);
				    }
				});
			},
			deleteImg(i){
				this.imageList.splice(i,1)
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			navigateTo(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sub_btn{
		padding: 40upx;
		background-color: #f0f0f0;
		.btn{
			padding: 26upx 0;
		}
	}
	.sm_title{
		padding:0 0upx 10upx;
		font-size: 26upx;
		color: #999;
		transform: scale(.9);
	}
	.for_ext{
		display: flex;
		padding: 0 26upx 30upx;
		.item_img{
			width: 140upx;
			height: 140upx;
			margin-right: 30upx;
			image{
				width: 100%;
				height: 100%;
				
			}
		}
	}
	.photo_list{
		padding: 20upx 26upx;
		display: flex;
		flex-wrap: wrap;
		.img_p{
			width: 140upx;
			margin:0 30upx 30upx 0;
			position: relative;
			.iconshanchu{
				position: absolute;
				top: -16upx;
				right: -16upx;
				color:  $uni-or;
			}
			.img{
				width: 140upx;
				height: 140upx;
			}
		}
	}
.car_color_list{
	display: flex;
	flex-wrap: wrap;
	background-color: #f0f0f0;
	padding: 20upx 26upx 0;
	justify-content: space-between;
	.item{
		width: 160upx;
		background-color: #fff;
		text-align: center;
		margin-bottom: 20upx;
		padding: 36upx 0 26upx;
		position: relative;
		.moren{
			position: absolute;
			top: 0;
			left: 0;
			color: #fff;
			font-size: 28upx;
			transform: scale(.7);
		}
		&.active{
			background-color: $uni-bl;
			.text{
				color: #fff;
			}
		}
		.img{
			width: 80%;
		}
		.text{
			padding-top: 6upx;
			font-size: 26upx;
		}
	}
}
.add_car_input{
	font-size: 26upx;
	text-align: right;
	color: #666;
}
</style>
