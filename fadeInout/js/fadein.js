//替换class达到淡入淡出的效果
function fadeIn(e) {
	e.className = "bg fadein";
}
function fadeOut(e) {
	e.className = "bg";
}
//当前图片数量
cur_img = 0;

var imgs = document.getElementsByClassName("bg");
//图片轮播函数
function turnImgs() {
	if(cur_img == imgs.length - 1) {
		fadeOut(imgs[cur_img]);
		cur_img = 0;
		fadeIn(imgs[0]);
	}else {
		fadeOut(imgs[cur_img]);
		fadeIn(imgs[cur_img + 1]);
		cur_img++;
	}
}
setInterval(turnImgs,3000);