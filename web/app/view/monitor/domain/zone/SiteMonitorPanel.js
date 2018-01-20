Ext.define('app.view.monitor.domain.zone.SiteMonitorPanel',{
	extend:'Ext.panel.Panel',
	id:'siteMonitorPanel',
	layout:'fit',
	hidden:true,
	border:false,
	treeName:'',
	getTreeName:function(){
		return this.treeName;
	},
	initComponent: function(){
		var prefix = "site_";
		var store = Ext.create("app.store.monitor.PmdNeStore",{});
		store.getProxy().url = 'pmdNeCurManager!getPmdNeCur.action';
		var neCurPanel=Ext.create('app.view.monitor.domain.zone.NePmdPanel',{
				id:prefix+'neCurPanel',
				gridId:prefix+'neCurGrid',
				title:tiNeCur,
				gridTitle:tiCurList,
				gridStore:store,
				gridUrl:'pmdNeCurManager!exportPmNeCur.action',
				col:Ext.create("Ext.grid.column.Column",{
					header: 'Device Name',
					dataIndex: 'neAlias',
					width:120
				}),
		});
		var gwCurPanel=Ext.create('app.view.monitor.domain.zone.GwCurPanel',{
			id:"site_gwCurPanel",
			gridId:"site_gwCurGrid"
		});
		var arr = [];
		arr.push(neCurPanel);
		if(!rs.dmCloudMode()){
			arr.push(gwCurPanel);
		}
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:arr,
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