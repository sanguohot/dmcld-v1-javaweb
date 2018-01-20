Ext.require('app.store.privilege.MailModel');
Ext.define('app.store.privilege.MailListStore', {
    extend: 'Ext.data.Store',	
	model: 'app.store.privilege.MailModel',
	autoLoad: false,
	remoteSort:true,
    proxy: {
        type: 'ajax',
        url: 'mailqManager!findMailList.action',
        reader: {
            type: 'json',
            root: 'mailList',
        }
    } 
});

