function diff(a, b) {
	//Map a name in a to a bool
	var aMap = {};

	var i = 0;
	for (i in a) {
		aMap[a[i].name] = true;
	}

	var result = [];
	for (i in b) {
		if(aMap[b[i].name]) {
			continue;
		}
		result.push(b[i]);
	}

	return result;
}

function test() {
	var a = [{
			name: 'S1',
			age: 1,
			hometown: 'H1'
		}, {
			name: 'S2',
			age: 2,
			hometown: 'H2'
		}, {
			name: 'S3',
			age: 2,
			hometown: 'H1'
		}, {
			name: 'S4',
			age: 2,
			hometown: 'H1'
		}
	];

	var b = [{
			name: 'S1',
			age: 1,
			hometown: 'H1'
		}, {
			name: 'S2',
			age: 2,
			hometown: 'H2'
		}, {
			name: 'S6',
			age: 2,
			hometown: 'H1'
		}, {
			name: 'S5',
			age: 2,
			hometown: 'H1'
		}
	];
	console.log(diff(a, b));
}

test()