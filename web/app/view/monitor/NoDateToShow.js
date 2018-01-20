Ext.define('app.view.monitor.NoDateToShow', {
    extend: 'Ext.panel.Panel',
//	id:'noDateToShow',
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
	html:'<br/><br/><br/><br/><p align="center" style="font-size:16px">'+lanControll.getLanValue('noDataToShow')+'</p>'
   
});