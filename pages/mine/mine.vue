<template>
	<view>
		<view class="mine">
			<view class="logo_img">
				
					<view class="top_img_in">
						<image src="../../static/img/mine/bg.png" mode="widthFix" class="img"></image>
					</view>	
				
				<view class="header_top_mine">
					<navigator url="./mineInfo">
					<view class="name_img">
						<view class="t">
							张大大
						</view>
						<image src="../../static/img/mine/toux.png" mode="widthFix" class="title_img"></image>
					</view>
					</navigator>
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
				<view class="iconfont iconguanbi" @click="closeJuan(0)"></view>
				<view class="ju_title">
					去完善信息
				</view>
				<view class="t">
					您还没有完善信息,需完善信息,
					才能查看,现在去填写?
				</view>
				<view class="t_btn">
					<button class="round btn sm default" @click="closeJuan(0)">取消</button>
					<button class="round btn sm  blue" @click="reLaunch('../mine/addCar')">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
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
		mounted() {
			if (this.state == 0) {
				this.$refs['juan0'].open()
			}
			
		},
		methods: {
			closeJuan(num) {
				this.$refs['juan' + num].close()
			},
			reLaunch(url){
				uni.reLaunch({
					url:url
				})
			},
			topNativeTo(type){
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
			},
			nativeTo(type){
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
					width: 90%;
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
