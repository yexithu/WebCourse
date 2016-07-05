var BackToTop = {
	div: null,

	appendDiv: function(arg) {
		var body = document.body || document.getElementsByTagName('body')[0];
		this.div = document.createElement('div');
		this.div.setAttribute('id', 'back-to-top');

		if(arg.LeftUp) {
			this.div.style.left = '0px';
			this.div.style.top = '0px';
		} else if (arg.LeftDown) {
			this.div.style.left = '0px';
			this.div.style.bottom = '0px';
		} else if (arg.RightUp) {
			this.div.style.right = '0px';
			this.div.style.top = '0px';
		} else if (arg.RightDown) {
			this.div.style.right = '0px';
			this.div.style.bottom = '0px';
		} else {
			this.div.style.left = (arg.x + 'px');
			this.div.style.top = (arg.y + 'px');
		};

		body.appendChild(this.div);
	},

	stylesheet : '#back-to-top {\
				  	  position: fixed;\
				  	  margin: 0px;\
				  	  padding: 0px;\
				  	  border: 0px;\
				  	  width: 52px;\
				  	  height: 52px;\
				  	  background: url(img/backtotop.jpg);\
				  }\
				  #back-to-top:hover {\
				  	background: url(img/backtotophover.jpg);\
				  }',


	//Get the following code from Stackoverflow
	appendStyle: function() {
	    var head = document.head || document.getElementsByTagName('head')[0];
    	var style = document.createElement('style');

		style.type = 'text/css';
		if (style.styleSheet){
	  		style.styleSheet.cssText = this.stylesheet;
		} else {
	  		style.appendChild(document.createTextNode(this.stylesheet));
		}

		head.appendChild(style);
	},

	addListener: function(element, type, listener) {
		if (element.addEventListener) {
			element.addEventListener(type, listener, false);
		} else if (element.attachEvent) {
			element.attachEvent('on' + type, listener);
		} else {
			element["on" + type] = listener;
		}

	},

	onScroll: function() {
		if (this.div === null) {
			return;
		}
		var y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
		var minOffset = 200;
		// console.log(h);
		if (y < minOffset) {
			BackToTop.div.style.display = "none";
		} else {
			BackToTop.div.style.display = "block";
		}
	},

	goToTop: function() {
		window.scrollTo(0, 0);
	},

	init: function(arg) {
		this.appendStyle();
		this.appendDiv(arg);
		this.addListener(window, 'scroll', this.onScroll);
		this.addListener(BackToTop.div, 'click', this.goToTop);
		this.onScroll();
	}
};