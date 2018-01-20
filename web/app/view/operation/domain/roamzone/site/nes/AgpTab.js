Ext.define('app.view.operation.domain.roamzone.site.nes.AgpTab', {
    extend: 'Ext.form.Panel',
	require:[
                 'Ext.data.*',
                 'Ext.util.*',
                 'Ext.view.View',
                 'Ext.XTemplate',
                 'Ext.panel.Panel',
             ],
	
    title:lanControll.getLanValue('tiLineMap'),
	layout:'fit',
	forceRefresh:0,
	moduleId:'',
	otiose:0,
	toolbars:0,
	autoScroll:true,
	bodyStyle: {
		background: '#DFE9F6',
	},
	itemId:'portMap',
	 dockedItems : [{
			xtype: 'toolbar',
			items:[{
		       		 xtype:'button',
		       		 text:'Refresh',
		       		ulan:'btRefresh',
		       		 iconCls:'refresh2',
		       		 flag:"domain_read",
		       		 listeners:{
		       		 	click:function(){
							this.up('panel').down('dataview').store.load();
		       	 		}
		       	 	}
			}]
		}],
    initComponent: function() {
		var otiose=this.otiose;
		var toolbars=this.toolbars;
		var moduleId=this.moduleId;
		var store=Ext.create('app.store.operation.domain.roamzone.site.nes.AgpInNeStore',{});
		this.store=store;
		
		var refresh={
	       		 xtype:'button',
	       		 text:'Refresh',
	       		 tooltip:'Refresh',
	       		 iconCls:'refresh2',
	       		 flag:"domain_read",
	       		 listeners:{
	       		 	click:function(){
						this.up('panel').down('dataview').store.load();
	       	 		}
	       	 	}
		};
		var tbs=[];
		var refreshButton = autoRefresh.createRefreshButton(this,store,Ext.create(Ext.getClassName(store),{}),null);
		tbs.push(refreshButton);
		var di=[{
	        xtype: 'toolbar',
	        items: tbs
	    }];
		this.dockedItems=di;
		var imageTpl = new Ext.XTemplate(
				'<p>&nbsp;</p>',
				'<p align="center" style="font-size:16px">DAG Port Map</p>',
				'<p>&nbsp;</p>',
				'<div style="margin-bottom: 10px;border:10px;" >',
				'<table>',
				'<tr>',
				'<tpl for=".">',
		        '<td align="center" alt="sim card status detail">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
		        '<button style="border:1;padding: 2px 4px 0px 4px; " ondblclick=linkAgp({agpUuid},"{alias}") align="right">',

		        '<tpl if="agpWorkState==0">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/agport/not_config.png"/>',	
		        '</tpl>',
		        '<tpl if="agpWorkState==1">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/agport/fault.png"/>',	
		        '</tpl>',
		        '<tpl if="agpWorkState==2">',
		        '<img height=40 width=65  src="'+Ext.get('resources').value+'/images/agport/disable.png"/>',	
		        '</tpl>',
		        '<tpl if="agpWorkState==3">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/agport/onhook.png" />',	
		        '</tpl>',
		        '<tpl if="agpWorkState==4">',
		        '<img height=40 width=65  src="'+Ext.get('resources').value+'/images/agport/offhook.png"/>',	
		        '</tpl>',

		        '<tpl if="agpWorkState &gt; 4 || agpWorkState<0 ">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/agport/not_config.png" />',	
		        '</tpl>',
//		        '<tpl if="runStatus==5">',
//		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/agport/not_config.png" alt="sim card status detail"/>',	
//		        '</tpl>',
//		        '<tpl if="runStatus==6">',
//		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/agport/comm_fail.png" alt="sim card status detail"/>',	
//		        '</tpl>',
//		        '<tpl if="runStatus==7">',
//		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/agport/mismatch.png" alt="sim card status detail"/>',	
//		        '</tpl>',
//		        '<tpl if="runStatus==8">',
//		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/agport/facility_fault.png" alt="sim card status detail"/>',	
//		        '</tpl>',
//		        '<tpl if="runStatus==9">',
//		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/agport/disabled.png" alt="sim card status detail"/>',	
//		        '</tpl>',
//		        '<tpl if="runStatus==10">',
//		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/agport/idle.png" alt="sim card status detail"/>',	
//		        '</tpl>',
//		        '<tpl if="runStatus==11">',
//		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/agport/busy.png" alt="sim card status detail"/>',	
//		        '</tpl>',
//		        '<tpl if="runStatus==12">',
//		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/agport/locked.png" alt="sim card status detail"/>',	
//		        '</tpl>',
//		        '<tpl if="runStatus==13">',
//		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/agport/elegant_stop.png" alt="sim card status detail"/>',	
//		        '</tpl>',
//		        '<tpl if="runStatus==14">',
//		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/agport/testing.png" alt="sim card status detail"/>',	
//		        '</tpl>',
//		        '<tpl if="runStatus==15">',
//		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/agport/ready.png" alt="sim card status detail"/>',	
//		        '</tpl>',
//		        '<tpl if="runStatus==16">',
//		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/agport/stopped.png" alt="sim card status detail"/>',	
//		        '</tpl>',
//		        '<tpl if="runStatus==17">',
//		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/agport/no_balance.png" alt="sim card status detail"/>',	
//		        '</tpl>',
//		        '<tpl if="runStatus==18">',
//		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/agport/offline.png" alt="sim card status detail"/>',	
//		        '</tpl>',
//		        '<tpl if="runStatus==19">',
//		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/agport/reboot.png" alt="sim card status detail"/>',	
//		        '</tpl>',
//		        '<tpl  if="runStatus &gt; 19 || runStatus < 0">',
//		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/agport/null.png" alt="sim card status detail"/>',	
//		        '</tpl>',
		       
		        
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
		
		var agpGrid=Ext.create('Ext.view.View', {
		    store: this.store,
		    tpl: imageTpl,
		    autoScroll:true,
		    itemSelector: 'div.thumb-wrap',
		    emptyText: 'No Port Status available',
		   
		    
// renderTo: Ext.getBody()
		});
		 window.linkAgp = function(agpUuid,alias) {
				var tabpanel = agpGrid.up('panel').up('panel');
				var prefix = moduleId+'_AgpInNe_';
				var id=prefix+"agpUuid_"+agpUuid;
				var tipId = prefix+'agpTipId_'+agpUuid;
				var tab = Ext.getCmp(id);
				var params = {params : {agpUuid:agpUuid}};
				if(tab==undefined){
					tab = Ext.create('app.view.module.AgpInfoPanel',{
						id:id,
						tipId:tipId,
						params:params,
						prefix:prefix,
						toolbars:toolbars,
						otiose:otiose,
						
					});
					tabpanel.add(tab);
					
				}
				tab.store.load(params);
				tab.show();
		 }
			 
		
		this.items = [ agpGrid ];
				
		this.callParent(arguments);		
	
	},
	listeners:{
		activate: function(tab){
			var grid=tab.down('dataview');
			if(tab.forceRefresh==1){
				tab.forceRefresh=0;
				grid.store.load();
			}
		}
	}

});