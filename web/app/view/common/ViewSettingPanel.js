Ext.define('app.view.common.ViewSettingPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	border:false,
	initComponent: function(){
	
		var form = Ext.widget('grid', {
			border : false,
			hideHeaders:true,
			columns:[
			         { text: 'view0',  dataIndex: 'view0' },
			],
			store:{
				fields:['view0'],
			    data:{'items':[
			        { 'view0': '<img src='+Ext.get('resources').value+'/images/DevSN.jpg'+' />' },
			        { 'view0': '<img src='+Ext.get('resources').value+'/images/DevSN.jpg'+' />' },
			    ]},
			},
		});	
		this.items = [form];
		this.callParent();
	},
});