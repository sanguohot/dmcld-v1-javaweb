Ext.define('app.view.operation.domain.config.SyslogMainPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
	treeId:'',
	domainUuid:0,
	userTypeValue:'1',
	alarmDescId:'',
	toolbars:0,
	syslogToolbars:0,
	syslogTabId:'',
	syslogFileToolbars:0,
	syslogFileTabId:'',
	initComponent: function(){
		this.syslogToolbars=31;
		this.syslogFileToolbars=6;
		var syslogTabId=this.syslogTabId;
		var syslogToolbars=this.syslogToolbars;
		var domainUuid=this.domainUuid;

		var syslogTab = Ext.create("app.view.operation.domain.config.SyslogNeTab",{
			title:lanControll.getLanValue('tiSyslog'),
			id:syslogTabId,
			toolbars:syslogToolbars
		});

		var syslogFileTabId=this.syslogFileTabId;
		var syslogFileToolbars=this.syslogFileToolbars;
		var syslogFile = Ext.create("app.view.operation.domain.roamzone.site.nes.SyslogListPanel",{
			domainUuid:domainUuid,
			id:syslogFileTabId,
			toolbars:syslogFileToolbars
		});
		
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[syslogTab,syslogFile],
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