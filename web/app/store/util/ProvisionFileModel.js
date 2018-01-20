Ext.define('app.store.util.ProvisionFileModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'uuid',type: 'int'},
            {name: 'productSnStr',type: 'string'},
            {name: 'alias',type: 'string'},
            {name: 'syslogStatus',type: 'int'},
            {name: 'adminStatus',type: 'int'},
	        {name: 'oprStatus',type: 'int'},
	        {name: 'runStatus',type: 'int'},
            {name:'fileName',type:'string'},
            {name:'fileHref',type:'string'},
            {name:'fileSize',type:'string'},
            {name:'lastModified',type:'date'}
        ]
});