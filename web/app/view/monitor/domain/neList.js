Ext.define('app.view.monitor.domain.neList', {
		extend:'Ext.grid.Panel', 
		columnLines:true,
//		id:'domain15Grid',
		store:null,
		itemId:"grid",
//		title:'Device List',
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
			{header: 'domainUuid',dataIndex: 'domainUuid',width:60,hidden:true},
			{header: 'neUuid',dataIndex: 'neUuid',width:60,hidden:true},
			{header: 'deviceUuid',dataIndex: 'deviceUuid',width:60,hidden:true},
			{header: 'SN',dataIndex: 'productSnStr',ulan:'snAbbr',width:165},
			{header: 'Alias',dataIndex: 'name'},
			{header: 'Admin Status', dataIndex: 'adminStatus',hidden:true,
				renderer:function(val){  
					return rs.adminStatus(val);
				 }
			},
			{header: 'Run Status', dataIndex: 'runStatus',hidden:true,
				renderer:function(val){  
					return rs.runStatus(val);
				} 
			},
			{header: 'Type', dataIndex: 'productName'},
//			{header: 'Run Time', dataIndex: 'runTimeLen',width:120},
	     	{header: 'RunTime',dataIndex: 'lifeSecond',
	     		renderer:function(val,metaData,record,rowIndex,store,view){
     				return rs.tranSecondMin(val,record.get('runStatus'));
     			}
	     	},
			{header: 'Max Ping Delay', dataIndex: 'maxPingDelay',hidden:true},
	    	{header: 'ACD',dataIndex: 'acd',width:100,
	    		renderer: function(value,metaData,record,rowIndex,store,view){					
//	 			return "<div class='"+"asr_style_"+rowIndex+"'></div>";
	    		var productId = record.get('productId');
	    		if(productId==20
						||productId==21
						||productId==22
						||productId==23){
//						return "<div class='monitor_domain_"+rowIndex+"'></div>";
	    			return value;
				}else{
					return "NULL";
				}	
			}},
			{header: 'ASR/Usage', dataIndex: 'chart',width:120,
				renderer: function(value,metaData,record,rowIndex,store,view){					
	//	 			return "<div class='"+"rate_style_"+rowIndex+"'></div>";
				var productId = record.get('productId');
				if(productId==20
					||productId==21
					||productId==22
					||productId==23){
					return "<img src='picture/all/"+record.get("neUuid")+".png'>";
				}else{
					return "NULL";
				}
	    	}},
//			{header: 'Usage', dataIndex: 'rate',width:120,
//				renderer: function(value,metaData,record,rowIndex,store,view){					
////    	 			return "<div class='"+"rate_style_"+rowIndex+"'></div>";
//				var productId = record.get('productId');
//				if(productId==20
//					||productId==21
//					||productId==22
//					||productId==23){
//					return "<img src='picture/rate/"+record.get("neUuid")+".png'>";
//				}else{
//					return "NULL";
//				}
//	    	}},
//			{header: 'ASR',dataIndex: 'asr',width:120,
//	    		renderer: function(value,metaData,record,rowIndex,store,view){					
////    	 			return "<div class='"+"asr_style_"+rowIndex+"'></div>";
//	    		var productId = record.get('productId');
//	    		if(productId==20
//					||productId==21
//					||productId==22
//					||productId==23){
//						return "<img src='picture/asr/"+record.get("neUuid")+".png'>";
//				}else{
//					return "NULL";
//				}
//	    	}}
		],

		initComponent: function(){
			var store=Ext.create('app.store.monitor.PmdNeListStore',{
			});
			var params = { domainUuid:235};
			this.dockedItems = {

			     dock: 'bottom',
				 xtype: 'pagingtoolbar',
			     store: store,
			     pageSize: 25,
			     displayInfo: true,
			}
			
			Ext.apply(store.proxy.extraParams, params);
			this.store = store;
			
			this.callParent(arguments);
		},
		listeners: {
//			itemdblclick: function(view, record, item, index, e, eOpts){
//				alert('index:'+index)
//
//			},
			celldblclick:function( table, td, cellIndex, record, tr, rowIndex, e, eOpts ){
				var dataIndex = this.down('headercontainer').getHeaderAtIndex(cellIndex).dataIndex;
				if(dataIndex=="asr"
					|| dataIndex=="rate"
					||	dataIndex=='chart'){
					
					var chart = Ext.getCmp("chartZoomIn");
					if(!chart){
						chart = Ext.create("app.view.monitor.domain.ChartZoomIn",{
							title:tiChart
						});
						lanControll.setLan(chart);
					}
					var store = chart.store;
					var params = { neUuid:record.get("neUuid")
							,gwUuid:record.get("deviceUuid")};
					Ext.apply(store.proxy.extraParams, params);
//					store.on('load',function(){
//						alert("----"+store.getCount());
//					});
	        		deleteCookie("generalChart_15");
					store.load();
					chart.dataIndex = dataIndex;
					chart.show();
				}else{
					return;
				}
			}
//			itemclick:function(view, record, item, index, e, eOpts ){}

		}
			
});