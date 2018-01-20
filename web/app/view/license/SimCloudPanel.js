Ext.define('app.view.license.SimCloudPanel',{
	extend:'Ext.panel.Panel',
	id:'licenseSimCloudPanel',
	layout:'fit',
	hidden:false,
	border:false,
//	html:'<div style="height:100%;margin:0 auto;padding:20px;display:table; *position:relative; "><div style=" display:table-cell;vertical-align:middle;*position:absolute;*top:50%; "><div style="*position:relative;*top:-50%;backgroup-image:"><img align=middle src='+Ext.get('resources').value+'/images/simcloudpanel.png></div></div> </div>',

	initComponent: function(){
		
		Ext.getDoc().on("contextmenu", function(e){
		     e.stopEvent();
		});
		this.callParent(arguments);	
	}
});