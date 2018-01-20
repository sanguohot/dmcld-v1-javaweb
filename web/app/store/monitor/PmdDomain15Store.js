Ext.require('app.store.monitor.PmdDomain15Model');

Ext.define('app.store.monitor.PmdDomain15Store',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdDomain15Model',
    storeId:'pmdDomain15Store',
    autoLoad: false,
//    sortOnLoad:false,
    proxy: {
        type: 'ajax',
        url: 'pmdDomain15Manager!getPmdDomain15.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'domain15List',
        }	
    }
});
