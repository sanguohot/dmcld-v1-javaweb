
//var simUssdStore=Ext.create('app.store.monitor.SimUssdStore',{});
Ext.define('app.view.monitor.group.sim.SimUssdGrid', {
		extend:'Ext.grid.Panel', 
		columnLines:true,
//		id:'simUssdGrid',
//		store:simUssdStore,
		title:tiUssdList,
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
//					var simUuid=Ext.getCmp('simUssdGrid').treeName;	
//					
//					Ext.MessageBox.confirm(boxWarnning,boxExport,function(e) { 																				
//   						if( e == 'yes' )
//   						{
//   							Ext.Ajax.request({
//		                		url:'ussdManager!exportSimUssd.action?simUuid='+simUuid,
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
//							var simUuid=Ext.getCmp('simUssdGrid').treeName;	
//							Ext.getCmp('simUssdGrid').getStore().load();
//		       	 		}
//		       	 	}
//	       	 }]
//		},
		{
			itemId:'pagingtoolbar',
		     dock: 'bottom',
			 xtype: 'pagingtoolbar',
//		     store: simUssdStore ,
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
//					var simUuid=this.up('panel').treeName;	
					var simUuid = this.up('pagingtoolbar').store.getAt(0).get('simUuid');
					Ext.MessageBox.confirm(boxWarnning,boxExport,function(e) { 																				
   						if( e == 'yes' )
   						{
   							Ext.Ajax.request({
		                		url:'ussdManager!exportSimUssd.action?simUuid='+simUuid,
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