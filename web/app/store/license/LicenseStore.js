Ext.require('app.store.license.LicenseModel');

Ext.define('app.store.license.LicenseStore', {
		extend:'Ext.data.TreeStore',
        model: 'app.store.license.LicenseModel',
        autoLoad:true,
        proxy: {
		    type: 'ajax',
		    url: 'getLicenseTree.action',
		    root: 'children',
		    timeout:10*60*1000
		},
		folderSort: true
       
});