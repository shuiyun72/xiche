<template>
	<view class="appraise">
		<view class="appraise_body">
			<view class="item" v-for="item in myA" :key="item.id">
				<view class="a_title">
					<text class="ping">评</text>
					<text class="ps">订单编号: </text>
					<text class="ps"> {{item.code}}</text>
				</view>
				<view class="info_img_name">
					<image :src="httpp+item.operator.avatar" mode="widthFix" class="img"></image>
					<text class="name">展示通</text>
				</view>
				<view class="star_box">
					<uni-rate :value="item.star" :margin="5" :size="12" :disabled="true"/>
					<text class="star_n">{{starC(item.star)}}星</text>
				</view>
				<view class="grow_btn_app">
					<view class="item_btn" v-for="(itemC,index) in item.tags" :key="index">
						<button class="btn default_n round sm activec">{{itemC}}</button>
					</view>
				</view>
				<view class="a_raise">
					{{item.content}}
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myA:[
					{
						star:4,
						type:1,
						text:"这个师傅很专业 , 很认真 , 给我清洗的很干净",
						id:6
					},
					{
						star:5,
						type:1,
						text:"这个师傅很专业,很认真,给我清洗的很干净",
						id:7
					}
				],
				orderReject:[
					{cause:"服务态度好",text:"两个订单距离太远,无法及时赶到",id:1003},
					{cause:"不错",text:"订单时间不够,无法及时赶到",id:1004},
					{cause:"汽车清洗的很干净",text:"订单订单过多,无法及时赶到",id:1005}
				],
				rejectIndex:0,
			};
		},
		mounted() {
			this.$getApi('/api/user/my/comment',{},res=>{
				console.log(res.data.data)
				this.myA = res.data.data;
			})
		},
		computed:{
			httpp(){
				return this.$store.state.httpp;
			}
		},
		methods:{
			starC(n){
				switch(n){
				    case 1 : return "一"; 
				       break; //可选
				    case 2 : return "二";
				       break; //可选
					case 3 : return "三";
					   break; //可选
					case 4 : return "四";
					   break; //可选
				    default : return "五"
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.appraise{
	height: 100vh;
	background-color: $uni-def;
}
.grow_btn_app{
	display: flex;
	justify-content: start;
	padding: 30upx 0 30upx;
	.item_btn{
		margin-right: 20upx;
		
		.btn{
			font-size: 24upx;
			transform: scale(.9);
			&.activec{
				color: $uni-bl;
				border: 1upx solid $uni-bl;
			}
		}
	}
}
.appraise_body{
	padding: 24upx;
	.info_img_name{
		display: flex;
		align-items: center;
		padding-bottom: 10upx;
		.img{
			width: 66upx;
			height: 66upx;
			margin-right: 20upx;
		}
		.name{
			font-size: 28upx;
		}
	}
	.item{
		background-color: #fff;
		margin-bottom: 26upx;
		padding: 24upx;
		border-radius: 20upx;
		.a_raise{
			font-size: 28upx;
			color: #888;
			padding-bottom: 20upx;
		}
		.a_title{
			margin-bottom: 20upx;
			display: flex;
			align-items: center;
			border-bottom: 1upx solid #eee;
			.ping{
				display: inline-flex;
				width: 60upx;
				height: 60upx;
				background-color: $uni-bl;
				color: #fff;
				font-size: 36upx;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				transform: scale(.6);
				margin-right: 10upx;
			}
			.ps{
				margin-right: 10upx;
				font-size: 28upx;
				color: #777;
			}
		}
		.star_box{
			display: flex;
			align-items:baseline;
			.star_n{
				align-items:baseline;
				font-size: 30upx;
				margin-left: 30upx;
			}
		}
	}
}
</style>
