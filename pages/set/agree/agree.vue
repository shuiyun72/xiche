<template>
	<view>
		<view class="main">
			<rich-text :nodes="111"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:1,
				content:"",
			}
		},
		methods: {
			
		},
	  
	}
</script>

<style >
.main{
	min-height: 100vh;
	background-color: white;
}
</style>
