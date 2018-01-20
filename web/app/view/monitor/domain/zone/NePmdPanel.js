Ext.define('app.view.monitor.domain.zone.NePmdPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:false,
	border:false,
	title:'Ne 15 Min',
	gridId:'',
	gridStore:null,
	gridUrl:'',
	gridTitle:'',
	col:null,
	initComponent: function(){
		var chartLayout = null;
		var generalChart = Ext.getCmp('generalChart');
		if(!generalChart){
			generalChart=Ext.create('app.view.monitor.domain.zone.GeneralChart');
		}
		if(this.id.indexOf('Cur') < 0){
			var originStore = Ext.create("app.store.monitor.PmdNeStore",{});
			originStore.getProxy().url = this.gridStore.getProxy().url;
			var flag=null;
			if(this.id.indexOf('tg_')>=0){
				flag = "tg";
			}else if(this.id.indexOf('ag_')>=0){
				flag = "ag";
			}
			chartLayout = generalChart.createNeChartLayout(originStore,flag);
		}
		var gridId = this.gridId;
		var gridStore = this.gridStore;
		var gridUrl = this.gridUrl;
		var gridTitle = this.gridTitle;
		var gw15Grid=Ext.create('app.view.monitor.domain.zone.NePmdGrid',{
			id:gridId,
			store:gridStore,
			exportUrl:gridUrl,
			title:gridTitle,
		});
		var col = this.col;
		if(col != null){
			gw15Grid.down('headercontainer').insert(2,col);
		}
		var pagebar = gw15Grid.down('pagingtoolbar');
		pagebar.bindStore(gridStore);
		if(gridId.substr(0,4) == 'site'){
			pagebar.getComponent("export").setVisible(false);
		}
		var arr = new Array();
		if(this.id.indexOf('Cur') < 0){
			arr.push(chartLayout);
			arr.push(gw15Grid);
		}else{
			if(gridId.substr(0,4)!='site' && this.id.indexOf('ag_')<0){
				var gaugeStore = Ext.create("app.store.monitor.PmdNeStore",{});
				gaugeStore.getProxy().url = 'pmdNeCurManager!getPmdNeCur.action';
				var gauge = generalChart.createGaugeChartLayout(gaugeStore);
				arr.push(gauge);
			}
			arr.push(gw15Grid);		
		}
		this.items=[{
	       	xtype: 'tabpanel',
	       	tabPosition:'bottom',
	       	items:arr,
   	   	   	listeners:{			
   				tabchange:function(tabPanel,newTab,oldTab,obj){
   					controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
   				}
   			}
		}];
		this.items[0].initTabNum = this.items[0].items.length;
		this.callParent(arguments);	
	}
});