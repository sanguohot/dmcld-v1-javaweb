Ext.define('app.view.operation.domain.roamzone.site.nes.GwpTab', {
    extend: 'Ext.form.Panel',
//	id:'gwpPort',
	require:[
                 'Ext.data.*',
                 'Ext.util.*',
                 'Ext.view.View',
                 'Ext.XTemplate',
                 'Ext.panel.Panel',
             ],
	
	title:'',
	autoScroll:true,
	
	bodyStyle: {
		background: '#DFE9F6',
	},
	dockedItems : [{
		xtype: 'toolbar',
		items:[{
	       		 xtype:'button',
	       		 text:'Refresh',
	       		ulan:'btRefresh',
	       		 iconCls:'refresh2',
	       		 listeners:{
	       		 	click:function(){
						this.up('panel').down('dataview').store.load();
	       	 		}
	       	 	}
		}]
	}],
		
    initComponent: function() {
		var imageTpl = new Ext.XTemplate(
				'<p>&nbsp;</p>',
//				'<p align="center" style="font-size:16px">DWG Port Map</p>',
				'<p>&nbsp;</p>',
				'<div style="border:10px;" >',
				'<table>',
				'<tr>',
				'<tpl for=".">',
		        '<td align="center" alt="DWG Port Detail">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
		        '<tpl if="adminStatus==5">',
		        '<button type="button" style="border:1;padding:2px 2px 0px 2px;background:#FAB16D;" onmouseover=movePortOver("{adminStatus}","{runStatus}","{curCallStatus}","{curSmsStatus}","{curUssdStatus}",event,"{modStatus}") onmouseout=moveOut() ondblclick=linkGwp({uuid},"{alias}") align="right" >',	
		        '</tpl>',
		        '<tpl if="adminStatus!=5">',
		        '<button type="button" style="border:1;padding:1px 1px 1px 1px;" onmouseover=movePortOver("{adminStatus}","{runStatus}","{curCallStatus}","{curSmsStatus}","{curUssdStatus}",event,"{modStatus}") onmouseout=moveOut() ondblclick=linkGwp({uuid},"{alias}") align="right" >',	
		        '</tpl>',
		        
		        
		        '<tpl if="runStatus==0">',
		        '<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/null.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==1">',
		        '<img height=40 width=67  src="'+Ext.get('resources').value+'/images/gwport/init.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==2">',
		        '<img height=40 width=67  src="'+Ext.get('resources').value+'/images/gwport/auth.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==3">',
			        '<tpl if="modSignalLevel==1">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/active_0.png" alt="sim card status detail"/>',	
			        '</tpl>',
			        
			        '<tpl if="modSignalLevel==2">',
		        		'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/active_1.png" alt="sim card status detail"/>',	
		        	'</tpl>',
		        	
		        	 '<tpl if="modSignalLevel==3">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/active_2.png" alt="sim card status detail"/>',	
			        '</tpl>',
			        
			        '<tpl if="modSignalLevel==4">',
		        		'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/active_3.png" alt="sim card status detail"/>',	
		        	'</tpl>',
		        	
			        '<tpl if="modSignalLevel==5">',
	        			'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/active_4.png" alt="sim card status detail"/>',	
	        		'</tpl>',
	        		
	        		 '<tpl if="modSignalLevel<=0 || modSignalLevel &gt; 5">',
	        			'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/active_5.png" alt="sim card status detail"/>',	
	        		 '</tpl>',
		        
		        '</tpl>',
		        '<tpl if="runStatus==4">',
		        '<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/fault.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==5">',
		        '<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/empty.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==6">',
		        '<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/comm_fail.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==7">',
		        '<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/mismatch.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==8">',
		        '<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/facility_fault.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==9">',
		        '<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/disabled.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==10">',
		        	'<tpl if="modSignalLevel==1">',
		        		'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/idle_0.png" alt="sim card status detail"/>',
			        '</tpl>',
			        
			        '<tpl if="modSignalLevel==2">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/idle_1.png" alt="sim card status detail"/>',
		        	'</tpl>',
		        	
		        	'<tpl if="modSignalLevel==3">',
		        	 	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/idle_2.png" alt="sim card status detail"/>',
			        '</tpl>',
			        
			        '<tpl if="modSignalLevel==4">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/idle_3.png" alt="sim card status detail"/>',
		        	'</tpl>',
		        	
			        '<tpl if="modSignalLevel==5">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/idle_4.png" alt="sim card status detail"/>',
		    		'</tpl>',
		    		
		    		'<tpl if="modSignalLevel<=0 || modSignalLevel &gt; 5">',
		    		 	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/idle_5.png" alt="sim card status detail"/>',
		    		'</tpl>',
		        
		        		
		        '</tpl>',
		        '<tpl if="runStatus==11">',
			        '<tpl if="modSignalLevel==1">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/busy_0.png" alt="sim card status detail"/>',
			        '</tpl>',
			        
			        '<tpl if="modSignalLevel==2">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/busy_1.png" alt="sim card status detail"/>',
		        	'</tpl>',
		        	
		        	 '<tpl if="modSignalLevel==3">',
		        	 	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/busy_2.png" alt="sim card status detail"/>',
			        '</tpl>',
			        
			        '<tpl if="modSignalLevel==4">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/busy_3.png" alt="sim card status detail"/>',
		        	'</tpl>',
		        	
			        '<tpl if="modSignalLevel==5">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/busy_4.png" alt="sim card status detail"/>',
		    		'</tpl>',
		    		
		    		 '<tpl if="modSignalLevel<=0 || modSignalLevel &gt; 5">',
		    		 	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/busy_5.png" alt="sim card status detail"/>',	
		    		 '</tpl>',
		        	
		        '</tpl>',
		        '<tpl if="runStatus==12">',
			        '<tpl if="modSignalLevel==1">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/locked_0.png" alt="sim card status detail"/>',	
			        '</tpl>',
			        
			        '<tpl if="modSignalLevel==2">',
		        		'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/locked_1.png" alt="sim card status detail"/>',	
		        	'</tpl>',
		        	
		        	 '<tpl if="modSignalLevel==3">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/locked_2.png" alt="sim card status detail"/>',	
			        '</tpl>',
			        
			        '<tpl if="modSignalLevel==4">',
		        		'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/locked_3.png" alt="sim card status detail"/>',	
		        	'</tpl>',
		        	
			        '<tpl if="modSignalLevel==5">',
		        		'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/locked_4.png" alt="sim card status detail"/>',	
		    		'</tpl>',
		    		
		    		 '<tpl if="modSignalLevel<=0 || modSignalLevel &gt; 5">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/locked_5.png" alt="sim card status detail"/>',	
		    		 '</tpl>',
		        
		        '</tpl>',
		        '<tpl if="runStatus==13">',
		        '<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/elegant_stop.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==14">',
			        '<tpl if="modSignalLevel==1">',
		        		'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/testing_0.png" alt="sim card status detail"/>',	
			        '</tpl>',
			        
			        '<tpl if="modSignalLevel==2">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/testing_1.png" alt="sim card status detail"/>',	
		        	'</tpl>',
		        	
		        	'<tpl if="modSignalLevel==3">',
		        	 	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/testing_2.png" alt="sim card status detail"/>',		
			        '</tpl>',
			        
			        '<tpl if="modSignalLevel==4">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/testing_3.png" alt="sim card status detail"/>',		
		        	'</tpl>',
		        	
			        '<tpl if="modSignalLevel==5">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/testing_4.png" alt="sim card status detail"/>',		
		    		'</tpl>',
		    		
		    		 '<tpl if="modSignalLevel<=0 || modSignalLevel &gt; 5">',
		    		 	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/testing_5.png" alt="sim card status detail"/>',	
		    		 '</tpl>',	
		        '</tpl>',
		        '<tpl if="runStatus==15">',
		        '<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/ready.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==16">',
			        '<tpl if="modSignalLevel==1">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/stopped_0.png" alt="sim card status detail"/>',	
			        '</tpl>',
			        
			        '<tpl if="modSignalLevel==2">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/stopped_1.png" alt="sim card status detail"/>',	
		        	'</tpl>',
		        	
		        	'<tpl if="modSignalLevel==3">',
		        	 	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/stopped_2.png" alt="sim card status detail"/>',		
			        '</tpl>',
			        
			        '<tpl if="modSignalLevel==4">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/stopped_3.png" alt="sim card status detail"/>',		
		        	'</tpl>',
		        	
			        '<tpl if="modSignalLevel==5">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/stopped_4.png" alt="sim card status detail"/>',		
		    		'</tpl>',
		    		
		    		 '<tpl if="modSignalLevel<=0 || modSignalLevel &gt; 5">',
		    		 	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/stopped_5.png" alt="sim card status detail"/>',	
		    		 '</tpl>',
		        
		        
		        '</tpl>',
		        '<tpl if="runStatus==17">',
			        '<tpl if="modSignalLevel==1">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/no_balance_0.png" alt="sim card status detail"/>',	
			        '</tpl>',
			        
			        '<tpl if="modSignalLevel==2">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/no_balance_1.png" alt="sim card status detail"/>',	
		        	'</tpl>',
		        	
		        	'<tpl if="modSignalLevel==3">',
		        	 	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/no_balance_2.png" alt="sim card status detail"/>',		
			        '</tpl>',
			        
			        '<tpl if="modSignalLevel==4">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/no_balance_3.png" alt="sim card status detail"/>',		
		        	'</tpl>',
		        	
			        '<tpl if="modSignalLevel==5">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/no_balance_4.png" alt="sim card status detail"/>',		
		    		'</tpl>',
		    		
		    		 '<tpl if="modSignalLevel<=0 || modSignalLevel &gt; 5">',
		    		 	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/no_balance_5.png" alt="sim card status detail"/>',	
		    		 '</tpl>',
		        '</tpl>',
		        '<tpl if="runStatus==18">',
		        '<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/offline.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==19">',
		        '<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/init.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        
		        '<tpl if="runStatus==20">',
			        '<tpl if="modSignalLevel==1">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/low_balance_0.png" alt="sim card status detail"/>',	
			        '</tpl>',
			        
			        '<tpl if="modSignalLevel==2">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/low_balance_1.png" alt="sim card status detail"/>',	
		        	'</tpl>',
		        	
		        	'<tpl if="modSignalLevel==3">',
		        	 	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/low_balance_2.png" alt="sim card status detail"/>',		
			        '</tpl>',
			        
			        '<tpl if="modSignalLevel==4">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/low_balance_3.png" alt="sim card status detail"/>',		
		        	'</tpl>',
		        	
			        '<tpl if="modSignalLevel==5">',
			        	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/low_balance_4.png" alt="sim card status detail"/>',		
		    		'</tpl>',
		    		
		    		 '<tpl if="modSignalLevel<=0 || modSignalLevel &gt; 5">',
		    		 	'<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/low_balance_5.png" alt="sim card status detail"/>',	
		    		 '</tpl>',
	    		 '</tpl>',
		        
	    		 '<tpl if="runStatus==21">',
			        '<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/disabled.png" alt="sim card status detail"/>',	
			     '</tpl>',
		        '<tpl  if="runStatus &gt; 21 || runStatus < 0">',
		        '<img height=40 width=67 src="'+Ext.get('resources').value+'/images/gwport/null.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        
		        '</button>',
		        '<br/><span><i>Port{portNo}</i></span></td>',
		        '<tpl if="xindex % 8 == 0">',
		        '</tr><tr>',
		        '</tpl>',
//		        '<tpl if=" runStatus==0 || runStatus== 18 || runStatus < 0 || runStatus &gt; 19">',
//		        '<img align=absMiddle src="'+Ext.get('resources').value+'/icons/gray.png">',
//		        '</tpl>',
//		        '<tpl if="runStatus==3 || runStatus==10 || runStatus==15">',
//		        '<img align=absMiddle src="'+Ext.get('resources').value+'/icons/green.png">',
//		        '</tpl>',
//		        '<tpl if=" runStatus==4 ||runStatus==6 || runStatus==7 || runStatus==8 ">',
//		        '<img align=absMiddle src="'+Ext.get('resources').value+'/icons/red.png">',
//		        '</tpl>',
//		        '<tpl if=" runStatus==1  ||runStatus==2|| runStatus==5 ||runStatus==9 ||runStatus==12||runStatus==13||runStatus==14||runStatus==16||runStatus==17||runStatus==19">',
//		        '<img align=absMiddle src="'+Ext.get('resources').value+'/icons/yellow.png">',
//		        '</tpl>',
		        
			    '</tpl>',
			    '</table>',
			    '</div>'
		);
		var store = Ext.create('app.store.operation.domain.roamzone.site.nes.GwpInNeStore',{});
		this.store = store;
		var gwpGrid=Ext.create('Ext.view.View', {
//			id:'gwpTabGrid',
		    store:this.store,
		    tpl: imageTpl,
		    autoScroll:true,
		    itemSelector: 'div.thumb-wrap',
		    emptyText: 'No Port Status available',
		    
		});

		 window.linkGwp = function(uuid,alias) {			 
				var tabpanel = gwpGrid.up('panel').up('panel');
				var prefix = 'GwpInNe_';
				var maintenance = gwpGrid.up('panel').maintenance;
				if(maintenance){
					prefix = 'maintenance_'+prefix;
				}
				var id=prefix+"gwpUuid_"+uuid;
				var tipId = prefix+'gwpTipId_'+uuid;
				var tab = Ext.getCmp(id);
				var params = {params : {uuid:uuid}};
				if(tab==undefined){
					tab = Ext.create('app.view.module.GwpInfoPanel',{
						id:id,
						tipId:tipId,
//						title:gwpAlias,
						params:params,
						prefix:prefix,
					});
					lanControll.setLan(tab);
					tabpanel.add(tab);
					
				}
				tab.store.load(params);
				tab.show();
		 }
			 
		
		this.items = [ gwpGrid ];
				
		this.callParent(arguments);		
	
}

});