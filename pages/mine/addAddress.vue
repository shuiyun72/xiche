<template>
	<view>
		<uni-list>
			<uni-list-item-point title="市" point=true rightText="郑州市"></uni-list-item-point>
			<uni-list-item-point title="县/区" point=true rightText="中原区"></uni-list-item-point>
			<uni-list-item-point title="街道"  point="true">
				<template v-slot:right="">
				<picker @change="routeListC" :value="routeListSel" :range="routeList" range-key="name">
					<view class="uni-input">{{routeList[routeListSel].name}}</view>
				</picker>
				</template>
			</uni-list-item-point>
			<uni-list-item-point title="小区"  point="true">
				<template v-slot:right="">
				<picker @change="areaListC" :value="areaListSel" :range="areaList" range-key="name">
					<view class="uni-input">{{areaList[areaListSel].name}}</view>
				</picker>
				</template>
			</uni-list-item-point>
			<uni-list-item-point title="小区期数/楼栋号" :showArrow="false" point="true">
				<template v-slot:right="">
					<input type="text" :value="xiaoquInp" placeholder="请填写小区期数/楼栋号" class="add_car_input"/>
				</template>
			</uni-list-item-point>
		</uni-list>
		<view class="address_info">
			<text class="iconfont icongaiicon-"></text>
			<text>找不到你所指定的小区?请点击这里</text>
			<text class="blue" @click="navigateTo('./dredgeON')">申请开通</text>
		</view>
		<uni-list>
			<uni-list-item-point title="经常使用的停车位1" point=true :showArrow="false">
				<template v-slot:right="">
					<input type="text" :value="inpNum1" placeholder="请填写车位号 / 位置描述" class="add_car_input"/>
				</template>
			</uni-list-item-point>
			<uni-list-item-point title="经常使用的停车位2" :showArrow="false">
				<template v-slot:right="">
					<input type="text" :value="inpNum2" placeholder="请填写车位号 / 位置描述" class="add_car_input"/>
				</template>
			</uni-list-item-point>
			<uni-list-item-point title="经常使用的停车位3" :showArrow="false">
				<template v-slot:right="">
					<input type="text" :value="inpNum3" placeholder="请填写车位号 / 位置描述" class="add_car_input"/>
				</template>
			</uni-list-item-point>
			<uni-list-item-point title="经常使用的停车位4" :showArrow="false">
				<template v-slot:right="">
					<input type="text" :value="inpNum4" placeholder="请填写车位号 / 位置描述" class="add_car_input"/>
				</template>
			</uni-list-item-point>
		</uni-list>
		<view class="sub_btn">
			<button class="btn blue" @click="navigateTo('./addSuccess')">提交</button>
		</view>
	</view>
</template>

<script>
	import uniListItemPoint from '../../components/uni-list-item-point/uni-list-item-point.vue'
	export default {
		data() {
			return {
				routeList:[{name:'请选择街道'},{name:'莲花街'},{name: '冬青街'}, {name:'雪松街'}],
				routeListSel:0,
				areaList:[{name:'请选择小区'},{name:'万科城'},{name: '芒果城'}, {name:'东方又一城'}],
				areaListSel:0,
				xiaoquInp:"",
				inpNum1:"",
				inpNum2:"",
				inpNum3:"",
				inpNum4:""
			};
		},
		methods:{
			routeListC(e){
				this.routeListSel = e.detail.value
			},
			areaListC(e){
				this.areaListSel = e.detail.value
			},
			navigateTo(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.sub_btn{
	padding: 154upx 40upx;
	background-color: #f0f0f0;
	.btn{
		padding: 26upx 0;
	}
}
.uni-input{
	color: #999;
}
.add_car_input{
	font-size: 26upx;
	text-align: right;
	color: #666;
}
.address_info{
	font-size: 26upx;
	background-color: #f0f0f0;
	padding: 20upx 26upx;
	color: #999;
	.icongaiicon-{
		font-size: 26upx;
		color: #999;
		margin-right: 10upx;
	}
	.blue{
		color: $uni-bl;
	}
}
</style>
