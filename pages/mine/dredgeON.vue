<template>
	<view class="derdge">
		<uni-list>
			<!-- <uni-list-item-point title="姓名" :showArrow="false" point="true">
				<template v-slot:right="">
					<input type="text" v-model="name" placeholder="客户" class="add_car_input"/>
				</template>
			</uni-list-item-point> -->
			<uni-list-item-point title="手机号" :showArrow="false" point="true">
				<template v-slot:right="">
					<input type="text" v-model="phone" placeholder="请输入手机号" class="add_car_input"/>
				</template>
			</uni-list-item-point>
			<uni-list-item-point title="县/区"  point="true">
				<template v-slot:right="">
				<picker @change="quListC" :value="quListSel" :range="quList" range-key="name">
					<view class="uni-input">{{quList[quListSel].name}}</view>
				</picker>
				</template>
			</uni-list-item-point>
			<uni-list-item-point title="街道" :showArrow="false" point="true">
				<template v-slot:right="">
					<input type="text" v-model="jiedao" placeholder="请输入街道名称" class="add_car_input"/>
				</template>
			</uni-list-item-point>
			<uni-list-item-point title="小区" :showArrow="false" point="true">
				<template v-slot:right="">
					<input type="text" v-model="area" placeholder="请输入小区名称" class="add_car_input"/>
				</template>
			</uni-list-item-point>
		</uni-list>
		<view class="sub_btn">
			<button class="btn blue" @click="next">提交</button>
		</view>
	</view>
</template>

<script>
	import uniListItemPoint from '../../components/uni-list-item-point/uni-list-item-point.vue';
	export default {
		data() {
			return {
				// name:"",
				phone:"",
				quList:[{name:'请选择县/区'}],
				quListSel:0,
				jiedao:"",
				area:""
			};
		},
		mounted() {
			this.$getApi("/api/auth/area",{pid:151,type:2},res=>{
				this.quList = res.data;		
			});
		},
		methods:{
			quListC(e){
				this.quListSel = e.detail.value
			},
			next(){
				let dataL = {
					// name:this.name,
					phone:this.phone,
					area:this.quList[this.quListSel].name,
					street:this.jiedao,
					house_name :this.area
				}
				this.$getApi("/api/user/apply/house",dataL,res=>{
					uni.navigateTo({
						url:'./dredgeMsg'
					})	
				});
			}

		}
	}
</script>

<style lang="scss" scoped>
	.add_car_input{
		font-size: 26upx;
		text-align: right;
		color: #666;
	}
.derdge{
	display: flex;
	flex-direction: column;
}
.sub_btn{
	padding: 260upx 40upx 460upx;
	flex:1;
	background-color: #f0f0f0;
	.btn{
		padding: 26upx 0;
	}
}
</style>
