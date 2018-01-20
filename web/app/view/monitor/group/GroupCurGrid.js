//var grpCurStore=Ext.create('app.store.monitor.PmdGrpCurStore',{});
Ext.define('app.view.monitor.group.GroupCurGrid', {
		extend:'Ext.grid.Panel', 
		columnLines:true,
//		id:'groupCurGrid',
//		store:grpCurStore,
		title:tiCurList,
		border:false,
		treeName:'',
		domainUuid:'',
		autoScroll:true,
		viewConfig: {
			loadMask:{
				msg:lanControll.getLanValue('maskMsg')
			},
			enableTextSelection: true
  		},
		columns: [
					{header: 'serialNo',ulan:'snAbbr',dataIndex: 'serialNo',width:60 ,hidden:true},
					{header: 'grpName',dataIndex: 'grpName',width:120},
					{header: 'generateTime',dataIndex: 'generateTime',width:120,				
						renderer: function(value,metaData,record,rowIndex,store,view){
	    	 				return rs.timeFormat(value);
			    	}},
					{header: 'simSwitchCount',dataIndex: 'simSwitchCount',width:120},
//					{header: 'regErrorCount', dataIndex: 'regErrorCount',width:120},
//					{header: 'modOprErrorOnce', dataIndex: 'modOprErrorOnce',width:120},
//					{header: 'modPktCountOnce', dataIndex: 'modPktCountOnce',width:120},
//					{header: 'modPktRetriesOnce',dataIndex: 'modPktRetriesOnce',width:120},
//					{header: 'modPktTimeoutOnce',dataIndex: 'modPktTimeoutOnce',width:120},
					{header: 'oprErrorAll', dataIndex: 'oprErrorAll',width:120},
//					{header: 'pktCountAll',dataIndex: 'pktCountAll',width:120},
//					{header: 'pktRetriesAll',dataIndex: 'pktRetriesAll',width:120},
//					{header: 'pktLossAll',dataIndex: 'pktLossAll',width:120},
//					{header: 'modSignalMin',dataIndex: 'modSignalMin',hidden:true},
//					{header: 'modSignalCur',dataIndex: 'modSignalCur',hidden:true},
//			        {header: 'modSignalMax', dataIndex: 'modSignalMax',hidden:true},
//			        {header: 'modBerMin', dataIndex: 'modBerMin',hidden:true},
//			        {header: 'modBerCur', dataIndex: 'modBerCur',hidden:true},
//			        {header: 'modBerMax', dataIndex: 'modBerMax',hidden:true},
//			        {header: 'modRoundDelayMin', dataIndex: 'modRoundDelayMin',hidden:true},
//			        {header: 'modRoundDelayCur', dataIndex: 'modRoundDelayCur',hidden:true},
//			        {header: 'modRoundDelayMax', dataIndex: 'modRoundDelayMax',hidden:true},
//			        {header: 'callTimeOnce', dataIndex: 'callTimeOnce',hidden:true},
			        {header: 'callTimeDay', dataIndex: 'callTimeDay',width:120},
			        {header: 'callTimeMonth', dataIndex: 'callTimeMonth',width:120},
			        {header: 'callTimeAll', dataIndex: 'callTimeAll',width:120},
			        {header: 'callInTimeAll', dataIndex: 'callInTimeAll',hidden:true},
			        {header: 'callOutTimeAll', dataIndex: 'callOutTimeAll',hidden:true},
			        {header: 'callCountDay', dataIndex: 'callCountDay',hidden:true},
			        {header: 'callCountMonth', dataIndex: 'callCountMonth',hidden:true},
			        {header: 'callCountAll', dataIndex: 'callCountAll',width:120},
			        {header: 'callFailCount', dataIndex: 'callFailCount',width:120},
			        {header: 'callShortCount', dataIndex: 'callShortCount',width:120},
			        {header: 'callNormalCount', dataIndex: 'callNormalCount',width:120},
			        {header: 'callSuccRate', dataIndex: 'callSuccRate',ulan:'asrAbbr',width:120},
//			        {header: 'smsCountOnce', dataIndex: 'smsCountOnce',width:120},
			        {header: 'smsCountDay', dataIndex: 'smsCountDay',width:120},
			        {header: 'smsCountMonth', dataIndex: 'smsCountMonth',width:120},
			        {header: 'smsCountAll', dataIndex: 'smsCountAll',width:120},
			        {header: 'smsInCount', dataIndex: 'smsInCount',hidden:true},
			        {header: 'smsOutCount', dataIndex: 'smsOutCount',hidden:true},
			        {header: 'smsFailCount', dataIndex: 'smsFailCount',width:120},
			        {header: 'smsSuccRate', dataIndex: 'smsSuccRate',width:120},
			        {header: 'ussdCountDay', dataIndex: 'ussdCountDay',width:120},
			        {header: 'ussdCountMonth', dataIndex: 'ussdCountMonth',width:120},
			        {header: 'ussdCountAll', dataIndex: 'ussdCountAll',width:120},
			        {header: 'ussdInCount', dataIndex: 'ussdInCount',width:120},
			        {header: 'ussdOutCount', dataIndex: 'ussdOutCount',width:120},
			        {header: 'ussdFailCount', dataIndex: 'ussdFailCount',width:120},
			        {header: 'ussdSuccRate', dataIndex: 'ussdSuccRate',width:120},
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
//					var groupUuid=Ext.getCmp('groupCurGrid').treeName;	
//					var domainUuid=Ext.getCmp('groupCurGrid').domainUuid;	
//					
//					Ext.MessageBox.confirm(boxWarnning,boxExport,function(e) { 																				
//   						if( e == 'yes' )
//   						{
//   							Ext.Ajax.request({
//		                		url:'pmdGrpCurManager!exportPmGrpCur.action?groupUuid='+groupUuid+"&domainUuid="+domainUuid,
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
//							var groupUuid=Ext.getCmp('groupCurGrid').treeName;	
//							Ext.getCmp('groupCurGrid').getStore().load();
//		       	 		}
//		       	 	}
//	       	 }]
//		},
		{

		     dock: 'bottom',
			 xtype: 'pagingtoolbar',
//		     store: grpCurStore ,
		     pageSize: 10,
		     limit:10,
		     displayInfo: true,
		     items:['-',{
	       		 xtype:'button',
	       		 text:'Export',
	       		ulan:'btExport',
	       		 itemId:'export',
	       		 iconCls:'export',
	       		 listeners:{
	       		 	click:function(){
					var groupUuid=this.up("panel").treeName;	
					var domainUuid=this.up("panel").domainUuid;	
					
					Ext.MessageBox.confirm(boxWarnning,boxExport,function(e) { 																				
   						if( e == 'yes' )
   						{
   							Ext.Ajax.request({
		                		url:'pmdGrpCurManager!exportPmGrpCur.action?groupUuids='+groupUuid+"&domainUuid="+domainUuid,
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