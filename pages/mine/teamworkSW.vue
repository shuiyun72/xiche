<template>
	<view class="page">
		<view class="hezuo_img">
			<image src="../../static/img/logo.png" mode="widthFix" class="img"></image>
		</view>
		<rich-text :nodes="swMsg"></rich-text>
		<uni-list class="p10_l">
			<uni-list-item title="商务合作电话" :rightText="phone" :showArrow="false"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swMsg: "",
				phone: ""
			};
		},
		filters: {

		},
		mounted() {
			this.$getApi("/api/user/my/hezuo", {}, res => {
				console.log(res)
				let swM = res.data.content;
				this.phone = res.data.tel;
				// const regex = new RegExp('<img[\s\S]+?', 'gi')
				// swM = swM.replace(regex, `<img style="width:100%;height:auto;display:block;margin:10px 0;"`);
				this.swMsg = this.formatRichText(res.data.content);
			})
		},
		methods: {
			formatRichText(html) { //控制小程序中图片大小
				let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
					match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});
				newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
					match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
					return match;
				});
				newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				newContent = newContent.replace(/\<img/gi,
					'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
				return newContent;
			}
		}
	}
</script>

<style lang="scss">
	.page {
		background-color: #f0f0f0;
		min-height: 100vh;
	}

	.p10_l {
		margin: 20upx 0;
	}

	.hezuo_img {
		text-align: center;
		padding: 50upx 0;
		background-color: #fff;

		.img {
			width: 160upx;
		}
	}

	.text_p1 {
		background-color: #fff;
		padding: 20upx 36upx;
		line-height: 80upx;
	}
</style>
