var BackToTop = {

	div: null,

	topKey: 27,

	minOffset: 200,

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

		this.addListener(body, 'keydown', function(e) {
			var y = BackToTop.getY();
			if (y < BackToTop.minOffset) {
				return;
			}
			if (e.keyCode === BackToTop.topKey) {
				BackToTop.goToTop();
			};
		});
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

	getY : function() {
		var y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
		return y;
	},

	onScroll: function() {
		if (this.div === null) {
			return;
		}
		var y = BackToTop.getY();		
		// console.log(h);
		if (y < BackToTop.minOffset) {
			BackToTop.div.style.display = "none";
		} else {
			BackToTop.div.style.display = "block";
		}
	},

	goToTop: function() {
		var y = BackToTop.getY();
		console.log('Here y ' + y);
		var temp = y - 100;
		if (temp < 0) {
			window.scrollTo(0, 0);
			return;
		}
		window.scrollTo(0, temp);
		setTimeout(BackToTop.goToTop, 10);
	},

	init: function(arg) {
		this.appendStyle();
		this.appendDiv(arg);
		this.addListener(window, 'scroll', this.onScroll);
		this.addListener(BackToTop.div, 'click', this.goToTop);
		this.onScroll();
	}
};