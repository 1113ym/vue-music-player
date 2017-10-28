<template>
	<div class="music-container">
		<music-header title="音乐列表" isIndex="true"/>
		<div class="music-list">
			<template v-for="song in songs">
				<music-item :song="song"/>
			</template>
		</div>
	</div>
</template>

<script>
import MusicHeader from "./Header.vue"
import MusicItem from "./MusicItem.vue"

//导入歌曲数据
import songsData from "../assets/music.json"

export default {
	name: "MusicList",
	data: function(){
		return {
			songs: []
		}
	},
	components: {
		MusicHeader,
		MusicItem
	},
	mounted: function(){
		//模拟歌曲数据
		let songs = songsData.map(songs => {
			//获取歌曲url
			songs.url = require("../assets/music/" + songs.name);
			//获取歌手url
			songs.specialUrl = require("../assets/music/" + songs.specialName);
			return songs;
		});

		this.songs = songs;
	}
}	
</script>

<style scoped>
.music-container{
	width: 100%;
	height: 100%;
	color: #FFFFFF;
	padding-top: 55px;
	background-color: #212121;
	box-sizing: border-box;
}
.music-container .music-header{
	background-color: #212121;
	border-bottom: 1px solid #EEEEEE;
}
.music-container .music-list{
	background-color: #212121;
}
</style>