<template>
	<view>
		<view class="to_order" v-for="(itemC,index) in lastData"  :class="{active:indexI == index}" @click.stop="showHide(index)">
			<view class="show_more_o">
				<view class="">
					预约订单{{index+1}}
				</view>
				<view class="r">
					<text class="iconfont iconqingkongshanchu more_btn_del" @click.stop="deleteAdd(itemC,index)" v-if="index != 0">删除</text>
					<uni-icons :type="indexI == index?'arrowdown':'arrowright'"  size="16" color="#eeeeee"/>
				</view>
			</view>
			<view class="itemOrder">
			<uni-list>
				<uni-list-item-point title="车辆" :rightText="itemC.car_id.name"></uni-list-item-point>
				<uni-list-item-point title="洗车地址" :rightText="itemC.address_id.name"></uni-list-item-point>
				<uni-list-item-point title="停车位" :rightText="itemC.park_id.name"></uni-list-item-point>
			</uni-list>
			<uni-list class="mt10">
				<uni-list-item-point title="洗车内容选择" :showArrow="false" rightText=""></uni-list-item-point>
			</uni-list>
			<view class="car_com">
				<radio-group  class="sel_car_com">
					<label v-for="(item, index) in itemsCarList">
						<view class="item">
							<image src="../../static/img/jiag.png" mode="widthFix" class="img"></image>
							<view class="item_b">
								<view class="part1">
									<radio :value="item.value" :checked="index === itemC.mall_id?true:false" class="radio" :disabled="true"/>
									<text class="t">{{item.title}}</text>
								</view>
								<view class="part2">
									<image src="../../static/img/vip.png" mode="widthFix" class="vip_img"></image> 
									洗车券1张<text v-if="Number(item.price) > 0">+{{Number(item.price)}}元</text>
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
				<checkbox-group  class="checkbox_other">
					<label v-for="(item,indexss) in checkboxOther">
						<view class="item">
							<checkbox :value="item.name" :checked="(itemC.service_ids[0]-1) == indexss || (itemC.service_ids[indexss]-1) == indexss ?true:false" class="checkbox" :disabled="true"/>
							<text>{{item.name}}</text>
							<text class="red">￥{{item.price}}</text>
						</view>
					</label>
				</checkbox-group>
			</view>
			<uni-list class="time_pick">
				<uni-list-item-point title="清洗时间" point="true" :rightText="itemC.time">
				</uni-list-item-point>
			</uni-list>
			<uni-list>
				<uni-list-item-point title="联系电话" point="true" :rightText="itemC.relation_id.name"></uni-list-item-point>
			</uni-list>
			<view class="bezhu">
				<view class="title">
					备注信息
				</view>
				<textarea :value="itemC.remark" placeholder="请在这里填写备注信息" class="textarea" />
			</view>
			</view>
		</view>
		
		
		
		
		<view class="to_order" v-show="isCellDelete">
			<view class="show_more_o" v-if="lastData.length > 0">
				<view class="">
					预约订单{{lastData.length+1}}
				</view>
				<view class="r">
					<text class="iconfont iconqingkongshanchu" @click="cellDelete">删除</text>
				</view>
			</view>
			<uni-list>
				<uni-list-item-point title="车辆" point="true" :rightText="orderCar.name" @click="navigateTo('../store/car?from=toOrder')"></uni-list-item-point>
				<uni-list-item-point title="洗车地址" point="true" :rightText="orderAddress.name" @click="navigateTo('../store/address?from=toOrder')"></uni-list-item-point>
				<uni-list-item-point title="停车位" point="true" :rightText="orderP.name" @click="selStop"></uni-list-item-point>
			</uni-list>
			<uni-list class="mt10">
				<uni-list-item-point title="洗车内容选择" point="true" :showArrow="false" rightText=""></uni-list-item-point>
			</uni-list>
			<view class="car_com">
				<radio-group @change="radioChange" class="sel_car_com">
					<label v-for="(item, index) in itemsCarList">
						<view class="item">
							<image src="../../static/img/jiag.png" mode="widthFix" class="img"></image>
							<view class="item_b">
								<view class="part1" @click="selRadio(index)">
									<radio v-model="item.value" :checked="index === current" class="radio" />
									<text class="t">{{item.title}}</text>
								</view>
								<view class="part2">
									<image src="../../static/img/vip.png" mode="widthFix" class="vip_img"></image>
									 洗车券1张<text v-if="Number(item.price) > 0">+{{Number(item.price)}}元</text>
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
					<label v-for="item in checkboxOther">
						<view class="item">
							<checkbox :value="item.value" :checked="item.checked" class="checkbox" />
							<text>{{item.name}}</text>
							<text class="red">￥{{item.price}}</text>
						</view>
					</label>
				</checkbox-group>
			</view>
			<uni-list class="time_pick">
				<uni-list-item-point title="清洗时间" point="true" @click="showChangeTime">
					<template v-slot:right="">
						<picker mode="multiSelector" @columnchange="rinseTimeChange" :value="rinseTimeSel" :range="rinseTimeList">
							<view class="uni-input">
								<!-- <text v-show="JSON.stringify(rinseTimeSel) == '[0,0]'">请选择时间</text> -->
								<text>{{rinseTimeList[0][rinseTimeSel[0]]}},{{rinseTimeList[1][rinseTimeSel[1]]}}</text>
							</view>
						</picker>
					</template>
				</uni-list-item-point>
			</uni-list>
			<uni-list>
				<uni-list-item-point title="联系电话" point="true" :rightText="orderPhone.name" @click="navigateTo('../store/phone?from=toOrder')"></uni-list-item-point>
			</uni-list>
			<view class="bezhu">
				<view class="title">
					备注信息
				</view>
				<textarea v-model="vTextarea" placeholder="请在这里填写备注信息" class="textarea" />
			</view>
		</view>
		<view class="c_add_or" @click="beforeMoreNext" v-show="isCellDelete">
			<text class="iconfont icontianjia"></text>
			<text>继续添加洗车订单</text>
		</view>
		<view class="sub_btn">
			<button class="btn blue" @click="next">确认下单</button>
		</view>
		<uni-popup type="center" ref="juan0">
			<view class="juan_body">
				<view class="iconfont iconguanbi" @click="closeJuan(0)"></view>
				<view class="ju_title">
					添加洗车订单
				</view>
				<view class="t">
					请确定订单信息完整,继续添加订单?
				</view>
				<view class="t_btn">
					<button class="round btn sm default" @click="closeJuan(0)">取消</button>
					<button class="round btn sm  blue" @click="moreNext">确定</button>
				</view>
			</view>
		</uni-popup>
		<uni-popup type="center" ref="juan1">
			<view class="juan_body">
				<view class="iconfont iconguanbi" @click="closeJuan(1)"></view>
				<view class="ju_title">
					删除
				</view>
				<view class="t">
					确定删除预约订单{{deleIndex+1}},确定?
				</view>
				<view class="t_btn">
					<button class="round btn sm default" @click="closeJuan(1)">取消</button>
					<button class="round btn sm  blue" @click="deleteNext">确定</button>
				</view>
			</view>
		</uni-popup>
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
				itemsCarList: [],
				current: 0,
				rinseTimeList: [
					this.forData(),
					['上午6:00-12:00','下午12:00-18:00','下午18:00-20:00','晚上20:00-24:00']
				],
				rinseTimeSel:[15,2],
				vTextarea:"",
				relationId:"",
				lastData:[],
				checkboxOther:[{}],
				otherC:[],
				indexI:-1,
				deleIndex:-1,
				isCellDelete:true
			};
		}, 
		computed:{
			...mapState(['orderCar','orderAddress','orderP','orderPhone','carServe'])
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
			selRadio(index){
				console.log(index);
				this.current = index
			},
			forData(){
				let arr = [];
				for(let i =0 ;i< 31;i++){
					arr.push((i+1)+'日')
				}
				return arr;
				
			},
			init(){
				// this.setSelCar({name:"请选择车辆"});
				// this.setAddress({name:"请选择地址"});
				// this.setP({name:"请选择停车位"});
				// this.setPhone({name:"请选择手机号"});
				// this.rinseTimeSel = [0,0];
				// this.vTextarea = "";
			},
			//删除未来订单
			cellDelete(){
				this.isCellDelete = false;
			},
			//删除已确定订单
			deleteAdd(item,index){
				this.deleIndex = index;
				this.$refs['juan1'].open();
			},
			deleteNext(){
				this.lastData.splice(this.deleIndex,1);
				this.$refs['juan1'].close();
			},
			showHide(index){
				console.log(index)
				if(this.indexI == index){
					this.indexI = -1
				}else{
					this.indexI = index
				}
			},
			hasDuplicates(a) {
			  return _.uniq(a).length !== a.length; 
			},
			next(){
				console.log(this.lastData);
				let nnLastData = _.cloneDeep(this.lastData);
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
				console.log(nnLastData);
				nnLastData = _.map(nnLastData,resL=>{
					return {
						car_id: resL.car_id.id,
						address_id: resL.address_id.id,
						park_id: resL.park_id.id,
						mall_id: resL.mall_id,
						time: resL.time ,
						relation_id: resL.relation_id.id,
						remark: resL.remark,
						service_ids:JSON.stringify(resL.service_ids)
					}
				})
				console.log(nnLastData);
				let lastDataL;
				if(this.isCellDelete){
					if(dataL.car_id && dataL.address_id && dataL.park_id && dataL.relation_id){
						lastDataL = nnLastData.concat(dataL);
					}else{
						this.$msg('信息不完善,请完善信息');
						return false;
					}
				}else{
					lastDataL = nnLastData
				}
				
				let newlastDataL = _.cloneDeep(lastDataL)
				console.log(newlastDataL)
				if(newlastDataL.length > 0){
					console.log(newlastDataL)
					let isF = _.map(newlastDataL,irts=>{
						return irts.car_id
					})
					console.log(isF)
					console.log(this.hasDuplicates(isF))
					if(isF.length > 0 && this.hasDuplicates(isF)){
						this.$msg("车牌号重复");
						return false;
					}
				}
				let sssData = JSON.stringify(lastDataL)
				console.log(sssData)
				this.$getApi("/api/user/order/sure",{data:sssData},res=>{
					console.log(res)
					
					if(this.$store.state.userInfo.groupid == 0){
						uni.navigateTo({
							url:'./addAddress?item='+JSON.stringify(res.data)
						})
					}else{
						let otherC = JSON.stringify(this.otherC) == "[]" ? false : true;
						console.log(otherC);
						let isSucc = _.filter(res.data.orderList,resccc=>{
							return resccc.user_ticket_id == 0
						}).length > 0 ? false : true ;
						console.log(isSucc)
						if(this.itemsCarList.length > 0 && !otherC && isSucc && res.data.is_pay > 0){
							uni.reLaunch({
								url:'./orderSuccess'
							})
						}else{
							uni.navigateTo({
								url:'./orderTrue?item='+JSON.stringify(res.data.orderList)+'&user_coupon='+JSON.stringify(res.data.user_coupon)
							})
						}
						
					}
					
				})
				
			},
			// delet(el){
			// 	this.lastData.splice(el,1)
			// },
			closeJuan(num){
				this.$refs['juan'+num].close();
			},
			beforeMoreNext(){
				this.$refs['juan0'].open();
			},
			moreNext(){
				this.$refs['juan0'].close();
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 500
				});
				let itemsCarListId = this.itemsCarList.length > 0 ? this.itemsCarList[this.current].id : "";
				let dataL = {
					car_id: this.orderCar,
					address_id: this.orderAddress,
					park_id: this.orderP,
					mall_id: itemsCarListId,
					time: this.rinseTimeList[0][this.rinseTimeSel[0]]+' '+this.rinseTimeList[1][this.rinseTimeSel[1]] ,
					relation_id: this.orderPhone,
					remark: this.vTextarea,
					service_ids:this.otherC
				}
				if(dataL.car_id.id && dataL.address_id.id && dataL.park_id.id && dataL.relation_id.id){
					this.lastData.push(dataL);
				}else{
					this.$msg('信息不完善,请完善信息');
					return false;
				}
				
				let this_ = this;
				for(let i=0;i<this.lastData.length;i++){
					this_.$nextTick(()=>{
						// console.log(this_.$refs[`Model${i}`].$el)	
					})
				}
				
				// this.init();
			},
			radioChange(e) {
				console.log(e.detail)
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
	.juan_body {
		background-color: #fff;
		position: relative;
		padding: 26upx 36upx;
		width: 440upx;
		border-radius: 26upx;
	
		.iconguanbi {
			position: absolute;
			top: 20upx;
			right: 16upx;
			font-size: 26upx;
		}
	
		.ju_title {
			text-align: center;
			font-size: 36upx;
			margin-bottom: 30upx;
		}
	
		.t {
			text-align: center;
			font-size: 26upx;
			color: #666;
			line-height: 46upx;
			margin-bottom: 20upx;
		}
	
		.t_btn {
			display: flex;
	
			.btn {
				width: 40%;
			}
		}
	}
	.iconqingkongshanchu{
		font-size: 28upx;
	}
	.show_more_o{
		padding: 20upx 26upx;
		background-color: $uni-bl;
		// margin-bottom: 20upx;
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
		padding-bottom: 20upx;
		.more_btn_del{
			display: none;
		}
		&.active{
			.more_btn_del{
				display: inline-block;
				margin-right: 20upx;
			}
			.itemOrder{
				display: block;
			}
			.iconjiantou{
				transform:rotate(90deg);
			}
		}
		.itemOrder{
			display: none;
		}
	}

	.car_com {
		.sel_car_com {
			display: flex;
			background-color: #fff;
			border-top: 1upx solid #eee;
			padding: 10upx 16upx 0;

			.item {
				width: 330upx;
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
