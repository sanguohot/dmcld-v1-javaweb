Ext.define('app.view.common.AlarmPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	border:false,
	nodeDesc:null,
	createDesc:null,
	gridStore:null,
	forceRefresh:0,
	flag:'alarm',
	initComponent: function(){
		this.createView();
		this.store.pageSize=10;
		autoRefresh.createBaseTask(this.store,10000);
//		this.store.load();
		this.callParent(arguments);
	},
	createView:function(){
		var createDesc = this.createDesc;
//		this.createTbar();
		this.items=this.createGrid();
	},
	createGrid:function(){
		var sm = Ext.create('Ext.selection.CheckboxModel');
		var store = Ext.create("app.store.operation.domain.AlarmStore",{});
		this.store = store;
		var grid = Ext.create("Ext.grid.Panel",{
			border:false,
			columnLines:true,
			itemId:'grid',
			selModel: sm,
			store:store,
			columns:[
			    {header: 'uuid',dataIndex: 'uuid',width:120,hidden:true},
			    {header: 'SN',dataIndex: 'alarmSn',ulan:'snAbbr',width:80},
			    {header: 'Report Time',dataIndex: 'reportTime',ul:'reportTime_full', width:150,hidden:true,			
					renderer: function(value,metaData,record,rowIndex,store,view){
    	 			return rs.timeFormat(value);
		    	}},
			    {header: 'Alarm Id',dataIndex: 'alarmId',width:60},
			    {header: 'Alarm Level',dataIndex: 'alarmLevel',width:80,
			    	renderer: function(value,metaData,record,rowIndex,store,view){
//			    		if(record.get('alarmType') == '2'){
//			    			return "NULL";
//			    		}
			    		return rs.alarmLevel(record.get('alarmLevel'));
			    	}
	        	},
	        	{header: 'Object Desc',dataIndex: 'objectDesc',hidden:true},
			    {header: 'Alarm Name',dataIndex: 'alarmName',hidden:true,				
					renderer: function(value,metaData,record,rowIndex,store,view){
    	 			if(!value || value==""){
    	 				return record.get('alarmId');
    	 			}
    	 			return value;
		    	}},			    
			    {header: 'Cause Name',dataIndex: 'causeName',hidden:true,				
					renderer: function(value,metaData,record,rowIndex,store,view){
    	 			if(!value || value==""){
    	 				return record.get('causeId');
    	 			}
    	 			return value;
		    	}},			    
				
				{header: 'Confirm Flag',dataIndex: 'confirmFlag',width:120,	hidden:true,
					renderer: function(value,metaData,record,rowIndex,store,view){
    	 				return rs.confirmFlag(value);
		    		}
		    	},{
					header:"Content",
					flex:1,
					hidden:false,
					ulan:'contentAbbr',
					minWidth:420,
					renderer: function(value,metaData,record,rowIndex,store,view){
						var neAlias = record.get('neAlias');
						var domainName = record.get('domainName');
						if(!domainName || domainName==""){
							domainName = "N/A";
						}
						
						var alarmName = record.get('alarmName');
						var causeName = record.get('causeName');
						var alarmId = record.get('alarmId');
						var alarmLevel = record.get('alarmLevel');
						var objectDesc = record.get('objectDesc');
						var confirmFlag = record.get('confirmFlag');
						var reportTime = record.get('reportTime');
						
						
						var str = "";
//						str= str +" domain:"+domainName;
//						if(neAlias && neAlias!=""){
//							str = str + " device:" + neAlias;
//						}else{
//							str = str + " device:N/A";
//						}

						str= str+" "+objectDesc;
						if(alarmName!="")
						str = str + " , "+alarmName;
						if(causeName!=""){
							str = str +' Cause:'+causeName;
						}
						
						return str;
		    		}
				}
			],
			viewConfig : {
				loadMask:false,
				forceFit :true,
					getRowClass : function(record,rowIndex,rowParams,store){
					  //禁用数据显示红色
					if(record.get('confirmFlag')==1){
						return 'row-gray';
					}else{
						var level = record.get('alarmLevel');
						if(level==0 || level==1 || level==2){
							return 'row-red';
						}else if(level==3 || level==4){
							return 'row-orange';
						}else if(level==5 || level==6 || level==8){
							return 'row-blue';
						}else{
							return 'row-black';
						}
					}
				}
			},
			listeners:{
				itemdblclick: function(view, record, item, index, e, eOpts ){
					var uuid=record.get('domainUuid');	
					var win=ip.createModule('maintenance_win','alarmmain_'+(uuid-330000));
					if(win){
						var ot = Ext.getCmp('maintenanceTree');
						var rootNode=ot.getRootNode();
						var node=rootNode.findChild('nid','alarmmain_'+(uuid-330000),true);
						ot.fireEvent('itemclick',null,node);
					}
				}
			},
		});
		var nodeDesc = this.nodeDesc;
		if(!nodeDesc || nodeDesc=="domain"){
			var col=Ext.create("Ext.grid.column.Column",{
				header: 'Device Name',
				dataIndex: 'neAlias',
				width:150,
				hidden:true
			});
			grid.down('headercontainer').insert(3,col);
		}else{
			store.getProxy().url = "alarmManager!getNeList.action";
		}
		
		var createDesc = this.createDesc;
		if(!createDesc || createDesc=="current"){
			var params = {cleanFlag:0,alarmType:1};
			Ext.apply(store.proxy.extraParams, params);
		}

		grid.store = store;
		return grid;
	}
});