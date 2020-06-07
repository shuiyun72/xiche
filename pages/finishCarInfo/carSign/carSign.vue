<template>
	<view id="category">
		<phone-directory :phones="phones" @paramClick="paramClick"></phone-directory>
	</view>
</template>

<script>
	import phoneDirectory from '@/components/phone/phone-directory.vue'
	export default {
		name: "phones",
		components: {
			phoneDirectory
		},
		data() {
			return {

				mockList: [{
						ename: "A",
						data: [{
							id: 236,
							cat_name: "安全气囊",
							cover: "images/31bd58227d039f14baab5abbbcd342a0.jpg"
						}]
					},
					{
						ename: "B",
						data: [{
							id: 150,
							cat_name: "变速箱",
							cover: "images/6df669b1a68445d88280e47fb9c7b024.jpg"
						}]
					}


				],

				phones: {},
				id: "" //父级id
			}
		},
		methods: {
			paramClick(e) {
				console.log("indexlist", e)
				uni.navigateTo({
					url: "/pages/goods/goods-list?id=" + e.id
				})
			},
			firstLoad() {
				uni.request({
					url: this.config.url + "api/auth/category",
					method: "post",
					data: {
						pid: this.id,
					},
					success: (res) => {
						//console.log(res)
						if (res.data.code == 1) {



							var arr = res.data.data;
							arr.forEach((item) => {

								var arr1 = []
								item.data.forEach((row) => {
									var obj = {}
									//	console.log(row)
									obj.id = row.id;
									obj.name = row.cat_name;
									obj.spell = row.cover;
									arr1.push(obj)
								})


								this.$set(this.phones, item.ename, arr1)


							})
							console.log("this.phones", this.phones)
						}
					}
				})
			}
		},
		onLoad(e) {
			var arr = this.mockList;
			arr.forEach((item) => {

				var arr1 = []
				item.data.forEach((row) => {
					var obj = {}
					//	console.log(row)
					obj.id = row.id;
					obj.name = row.cat_name;
					obj.spell = row.cover;
					arr1.push(obj)
				})


				this.$set(this.phones, item.ename, arr1)
			})
		}
	

	}
</script>

<style>
	#category {
		width: 100vw;
	}
</style>
