<template>
	<view>
		<uni-list>
			<uni-list-item title="头像" :showArrow="false">
				<template v-slot:right="">
					<image :src="httpp+mineMsg.avatar" class="mine_img"></image>
				</template>
			</uni-list-item>
			<uni-list-item title="姓名" :showArrow="false">
				<template v-slot:right="">
					<text class="f666">{{mineMsg.nickname}}</text> 
				</template>
			</uni-list-item>
			<uni-list-item title="注册时间" :showArrow="false">
				<template v-slot:right="">
					<text class="f666">{{mineMsg.created_at}}</text> 
				</template>
			</uni-list-item>
			<uni-list-item title="所属小区" :showArrow="false">
				<template v-slot:right="">
					<text class="f666">{{mineMsg.house.name}}</text>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				// mineMsg:{
				// 	img:"xicg.png",
				// 	name:"张世通",
				// 	date:"2020-01-01",
				// 	address:"升龙又一城"
				// }
			};
		},
		computed:{
			...mapState(['hasLogin', 'userInfo','homeInfo','httpp']),
			mineMsg(){
				if(this.userInfo){
				return this.userInfo;
				}else{
					return {};
				}
			}
		},
		mounted() {
			// console.log(uni.getStorageSync('userInfo'));
			// this.mineMsg = uni.getStorageSync('userInfo');
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f0f0f0;
	}
.mine_img{
	width: 100upx;
	height: 100upx;
}
.f666{
	color: #999;
}
</style>
