/**
 * Created by Rainc on 2014/11/20.
 */
Ext.define('app.store.batch.BatchTreeModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name',   type: 'string'},
        {name:'eType',type:'string'},
        {name:'tid',type:'string'},
        {name:'nid',type:'string'},
        {name:'uuid',type:'int'},
    ]
});