Ext.define('app.view.operation.domain.roamzone.site.nes.TgpTab', {
    extend: 'Ext.form.Panel',
	require:[
                 'Ext.data.*',
                 'Ext.util.*',
                 'Ext.view.View',
                 'Ext.XTemplate',
                 'Ext.panel.Panel',
             ],
	
	title:lanControll.getLanValue('tiE1Map'),
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
		var store=Ext.create('app.store.operation.domain.roamzone.site.nes.TgpInNeStore',{});
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
				'<p>&nbsp;</p>',
				
				'<table align="center" border="0">',
				'<tr align="center" style="border:#999 1px dashed;">',
				
				'<tpl for=".">',
				
				'<tpl if="( slaveType !=0 && slaveE1No==0) ">',
					
					'<tpl if="xindex%8==0 && (slaveType!=0 && slaveE1No==0)">',
						'<td style="border-right:#999 1px dashed;"><div style="width: 21px;height: 21px;"></div></td>',
						 '</tr>',
						 '<tr colspan="8"><td height="10px"></td></tr>',
							'<tr align="center" style="border:#999 1px dashed;">',
					'</tpl>',
					'<tpl if="xindex%8==7 && (slaveType!=0 && slaveE1No==0)">',
						'<td><div style="width: 21px;height: 21px;"></div></td>',
						'<td style="border-right:#999 1px dashed;"><div style="width: 21px;height: 21px;"></div></td>',
						 '</tr>',
						 '<tr colspan="8"><td height="10px"></td></tr>',
							'<tr align="center" style="border:#999 1px dashed;">',
					'</tpl>',
					'<tpl if="xindex%8==6 && (slaveType!=0 && slaveE1No==0)">',
						'<td><div style="width: 21px;height: 21px;"></div></td>',
						'<td><div style="width: 21px;height: 21px;"></div></td>',
						'<td style="border-right:#999 1px dashed;"><div style="width: 21px;height: 21px;"></div></td>',
						 '</tr>',
						 '<tr colspan="8"><td height="10px"></td></tr>',
							'<tr align="center" style="border:#999 1px dashed;">',
					'</tpl>',
					'<tpl if="xindex%8==5 && (slaveType!=0 && slaveE1No==0)">',
						'<td><div style="width: 21px;height: 21px;"></div></td>',
						'<td><div style="width: 21px;height: 21px;"></div></td>',
						'<td><div style="width: 21px;height: 21px;"></div></td>',
						'<td style="border-right:#999 1px dashed;"><div style="width: 21px;height: 21px;"></div></td>',
						 '</tr>',
						 '<tr colspan="8"><td height="10px"></td></tr>',
							'<tr align="center" style="border:#999 1px dashed;">',
					'</tpl>',
					'<tpl if="xindex%8==4 && (slaveType!=0 && slaveE1No==0)">',
						'<td><div style="width: 21px;height: 21px;"></div></td>',
						'<td><div style="width: 21px;height: 21px;"></div></td>',
						'<td><div style="width: 21px;height: 21px;"></div></td>',
						'<td><div style="width: 21px;height: 21px;"></div></td>',
						'<td style="border-right:#999 1px dashed;"><div style="width: 21px;height: 21px;"></div></td>',
						 '</tr>',
						 '<tr colspan="8"><td height="10px"></td></tr>',
							'<tr align="center" style="border:#999 1px dashed;">',
					'</tpl>',
					'<tpl if="xindex%8==3 && (slaveType!=0 && slaveE1No==0)">',
						'<td><div style="width: 21px;height: 21px;"></div></td>',
						'<td><div style="width: 21px;height: 21px;"></div></td>',
						'<td><div style="width: 21px;height: 21px;"></div></td>',
						'<td><div style="width: 21px;height: 21px;"></div></td>',
						'<td><div style="width: 21px;height: 21px;"></div></td>',
						'<td style="border-right:#999 1px dashed;"><div style="width: 21px;height: 21px;"></div></td>',
						 '</tr>',
						 '<tr colspan="8"><td height="10px"></td></tr>',
							'<tr align="center" style="border:#999 1px dashed;">',
					'</tpl>',
					'<tpl if="xindex%8==2 && (slaveType!=0 && slaveE1No==0)">',
						'<td><div style="width: 21px;height: 21px;"></div></td>',
						'<td><div style="width: 21px;height: 21px;"></div></td>',
						'<td><div style="width: 21px;height: 21px;"></div></td>',
						'<td><div style="width: 21px;height: 21px;"></div></td>',
						'<td><div style="width: 21px;height: 21px;"></div></td>',
						'<td><div style="width: 21px;height: 21px;"></div></td>',
						'<td style="border-right:#999 1px dashed;"><div style="width: 21px;height: 21px;"></div></td>',
						 '</tr>',
						 '<tr colspan="8"><td height="10px"></td></tr>',
							'<tr align="center" style="border:#999 1px dashed;">',
					'</tpl>',
				'</tpl>',
				
				'<td align="center" width="60px" height="50px"><div ',
				
				'<tpl if="runStatus== 0 || runStatus== 5 || runStatus==6 || runStatus==7 || runStatus==9">',
					'class="tgp_disabled" ',
				'</tpl>',
				'<tpl if="runStatus== 3">',
					'class="tgp_actived" ',
				'</tpl>',
				'<tpl if="runStatus== 4">',
					'class="tgp_los" ',
				'</tpl>',
				'<tpl if="runStatus == 21">',
					'<tpl if="workState== 1">',
						'class="tgp_disabled" ',
					'</tpl>',
		        	'<tpl if="workState == 2">',
		        		'class="tgp_actived" ',
		        	'</tpl>',
		        	'<tpl if="workState == 3">',
		        		'class="tgp_los" ',
		        	'</tpl>',
		        	'<tpl if="workState == 4">',
		        		'class="tgp_rai" ',
		        	'</tpl>',
		        	'<tpl if="workState == 5">',
		        		'class="tgp_ais" ',
		        	'</tpl>',
		        	'<tpl if="workState == 6">',
		        		'class="tgp_idsn_ss7" ',
		        	'</tpl>',
		        	
		        	'<tpl if="workState &gt; 6 || workState &lt; 1">',
		    			'class="tgp_disabled" ',
		    		'</tpl>',
				'</tpl>',
				
				
        		
				'><img src="'+Ext.get('resources').value+'/images/tg/portstatus.gif"  onmouseover=moveTGPortOver("{runStatus}","{workState}","{slaveType}","{slaveTgNo}","{slaveIp}",event) onmouseout=moveOut()  ><br/>',
				
				'<tpl if="slaveType==0">',
					'</div>'+lanControll.getLanValue('port')+'{portNo}</td>',
				'</tpl>',
				'<tpl if="slaveType==1">',
					'</div>'+lanControll.getLanValue('master')+'{slaveTgNo}-{slaveE1No}</td>',
				'</tpl>',
				'<tpl if="slaveType==2">',
					'</div>'+lanControll.getLanValue('slave')+'{slaveTgNo}-{slaveE1No}</td>',
				'</tpl>',
				'<tpl if="slaveType &gt; 2 || slaveType &lt; 0">',
					'</div>'+lanControll.getLanValue('port')+'{slaveE1No}</td>',
				'</tpl>',
		
				
		        
				'<tpl if="xindex % 8 == 0 && slaveType==0 ">',
			        '<td style="border-right:#999 1px dashed;"></td></tr>',
			        '<tr colspan="8"><td height="10px"></td></tr>',
					'<tr align="center" style="border:#999 1px dashed;">',
				'</tpl>',
			    '</tpl>',
			    
			    '<td style="border-right:#999 1px dashed;"></td></tr><tr colspan="8"><td height="10px"></td></tr>',
			    
			    '</table>',
			    
				
				'<p>&nbsp;</p>',
				'<p>&nbsp;</p>',
				'<hr/>',
				'<table width="500px" align="center" cellpadding="0" cellspacing="0"><tbody><tr><td colspan="9" height="8px">&nbsp;</td></tr>',
				'<tr><td align="right">'+lanControll.getLanValue('example')+': &nbsp;&nbsp;&nbsp;</td>',
				'<td width="16px"><div style="background-color: #0F0; width: 18px; height: 18px"><img src="'+Ext.get('resources').value+'/images/tg/portstatus.gif" alt="Actived" width="18px" height="18px"></div></td>',
				'<td colspan="2">&nbsp;Actived</td>',
				'<td width="16px"><div style="background-color: #999; width: 18px; height: 18px"><img src="'+Ext.get('resources').value+'/images/tg/portstatus.gif" alt="Disable" width="18px" height="18px"></div></td>',
				'<td colspan="2">&nbsp;Disable</td>',
				'<td width="16px"><div style="background-color: #F00; width: 18px; height: 18px"><img src="'+Ext.get('resources').value+'/images/tg/portstatus.gif" alt="LOS Alarm" width="18px" height="18px"></div></td>',
				'<td colspan="2">&nbsp;LOS Alarm</td>',
				'</tr>',
				'<tr>',
				'<td>&nbsp;</td>',
				'<td width="16px"><div style="background-color: #FF0; width: 18px; height: 18px"><img src="'+Ext.get('resources').value+'/images/tg/portstatus.gif" alt="RAI Alarm" width="18px" height="18px"></div></td>',
				'<td colspan="2">&nbsp;RAI Alarm</td>',
				'<td width="16px"><div style="background-color: #00F; width: 18px; height: 18px"><img src="'+Ext.get('resources').value+'/images/tg/portstatus.gif" alt="AIS Alarm" width="18px"	height="18px"></div></td>',
				'<td colspan="2">&nbsp;AIS Alarm</td>',
				'<td width="16px"><div style="background-color: #F90; width: 18px; height: 18px"><img src="'+Ext.get('resources').value+'/images/tg/portstatus.gif" alt="ISDN/SS7 Signal Alarm" width="18px" height="18px"></div></td>',
				'<td colspan="2">&nbsp;ISDN/SS7 Signal Alarm</td></tr>',
				'<tr><td colspan="9" height="16px">&nbsp;</td></tr>',
				'</tbody></table>'
//			    '</div>'
		);
		
		var tgpGrid=Ext.create('Ext.view.View', {
		    store:this.store,
		    tpl: imageTpl,
		    autoScroll:true,
		    itemSelector: 'div.thumb-wrap',
		   
		    
// renderTo: Ext.getBody()
		});
		 window.linkTgp = function(tgpUuid,alias) {
				var tabpanel = tgpGrid.up('panel').up('panel');
				var prefix = moduleId+'_TgpInNe_';
				var id=prefix+"tgpUuid_"+tgpUuid;
				var tipId = prefix+'tgpTipId_'+tgpUuid;
				var tab = Ext.getCmp(id);
				var params = {params : {tgpUuid:tgpUuid}};
				if(tab==undefined){
					tab = Ext.create('app.view.module.TgpInfoPanel',{
						id:id,
						tipId:tipId,
						params:params,
						prefix:prefix,
						toolbars:toolbars,
						otiose:otiose
					});
					tabpanel.add(tab);
					
				}
				tab.store.load(params);
				tab.show();
		 }
			 
		
		this.items = [ tgpGrid ];
				
		this.callParent(arguments);		
	
	},
	listeners:{
		activate: function(tab){
			var grid=tab.down('panel');
			if(tab.forceRefresh==1){
				tab.forceRefresh=0;
				grid.store.load();
			}
		}
	}

});