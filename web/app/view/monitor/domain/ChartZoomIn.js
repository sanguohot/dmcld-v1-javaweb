Ext.define('app.view.monitor.domain.ChartZoomIn', {
		extend : 'Ext.window.Window',
		width : 670,
		id:'chartZoomIn',
		closeAction : 'destroy',
		minWidth : 600,
		minHeight : 400,
		layout : 'fit',
		resizable : true,
		modal : true,
		initComponent: function(){
			var store=Ext.create('app.store.monitor.PmdNeListStore',{});
			store.getProxy().url = "pmdNeManager!getChartByNeUuid.action";
			this.store = store;
			var dynamicFields = new Array();
			dynamicFields.push('usage');
			dynamicFields.push('asr');
			this.items = this.createGwChartLayout(store,dynamicFields);
			this.callParent(arguments);
		},
		createGwChartLayout:function(originStore,dynamicFields){
			var generalChart = Ext.getCmp('generalChart');
			if(!generalChart){
				generalChart=Ext.create('app.view.monitor.domain.zone.GeneralChart');
			}
			var timeFieldFormat = "m-d H:i";
			var seriesType = 'line';
			var callTimeChart = generalChart.createChart(dynamicFields
					,timeFieldFormat
					,seriesType,originStore,0,100);
			var search = generalChart.createSearch();
			var chartLayout = Ext.create('Ext.panel.Panel',{
//				title:'Chart',
				layout:'fit',
				border : false,
//				id:'gw15Chart',
				start:0,
				originStore:originStore,
				itemId:'chart',
				zoom:'hour',
				tbar:generalChart.createTbar(true),
				items:[{
					region: 'center',
					layout:'fit',
					border : false,
					items:[callTimeChart]
				}],
				redraw:function(tab,from,to,zoom){
					var items = tab.down('panel[region=center]').items;
					for(var i=0; i<items.length; i++){
						var chart = items.get(i);
						chart.redrawChart(chart,from,to,zoom);
					}
					Ext.getCmp('generalChart').afterRedraw(tab);
				},
				reset:function(tab,from,to,zoom){
					var items = tab.down('panel[region=center]').items;
					for(var i=0; i<items.length; i++){
						var chart = items.get(i);
						chart.resetTimeChart(chart,from,to,zoom);
					}
				},
//				listeners: {
//					afterlayout: {
//						fn:function(tab){
//							var  dataIndex = this.up("panel").dataIndex;
//							var items = this.query("chart");
//							for(var i=0; i<items.length; i++){
//								var chart = items[i];
//								for(var j=0; j<chart.legend.items.length; j++){
//									if(chart.legend.items[j].hasListeners.mousedown){
//										if(chart.legend.items[j].series.yField!=dataIndex)
//										chart.legend.items[j].fireEvent('mousedown');
//									}
//								}
//							}
//						},
//						single:true,
//					},
//				}
			});

			generalChart.regCallback(chartLayout,dynamicFields);
			ruleLoadMask=new Ext.LoadMask(chartLayout, {
			    msg:lanControll.getLanValue('maskMsg'),
			    disabled:false,
			    maskCls:'loadmaskcss',
			    store:originStore
			});

			return chartLayout;	
		},
});