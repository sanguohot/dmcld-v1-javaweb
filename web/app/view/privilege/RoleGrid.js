Ext.define('app.view.privilege.RoleGrid',{
	extend:'Ext.grid.Panel',
	requires: [
              'Ext.util.Format',
              'Ext.grid.Panel',
              'Ext.toolbar.Paging',
	           ],
	title:'',
	layout:'border',
	treeId:'',
	store:null,
	border:false,
	itemId:'roleGrid',
	columnLines:true,
	viewConfig: {
		loadMask:{
			msg:lanControll.getLanValue('maskMsg')
		},
		enableTextSelection: true
	},
	store: null,
	title:lanControll.getLanValue('tiRole'),
//	selModel: Ext.create('Ext.selection.CheckboxModel',{injectCheckbox:1}),//Ext.create('Ext.selection.CheckboxModel'),
	initComponent: function() {
		this.createTbar();
		this.createColumns();
		var store = Ext.create("app.store.privilege.RoleStore");
		store.getProxy().url = "roleManager!getList2.action";
		store.getProxy().setReader({
            type: 'json',
            root: 'roleList2'
		});
		this.store = store;
		this.callParent(arguments);		
	},
	createColumns:function(){
		var columns = [];
		var uuid = Ext.create("Ext.grid.column.Column",{
			header:"uuid",
			dataIndex:"uuid",
			width:50,
			align:'center',
			hidden:true
		});
		var name = Ext.create("Ext.grid.column.Column",{
			header:"Role",
			dataIndex:"name",
			ulan:'roleName',
			width:150,
			align:'center',
			locked:true,
			hidden:false
		});
		var roleId = Ext.create("Ext.grid.column.Column",{
			header:"Role ID",
			dataIndex:"roleId",
			width:70,
			align:'center',
			hidden:true
		});
		var rightSpecialFinance = Ext.create("Ext.grid.column.Column",{
			header:"Finance",
			dataIndex:"rightSpecialFinance",
			width:50,
			align:'center',
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.getPrivilegeImg(value);
			}
		});
		var rightModuleConfiguration = Ext.create("Ext.grid.column.Column",{
			header:"Configuration",
			dataIndex:"rightModuleConfiguration",
			width:80,
			align:'center',
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.getPrivilegeImg(value);
			}
		});
		var rightModuleMaintenance = Ext.create("Ext.grid.column.Column",{
			header:"Maintenance",
			dataIndex:"rightModuleMaintenance",
			width:80,
			align:'center',
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.getPrivilegeImg(value);
			}
		});
		var rightModulePerformance = Ext.create("Ext.grid.column.Column",{
			header:"Performance",
			dataIndex:"rightModulePerformance",
			width:80,
			align:'center',
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.getPrivilegeImg(value);
			}
		});
		var rightModuleLog = Ext.create("Ext.grid.column.Column",{
			header:"Log",
			dataIndex:"rightModuleLog",
			width:75,
			align:'center',
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.getPrivilegeImg(value);
			}
		});
		var rightModuleVersion = Ext.create("Ext.grid.column.Column",{
			header:"Version",
			dataIndex:"rightModuleVersion",
			width:75,
			hidden:false,
			align:'center',
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.getPrivilegeImg(value);
			}
		});
		var rightModuleProvision = Ext.create("Ext.grid.column.Column",{
			header:"Provision",
			dataIndex:"rightModuleProvision",
			width:75,
			hidden:false,
			align:'center',
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.getPrivilegeImg(value);
			}
		});
		
		var rightModuleSystem = Ext.create("Ext.grid.column.Column",{
			header:"System",
			dataIndex:"rightModuleSystem",
			width:75,
			hidden:false,
			align:'center',
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.getPrivilegeImg(value);
			}
		});
		var rightModuleLicense = Ext.create("Ext.grid.column.Column",{
			header:"License",
			dataIndex:"rightModuleLicense",
			width:75,
			hidden:false,
			align:'center',
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.getPrivilegeImg(value);
			}
		});
		var rightModulePrivilege = Ext.create("Ext.grid.column.Column",{
			header:"Privilege",
			dataIndex:"rightModulePrivilege",
			width:75,
			hidden:false,
			align:'center',
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.getPrivilegeImg(value);
			}
		});
		var rightModuleBatch = Ext.create("Ext.grid.column.Column",{
			header:"Batch",
			dataIndex:"rightModuleBatch",
			width:75,
			hidden:false,
			align:'center',
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.getPrivilegeImg(value);
			}
		});
		
		var rightSuperRead = Ext.create("Ext.grid.column.Column",{
			header:"Super Read",
			dataIndex:"rightSuperRead",
			width:75,
			hidden:false,
			align:'center',
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.getPrivilegeImg(value);
			}
		});
		var rightSuperEdit = Ext.create("Ext.grid.column.Column",{
			header:"Super Edit",
			dataIndex:"rightSuperEdit",
			width:75,
			align:'center',
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.getPrivilegeImg(value);
			}
		});
		var rightSuperAction = Ext.create("Ext.grid.column.Column",{
			header:"Super Action",
			dataIndex:"rightSuperAction",
			width:85,
			hidden:false,
			align:'center',
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.getPrivilegeImg(value);
			}
		});
		var rightDomainRead = Ext.create("Ext.grid.column.Column",{
			header:"Domain Read",
			dataIndex:"rightDomainRead",
			width:80,
			align:'center',
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.getPrivilegeImg(value);
			}
		});
		var rightDomainEdit = Ext.create("Ext.grid.column.Column",{
			header:"Domain Edit",
			dataIndex:"rightDomainEdit",
			width:80,
			align:'center',
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.getPrivilegeImg(value);
			}
		});
		var rightDomainAction = Ext.create("Ext.grid.column.Column",{
			header:"Domain Action",
			dataIndex:"rightDomainAction",
			width:90,
			hidden:false,
			align:'center',
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.getPrivilegeImg(value);
			}
		});
		var rightDeviceAction = Ext.create("Ext.grid.column.Column",{
			header:"Device Action",
			dataIndex:"rightDeviceAction",
			width:90,
			align:'center',
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.getPrivilegeImg(value);
			}
		});
		var rightSimAction = Ext.create("Ext.grid.column.Column",{
			header:"SIM Action",
			dataIndex:"rightSimAction",
			width:75,
			align:'center',
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.getPrivilegeImg(value);
			}
		});
		var rightApiAction = Ext.create("Ext.grid.column.Column",{
			header:"API Action",
			dataIndex:"rightApiAction",
			width:75,
			align:'center',
			hidden:false,
			renderer: function(value,metaData,record,rowIndex,store,view){
				return rs.getPrivilegeImg(value);
			}
		});
		var detailDesc = Ext.create("Ext.grid.column.Column",{
			header:"Description",
			dataIndex:"detailDesc",
			flex:1,
			minWidth:150,
			hidden:true
		});
		var grid = this;
		var edit = Ext.create("Ext.grid.column.Column",{
			header:"Setting",
			align:"center",
			ulan:'btSetting',
			width:60,
			autoWidth:false,
			hidden:false,
			locked:true,
			renderer: function(value,metaData,record,rowIndex,colIndex,store,view){
				var srcRoleId = grid.roleId?grid.roleId:Ext.get("roleId").value;
				var flag = privilege.procPrivilegeEdit(srcRoleId,record.get("roleId"));
				if(flag){
					return "<input align='middle' style='width:80%;color:green;'" +
					" type='button' value="+lanControll.getLanValue('btEdit')+">";
				}else{
					return "<input align='middle' style='width:80%;'" +
					" type='button' disabled='disabled' value="+lanControll.getLanValue('btEdit')+">";
				}
			}
		});
		var role=Ext.get("roleId").value;
//		console.log(this.roleId)
		if(this.roleId){
			role = this.roleId;
		}
		var isSuper = roleType.isSuper(role);
		
		columns.push(edit);
		columns.push(name);
		columns.push(uuid);
		columns.push(roleId);
		if(isSuper){
			columns.push(rightSpecialFinance);
		}
		if(isSuper){
			columns.push(rightModuleProvision);
			columns.push(rightModuleSystem);
		}
		if(isSuper){
			columns.push(rightSuperRead);
			columns.push(rightSuperEdit);
			columns.push(rightSuperAction);
		}
		columns.push(rightModuleConfiguration);
		columns.push(rightModuleMaintenance);
		columns.push(rightModulePerformance);
		columns.push(rightModuleLog);
		columns.push(rightModuleVersion);

		columns.push(rightModuleLicense);
		columns.push(rightModulePrivilege);
		columns.push(rightModuleBatch);

		columns.push(rightDomainRead);
		columns.push(rightDomainEdit);
		columns.push(rightDomainAction);
		columns.push(rightDeviceAction);
		columns.push(rightSimAction);
		columns.push(rightApiAction);
		columns.push(detailDesc);
		
		this.columns = columns;
	},
	createTbar:function(){
		var tbar = [];
		var refresh = Ext.create("Ext.button.Button",{
      		 xtype:'button',
       		 text:'Refresh',
       		ulan:'btRefresh',
       		 iconCls:'refresh2',
       		 listeners:{
       		 	click:function(){
					this.up('panel[itemId=roleGrid]').getStore().load();
       	 		}
       	 	}
       	});
		tbar.push(refresh);
		this.tbar = tbar;
	},
	loadFlag:true,
	listeners: {
		itemclick:function(view, record, item, index, e, eOpts ){
			if(e.getTarget().style.color == 'green'){
				var win = Ext.create("app.view.privilege.EditPrivilege");				
				var roleId = record.get("roleId");
				win.down("hiddenfield[name=roleId]").setValue(roleId);
				win.proc(this.store);
				lanControll.setLan(win);
				var rightSpecialFinance = record.get("rightSpecialFinance");
				var rightModuleConfiguration = record.get("rightModuleConfiguration");
				var rightModuleMaintenance = record.get("rightModuleMaintenance");
				var rightModulePerformance = record.get("rightModulePerformance");
				var rightModuleLog = record.get("rightModuleLog");
				var rightModuleVersion = record.get("rightModuleVersion");
				var rightModuleProvision = record.get("rightModuleProvision");
				var rightModuleSystem = record.get("rightModuleSystem");
				var rightModuleLicense = record.get("rightModuleLicense");
				var rightModulePrivilege = record.get("rightModulePrivilege");
				var rightModuleBatch = record.get("rightModuleBatch");
				var rightSuperRead = record.get("rightSuperRead");
				var rightSuperEdit = record.get("rightSuperEdit");
				var rightSuperAction = record.get("rightSuperAction");
				var rightDomainRead = record.get("rightDomainRead");
				var rightDomainAction = record.get("rightDomainAction");
				var rightDomainEdit = record.get("rightDomainEdit");
				var rightDeviceAction = record.get("rightDeviceAction");
				var rightSimAction = record.get("rightSimAction");
				var rightApiAction = record.get("rightApiAction");
				
				if(win.down("checkbox[name=rightSpecialFinance]"))
				win.down("checkbox[name=rightSpecialFinance]").setValue(rightSpecialFinance);
				
				if(win.down("checkbox[name=rightModuleConfiguration]"))
				win.down("checkbox[name=rightModuleConfiguration]").setValue(rightModuleConfiguration);
				
				if(win.down("checkbox[name=rightModuleMaintenance]"))
				win.down("checkbox[name=rightModuleMaintenance]").setValue(rightModuleMaintenance);
				
				if(win.down("checkbox[name=rightModulePerformance]"))
				win.down("checkbox[name=rightModulePerformance]").setValue(rightModulePerformance);
				
				if(win.down("checkbox[name=rightModuleLog]"))
				win.down("checkbox[name=rightModuleLog]").setValue(rightModuleLog);
				
				if(win.down("checkbox[name=rightModuleVersion]"))
				win.down("checkbox[name=rightModuleVersion]").setValue(rightModuleVersion);
				
				if(win.down("checkbox[name=rightModuleProvision]"))
				win.down("checkbox[name=rightModuleProvision]").setValue(rightModuleProvision);
				
				if(win.down("checkbox[name=rightModuleSystem]"))
				win.down("checkbox[name=rightModuleSystem]").setValue(rightModuleSystem);
				
				if(win.down("checkbox[name=rightModuleLicense]"))
				win.down("checkbox[name=rightModuleLicense]").setValue(rightModuleLicense);
				
				if(win.down("checkbox[name=rightModulePrivilege]"))
				win.down("checkbox[name=rightModulePrivilege]").setValue(rightModulePrivilege);
				
				if(win.down("checkbox[name=rightModuleBatch]"))
					win.down("checkbox[name=rightModuleBatch]").setValue(rightModuleBatch);
				
				if(win.down("checkbox[name=rightSuperRead]"))
				win.down("checkbox[name=rightSuperRead]").setValue(rightSuperRead);
				
				if(win.down("checkbox[name=rightSuperEdit]"))
				win.down("checkbox[name=rightSuperEdit]").setValue(rightSuperEdit);
				
				if(win.down("checkbox[name=rightSuperAction]"))
				win.down("checkbox[name=rightSuperAction]").setValue(rightSuperAction);
				
				if(win.down("checkbox[name=rightDomainRead]"))
				win.down("checkbox[name=rightDomainRead]").setValue(rightDomainRead);
				
				if(win.down("checkbox[name=rightDomainAction]"))
				win.down("checkbox[name=rightDomainAction]").setValue(rightDomainAction);
				
				if(win.down("checkbox[name=rightDomainEdit]"))
				win.down("checkbox[name=rightDomainEdit]").setValue(rightDomainEdit);
				
				if(win.down("checkbox[name=rightDeviceAction]"))
				win.down("checkbox[name=rightDeviceAction]").setValue(rightDeviceAction);
				
				if(win.down("checkbox[name=rightSimAction]"))
				win.down("checkbox[name=rightSimAction]").setValue(rightSimAction);
				
				if(win.down("checkbox[name=rightApiAction]"))
				win.down("checkbox[name=rightApiAction]").setValue(rightApiAction);
				
				
				win.down('form').cbStore = this.store;
				win.show();
			}else{
				return;
			}
		},
		beforeshow:function(){
			if(this.loadFlag){
				this.store.load();
				this.loadFlag = false;
			}
		}
	}
})