function $(arg) {

	function attachAttr(res) {
		if (res === null) {
			return;
		}
		for (var i in res) {
			res[i].attr = (function () {
				if (arguments.length === 0) {
					return undefined;
				} else if (arguments.length === 1) {
					try {
						return this.getAttribute(arguments[0]);
					} catch (err) {
						console.log('err log');
						return undefined;
					}
				} else if (arguments.length === 2) {
					try {
						this.setAttribute(arguments[0], arguments[1]);
					} catch(err) {
						console.log('err set');
						return;
					}
				} else {
					return undefined;
				}
			});
		}
	}

	if (typeof arg !== 'string') {
		return null;
	}
	if (arg.length === 0) {
		return null;
	}

	result = document.querySelectorAll(arg);
	console.log(result);
	attachAttr(result);


	if (result === null) {
		return null;
	} else if (result.length === 1) {
		return result[0];
	} else {
		return result;
	}
}

function test() {
	console.log($('body'));
	console.log($('div'));
	console.log($('#one'));
	console.log($('.cs'));
	var a = $('#three');
	a.attr('class');
	console.log($('#three').attr('class'));
	var temp = new Object;
	temp.temp = 'temp';
	console.log($('#three').attr(temp));
	$('div')[0].attr('style', 'background-color: red');
	$('div')[1].attr('temp', 'background-color: red');
	$('#two').attr('style', new Object);
	$('#three').attr('style', 'background-color: blue');
}

test();