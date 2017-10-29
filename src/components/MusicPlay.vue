<template>
	<div class="music-play">
		<music-header :title="currentSong.title" />
		<div class="singer">
			{{currentSong.singer}}
		</div>
		<div class="singer-img" ref="singerImg">
			<img :src="currentSong.specialUrl" :alt="currentSong.singer"/>
		</div>
		<!-- 播放控制组件 -->
		<div class="controller-wrap">
			<music-controller :playingObj="playingObj" :loadPrecent="loadPrecent"
			@playOrPause="playOrPause"
			@previous="previous"
			@next="next"
			@changeTime="changeTime" />
		</div>
		<div class="play-bg" :style="bgStyle"></div>
		<audio ref="audio"></audio>
	</div>
</template>

<script>
import MusicHeader from "./Header.vue"
import MusicController from "./MusicController.vue"

//导入歌曲数据
import songsData from "../assets/music.json"

export default {
	name: "MusicPlay",
	props: ["id"],
	data: function(){
		return {
			currentSong: {
				title: "",
				singer: "",
				url: "",
				specialUrl: ""
			},
			currentTime: 0,
			duration: 0,
			playing: false,
			loadPrecent: 0
		}
	},
	computed: {
		bgStyle() {
			//根据当前歌手的图片设置背景
			let bgStyle = {};
			let currentSong = this.currentSong;
			if(!currentSong.specialUrl){
				currentSong.specialUrl = require("../assets/images/play_bg.jpg");
			}else{
				bgStyle.backgroundImage = `url(${currentSong.specialUrl})`;
			}
			return bgStyle;
		},
		playingObj() {
			let playingObj = {};
			playingObj.currentTime = this.currentTime;
			playingObj.duration = this.duration;
			playingObj.playing = this.playing;
			return playingObj;
		}
	},
	methods: {
		/**
		 * 播放或暂停
		 */
		playOrPause() {
			if(this.audioDOM.paused){
				this.audioDOM.play();
				this.startRotateSingerImg();
				this.playStatus = true;

				this.playing = true;
			}else{
				this.audioDOM.pause();
				this.stopRotateSingerImg();
				this.playStatus = false;

				this.playing = false;
			}
		},
		/**
		 * 上一首
		 */
		previous() {
			if(this.currentIndex === 0){
				this.currentIndex = this.songs.length - 1;
			}else{
				this.currentIndex = this.currentIndex - 1;
			}

			//获取上一首歌曲
			let currentSong = this.songs[this.currentIndex];
			this.audioDOM.src = currentSong.url;
			//重新加载歌曲
			this.audioDOM.load();
		},
		/**
		 * 下一首
		 */
		next() {
			if(this.currentIndex === this.songs.length - 1){
				this.currentIndex = 0;
			}else{
				this.currentIndex = this.currentIndex + 1;
			}

			//获取下一首歌曲
			let currentSong = this.songs[this.currentIndex];
			this.audioDOM.src = currentSong.url;
			//重新加载歌曲
			this.audioDOM.load();
		},
		/**
		 * 修改播放时间
		 */
		changeTime(precent) {
			let currentSong = this.currentSong;
			//设置歌曲当前播放时间
			this.audioDOM.currentTime = currentSong.duration * precent;
			this.updateProgress(currentSong.duration * precent, currentSong.duration, true);
		},
		/**
		 * 歌手图片动画
		 */
		startRotateSingerImg() {
		 	this.singerImgDOM.classList.add("animation-singer");
		},
		stopRotateSingerImg() {
			this.singerImgDOM.className = "singer-img";
		},
		/**
		 * 更新播放进度
		 */
		updateProgress(currentTime, duration, playing) {
			this.currentTime = currentTime;
			this.duration = duration;
			this.playing = playing;
		}
	},
	components: {
		MusicHeader,
		MusicController
	},
	created: function(){
		//定义一些变量，不需要让vue检测更新

		//当前歌曲的位置
		this.currentIndex = 0;
		//歌曲播放状态
		this.playStatus = false;
		//歌曲列表
		this.songs = [];
	},
	mounted: function(){
		//模拟歌曲数据
		let currentSong = {};
		let songs = songsData.map((song, index) => {
			//获取歌曲url
			song.url = require("../assets/music/" + song.name);
			//获取歌手url
			song.specialUrl = require("../assets/music/" + song.specialName);

			if(song.id === parseInt(this.$route.params.id)){
				this.currentSong = song;
				this.currentIndex = index;
			}
			return song;
		});
		this.songs = songs;

		this.audioDOM = this.$refs.audio;
		this.singerImgDOM = this.$refs.singerImg;
		//设置当前歌曲
		this.audioDOM.src = this.currentSong.url;

		this.audioDOM.addEventListener("loadstart", () => {
			//触发组件更新
			this.currentSong = this.songs[this.currentIndex];
			this.currentTime = 0;
			this.duration = this.songs[this.currentIndex].duration;

			this.loadPrecent = 0;
		}, false);

		this.audioDOM.addEventListener("progress", () => {
			//当下载音频时设置已缓冲进度
			if(this.audioDOM.readyState === 4){
				this.loadPrecent = this.audioDOM.buffered.end(0) / this.audioDOM.duration * 100;
			}
		}, false);

		let canplay = () => {
			if(this.playStatus === true){
				this.audioDOM.play();
			}else{
				this.audioDOM.pause();
			}
		}
		this.audioDOM.addEventListener("canplay", canplay, false);

		this.audioDOM.addEventListener("timeupdate", () => {
			this.updateProgress(this.audioDOM.currentTime, this.audioDOM.duration, true);

			//设置已缓冲进度
			if(this.audioDOM.readyState === 4){
				this.loadPrecent = this.audioDOM.buffered.end(0) / this.audioDOM.duration * 100;
			}
		}, false);
		this.audioDOM.addEventListener("ended", () => {
			this.updateProgress(0, this.audioDOM.duration, false);
			this.stopRotateSingerImg();
			this.playStatus = false;

			//this.next();
		}, false);
	}
}
</script>

<style scoped>
.music-play{
	width: 100%;
	height: 100%;
	color: #FAFAFA;
	position: relative;
	overflow: hidden;
}
.music-play .play-bg{
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: -1;
	-webkit-filter: blur(20px);
	filter: blur(20px);
	margin: -35px;
	background-image: url("../assets/images/play_bg.jpg");
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;  /* 背景图等比例缩放到完全覆盖容器 */
}
.music-play .singer{
	text-align: center;
	margin-top: 80px;
}
.music-play .singer-img{
	position: absolute;
	top: 50%;
	left: 50%;
	width: 210px;
	height: 210px;
	margin-top: -105px;
	margin-left: -105px;
	border: 3px solid #EEEEEE;
	border-radius: 210px;
	-webkit-transform: rotate(0deg);
	transform: rotate(0deg);
}
.singer-img img{
	width: 100%;
	height: 100%;
	border-radius: 100%;
}
.music-play .controller-wrap{
	position: absolute;
	left: 0;
	bottom: 18px;
	width: 100%;
	padding: 20px;
	box-sizing: border-box;
}
.animation-singer{
	-webkit-animation: rotate infinite 10s linear;
	animation: rotate infinite 10s linear;
}
@-webkit-keyframes rotate{
	from{-webkit-transform: rotate(0deg);}
	to{-webkit-transform: rotate(360deg);}
}
@keyframes rotate{
	from{transform: rotate(0deg);}
	to{transform: rotate(360deg);}
}
</style>