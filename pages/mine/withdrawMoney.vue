<template>
	<view>
		<uni-list>
			<uni-list-item title="提现金额" :showArrow="false">
				<template v-slot:right="">
					<input type="text" v-model="money" placeholder="请填写提现金额" class="add_car_input" />
				</template>
			</uni-list-item>
			<view class="bg10_f"></view>
			<uni-list-item title="提现至" :showArrow="false">
				<template v-slot:right="">
					<radio-group @change="radioChange" class="group_box">
						<label class="group_item" v-for="(item, index) in items" :key="item.value">
							<view class="vis">
								<radio :value="item.value" :checked="index === current" class="radio"/>
								<image :src="'../../static/img/mine/'+item.img" mode="widthFix" class="w_img"></image>
								{{item.name}}
							</view>
						</label>
					</radio-group>

				</template>
			</uni-list-item>
			<uni-list-item title="姓名" :showArrow="false">
				<template v-slot:right="">
					<input type="text" v-model="name" placeholder="请填写您的真实姓名" class="add_car_input" />
				</template>
			</uni-list-item>
			<uni-list-item title="账号" :showArrow="false">
				<template v-slot:right="">
					<input type="text" v-model="account" :placeholder="'请填写'+items[current].name+'账号'" class="add_car_input" />
				</template>
			</uni-list-item>
		</uni-list>
		<view class="sub_btn">
			<button class="btn blue" @click="next">提 交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: "",
				name: "",
				items: [{
						value: 'USA',
						name: '微信',
						img:"wx.png"
					},
					{
						value: 'CHN',
						name: '支付宝',
						img:"zfb.png",
						checked: 'true'
					}
				],
				current:1,
				account:""
			};
		},
		methods: {
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			next(){
				let dataL = {
					payment:this.items[this.current].name,
					money:this.money,
					truename:this.name,
					account:this.account
					
				}
				console.log(dataL)
				let this_ = this;
				this.$getApi("/api/user/cash",dataL,res=>{
					console.log(res)
					uni.switchTab({
						url:"./mine"
					})	

				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg10_f {
		background-color: #f0f0f0;
		height: 20upx;
	}

	.add_car_input {
		font-size: 26upx;
		text-align: right;
		color: #666;
	}
	.group_box{
		display: flex;
		.vis{
			display: inline-flex;
			align-items: center;
			.radio{
				transform: scale(.5);
				margin-left: 40upx;
			}
			.w_img{
				width: 36upx;
				margin-right: 10upx;
			}
		}
		
	}
	.sub_btn{
		padding:260upx 40upx 520upx;
		background-color: #f0f0f0;
		.btn{
			padding: 26upx 0;
		}
	}
</style>
