function search(students, query) {
	
	var test = function() {};
	var queryType = typeof(query);

	//Assign test in respond to different queryType
	switch(queryType) {
	case 'number':
		test = function(student) {
			return student.age === query;
		};
		break;
	case 'string':
		test = function(student) {
			return student.name === query;
		};
		break;
	case 'object':
		test = function(student) {
			var keys = Object.getOwnPropertyNames(query);
			for (var i in keys) {
				if(query[keys[i]]!==student[keys[i]]) {
					return false;
				}
			}
			return true;
		};
		break;
	default:
		throw "Wrong type of input";
	}

	var result = [];
	for (var i in students) {
		if(test(students[i])) {
			result.push(students[i]);
		}
	}

	if (result.length === 0) {
		return false;
	}
	if (typeof query === "string") {
		return result[0];
	}
	return result;
}

function test() {
	var students = [{
			name: 'S1',
			age: 1,
			hometown: 'H1'
		}, {
			name: 'S1',
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
	console.log(search(students, 2));
	console.log(search(students, 'S1'));
	console.log(search(students, { age: 2, hometown: 'H1'}));
}