Ext.require('app.store.monitor.PmdTgMntModel');

Ext.define('app.store.monitor.PmdTgMntStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.monitor.PmdTgMntModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'pmdTgMntManager!getPmdTgMntList.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'list'
        }
    }
});