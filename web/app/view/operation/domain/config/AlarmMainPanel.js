Ext.define('app.view.operation.domain.config.AlarmMainPanel',{
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
		var alarmDescId=this.alarmDescId;
		var toolbars=this.toolbars;
		var tab4 = Ext.create("app.view.module.AlarmPanel",{
			createDesc:'current',
			nodeDesc:'domain',
			id:'mainCurrentAlarmPanel'
		});
//		var tab3 = Ext.create("app.view.module.AlarmPanel",{
//			createDesc:'history',
//			nodeDesc:'domain',
//			id:'mainHistoryAlarmPanel'
//		});
		var tab3 = Ext.create("app.view.module.AlarmLogPanel",{
			createDesc:'history',
			nodeDesc:'domain',
			id:'mainHistoryAlarmPanel'
		});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[tab4,tab3],
	   	    listeners:{			
				tabchange:function(tabPanel,newTab,oldTab,obj){
					controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
				}
			}
		}];
		this.items[0].initTabNum = this.items[0].items.length;
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	}
});