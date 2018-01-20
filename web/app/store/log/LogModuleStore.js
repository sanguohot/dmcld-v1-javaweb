Ext.require('app.store.log.LogModuleModel');

Ext.define('app.store.log.LogModuleStore',{
	extend: 'Ext.data.TreeStore',
    model: 'app.store.log.LogModuleModel',
    autoLoad: false,
    proxy: {
	    type: 'ajax',
	    url: 'getOperationRootTree.action',
	//    url:'temp/operationTree.json',
	//	type: 'json',  
	    root: 'children',
	    timeout:10*60*1000
    }
});
console.log("load log");