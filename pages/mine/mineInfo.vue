<template>
	<view>
		<uni-list>
			<uni-list-item title="头像" :showArrow="false">
				<template v-slot:right="">
					<image :src="httpp + userInfo.avatar" class="mine_img"></image>
				</template>
			</uni-list-item>
			<uni-list-item title="姓名" :showArrow="false">
				<template v-slot:right="">
					<text class="f666">{{userInfo.nickname}}</text> 
				</template>
			</uni-list-item>
			<uni-list-item title="身份" :showArrow="false">
				<template v-slot:right="">
					<text class="f666">{{mineSF}}</text> 
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			...mapState(['httpp','userInfo']),
			mineSF(){
				switch (this.userInfo.groupid){
					case 0 :return '游客';break;
					case 1 :return '会员';break;
					case 2 :return 'vip会员';break;
				}
			}
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss" scoped>
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
