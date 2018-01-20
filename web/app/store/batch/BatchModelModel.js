/**
 * Created by Rainc on 2014/11/22.
 */
Ext.define('app.store.batch.BatchModelModel',{
    extend: 'Ext.data.Model',
    fields: [
        {name: 'uuid',type: 'int'},
        {name: 'domainUuid',type:'int'},
        {name: 'name',type: 'string'},
        {name: 'productId',type:'int'},
        {name: 'productName',type: 'string'},
        {name: 'packageVersion',type: 'string'},
        {name: 'status',type: 'int'},
        {name: 'filePath',type: 'string'},
        {name: 'detailDesc',type: 'string'},
        {name: 'createTime',type: 'date'},
        {name: 'updateTime',type: 'date'}
    ]
});
console.log("load batchModel model");