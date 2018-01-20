Ext.define('app.view.operation.node.NodeDisPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	border:false,
	style:{align:'center'},
	autoScroll:true,
	initComponent: function(){
		
		var imgFNode=Ext.create('Ext.Img',{
			src:Ext.get('resources').value+'/images/nodedis.png',
			style:{align:'center'}
		});
		
		this.items=[
	       imgFNode];
		this.callParent(arguments);	
	}
});