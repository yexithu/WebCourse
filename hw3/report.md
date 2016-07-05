#DOM编程
叶曦  
2014013417  
yexithu14@163.com

##基础要求
###P1 DOM基础  
####简易DOM选择器
见selector.js，利用`document.qeurySeletorAll`选择所有的待选项，再对待选项做条件判断。返回需要的结果。

####DOM属性访问器
在select的过程中，对返回的每一个结果增加`attr`成员函数，该函数访问所需要的属性。

####err处理
在`attr`中，利用`document`原生的函数访问和修改对象，但用`try catch`对其进行包装，处理err，使其无法抛出异常。

###测试
使用selector.html，selector.js对其进行了多种操作。


###P2 DOM综合题
####返回顶部按钮
#####要求实现
组件写在backtotop.js中  
	1. 组件在y方向上的滚动大于minOffset才会出现，点击后会返回顶部，且有动画效果，会逐渐滑到顶部，而不是直接跳转。  
	2. 组件接受键盘操作ESC键(keyCode 27)，将会返回顶部，此功能仅在组件出现时起作用。  
	3. 如上所述，组件只有在y方向滚动大于minOffset(200)时才会出现。  
	4. 组件支持5种方式init，API设计和实验要求相同，代码中有sample。
	5. 浏览器支持，经过测试，完美兼容IE8/9/10/11, Chrome/ FireFox。
	6. hover在组件上有明显提示。  

#####测试
使用backtotop.html测试，在html中生成了100个title带编号，可方便测试组件功能。

####自定义模态
#####要求实现
组件写在modal.js中  
	1. 弹层内容可以任意设置，通过传入content参数。  
	2. 窗口默认是可以拖拽的，但也可以传入参数来disable。  
	3. 默认是esc键关闭弹层，可指定关闭的keyCode。

#####细节
一些实现的细节  
	1. 弹层开启时，为了disable整个页面，使用了透明的overlay将弹层以下所有鼠标事件禁用。  
	2. 弹层开启时，通过修改overflow值，禁用了下层的scroll。
	3. 拖动时候有可能有选中内容的情况，通过设定一些style，禁用了拖动弹层时选中部分内容的情况。  
	4. 浏览器支持，经过测试，完美支持chrome和Firefox，但IE某些版本下无法拖动过程中可能会选中一些内容。

####测试
使用modal.html测试，可以在测试过程中指定content,draggable，和esecode。

###P3 DOM分析题
分析图片轮播是如何实现的  
####HTML分析
首先来看图片轮播这一组件的HTML组成  
其由一个`wrapper`和5个以图片为背景的`div`组成，结构如下。

	<div>
		<div class="main-slider-card" data-index="0"></div>
		<div class="main-slider-card" data-index="1"></div>
		<div class="main-slider-card" data-index="2"></div>
		<div class="main-slider-card" data-index="3"></div>
		<div class="main-slider-card" data-index="4"></div>
	</div>
本题的关键是如何进行位置变换与轮播，我将关键的几**css**属性代码贴出。

外层`div`的**style**如下
	
	.main-slider-wrapper {
		overflow: hidden;
		position: relative;
		width: 6745px;
		height: 100%;
		margin: 0;
		padding: 0;
	}

`main-slider-card`的**style**如下，`changing`表示随时间和`index`改变，将进一步解释。

	.main-slider-card {
		float: left;
		width: 1349px;
		position: relative;
		left: changing with index;
		transition-duration: changing with time;
		transform: translate(changing with time, changing with time),
				   translateZ(0px);
		background-image: changing with index;
	}

####m外层
`main-slider-wrapper`的`overflow`设为了`hiden`，其子元素内容超过其本身的部分不会显示，也不会有**scrollbar**，且其`width`正好为5张图的`width`，其`height`是`100%`，无`margin padding`，让其大小正好被一张图占满。

####main-slider-card
`main-slider-card`的`float`属性设为`left`，让所有的card都向左浮动，占据同一行。  `position`为`relative`，则是相对应位置计算新的位置。故1到5的图片`div`原来位置应该是0px, 1349px, 1349 * 2px, ..., 1349 * 4px，而`left`的值随index不同而不同，从1-4分别为0px, -1349px, -1349 * 2px, ..., -1349 * 4px，位置为相对位置，所以所有的图片初始情况下`left`都应该是`0px`，即都叠在一起。  
接下来，每一张图的`transform`属性是随时间周期变化的，其`transform`的x一周期是`1349px, 0px, -1349px, -1349px, -1349px`。相对应的`transition-duration:300, 0, 300, 300, 300`。以某一图片A为例，`transform`为0时，该图片left为0，占据外层`div`，之后该图片`transform`从0变到-1349，其后一张图片的`transform`从1349变到0，即两张图片同时左移，形成一次轮播。而后图片A将在-1349即左侧代3个轮播，再移到+1349，到右侧准备，下次轮播时轮到他，这样形成一个周期，完成了轮播。

####JS实现
有了上面的基础，JS脚本中只需对不同时间更改`style`中的`transorm`属性和`transition-duration`属性，即可完成轮播脚本。


