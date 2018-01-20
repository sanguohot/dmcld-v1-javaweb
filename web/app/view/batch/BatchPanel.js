/**
 * Created by Rainc on 2014/11/12.
 */
Ext.define('app.view.batch.BatchPanel',{
    extend:'Ext.panel.Panel',
    layout:'auto',
    border:false,
    id:'batchPanel',
    itemId:'rightPanel',
    bodyStyle: {
        background: '#DFE9F6',
    },
    initComponent: function(){
        var log = Ext.create("app.view.batch.BatchTabPanel",{
            id:'fcloudBatchTabPanel',
            hidden:true,
            node:'super',
        });

        this.items=[log];
        this.callParent(arguments);
    },

    listeners:{
        resize:function(win, width, height, eOpts){
            var treeFn = Ext.getCmp('treeFn');
            if(!treeFn){
                treeFn = Ext.create('app.util.TreeFn',{});
            }
            treeFn.resize('batchPanel');
        }
    }


});