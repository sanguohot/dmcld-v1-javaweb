Ext.require('app.store.provision.ProvisionModel');

Ext.define('app.store.provision.ProvisionStore', {
		extend:'Ext.data.TreeStore',    
		model: 'app.store.provision.ProvisionModel',
        autoLoad:true,
        proxy: {
            type: 'ajax',
            url: 'getPervisionRootTree.action',
            timeout:10*60*1000,
//            url:'data/test.json',
//        	type: 'json',  
            root: 'children',	
        },
        folderSort: true
});