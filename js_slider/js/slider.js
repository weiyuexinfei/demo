window.onload = function() {
	var curIndex = 0,
		imgArr = document.getElementById("slider").getElementsByTagName("img");
		infoArr = document.getElementsByClassName("infoList")[0].getElementsByTagName("li");
		indexArr = document.getElementsByClassName("list-controls")[0].getElementsByTagName("li")
	//定时器自定变换5秒每次
	var autoChange = setInterval(function(){
		if(curIndex < imgArr.length - 1){
			curIndex ++;
		}else {
			curIndex = 0;
		}
		changeTo(curIndex); //调用变换处理函数
	},5000);
	//清除定时器时候的重置定时器
	function autoChangeAgain() {
		autoChange = setInterval(function(){
			if(curIndex < imgArr.length - 1){
				curIndex ++;
			}else {
				curIndex = 0;
			}
			changeTo(curIndex);
		},6000);
	}

	//调用添加时间处理
	addEvent();

	//给右下角index添加事件处理
	function addEvent() {
		for(var i=0;i<imgArr.length;i++){
			//闭包防止活动作用于内item影响
			(function(_i){
				indexArr[_i].onmouseover = function() {
					clearInterval(autoChange);
					changeTo(_i);
					curIndex = _i;
				}
				indexArr[_i].onmouseout = function() {
					autoChangeAgain();
				}
			})(i);
		}
	}

	//左箭头添加事件
	var prev = document.getElementById("prev");
	prev.onmouseover = function() {
		clearInterval(autoChange);
	}
	prev.onclick = function() {
		curIndex = (curIndex > 0) ? (--curIndex) : (imgArr.length -1);
		changeTo(curIndex);
	}
	prev.onmouseout = function() {
		autoChangeAgain();
	}
	//右箭头添加事件
	var next = document.getElementById("next");
	next.onmouseover = function() {
		clearInterval(autoChange);
	}
	next.onclick = function() {
		curIndex = (curIndex < imgArr.length -1) ? (++curIndex) : 0;
		changeTo(curIndex);
	}
	next.onmouseout = function() {
		autoChangeAgain();
	}

	//图片组相对原始左移dist px距离
	function goLeft(elem,dist) {
		if(dist == 600) {
			elem.style.left = "0px";
		}
		var toLeft; //判断图片移动方向是否为左
		dist = dist + parseInt(elem.style.left); //图片组相对当前移动距离
		if(dist<0){
			toLeft = false;
			dist = Math.abs(dist);
		}else{
			toLeft =true;
		}
		for(var i =0;i<=dist/20;i++) {
			(function(_i){
				var pos = parseInt(elem.style.left);
				setTimeout(function(){
					pos += (toLeft)?-(_i*20):(_i*20);//console.log(pos);
					elem.style.left = pos + "px";
				},_i*20);
			})(i);
		}
	}
	//左右切换处理函数
	function changeTo(num) {
		//设置img
		var imgList = document.getElementById("slider");
		goLeft(imgList,num*600);
		var _infoIndex = document.getElementsByClassName("infoOn")[0];
		removeClass(_infoIndex,"infoOn");
		addClass(infoArr[num],"infoOn");
		var _curIndex = document.getElementsByClassName("indexOn")[0];
		removeClass(_curIndex,"indexOn");
		addClass(indexArr[num],"indexOn");
	}

	function hasClass(obj,cls) {
		return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	}
	function addClass(obj,cls) {
		if(!hasClass(obj,cls)){
			obj.className += cls;
		}
	}
	function removeClass(obj,cls) {
		if(hasClass(obj,cls)){
			var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
			obj.className = obj.className.replace(reg,'');
		}
	}

}
/* 该方法的缺陷是最后一张图到第一张的显示会经过所有的图片 */