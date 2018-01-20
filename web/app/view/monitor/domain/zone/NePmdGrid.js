//var gw15Store=Ext.create('app.store.monitor.PmdGw15Store',{});
Ext.define('app.view.monitor.domain.zone.NePmdGrid', {
		extend:'Ext.grid.Panel', 
		columnLines:true,
//		title:ti15MinList,
		border:false,
		treeName:'',
		autoScroll:true,
		exportUrl:'',
		viewConfig: {
			loadMask:{
				msg:lanControll.getLanValue('maskMsg')
			},
			enableTextSelection: true
  		},
		dockedItems : [//		               {
//			xtype: 'toolbar',
//			dock: 'bottom',
//			items:[{
//	       		 xtype:'button',
//	       		 text:'Export',
//	       		 iconCls:'export',
//	       		 listeners:{
//	       		 	click:function(){
//					var gwUuid=Ext.getCmp('gw15Grid').treeName;	
//					
//					Ext.MessageBox.confirm(boxWarnning,boxExport,function(e) { 																				
//   						if( e == 'yes' )
//   						{
//   							Ext.Ajax.request({
//		                		url:'pmdGw15Manager!exportPmGw15.action?gwUuid='+gwUuid,
//		                		method:'POST',
//		                		callback: function (options, success, response) {
//   									var obj=Ext.JSON.decode(response.responseText);
//			                    	if(obj["success"]){
//			                    		window.location.href="download/"+obj["fileName"];
//			                    	}else{
//			                    		Ext.MessageBox.alert(boxFailture,boxExportFail);
//			                    	}
//		                    	}
//		                	})
//						}
//						})
//	       		
//	       	 		}
//	       	 	}
//	       	 
//	       	 },'-',{
//		       		 xtype:'button',
//		       		 text:'Refresh',
//		       		 iconCls:'refresh2',
//		       		 listeners:{
//		       		 	click:function(){
//							var gwUuid=Ext.getCmp('gw15Grid').treeName;	
//							Ext.getCmp('gw15Grid').getStore().load();
//		       	 		}
//		       	 	}
//	       	 }]
//		},
		{

		     dock: 'bottom',
			 xtype: 'pagingtoolbar',
//		     store: gw15Store ,
		     pageSize: 10,
		     limit:10,
		     displayInfo: true,
		     items:[
	                '-', {
		       		 xtype:'button',
		       		 text:'Export',
		       		 ulan:'btExport',
		       		 itemId:'export',
		       		 iconCls:'export',
		       		 listeners:{
		       		 	click:function(){
						var neUuids=this.up('panel').treeName;	
						var url = this.up('panel').exportUrl;
						Ext.MessageBox.confirm(boxWarnning,boxExport,function(e) { 																				
	   						if( e == 'yes' )
	   						{
	   							Ext.Ajax.request({
//			                		url:'pmdGw15Manager!exportPmGw15.action?gwUuid='+gwUuid,
	   								url:url+'?neUuids='+neUuids,
			                		method:'POST',
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
		}],
		createColumns:function(){
  			var columns = [
	          	{header: 'uuid',dataIndex: 'uuid',width:60 ,hidden:true},
	          	{header: 'Device Uuid',dataIndex: 'neUuid',width:60 ,hidden:true},
	          	{header: 'Rec Status',dataIndex: 'recStatus',width:100 ,hidden:true},
				{header: 'Serial No',ulan:'snAbbr',dataIndex: 'serialNo',flex:1 ,hidden:true},
				{header: 'Generate Time',dataIndex: 'generateTime',width:135,				
					renderer: function(value,metaData,record,rowIndex,store,view){
 	 				return rs.timeFormat(value);
		    	}},
//				{header: 'Domain Uuid',dataIndex: 'domainUuid',width:60 ,hidden:true},
				{header: 'Reg Fail Cnt',dataIndex: 'neRegFailCnt',width:100 },
				{header: 'Run Time',dataIndex: 'neRunTimelen',width:100,
					renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
					return rs.tranSecondMin(value,null);
				}},
				{header: 'SysUp Time',dataIndex: 'sysUpTimelen',width:100,hidden:true,
					renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
					return rs.tranSecondMin(value,null);
				}},
				{header: 'Recv Pkt Cnt',dataIndex: 'recvPktCnt',width:100},
				{header: 'Send Pkt Cnt',dataIndex: 'sendPktCnt',width:100},
				{header: 'Recv Loss Cnt',dataIndex: 'recvLossCnt',width:100},
				{header: 'Send Loss Cnt',dataIndex: 'sendLossCnt',width:100},
				{header: 'Recv Timeout Cnt',dataIndex: 'recvTimeoutCnt',width:100},
				{header: 'Send Timeout Cnt',dataIndex: 'sendTimeoutCnt',width:100},
				{header: 'Cur Ping Delay',dataIndex: 'curPingDelayMs',width:100},
				{header: 'Min Ping Delay',dataIndex: 'minPingDelayMs',width:100},
				{header: 'Max Ping Delay',dataIndex: 'maxPingDelayMs',width:100},
				
				{header: 'flashRdFailCount',dataIndex: 'flashRdFailCount',width:110},
				{header: 'flashWtFailCount',dataIndex: 'flashWtFailCount',width:110},
				{header: 'memAllocFailCount',dataIndex: 'memAllocFailCount',width:110}
				];
  			if(this.id.indexOf('ag_')<0){
			columns.push({header: 'totalCallCount',dataIndex: 'totalCallCount',ulan:'totalCallCntAbbr',width:110});
			columns.push({header: 'curCallCount',dataIndex: 'curCallCount',width:110});
  			}
  			columns.push({header: 'curCpuUsage',dataIndex: 'curCpuUsage',width:110})
			columns.push({header: 'ASR',dataIndex: 'asr',width:110})
			columns.push({header: 'ACD',dataIndex: 'acd',width:110})
			return columns;
  		},
  		initComponent:function(){
  			this.columns = this.createColumns();
  			this.callParent(arguments);	
  		}
			
});