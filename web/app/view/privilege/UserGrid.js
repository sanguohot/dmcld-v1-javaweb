Ext.define('app.view.privilege.UserGrid',{
	extend:'Ext.panel.Panel',
	 requires: [
              'Ext.util.Format',
              'Ext.grid.Panel',
              'Ext.toolbar.Paging',
              'app.store.log.LogStore'
	           ],
	title:lanControll.getLanValue('tiUserList'),
	layout:'border',
	treeId:'',
	store:null,
	border:false,
	node:null,
	createColumns:function(){
		var columns = [];		
		var uuid = Ext.create("Ext.grid.column.Column",{
			header:"uuid",
			dataIndex:"uuid",
			width:120,
			hidden:true
		});
		var sysName = Ext.create("Ext.grid.column.Column",{
			header:"Sys Name",
			dataIndex:"sysName",
			ulan:'sysName',
			width:150,
			hidden:true
		});
		var domainName = Ext.create("Ext.grid.column.Column",{
			header:"Domain Name",
			dataIndex:"domainName",
			ulan:'domainName',
			width:150,
			hidden:false
		});
		var name = Ext.create("Ext.grid.column.Column",{
			header:"User Name",
			dataIndex:"name",
			ulan:'userName',
			width:150,
			hidden:false
		});
		var roleName = Ext.create("Ext.grid.column.Column",{
			header:"Role",
			dataIndex:"roleName",
			width:150,
			hidden:false
		});
		var email = Ext.create("Ext.grid.column.Column",{
			header:"Email",
			dataIndex:"email",
			width:150,
			hidden:false
		});
		var phone = Ext.create("Ext.grid.column.Column",{
			header:"Phone",
			dataIndex:"phone",
			width:150,
			hidden:false
		});
		var address = Ext.create("Ext.grid.column.Column",{
			header:"Address",
			dataIndex:"address",
			width:150,
			hidden:false
		});
		var detailDesc = Ext.create("Ext.grid.column.Column",{
			header:"Description",
			dataIndex:"detailDesc",
			flex:1,
			minWidth:150,
			hidden:true
		});
		var node = this.node;
		var srcRoleId = Ext.get("roleId").value;
		if(roleType.isSuper(srcRoleId) && node=="domain"){
			srcRoleId = roleType.getDomainAdmin();
		}
		var edit = Ext.create("Ext.grid.column.Column",{
			header:"Setting",
			align:"center",
			width:60,
			autoWidth:false,
			sortable:false,
//			locked:true,
			ulan:'btSetting',
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,store,view){
				
//				var flag = privilege.procRoleEdit(srcRoleId,record.get("roleId"),record.get('type'));
//				if(flag){
					return "<input align='middle' style='width:80%;color:green;'" +
					" type='button' value='"+lanControll.getLanValue('btEdit')+"'>";
//				}else{
//					return "<input align='middle' style='width:40%;'" +
//					" type='button' disabled='disabled' value='"+lanControll.getLanValue('btEdit')+"'>";
//				}
			}
		});
		var role=Ext.get("roleId").value;
		var isSuper = roleType.isSuper(role);
		columns.push(uuid);
		columns.push(sysName);
		columns.push(domainName);
		columns.push(name);
		columns.push(roleName);
		columns.push(email);
		columns.push(phone);
		columns.push(address);
		columns.push(detailDesc);
		columns.push(edit);
		
		return columns;
	},
	initComponent: function() {
		var userStore=Ext.create('app.store.operation.user.UserListStore',{});
		userStore.getProxy().url = "userListManager!getList.action";
		userStore.getProxy().setReader({
            type: 'json',
            root: 'userList2'
		});
		this.store = userStore;
		var sm = Ext.create('Ext.selection.CheckboxModel');
		var node = this.node;
		var srcRoleId = Ext.get("roleId").value;
		var userGrid = Ext.create('Ext.grid.Panel', {
			border:false,
			itemId:'userGrid',
			columnLines:true,
			store: userStore, 
			selModel: sm,
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			columns: this.createColumns(),
		dockedItems:[{
		     dock: 'bottom',
			 xtype: 'pagingtoolbar',
		     store: userStore,
		     pageSize: 25,
		     displayInfo: true,
		}	 	
		],
		listeners: {
            itemdblclick:function(view, record, item, index, e, eOpts ){
                    var uuid = record.get("uuid");
                    var win = Ext.create("app.view.privilege.EditUser",{userStore:userStore});
                    var flag = privilege.procRoleEdit(srcRoleId,record.get("roleId"),record.get('type'));
                    if(flag){
                        win.down("combo[name=roleId]").setVisible(true);
                    }else{
                        win.down("combo[name=roleId]").setVisible(false);
                    }
                    lanControll.setLan(win);
                    win.down("hiddenfield[name=uuid]").setValue(uuid);
                    var combo = win.down("combo[name=roleId]");
                    combo.store.getProxy().url = "roleManager!getList5.action";
                    if(roleType.isSuper(srcRoleId) && node=="domain"){
                        var tmp = roleType.getDomainAdmin();
                        var params = { roleId:tmp};
                        Ext.apply(combo.store.proxy.extraParams, params);
                    }
                    combo.store.on("load",function(){
                        combo.setValue(record.get("roleId"));
//						if(roleType.isDomainAdmin(srcRoleId)){
//							var rec = combo.store.findRecord('roleId',roleType.getDomainAdmin());
//							combo.store.remove(rec);
//						}
                        win.down("hiddenfield[name=domainUuid]").setValue(record.get("domainUuid"));
                        win.down("form").userStore = userStore;
                        win.show();
                    },this,{single:true});
                    combo.store.load();
            },
			itemclick:function(view, record, item, index, e, eOpts ){
				if(e.getTarget().style.color == 'green'){
					var uuid = record.get("uuid");
					var win = Ext.create("app.view.privilege.EditUser",{userStore:userStore});
					var flag = privilege.procRoleEdit(srcRoleId,record.get("roleId"),record.get('type'));
					if(flag){
						win.down("combo[name=roleId]").setVisible(true);
					}else{
						win.down("combo[name=roleId]").setVisible(false);
					}
					lanControll.setLan(win);
					win.down("hiddenfield[name=uuid]").setValue(uuid);
					var combo = win.down("combo[name=roleId]");
					combo.store.getProxy().url = "roleManager!getList5.action";
					if(roleType.isSuper(srcRoleId) && node=="domain"){
						var tmp = roleType.getDomainAdmin();
						var params = { roleId:tmp};
						Ext.apply(combo.store.proxy.extraParams, params);
					}
					combo.store.on("load",function(){
						combo.setValue(record.get("roleId"));
//						if(roleType.isDomainAdmin(srcRoleId)){
//							var rec = combo.store.findRecord('roleId',roleType.getDomainAdmin());
//							combo.store.remove(rec);
//						}
						win.down("hiddenfield[name=domainUuid]").setValue(record.get("domainUuid"));
						win.down("form").userStore = userStore;
						win.show();
					},this,{single:true});
					combo.store.load();

				}else{
					return;
				}
			}
		}
	});
		
		var add = Ext.create('Ext.button.Button',{
    		xtype:'button',
    		text: 'Add User',
    		ulan:'btAdd',
    		iconCls:'add',
    		listeners:{ 
    			click: function() {
					var domainUuid = userGrid.domainUuid;
//					if(!domainUuid){
//						domainUuid = Ext.get("domainUuid").value;
//					}
					var addUser =Ext.getCmp('addUser'); 
					if(addUser==null || addUser==undefined){
						addUser=Ext.create('app.view.user.AddUser',{});
						lanControll.setLan(addUser);
					}
					addUser.down('form').userStore = userStore;
					addUser.down('form').getForm().findField('domainUuid').setValue(domainUuid);
					var store = addUser.down("combo[name=roleId]").store;
					if(roleType.isSuper(srcRoleId) && node=="domain"){
						var tmp = roleType.getDomainAdmin();
						var params = { roleId:tmp};
						Ext.apply(store.proxy.extraParams, params);
					}else{
						var params = { roleId:0};
						Ext.apply(store.proxy.extraParams, params);
					}
					store.getProxy().url = "roleManager!getList3.action";
					store.load();
					addUser.show();
    			}						
    		}
    	});

		var del = Ext.create('Ext.button.Button',{
    		text:'Delete User',
    		ulan:'btDel',
    		iconCls:'remove',
    		listeners:{ 
    			click: function() {
    					if ( userGrid.getSelectionModel().hasSelection() ){
    						Ext.MessageBox.confirm(boxWarnning,boxDelUser,function(e) { 																				
    								if( e == 'yes' ){
										var records = userGrid.getSelectionModel().getSelection();
										var ids="";
										var cnt=0;
										var name = "";
										for ( var i = 0; i < records.length; i++) {
											if(roleType.isSuperAdmin(records[i].get('roleId'))){
												Ext.MessageBox.alert(boxPromotion,boxDelSuperAdmin);
												return;
											}
											if(records[i].get('type')=='1'){
												Ext.MessageBox.alert(boxPromotion,boxDelDefAdmin);
												return;
											}
											
											if(i==0){
												ids=records[i].get('uuid');
												name=records[i].get('name');
											}else {
												cnt=1;
												ids=ids+"-"+records[i].get('uuid');
											}
											
//											userStore.remove(records[i]);
										}
										Ext.Ajax.request({
					                		url:'userManager!deleteUser.action?ids='+ids+'&name='+name,
					                		method:'POST',
					                		callback: function (options, success, response) {
						                    var obj=Ext.JSON.decode(response.responseText);			
					                    		if(obj['success']){
					                    			Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
						                    		userGrid.getStore().load();
						                    	}else{
						                    		Ext.MessageBox.alert(boxFailture,boxDelFail);
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
		var reset = Ext.create('Ext.button.Button',{
    		text:'Restore Default Password',
    		ulan:'btRestoreDefaultPwd',
    		iconCls:'option',
    		listeners:{ 
    			click: function() {
    					if ( userGrid.getSelectionModel().hasSelection() ){
    						Ext.MessageBox.confirm(boxWarnning,boxResetUserPwd,function(e) { 																				
    								if( e == 'yes' )
    								{
										var records = userGrid.getSelectionModel().getSelection();
										if(records.length>1 || records.length==0){
											Ext.MessageBox.alert(boxWarnning,boxOnlyOneRecord);
											return;
										}
										var uuid=records[0].get('uuid');
										var domainUuid=records[0].get('domainUuid');
										var name=records[0].get('name');
										Ext.Ajax.request({
					                		url:'userManager!resetUserPwd.action?uuid='+uuid+"&domainUuid="+domainUuid+"&name="+name,
					                		method:'POST',
					                		callback: function (options, success, response) {
				                    			var obj=Ext.JSON.decode(response.responseText);			
				        			            if(obj['success']){
						                    		Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
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
		
		var restore = Ext.create('Ext.button.Button',{
            text: 'Modify Password',
            ulan:'btModifyPwd',
            iconCls:'restore_pwd',
            handler: function() {
	    		var records = userGrid.getSelectionModel().getSelection();
				var ids="";
				if(records.length==0 || records.length>1){
					Ext.MessageBox.alert(boxWarnning,boxOnlyOneRecord);
					return;
				}
				
				
				var uuid=records[0].get('uuid');
				var name=records[0].get('name');
                var pwdPanel=Ext.getCmp('updateUserPwd');
                if(pwdPanel==undefined || pwdPanel=='undefined'){
                	pwdPanel=Ext.create('app.view.user.UpdateUserPwd',{});
                	lanControll.setLan(pwdPanel);
                	
                }
                pwdPanel.down('form').getForm().reset();
                pwdPanel.down('form').getForm().findField('domainUuid').setValue(records[0].get('domainUuid'));
                pwdPanel.down('form').getForm().findField('uuid').setValue(uuid);
                pwdPanel.down('form').getForm().findField('name1').setValue(name);
                pwdPanel.show();
            }
    	});
		
		var sendMail = Ext.create('Ext.button.Button',{
            text: 'Send Mail',
            ulan:'btSendMail',
            iconCls:'mai    l_small',
            handler: function() {
	    		var records = userGrid.getSelectionModel().getSelection();
				var ids="";
				if(userGrid.getSelectionModel().hasSelection()){
					var uuid=records[0].get('uuid');
					var name=records[0].get('name');
					var mails=records[0].get('email');
					var domainUuids=records[0].get('domainUuid');
	               
					for ( var i = 0; i < records.length; i++) {
						
						if(i==0){
							domainUuids=records[i].get('domainUuid');
							mails=records[i].get('email')+";";
						}else {
							domainUuids=domainUuids+","+records[i].get('domainUuid');
							mails=mails+records[i].get('email')+";";
						}
						
//						userStore.remove(records[i]);
					}
					
					var addMail=Ext.getCmp('addMail');
	                if(addMail==undefined || addMail=='undefined'){
	                	addMail=Ext.create('app.view.common.AddMail',{});
	                	lanControll.setLan(addMail);
	                	
	                }
//	                addMail.down('form').getForm().reset();
	                addMail.down('form').getForm().findField('domainUuids').setValue(domainUuids);
//	                addMail.down('form').getForm().findField('uuid').setValue(uuid);
	                addMail.down('form').getForm().findField('dstAddr').setValue(mails);
	                addMail.show();
				}else{
					Ext.MessageBox.alert(boxWarnning,boxNoRecordSel);
		 			return;
				}
			}
    	});
		
		var syncSupport = Ext.create('Ext.button.Button',{
            text: 'Sync Support',
            ulan:'btSyncSupport',
            iconCls:'synchro',
      		flag:"super_action",
            handler: function() {
				var movePanel = Ext.getCmp('syncSupport');
	   			if(movePanel==undefined|| movePanel=='undefined'){
	   				movePanel=Ext.create('app.view.privilege.SyncSupportPanel',{});
	   				lanControll.setLan(movePanel);
	   			}
	   			Ext.apply(movePanel.store.proxy.extraParams, {cloudUuid:-99});
	   			movePanel.store.load();
				movePanel.show();
			}
    	});
		
		var refresh = Ext.create("Ext.button.Button",{
      		 xtype:'button',
       		 text:'Refresh',
       		ulan:'btRefresh',
       		 iconCls:'refresh2',
       		 listeners:{
       		 	click:function(){
					this.up('panel').down('panel[itemId=userGrid]').getStore().load();
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
		var node = this.node;
		if(node=="super"){
			add.flag = "super_edit";
			del.flag = "super_edit";
			reset.flag = "super_edit";
			restore.flag = "super_edit";
			refresh.flag = "super_read";
			search.flag = "super_read";
			sendMail.flag="super_edit";
		}else{
			add.flag = "domain_edit";
			del.flag = "domain_edit";
			reset.flag = "domain_edit";
			restore.flag = "domain_edit";
			refresh.flag = "domain_read";
			search.flag = "domain_read";
			sendMail.flag="super_edit";
		}
		tbar.push(add);
		tbar.push("-");
		tbar.push(del);
		tbar.push("-");
		tbar.push(reset);
		tbar.push("-");
		tbar.push(restore);
		tbar.push("-");
		if(node=="super"){
			tbar.push(sendMail);
			tbar.push("-");
			var sysMode=Ext.get('sysMode').value;
			var licStatus=Ext.get('licStatus').value;
			if(sysMode==11 && licStatus==10){
				tbar.push(syncSupport);
				tbar.push("-");
			}
		}
		tbar.push(refresh);
		tbar.push("->");
		tbar.push(search);
		this.tbar=tbar;	
		var roleStore = Ext.create('app.store.privilege.RoleStore', {});
		roleStore.getProxy().url = "roleManager!getList.action";
//		alert(srcRoleId+'----'+node)
		if(roleType.isSuper(srcRoleId) && node=="domain"){
			var tmp = roleType.getDomainAdmin();
			var params = { roleId:tmp};
			Ext.apply(roleStore.proxy.extraParams, params);
		}else{
			var params = { roleId:0};
			Ext.apply(roleStore.proxy.extraParams, params);
		}
		var sysStore = Ext.create('app.store.util.ComboxStore',{});
		var sysStore2 = Ext.create('app.store.util.ComboxStore',{});
		sysStore.on('load',function(){
			sysStore2.removeAll();
			for(var i=0; i<sysStore.getCount(); i++){
				sysStore2.add(sysStore.getAt(i));
			}
		});
		
		var search_grid=Ext.create('Ext.form.Panel',{
			border : false,
			bodyPadding : 5,
			defaults : {
			margins : '0 0 10 0',
			labelWidth:100
			},
			items : [{
				name : 'sysUuid',
				xtype: 'combo',
				mode: 'local',
				fieldLabel: 'Current Server',
				displayField: 'name',
				valueField: 'uuid',
				queryMode: 'local',
				store:sysStore2,
				value:"",
				
			},{
				xtype:'textfield',
				fieldLabel:'Domain Name',
				name:'domainName',
			},{
				xtype:'textfield',
				fieldLabel:'User Name',
				name:'userName',
			},{
				xtype:'combo',
				fieldLabel:"Role",
				displayField : 'name',
				valueField : 'roleId',
				name:'roleId1',
				ulan:'roleId',
				editable:false,
				value:"",
				allowBlank:true,
				store : roleStore,				
			},{
				xtype:'textfield',
				fieldLabel:'Email',
				name:'email',
			},{
				xtype:'textfield',
				fieldLabel:'Phone',
				name:'phone',
			}],
			
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
				Ext.apply(userStore.proxy.extraParams, params);				
				this.up('form').up('panel').up('panel').down('pagingtoolbar').moveFirst();
			}
			}]
		});
		if(this.node == "domain"){
			search_grid.remove(0);
		}else{
			search_grid.sysStore = sysStore;
		}
		 this.items=[
		   {
			 region: 'center',
			 layout:'fit',
			 border:false,
			 items:[userGrid]
			       
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
//		 userStore.load();
//		userStore.on('beforeload',function(){
//			searchProc(search_grid,search);
//		})
		this.callParent(arguments);		
	}	
})