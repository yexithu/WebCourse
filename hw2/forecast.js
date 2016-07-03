var names = [
	"Switzerland",
	"Poland",
	"Croatia",
	"Portugal",
	"Wales",
	"Northern Ireland",
	"Hungary",
	"Belgium",
	"Germany",
	"Slovakia",
	"Italy",
	"Spain",
	"France",
	"Republic of Ireland",
	"England",
	"Iceland"
];


function forecast(strength, team) {
	
	if(names.indexOf(team) === -1){
		throw "team not found";
	}

	//Create a node using the team name
	//Since it is a node in the bottom level
	//The probablity must be 1
	function node(team) {
		this.teams = [team];
		this.probs = [1];		
	}

	//Cartesian Product for two nodes
	function nodeProduct(left, right) {
		var parent = new Object();
		parent.teams = left.teams.concat(right.teams);

		if (left.teams.length !== right.teams.length) {
			throw 'Something is wrong';
		}

		var l = left.teams.length;
		parent.probs = new Array(2 * l);
		var i = 0;
		for (i = 0; i < 2 * l; ++i) {
			parent.probs[i] = 0;
		} 
		for (i = 0; i < l; ++i) {
			for (var j = 0; j < l; ++j) {
				var a = strength[left.teams[i]];
				var b = strength[right.teams[j]];
				var p = left.probs[i] * right.probs[j];
				if((a + b) === 0) {
					a = 0.5;
					b = 0.5;
				}
				else {
					var c = a + b;
					a = a / c;
					b = b / c;
				}
				parent.probs[i] += a * p;
				parent.probs[l + j] += b * p;
			}
		}
		//console.log(parent);
		return parent;
	}

	//Use index pattern of Complete binary tree 
	var count = names.length;
	var nodes  = new Array(2 * count - 1);
	
	//Generate the bottom nodes
	var i = 0;
	for (i = 0; i < count; ++i) {
		nodes[count - 1 + i] = new node(names[i]);
	}

	//behave like a binary heap
	for (i = count - 2; i >= 0; --i) {
		nodes[i] = nodeProduct(nodes[2 * i + 1],  nodes[2 * i + 2]);
	}

	return nodes[0].probs[names.indexOf(team)];
}


//function for test
function test() {
	var strength = {
		Switzerland: 100,
		Poland: 100,
		Croatia: 100,
		Portugal: 100,
		Wales: 100,
		'Northern Ireland': 100,
		Hungary: 100,
		Belgium: 100,
		Germany: 100,
		Slovakia: 100,
		Italy: 100,
		Spain: 100,
		France: 100,
		'Republic of Ireland': 100,
		England: 100,
		Iceland: 100
	};

	for (var value in names) {
		strength[names[value]] = 0;
	}
	strength['England'] = 100;
	console.log(forecast(strength, 'England'));
}