Ext.require('app.store.monitor.PmdGrp15Model');

Ext.define('app.store.monitor.PmdGrp15Store',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdGrp15Model',
    storeId:'pmdGrp15Store',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'pmdGrp15Manager!getPmdGrp15.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'grp15List'
        }
    }
});
