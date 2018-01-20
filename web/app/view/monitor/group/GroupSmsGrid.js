
var groupSmsStore=Ext.create('app.store.monitor.GrpSmsStore',{});
Ext.define('app.view.monitor.group.GroupSmsGrid', {
		extend:'Ext.grid.Panel', 
		columnLines:true,
		id:'groupSmsGrid',
		store:groupSmsStore,
		title:tiSmsList,
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
			      	{header: 'smsSn',dataIndex: 'smsSn',ulan:'snAbbr',width:120},
					{header: 'alias',dataIndex: 'alias',width:120},	
					{header: 'content',dataIndex: 'content',flex:1,minWidth:120},
					{header: 'smsDirection',dataIndex: 'smsDirection',width:120,
						renderer:function(val){  
							return rs.smsDirection(val);
						}
					},
					{header: 'smsTime',dataIndex: 'smsTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120},
					{header: 'smsNumber',dataIndex: 'smsNumber',width:120},
					{header: 'smsStatus',dataIndex: 'smsStatus',width:120,
						renderer:function(val){  
							return rs.smsStatus(val);
						}
					},
					{header: 'smsResult',dataIndex: 'smsResult',width:120,
						renderer:function(val){  
							return rs.smsUssdCallResult(val);
						}
					},
					{header: 'smsReceipt',dataIndex: 'smsReceipt',width:120,hidden:true},
					{header: 'resultTime',dataIndex: 'resultTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,hidden:true},
					{header: 'receiptTime',dataIndex: 'receiptTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,hidden:true},
					{header: 'domainUuid',dataIndex: 'domainUuid',width:60,hidden:true},
					{header: 'gwpUuid',dataIndex: 'gwpUuid',width:120,hidden:true},
					{header: 'simUuid',dataIndex: 'simUuid',width:120,hidden:true},
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
//					var domainUuid=Ext.getCmp('groupSmsGrid').treeName;	
//					
//					Ext.MessageBox.confirm(boxWarnning,boxExport,function(e) { 																				
//   						if( e == 'yes' )
//   						{
//   							Ext.Ajax.request({
//		                		url:'smsManager!exportGroupSms.action?grpUuid='+domainUuid,
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
//							var domainUuid=Ext.getCmp('groupSmsGrid').treeName;	
//							Ext.getCmp('groupSmsGrid').getStore().load();
//		       	 		}
//		       	 	}
//	       	 }]
//		},
		{

		     dock: 'bottom',
			 xtype: 'pagingtoolbar',
		     store: groupSmsStore ,
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
					var domainUuid=Ext.getCmp('groupSmsGrid').treeName;	
					
					Ext.MessageBox.confirm(boxWarnning,boxExport,function(e) { 																				
   						if( e == 'yes' )
   						{
   							Ext.Ajax.request({
		                		url:'smsManager!exportGroupSms.action?grpUuid='+domainUuid,
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