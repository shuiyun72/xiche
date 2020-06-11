<template>
	<view class="orders">
		<view class="o_c_body">
			<view class="c_title">
				<text class="t">请上传洗车前照片 (前后左右)</text>
				<text class="p">请上传照片</text>
			</view>
			<view class="photo_list">
				
				<view class="img_p" @click="chooseImage">
					<image src="../../static/img/sczp.png" mode="widthFix" class="img"></image>		
				</view>
				<block v-for="(image,index) in imageList" :key="index">
					<view class="img_p">
						<image class="img" :src="image" :data-src="image" @tap="previewImage" mode="widthFix"></image>
						<view class="iconfont iconshanchu" @click="deleteImg(index)"></view>
					</view>
				</block>
			</view>
			<view class="c_title">
				<text class="t2">示例: 车辆前后左右照片</text>
			</view>
			<view class="for_ext">
				<view class="item_img" v-for="(img,index) in carList" :key="index">
					<image :src="'../../static/img/'+img"></image>
				</view>
			</view>
		</view>
		<view class="o_d_submit">
			<button class="btn round orange ms" @click="submitBtn">确认</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageList: [],
				textareaText:"",
				carList:["qianb.png","houb.png","zuoc.png","youc.png"],
				tabSel:0,
				currentItem:{}
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.tabSel = option.type;
			this.currentItem = JSON.parse(option.item);
		},
		methods: {
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			chooseImage(){
				uni.chooseImage({
				    success: (res) => {
						console.log(res,res.tempFilePaths)
				        this.imageList = this.imageList.concat(res.tempFilePaths);
				    }
				});
			},
			submitBtn(){
				// uni.uploadFile({
				//     url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
				//     filePath: tempFilePaths[0],
				//     name: 'file',
				//     formData: {
				//         'user': 'test'
				//     },
				//     success: (uploadFileRes) => {
				//         console.log(uploadFileRes.data);
				//     }
				// });
				// uni.navigateTo({
				// 	url:'../orders/orderRejectSuccess'
				// })
				console.log(JSON.stringify(this.imageList))
				// uni.switchTab({
				//     url: '../orders/orders'
				// });
			},
			deleteImg(i){
				this.imageList.splice(i,1)
			},
		}
	}
</script>

<style lang="scss">
page{
	background-color: $uni-def;
}
.orders{
	border-top: 1upx solid #eee;
	background-color: $uni-def;
}
.o_d_submit{
	padding: 100upx 50upx 296upx;
}
.o_c_body{
	padding: 26upx;
	background-color: #fff;
	.for_ext{
		display: flex;
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
	.c_title{
		display: flex;
		justify-content: space-between;
		align-items:baseline;
		padding-bottom: 20upx;
		.t{
			font-size: 36upx;
			color: #666;
		}
		.t2{
			font-size: 30upx;
			color: #999;
		}
		.p{
			font-size: 30upx;
			color: #999;
		}
	}
	.photo_list{
		padding: 20upx 0;
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
	.t_textarea{
		width: 100%;
		.textarea{
			width: 100%;
			background-color: $uni-def;
			font-size: 26upx;
			padding: 20upx;
			box-sizing: border-box;
		}
	}
}
</style>
