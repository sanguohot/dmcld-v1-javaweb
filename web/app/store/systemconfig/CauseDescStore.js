Ext.require('app.store.systemconfig.CauseDescModel');

Ext.define('app.store.systemconfig.CauseDescStore', {
		extend: 'Ext.data.Store',
		model: 'app.store.systemconfig.CauseDescModel',
        autoLoad:false,
        remoteSort:true,
        proxy: {
            type: 'ajax',
            url: 'causeDescManager!getCauseDescAll.action',
            reader: {
                type: 'json',
                root: 'causeDescList'
            }	
        }
});