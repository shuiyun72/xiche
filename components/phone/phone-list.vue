<template>
	<view >
		<scroll-view class="scroll-list"
		:scroll-top="1"
		scroll-y="true"
		:scroll-with-animation="scrollAnimationOFF" 
		:scroll-into-view="scrollViewId" 
		:style="{height:winHeight + 'px'}" 
		@scroll="handleScroll">
			<view class="phone-list">
				<view class="list-item" 
				v-for="(item, key) of phones" 
				:key="key" 
				:id="key" >
					<view class="list-item-title" >{{key}}</view>
					<view class="list-item-left"  @click="handleClick" v-for="innerItem in item" :key="innerItem.id">
						<image class="img1"   :src="imgurl+innerItem.spell"></image>
						<view class="list-item-phone" 
						
						hover-class="commonly-hover" 
						:hover-start-time="20" 
						:hover-stay-time="70" 
						
						
						:data-name="innerItem.name"
						:data-id="innerItem.id"
						:data-phoneNumber="innerItem.phoneNumber"
						>
						{{innerItem.name}}
						</view>
					</view>
					
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"phone-list",
		props:{
			phones:Object,
			letter:String,
			scrollAnimationOFF:Boolean
		},
		data () {
			return {
				winHeight:0,
				scrollTop:0,
				letterDetails:[],
				timer:null,
				imgurl:this.config.url+'/uploads/'
			}
		},
		computed:{
			scrollViewId () {
				return this.letter
			}
		},
		mounted(){
			// #ifndef APP-PLUS
			this.winHeight = uni.getSystemInfoSync().windowHeight - 49.50
			//#endif
			
			//#ifdef APP-PLUS
			this.winHeight = uni.getSystemInfoSync().windowHeight - 100
			//#endif

		},
		methods:{
			handleClick (e) {
				this.$emit('handleClick',e.target.dataset)
			},
			handleScroll (e){
				if(this.letterDetails.length === 0){
					let view = uni.createSelectorQuery().in(this).selectAll('.list-item')
					
					view.boundingClientRect(data=>{
						console.log(data,1111)
						let top = data[0].top
						data.forEach((item,index)=>{
							item.top = item.top - top
							item.bottom  = item.bottom - top
							this.letterDetails.push({
								id:item.id,
								top:item.top,
								bottom:item.bottom
							})
						})
					}).exec()	
				}
				
				const scrollTop = e.detail.scrollTop
				this.letterDetails.some((item,index)=>{
					if(scrollTop>=item.top && scrollTop <= item.bottom - 5){
						this.$emit('change',item.id)
						this.$emit('reset',true)
						return true
					}
				})
			}
		}
			
	}
</script>

<style>
	
	.commonly-hover{
		background-color: #eee;
	}
	
	.scroll-list{
		
		height: 100vh;
		width:92vw;
		overflow-y: hidden;
	}

	.phone-list{
		display: flex;
		background-color: #fff;
		flex-direction:column;
		position:relative;
		width:100%;
	}
	
	.list-item {
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		flex:1;
		
		background-color: #fff;
		
		
	}
	
	/* .list-item >.list-item-phone{
	 	font-weight: normal;
	 } */
/* 	.list-item>.img1{
			width:27px;
		    height:27px;
			
			padding:0 10upx 0 35upx;
		} */
	.list-item-title{
		background-color: #eee;
		width:100%;
		padding-left:20rpx;
		box-sizing: border-box;
	}
	.list-item-left{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width:100%;
		flex:1;
		
	}

	image{
		width:54upx;
		height:56upx;
		/* min-width:54upx; */
		/* height: auto */
		padding:0 10upx 0 35upx;
	}
	
	.list-item-title,.list-item-phone{
		flex: 1;
		height: 88upx;
		line-height: 88upx;
		font-size: 32upx;
		font-weight: bold;
		padding: 0 20upx;
		border-bottom: 1px solid #e5e5e5;
	}
	
	

</style>
