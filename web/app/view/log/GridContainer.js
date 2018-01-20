Ext.define('app.view.log.GridContainer',{
	extend:'Ext.tab.Panel',
	layout:'fit',
	needChange:'true',
	border:false,
	hidden:true,
	bodyStyle: {
		background: '#DFE9F6',
	},
	initComponent: function(){
		var id = this.id;
		
		var node = "domain";
		if(roleType.isSuper(Ext.get("roleId").value)){
			node = "super";
		}
		var arr = new Array();
		var userGrid = Ext.create("app.view.log.LogGrid",{title:lanControll.getLanValue('tiUserLog'),node:node});
		userGrid.addListener("afterlayout",function(){
			privilege.procPrivilege(userGrid);
		},this,{single:true});
				
		var runGrid = Ext.create("app.view.log.RunLogGrid",{title:lanControll.getLanValue('tiRunLog')});
		runGrid.addListener("afterlayout",function(){
			privilege.procPrivilege(runGrid);
		},this,{single:true});
		
		var tab4 = Ext.create("app.view.module.AlarmPanel",{
			createDesc:'current',
			nodeDesc:'domain',
//			id:'domainCurrentAlarmPanel'
		});
		var tab3 = Ext.create("app.view.module.AlarmLogPanel",{
			createDesc:'history',
			nodeDesc:'domain',
//			id:'domainHistoryAlarmPanel'
		});
//		var tab5 = Ext.create("app.view.module.DomainDescPanel",{
//		});
//		if(id.indexOf('domain')==0){
//			arr.push(tab5);
//		}
		if(id.indexOf('fcloud')==0 || id.indexOf('domain')==0
				 || id.indexOf('system')==0  || id.indexOf('bk')==0
				 || id.indexOf('gw')==0  || id.indexOf('tg')==0
				 || id.indexOf('ag')==0){
			arr.push(tab4);
			arr.push(tab3);
		}

		if(id.indexOf('fcloud')==0 || id.indexOf('domain')==0
				|| id.indexOf('bk')==0
				|| id.indexOf('gw')==0  || id.indexOf('tg')==0
				|| id.indexOf('ag')==0){
			arr.push(runGrid);
			arr.push(userGrid);
		}
        this.items=arr;
        this.initTabNum = arr.length;
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