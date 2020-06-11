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
					<view class="item_bef item" @click="classifyShow" :class="{'item_aft':classifyS >= 0}">
						类型筛选
					</view>
					<view class="item_bef item" @click="dateShow" :class="{'item_aft':dateShowS}" v-show="cItem.type != 1">
						日期筛选
					</view>
				</view>
				
				<view class="shade_sy" v-show="classifyS >= 0">
					<view class="select_box_sy">
						<view class="item_s" v-for="(item,index) in classifyList" :key="item.uid" :class="{'active':index == classifyS}"
						 @click="classifySe(item,index)">
							{{item.text}}
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
					},
					{
						title: "单次外部清洗",
						code: "51215233145",
						xing: "小型汽车",
						afterTime: "2020-05-06 13:01",
						id: 333
					},
					{
						title: "单次外部清洗",
						code: "51215233145",
						xing: "小型汽车",
						afterTime: "2020-05-06 13:01",
						id: 334
					},
					{
						title: "单次外部清洗",
						code: "51215233145",
						xing: "小型汽车",
						afterTime: "2020-05-06 13:01",
						id: 336
					},
					{
						title: "单次外部清洗",
						code: "51215233145",
						xing: "小型汽车",
						afterTime: "2020-05-06 13:01",
						id: 337
					}
				],
				classifyList: [{
						text: "全部",
						uid: 1
					},
					{
						text: "小型汽车",
						uid: 2
					},
					{
						text: "SUV汽车",
						uid: 3
					},
					{
						text: "MPV汽车",
						uid: 4
					}
				],
				classifyS: -1,
				dateShowS: false,
				date: this.getDate(),
				startDate: "",
				endDate: "",
			}
		},
		onLoad(op) {
			console.log(op.item)
			this.cItem = JSON.parse(op.item);
			if(this.cItem.type == 1){
				uni.setNavigationBarTitle({
					title: '今日订单'
				})
			}else
			if(this.cItem.type == 2){
				uni.setNavigationBarTitle({
					title: '本月订单'
				})
			}else
			if(this.cItem.type == 3){
				uni.setNavigationBarTitle({
					title: '累计订单'
				})
			}
		},
		methods: {
			classifySe(item, index) {
				this.classifyS = index;
				console.log(item)
			},
			classifyShow() {
				this.dateShowS = false;
				this.classifyS = this.classifyS == -1 ? 0 : -1
			},
			dateShow() {
				this.classifyS = -1;
				this.dateShowS = !this.dateShowS
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
				this.startDate = e.detail.value
			},
			endDateChange: function(e) {
				this.endDate = e.detail.value
			},
			initBtn(el){
				this.classifyS = -1;
				this.startDate = "";
				this.endDate = ""
			},
			subBtn(el){
				if(el=='classify'){
					console.log(this.classifyS)
				}else{
					console.log(this.startDate,this.endDate)
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
