<template>
	<view class="orders">
		<view class="o_c_body">
			<view class="c_title">
				<text class="t">请上传订单指定地点照片</text>
				<text class="p">请上传照片</text>
			</view>
			<view class="photo_list">
				<block v-for="(image,index) in imageList" :key="index">
					<view class="img_p">
						<image class="img" :src="image" :data-src="image" @tap="previewImage" mode="widthFix"></image>
						<view class="iconfont iconshanchu"  @click="deleteImg(index)"></view>
					</view>
				</block>
				<view class="img_p" @click="chooseImage">
					<image src="../../static/img/sczp.png" mode="widthFix" class="img"></image>
				</view>
			</view>
			<view class="c_title">
				<text class="t">取消说明</text>
			</view>
			<view class="t_textarea">
				<textarea v-model="textareaText" placeholder="请输入取消说明" class="textarea"/>
			</view>
		</view>
		<view class="o_d_submit">
			<button class="btn round orange ms" @click="submitBtn">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageList: [],
				textareaText:""
			}
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
				uni.navigateTo({
					url:'./orderRejectSuccess'
				})
			},
			deleteImg(i){
				this.imageList.splice(i,1)
			}
		}
	}
</script>

<style lang="scss">
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
	.c_title{
		display: flex;
		justify-content: space-between;
		align-items:baseline;
		padding-bottom: 20upx;
		.t{
			font-size: 36upx;
			color: #666;
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
