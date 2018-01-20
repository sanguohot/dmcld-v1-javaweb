Ext.require('app.store.monitor.PmdSim24Model');

Ext.define('app.store.monitor.PmdSim24Store',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdSim24Model',
    storeId:'pmdSim24Store',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'pmdSim24Manager!getPmdSim24.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'sim24List'
        }
    }
});
