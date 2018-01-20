Ext.define('app.view.privilege.PrivilegeTabPanel',{
	extend:'Ext.tab.Panel',
	layout:'fit',
	border:false,
	needChange:'true',
//	itemId:'privilegeTabPanel',
	bodyStyle: {
		background: '#DFE9F6',
	},
	initComponent: function(){
		var node = this.node;
		var roleId = this.roleId;
		var userGrid = Ext.create("app.view.privilege.UserGrid",{node:node});
		userGrid.addListener("afterlayout",function(){
			privilege.procPrivilege(userGrid);
		},this,{single:true});
		var roleGrid = Ext.create("app.view.privilege.RoleGrid",{
			roleId:roleId
		});
		roleGrid.addListener("afterlayout",function(){
			privilege.procPrivilege(roleGrid);
		},this,{single:true});
		var mailGrid = Ext.create("app.view.privilege.MailGrid",{
			roleId:roleId
		});
		mailGrid.addListener("afterlayout",function(){
			privilege.procPrivilege(mailGrid);
		},this,{single:true});
        this.items=[userGrid,roleGrid,mailGrid
                    ];
		for(var i=0;i<this.items.length;i++){
			lanControll.setLan(this.items[i]);
		}
		this.callParent(arguments);	
	},
	listeners:{			
		tabchange:function(tabPanel,newTab,oldTab,obj){
			controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
		}
	}
	
	
});