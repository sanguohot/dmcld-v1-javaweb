Ext.require('app.store.privilege.PrivilegeModel');

Ext.define('app.store.privilege.PrivilegeStore', {
		extend:'Ext.data.TreeStore',
        model: 'app.store.privilege.PrivilegeModel',
        autoLoad:false,
        proxy: {
            type: 'ajax',
            url: 'getOperationRootTree.action',
//            url:'temp/operationTree.json',
//        	type: 'json',  
            root: 'children',
            timeout:10*60*1000
        },
//        folderSort: true
});