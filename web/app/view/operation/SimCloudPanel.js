Ext.define('app.view.operation.SimCloudPanel',{
	extend:'Ext.panel.Panel',
//	id:'simCloudPanel',
	layout:'fit',
	hidden:false,
	border:true,
	html:'<div style="height:100%;margin:0 auto;padding:20px;display:table; *position:relative; ">'+
		'<div style=" display:table-cell;vertical-align:middle;*position:absolute;*top:50%; ">'+
		'<div style="*position:relative;*top:-50%;">'+
		'<img src="'+Ext.get('resources').value+'/images/simcloudpanel.png"></div></div></div>',

	initComponent: function(){
		Ext.getDoc().on("contextmenu", function(e){
		     e.stopEvent();
		});

		this.callParent(arguments);	
	}
});