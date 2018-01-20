Ext.define('app.store.operation.node.NodeInfoModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name: 'uuid',type: 'int'},
	         {name: 'name',type: 'string'},
	         {name: 'alias',type: 'string'},
	         {name: 'defaultFlag',type: 'int'},
	         {name: 'adminStatus',type: 'int'},
	         {name: 'oprStatus',type: 'int'},
	         {name: 'runStatus',type: 'int'},
	         {name: 'priority',type: 'int'},
	         {name: 'ipAddr',type: 'string'},
	         {name: 'portNo',type: 'int'},
	         {name: 'password',type: 'string'},
	         {name: 'bytesTx',type: 'int'},
	         {name: 'bytesRx',type: 'int'},
	         {name: 'allocsTot',type: 'int'},
	         {name: 'allocsCur',type: 'int'},
	         {name: 'lastRegTime',type: 'date'},
	         {name: 'lastHbTime',type: 'date'},
	         {name: 'detailDesc',type: 'string'},
	         {name: 'encryptType',type: 'int'},
	         {name: 'lat',type: 'float'},
	         {name: 'lng',type: 'float'},
	        ]
});
console.log("load node info model");