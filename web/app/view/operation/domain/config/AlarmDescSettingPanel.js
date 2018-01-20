Ext.define('app.view.operation.domain.config.AlarmDescSettingPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
	treeId:'',
	domainUuid:0,
	userTypeValue:'1',
	alarmDescId:'',
	toolbars:0,
	initComponent: function(){
//		var alarmDescId=this.alarmDescId;
//		var toolbars=this.toolbars;
//		var gridTab=Ext.create('app.view.operation.domain.config.AlarmDescListTab',{
//			id:alarmDescId,
//			toolbars:toolbars,
//			title:lanControll.getLanValue('tiAlarmDesc'),
//			border:false
//		});
//		gridTab.addListener("afterlayout",function(){
//			privilege.procPrivilege(gridTab);
//		},this,{single:true});	
	var gridTab = Ext.create("app.view.module.DomainDescPanel",{
	});
	var cause = Ext.create("app.view.systemconfig.CauseDesc");
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[gridTab,cause],
	   	   	listeners:{			
				tabchange:function(tabPanel,newTab,oldTab,obj){
					controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
				}
			}
		}];
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	}
});