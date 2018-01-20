Ext.require('app.store.monitor.PmdNeListModel');

Ext.define('app.store.monitor.PmdNeListStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdNeListModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'pmdNeManager!getPmdNeByDomainUuid.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'neList2',
        }	
    }
});
