Ext.define('app.view.monitor.domain.zone.BkMonitorPanel',{
	extend:'Ext.panel.Panel',
	id:'bkMonitorPanel',
	layout:'fit',
	hidden:true,
	border:false,
	treeName:'',
	getTreeName:function(){
		return this.treeName;
	},
	initComponent: function(){
		var prefix = "bk_";
		var store = Ext.create("app.store.monitor.PmdNeStore",{});
		store.getProxy().url = 'pmdNe15Manager!getPmdNe15.action';
		var ne15Panel=Ext.create('app.view.monitor.domain.zone.NePmdPanel',{
				id:prefix+'ne15Panel',
				gridId:prefix+'ne15Grid',
				title:tiNe15Min,
				gridTitle:ti15MinList,
				gridStore:store,
				gridUrl:'pmdNe15Manager!exportPmNe15.action',
		});
		var store = Ext.create("app.store.monitor.PmdNeStore",{});
		store.getProxy().url = 'pmdNe24Manager!getPmdNe24.action';
		var ne24Panel=Ext.create('app.view.monitor.domain.zone.NePmdPanel',{
				id:prefix+'ne24Panel',
				gridId:prefix+'ne24Grid',
				title:tiNe24Hour,
				gridTitle:ti24HourList,
				gridStore:store,
				gridUrl:'pmdNe24Manager!exportPmNe24.action',
		});
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
		
		var simCurPanel=Ext.create('app.view.monitor.group.sim.SimCurPanel',{
			id:prefix+"simCurPanel",
			gridId:prefix+"simCurGrid",
		});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[ne15Panel,ne24Panel,neCurPanel,simCurPanel],
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