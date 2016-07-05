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
					return this[arguments[0]];
				} else if (arguments.length === 2) {
					try {
						this.setAttribute(arguments[0], arguments[1]);
					} catch(err) {
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
	attachAttr(result);


	if (result === null) {
		return null;
	} else if (result.length === 1) {
		return result[0];
	} else {
		return result;
	}
}

var a = $('.preview')[0];
a.attr(a[1], a[1]);