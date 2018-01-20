Ext.define('app.view.monitor.domain.DomainCurPanel',{
	extend:'Ext.panel.Panel',
//	id:'domainCurPanel',
	layout:'fit',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('tiDomainCur'),
	gridId:'',
	initComponent: function(){
		var domainCurStore=Ext.create('app.store.monitor.PmdDomainCurStore',{});
		var gridId = this.gridId;
		var domainCurGrid=Ext.create('app.view.monitor.domain.DomainCurGrid',{
			id:gridId,
			store:domainCurStore
		});
		var pagebar=domainCurGrid.down('pagingtoolbar');
		pagebar.bindStore(domainCurStore);
		if(gridId.charAt(0) == 'f'){
			pagebar.getComponent("export").setVisible(false);
		}
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:[domainCurGrid],
	   	   	listeners:{			
				tabchange:function(tabPanel,newTab,oldTab,obj){
					controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
				}
			}
		}];
		this.items[0].initTabNum = this.items[0].items.length;
		this.callParent(arguments);	
	},
});