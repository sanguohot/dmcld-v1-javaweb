Ext.define('app.view.privilege.Forbidden', {
    extend: 'Ext.panel.Panel',
	id:'forbidden',
	require:[
                 'Ext.util.*',
                 'Ext.view.View',
                 'Ext.panel.Panel',
             ],
	
	title:'',
	layout:'fit',
	autoScroll:true,
	hidden:true,
	bodyStyle: {
		background: '#DFE9F6',
	},
//	initComponent: function() {
//		this.callParent(arguments);	
//	},
	html:'<br/><br/><br/><br/><p align="center" style="font-size:30px">FORBIDDEN</p>'
		+'<p align="center" style="font-size:30px">You have no right to access</p>'
   
});