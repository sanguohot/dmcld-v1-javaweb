
//var simCdrStore=Ext.create('app.store.monitor.SimCdrStore',{});
Ext.define('app.view.monitor.group.sim.SimCdrGrid', {
		extend:'Ext.grid.Panel', 
		columnLines:true,
		border:false,
		treeName:'',
		autoScroll:false,
		viewConfig: {
			loadMask:{
				msg:lanControll.getLanValue('maskMsg')
			},
			enableTextSelection: true
  		},
		columns: [
			{header: 'callSn',ulan:'snAbbr',dataIndex: 'callSn',width:120},
			{header: 'callIndex',dataIndex: 'callIndex',width:120,hidden:true},
			{header: 'alias',dataIndex: 'alias',width:120},
			{header: 'callNumber',dataIndex: 'callNumber',width:120},
			{header: 'callDirection',dataIndex: 'callDirection',width:120,
				renderer:function(val){  
					return rs.callDirection(val);
				}
			},
			{header: 'callerNumber',dataIndex: 'callerNumber',width:120},
			{header: 'srcIp',dataIndex: 'srcIp',width:120},
			{header: 'hangupSide',dataIndex: 'hangupSide',width:120,hidden:true,
				renderer:function(val){  
					return rs.hangupSide(val);
				}
			},
			{header: 'endReason',dataIndex: 'endReason',width:120,hidden:true,
				renderer:function(val){  
					return rs.endReason(val);
				}
			},
			{header: 'startTime',dataIndex: 'startTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120},
			{header: 'pddTimelen',dataIndex: 'pddTimelen',width:120},
			{header: 'duration',dataIndex: 'duration',width:120},
			{header: 'billingSec',dataIndex: 'billingSec',width:120},
			{header: 'gsmCode',dataIndex: 'gsmCode',width:240,
				renderer:function(val){  
					return rs.gsmCode(val);
				}
			},
			{header: 'callStatus',dataIndex: 'callStatus',width:120,
				renderer:function(val){  
					return rs.callStatus(val);
				}
			},
			{header: 'callResult',dataIndex: 'callResult',width:120,
				renderer:function(val){  
					return rs.smsUssdCallResult(val);
				}
			},
			{header: 'cdrFlag',dataIndex: 'cdrFlag',width:120,
				renderer:function(val){  
					return rs.cdrFlag(val);
				}
			},
			{header: 'activeTime',dataIndex: 'activeTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,hidden:true},
			{header: 'resultTime',xtype: 'datecolumn',dataIndex: 'resultTime',width:120,format:'Y-m-d H:i:s',hidden:true},
			
			{header: 'domainUuid',dataIndex: 'domainUuid',width:60,hidden:true},
			{header: 'gwpUuid',dataIndex: 'gwpUuid',width:120,hidden:true},
			{header: 'simUuid',dataIndex: 'simUuid',width:120,hidden:true},
		],
		
		dockedItems : [
		{
			itemId:'pagingtoolbar',
		     dock: 'bottom',
			 xtype: 'pagingtoolbar',
//		     store: simCdrStore ,
		     pageSize: 10,
		     limit:10,
		     displayInfo: true,
		     items:['-',{
	       		 xtype:'button',
	       		 text:'Export',
	       		ulan:'btExport',
	       		 iconCls:'export',
	       		 listeners:{
	       		 	click:function(){
//					var domainUuid=this.up('panel').treeName;
		    	 	var values=this.up('tabpanel').down('form[itemId=searchForm]').getForm().getValues();
					var simUuid = this.up('pagingtoolbar').store.getAt(0).get('simUuid');
					Ext.MessageBox.confirm(boxWarnning,boxExport,function(e) { 																				
   						if( e == 'yes' )
   						{
   							Ext.Ajax.request({
		                		url:'cdrManager!exportSimCdr.action?simUuid='+simUuid,
		                		method:'POST',
		                		timeout:10*60*1000,
		                		params:values,
		                		callback: function (options, success, response) {
   									var obj=Ext.JSON.decode(response.responseText);
			                    	if(obj["success"]){
			                    		window.location.href="download/"+obj["fileName"];
			                    	}else{
			                    		Ext.MessageBox.alert(boxFailture,boxExportFail);
			                    	}
		                    	}
		                	})
						}
						})
	       		
	       	 		}
	       	 	}
	       	 
	       	 }]
		}]
			
});