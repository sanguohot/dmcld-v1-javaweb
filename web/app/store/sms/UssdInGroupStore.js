Ext.require('app.store.sms.UssdInGroupModel');

Ext.define('app.store.sms.UssdInGroupStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.sms.UssdInGroupModel',
    storeId:'ussdInGroupStore',
    autoLoad: false,
    remoteSort:true,
    proxy: {
        type: 'ajax',
        url: 'ussdInGroupManager!getUssdInGroup.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'usList'
        }	
    }
});
