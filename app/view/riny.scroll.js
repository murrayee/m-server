var rinyScroll=function(options){
	this.options=options;
	this.el=document.getElementById(this.options.el);
};

rinyScroll.prototype.scroll=function(){

	if(this.el.scrollTop==0){
		this.el.scrollTop=1;
	};

	this.el.onscroll=function(){
		//由于部分设备中scrollTop与clientHeight之和不完全等于scrollHeight（一般会少于），因此+1再判断是否大于等于。
		if(this.scrollTop+this.clientHeight+1>=this.scrollHeight){
			this.scrollTop=this.scrollHeight-this.clientHeight-1;
		}else if(this.scrollTop==0){
			this.scrollTop=1;
		};
	};
};

rinyScroll.prototype.input=function(){
	var _this=this.el;
	_this.addEventListener('click',function(e){
		var screenNowH=document.documentElement.clientHeight,inputT=e.target.offsetTop,wrapScrollTop=_this.scrollTop;
			window.onresize=function(){
				var screenH=document.documentElement.clientHeight;
				//判断窗口大小改变是否为关闭软键盘，或input的所处位置是否高于软键盘打开后窗口中间以上
				if(screenH==screenNowH || screenH+wrapScrollTop>=inputT+(screenH/2)){
					return;
				};
				var t=inputT-(screenH/2);
				_this.scrollTop=t;
			};
	},false);			
};