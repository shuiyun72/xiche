<template>
	<view class="to_order">
		<view class="show_more_o" v-for="(mo,index) in lastData">
			<view class="">
				预约订单{{index+1}}
			</view> 
			<view class="r" @click="delet(index)">
				<text class="iconfont iconqingkongshanchu"></text> 删除
			</view>
		</view>
		<uni-list>
			<uni-list-item-point title="车辆" point="true" :rightText="orderCar.name"  @click="navigateTo('../store/car?from=toorder')"></uni-list-item-point>
			<uni-list-item-point title="洗车地址" point="true" :rightText="orderAddress.name" @click="navigateTo('../store/address?from=toorder')"></uni-list-item-point>
			<uni-list-item-point title="停车位" point="true" :rightText="orderP.name" @click="selStop"></uni-list-item-point>
		</uni-list>
		<uni-list class="mt10">
			<uni-list-item-point title="洗车内容选择" point="true" :showArrow="false" rightText=""></uni-list-item-point>
		</uni-list>
		<view class="car_com">
			<radio-group @change="radioChange" class="sel_car_com">
				<label v-for="(item, index) in itemsCarList" :key="item.value">
					<view class="item">
						<image src="../../static/img/jiag.png" mode="widthFix" class="img"></image>
						<view class="item_b">
							<view class="part1">
								<radio v-model="item.value" :checked="index === current" class="radio" />
								<text class="t">{{item.title}}</text>
							</view>
							<view class="part2">
								<image src="../../static/img/vip.png" mode="widthFix" class="vip_img"></image> 洗车券1张
							</view>
							<view class="p" v-for="ic in item.chexing">{{ic.chexing}}￥{{ic.price}}</view>
						</view>
					</view>
				</label>
			</radio-group>
		</view>
		<view class="other_s">
			<view class="title">
				其他服务(现金支付)
			</view>
			<checkbox-group @change="checkboxChange" class="checkbox_other">
				<label v-for="item in checkboxOther" :key="item.value">
					<view class="item">
						<checkbox :value="item.value" :checked="item.checked" class="checkbox" />
						<text>{{item.name}}</text>
						<text class="red">￥{{item.price}}</text>
					</view>
				</label>
			</checkbox-group>
		</view>
		<uni-list class="time_pick">
			<uni-list-item-point title="清洗时间"  point="true">
				<template v-slot:right="">
				<picker mode="multiSelector" @columnchange="rinseTimeChange" :value="rinseTimeSel" :range="rinseTimeList">
					<view class="uni-input">
						<!-- <text v-show="JSON.stringify(rinseTimeSel) == '[0,0]'">请选择时间</text> -->
						<text >{{rinseTimeList[0][rinseTimeSel[0]]}},{{rinseTimeList[1][rinseTimeSel[1]]}}</text>	
					</view>
				</picker>
				</template>
			</uni-list-item-point>
		</uni-list>
		<uni-list>
			<uni-list-item-point title="联系电话" point="true" :rightText="orderPhone.name" @click="navigateTo('../store/phone')"></uni-list-item-point>
		</uni-list>
		<view class="bezhu">
			<view class="title">
				备注信息
			</view>
			<textarea v-model="vTextarea" placeholder="请在这里填写备注信息" class="textarea"/>
		</view>
		<view class="c_add_or" @click="moreNext">
			<text class="iconfont icontianjia"></text>
			<text>继续添加洗车订单</text>
		</view>
		<view class="sub_btn">
			<button class="btn blue" @click="next">确认下单</button>
		</view>
	</view>
</template>

<script>
	import uniListItemPoint from '../../components/uni-list-item-point/uni-list-item-point.vue';
	import { mapState,mapMutations } from "vuex";
	export default {
		components:{
			uniListItemPoint
		},
		data() {
			return {
				itemsCarList: [{}],
				current: 0,
				rinseTimeList: [
					['10日', '11日', '12日', '13日', '14日'],
					['上午0:00-8:00', '晚上20:00-24:00']
				],
				rinseTimeSel:[0,0],
				vTextarea:"",
				relationId:"",
				lastData:[],
				checkboxOther:[{}],
				otherC:[]
			};
		}, 
		computed:{
			...mapState(['orderCar','orderAddress','orderP','orderPhone','carServe']),
			a(){
				return this.$store.state.initInfo.a || 123456
			},
		},
		mounted() {
			this.$getApi("/api/auth/mall/neirong",{},res=>{
				this.itemsCarList = res.data
			})
			this.checkboxOther = _.map(this.carServe,(ite,index)=>{
				return {...ite,value:index+'s'}
			})
			this.init();
		},
		methods: {
			...mapMutations(['setSelCar','setAddress','setP','setPhone']),
			init(){
				this.setSelCar({name:"请选择车的品牌"});
				this.setAddress({name:"请选择地址"});
				this.setP({name:"请选择停车位"});
				this.setPhone({name:"请选择手机号"});
				this.rinseTimeSel = [0,0];
				this.vTextarea = "";
			},
			next(){
				// navigateTo('./addAddress')
				console.log(this.lastData);
				let itemsCarListId = this.itemsCarList.length > 0 ? this.itemsCarList[this.current].id : ""
				let dataL = {
					car_id: this.orderCar.id,
					address_id: this.orderAddress.id,
					park_id: this.orderP.id,
					mall_id: itemsCarListId,
					time: this.rinseTimeList[0][this.rinseTimeSel[0]]+' '+this.rinseTimeList[1][this.rinseTimeSel[1]] ,
					relation_id: this.orderPhone.id,
					remark: this.vTextarea,
					service_ids:this.otherC
				}
				let lastDataL = this.lastData.concat(dataL);
				let sssData = JSON.stringify(lastDataL)
				console.log(sssData)
				this.$getApi("/api/user/order/sure",{data:sssData},res=>{
					// this.init();
					console.log(res)
					
					if(this.$store.state.userInfo.groupid == 0){
						uni.navigateTo({
							url:'./addAddress?item='+JSON.stringify(res.data)
						})
					}else{
						let otherC = JSON.stringify(this.otherC) == "[]" ? false : true;
						console.log(otherC);
						let isSucc = _.filter(res.data,res=>{
							return res.user_ticket_id == 0
						}).length > 0 ? false : true ;
						if(this.itemsCarList.length > 0 && !otherC && isSucc){
							uni.reLaunch({
								url:'./orderSuccess'
							})
						}else{
							uni.navigateTo({
								url:'./orderTrue?item='+JSON.stringify(res.data)
							})
						}
						
					}
					
				})
				
			},
			delet(el){
				this.lastData.splice(el,1)
			},
			moreNext(){
				let itemsCarListId = this.itemsCarList.length > 0 ? this.itemsCarList[this.current].id : "";
				let dataL = {
					car_id: this.orderCar.id,
					address_id: this.orderAddress.id,
					park_id: this.orderP.id,
					mall_id: itemsCarListId,
					time: this.rinseTimeList[0][this.rinseTimeSel[0]]+' '+this.rinseTimeList[1][this.rinseTimeSel[1]] ,
					relation_id: this.orderPhone.id,
					remark: this.vTextarea,
					service_ids:this.otherC
				}
				this.lastData.push(dataL);
				this.init();
			},
			radioChange(e) {
				console.log(e.detail.value)
			},
			checkboxChange(e) {
				var items = this.checkboxOther,
					values = e.detail.value;
					console.log(e)
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.value)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
				this.otherC = _.map(_.filter(this.checkboxOther,resss=>{
					return resss.checked
				}),res=>{
					return res.id
				})
			},
			rinseTimeChange(e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				// this.rinseTimeList[e.detail.column] = e.detail.value
				// this.$forceUpdate()
				
				if(e.detail.column == 0){
					console.log(e.detail)
					this.rinseTimeSel.splice(0, 1, e.detail.value)
					// this.rinseTimeSel[0] = this.rinseTimeList[0][e.detail.value]
				}else
				if(e.detail.column == 1){
					console.log(e.detail)
					this.rinseTimeSel.splice(1, 1, e.detail.value)
					// this.rinseTimeSel[1] = this.rinseTimeList[1][e.detail.value]
					//this.rinseTimeList[1] = e.detail.value
				}
				this.$forceUpdate()
			},
			navigateTo(url){
				uni.navigateTo({
					url:url
				})
			},
			selStop(){
				if(this.orderAddress.id){
					uni.navigateTo({
							url:'../store/stopCar?id='+this.orderAddress.id
					})
				}else{
					this.$msg('请选择洗车地址')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.show_more_o{
		padding: 20upx 26upx;
		background-color: $uni-bl;
		margin-bottom: 20upx;
		color: #fff;
		display: flex;
		justify-content: space-between;
		.r{
			font-size: 26upx;
			color: #ccc;
		}
	}
	.mt10 {
		margin-top: 22upx;
	}
	.sub_btn{
		padding:80upx 40upx;
		background-color: #f0f0f0;
		.btn{
			padding: 26upx 0;
		}
	}
	.c_add_or{
		color: $uni-bl;
		display: flex;
		align-items: center;
		padding: 26upx;
		.icontianjia{
			width: 40upx;
			margin-right: 20upx;
		}
	}
	.bezhu{
		background-color: #fff;
		padding: 10upx 26upx;
		.textarea{
			background-color: #f0f0f0;
			height: 180upx;
			font-size: 26upx;
			padding: 20upx;
			box-sizing: border-box;
			margin: 10upx 0;
		}
	}
	.time_pick{
		margin: 20upx 0;
	}
	.other_s {
		padding: 0 26upx;
		background-color: #fff;

		.title {
			color: #666;
		}

		.checkbox_other {
			display: flex;
			.item{
				// margin-right: 20upx;
				display: inline-flex;
				white-space: nowrap;
				align-items: baseline;
				.red{
					color: #f00;
				}
				.checkbox{
					transform: scale(.6);
				}
			}
		}
	}

	.to_order {
		border-top: 1upx solid #eee;
		background-color: #f0f0f0;
	}

	.car_com {
		.sel_car_com {
			display: flex;
			background-color: #fff;
			border-top: 1upx solid #eee;
			padding: 10upx 16upx 0;

			.item {
				width: 300upx;
				position: relative;

				.item_b {
					position: absolute;
					left: 0;
					top: 0;
					padding: 10upx;

					.radio {
						transform: scale(.5);
					}

					.part1 {
						white-space: nowrap;
						display: inline-flex;
						align-items: baseline;

						.t {
							color: #fff;
							font-size: 26upx;
							transform: scale(.8) translateX(-40upx);
						}

					}

					.part2 {
						padding: 20upx 0 6upx 20upx;

						.vip_img {
							width: 50upx;
							margin-right: 10upx;
						}

						color: #FAA003;
						font-size: 28upx;
					}

					.p {
						color: $uni-bl;
						font-size: 26upx;
						padding: 0 0 0 20upx;
					}
				}

				.img {
					width: 100%;
				}
			}
		}
	}
</style>
