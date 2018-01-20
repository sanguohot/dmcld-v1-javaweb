库文件和第三方插件
	库文件:dm/lib/jquery-1.11.2.min.js
	第三方插件:直接位于dm目录下，主要包括bootstrap和echarts

顶部导航条
	其监听事件位于bootstrap.html的load方法里面

导航树
	控制脚本：dm/js/my.js
	样式：dm/css/tree.css
	数据来源：dm/json/dev-tree.json
	调用方法：loadTree()

搜索条
	控制脚本：dm/js/dev-sch.js
	样式：dm/css/dev-sch.css
	数据来源：dm/json/dev-sch.json
	调用方法：loadSearch()

图表
	控制脚本：dm/js/chart.js
	样式:无
	数据来源：dm/js/chart.js中构造
	调用方法：loadChart(id),id为图表的标志，对应接口需要在chart.js添加，loadChart里面调用

标签页
	代码目前未抽取出来，全部代码位于bootstrap.html中
	
表格
	代码嵌入标签页的设备列表中，使用的插件是bootstrap-table
	
	
	