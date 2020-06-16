<template>
	<view class="appraise">
		<view class="ar_title">
			订单已完成
		</view>
		<view class="sm_t">
			请评价一下洗车工吧
		</view>
		<view class="sm_t_c">
			请评洗车工
		</view>
		<view class="star">
			<uni-rate v-model="star" :margin="16" :size="26"  @change="onChange"/>
		</view>	
		<view class="tag_list">
			<view class="item" v-for="(item,index) in tagList" :class="{'active':index==cIndex}" @click="handle(item,index)">
				{{item.name}}
			</view>
		</view>
		<view class="t_textarea">
			<textarea v-model="textarea" placeholder="请写下对洗车工的评价" class="textarea"/>
		</view>
		<view class="sub_btn">
			<button class="btn blue" @click="next">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				star:1,
				tagList:[],
				textarea:"",
				cIndex:0,
				cValue:[],
				thisItem:{}
			};
		},
		onLoad(ph) {
			this.thisItem = JSON.parse(ph.item);
			console.log(this.thisItem )
		},
		mounted() {
			this.$getApi('/api/user/order/tags',{},res=>{
				this.tagList = res.data
			})
		},
		methods:{
			onChange(el){
				console.log(el.value)
				this.star = el.value;
			},
			handle(item,index){
				this.cIndex = index;
				this.cValue.push(item.name);
			},
			next(){
				let tagsL = JSON.stringify(_.uniq(this.cValue));
				let dataL = {
					id:this.thisItem.id,
					star:this.star,
					tags:tagsL,
					content:this.textarea
				}
				this.$getApi('/api/user/order/comment',dataL,res=>{
					uni.reLaunch({
						url:'./apprMsg'
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.appraise{
		padding: 90upx 26upx 0;
		border-top: 1upx solid #eee;
		text-align: center;
		.t_textarea{
			padding: 70upx 0upx 0;
			.textarea{
				width: 100%;
				border: 1upx solid #eee;
				border-radius: 20upx;
				text-align: left;
				font-size: 28upx;
				padding: 26upx;
				box-sizing: border-box;
			}
		}
		.tag_list{
			display: flex;
			flex-wrap: wrap;
			.item{
				border: 1upx solid #ccc;
				padding: 6upx 26upx;
				font-size: 28upx;
				margin-right: 30upx;
				border-radius: 30upx;
				color: #999;
				&.active{
					color: $uni-bl;
					border: 1upx solid $uni-bl;
				}
			}
		}
		.star{
			padding: 50upx 0;
			.uni-rate{
				padding: 0 0 0 100upx;
			}
		}
		.ar_title{
			font-size: 40upx;
		}
		.sm_t{
			font-size: 30upx;
			color: #999;
			padding: 16upx 0 40upx;
			width: 60%;
			margin: 0 auto 40upx;
			border-bottom: 1upx dashed   #666;
		}
		.sm_t_c{
			font-size: 28upx;
			color: #999;
		}
	}
.sub_btn{
		padding:80upx 40upx 0;
		.btn{
			padding: 26upx 0;
		}
	}
</style>
