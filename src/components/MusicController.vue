<template>
	<div class="controller-container">
		<!-- 进度 -->
		<div class="controller-progress">
			<div class="current-time">{{currentTimeStr}}</div>
			<div class="progress-bar" ref="progressBar" @click="changeTime">
				<div class="progress" :style="progressWidth"></div>
				<div class="progress-load" :style="loadProgressWidth"></div>
				<div class="progress-button" :style="buttonOffsetLeft"></div>
			</div>
			<div class="duration">{{durationStr}}</div>
		</div>
		<!-- 播放、暂停、上一曲、下一曲按钮 -->
		<div class="controller-buttons">
			<div class="controller-button previous" @click="previous"></div>
			<div :class="'controller-button ' + playButtonClass" @click="handleClick"></div>
			<div class="controller-button next" @click="next"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: "MusicController",
	props: ["playingObj", "loadPrecent"],
	data: function(){
		return {
			playing: false
		}
	},
	computed: {
		currentTimeStr() {
			//当前播放时间
			return getTime(this.playingObj.currentTime);
		},
		durationStr() {
			//总时间
			return getTime(this.playingObj.duration);
		},
		playButtonClass() {
			//播放按钮样式
			let playButtonClass = "";
			if(this.playingObj.playing === true && this.playing === true){
				playButtonClass = "pause";
			}else{
				playButtonClass = "play";
				this.playing = false;
			}
			return playButtonClass;
		},
		progressWidth() {
			let playingObj = this.playingObj;
			let progressPrecent = playingObj.currentTime / playingObj.duration * 100;
			return {width:progressPrecent + "%"};
		},
		loadProgressWidth() {
			return {width:this.loadPrecent + "%"};
		},
		buttonOffsetLeft() {
			let playingObj = this.playingObj;
			//按钮left值
			let progressButtonOffsetLeft = 0;
			if(this.progressBarWidth){
				progressButtonOffsetLeft = playingObj.currentTime / playingObj.duration * 
				this.progressBarWidth;
			}
			return {left:progressButtonOffsetLeft + "px"};
		}
	},
	methods: {
		handleClick() {
			this.$emit("playOrPause");
			//判断播放状态
			if(this.playing === false){
				this.playing = true;
			}else{
				this.playing = false;
			}
		},
		previous() {
			this.$emit("previous");
		},
		next() {
			this.$emit("next");
		},
		changeTime(e) {
			//获取点击的位置和进度条到窗口左边的距离的差
			let currentWidth = e.clientX - this.progressDOM.getBoundingClientRect().left;
			let percent = currentWidth / this.progressDOM.offsetWidth;
			//保留2位有效数
			percent = Math.ceil(percent * 100) / 100;
			this.$emit("changeTime", percent);
		}
	},
	mounted: function(){
		let progressDOM = this.$refs.progressBar;
		//获取进度条的宽
		this.progressBarWidth = progressDOM.offsetWidth;
		this.progressDOM = progressDOM;
	}
}

function getTime(second){
	second = Math.floor(second);
	let minite = Math.floor(second / 60);
	second = second - minite * 60;
	return formatTime(minite)  + ":" + formatTime(second);
}
function formatTime(time){
	let timeStr = "00";
	if(time > 0 && time < 10){
		timeStr = "0" + time;
	}else if(time >= 10){
		timeStr = time;
	}
	return timeStr;
}
</script>

<style scoped>
.controller-container{
	width: 100%;
	font-size: 13px;
	position: relative;
	text-align: center;
}
.controller-container .controller-progress{
	height: 21px;
	line-height: 21px;
}
.controller-progress .current-time{
	float: left;
	width: 34px;
}
.controller-progress .duration{
	float: right;
	width: 34px;
	text-align: right;
}
.controller-progress .progress-bar{
	position: absolute;
	left: 43px;
	right: 43px;
	margin-top: 9px;
	height: 3px;
	background-color: #CCCCCC;
	cursor: default;
}
.progress-bar .progress{
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;
	width: 0%;
	height: 3px;
	background-color: #FF0000;
}
.progress-bar .progress-load{
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	width: 0%;
	height: 3px;
	background-color: #EEEEEE;
}
.progress-bar .progress-button{
	position: absolute;
	top: 0;
	left: 0;
	z-index: 3;
	width: 14px;
	height: 14px;
	margin-top: -6px;
	margin-left: -7px;
	border-radius: 16px;
	background-color: #FFFFFF;
}
.controller-buttons{
	margin-top: 16px;
	display: inline-block;
	width: 150px;
}
.controller-buttons:after{
	content:" ";
	display: block;
	width: 0;
	height: 0;
	clear: both;
}
.controller-buttons .controller-button{
	float: left;
	width: 36px;
	height: 36px;
	border-radius: 100%;
	margin-left: 10px;
	background-color: #FF0000;
}
.controller-button.previous{
	background: #FF0000 url("../assets/images/previous.png") no-repeat center;
	background-size: 16px 16px;
}
.controller-button.next{
	background: #FF0000 url("../assets/images/next.png") no-repeat center;
	background-size: 16px 16px;
}
.controller-button.play{
	margin-top: -3px;
	width: 42px;
	height: 42px;
	background: #FF0000 url("../assets/images/play.png") no-repeat 8px 6px;
	background-size: 30px 30px;
}
.controller-button.pause{
	margin-top: -3px;
	width: 42px;
	height: 42px;
	background: #FF0000 url("../assets/images/pause.png") no-repeat center;
	background-size: 30px 30px;
}	
</style>