Ext.define('app.view.operation.RightMenu', {
	extend : 'Ext.menu.Menu',
	id : 'rightClickCont',
	floating : true,
	plain : true,
	items : [ {
		id : 'rMenu1',
		text : '新建对象关系/对象',
		handler : function() {
			Ext.MessageBox.alert('Woring', '功能暂未开放...')
		}

	}, {
		id : 'rMenu2',
		text : '复制',
		handler : function() {
			Ext.MessageBox.alert('Woring', '功能暂未开放...')
		}
	}, {
		id : 'rMenu3',
		text : '打开',
		handler : function() {
			Ext.MessageBox.alert('Woring', '功能暂未开放...')
		}
	}, {
		id : 'rMenu4',
		text : '删除',
		handler : function() {
			Ext.MessageBox.alert('Woring', '功能暂未开放...')
		}

	}, {
		id : 'rMenu5',
		text : '修改',
		handler : function() {
			Ext.MessageBox.alert('Woring', '功能暂未开放...')
		}

	}, {
		id : 'rMenu6',
		text : '下移',
		handler : function() {
			Ext.MessageBox.alert('Woring', '功能暂未开放...')
		}

	} ]
});