Ext.define('app.store.GroupPolicyMapperModel',{
	extend:'Ext.data.Model',
	fields:[
	        {name:'id',type:'int'},
	        {name:'groupId',type:'int'},
	        {name:'groupName',type:'string'},
	        {name:'policyId',type:'int'},
	        {name:'policyName',type:'string'},
	        {name:'status',type:'int'},
	        {name:'tsWeekday',type:'string'},
	        {name:'tsTime0',type:'string'},
	        {name:'tsTime1',type:'string'},
	        {name:'createtime',type:'string'},
	        {name:'updatetime',type:'string'},
	        {name:'description',type:'string'}
	        ]
});