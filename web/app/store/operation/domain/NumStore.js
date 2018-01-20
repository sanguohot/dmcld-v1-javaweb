Ext.require('app.store.operation.domain.NumModel');

Ext.define('app.store.operation.domain.NumStore',{
	extend: 'Ext.data.Store',
    model: 'app.store.operation.domain.NumModel',
    autoLoad: false,
    remoteSort:true,
    proxy: {
        type: 'ajax',
        url: 'numManager!getNumList.action',
        timeout:5*60*1000,
        reader: {
            type: 'json',
            root: 'numberList'
        }	
    }
});
console.log("load num store");