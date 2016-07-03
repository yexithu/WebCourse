function exchange(nums, i, j) {
	var temp = nums[i];
	nums[i] = nums[j];
	nums[j] = temp;
}

function bubbleSort(nums) {
	for (var i = nums.length -1; i >=0; --i) {
		for (var j = 0; j < i; ++j) {
			if (nums[j] > nums[j + 1]) {
				exchange(nums, j, j + 1);
			}
		}
	}
}

function selectionSort(nums) {
	function getMin(i) {
		var minIndex = i;
		for (var j = i; j < nums.length; ++j) {
			if(nums[j] < nums[minIndex]) {
				minIndex = j;
			}
		}
		return minIndex;
	}
	for (var i = 0; i < nums.length; ++i) {
		var temp = getMin(i);
		exchange(nums, i, temp);
	}
}

function insertionSort(nums) {
	function insert(i) {
		var temp = nums[i];
		var j = 0;
		for (j; j <= i; ++j) {
			if(nums[i] <= nums[j]) {
				break;
			}
		}

		var k = i;
		for (k; k > j; --k) {
			nums[k] = nums[k - 1];
		}
		nums[j] = temp;
	}

	for (var i = 0; i < nums.length; ++i) {
		insert(i);
	}
}

function test() {	
	for(var i = 0; i < 10; ++i) {
		nums.push(Math.random());
	}
	// bubbleSort(nums);
	// selectionSort(nums);
	insertionSort(nums);
	console.log(nums);
}

test();