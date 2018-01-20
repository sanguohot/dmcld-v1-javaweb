Ext.define('app.view.operation.node.FNodeTab',{
	extend:'Ext.panel.Panel',
	id:'fNodeTab',
	layout:'fit',
	hidden:true,
	border:false,
	style:{align:'center'},
	initComponent: function(){
		
		var imgFNode=Ext.create('Ext.Img',{
			src:'resources/images/worldmap.png',
			style:{align:'center'}
		});
		
		this.items=[{
//	       	xtype: 'tabpanel',
	       	items:[imgFNode]
	       
		}];
		this.callParent(arguments);	
	}
});