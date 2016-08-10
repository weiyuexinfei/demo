function Drag(config) {
	this.moveTarget = document.getElementById(config.id);
	this.moveHead = this.moveTarget.getElementsByClassName('modal-head')[0];
	this.disX = 0;
	this.disY = 0;
	var _this = this;
	//var bDrag = false;
	this.moveHead.onmousedown = function(e) {
		//bDrag = true;
		_this.getDistance(e);
		document.onmousemove = function(e) {
			//if(!bDrag) return;
			_this.setPosition(e);
		}
		_this.moveHead.onmouseup = function() {
			//bDrag = false;
			_this.clearEvent();
		}
	}
}

Drag.prototype.getDistance = function(e) {
	var e = e || window.event;
	this.disX = e.clientX - this.moveTarget.offsetLeft;
	this.disY = e.clientY - this.moveTarget.offsetTop;
}
Drag.prototype.setPosition = function(e) {
	var e = e || window.event;
	var l = e.clientX - this.disX;
	var t = e.clientY - this.disY;

	this.max_left = document.documentElement.clientWidth-this.moveTarget.offsetWidth;
	this.max_top = document.documentElement.clientHeight - this.moveTarget.offsetHeight;

	l = (l >=  this.max_left) ? this.max_left : (l>0 ? l : 0);
	t = (t >= this.max_top) ? this.max_top : (t>0 ? t : 0 );

	this.moveTarget.style.left = l + "px";
	this.moveTarget.style.top = t + "px";
}
Drag.prototype.clearEvent = function() {
	this.moveHead.onmouseup = null;
	document.onmousemove = null;
}