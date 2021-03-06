Ext.define('app.store.license.LicenseInfoModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name:'uuid',type:'int'},
            {name:'srvUuid',type:'string'},
            {name:'alias',type:'int'},
            {name:'domainUuid',type:'int'},
            {name:'srvDomain',type:'string'},
            {name:'licenseVer',type:'int'},
            {name:'srvMagic',type:'string'},
            {name:'licenseStatus',type:'int'},
            {name:'beginDate',type:'string'},
            {name:'endDate',type:'string'},
            {name:'leftDays',type:'int'},
            {name:'srvMode',type:'int'},
            {name:'licenseType',type:'int'},
            {name:'availableDays',type:'int'},
            {name:'expiredDate',type:'string'},
            {name:'maxSimCard',type:'int'},
            {name:'authInfo',type:'string'},
            {name:'serviceApi',type:'int'},
            {name:'dnsUrl01',type:'string'},
            {name:'dnsUrl02',type:'string'},
            {name:'authUrl',type:'string'},
            {name:'signAuthor',type:'string'},
            {name:'signDate',type:'string'},
            {name:'detailDesc',type:'string'},
            {name:'hbmFeatures',type:'int'},
        ]
});