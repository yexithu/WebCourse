var Manager = {

	// constants
	MININTERVAL: 2000,

	WRAPPERWIDTH: 30,

	SCROLLTIME: 2000,

	TOPPOS: [2, 34, 66],

	MAXNUM: 3,

	HIDEANIMATE: {
		width: '0',
		height: '0',
		padding: '0',
		opacity: '0',
	},

	SHOWANIMATE: {
		width: '90%',
		height: '30%',
		paddingLeft: '5%',
		paddingRight: '5%',
		opacity: '1',
	},

	DURATION: 500,

	refreshable: true,

	msgList: null,

	nicknameList: null,

	contentList: null,

	headimgList: null,

	msgQueue: [],

	timerID: null,

	topIndex: 0,

	detailHeight: 0,

	safeTimeout: function (callback, interval) {
		// if (timerID !== null) {
		// 	clearTimeout(this.timerID);
		// }
		this.timerID = setTimeout(callback, interval);
	},

	i: function (i) {
		return ((this.topIndex + i) % (this.MAXNUM + 1));
	},

	ni: function () {
		return ((this.topIndex + this.MAXNUM) % (this.MAXNUM + 1));
	},

	hideNI: function () {
		// console.log('Hide ' + this.ni());
		$(this.msgList[this.ni()]).css({'left': '0%', 'top': '2%', 
		'width' : '0', 'height' : '0', 'padding' : '0', 'opacity' : '0'});
	},

	initWrapperPos: function () {
		if (this.msgList === null) {
			throw "Joking, it can not be wrong";
		}
		console.log('Init Pos');
		console.log(this.msgList);
		this.topIndex = 0;
		var i;
		for (i = 0; i < this.MAXNUM; ++i) {
			$(this.msgList[i]).css('top', this.TOPPOS[i] + '%');
		}
		this.hideNI();
	},

	hide: function () {
		if (arguments.length === 1) {
			$(this.msgList[this.i(arguments[0])]).animate(this.HIDEANIMATE, 
				this.DURATION);
			return this.DURATION;
		}

		var i;
		for (i = 0; i < this.MAXNUM; ++i) {
			$(this.msgList[this.i(i)]).animate(this.HIDEANIMATE, 
				this.DURATION);
		}
		return this.DURATION;
	},

	set: function (data) {
		if (arguments.length === 2) {
			$(this.nicknameList[arguments[1]]).html(data.nickname);
			$(this.contentList[arguments[1]]).html(data.content);
			$(this.headimgList[arguments[1]]).attr('src', data.headimgurl);
			return;
		}

		var i;
		for (i = 0; i < this.MAXNUM; ++i) {
			$(this.nicknameList[this.i(i)]).html(data[i].nickname);
			$(this.contentList[this.i(i)]).html(data[i].content);
			$(this.headimgList[this.i(i)]).attr('src', data[i].headimgurl);
		}
	},

	show: function () {
		if (arguments.length === 1) {
			$(this.msgList[this.i(arguments[0])]).animate(this.SHOWANIMATE, 
				this.DURATION);
			return this.DURATION;
		}

		var i;
		for (i = 0; i < this.MAXNUM; ++i) {
			$(this.msgList[this.i(i)]).animate(this.SHOWANIMATE, 
				this.DURATION);
		}

		return this.DURATION;
	},

	onGetHistory: function (data, status) {
		var time = 0;
		time += Manager.hide();
		Manager.set(data);
		time += Manager.show();
		setTimeout(Manager.startScroll, time + 100);
	},

	showHistory: function () {
		Backend.fetchHistory(this.onGetHistory);
	},
	
	scrollCallback: function (i, diff) {
		return (function () {
			$(Manager.contentList[Manager.i(i)]).css('top', '0');
			$(Manager.contentList[Manager.i(i)]).animate({
				top: '-=' + diff + 'px',
			}, Manager.SCROLLTIME, Manager.scrollCallback(i, diff));
		});
	},

	startScroll: function () {
		var i = 0;
		var height = 0;
		var diff = 0;
		console.log(Manager.detailHeight);
		// $(Manager.contentList).css('top', 0);
		for (i = 0; i < Manager.MAXNUM; ++i) {
			height = $(Manager.contentList[Manager.i(i)]).height();
			if (height < Manager.detailHeight) {
				continue;
			}
			diff = (height - Manager.detailHeight);
			$(Manager.contentList[Manager.i(i)]).animate({
				top: '-=' + diff + 'px',
			}, Manager.SCROLLTIME, Manager.scrollCallback(i, diff));
		}

	},

	updateMessage: function(message) {
		console.log('UPDATA');
		$(this.contentList).stop(true, false);
		$(this.contentList).css('top', '0');
		// console.log('TOP ' + Manager.topIndex);
		// console.log('NI ' + Manager.ni());
		$(this.msgList[this.ni()]).animate({
			width: '90%',
			height: '30%',
			paddingLeft: '5%',
			paddingRight: '5%',
			opacity: '1',
			top: '2%',
			left: '0',
		}, this.DURATION);

		this.set(message, this.ni());

		var i;
		for (i = 0; i < this.MAXNUM - 1; ++i) {
			// console.log('This i ' + this.i(i));
			$(this.msgList[this.i(i)]).animate({
				top: '+=32%',
			}, this.DURATION);
		}

		// console.log('Last ' + this.i(this.MAXNUM - 1));
		$(this.msgList[this.i(this.MAXNUM - 1)]).animate({
			width: '0',
			height: '0',
			top: '96%',
			left: '95%',
			opacity: '0',
		}, this.DURATION, (function () {
			Manager.topIndex = (Manager.topIndex + Manager.MAXNUM) % 
							(Manager.MAXNUM + 1);
			Manager.hideNI();
		}));

		// Manager.startScroll();
		setTimeout((function () { 
			Manager.startScroll();
		}), 
		Manager.DURATION + 100);
	},

	onTimeOut: function () {
		if (Manager.msgQueue.length > 0) {
			var message = Manager.msgQueue.shift();
			Manager.updateMessage(message);
			setTimeout(Manager.onTimeOut, Manager.MININTERVAL);
			return;
		}
		Manager.refreshable = true;
	},

	manageMessage: function (message) {
		if (this.refreshable) {
			this.refreshable = false;
			setTimeout(Manager.onTimeOut, Manager.MININTERVAL);
			this.updateMessage(message);
			return;
		}
		this.msgQueue.push(message);
	},

	onNewMessage: function (message) {
		Manager.manageMessage(message);
		
	},

	initPara: function () {
		var height = $(this.msgList[0]).height();		
		this.detailHeight = height * 0.65;
	},

	init: function () {
		console.log('init');
		//get all wrappers
		this.msgList = $('.msg');
		this.nicknameList = $('.msg-nickname');
		this.contentList = $('.msg-detail');
		this.headimgList = $('.msg-headimg');
		//set wrappers to aproximate place
		this.initWrapperPos();
		this.initPara();
		this.showHistory();
		Backend.start();
		Backend.setConnectedHandler((function (){ console.log('connected')}));
		Backend.setNewMessageHandler(this.onNewMessage);
	},

	start: function () {
		console.log('start');
		this.init();
	},

};

Manager.start();