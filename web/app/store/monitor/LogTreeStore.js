Ext.require('app.store.monitor.MonitorModel');

Ext.define('app.store.monitor.MonitorStore',{
	extend:'Ext.data.TreeStore',
    model: 'app.store.monitor.MonitorModel',
    autoLoad:true,
    proxy: {
        type: 'ajax',
        url: 'getMonitorTree.action',
        timeout:10*60*1000,
        root: 'children',	
    },
});
console.log("load monitor info store");