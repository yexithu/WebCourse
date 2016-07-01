#个人主页
叶曦
2014013417
yexithu14@163.com
##作业要求
###基本要求
1.	个人介绍（图片，信息，联系方式）
2.	Web前端展示区，包含发布连接
3.	个人日志区
4.	布局合理，兼容所有浏览器
5.	利用GH-Pages发布

###提高要求
1.	压缩
2.	适配移动端

##发布链接
https://yexithu.github.io/WebCourse/hw1/index.html

##基本要求完成情况
###页面预览
![](http://i.imgur.com/yfddQt1.jpg)

###基本框架
主要框架3部分 header div 和 footer
在不同的设备端会有不同的排布效果

####header
头像以及个人信息等
####div
内含多个section，表示日志或者项目的列表
####footer
比较简单，只有copyright


###个人介绍
个人介绍见网页左侧header
包含头像，介绍，和联系方式
联系方式将链接到GITHUB主页

###Web 前端展示区
左侧Header Work可进入Web作业展示区，预览如下
![](http://i.imgur.com/K2p6Ikb.jpg)
每一个展示都会配图，点击more按钮将会跳转到作业页面
今后的所有作业将会发到链接
https://yexithu.github.io/WebCourse/hwI/index.html
符合发布要求

###个人日志区
进入首页时，将显示个人日志的标题和简短预览，点击more按钮显示详细个人日志，详细个人日志将在页面右侧展开，和预览的样式相同，不过多定义了一些标签的样式，最后有个bacK按钮回到日志列表。

###浏览器兼容
使用了合理的标签和排布，兼容了所有主流浏览器，包括chrome,safari,firefox,IE9

###GH-PAGES发布
现在github上建立repo WebCours
再建立分支gh-pages
将网页内容全部push到gh-pages分支

作业发布在github repo
https://github.com/yexithu/WebCourse


##提高要求完成情况
完成了适配移动端的要求
完成方式如下

通过在html头中加入
	
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
来获取设备无关像素
在css中查询设备无关像素，代码如下

	@media (min-width: 960px) {
		...
	}

	@media (max-width: 960px) {
		...
	}

对其采用不同的布局
移动端布局与PC端布局不相同
PC端布呈现左右布局，左边新信息栏，右边展示栏，且都往中部靠。
在移动端上下布局，所有内容居中，效果预览如下（Chrome中Iphone6预览）
![](http://i.imgur.com/3PaMWzD.jpg)

按照如上方法做到了设备兼容
 

