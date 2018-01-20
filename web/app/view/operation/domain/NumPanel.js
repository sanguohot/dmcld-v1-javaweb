Ext.define('app.view.operation.domain.NumPanel',{
	extend:'Ext.panel.Panel',
	layout:'border',
	hidden:false,
	border:false,
	treeId:'',
	store:null,
	initComponent: function(){
		var me=this;
		var type = this.type;
		var store = Ext.create('app.store.operation.domain.NumStore',{});
		var record = store.createModel({
			type:1,
			lastCallTime:'2014-02-25T11:00:02',
			number:'123456',
			ipFlag:0,
			callCnt:100,
			srcIp:'172.16.100.221',
			dynamicWeight:8,
		},store.model);
		var record1 = store.createModel({
			type:2,
			lastCallTime:'2014-02-24T11:00:02',
			number:'172.16.200.140',
			ipFlag:1,
			callCnt:100,
			srcIp:'172.16.100.221',
			dynamicWeight:99,
		},store.model);
		var record2 = store.createModel({
			type:3,
			lastCallTime:'2014-02-23T11:00:02',
			number:'10086',
			ipFlag:0,
			callCnt:200,
			srcIp:'172.16.100.221',
			dynamicWeight:50,
		},store.model);
		store.add(record);
		store.add(record1);
		if(type != 's')
		store.add(record2);
		this.store=store;
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		
		var sm = Ext.create('Ext.selection.CheckboxModel');
//		if(type != 's'){
//			sm = null;
//		}
		var numGrid = Ext.create('Ext.grid.Panel', {
				border:false,
				itemId:'numGrid',
				columnLines:true,
				store: store, 
				selModel: sm,
				selectAll:0,
				viewConfig: {
					loadMask:{
						msg:lanControll.getLanValue('maskMsg')
					},
					enableTextSelection: true
		  		},
//		        plugins: [
//		                  Ext.create('app.util.ColumnAutoWidthPlugin', {}),
//		              ],
				columns: this.createColumns(type,numGrid),
			dockedItems:[{
			     dock: 'bottom',
				 xtype: 'pagingtoolbar',
			     store: store,
			     pageSize: 25,
			     displayInfo: true,
			}	 	
			],
			viewConfig : {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true,
//				forceFit :true,
//				getRowClass : function(record,rowIndex,rowParams,store){
//					var numType = record.get('type');
//					if(numType == 1){
//						return 'row-black';
//					}else if(numType == 2){
//						return 'row-green';
//					}else{
//						return 'row-gray';
//					}
//				}
			},
			updateNum:function(records){
				var ids="";
				var cnt=0;
				var name = "";
				for (var i = 0; i < records.length; i++) {
					if(i==0){
						ids=records[i].get('uuid');
						name=records[i].get('name');
					}else {
						cnt=1;
						ids=ids+"-"+records[i].get('uuid');
					}
				}
				if(numGrid.selectAll==1){
					ids = "";
				}
				var updateNe = Ext.getCmp('updateNum');
				if(updateNe==undefined || updateNe=='undefined'){
					updateNe=Ext.create('app.view.operation.domain.UpdateNum',{});
					lanControll.setLan(updateNe);
				}
				updateNe.down('form').getForm().reset();
				updateNe.down('form').numStore = this.getStore();
				var  basicForm = updateNe.down('form').getForm();
				basicForm.findField('ids').setValue(ids);
				basicForm.findField('domainUuid').setValue(this.domainUuid);
				basicForm.findField('objName').setValue(name);
				var form=numGrid.up('panel').up('panel').down('form').getForm();
				var param=form.getValues();
//				var param=numGrid.store.proxy.extraParams;
				param['domainUuid'] = this.domainUuid;
				param['ids'] = ids;
				param['objName'] = name;
				updateNe.down('form').params = param;
				var fieldContainer = updateNe.down('textfield[name=number]')
				var numberRole = updateNe.down('combo[name=numberRole]')
				if(records.length == 1){
					basicForm.findField('type').setValue(records[0].get('type'));					
					fieldContainer.setVisible(true);
					numberRole.setVisible(true);
					basicForm.findField('number').setValue(records[0].get('number'));
					basicForm.findField('backup').setValue(records[0].get('number'));
					basicForm.findField('numberRole').setValue(records[0].get('numberRole'));
				}else{
					fieldContainer.setVisible(false);
					numberRole.setVisible(false);
				}

				updateNe.show();
			},
		});
		store.on('load', function(){
	    	var total = store.getCount();//数据行数
	    	if(numGrid.selectAll==1){
	    		numGrid.selModel.setLocked(false);
				if(total>0){
					numGrid.selModel.selectRange(0,total-1,true);  
				}
				numGrid.selModel.setLocked(true);
			}else{
				numGrid.selModel.setLocked(false);
			}	
	    });
		if(type == 's'){
			numGrid.addListener('itemdblclick',function(view, record, item, index, e, eOpts){
				if(numGrid.selectAll==1){
					if (numGrid.getSelectionModel().hasSelection() ){
						numGrid.updateNum(numGrid.getSelectionModel().getSelection());					
					}else{
						Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
   		 				return;
					}
				}else{
					numGrid.updateNum([record]);
				}
			});
		}
		this.tbar = this.createTbar(type,maintenance,numGrid);
		var combo = rs.createNumType(3,null,null);
		var combo1 = rs.createCombo({prefix:"numberRole",valueList:null,length:4,value:0})
		var arr = [{
			xtype:'textfield',
			fieldLabel:'Number',
			name:'number',			
		}];
		if(type != 's'){
			combo = rs.createNumType(4,null,null);
		}
		arr.push(combo);
//		if(type == 's'){
			arr.push(combo1);
//		}
		var search_grid=Ext.create('Ext.form.Panel',{
			border : false,
			bodyPadding : 5,
			defaults : {
			margins : '0 0 10 0',
			labelWidth:100
			},
			items : arr,
			
			buttons : [{
					text : 'Reset',
					ulan:'btReset1',
					handler : function() {
						this.up('form').getForm().reset();
//						this.up('form').findField('roleId1').setValue("");
					}
			},{
			text : 'Search',
			ulan:'btSearch',
			handler : function() {
				var form=this.up('form').getForm();
				var params = form.getValues();
				Ext.apply(store.proxy.extraParams, params);				
				this.up('form').up('panel').up('panel').down('pagingtoolbar').moveFirst();
			}
			}]
		});

		 this.items=[
		   {
			 region: 'center',
			 layout:'fit',
			 border:false,
			 items:[numGrid]
			       
			},{
			 itemId:'search',
			 region:'east',
			 title : tiSearch,
			 collapsible: true,
			 collapsed:true,
			 border:true,
			 width:300,
			 items:[search_grid]
		 }
		 ];
		this.callParent(arguments);	
	},
	createTbar:function(type,maintenance,numGrid){
		var me=this;
		var id=me.id;
		var staticFlag=1;
		if(id.indexOf("d")>=0) staticFlag=0;
		var add = Ext.create('Ext.button.Button',{
    		xtype:'button',
    		text: 'Add',
    		ulan:'btAdd',
    		iconCls:'add',
    		listeners:{ 
    			click: function() {
					var store = numGrid.getStore();
					var domainUuid = numGrid.domainUuid;
					if(!domainUuid){
						domainUuid = Ext.get("domainUuid").value;
					}
					Ext.Ajax.request({
                		url:'numManager!canAddSnum.action',
                		method:'POST',
                		params:{domainUuid:domainUuid,count:store.getCount()},
                		callback: function (options, success, response) {
	                    var obj=Ext.JSON.decode(response.responseText);			
                    		if(obj['success']){
                    			var addNum =Ext.getCmp('addNum'); 
    				if(addNum==null || addNum==undefined){
    					addNum=Ext.create('app.view.operation.domain.AddNum',{});
    					lanControll.setLan(addNum);
    				}
    				addNum.down("combo[name=type]").setValue(1);
    				addNum.down('form').numStore = numGrid.getStore();
    				addNum.down('form').getForm().findField('domainUuid').setValue(domainUuid);
    				addNum.show();
	                    	}else{
	                    		Ext.MessageBox.alert(boxWarnning,lanControll.getLanValue('listFull'));
	    								return;
	                    	}
                    	}
                	});
					
    			}						
    		},
    	});
		
		var moveDtoS = Ext.create('Ext.button.Button',{
			xtype : 'button',
			text : 'Copy to Static',
			ulan:'btCopyToStatic',
      		iconCls:'option',
      		listeners:{
       		 	click:function(){
					var grid=numGrid;
					var domainUuid = numGrid.domainUuid;
					if(grid.getSelectionModel().hasSelection()){
						var records=grid.getSelectionModel().getSelection();
						var numbers="",types="";
						if(grid.selectAll==0){
							for ( var i = 0; i < records.length; i++) {
								if(i!=0){
									numbers=numbers+",";
									types=types+",";
								}
								numbers=numbers+records[i].get("number");
								types=types+records[i].get("type");
							}
						}
						var search=me.down("form");
						Ext.Ajax.request({
	                		url:'numManager!canCopyToSnum.action',
	                		method:'POST',
	                		timeout:60*60*1000,
	                		params:{domainUuid:domainUuid,dCount:records.length},
	                		callback: function (options, success, response) {
		                    var obj=Ext.JSON.decode(response.responseText);			
	                    		if(obj['success']){
	        						var m=Ext.getCmp("moveToStatic");
	        						if(!m){
	        							m=Ext.create("app.view.operation.domain.MoveToStatic");
	        						}
	        						m.search=search;
	        						m.grid=grid;
	        						m.numbers=numbers;
	        						m.types=types;
	        						m.domainUuid=domainUuid;
	        						m.show();
		                    	}else{
		                    		Ext.MessageBox.alert(boxWarnning,"The selected records are out of the limit of static number!");
		    								return;
		                    	}
	                    	}
	                	});

//						return;
					}else{
   		 				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
   		 				return;
   		 			}
				}
       	 	}
		
		});
		
		var boxDelNum = lanControll.getLanValue("boxDelNum");
		var del = Ext.create('Ext.button.Button',{
    		text:'Delete',
    		ulan:'btDel',
    		iconCls:'remove',
    		listeners:{ 
    			click: function() {
    					if ( numGrid.getSelectionModel().hasSelection() ){
    						Ext.MessageBox.confirm(boxWarnning,boxDelNum,function(e) { 																				
								if( e == 'yes' ){
									var records = numGrid.getSelectionModel().getSelection();
									var ids="";
									var cnt=0;
									var name = "";
									var domainUuid = numGrid.domainUuid;
									for ( var i = 0; i < records.length; i++) {
										if(i==0){
											ids=records[i].get('uuid');
											name=records[i].get('number');
										}else {
											cnt=1;
											ids=ids+"-"+records[i].get('uuid');
										}
									}
									if(numGrid.selectAll==1){
										ids = "";
									}
									var form=numGrid.up('panel').up('panel').down('form').getForm();
	      							var param=form.getValues();
//									var param=numGrid.store.proxy.extraParams;
	      							param['domainUuid'] = domainUuid;
	      							param['ids'] = ids;
	      							param['objName'] = name;
	      							param['staticFlag'] = staticFlag;
									Ext.Ajax.request({
				                		url:'numManager!deleteNum.action',
				                		method:'POST',
				                		params:param,
				                		callback: function (options, success, response) {
					                    var obj=Ext.JSON.decode(response.responseText);			
				                    		if(obj['success']){
				                    			Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
				                    			numGrid.selectAll=0;
				                    			numGrid.selModel.setLocked(false);
				                    			numGrid.getSelectionModel().deselectAll();
					                    		numGrid.getStore().load();
					                    	}else{
					                    		Ext.MessageBox.alert(boxFailture,boxCommitFail);
					                    	}
				                    	}
				                	});
								}	
    						})
    					}else{
    						Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
	   		 				return;
    					}
    				}		
    		}							
    	});
		var set = Ext.create('Ext.button.Button',{
    		text:'Setting',
    		ulan:'btSetting',
    		iconCls:'option',
    		listeners:{ 
    			click: function() {
    					if (numGrid.getSelectionModel().hasSelection() ){
    						numGrid.updateNum(numGrid.getSelectionModel().getSelection());					
    					}else{
    						Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
	   		 				return;
    					}
    				}		
    		}							
    	});
		var text=lanControll.getLanValue("btImportToStatic");
		if(staticFlag==1){
			text=lanControll.getLanValue("btImport");
		}
		var importC = Ext.create('Ext.button.Button',{
     		 xtype:'button',
     		 text:text,
//     		ulan:'btImport',
     		 iconCls:'upgrade',
     		 flag:"domain_edit",
     		 listeners:{
     		 	click:function(){
					var domainUuid = numGrid.domainUuid;
					if(!domainUuid){
						domainUuid = Ext.get("domainUuid").value;
					}
					var importPaidCard=Ext.getCmp('importNum');
					if(importPaidCard==undefined){
						importPaidCard=Ext.create('app.view.operation.domain.ImportNum');
//						lanControll.setLan(importPaidCard);
					}
					importPaidCard.staticFlag=staticFlag;
					var view=importPaidCard.down("checkboxgroup");
					var callee=view.down("checkbox[name=callee]");
					var caller=view.down("checkbox[name=caller]");
					callee.setValue(1);
					caller.setValue(0);
					if(staticFlag){
						view.setVisible(false);
					}else{
						view.setVisible(true);
					}
					importPaidCard.down('form').store = numGrid.store;
					importPaidCard.down('form').getForm().findField('domainUuid').setValue(domainUuid);
					importPaidCard.show();
     		 		
     	 		}
     	 	}
     	 
     	 });
		var exportC = Ext.create("Ext.button.Button",{
      		 xtype:'button',
      		 text:'Export Paid Card',
      		ulan:'btExport',
      		 iconCls:'export',
      		 flag:"domain_read",
      		 listeners:{
      		 	click:function(){

	       			if ( numGrid.getSelectionModel().hasSelection() ){
	       				
						var records= numGrid.getSelectionModel().getSelection();
						var ids="";
						var cnt=0;
						var domainUuid = numGrid.domainUuid;
						if(!domainUuid){
							domainUuid = Ext.get("domainUuid").value;
						}
						var selectAll=numGrid.selectAll;
						if(selectAll==1){
							info=lanControll.getLanValue('boxExport');
							ids="";
						}else{
							info=lanControll.getLanValue('boxExport');
							var names=new Array();
							for ( var i = 0; i < records.length; i++) {
								if(i==0){
									ids=records[i].get('uuid');
								}else {
									cnt=1;
									ids=ids+"-"+records[i].get('uuid');
								}
							}
						}
						var id=me.id;
						var staticFlag=1;
						if(id.indexOf("d")>=0) staticFlag=0;
						Ext.MessageBox.confirm(boxWarnning,info,function(e) { 																				
							if( e == 'yes' ){
								var form=numGrid.up('panel').up('panel').down('form').getForm();
      							var param=form.getValues();
//								var param=numGrid.store.proxy.extraParams;
      							param['domainUuid'] = domainUuid;
      							param['ids'] = ids;
      							param['staticFlag'] = staticFlag;
      							
      							var boxObj = {
      	               		    		title:boxInfo,
      	               		    		width : 300,
      	               		    		msg:boxWaitMsg,
      	               		    		modal:true,
      	               		    		closable:false,
      	               		    		wait:true
      	               		    };
      	               			var msg = Ext.MessageBox.show(boxObj);
      							
								Ext.Ajax.request({
									url:'exportConfig!exportBlackWhite.action',
									method:'POST',
									timeout:60*60*1000,
									params:param,
									callback: function (options, success, response) {
									boxObj.wait = false;
	               					msg.hide();
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
	       							
	       			}else{
	       				Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
	       				return;
	       			}
      	 		}
      	 	}
      	 
      	 });
		var sel = Ext.create('Ext.button.Button',{
      		 xtype:'button',
      		 text: 'Select All',
      		 iconCls: 'selectAll',
      		ulan:'btSelectAll',
      		 flag:"domain_read",
      		selectAll:0,
      		 listeners:{
      			 click:function(){
      		 		if(numGrid.selectAll==1){      		 			
      		 			numGrid.selectAll=0;
      		 			numGrid.selModel.setLocked(false);
      		 			numGrid.getSelectionModel().deselectAll();
      		 			this.setIconCls('selectOut');
      		 		}else{
       		 			this.setIconCls('selectIn');
	       		 		numGrid.selectAll=1;
	       		 		numGrid.getSelectionModel().selectAll();
	       		 		numGrid.selModel.setLocked(true);
      		 		}
      		 	}
      		 }
      	 });
		var clear = Ext.create('Ext.button.Button',{
    		text:'Clean',
    		ulan:'btCleanAll',
    		iconCls:'option',
    		listeners:{ 
    			click: function() {
					var domainUuid = numGrid.domainUuid;
					if(!domainUuid){
						domainUuid = Ext.get("domainUuid").value;
					}
					var actionStatus = 22;
					var params = {domainUuid:domainUuid,actionStatus:actionStatus};
		        	var ActionFunction = Ext.getCmp('ActionFunction');
		        	if(ActionFunction == undefined){
		        		ActionFunction = Ext.create('app.util.ActionFunction',{});
		        	}
		        	ActionFunction.actionProc(numGrid.getStore(),'numManager!clearAll.action',params);
    				}		
    		}							
    	});
		var clearDnumInfect = Ext.create('Ext.button.Button',{
    		text:'Clean Infected',
    		ulan:'btCleanInfect',
    		iconCls:'option',
    		listeners:{ 
    			click: function() {
					var domainUuid = numGrid.domainUuid;
					if(!domainUuid){
						domainUuid = Ext.get("domainUuid").value;
					}
					var actionStatus = 24;
					var params = {domainUuid:domainUuid,actionStatus:actionStatus};
		        	var ActionFunction = Ext.getCmp('ActionFunction');
		        	if(ActionFunction == undefined){
		        		ActionFunction = Ext.create('app.util.ActionFunction',{});
		        	}
		        	ActionFunction.actionProc(numGrid.getStore(),'numManager!clearDnumInfect.action',params);
    				}		
    		}							
    	});
		var refresh = Ext.create("Ext.button.Button",{
     		 xtype:'button',
      		 text:'Refresh',
      		ulan:'btRefresh',
      		 iconCls:'refresh2',
      		 listeners:{
      		 	click:function(){
					this.up('panel').down('panel[itemId=numGrid]').getStore().load();
      	 		}
      	 	}
      	 });
		var search = Ext.create("Ext.button.Button",{
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
		});
		
		var tbar = [];
		if(!maintenance){
			if(type == "s"){
				tbar.push(add);
				tbar.push('-')
				tbar.push(del);
				tbar.push('-');
				tbar.push(set);
				tbar.push('-');
			}else{
				tbar.push(clear);
				tbar.push('-');
				tbar.push(del);
				tbar.push('-');
//				tbar.push(clearDnumInfect);
//				tbar.push('-');
				tbar.push(moveDtoS);
				tbar.push('-');
			}
		}
		tbar.push(importC);
		tbar.push('-');
		tbar.push(exportC);
		tbar.push('-');
		tbar.push(sel);
		tbar.push('-');
		tbar.push(refresh);
		tbar.push('->');
		tbar.push(search);
		return tbar;
	},
	createColumns:function(type,numGrid){
		var num = Ext.create("Ext.grid.column.Column",{
			header:"number",
			dataIndex:"number",
			width:150,
			hidden:false
		});
		var numberRole = Ext.create("Ext.grid.column.Column",{
			header:"numberRole",
			dataIndex:"numberRole",
			width:120,
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.getValue('numberRole',value);
			}
		});
		var callCnt = Ext.create("Ext.grid.column.Column",{
			header:"callCnt",
			dataIndex:"callCnt",
			width:120,
			hidden:false
		});
		var lastCallTime = Ext.create("Ext.grid.column.Column",{
			header:"lastCallTime",
			dataIndex:"lastCallTime",
			width:180,
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,store,view){
				if(value=="" || value=="null"){
					return "";
				}
				return rs.timeFormat(value);
			}
		});
		var createTime = Ext.create("Ext.grid.column.Column",{
			header:"createTime",
			dataIndex:"createTime",
			width:180,
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,store,view){
				
				if(value=="" || value=="null" ){
					return "";
				}
				return rs.timeFormat(value);
			}
		});
		var expireTime = Ext.create("Ext.grid.column.Column",{
			header:"expireTime",
			dataIndex:"expireTime",
			width:180,
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,store,view){
				var type=record.get('type');
				var createTime=record.get('createTime');
				var expireTime=this.up('panel').up('panel').up('panel').up('panel').down('form').getForm().findField('numberExpireTime').getValue();
				if(type!=1 || expireTime==0 || createTime==""){
					return "-";
				}
				var valueD = rs.getDate(createTime);
				var da = new Date(valueD);
				var off = valueD.getTimezoneOffset();
				da.setHours(parseInt(expireTime)+da.getHours()-off/60)
				var va = Ext.Date.format(da,"Y-m-d H:i:s");
				
				return va;
			}
		});
		var getNumType = this.getNumType;
		var numType = Ext.create("Ext.grid.column.Column",{
			header:"Type",
			dataIndex:"type",
			width:120,
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,store,view){
//				return rs.getValue('num',value);
				return getNumType(value,metaData,record,rowIndex,store,view,type);
			}
		});
		var srcIp = Ext.create("Ext.grid.column.Column",{
			header:"srcIp",
			dataIndex:"srcIp",
			width:120,
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,store,view){
				if(value=="" || value=="null"){
					return "";
				}
				return value;
			}
		});
		var dynamicWeight = Ext.create("Ext.grid.column.Column",{
			header:"dynamicWeight",
			dataIndex:"dynamicWeight",
			width:120,
			hidden:true
		});
		var uuid = Ext.create("Ext.grid.column.Column",{
			header:"uuid",
			dataIndex:"uuid",
			width:50,
			hidden:true
		});
		var infect = Ext.create("Ext.grid.column.Column",{
			header:"Infected",
			ulan:"infected",
			dataIndex:"blackInfectedFlag",
			width:50,
			renderer: function(value,metaData,record,rowIndex,store,view){
//				if(value=="" || value=="null"){
//					return "";
//				}
				if(!value) value=0;
				return rs.yesOrNo(value);
			}
		});
		var valid = Ext.create("Ext.grid.column.Column",{
			header:"Conflict",
			dataIndex:"invalidFlag",
			width:50,
			ulan:'conflict',
			hidden:true,
			renderer: function(value,metaData,record,rowIndex,store,view){
//				if(value=="" || value=="null"){
//					return "";
//				}
				if(!value) value=0;
				var ret=rs.yesOrNo(value);
				if(value==1){
					ret="<font color=red>"+ret+"</font>";
				}else{
//					ret="<font color=green>"+ret+"</font>";
				}
				return ret;
			}
		});
		var columns = [uuid];
		
		columns.push(numType);
//		if(type == "s"){
		columns.push(numberRole);
//		}
		columns.push(num);
		if(type != "s"){
			columns.push(infect);
		}
		columns.push(valid);
		columns.push(callCnt);
		if(type != "s"){
			columns.push(createTime);
			columns.push(expireTime);
		}
		columns.push(lastCallTime);
		columns.push(srcIp);
		if(type != "s"){
			columns.push(dynamicWeight);
		}
		return columns;
	},
	getNumType:function(value,metaData,record,rowIndex,store,view,flag){
		var color = 'black';
		var level = value;

		var gray = "#BDBDBD",green = "#006400",blue = "#3665CD";orange = "#FE6400"
			,red = "#CA0032",black='black',white="white";
		if(level==1){
			
		}else if(level==2){
			color = white;
		}else if(level==3){
			color = gray;
		}else{
			color = gray;
		}
		removeCSSRule(styleSheet,'.alarm_'+flag+rowIndex+'::before');
		var content = "";
		var obj = {width:13,height:13,lineHeight:13,color:color
				,textAlign:'center',content:content,border:"1px solid black"};
		setPseudo3(styleSheet,'.alarm_'+flag+rowIndex+'::before',obj);
		var tmp = '<span class=alarm_'+flag+rowIndex+'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'
//		+rs.getValue('num',value);
		return tmp;
	}
});