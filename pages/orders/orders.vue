<template>
	<view>
		
		
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
				state:0
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
			}
		}
	}
</script>

<style lang="scss" scoped>
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
