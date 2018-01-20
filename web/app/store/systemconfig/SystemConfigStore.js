Ext.require('app.store.systemconfig.SystemConfigModel');

Ext.define('app.store.systemconfig.SystemConfigStore', {
		extend:'Ext.data.TreeStore',
        model: 'app.store.systemconfig.SystemConfigModel',
        autoLoad:true,
//        proxy: {
//            url:'SystemConfigTree.json',
//        	type: 'json',  
//            root: 'children',
////	 type: 'ajax',
////     url: 'getOperationRootTree.action',
////     root: 'children',
////     timeout:10*60*1000
//		},
        proxy: {
		    type: 'ajax',
		    url: 'app/store/systemconfig/SystemConfigTree.json',
		    reader: {
		        type: 'json',
		        root: 'children',
		    }
		} 
       
});