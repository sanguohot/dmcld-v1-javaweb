Ext.define('app.view.log.LogGrid',{
	extend:'Ext.panel.Panel',
	 requires: [
              'Ext.util.Format',
              'Ext.grid.Panel',
              'Ext.toolbar.Paging',
              'app.store.log.LogStore'
	           ],
	title:'',
	layout:'border',
	treeId:'',
	store:null,
	border:false,
	loadFlag:true,
	createColumns:function(){
		var columns = [];
		var sn = Ext.create("Ext.grid.column.Column",{
			header:"SN",
			dataIndex:"serialNo",
			ulan:'snAbbr',
			width:70,
			hidden:false,
		});
		var content = Ext.create("Ext.grid.column.Column",{
			header:"Content",
			flex:1,
			ulan:'content',
			sortable:false,
			hidden:false,
			minWidth:420,
			renderer: function(value,metaData,record,rowIndex,store,view){
				var userName = record.get('userName');
				var domainName = record.get('domainName');
				if(!domainName || domainName==""){
					domainName = "N/A";
				}
				
				var objectName = record.get('objectName');
				var operate = record.get('operate');
				var objectTypeName = record.get('objectTypeName');
				if(!objectTypeName){
					objectTypeName = "";
				}
				var batchSet = record.get('batchSet');
				var execResult = record.get('execResult');
//				alert("----"+typeof execResult)
				var str = "domain:"+domainName;
				if(userName && userName!=""){
					str = str + " , user:" + userName;
				}else{
					str = str + " , user:N/A";
				}
				if(batchSet){
					str = str +" , "+lanControll.getLanValue('batch');
				}else{
					str = str +" ,";
				}
				str = str + " "+rs.getOperate(operate).toLowerCase();
				if(objectTypeName!=""){
					str = str +' '+objectTypeName;
				}
				if(objectName!=""){
					str = str +'('+objectName+')';
				}  
				str = str +" , "+rs.execResult(execResult).toLowerCase();
				
//				alert(str)
				return str;
    		}
		});
		var time = Ext.create("Ext.grid.column.Column",{
			header:"Time",
			dataIndex:"generateTime",
			width:160,
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.timeFormat(value);
			}
		});
		var ipAddr = Ext.create("Ext.grid.column.Column",{
			header:"From IP",
			dataIndex:"ipAddr",
			ulan:'fromIpAbbr',
			width:160,
			hidden:false
		});

		

		var edit = Ext.create("Ext.grid.column.Column",{
			header:"SQL",
			align:"center",
			width:60,
			ulan:'execSqlAbbr',
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,store,view){
		 		var sql;
		 		if(record.get('execSql').indexOf('password_md5')>-1){
		 			sql="NA";
		 			return sql;
		 		}
		 		if(record.get('execSql')&& record.get('execSql').length>0){
					sql = "<label align='middle' style='color:green;border-bottom:#333 dashed 1px;'" +
					" type='button' value='detail'>"+lanControll.getLanValue('detail')+"</label>";
		 		}else{
		 			sql="NA";
		 		}
	
		        return sql;
	    	}
		});
		var srcRoleId = Ext.get("roleId").value;
		var isSuper = roleType.isSuper(srcRoleId);
		columns.push(sn);
		columns.push(time);
		columns.push(content);		
		columns.push(ipAddr);
		if(isSuper)
		columns.push(edit);
		return columns;
	},
	initComponent: function() {
		var nesInSiteStore= Ext.create("app.store.log.LogStore");
		this.store = nesInSiteStore;
		var sm = Ext.create('Ext.selection.CheckboxModel');		
		var nesGrid = Ext.create('Ext.grid.Panel', {
			border:false,
			itemId:'logUserGrid',
			columnLines:true,
			store: nesInSiteStore, 
//			selModel: sm,
			columns:this.createColumns(),
			listeners:{
				itemclick:function(view, record, item, index, e, eOpts ){
					if(e.getTarget().style.color == 'green'){
						var logSql = Ext.getCmp('logSql');
						if(!logSql){
							logSql = Ext.create("app.view.log.LogSql",{});
							lanControll.setLan(logSql);
						}
						logSql.down('textareafield[name=sql]').setValue(record.get('execSql'));
						logSql.show();
					}else{
						return;
					}
				}
		},
		viewConfig : {
			loadMask:{
				msg:lanControll.getLanValue('maskMsg')
			},
			enableTextSelection: true,
			forceFit :true,
				getRowClass : function(record,rowIndex,rowParams,store){
				  //禁用数据显示红色
				  if(record.get('execResult')==1){
				   return '';
				  }else{
				   return 'row-upgrade-result-fail';
				  }
				}
		},
		dockedItems:[{
		     dock: 'bottom',
			 xtype: 'pagingtoolbar',
		     store: nesInSiteStore,
		     pageSize: 25,
		     displayInfo: true
		}],
		
	});

		this.tbar=[{
	       		 xtype:'button',
	       		 text:'Refresh',
	       		 ulan:'btRefresh',
	       		 iconCls:'refresh2',
	       		 listeners:{
	       		 	click:function(){
						this.up('panel').down('panel[itemId=logUserGrid]').getStore().load();
	       	 		}
	       	 	}
	       	 },'->',{
	       		 xtype:'button',
	       		 text:'Search',
	       		 ulan:'btSearch',
	       		 iconCls:'search',
	       		 listeners:{
	       		 	click:function(){
	       		 		var eastSearch=this.up('panel').down('panel[itemId=search]');
	       		 		if(eastSearch.isHidden()){
	       		 			eastSearch.expand();
	       		 		}else{
	       		 			eastSearch.collapse();
	       		 		}
	       	 		}
	       	 	}
	    }];	
		
		var search_grid=Ext.create('Ext.form.Panel',{
			border : false,
			bodyPadding : 5,
			defaults : {
			margins : '0 0 10 0',
			labelWidth:120
			},
			items : [{
				xtype:'textfield',
				fieldLabel:'User Name',
				name:'userName',
			},{
				xtype:'datefield',
				fieldLabel:'Time Begin',
				name:'timeBegin',
				format: 'Y-m-d',
			},{
				xtype:'datefield',
				fieldLabel:'Time End',
				name:'timeEnd',
				format: 'Y-m-d',
			},{
				xtype:'textfield',
				fieldLabel:'From IP',
				name:'ipAddr',
				ulan:'fromIpAbbr',
			},{
//				xtype:'textfield',
//				fieldLabel:'Object Type Name',
//				name:'objectTypeName',
//			},{
				xtype:'textfield',
				fieldLabel:'Object Name',
				name:'objectName',
			},{
	            xtype: 'combo',
	            name: 'operate',
	            fieldLabel: 'Action',
				mode : 'local',
				editable:false,
				displayField : 'name',
				valueField : 'statusId',
				queryMode : 'local',
				value:-1,
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'statusId' ],
					data : [ {
						name : '-SELECT-',
						statusId : -1
					},{
						name : lanControll.getLanValue('getOperate_'+1),
						statusId : 1
					}, {
						name : lanControll.getLanValue('getOperate_'+2),
						statusId : 2
					}, {
						name : lanControll.getLanValue('getOperate_'+3),
						statusId : 3
					}, {
						name : lanControll.getLanValue('getOperate_'+4),
						statusId : 4
					}, {
						name : lanControll.getLanValue('getOperate_'+5),
						statusId : 5
					},{
						name : lanControll.getLanValue('getOperate_'+6),
						statusId : 6
					},{
						name : lanControll.getLanValue('getOperate_'+7),
						statusId : 7
					},{
						name : lanControll.getLanValue('getOperate_'+8),
						statusId : 8
					},{
						name : lanControll.getLanValue('getOperate_'+9),
						statusId : 9
					},{
						name : lanControll.getLanValue('getOperate_'+10),
						statusId : 10
					},{
						name : lanControll.getLanValue('getOperate_'+11),
						statusId : 11
					},{
						name : lanControll.getLanValue('getOperate_'+12),
						statusId : 12
					},{
						name : lanControll.getLanValue('getOperate_'+13),
						statusId : 13
					},{
						name : lanControll.getLanValue('getOperate_'+14),
						statusId : 14
					},{
						name : lanControll.getLanValue('getOperate_'+15),
						statusId : 15
					},{
						name : lanControll.getLanValue('getOperate_'+16),
						statusId : 16
					},{
						name : lanControll.getLanValue('getOperate_'+21),
						statusId : 21
					},{
						name : lanControll.getLanValue('getOperate_'+22),
						statusId : 22
					},{
						name : lanControll.getLanValue('getOperate_'+23),
						statusId : 23
					}]
				}),
				
	        },{
	            xtype: 'combo',
	            name: 'execResult',
	            fieldLabel: 'Result',
				mode : 'local',
				editable:false,
				value:-1,
				displayField : 'name',
				valueField : 'statusId',
				queryMode : 'local',
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'statusId' ],
					data : [ {
						name : '-SELECT-',
						statusId : -1
					},{
						name : lanControll.getLanValue('execResult_'+0),
						statusId : 0
					}, {
						name : lanControll.getLanValue('execResult_'+1),
						statusId : 1
					}]
				}),
				
	        }],
			
			buttons : [{
					text : 'Reset',
					ulan:'btReset1',
					handler : function() {
						this.up('form').getForm().reset();
						this.up('form').getForm().findField('operate').setValue(-1);
						this.up('form').getForm().findField('execResult').setValue(-1);
					}
			},{
			text : 'Search',
			ulan:'btSearch',
			handler : function() {
				var store = this.up('form').up('panel').up('panel').store;
				var form=this.up('form').getForm();
				var params = form.getValues();
				
				if(params.timeBegin){
					params.timeBegin=rs.dateSearchFormat(params.timeBegin,'Y-m-d H:i:s','begin');
				}
				if(params.timeEnd){
					params.timeEnd=rs.dateSearchFormat(params.timeEnd,'Y-m-d H:i:s','end');
				}
				Ext.apply(store.proxy.extraParams, params);
				this.up('form').up('panel').up('panel').down('pagingtoolbar').moveFirst();
			}
			}]
		});
		var roleId = Ext.get('roleId').value;
		if(roleType.isSuper(roleId)){
			var domainName = Ext.create('Ext.form.field.Text',{
				xtype:'textfield',
				fieldLabel:'Domain Name',
				name:'domainName',
				labelWidth:120
			});
			search_grid.insert(0,domainName);
		}
		
		var store = this.store;
		var params = search_grid.getValues();
		Ext.apply(store.proxy.extraParams, params);
		this.items=[
		   {
			 region: 'center',
			 layout:'fit',
			 border:false,
			 items:[nesGrid]
			       
			},{
			 itemId:'search',
			 region:'east',
			 title : tiSearch,
			 collapsible: true,
			 collapsed:true,
			 border:false,
			 width:300,
			 items:[search_grid]
		 }
		 ];
		this.callParent(arguments);		
	},
//	listeners:{
//		activate: function(tab){
//			
//			if(this.loadFlag){
//				this.loadFlag=false;
//				this.store.load();
//			}
//		}
//	}
})