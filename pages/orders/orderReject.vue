<template>
	<view class="orders_reject">
		<view class="or_title">
			拒绝原因
		</view>
		<view class="grow_btn">
			<view class="item" v-for="(item,index) in orderReject">
				<button class="btn default_n round sm" @click="selectReject(item,index)" :class="{'active':index == rejectIndex}">{{item.cause}}</button>
			</view>
			
		</view>
		<textarea class="t_textarea" v-model="tValue" :placeholder="tPlaceholder" />
		<view class="re_mtop18">
			<navigator url="./orderRejectSuccess">
				<button class="btn round orange ms" >提交</button>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderReject:[
					{cause:"距离太远",text:"两个订单距离太远,无法及时赶到"},
					{cause:"时间不够",text:"订单时间不够,无法及时赶到"},
					{cause:"订单过多",text:"订单订单过多,无法及时赶到"}
				],
				rejectIndex:-1,
				tPlaceholder:"请输入拒绝原因",
				tValue:""
			}
		},
		methods: {
			selectReject(el,index){
				this.rejectIndex = index;
				this.tValue = el.text;
			}
		}
	}
</script>

<style lang="scss">
.orders_reject{
	border-top: 1upx solid #eee;
	padding: 0 26upx;
}
.or_title{
	font-size: 34upx;
	padding: 20upx 0;
}
.grow_btn{
	display: flex;
	justify-content: start;
	margin: 10upx 0 30upx;
	.item{
		margin-right: 30upx;
	}
}
.t_textarea{
	background-color: #F6F6F6;
	width: 100%;
	border-radius: 10upx;
	padding: 20upx;
	font-size: 26upx;
	box-sizing: border-box;
	height: 30vh;
}
.re_mtop18{
	margin-top: 18vh;
	padding: 0 20upx;
}
</style>
