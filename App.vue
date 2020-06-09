<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
page{
	font-size: 32upx;
}
.blue{
	color: $uni-bl;
}
.red{
	color: #f00;
}
.icon_input_sy{
	display: flex;
	border-bottom: 3rpx solid #eee;
	padding: 50rpx 12rpx 12rpx;
	.iconfont{
		font-size: 44upx;
	}
	.input{
		font-size: 26upx;
		padding: 4rpx 10rpx 4rpx 20upx;
		margin-left: 12rpx;
		width: 300rpx;
	}
}
.t_right{
	text-align: right;
}
.t_center{
	text-align: center;
}
.t_left{
	text-align: left;
}
.c_fff{
	color: #fff;
}
.c_or{
	color:$uni-or ;
}
.btn{
	line-height: 1;
	font-size: 28upx;
	&.round{
		border-radius: 80upx;
	}
	&.orange{
		background-color: $uni-or;
		color: #fff;
		border: 2upx solid $uni-or;
	}
	&.blue{
		background-color: $uni-bl;
		color: #fff;
		border: 2upx solid $uni-bl;
	}
	&.blue_n{
		background-color: #fff;
		color: $uni-bl;
		border: 2upx solid $uni-bl;
	}
	&.orange_n{
		background-color: #fff;
		color: $uni-or;
		border: 2upx solid $uni-or;
	}
	&.default{
		background-color: #ddd;
		border: 2upx solid #ddd;
		color: #fff;
		&.active{
			background-color: #fff;
			color: $uni-or;
			border: 2upx solid $uni-or;
		}
	}
	&.default_n{
		background-color: #fff;
		border: 2upx solid #ddd;
		color: #aaa;
		&.active{
			background-color: #fff;
			color: $uni-or;
			border: 2upx solid $uni-or;
		}
	}
	&.mini{
		padding: 2upx 10upx;
	}
	&.sm{
		padding: 16upx 20upx;
	}
	&.ms{
		padding: 26upx 30upx;
	}
	&.lg{
		padding: 20upx 30upx;
	}
}
</style>
