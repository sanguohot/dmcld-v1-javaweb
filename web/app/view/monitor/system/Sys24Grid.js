var sys24Store=Ext.create('app.store.monitor.PmdSys24Store',{});
Ext.define('app.view.monitor.system.Sys24Grid', {
		extend:'Ext.grid.Panel', 
		columnLines:true,
		id:'sys24Grid',
		store:sys24Store,
		title:ti24HourList,
		border:false,
		treeName:'',
		autoScroll:true,
		viewConfig: {
			loadMask:{
				msg:lanControll.getLanValue('maskMsg')
			},
			enableTextSelection: true
  		},
		columns: [
			{header: 'serialNo',ulan:'snAbbr',dataIndex: 'serialNo',width:60,hidden:true},
			{header: 'generateTime',dataIndex: 'generateTime',width:120,				
				renderer: function(value,metaData,record,rowIndex,store,view){
    	 			return rs.timeFormat(value);
	    	}},
			{header: 'sysRunTimelen',dataIndex: 'sysRunTimelen',
	    		renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
				return rs.tranSecondMin(value,null);
			}},
			{header: 'sysLoadVal', dataIndex: 'sysLoadVal'},
			{header: 'dbReqCnt', dataIndex: 'dbReqCnt'},
			{header: 'dbFailCnt', dataIndex: 'dbFailCnt'},
			{header: 'curCpuIdle',dataIndex: 'curCpuIdle'},
			{header: 'minCpuIdle',dataIndex: 'minCpuIdle'},
			{header: 'maxCpuIdle', dataIndex: 'maxCpuIdle'},
			{header: 'curMemFree', dataIndex: 'curMemFree'},
			{header: 'minMemFree', dataIndex: 'minMemFree'},
			{header: 'maxMemFree', dataIndex: 'maxMemFree'},
			{header: 'curDiskFree', dataIndex: 'curDiskFree'},
			{header: 'recvPktCnt', dataIndex: 'recvPktCnt'},
			{header: 'sendPktCnt', dataIndex: 'sendPktCnt'},
			{header: 'recvBytesCnt', dataIndex: 'recvBytesCnt'},
			{header: 'sendBytesCnt', dataIndex: 'sendBytesCnt'}
		],
		dockedItems : [
//		               {
//			xtype: 'toolbar',
//			dock: 'bottom',
//			items:[{
//	       		 xtype:'button',
//	       		 text:'Export',
//	       		 iconCls:'export',
//	       		 listeners:{
//	       		 	click:function(){
//					var sysUuid=Ext.getCmp('sys24Grid').treeName;	
//					
//					Ext.MessageBox.confirm(boxWarnning,boxExport,function(e) { 																				
//   						if( e == 'yes' )
//   						{
//   							Ext.Ajax.request({
//		                		url:'pmdSys24Manager!exportPmdSys24.action?sysUuid='+sysUuid,
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
//							var domainUuid=Ext.getCmp('sys24Grid').treeName;	
//							Ext.getCmp('sys24Grid').getStore().load();
//		       	 		}
//		       	 	}
//	       	 }]
//		},
		{

		     dock: 'bottom',
			 xtype: 'pagingtoolbar',
		     store: sys24Store ,
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
					var sysUuid=Ext.getCmp('sys24Grid').treeName;	
					
					Ext.MessageBox.confirm(boxWarnning,boxExport,function(e) { 																				
   						if( e == 'yes' )
   						{
   							Ext.Ajax.request({
		                		url:'pmdSys24Manager!exportPmdSys24.action?sysUuid='+sysUuid,
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
		}]
			
});