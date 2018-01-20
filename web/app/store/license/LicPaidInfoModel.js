Ext.define('app.store.license.LicPaidInfoModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name:'uuid',type:'int'},
            {name:'cardSn',type:'string'},
            {name:'alias',type:'string'},
            {name:'cardStatus',type:'int'},
            {name:'cardPwd',type:'string'},
            {name:'cardType',type:'int'},
            {name:'cardPrice',type:'int'},
            {name:'createTime',type:'date'},
            {name:'updateTime',type:'date'},
            {name:'expiredDate',type:'date'},
            {name:'usedSysUuid',type:'int'},
            {name:'usedDomainUuid',type:'int'},
            {name:'usedTime',type:'date'},
            {name:'detailDesc',type:'string'},

            {name:'usedDomainName',type:'string'},
            {name:'usedSysName',type:'string'},
        ]
});