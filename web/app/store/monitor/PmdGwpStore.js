Ext.require('app.store.monitor.PmdGwpModel');

Ext.define('app.store.monitor.PmdGwpStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdGwpModel',
    storeId:'pmdGwpStore',
    autoLoad: false,
    proxy: {
	    type: 'ajax',
	    url: 'gwpManager!getGwpByUuid.action',
	    timeout:5*60*1000,
	    reader: {
	        type: 'json',
	        root: 'gwpList'
	    }	
	}
});
