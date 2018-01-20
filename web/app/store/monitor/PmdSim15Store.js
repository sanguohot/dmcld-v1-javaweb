Ext.require('app.store.monitor.PmdSim15Model');

Ext.define('app.store.monitor.PmdSim15Store',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdSim15Model',
    storeId:'pmdSim15Store',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'pmdSim15Manager!getPmdSim15.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'sim15List'
        }
    }
});
