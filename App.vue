<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
@import 'common/main.css';
@import 'common/icon.css';
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
.over-bg-white {
	width: 100%;
	height: 100%;
	background-color: white;
	position: absolute;

}
.need-top-border{
	border-top: 2px solid rgba(240,240,240,1);
}
</style>
