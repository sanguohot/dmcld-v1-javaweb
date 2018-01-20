
var gwpUssdStore=Ext.create('app.store.monitor.GwpUssdStore',{});
Ext.define('app.view.monitor.domain.zone.port.GwpUssdGrid', {
		extend:'Ext.grid.Panel', 
		columnLines:true,
		id:'gwpUssdGrid',
		store:gwpUssdStore,
		title:lanControll.getLanValue('tiUssdList'),
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
		          	{header: 'ussdSn',dataIndex: 'ussdSn',ulan:'snAbbr',width:120},
					{header: 'alias',dataIndex: 'alias',width:120},
					{header: 'content',dataIndex: 'content',flex:1,minWidth:120},
					{header: 'ussdDirection',dataIndex: 'ussdDirection',width:120,
						renderer:function(val){  
							return rs.ussdDirection(val);
						}
					},
					{header: 'ussdTime',dataIndex: 'ussdTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120},
					{header: 'ussdParam',dataIndex: 'ussdParam',width:120,
						renderer:function(val){  
							return rs.ussdParam(val);
						}
					},
					{header: 'ussdStatus',dataIndex: 'ussdStatus',width:120,
						renderer:function(val){  
							return rs.ussdStatus(val);
						}
					},
					{header: 'ussdResult',dataIndex: 'ussdResult',width:120,
						renderer:function(val){  
							return rs.smsUssdCallResult(val);
						}
					},
					{header: 'resultTime',dataIndex: 'resultTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,hidden:true},
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
//					var gwpUuid=Ext.getCmp('gwpUssdGrid').treeName;	
//					
//					Ext.MessageBox.confirm(boxWarnning,boxExport,function(e) { 																				
//   						if( e == 'yes' )
//   						{
//   							Ext.Ajax.request({
//		                		url:'ussdManager!exportGwpUssd.action?gwpUuid='+gwpUuid,
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
//							var gwpUuid=Ext.getCmp('gwpUssdGrid').treeName;	
//							Ext.getCmp('gwpUssdGrid').getStore().load();
//		       	 		}
//		       	 	}
//	       	 }]
//		},
		{

		     dock: 'bottom',
			 xtype: 'pagingtoolbar',
		     store: gwpUssdStore ,
		     pageSize: 10,
		     limit:10,
		     displayInfo: true,
		     items:[
	                '-', {
		       		 xtype:'button',
		       		 text:'Export',
		       		 ulan:'btExport',
		       		 iconCls:'export',
		       		 listeners:{
		       		 	click:function(){
						var gwpUuid=Ext.getCmp('gwpUssdGrid').treeName;	
						
						Ext.MessageBox.confirm(boxWarnning,boxExport,function(e) { 																				
	   						if( e == 'yes' )
	   						{
	   							Ext.Ajax.request({
			                		url:'ussdManager!exportGwpUssd.action?gwpUuid='+gwpUuid,
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