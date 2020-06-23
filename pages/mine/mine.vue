<template>
	<view>
		<view class="mine">
			<view class="logo_img">
				
					<view class="top_img_in">
						<image src="../../static/img/mine/bg.png" mode="widthFix" class="img"></image>
					</view>	
				
				<view class="header_top_mine">
					<view class="name_img" @click="toImginfo">
						<view class="t">
							{{userInfo.nickname?userInfo.nickname:"游客"}}
						</view>
						<image :src="httpp + userInfo.avatar" mode="widthFix" class="title_img"></image>
					</view>
					<view class="item" @click="topNativeTo(1)">
						<image src="../../static/img/mine/wodtc.png" mode="widthFix" class="img"></image>
						<view class="text">
							我的套餐
						</view>
					</view>
					<view class="item"  @click="topNativeTo(2)">
						<image src="../../static/img/mine/wodclk.png" mode="widthFix" class="img"></image>
						<view class="text">
							车辆库
						</view>
					</view>
					<view class="item" @click="topNativeTo(3)">
						<image src="../../static/img/mine/dizk.png" mode="widthFix" class="img"></image>
						<view class="text">
							地址库
						</view>
					</view>
					<view class="item"  @click="topNativeTo(4)">
						<image src="../../static/img/mine/shouji.png" mode="widthFix" class="img"></image>
						<view class="text">
							手机号库
						</view>
					</view>
				</view>
			</view>
			<view class="mine_body">
				<uni-list>
					<uni-list-item v-for="item in mineList" :key="item.type" :title="item.title" :thumb="'../../static/img/mine/'+item.icon" @click="nativeTo(item.type)"></uni-list-item>
				</uni-list>
			</view>
			
		</view>
		
		<uni-popup type="center" ref="juan0">
			<view class="juan_body">
				<view class="iconfont iconguanbi" @click.stop="closeJuan(0)"></view>
				<view class="ju_title">
					去完善信息
				</view>
				<view class="t">
					您还没有完善信息,需完善信息,
					才能查看,现在去填写?
				</view>
				<view class="t_btn">
					<button class="round btn sm default" @click.stop="closeJuan(0)">取消</button>
					<button class="round btn sm  blue" @click.stop="addCarH">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				state:1,
				mineList:[
					{icon:"wodqb.png",title:"我的钱包",type:1},
					{icon:"wodyhj.png",title:"我的优惠券",type:2},
					{icon:"wodpj.png",title:"我的评价",type:3},
					{icon:"shangwhz.png",title:"商务合作",type:4},
					{icon:"guanywm.png",title:"关于我们",type:5},
					{icon:"shez.png",title:"设置",type:6},
				]
			};
		},
		computed:{
			...mapState(["userInfo","httpp","hasLogin"]),
			groupid(){
				if(this.userInfo && this.userInfo.groupid){
					return this.userInfo.groupid
				}else{
					return 0
				}
			}
		},
		onShow() {
			console.log(this.userInfo,!this.userInfo)
			if (!this.userInfo || this.userInfo.groupid == 0) {
				this.$nextTick(()=>{
					this.$refs['juan0'].open()
				})	
			}else{
				try{
					this.$refs['juan0'].close()
				}catch(e){
					//TODO handle the exception
				}
				
			}
		},
		methods: {
			getUserInfoWX() {
				let this_ = this;
				if (!this.$store.state.hasLogin) {
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							console.log(loginRes);
							this_.$getApiTime("/api/auth/getopenid", {
								code: loginRes.code
							}, res => {
								console.log(res)
								if (res.data.is_bind == 0) {
									console.log("11")
									uni.getUserInfo({
										provider: 'weixin',
										success: function(infoRes) {
											console.log(infoRes)
											console.log('用户昵称为：' + infoRes.userInfo.nickName);
											uni.navigateTo({
												url: '../login/login?xcx=ws&openid=' + res.data.openid + '&nickname=' + infoRes.userInfo.nickName
											})
										} 
									});
								} else
								if (res.data.is_bind == 1){
									console.log(res)
									this_.$store.commit('login', res.data);
									setTimeout(() => {
										this_.getInit(() => {
											uni.navigateTo({
												url:'../mine/addCar?ws=1&xcx=ws'
											})
										});
									}, 500)
								}
							}, "false")
							// 获取用户信息
						}
					});
				}else{
					uni.navigateTo({
						url:'../mine/addCar?xcx=ws&ws=1'
					})
				}
			},
			addCarH(){
				// #ifdef MP
				this.getUserInfoWX();
				// #endif
				// #ifndef MP
				uni.navigateTo({
					url:'../mine/addCar?ws=1'
				})
				// #endif
			},
			closeJuan() {
				this.$refs['juan0'].close()
			},
			topNativeTo(type){
				if(!this.hasLogin){
					this.$refs['juan0'].open()
				}else{
					let urlL;
					switch(type){
						case 1: urlL = '../store/vouchersCar'; break;
						case 2: urlL = '../store/car'; break;
						case 3: urlL = '../store/addressList'; break;
						case 4: urlL = '../store/phone'; break;
					}
					uni.navigateTo({
						url:urlL
					})
				}
			},
			nativeTo(type){
				if(!this.hasLogin){
					this.$refs['juan0'].open()
				}else{
					let url;
					switch(type){
						case 1: url = './moneyBox'; break; 
						case 2: url = '../store/couponList'; break; 
						case 3: url = './appraise'; break; 
						case 4: url = './teamworkSW'; break;
						case 5: url = './aboutMine'; break;
						case 6: url = './set'; break;
					}
					uni.navigateTo({
						url:url
					})
				}
			},
			toImginfo(){
				if(!this.hasLogin){
					this.$refs['juan0'].open()
				}else{
					uni.navigateTo({
						url:'./mineInfo'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.mine{
	.top_img_in{
		width: 100%;
		.img{
			width: 100%;
		}
	}
	.mine_body{
		padding-top: 140upx;
	}
	.logo_img{
		position: relative;
		.header_top_mine{
			position: absolute;
			left: 50%;
			margin-left: -340upx;
			bottom: -120upx;
			background-color: #fff;
			display: flex;
			width: 600upx;
			justify-content: space-between;
			box-shadow: 0 0 6upx 2upx $uni-bl;
			border-radius: 20upx;
			padding: 100upx 40upx 20upx;
			.name_img{
				position:absolute;
				left: 50%;
				margin-left: -80upx;
				top:-150upx;
				width: 160upx;
				text-align: center;
				.t{
					font-weight: bold;
					margin-bottom: 20upx;
					color: #fff;
				}
				.title_img{
					width: 160upx;
					height: 160upx;
					border: 6upx solid #fff;
					box-shadow: 0 0 6upx 1upx $uni-bl;
					border-radius: 50%;
				}
			}
			.item{
				width: 20%;
				text-align: center;
				.img{
					width: 60%;
				}
				.text{
					font-size: 26upx;
				}
			}
		}
	}
}
.juan_body {
		background-color: #fff;
		position: relative;
		padding: 26upx 36upx;
		width: 440upx;
		border-radius: 26upx;

		.iconguanbi {
			position: absolute;
			top: 20upx;
			right: 16upx;
			font-size: 26upx;
		}

		.ju_title {
			text-align: center;
			font-size: 36upx;
			margin-bottom: 30upx;
		}

		.t {
			text-align: center;
			font-size: 26upx;
			color: #666;
			line-height: 46upx;
			margin-bottom: 20upx;
		}

		.t_btn {
			display: flex;

			.btn {
				width: 40%;
			}
		}
	}

</style>
