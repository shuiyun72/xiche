<template>
	<view class="add_phone">
		<uni-list>
			<uni-list-item-point title="姓名" :showArrow="false" point="true">
				<template v-slot:right="">
					<input type="text" v-model="name" placeholder="客户" class="add_car_input"/>
				</template>
			</uni-list-item-point>
			<uni-list-item-point title="手机号" :showArrow="false" point="true">
				<template v-slot:right="">
					<input type="text" v-model="phone" placeholder="请填写手机号" class="add_car_input"/>
				</template>
			</uni-list-item-point>
		</uni-list>
		<view class="sub_btn">
			<button class="btn blue" @click.stop="next">提 交</button>
		</view>
	</view>
</template>

<script>
	import uniListItemPoint from '../../components/uni-list-item-point/uni-list-item-point.vue'
	export default {
		data() {
			return {
				title:"",
				name:"",
				phone:"",
				id:""
			};
		},
		onLoad(ph) {
			if(ph.item){
				uni.setNavigationBarTitle({
					title:"编辑手机号"
				})
				let itemL = JSON.parse(ph.item);
				this.name = itemL.name;
				this.phone = itemL.phone;
				this.id = itemL.id;
			}
		},
		methods:{
			next(){
				this.$getApi("/api/user/user/add",{
					name:this.name,
					phone:this.phone,
					id:this.id
				},res=>{
					console.log(res)
					// uni.navigateBack()
					uni.reLaunch({
						url:"../store/publicMsg"
					})
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sub_btn{
		padding:300upx 40upx 0;
		background-color: #f0f0f0;
		.btn{
			padding: 26upx 0;
		}
	}
.add_phone{
	height: 100vh;
	background-color: #f0f0f0;
}
.add_car_input{
	font-size: 26upx;
	text-align: right;
	color: #666;
}
</style>
