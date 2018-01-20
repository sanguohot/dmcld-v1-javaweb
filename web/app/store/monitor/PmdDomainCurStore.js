Ext.require('app.store.monitor.PmdDomainCurModel');

Ext.define('app.store.monitor.PmdDomainCurStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdDomainCurModel',
    storeId:'pmdDomainCurStore',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'pmdDomainCurManager!getPmdDomainCur.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'domainCurList'
        }
    }
});
