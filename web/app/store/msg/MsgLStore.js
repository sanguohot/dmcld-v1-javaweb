Ext.require('app.store.msg.MsgLModel');

Ext.define('app.store.msg.MsgLStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.msg.MsgLModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'msgManager!getMsgTree.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'tree'
        }	
    }
});
console.log("load log");