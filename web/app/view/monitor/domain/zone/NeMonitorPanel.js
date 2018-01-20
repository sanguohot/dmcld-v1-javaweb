Ext.define('app.view.monitor.domain.zone.NeMonitorPanel',{
	extend:'Ext.panel.Panel',
	id:'neMonitorPanel',
	layout:'fit',
	hidden:true,
	border:false,
	treeName:'',
	getTreeName:function(){
		return this.treeName;
	},
	initComponent: function(){
		var prefix = "gw_";
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
		var gw15Panel=Ext.create('app.view.monitor.domain.zone.Gw15Panel',{});
		var gw24Panel=Ext.create('app.view.monitor.domain.zone.Gw24Panel',{});
		var gwCurPanel=Ext.create('app.view.monitor.domain.zone.GwCurPanel',{
			id:"gwCurPanel",
			gridId:"gwCurGrid"
		});
		var gwCdrPanel=Ext.create('app.view.monitor.domain.zone.GwCdrPanel',{});
		var gwSmsPanel=Ext.create('app.view.monitor.domain.zone.GwSmsPanel',{});
		var gwUssdPanel=Ext.create('app.view.monitor.domain.zone.GwUssdPanel',{});
		var gwpCurPanel=Ext.create('app.view.monitor.domain.zone.port.GwpCurPanel',{
			id:'gw_gwpCurPanel',
			gridId:'gw_gwpCurGrid'
		});
		this.items=[{
	       	xtype: 'tabpanel',
//	       	layoutOnTabChange:true,
	       	items:[ne15Panel,ne24Panel,neCurPanel
	       	       ,gw15Panel,gw24Panel,gwCurPanel
	       	       ,gwSmsPanel,gwUssdPanel,gwCdrPanel,gwpCurPanel],
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