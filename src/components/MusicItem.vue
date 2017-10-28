<template>
	<div class="music-item">
		<router-link :to="{name:'MusicPlay', params:{id:song.id}}">
			<img :src="song.specialUrl" class="special-img" :alt="song.singer"/>
			<span>{{song.singer}} - {{song.title}}</span>
		</router-link>
	</div>
</template>

<script>
export default {
	name: "MsuciItem",
	props: ["song"]
}	
</script>

<style scoped>
.music-item{
	padding: 15px 0 15px 20px;
	font-size: 14px;
	color: #CCCCCC;
	vertical-align: center;
	cursor: default;
}
.music-item .special-img{
	width: 40px;
	height: 40px;
	border-radius: 40px;
	border: 1px solid #CCCCCC;
	vertical-align: middle;
}
.music-item span{
	margin-left: 20px;
}
</style>