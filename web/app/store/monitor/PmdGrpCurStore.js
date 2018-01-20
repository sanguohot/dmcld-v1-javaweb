Ext.require('app.store.monitor.PmdGrpCurModel');

Ext.define('app.store.monitor.PmdGrpCurStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdGrpCurModel',
    storeId:'pmdGrpCurStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'pmdGrpCurManager!getPmdGrpCur.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'grpCurList'
        }
    }
});
