Ext.require('app.store.msg.MsgModel');

Ext.define('app.store.msg.MsgStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.msg.MsgModel',
    autoLoad: false,
//    remoteSort:true,
    proxy: {
        type: 'ajax',
        url: 'msgManager!getMsgList.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'messageList'
        }	
    }
});
console.log("load msg");