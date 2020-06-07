<template>
	<view id="changeImg">
		<view class="main">
			<view class="main_one" @click="preview()">
				<view class="left">头像</view>
				<view class="right">
					<image class="img1" src="../../../static/userinfo.png"></image>
					<!-- <image class="img2" src="../../../static/more.png"></image> -->
				</view>
			</view>
			<view class="main_two">
				<view class="left">名字</view>
				<input class="right" readonly="readonly" v-model="username" />
			</view>
			
			<view class="main_two">
				<view class="left">会员身份</view>
				<input class="right" readonly="readonly" v-model="username" />
			</view>
           
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "", //名字
				info:{},
				imgUrl:this.$store.state.imgUrl,
				tempFilePaths:[],
				arr:"",
				user_id:"",
			}
		},
		methods: {
			//预览图片
			preview(url) {
				var _this=this;
				if(this.arr){
					var a=this.imgUrl+this.arr;
				}else{
					var a=this.imgUrl+this.info.head_img;
				}
			
			
			var arr=[];
			arr.push(a)
			   console.log(a)
				uni.previewImage({
					urls: arr,
					
					longPressActions: {
						itemList: ["拍照", "从相册中选择"],
						 // itemList: ['发送给朋友', '保存图片', '收藏',"打开"],
						success: function(data) {
							
							var num=data.tapIndex + 1
							if (num == 1) {
								uni.chooseImage({
									count: 1, //默认9
									sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
									sourceType: ['camera'], //相机
									success: function(res) {
										// console.log(JSON.stringify(res.tempFilePaths));
										var a=_this.tempFilePaths;
										_this.tempFilePaths = res.tempFilePaths.concat(a);
										
										const uploadTask = uni.uploadFile({
											url: _this.config.url+"up-header-img",
											filePath: _this.tempFilePaths[0],
											name: 'img',
											formData: {
												"img":"333",
												"user_id":_this.user_id
											},
											success: function(uploadFileRes) {
												
											var a=JSON.parse(uploadFileRes.data)
											 _this.arr=a.info;
											  
											  }
										})
									}
								});
							} else if (num == 2) {
								uni.chooseImage({
									count: 1, //默认9
									sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
									sourceType: ['album'], //从相册选择
									success: function(res) {
										
									//	console.log(JSON.stringify(res.tempFilePaths));
										var a=_this.tempFilePaths;
										_this.tempFilePaths = res.tempFilePaths.concat(a);
										
										const uploadTask = uni.uploadFile({
											url: _this.config.url+"up-header-img",
											filePath: _this.tempFilePaths[0],
											name: 'img',
											formData: {
												"img":"333",
												"users_id":_this.user_id
											},
											success: function(res) {
												
												
											var a=JSON.parse(res.data)
											
											 _this.arr=a.info;
											console.log(_this.arr)
											     
											 },
											 fail:res=>{
												 
											 }
										})
									}
								});
							}
						},
					}
				})
			},
			confirm(){
				this.request({
					url: this.config.url + "user-info",
					data: {
				        
					},
					method: 'get',
					success: (res) => {
						console.log(res)
						if (res.data.code == 1) {
							 var info = res.data.info;
							
						    uni.setStorage({
						    	key:"info",
						    	data:info,
						    	success: () => {
									
						    		uni.showToast({
						    			title: "修改头像成功"
						    		});
						    	}
						    	
						    })
						}else{
							uni.showToast({
								title:res.data.msg
							})
						}
				
					},
					fail:res=>{
						console.log(res)
					}
				});
				this.request({
					url:this.config.url+"edit-user",
					method:"post",
					data:{
						name:this.username},
					
					success:res=>{
				         if(res.data.code==1){
							 uni.showToast({
							 	title: res.data.msg
							 });
						 }else{
							 uni.showToast({
							 	title: res.data.msg
							 });
						 }
					}
				})
	        
			
			
			}
		},
		onLoad() {
			// //用户信息
			// this.request({
			// 	url: this.config.url + "user-info",
			// 	data: {
			
			// 	},
			// 	method: 'get',
			// 	success: (res) => {
			// 		if(res.data.code==1){
			// 			this.username=res.data.info.name
			// 		}
			
			// 	}
			// });
			// uni.getStorage({
			// 	key: "info",
			// 	success: res => {
					
			// 		this.info = res.data
					
			// 		this.arr=this.info.head_img;
			// 		this.user_id=res.data.token;
					
					
			// 	},
				
			// })
			
		}
	}
</script>

<style lang="scss">
	#changeImg{
		height: 100vh;
		background: white;
	}
	.main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 32rpx;
		background: white;

		.main_one {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #eee;
			height: 171rpx;

			.left {
				color: #303030;
				font-size: 32rpx;
			}

			.right {
				display: flex;
				align-items: center;

				.img1 {
					width: 105rpx;
					height: 105rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}

				.img2 {
					width: 16rpx;
					height: 28rpx;
				}
			}
		}

		.main_two {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 114rpx;
            border-bottom: 1px solid #eee;
			.left {
				color: #303030;
				font-size: 32rpx;
			}

			.right {
				color: #B0B0B0;
				font-size: 32rpx;
				text-align: right;
			}
		}

	}

	.confirm {
		width: 662rpx;
		height: 94rpx;
		background: #FF7C5E;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		margin: 469rpx auto 0;

	}
</style>
