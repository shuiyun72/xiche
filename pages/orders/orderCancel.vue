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
						<view class="iconfont iconshanchu" @click="deleteImg(index)"></view>
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
				<textarea v-model="textareaText" placeholder="请输入取消说明" class="textarea" />
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
				upimageList: [],
				textareaText:"",
				orderInfo:{}
			}
		},
		onLoad(ph) {
			
			this.orderInfo = JSON.parse(ph.item);
			console.log(this.orderInfo)
		},
		methods: {
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			uploadFile(img,call){
				let this_ = this;
				var imgFiles = img;
				let token = this_.$store.state.userInfo.remember_token || 
				uni.getStorageSync('userInfo').remember_token ;
				console.log(this_.$apiUrl + '/api/auth/upload')
				uni.uploadFile({
					// 需要上传的地址
					url:this_.$apiUrl + '/api/auth/upload',
					// filePath  需要上传的文件
					filePath: imgFiles,
					name: 'file',
					formData: {  
						token: token
					  },
					success(res1) {
						// 显示上传信息
						console.log(res1)
						call instanceof Function && call(res1)
					}
				});
			},
			chooseImage(){
				let this_ = this;
				let token = this_.$store.state.userInfo.remember_token ||
				uni.getStorageSync('userInfo').remember_token ;	
				uni.chooseImage({
					count: 1,
					sizeType:['copressed'],
				    success: (res) => {
				        this.imageList = this.imageList.concat(res.tempFilePaths);				
						console.log(this_.$apiUrl + '/api/auth/upload')
						uni.uploadFile({
							url:this_.$apiUrl + '/api/auth/upload',
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: {  
								token: token
							  },
							success(res1) {
								// 显示上传信息
								console.log(JSON.parse(res1.data).data.url)
								this_.upimageList.push(JSON.parse(res1.data).data.url)
							}
						});
				    }
				});
			},
			submitBtn(){
				console.log(JSON.stringify(this.upimageList))
				this.$getApi("/api/operator/order/cancle",{
					id:this.orderInfo.id,
					type:2,
					qxCase:this.textareaText,
					qximglist:JSON.stringify(this.upimageList)
				},res=>{
					uni.reLaunch({
						url:'./orderRejectSuccess'
					})
				})
				
			},
			deleteImg(i){
				this.imageList.splice(i,1);
				this.upimageList.splice(i,1);
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
