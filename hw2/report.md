#JS基础
叶曦  
201401317  
yexithu14@163.com

##基础练习
以下结果均在**Chrome51.0**中得到
###P1

	1 var func = {
	2 	 getNum: function() { return this.num;},
	3	 num: 1
	4 };
	5
	6 (function () {
	7	return typeof arguments[0]();
	8 }) (func.getNum);

####实验结果
执行上述代码得到的结果是`undefined`

####解释
首先1-4行定义了一个对象`func`，包含了一个成员函数`getNum`和数据成员`num`，然后6-8行做了如下操作，先定义了一个函数并将其强制返回，将`func.getNum`作为参数执行该函数，在该函数的执行过程中，返回传入`func.getNum()`这一函数调用结果的类型。  
  
在代码中，`arguments[0]()`这一调用中`this`并不指向`func`，故没有`num`属性，返回值是`undefined`。  
关于`this`指向什么，我们可以`log`出来。将代码修改如下。
	
	var func = {
		 getNum: function() { console.log(this); return this.num;},
		 num: 1
	};
	
	(function () {
	 	return typeof arguments[0]();
	 }) (func.getNum);
`log`结果如下图  
![](http://i.imgur.com/OxPKk77.jpg)  
这个对象就是匿名函数的`arguments`，原代码第7行中`arguements[0]()`是调用`arguemnts`中`key`为`0`的属性，所以其内部`this`指向`arguements`,进一步检验用以下代码  

	var func = {
		 getNum: function() { console.log(this); return this.num;},
		 num: 1
	};
	
	(function () {
		arguments.num = 'test';
	 	return typeof arguments[0]();
	 }) (func.getNum);
得到`log`的结果是`[function fuction, num: "test"]`，执行结果是`string`，故验证了上述说法。

###P2

	1 var x = 0;
	2 function foo() {
	3 	 x++;
	4	 this.x = x;
	5	 return foo;
	6 }
	7 var bar = new new foo;
	8 console.log(bar.x);

####实验结果
执行上述代码的`console`结果是`undefined`
####解释
2-4行定义了构造函数函数`foo()`，每次调用`new foo`，实际上运行	`foo`函数并生成一个新的`foo`对象，并且返回构造函数本身。
我们可以用如下代码测试`new foo`的返回结果
  
	function foo() {
		x++;
		this.x = x;
		return foo;
	}
	var bar = new foo;
	console.log(bar);
`console log`的结果是`function foo() {...}`，即构造函数本身。  
在构造函数中`this`指向的是新建的实例，为某个新建`foo`实例设置了动态属性`x`，仅对该实例有影响，并不对其他实例有影响，故`bar`的结果即构造函数实例`foo`中没有`x`属性，结果为`undefined`。  
若要使`bar`中有属性`x`需要将新建实例的返回，即如下代码

	function foo() {
		x++;
		temp = foo;
		temp.x = x;
		return temp;
	}

###P3
问下述代码`alert`的结果

	1 function bar () {
	2 	 return foo;
	3	 foo = 10;
	4	 function foo() {}
	5	 var foo = '11';
	6 }	
	7 alert(typeof bar());
###实验结果
结果是`function`
###解释
在函数`bar()`中，第4行声明了函数`foo()`，JavaScript脚本执行前会做预编译处理，先处理函数声明，而赋值语句会在JavaScript执行过程中处理，所以在函数`bar()`中，无法运行到`3-4-5`这三行，`foo`在预编译中被声明为函数，所以返回的结果类型是`function`。
  
如果把第四行的函数声明语句改成函数赋值语句，其在预编译时也不会处理，所以结果会是`undefined`。代码如下。

	function bar () {
		return foo;
		foo = 10;
		foo = function() {};
		var foo = '11';
	}

如果把`return foo`语句放到函数最后，则函数中`foo`被赋值成字符串，结果是`string`，代码略。

###P4
	 1 var x = 3;
	 2 var foo = {
	 3	 x: 2,
	 4	 baz: {
	 5 		 x: 1,
	 6		 bar: function() {
	 7			 return this.x;
	 8		 }
	 9	 }
	10 }
	11 var go = foo.baz.bar;
	12 alert(go());
	13 alert(foo.baz.bar());
###实验结果
第一个`alert`语句结果是3,第二个`alert`语句结果是1。
###解释
在第一个`go()`函数中，`go`的作用域在`Window`中，所以`go`的函数调用中，`this`指向`window`，`window`中`x`的值是3。  
在第二个函数调用`foo.baz.bar()`中，其作用域是`foo.baz`，故`this`指向`foo.baz`，在该作用域下`x`的值是1。

###P5
	function aaa () {
		return
		{
			test: 1
		};
	}
	alert(typeof aaa());
###实验结果
`alert`结果是`undefined`。
###解释
JavaScript中在完整语句后不强制要求分号，完整语句后换行会被当成一行代码执行，在函数`aaa()`中`return\n`被直接执行，所以`aaa()`什么都没有返回，返回类型为`undefined`。  
为了返回想要的结果，只需要将下一行的`{`括号往上移，代码如下。

	function aaa () {
		return {
			test: 1
		};
	}
此时结果是`object`。

##进阶练习
###forecast
![](http://i.imgur.com/Lim06GZ.jpg)  
算法很简单，将上图看成一个树，算出每个位置每个结点出现的概率，再用条件概率就可求得其父亲结点的每个队出现的概率。  
在代码中`function node(team)`是`node`的构造函数构造只有个队伍出现,而且这个队伍出现的概率为`100%`的叶子结点，即图中每个队伍的初始位置。`function nodeProduct(left, right)`计算两个结点的父亲结点，然后构建一棵树有`31`个结点,从叶子结点向根节点往上计算，得到根节点中`16`支队伍出现的概率。


###search
`search`函数接受一个学生的数组`students`和查询条件`query`，根据`query`类型指定一个测试函数`test`，检查单个学生是否符合要求。

##加分项
###diff
`diff`函数接受两个学生数组`a` `b`，返回出现在`b`中却不出现在`a`中的元素。  
方法是先遍历`a`集合中的所有学生名字，建立一个`map`，在`a`中元素名字置为`true`。
再遍历`b`集合，名字不在`map`中出现加入结果。

###sort
分别实现了三个`sort`函数，对传入的数组`nums`排序。