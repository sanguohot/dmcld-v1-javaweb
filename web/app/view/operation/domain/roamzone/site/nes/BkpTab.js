Ext.define('app.view.operation.domain.roamzone.site.nes.BkpTab', {
    extend: 'Ext.form.Panel',
//	id:'bkpPort',
	require:[
                 'Ext.data.*',
                 'Ext.util.*',
                 'Ext.view.View',
                 'Ext.XTemplate',
                 'Ext.panel.Panel',
             ],
	
	title:'',
	layout:'fit',
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
	       		 flag:"domain_read",
	       		 listeners:{
	       		 	click:function(){
						var store=this.up('panel').down('dataview').store;
						store.load();
	       	 		}
	       	 	}
		}]
	}],
    initComponent: function() {
		var imageTpl = new Ext.XTemplate(
				'<p>&nbsp;</p>',
//				'<p align="center" style="font-size:16px">SIMBank Port Map</p>',
				'<p>&nbsp;</p>',
				'<div style="margin-bottom: 10px;border:10px;" >',
				'<table>',
				'<tr>',
				'<tpl for=".">',
		        '<td align="center" alt="sim card status detail">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
		        '<button style="border:1;padding:2px 4px 0px 4px;" onmouseover=movePortOver("{adminStatus}","{runStatus}","{curCallStatus}","{curSmsStatus}","{curUssdStatus}",event) onmouseout=moveOut() ondblclick=linkBkp({uuid},{simUuid},{domainUuid},"{alias}") align="right">',

		        '<tpl if="runStatus==0">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/simcard/null.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==1">',
		        '<img height=40 width=65  src="'+Ext.get('resources').value+'/images/simcard/init.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==2">',
		        '<img height=40 width=65  src="'+Ext.get('resources').value+'/images/simcard/auth.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==3">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/simcard/active.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==4">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/simcard/fault.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==5">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/simcard/empty.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==6">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/simcard/comm_fail.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==7">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/simcard/mismatch.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==8">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/simcard/facility_fault.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==9">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/simcard/disabled.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==10">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/simcard/idle.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==11">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/simcard/busy.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==12">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/simcard/locked.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==13">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/simcard/elegant_stop.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==14">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/simcard/testing.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==15">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/simcard/ready.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==16">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/simcard/stopped.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==17">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/simcard/no_balance.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==18">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/simcard/offline.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==19">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/simcard/reboot.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==20">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/simcard/low_balance.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl if="runStatus==21">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/simcard/disabled.png" alt="sim card status detail"/>',	
		        '</tpl>',
		        '<tpl  if="runStatus &gt; 21 || runStatus < 0">',
		        '<img height=40 width=65 src="'+Ext.get('resources').value+'/images/simcard/null.png" alt="sim card status detail"/>',	
		        '</tpl>',
		       
		        
		        '</button>',
		        '<br/><span><i>SIM{portNo}</i></span></td>',
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
		var store = Ext.create('app.store.operation.domain.roamzone.site.nes.BkpInNeStore',{});
		this.store = store;
		var bkpGrid=Ext.create('Ext.view.View', {
//			id:'bkpTabGrid',
		    store: this.store,
		    tpl: imageTpl,
		    autoScroll:true,
		    itemSelector: 'div.thumb-wrap',
		    emptyText: 'No Port Status available',
		    
// renderTo: Ext.getBody()
		});
		 window.linkBkp = function(uuid,simUuid,domainUuid,alias) {
				var tabpanel = bkpGrid.up('panel').up('panel');
				var maintenance = bkpGrid.up('panel').maintenance;
				var prefix = 'BkpInNe_';
				if(maintenance){
					prefix = 'maintenance_'+prefix;
				}
				var id=prefix+"bkpUuid_"+uuid;
				var tipId = prefix+'bkpTipId_'+uuid;
				var tab = Ext.getCmp(id);
				var params = {params : {uuid:uuid}};
				if(tab==undefined){
					tab = Ext.create('app.view.module.BkpInfoPanel',{
						id:id,
						tipId:tipId,
						params:params,
						prefix:prefix,
					});
					lanControll.setLan(tab);
					tabpanel.add(tab);
					
				}
				tab.store.load(params);
				tab.show();
		 }
			 
		
		this.items = [ bkpGrid ];
				
		this.callParent(arguments);		
	
}

});