//var sim15Store=Ext.create('app.store.monitor.PmdSim15Store',{});
Ext.define('app.view.monitor.group.sim.Sim15Grid', {
		extend:'Ext.grid.Panel', 
		columnLines:true,
//		id:'sim15Grid',
//		store:{},
		title:ti15MinList,
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
					{header: 'serialNo',ulan:'snAbbr',dataIndex: 'serialNo',width:60,hidden:true },
					{header: 'generateTime',dataIndex: 'generateTime',width:120,				
						renderer: function(value,metaData,record,rowIndex,store,view){
	    	 				return rs.timeFormat(value);
			    	}},
					{header: 'simSwitchCount',dataIndex: 'simSwitchCount',width:120},
					{header: 'regErrorCount', dataIndex: 'regErrorCount',width:120},
					{header: 'oprErrorOnce', dataIndex: 'oprErrorOnce',width:120},
//					{header: 'pktCountOnce', dataIndex: 'pktCountOnce',width:120},
//					{header: 'pktRetriesOnce',dataIndex: 'pktRetriesOnce',width:120},
//					{header: 'pktLossOnce',dataIndex: 'pktLossOnce',width:120},
					{header: 'oprErrorAll', dataIndex: 'oprErrorAll',width:120},
//					{header: 'pktCountAll',dataIndex: 'pktCountAll',width:120},
//					{header: 'pktRetriesAll',dataIndex: 'pktRetriesAll',width:120},
//					{header: 'pktLossAll',dataIndex: 'pktLossAll',width:120},
					{header: 'minSignalVal',dataIndex: 'minSignalVal',hidden:true},
					{header: 'curSignalVal',dataIndex: 'curSignalVal',width:120},
			        {header: 'maxSignalVal', dataIndex: 'maxSignalVal',hidden:true},
			        {header: 'minBerVal', dataIndex: 'minBerVal',hidden:true},
			        {header: 'curBerVal', dataIndex: 'curBerVal',width:120},
			        {header: 'maxBerVal', dataIndex: 'maxBerVal',hidden:true},
			        {header: 'minRoundDelay', dataIndex: 'minRoundDelay',hidden:true},
			        {header: 'curRoundDelay', dataIndex: 'curRoundDelay',width:120,hidden:true},
			        {header: 'maxRoundDelay', dataIndex: 'maxRoundDelay',hidden:true},
			        {header: 'callTimeOnce', dataIndex: 'callTimeOnce',width:120},
			        {header: 'callTimeDay', dataIndex: 'callTimeDay',width:120},
			        {header: 'callTimeMonth', dataIndex: 'callTimeMonth',width:120},
			        {header: 'callTimeAll', dataIndex: 'callTimeAll',width:120},
			        {header: 'callInTimeAll', dataIndex: 'callInTimeAll',hidden:true},
			        {header: 'callOutTimeAll', dataIndex: 'callOutTimeAll',hidden:true},
			        {header: 'callCountDay', dataIndex: 'callCountDay',hidden:true},
			        {header: 'callCountMonth', dataIndex: 'callCountMonth',hidden:true},
			        {header: 'callCountAll', dataIndex: 'callCountAll',width:120},
			        {header: 'callCountOnce', dataIndex: 'callCountOnce',width:120},
			        {header: 'callFailCount', dataIndex: 'callFailCount',width:120},
			        {header: 'callShortCount', dataIndex: 'callShortCount',width:120},
			        {header: 'callNormalCount', dataIndex: 'callNormalCount',width:120},
			        {header: 'callSuccRate', dataIndex: 'callSuccRate',ulan:'asrAbbr',width:120},
			        {header: 'smsCountOnce', dataIndex: 'smsCountOnce',width:120},
			        {header: 'smsCountDay', dataIndex: 'smsCountDay',width:120},
			        {header: 'smsCountMonth', dataIndex: 'smsCountMonth',width:120},
			        {header: 'smsCountAll', dataIndex: 'smsCountAll',width:120},
			        {header: 'smsInCount', dataIndex: 'smsInCount',hidden:true},
			        {header: 'smsOutCount', dataIndex: 'smsOutCount',hidden:true},
			        {header: 'smsFailCount', dataIndex: 'smsFailCount',width:120},
			        {header: 'smsSuccRate', dataIndex: 'smsSuccRate',width:120},
			        {header: 'ussdCountOnce', dataIndex: 'ussdCountOnce',width:120},
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
//					var simUuid=Ext.getCmp('sim15Grid').treeName;	
//					
//					Ext.MessageBox.confirm(boxWarnning,boxExport,function(e) { 																				
//   						if( e == 'yes' )
//   						{
//   							Ext.Ajax.request({
//		                		url:'pmdSim15Manager!exportPmSim15.action?simUuid='+simUuid,
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
//							var simUuid=Ext.getCmp('sim15Grid').treeName;	
//							Ext.getCmp('sim15Grid').getStore().load();
//		       	 		}
//		       	 	}
//	       	 }]
//		},
		{
			itemId:'pagingtoolbar',
			name:'pageName',
		     dock: 'bottom',
			 xtype: 'pagingtoolbar',
//		     store: {},
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
	                	var panel = this.up('panel');
						var uuid=panel.treeName;
						var params;
						if(panel.id.substr(0,3) == "bkp"){
							params = {bkpUuid:uuid};
						}else if(panel.id.substr(0,3) == "sim"){
							params = {simUuid:uuid};
						}
						Ext.MessageBox.confirm(boxWarnning,boxExport,function(e) { 																				
	   						if( e == 'yes' )
	   						{
	   							Ext.Ajax.request({
			                		url:'pmdSim15Manager!exportPmSim15.action',
			                		method:'POST',
			                		params:params,
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
//
//		initComponent: function(){
//			var sim15Store=Ext.create('app.store.monitor.PmdSim15Store',{});
//			this.store = sim15Store;
//		}
			
});