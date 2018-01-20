Ext.define('app.store.msg.MsgTreeModel',{
	extend: 'Ext.data.Model',
	fields: [
	            {name: 'name',   type: 'string'},
	            {name:'eType',type:'string'},
	            {name:'tid',type:'string'},
	            {name:'nid',type:'string'},
	            {name:'uuid',type:'int'},
	        ]
});
console.log("load log model");