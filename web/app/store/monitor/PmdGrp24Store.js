Ext.require('app.store.monitor.PmdGrp24Model');

Ext.define('app.store.monitor.PmdGrp24Store',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdGrp24Model',
    storeId:'pmdGrp24Store',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'pmdGrp24Manager!getPmdGrp24.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'grp24List'
        }
    }
});
