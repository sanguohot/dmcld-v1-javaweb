Ext.define('app.store.provision.producttype.version.VersionModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name:'uuid',type:'int'},
            {name:'alias',type:'string'},
            {name:'status',type:'int'},
            {name:'packageVer',type:'string'},
            {name:'packageName',type:'string'},
            {name:'relyVer',type:'string'},
            {name:'vendorId',type:'int'},
            {name:'productId',type:'int'},
            {name:'filePath',type:'string'},
            {name:'createTime',type:'date'},
            {name:'updateTime',type:'date'},
            {name:'detailDesc',type:'string'},
            {name:'showStr',type:'string'}
        ]
});