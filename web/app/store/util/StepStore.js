Ext.require('app.store.util.StepModel');

Ext.define('app.store.util.StepStore', {
		extend:'Ext.data.Store',
        model: 'app.store.util.StepModel',
        autoLoad:false,
        proxy: {
            type: 'ajax',
            url: 'check!getStep.action',
            timeout:5*60*1000,
            reader: {
                type: 'json',
                root: 'stepList'
            }
        }
});