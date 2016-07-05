var Modal = {

	x: 0,

	y: 0,

	mx: 0,

	my: 0,

	flag: false,

	mouseFlag: false,

	draggable: true,

	closeKey: 27,

	overlayDiv: null,

	infoDiv: null,

	infoTitle: null,

	infoPara: null,

	infoButton: null,

	headStyle: null,

	overlayCss: 'background-color: black;\
				 -moz-opacity: 0.10;\
				 opacity:.10;\
				 filter: alpha(opacity=10);\
				 z-index: 10;\
				 position: fixed;\
				 left:0px;\
				 top: 0px;\
				 width: 100%;\
				 height: 100%;\
				 ',

	infoCss: 'background-color: #FAFAFA;\
			  z-index: 20;\
			  position: fixed;\
			  top: 50px;\
			  padding: 0px;\
			  margin: 0px;\
			  border: 1px gray solid;\
			  width: 30%;\
			  left: 35%;\
			  -webkit-touch-callout: none;\
    		  -webkit-user-select: none;\
    		  -khtml-user-select: none;\
    		  -moz-user-select: none;\
    		  -ms-user-select: none;\
    		  user-select: none;\
			  ',

	infoTitleCss: 'color:  black; padding-top: 20px; padding-bottom: 20px; margin: 0px',

	infoParaCss: 'color:  black; padding-top: 0px; margin-top: 0px;',

	infoButtonCss: 'margin-bottom: 10px',

	getBody: function() {
		var body = document.body || document.getElementsByTagName('body')[0];
		return body;
	},

	onOKClicked: function() {
		Modal.overlayDiv.style.display = 'none';
		Modal.infoDiv.style.display = 'none';
		Modal.mouseFlag = false;
		Modal.flag = false;
		Modal.getBody().style.overflow = '';
	},

	onMouseDown: function(e) {
		Modal.mx = e.screenX;
		Modal.my = e.screenY;

		if (Modal.draggable) {
			Modal.mouseFlag = true;
		}
	},

	onMouseUp: function(e) {
		Modal.mouseFlag = false;
	},

	onMouseMove: function(e) {
		if (Modal.mouseFlag === false) {
			return;
		}
		console.log(e);
		var dx = e.screenX - Modal.mx;
		var dy = e.screenY - Modal.my;
		Modal.x = Modal.x + dx;
		Modal.y = Modal.y + dy;

		Modal.mx = e.screenX;
		Modal.my = e.screenY;

		Modal.infoDiv.style.left = Modal.x + 'px';
		Modal.infoDiv.style.top = Modal.y + 'px';
	},


	createOverlay: function() {
		if (this.overlayDiv !== null) {
			this.overlayDiv.style.display = 'block';
			return;
		}

		this.overlayDiv = document.createElement('div');
		this.overlayDiv.setAttribute('id', 'modal-overlay');
		this.overlayDiv.setAttribute('style', this.overlayCss);

		this.addEventListener(this.overlayDiv, 'mousemove', this.onMouseMove);
		this.getBody().appendChild(this.overlayDiv);
	},

	createInfo: function() {
		if (this.infoDiv !== null) {
			this.infoDiv.setAttribute('style', this.infoCss);
			return;
		}

		this.infoDiv = document.createElement('div');
		this.infoDiv.setAttribute('id', 'modal-info');
		this.infoDiv.setAttribute('style', this.infoCss);

		this.infoTitle = document.createElement('h3');
		this.infoTitle.innerHTML = 'Hint';
		this.infoTitle.setAttribute('id', 'modal-info-title');
		this.infoTitle.setAttribute('style', this.infoTitleCss);

		this.addEventListener(this.infoTitle, 'mousedown', this.onMouseDown);
		this.addEventListener(this.infoTitle, 'mouseup', this.onMouseUp);
		this.addEventListener(this.infoTitle, 'mousemove', this.onMouseMove);

		this.infoPara = document.createElement('p');
		this.infoPara.setAttribute('id', 'modal-info-para');
		this.infoPara.setAttribute('style', this.infoParaCss);

		this.infoButton = document.createElement('button');
		this.infoButton.setAttribute('id', 'modal-info-button');
		this.infoButton.setAttribute('style', this.infoButtonCss);
		this.infoButton.innerHTML = 'OK';

		this.addEventListener(this.infoButton, 'click', this.onOKClicked);

		this.infoDiv.appendChild(this.infoTitle);
		this.infoDiv.appendChild(this.infoPara);
		this.infoDiv.appendChild(this.infoButton);

		this.getBody().appendChild(this.infoDiv);
	},

	alert: function(content) {
		this.flag = true;
		this.createOverlay();
		this.createInfo();

		this.infoPara.innerHTML = content;

		var offsets = this.infoDiv.getBoundingClientRect();
		this.x = offsets.left;
		this.y = offsets.top;
		
		this.addEventListener(document.body, 'keydown', function(e) {
			if (Modal.flag && e.keyCode === Modal.closeKey) {
				Modal.onOKClicked();
			}
		});

		this.getBody().style.overflow = 'hidden';
	},

  	addEventListener: function(element, type, listener) {
		if (element.addEventListener) {
			element.addEventListener(type, listener, false);
		} else if (element.attachEvent) {
			element.attachEvent('on' + type, listener);
		} else {
			element["on" + type] = listener;
		}
	},

	init: function(arg) {
		if (arg.content !== undefined) {
			console.log('init content');
			this.alert(arg.content);
		} else if (arg.draggable !== undefined) {
			console.log('init draggable');
			this.draggable = arg.draggable;
		} else if (arg.closeKey !== undefined) {
			console.log('init closeKey' + ' ' + arg.closeKey);
			this.closeKey = arg.closeKey;
		} else {
			return;
		}

	}
};