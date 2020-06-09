<template>
	<view class="derdge">
		<uni-list>
			<uni-list-item-point title="姓名" point="true" :showArrow="false" rightText="客户"></uni-list-item-point>
			<uni-list-item-point title="手机号"  point="true" :showArrow="false" rightText="13245689087"></uni-list-item-point>
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
		</uni-list>
		<view class="sub_btn">
			<button class="btn blue" @click="navigateTo('./dredgeMsg')">提交</button>
		</view>
	</view>
</template>

<script>
	import uniListItemPoint from '../../components/uni-list-item-point/uni-list-item-point.vue';
	export default {
		data() {
			return {
				routeList:[{name:'请选择街道'},{name:'莲花街'},{name: '冬青街'}, {name:'雪松街'}],
				routeListSel:0,
				areaList:[{name:'请选择小区'},{name:'万科城'},{name: '芒果城'}, {name:'东方又一城'}],
				areaListSel:0,
			};
		},
		methods:{
			routeListC(e){
				this.routeListSel = e.detail.value
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
