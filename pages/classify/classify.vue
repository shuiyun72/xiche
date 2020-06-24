<template>
	<view class="classify">
		<view class="c_header">
			<view class="t1">
				{{cItem.tNum}}
			</view>
			<view class="t2">
				{{cItem.text}}(个)
			</view>
		</view>
		<view class="classify_body">
			<view class="c_o_title bdb1">
				订单明细
			</view>
			<view class="select_sy">
				<view class="bdb1 select_title_s">
					<view class="item_bef item" @click="classifyShow" :class="{'item_aft':carXshow}">
						类型筛选
					</view>
					<view class="item_bef item" @click="dateShow" :class="{'item_aft':dateShowS}" v-show="cItem.type != 1">
						日期筛选
					</view>
					<view class="item_bef item" @click="serveShow" :class="{'item_aft':carSershow}">
						类目筛选
					</view>
				</view>
				
				<view class="shade_sy" v-show="carXshow">
					<view class="select_box_sy">
						<view class="item_s" v-for="(item,index) in classifyList" :key="item.uid" :class="{'active':index == classifyS}"
						 @click="classifySe(item,index)">
							{{item.name}}
						</view>
					</view>
					<view class="true_btn">
						<view class="btn" @click="initBtn('classify')">
							重置
						</view>
						<view class="btn or" @click="subBtn('classify')">
							确定
						</view>
					</view>
				</view>
				<view class="shade_sy" v-show="dateShowS">
					<view class="picker_date_sy">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="startDateChange">
							<!-- <view class="item_s">{{date}}</view> -->
							<input type="text" v-model="startDate" placeholder="起始日期" class="item_input"/>
						</picker>
						<view class="x_line"></view>
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="endDateChange">
							<!-- <view class="item_s">{{date}}</view> -->
							<input type="text" v-model="endDate" placeholder="结束日期" class="item_input"/>
						</picker>
					</view>
					<view class="true_btn">
						<view class="btn" @click="initBtn('date')">
							重置
						</view>
						<view class="btn or" @click="subBtn('date')">
							确定
						</view>
					</view>
				</view>
				<view class="shade_sy" v-show="carSershow">
					<view class="select_box_sy">
						<view class="item_s" v-for="(item,index) in carServeList" :class="{'active':index == carSer}"
						 @click="carSerC(item,index)">
							{{item}}
						</view>
					</view>
					<view class="true_btn">
						<view class="btn" @click="initBtn('carSer')">
							重置
						</view>
						<view class="btn or" @click="subBtn('carSer')">
							确定
						</view>
					</view>
				</view>
			</view>
			<view class="c_ify_lit">
				<view class="item bdb1" v-for="item in orderList" :key="item.id">
					<view class="title_s">
						<view class="c_l">
							{{item.title}}
						</view>
						<view class="c_r">
							{{item.xing}}
						</view>
					</view>
					<view class="c_info">
						<text>订单病号: {{item.code}}</text>
						<text>{{item.afterTime}}</text>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				cItem: {},
				orderList: [{
						title: "单次外部清洗",
						code: "51215233145",
						xing: "小型汽车",
						afterTime: "2020-05-06 13:01",
						id: 332
					}
				],
				classifyList: [],
				carServeList:[],
				classifyS: -1,
				carSer: -1,
				carXshow:false,
				dateShowS: false,
				carSershow:false,
				date: this.getDate(),
				startDate: "",
				endDate: "",
				carX:""
			}
		},
		onLoad(op) {
			console.log(op.item)
			let time = (new Date).getTime();
			let thisDateL = new Date(time); // 获取的是前一天日期
			
			let nowDate = new Date();
			let cloneNowDate = new Date();
			let fullYear = nowDate.getFullYear();
			let month = nowDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
			let endOfMonth = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天
			
			
			this.cItem = JSON.parse(op.item);
			if(this.cItem.type == 1){
				uni.setNavigationBarTitle({
					title: '今日订单'
				})
				thisDateL = thisDateL.getFullYear() + "-" + (thisDateL.getMonth()> 9 ? (thisDateL.getMonth() + 1) : "0" + (thisDateL.getMonth() + 1)) + "-" +(thisDateL.getDate()> 9 ? (thisDateL.getDate()) : "0" + (thisDateL.getDate()));
				this.getOrder("",thisDateL+' 00:00:00',thisDateL+" 23:59:59");
				
			}else
			if(this.cItem.type == 2){
				let statD = fullYear+"-"+month+"-01 00:00:00";
				let endTD = fullYear+"-"+month+"-"+endOfMonth+" 23:59:59";
				this.getOrder("",statD,endTD);
				uni.setNavigationBarTitle({
					title: '本月订单'
				})
			}else
			if(this.cItem.type == 3){
				this.getOrder()
				uni.setNavigationBarTitle({
					title: '累计订单'
				})
			}
			// classifyList
			this.$getApiTime("/api/user/car/xing",{},res=>{
				console.log(res)
				let carXing = [{name:'全部',id:""}];
				this.$store.commit("setCarXing",res.data);
				this.classifyList = carXing.concat(res.data)
			})
			this.$getApiTime("/api/operator/car/service",{},res=>{
				let CarServe = ['全部'];
				this.$store.commit("setCarServe",res.data);
				this.carServeList = CarServe.concat(res.data)
			})
		},
		methods: {
			calcDate(type){
				if(type == 1){
					
				}
			},
			getOrder(carX,startT,endT,carC){
				carX = carX || "";
				startT = startT || "";
				endT = endT || "";
				
				if(carC && carC != "全部"){
					carC = carC
				}else{
					carC = ""
				}
				let orderData = {
					type:0,
					car_xing_id:carX,
					start_time:startT,
					end_time:endT,
					service_name:carC,
					page:1,
					paginate:100
				}
				console.log(orderData)
				this.$getApiTime('/api/operator/orderList',orderData,res=>{
					console.log(res.data)
					this.orderList = res.data.data;
					this.dateShowS = false;
					this.carXshow = false;
					this.carSershow = false;
					// this.msgInfo = res.data.data
				})
			},
			classifySe(item, index) {
				this.classifyS = index;
				this.carX = item.id;
				console.log(item)
			},
			carSerC(item, index){
				this.carSer = index;
			},
			classifyShow() {
				this.dateShowS = false;
				this.carSershow = false;
				this.carXshow = !this.carXshow; 
			},
			dateShow() {
				this.carXshow = false;
				this.carSershow = false;
				this.dateShowS = !this.dateShowS;
			},
			serveShow(){
				this.carXshow = false;
				this.dateShowS = false;
				this.carSershow = !this.carSershow; 
			},
			
			getDate(type) {
				const date = new Date();

				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;

				return `${year}-${month}-${day}`;
			},
			startDateChange: function(e) {
				this.startDate = e.detail.value+" 00:00:00";
			},
			endDateChange: function(e) {
				this.endDate = e.detail.value+" 23:59:59";
			},
			initBtn(el){
				this.classifyS = -1;
				this.carSer = -1;
				this.startDate = "";
				this.endDate = "",
				this.carX = "";
				this.getOrder(this.carX,this.startDate,this.endDate)
			},
			subBtn(el){
				if(this.carSer < 0){
					this.getOrder(this.carX,this.startDate,this.endDate)
				}else{
					this.getOrder(this.carX,this.startDate,this.endDate,this.carServeList[this.carSer])
				}
				
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-def;
		border-top: 1upx solid #eee;
	}

	.c_header {
		background-color: #fff;
		padding: 50upx 0;
		text-align: center;
		margin-bottom: 20upx;

		.t1 {
			color: $uni-or;
			font-size: 52upx;
			font-weight: bold;
		}

		.t2 {
			padding-top: 20upx;
			font-size: 28upx;
		}
	}

	.classify_body {
		background-color: #fff;
	}

	.c_o_title {
		color: $uni-or;
		align-items: center;
		padding: 20upx;
		font-size: 36upx;

		&::before {
			display: inline-block;
			width: 7upx;
			height: 34upx;
			background-color: $uni-or;
			content: "";
			margin-right: 20upx;
		}
	}

	.bdb1 {
		border-bottom: 1upx solid #eee;
	}

	.select_sy {
		position: relative;

		.true_btn {
			display: flex;
			background-color: #fff;

			.btn {
				width: 50%;
				text-align: center;
				padding: 32upx 0;
				border-top: 1upx solid #eee;
				border-bottom: 1upx solid #eee;

				&.or {
					background-color: $uni-or;
					border-top: 1upx solid $uni-or;
					border-bottom: 1upx solid $uni-or;
					color: #fff;
				}
			}
		}

		.select_title_s {
			display: flex;

			.item {
				width: 50%;
			}
		}
	}

	.shade_sy {
		position: absolute;
		top: 65upx;
		left: 0;
		width: 100%;
		background-color: rgba(0, 0, 0, .5);
		height: 86vh;
	}

	.select_box_sy {
		padding: 20upx 0;
		background-color: #fff;

		.item_s {
			font-size: 32upx;
			padding: 14upx 0upx 14upx 66upx;
			color: #666;

			&.active {
				color: $uni-or;
			}
		}
		
	}
	.picker_date_sy{
		display: flex;
		padding: 20upx 0;
		background-color: #fff;
		padding: 20upx;
		.item_input{
			font-size: 26upx;
			background-color: #f0f0f0;
			display: inline-block;
			width: 200upx;
			padding: 8upx 0 8upx;
			text-align: center;
		}
		.x_line{
			width: 100upx;
			height: 2upx;
			background-color: #f0f0f0;
			margin: 24upx 24upx 0;
			
		}
	}

	.item_bef {
		font-size: 32upx;
		color: #999;
		padding: 16upx 20upx;

		&::after {
			display: inline-block;
			font-family: "iconfont" !important;
			font-size: 24upx;
			font-style: normal;
			content: "\e62d";
			margin-left: 8upx;
			transform: scale(.8);
		}
	}

	.item_aft {
		font-size: 32upx;
		color: $uni-or;
		padding: 16upx 20upx;

		&::after {
			display: inline-block;
			font-family: "iconfont" !important;
			font-size: 24upx;
			font-style: normal;
			content: "\e658";
			margin-left: 8upx;
			transform: scale(.8);
		}
	}

	.c_ify_lit {
		.item {
			padding: 10upx 0;

			.title_s {
				display: flex;
				font-size: 36upx;
				justify-content: space-between;
				padding: 10upx 20upx;

				.c_l {
					color: #666;
				}

				.c_r {
					color: #333;
				}
			}

			.c_info {
				font-size: 28upx;
				color: #999;
				padding: 10upx 20upx;
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>
