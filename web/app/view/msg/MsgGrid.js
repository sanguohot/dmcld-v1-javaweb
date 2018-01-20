Ext.define('app.view.msg.MsgGrid',{
	extend:'Ext.panel.Panel',
	 requires: [
              'Ext.util.Format',
              'Ext.grid.Panel',
              'Ext.toolbar.Paging',
              'app.store.log.LogStore'
	           ],
	title:'abcd',
	layout:'border',
	treeId:'',
	store:null,
	border:false,
	loadFlag:true,
	createColumns:function(){
		var columns = [];
		var msgUuid = Ext.create("Ext.grid.column.Column",{
			header:"msgUuid",
			dataIndex:"msgUuid",
			width:50,
			hidden:true,
		});
		var send = Ext.create("Ext.grid.column.Column",{
			header:"Sender",
			dataIndex:"srcUserName",
			width:200,
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,colIndex,store,view){
				var a=roleType.getDisplayMapItem(record.get("srcRoleId"));
				return mc.renderRead(value,record)+"&nbsp;<font color=gray>&lt;"+a+"&gt;</font>";
			}
		});
		var recv = Ext.create("Ext.grid.column.Column",{
			header:"Receivers",
			dataIndex:"sendToRole",
			width:130,
			hidden:true,
			renderer: function(value,metaData,record,rowIndex,colIndex,store,view){
				return roleType.getDisplayList(value);
			}
		});
		var theme = Ext.create("Ext.grid.column.Column",{
			header:"theme",
			dataIndex:"theme",
			width:500,
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,colIndex,store,view){
				 if(record.get("cancelStatus")==2&&record.get("readStatus")==0){
					var content="该邮件全部撤回";
				}else if(record.get("cancelStatus")==1&&record.get("readStatus")==0){
					var content="该邮件部分撤回";
				}else if(record.get("cancelStatus")==0&&record.get("readStatus")==0) {
					var content=record.get("content");
				}else if(record.get("cancelStatus")==3&&record.get("readStatus")==0) {
					var content="撤回失败"+record.get("content");
				}else if(record.get("cancelStatus")==2&&record.get("readStatus")==1) {
					var content="该邮件已撤回";
				}else if(record.get("cancelStatus")==1&&record.get("readStatus")==2) {
					var content=record.get("content");
				}else if(record.get("cancelStatus")==1&&record.get("readStatus")==1) {
					
					var content="该邮件已撤回";
				}else  {
					var content=record.get("content");
				}
				return mc.renderRead(value,record)+"<font color=gray >"+" - "+content+"</font>";;
			}
		});
//		var content = Ext.create("Ext.grid.column.Column",{
//			header:"Content",
//			dataIndex:"content",
//			hidden:false,
//			minWidth:420,
//			renderer: function(value,metaData,record,rowIndex,colIndex,store,view){
//				return value;
//			}
//		});
		var time = Ext.create("Ext.grid.column.Column",{
			header:"Time",
			dataIndex:"time",
			width:180,
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,colIndex,store,view){
				var tmp=rs.timeFormat(value);
				return mc.renderRead(tmp,record);
			}
		});
//		var srcRoleId = Ext.get("roleId").value;
//		var isSuper = roleType.isSuper(srcRoleId);
		columns.push(msgUuid);
		columns.push(send);
		columns.push(recv);
		columns.push(theme);		
//		columns.push(content);
		columns.push(time);
		return columns;
	},
	initComponent: function() {
		var me=this;
		var nesInSiteStore= Ext.create("app.store.msg.MsgStore");
		this.store = nesInSiteStore;
		var sm = Ext.create('Ext.selection.CheckboxModel');		
		var nesGrid = Ext.create('Ext.grid.Panel', {
			border:false,
			columnLines:true,
			store: nesInSiteStore, 
			columns:this.createColumns(),
			selModel: sm,
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			dockedItems:[{
			     dock: 'bottom',
				 xtype: 'pagingtoolbar',
			     store: nesInSiteStore,
			     pageSize: 25,
			     displayInfo: true
			}],
			listeners:{
	  			cellclick:function(cmp, td, cellIndex, record, tr, rowIndex, e, eOpts){
	  				if(mc.eType && cellIndex>0){
	  					if(mc.eType=="draftmsg"){
	  						console.log(record)
	  						mc.writeMsgPanel(record);
	  					}else if(mc.eType=="receivedmsg"){
	  						if(record.get("cancelStatus")==0&&record.get("readStatus")==1){
	  							var params={msgUuid:record.get("msgUuid"),time:rs.dateSearchFormat(record.get("time"),'Y-m-d H:i:s')};
	  	        				Ext.Ajax.request({
	  	                    		url:'msgManager!recUnreadToRead.action',
	  	                    		method:'POST',
	  	                    		params:params,
	  	                    		callback: function (options, success, response) {
	  	    	                    	var obj=Ext.JSON.decode(response.responseText);	  	    	                    	
	  	    	                    	if(obj['success']){
	  	    	                    		Ext.getCmp("msgTree").lstore.load();
	  	    	                    	}	  	    	                    
	  	                        	}
	  	                    	});
	  							
	  						}
	  						mc.viewMsgPanel(record);
	  					}else if(mc.eType=="sentmsg"){
	  						mc.viewMsgPanel(record);
	  					}
	  				}
	  			}
	  		}
		
	});
		
	
     
		this.tbar=[{
     		 xtype:'button',
      		 text:'Delete',
      		 iconCls:'remove',
      		 listeners:{
      		 	click:function(){
					mc.delMsg(false,mc.eType,nesGrid,nesGrid.store,me.down("displayfield[name=display]"));
      	 		}
      	 	}
//      	 },'-',{
//     		 xtype:'button',
//      		 text:'Delete Absolutely',
//      		 iconCls:'remove',
//      		 hidden:true,
//      		 listeners:{
//      		 	click:function(){
//					mc.delMsg(true,mc.eType,nesGrid,nesGrid.store,me.down("displayfield[name=display]"));
//      	 		}
//      	 	}
      	 },"-",{
	       		 xtype:'button',
	       		 text:'Cancel',
	       		 ulan:'btCancel',
	       		 hidden:mc.eType=="sentmsg"?false:true,
	       		 iconCls:'cancel',
	       		 listeners:{
	       		 	click:function(){
      		     mc.cancelMsg(false,mc.eType,nesGrid,nesGrid.store,me.down("displayfield[name=display]"));
	       	 		}
	       	 	}
	       	 },"-",{
	       		 xtype:'button',
	       		 text:'Refresh',
	       		 ulan:'btRefresh',
	       		 iconCls:'refresh2',
	       		 listeners:{
	       		 	click:function(){
						me.store.load();
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
				fieldLabel:'Theme',
				name:'theme',
			},{
				xtype:'textfield',
				fieldLabel:'Content',
				name:'content',
			}],
			
			buttons : [{
					text : 'Reset',
					ulan:'btReset1',
					handler : function() {
						this.up('form').getForm().reset();
					}
			},{
			text : 'Search',
			ulan:'btSearch',
			itemId:'search',
			handler : function() {
				var store = me.store;
				var form=this.up('form').getForm();
				var params = form.getValues();
				var fuzzySearchField=me.down('textfield[name=fuzzySearch]');
				var fuzzySearch='';
				if(fuzzySearchField){
					fuzzySearch=fuzzySearchField.getValue();
				}
				params['fuzzySearch']=fuzzySearch;
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
//			 border:false,
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
		 },rs.createFuzzySearch2()
		 ];
		this.callParent(arguments);		
	},
})