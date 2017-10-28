<template>
	<header class="music-header">
		<img src="../assets/images/back.svg" class="music-back" alt="返回" @click="back"
		v-if="isIndex != 'true'"/>
		<span class="music-title">{{title}}</span>
	</header>
</template>

<script>
export default {
	name: "MusicHeader",
	props: ["isIndex", "title"],
	methods: {
		back() {
			window.history.back();
		}
	}
}	
</script>

<style scoped>
.music-header{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 55px;
	line-height: 55px;
	text-align: center;
	background-color: transparent;
}
.music-back{
	position: absolute;
	width: 22px;
	height: 22px;
	left: 20px;
	top: 14px;
}
.music-title{
	font-size: 16px;
	color: #FAFAFA;
}
</style>