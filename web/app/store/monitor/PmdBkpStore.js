Ext.require('app.store.monitor.PmdBkpModel');

Ext.define('app.store.monitor.PmdBkpStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdBkpModel',
    storeId:'pmdBkpStore',
    autoLoad: false,
    proxy: {
	    type: 'ajax',
	    url: 'bkpManager!getBkpByUuid.action',
	    timeout:5*60*1000,
	    reader: {
	        type: 'json',
	        root: 'bkpList'
	    }	
	}
});
