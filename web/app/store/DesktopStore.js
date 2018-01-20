
Ext.require('app.store.DesktopModel');

Ext.define('app.store.DesktopStore', {
    extend: 'Ext.data.Store',	
	model: 'app.store.DesktopModel',
	id:'desktopStore',
	autoLoad :false,
//	autoSync :true,
	proxy : {
		type : 'ajax',
		url : 'getUserDesktop.action',
		reader : {
			root : "resultList",
			type : "json"
		}
	} 
});

