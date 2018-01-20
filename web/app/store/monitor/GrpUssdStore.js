Ext.require('app.store.monitor.UssdModel');

Ext.define('app.store.monitor.GrpUssdStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.UssdModel',
    storeId:'grpUssdStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'ussdManager!getGrpUssd.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'ussdList'
        }	
    }
});
