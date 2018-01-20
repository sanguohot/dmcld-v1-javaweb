/**
 * Created by Rainc on 2014/11/20.
 */
Ext.require('app.store.batch.BatchTreeModel');

Ext.define('app.store.batch.BatchTreeStore', {
    extend:'Ext.data.TreeStore',
    model: 'app.store.batch.BatchTreeModel',
    autoLoad:false,
    proxy: {
        type: 'ajax',
        url: 'batchTreeManager.action',
//            url:'temp/operationTree.json',
//        	type: 'json',
        root: 'children',
        timeout:10*60*1000
    }
//        folderSort: true
});