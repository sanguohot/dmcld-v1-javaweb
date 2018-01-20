Ext.define('app.store.operation.node.NodeGroupModel',{
	extend: 'Ext.data.Model',
	fields: [
	         {name:'uuid',type:'int'},
	         {name:'name',type:'String'},
	         {name:'alias',type:'String'},
	         {name:'detailDesc',type:'String'},
	         {name:'defaultFlag',type:'int'},
	         {name:'recStatus',type:'int'},
	         ]
});
console.log("load node grp model");