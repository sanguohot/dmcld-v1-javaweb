Ext.define('app.view.monitor.domain.zone.GeneralChart',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	id:'generalChart',
	hidden:false,
	border:false,
	dbChartModule:'chartModule',
	dbChartMode:'chart',
	dbChartItem:0,
//	id:'gw15Chart',
//	title:'15 Min Chart',
//	chartStore:null,
	initComponent: function(){
		this.callParent(arguments);	
	},
	createChart:function(dynamicFields,timeFieldFormat,seriesType,originStore,yMinimum,yMaximum){
		if(dynamicFields.length==0){
			console.log("Error in Create Chart");
			return;
		}
		var fromDate = new Date();
		var toDate = new Date();
		fromDate.setHours(fromDate.getHours()-3);
		var arr = new Array();
		for(var i=0; i<dynamicFields.length; i++){
			var tmp = {};
			tmp.type = seriesType;
			tmp.xField = 'generateTime1';
			tmp.highlight = true;
			tmp.markerConfig={
	            type: 'cross',
	            size: 1,
	            radius: 1,
	            'stroke-width': 0
	        }
//			if(dynamicFields[i]=="minCpuIdle"){
//				tmp.fill=true;
//			}
			tmp.yField = dynamicFields[i];
			tmp.axis = 'left';
			tmp.tips={
			  trackMouse: true,
			  width: 120,
			  yField:dynamicFields[i],
			  renderer: function(storeItem, item) {
			    this.setTitle('time:'+Ext.Date.format(storeItem.get('generateTime1'),'m-d H:i')
			    		+'<br />'
			    		+'value:'+storeItem.get(this.yField));
			  }
			};
			arr.push(tmp);
		}
		var chart =  Ext.create('Ext.chart.Chart', {
//			autoScroll:true,
			flex:1,
//			maxWidth:500,
//			maxHeight:200,
			store:originStore,
//			resizable:true,
            legend: {
                position: 'right',
            },
		    axes: [
		        {
//		            title: 'Call Time(secs)',
		            type: 'Numeric',
		            position: 'left',
		            fields: dynamicFields,
		            constrain:true,
		            minimum:yMinimum,
		            maximum:yMaximum,
//		            length:100,
//		            width:100,
		            adjustEnd:true,
//	                minorTickSteps: 1,
	                grid: {
	                    odd: {
	                        opacity: 1,
	                        fill: '#ddd',
	                        stroke: '#bbb',
	                        'stroke-width': 0.5
	                    }
	                }
		        },
		        {
		            title: lanControll.getLanValue('time'),
		            type: 'Time',
//		            groupBy: 'year,month,day,hour,minute,second',
		            position: 'bottom',
		            step: false,
		            fields: ['generateTime1'],
		            fromDate:fromDate,
		            toDate:toDate,
		            constrain:true,
		            majorTickSteps:11,
		            minorTickSteps:9,
		            dateFormat: timeFieldFormat,
		            width:500
		        }
		    ],
		    series: arr,
		    cnt:1,
		    redrawChart:function(chart,from,to,zoom){
            	chart.resetTimeChart(chart,from,to,zoom);
            	chart.redraw();
            },
	     	resetTimeChart:function(chart,from,to,zoom){
            	var fromDate = new Date(),toDate = new Date(),date;
            	if(!from){
            		if(chart.store.getCount()){
            			date = chart.store.getAt(0).get('generateTime1');
            			fromDate.setFullYear(date.getFullYear()
            					, date.getMonth()
            					, date.getDate());
            			fromDate.setHours(date.getHours()
            					, date.getMinutes()
            					, date.getSeconds()
            					, date.getMilliseconds());
            		}
            	}else{
        			fromDate.setFullYear(from.getFullYear()
        					, from.getMonth()
        					, from.getDate());
        			fromDate.setHours(from.getHours()
        					, from.getMinutes()
        					, from.getSeconds()
        					, from.getMilliseconds());
            	}
            	if(!to){
            		if(chart.store.getCount()){
            			date = chart.store.getAt(0).get('generateTime1');
            			toDate.setFullYear(date.getFullYear()
            					, date.getMonth()
            					, date.getDate());
            			toDate.setHours(date.getHours()
            					, date.getMinutes()
            					, date.getSeconds()
            					, date.getMilliseconds());
            		}
            	}else{
        			toDate.setFullYear(to.getFullYear()
        					, to.getMonth()
        					, to.getDate());
        			toDate.setHours(to.getHours()
        					, to.getMinutes()
        					, to.getSeconds()
        					, to.getMilliseconds());
            	}
	     		if(zoom){
	     			if(zoom == 'month'){
	     				fromDate.setMonth(fromDate.getMonth()-1);
	     			}else if(zoom == 'week'){
	     				fromDate.setDate(fromDate.getDate()-7);
	     			}else if(zoom == '3days'){
	     				fromDate.setDate(fromDate.getDate()-3);
	     			}else if(zoom == 'day'){
	     				fromDate.setDate(fromDate.getDate()-1);
	     			}else if(zoom == '8hours'){
	     				fromDate.setHours(fromDate.getHours()-8);
	     			}else{
	     				fromDate.setHours(fromDate.getHours()-3);
	     			}
	     		}

    			chart.axes.get(1).toDate = toDate;
    			chart.axes.get(1).fromDate = fromDate;
	     	},
		});
		
		return chart;
	},
	createSearch:function(){
		return null;
		var search = Ext.create('Ext.form.Panel',{
			border : false,
			bodyPadding : 5,			
			defaults : {
			margins : '0 0 10 0'
			},
		    fieldDefaults: {
		        labelWidth: 80
		    },
			anchor:'100%',
			items:[{
				xtype:'datefield',
				fieldLabel:'From',
				name:'fromDate',
				format: 'Y-m-d', 
			},{
				xtype:'datefield',
				fieldLabel:'To',
				name:'toDate',
				format: 'Y-m-d', 
			}],
			buttons : [ {
				text : 'Cancel',
				ulan:'btCancel',
				handler : function() {
					this.up('form').up('panel').collapse();
				}
			}, {
				text : 'Search',
				ulan:'btSearch',
				handler : function() {
					var basicForm = this.up('form').getForm();
					var from = basicForm.findField('fromDate').getValue();
					var to = basicForm.findField('toDate').getValue();
					var chartLayout = this.up('form').up('panel').up('panel');
					var zoom = null;
					if(!from && !to){
						zoom = chartLayout.zoom;
					}
					chartLayout.redraw(chartLayout,from,to
       			 			,zoom);
				}
			}]
		});
		return search;
	},
	createTbar:function(singleImage){
		var tbar = [];
		var zoom = Ext.create("Ext.button.Button",{
      		 xtype:'button',
       		 text:'Zoom',
       		 ulan:'btZoom',
       		 iconCls: 'domain-group',
       		 menu:{
	       		 xtype:'menu',			       		 
	       		 items:[{
	       			text:'One Month',
	       			zoom:'month',
	       			ulan:'oneMonth',
	       			handler:function(){
	       			 	var chartLayout = this.up('panel').up('panel');
	       			 	var zoom = this.zoom;
	       			 	chartLayout.zoom = zoom;
	       			 	Ext.getCmp('generalChart').setDateByZoom(chartLayout);
	       			 	chartLayout.originStore.load();
//	       			 	this.up('panel').chartFn(chartLayout,zoom);
	       		 	}
	       		 },{
	       			text:'One Week',
	       			zoom:'week',
	       			ulan:'oneWeek',
	       			handler:function(){
	       			 	var chartLayout = this.up('panel').up('panel');
	       			 	var zoom = this.zoom;
	       			 	chartLayout.zoom = zoom;
	       			 	Ext.getCmp('generalChart').setDateByZoom(chartLayout);
	       			 	chartLayout.originStore.load();
//	       			 	this.up('panel').chartFn(chartLayout,zoom);
	       		 	}
	       		 },{
		       			text:'Three Days',
		       			zoom:'3days',
		       			ulan:'threeDays',
		       			handler:function(){
		       			 	var chartLayout = this.up('panel').up('panel');
		       			 	var zoom = this.zoom;
		       			 	chartLayout.zoom = zoom;
		       			 	Ext.getCmp('generalChart').setDateByZoom(chartLayout);
		       			 	chartLayout.originStore.load();
//		       			 	this.up('panel').chartFn(chartLayout,zoom);
		       		 	} 
	       		 },{
	       			text:'One Day',
	       			zoom:'day',
	       			ulan:'oneDay',
	       			handler:function(){
	       			 	var chartLayout = this.up('panel').up('panel');
	       			 	var zoom = this.zoom;
	       			 	chartLayout.zoom = zoom;
	       			 	Ext.getCmp('generalChart').setDateByZoom(chartLayout);
	       			 	chartLayout.originStore.load();
//	       			 	this.up('panel').chartFn(chartLayout,zoom);
	       		 	}
	       		 },{
	       			text:'Eight Hours',
	       			zoom:'8hours',
	       			ulan:'eightHours',
	       			handler:function(){
	       			 	var chartLayout = this.up('panel').up('panel');
	       			 	var zoom = this.zoom;
	       			 	chartLayout.zoom = zoom;
	       			 	Ext.getCmp('generalChart').setDateByZoom(chartLayout);
	       			 	chartLayout.originStore.load();
//	       			 	this.up('panel').chartFn(chartLayout,zoom);
	       		 	}
	       		 },{
	       			text:'Three Hours',
	       			zoom:'hour',
	       			ulan:'threeHours',
	       			handler:function(){		       			 
	       			 	var chartLayout = this.up('panel').up('panel');
	       			 	var zoom = this.zoom;
	       			 	chartLayout.zoom = zoom;
	       			 	Ext.getCmp('generalChart').setDateByZoom(chartLayout);
	       			 	chartLayout.originStore.load();
//	       			 	this.up('panel').chartFn(chartLayout,zoom);
	       		 	}
	       		 }],
	       		 listeners:{
					mouseover:function(menu,item, e, eOpts){
						for(var i=0; i<menu.items.items.length; i++){
							menu.items.items[i].setIconCls("");
						}
						if(item)
						item.setIconCls("icon-bullet-black");
					},
				},
	       		chartFn:function(chartLayout,zoom){
					chartLayout.zoom = zoom;
       			 	var chart = chartLayout.query('chart')[0];
	    			var toDate = chart.axes.get(1).toDate;
	    			var fromDate = new Date();
	    			fromDate.setFullYear(toDate.getFullYear()
        					, toDate.getMonth()
        					, toDate.getDate());
	    			fromDate.setHours(toDate.getHours()
        					, toDate.getMinutes()
        					, toDate.getSeconds()
        					, toDate.getMilliseconds());
	    			chartLayout.redraw(chartLayout,fromDate,toDate
       			 			,zoom);

				},
       	 	 },
			handler:function(){
				var zoom = this.up('panel').zoom;
				var menu = this.menu;
				for(var i=0; i<menu.items.items.length; i++){
					if(menu.items.items[i].zoom == zoom){
						menu.items.items[i].setIconCls("icon-bullet-black");
					}else{
						menu.items.items[i].setIconCls("");
					}
				}					
			},
       	 });
		tbar.push(zoom);
		tbar.push("-");
		var image = null;
		if(singleImage){
			image = Ext.create("Ext.button.Button",{
	       		 xtype:'button',
	       		 text:'Save',
	       		 ulan:'btSave',
	       		 iconCls: 'save',
	       		 handler:function(){
	       		 	var tab = this.up('panel');
					var items = tab.down('panel[region=center]').items;

	       		 	Ext.MessageBox.confirm(boxPromotion, boxDownChart, function(choice){
	                    if(choice == 'yes'){
						var chart = items.get(0);
	                        chart.save({
	                            type: 'image/png'
	                        });
	                    }
	                });
	       	 	}      	 
	       	 });
		}else{
			image = Ext.create("Ext.button.Button",{
	       		 xtype:'button',
	       		 text:'Save',
	       		 ulan:'btSave',
	       		 iconCls: 'save',
	       		 menu:{
		       		 xtype:'menu',			       		 
		       		 items:[{
		       			text:'First Chart',
		       			ulan:'miFirstChart',
		       			handler:function(){
			       		 	var tab = this.up('panel').up('panel');
							var items = tab.down('panel[region=center]').items;
			       		 	Ext.MessageBox.confirm(boxPromotion, boxDownChart, function(choice){
			                    if(choice == 'yes'){
		    						var chart = items.get(0);
			                        chart.save({
			                            type: 'image/png'
			                        });
			                    }
			                });
		       		 	}
		       		 },{
		       			text:'Second Chart',
		       			ulan:'miSecondChart',
		       			handler:function(){
			       		 	var tab = this.up('panel').up('panel');
							var items = tab.down('panel[region=center]').items;
			       		 	Ext.MessageBox.confirm(boxPromotion, boxDownChart, function(choice){
			                    if(choice == 'yes'){
		    						var chart = items.get(1);
			                        chart.save({
			                            type: 'image/png'
			                        });
			                    }
			                });
		       		 	}
		       		 }], 
	       	 	 }
			});
		}
		tbar.push(image);
		tbar.push("-");
		var genChart = this;
		var top = Ext.create("Ext.button.Button",{
			xtype:'button',
			ulan:'btTop',
			icon:'picture/page-first.gif',
			handler:function(){
				var chartLayout = this.up('panel');
		    	var timeHandler = Ext.getCmp('timeHandler');
		    	if(!timeHandler){
		    		timeHandler = Ext.create("app.util.TimeHandler",{});
		    	}
				var total = timeHandler.dateDiff1('n',chartLayout.minDate,chartLayout.maxDate);
				var limit = timeHandler.dateDiff1('n',chartLayout.fromDate,chartLayout.toDate);
				var c = Math.floor(total/limit);				
				var toDate = new Date(chartLayout.maxDate);
				toDate.setHours(toDate.getHours()
					, toDate.getMinutes() - c*limit
					, toDate.getSeconds()
					, toDate.getMilliseconds());
				chartLayout.toDate = toDate;
				genChart.setDateByZoom(chartLayout);
				chartLayout.flag = 0;
				chartLayout.originStore.load();
				
// 				var chartLayout = this.up('panel');
// 				chartLayout.toDate = genChart.getToDate(chartLayout.zoom,chartLayout.minDate);
// 				genChart.setDateByZoom(chartLayout);
// 				chartLayout.flag = 0;
// 				chartLayout.originStore.load();
			},
			text:'Top',
//			iconCls:'backward',
			itemId:'top'
		});
		tbar.push(top);
		tbar.push("-");
		var prev = Ext.create("Ext.button.Button",{
			xtype:'button',
			ulan:'btPrev',
			handler:function(){
 				var chartLayout = this.up('panel');
 				Ext.getCmp('generalChart').prev(chartLayout);	
			},
			text:'Prev',
			iconCls:'backward',
			itemId:'prev'
		});
		tbar.push(prev);
		tbar.push("-");
		var next = Ext.create("Ext.button.Button",{
			xtype:'button',
			ulan:'btNext',
			handler:function(){
 				var chartLayout = this.up('panel');
 				Ext.getCmp('generalChart').next(chartLayout);	
			},
			text:'Next',
			iconCls:'forward',
			itemId:'next'
		});
		tbar.push(next);
		tbar.push("-");
		var end = Ext.create("Ext.button.Button",{
			xtype:'button',
			ulan:'btEnd',
			handler:function(){
 				var chartLayout = this.up('panel');
 				chartLayout.toDate = new Date(chartLayout.maxDate);
 				genChart.setDateByZoom(chartLayout);
 				chartLayout.flag = 0;
 				chartLayout.originStore.load();
			},
			text:'End',
			icon:'picture/page-last.gif',
//			iconCls:'backward',
			itemId:'end'
		});
		tbar.push(end);
		tbar.push("-");
		var refresh = Ext.create("Ext.button.Button",{
			xtype:'button',
			ulan:'btRefresh',
			handler:function(){
				var store = this.up('panel').down('panel[region=center]').items.get(0).store;
				store.load();
	
			},
			text:'Refresh',
			iconCls:'refresh2',
		});
		tbar.push(refresh);
		return tbar;
	},
	afterlayout:function(tab,flag){
		if(rs.dmCloudMode(null)){
			return;
		}
		var id = tab.up('panel').up('panel').id;
		var flag_24 = (id.indexOf('24')>=0)?1:0;
		if(flag_24){
			tab.down('menuitem[zoom=hour]').hide();
			tab.down('menuitem[zoom=8hours]').hide();
			if(!tab.zoom || tab.zoom=="8hours" || tab.zoom=="hour")
			tab.zoom = 'day';
		}
		var items = this.down('panel[region=center]').items;
		for(var i=0; i<items.length; i++){
			var chart = items.get(i);
			for(var j=0; j<chart.legend.items.length; j++){
				if(chart.legend.items[j].hasListeners.mousedown){
					if(flag=="ne"){
						if(chart.legend.items[j].series.yField!='neRunTimelen'
							&& chart.legend.items[j].series.yField!='maxPingDelayMs')
						chart.legend.items[j].fireEvent('mousedown');
					}else if(flag=='sys'){
						if(j && chart.legend.items[j].hasListeners.mousedown){
							chart.legend.items[j].fireEvent('mousedown');
						}
					}else if(flag=='normal'){
						if(chart.legend.items[j].series.yField!='callCountAll'
							&& chart.legend.items[j].series.yField!='ACD'
								&& chart.legend.items[j].series.yField!='ASR')
						chart.legend.items[j].fireEvent('mousedown');
					}else{
						if(j && chart.legend.items[j].hasListeners.mousedown){
							chart.legend.items[j].fireEvent('mousedown');
						}
					}
				}
			}
		}
//		this.redraw(this,null,null,this.zoom);
	},
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
	createSysChartLayout:function(originStore){
		var generalChart = Ext.getCmp('generalChart');
		if(!generalChart){
			generalChart=Ext.create('app.view.monitor.domain.zone.GeneralChart');
		}
		
		var dynamicFields = new Array();
		dynamicFields.push('curCpuIdle');
		dynamicFields.push('minCpuIdle');
		dynamicFields.push('maxCpuIdle');
		dynamicFields.push('curMemFree');
		dynamicFields.push('minMemFree');
		dynamicFields.push('maxMemFree');
		var timeFieldFormat = "m-d H:i";
		var seriesType = 'line';
		var callTimeChart = generalChart.createChart(dynamicFields
				,timeFieldFormat
				,seriesType,originStore,0,100);
		var search = generalChart.createSearch();
		var chartLayout = Ext.create('Ext.panel.Panel',{
			title:tiChart,
			layout:'fit',
			border : false,
//			id:'gw15Chart',
			start:0,
			originStore:originStore,
			itemId:'chart',
			zoom:'hour',
			tbar:this.createTbar(true),
			items:[{
				region: 'center',
				layout:'fit',
				border : false,
				items:[callTimeChart], 
			}],
			redraw:this.redraw,
			reset:this.reset,
			listeners: {
				afterlayout:{
					fn:this.afterlayout,
					single:true
				},				
			},
		});
		var yFieldsArr = dynamicFields;
		this.regCallback(chartLayout,yFieldsArr);
		ruleLoadMask=new Ext.LoadMask(chartLayout, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:originStore
		});

		return chartLayout;	
	},
	createNeChartLayout:function(originStore,flag){
		var generalChart = Ext.getCmp('generalChart');
		if(!generalChart){
			generalChart=Ext.create('app.view.monitor.domain.zone.GeneralChart');
		}
		var timeFieldFormat = "m-d H:i";
		var seriesType = 'line';
		
		var dynamicFields = new Array();
		dynamicFields.push('neRegFailCnt');
		dynamicFields.push('neRunTimelen');
		dynamicFields.push('curPingDelayMs');
		dynamicFields.push('minPingDelayMs');
		dynamicFields.push('maxPingDelayMs');			
		var chart = generalChart.createChart(dynamicFields
				,timeFieldFormat
				,seriesType,originStore);
		
		var dynamicFields2 = new Array();		
		dynamicFields2.push('curCallCount');
//		dynamicFields2.push('totalCallCount');
		dynamicFields2.push('acd');
		var chart2 = generalChart.createChart(dynamicFields2
				,timeFieldFormat
				,seriesType,originStore);
		
		var dynamicFields1 = new Array();
		dynamicFields1.push('curCpuUsage');
		dynamicFields1.push('asr');
		var chart1 = generalChart.createChart(dynamicFields1
				,timeFieldFormat
				,seriesType,originStore,0,100);
		
		var dynamicFieldsAg = new Array();
		dynamicFieldsAg.push('curCpuUsage');
		var chartAg = generalChart.createChart(dynamicFieldsAg
				,timeFieldFormat
				,seriesType,originStore,0,100);
		
		dynamicFields3 = new Array();
		dynamicFields2.push('curCallCount');
//		dynamicFields2.push('totalCallCount');
		dynamicFields2.push('curCpuUsage');
		dynamicFields1.push('asr');
		dynamicFields2.push('acd');

		var search = generalChart.createSearch();
		var chartLayout = null;
		var yFieldsArr = null;
		var chartLayout = null;
		if(flag && flag=="tg"){
			chartLayout = Ext.create('Ext.panel.Panel',{
				title:tiChart,
				layout:'fit',
				border : false,
//				id:'gw15Chart',
				start:0,
				originStore:originStore,
				itemId:'chart',
				zoom:'hour',
				tbar:this.createTbar(false),
				items:[{
					region: 'center',
//					layout:'fit',
					border : false,
					layout:{
						type:'vbox',
						align:'stretch'
					},
					items:[chart2,chart1], 
//				},{
//					region:'east',
//					title : tiSearch,
////					border : false,
//					collapsible: true,
//					collapsed:true,
//					width:250,
//					items:search
				}],
				redraw:this.redraw,
				reset:this.reset,
				listeners: {
					afterlayout:{
						fn:this.afterlayout,
						single:true
					},				
				},
			});
			yFieldsArr = dynamicFields3;
		}else if(flag && flag=='ag'){
			chartLayout = Ext.create('Ext.panel.Panel',{
				title:tiChart,
				layout:'fit',
				border : false,
//				id:'gw15Chart',
				start:0,
				originStore:originStore,
				itemId:'chart',
				zoom:'hour',
				tbar:this.createTbar(true),
				items:[{
					region: 'center',
					layout:'fit',
					border : false,
					items:[chartAg], 
				}],
				redraw:this.redraw,
				reset:this.reset,
				listeners: {
					afterlayout:{
						fn:this.afterlayout,
						single:true
					},				
				},
			});
			yFieldsArr = dynamicFieldsAg;
		}else{
			chartLayout = Ext.create('Ext.panel.Panel',{
				title:tiChart,
				layout:'fit',
				border : false,
//				id:'gw15Chart',
				start:0,
				originStore:originStore,
				itemId:'chart',
				zoom:'hour',
				tbar:this.createTbar(true),
				items:[{
					region: 'center',
					layout:'fit',
					border : false,
//					layout:{
//						type:'vbox',
//						align:'stretch'
//					},
					items:[chart], 
//				},{
//					region:'east',
//					title : tiSearch,
////					border : false,
//					collapsible: true,
//					collapsed:true,
//					width:250,
//					items:search
				}],
				redraw:this.redraw,
				reset:this.reset,
				listeners: {
					afterlayout:{
						fn:this.afterlayout,
						single:true
					},				
				},
			});
			yFieldsArr = dynamicFields;
		}
		
		this.regCallback(chartLayout,yFieldsArr);
		ruleLoadMask=new Ext.LoadMask(chartLayout, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:originStore
		});

		return chartLayout;	
	},
	createChartLayout:function(originStore){
		var generalChart = Ext.getCmp('generalChart');
		if(!generalChart){
			generalChart=Ext.create('app.view.monitor.domain.zone.GeneralChart');
		}
		
		var dynamicFields = new Array();
		dynamicFields.push('callTimeAll');
		dynamicFields.push('callCountAll');
		dynamicFields.push('ACD');
		var timeFieldFormat = "m-d H:i";
		var seriesType = 'line';
		var callTimeChart = generalChart.createChart(dynamicFields
				,timeFieldFormat
				,seriesType,originStore);
		var dynamicFields1 = new Array();
		dynamicFields1.push('ASR');
		var succRateChart = generalChart.createChart(dynamicFields1
				,timeFieldFormat
				,seriesType,originStore,0,100);
		var search = generalChart.createSearch();
		var chartLayout = Ext.create('Ext.panel.Panel',{
			title:tiChart,
			layout:'fit',
			border : false,
//			id:'gw15Chart',
			start:0,
			originStore:originStore,
			itemId:'chart',
			zoom:'hour',
			tbar:this.createTbar(false),
			items:[{
				region: 'center',
//				layout:'fit',
				border : false,
				layout:{
					type:'vbox',
					align:'stretch'
				},
				items:[callTimeChart,succRateChart], 
//			},{
//				region:'east',
//				title : tiSearch,
////				border : false,
//				collapsible: true,
//				collapsed:true,
//				width:250,
//				items:search
			}],
			redraw:this.redraw,
			reset:this.reset,
			listeners: {
				afterlayout:{
					fn:this.afterlayout,
					single:true
				},				
			},
			
		});		
		originStore.on('load',function(){
			for(var i=0; i<originStore.getCount();i++){
				var model = originStore.getAt(i);
				model.set("callTimeAll",model.get('callTimeAll')*60);
				model.set("ASR",model.get('callSuccRate'));
				if(model.get('callNormalCount')){
					model.set("ACD",model.get('callTimeAll')/model.get('callNormalCount'));
				}else{
					model.set("ACD",0);
				}
			}
		});
		var yFieldsArr = ['callTimeAll','ACD','ASR'];
		this.regCallback(chartLayout,yFieldsArr);
		ruleLoadMask=new Ext.LoadMask(chartLayout, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:originStore
		});
		return chartLayout;	
	},
	createGaugeTbar:function(store){
		var tbar = [];		
		image = Ext.create("Ext.button.Button",{
       		 xtype:'button',
       		 text:'Save',
       		 ulan:'btSave',
       		 iconCls: 'save',
       		 menu:{
	       		 xtype:'menu',			       		 
	       		 items:[{
	       			text:'First Chart',
	       			ulan:'miFirstChart',
	       			handler:function(){
		       		 	var tab = this.up('panel').up('panel');
						var items = tab.down('panel[region=center]').items;
		       		 	Ext.MessageBox.confirm(boxPromotion, boxDownChart, function(choice){
		                    if(choice == 'yes'){
	    						var chart = items.get(0);
		                        chart.save({
		                            type: 'image/png'
		                        });
		                    }
		                });
	       		 	}
	       		 },{
	       			text:'Second Chart',
	       			ulan:'miSecondChart',
	       			handler:function(){
		       		 	var tab = this.up('panel').up('panel');
						var items = tab.down('panel[region=center]').items;
		       		 	Ext.MessageBox.confirm(boxPromotion, boxDownChart, function(choice){
		                    if(choice == 'yes'){
	    						var chart = items.get(1);
		                        chart.save({
		                            type: 'image/png'
		                        });
		                    }
		                });
	       		 	}
	       		 }], 
       	 	 }
		});
		tbar.push(image);
		tbar.push("-");
		var refresh = Ext.create("Ext.button.Button",{
			xtype:'button',
			ulan:'btRefresh',
			handler:function(){
				store.load();	
			},
			text:'Refresh',
			iconCls:'refresh2',
		});
		tbar.push(refresh);
		return tbar;
	},
	createGaugeChart:function(store){
		var chart = Ext.create('Ext.chart.Chart', {
//		    renderTo: Ext.getBody(),
		    store: store,
//		    width: 800,
		    flex:1,
//		    height: 250,
		    animate: true,
		    insetPadding: 30,
//            legend: {
//				boxStrokeWidth:0,
//                position: 'float',
//            },
		    axes: [{
		        type: 'gauge',
		        position: 'gauge',
		        minimum: 0,
		        maximum: 100,
		        steps: 10,
		        margin: 10
		    }],
		    series: [{
		        type: 'gauge',
		        field: 'value',
		        showInLegend: true,
		        donut: 30,
		        colorSet: ['#82B525', '#ddd'],
		    }],
		    listeners:{
				refresh:{
					fn:function(cmp){
						if(cmp.legend.items[0])
						cmp.legend.items[0].suspendEvents(false);
					}
				},
			},
		});
		return chart;
	},
	createGaugeChartLayout:function(originStore){
		var asr = 0,curCpuUseage = 0;
		var store1,store2;
		store1 = Ext.create('Ext.data.JsonStore', {
		    fields: ['name','value'],
		    data: [
		        { name:'asr','value':100 }
		    ]
		});
		store2 = Ext.create('Ext.data.JsonStore', {
		    fields: ['name','value'],
		    data: [
		        { name:'curCpuUsage','value':100 }
		    ]
		});

		var chart1 = this.createGaugeChart(store1);
		var chart2 = this.createGaugeChart(store2);
		var chartLayout = Ext.create('Ext.panel.Panel',{
			title:tiChart,
			layout:'fit',
			border : false,
			itemId:'chart',
			zoom:'hour',
			originStore:originStore,
//			autoScroll:true,
			tbar:this.createGaugeTbar(originStore),
//			items:chart,
			items:[{
				region: 'center',
				border : false,
				autoScroll:true,
				layout:{
					type:'vbox',
					align:'stretch',
				},
				items:[chart1,chart2],
			}],
			listeners: {
				afterlayout:{
					fn:function(cmp){
						var chartArr = chartLayout.query('chart');
//						var arr = chartLayout.getSize();
						var offset = 120;
						
						for(var i=0;i<chartArr.length;i++){
//							chartArr[i].legend.items[0].suspendEvents(false)
							var arr = chartArr[i].getSize();
							var insetPadding = chartArr[i].insetPadding;
//							console.log(arr);
							if(arr.width>offset && arr.height>0){
								var legend = {};
								Ext.apply(legend,{
									boxStrokeWidth:0,
									position:'float',
									x:arr.width-offset-insetPadding,
									y:Math.floor(arr.height/2)-insetPadding
								});
//								console.log(legend);
								chartArr[i].legend = new Ext.chart.Legend(Ext.applyIf({chart:chartArr[i]}, legend))
								chartArr[i].refresh();
//								chartArr[i].legend.items[0].suspendEvents(false);
							}
						}
//						legendItems =  chartLayout.query('chart');
//						console.log(chartArr[0].legend.items[0])
//						chartArr[1].legend.items[0].suspendEvents(false);
					},
					single:true
				},				
			},
		})
		originStore.on('load',function(){
//			Ext.suspendLayouts();
			if(originStore.getCount()){
				asr = originStore.getAt(0).get('asr');				
				curCpuUsage = originStore.getAt(0).get('curCpuUsage');
				var chartArr = chartLayout.query('chart');
//				console.log(curCpuUseage);
				var model = store1.createModel({value:asr,name:'asr'});
				store1.removeAll();
				store1.add(model);
				var model = store2.createModel({value:curCpuUsage,name:'curCpuUsage'});
				store2.removeAll();
				store2.add(model);
				console.log('run 946 code ');
			}
			console.log('run 948 code ');
//			Ext.resumeLayouts(true);
		})
		return chartLayout;
	},
	getToDate:function(zoom,fromDate){
		var temp = new Date(fromDate);
		if(zoom == 'month'){
			temp.setMonth(fromDate.getMonth()+1);
		}else if(zoom == 'week'){
			temp.setDate(fromDate.getDate()+7);
		}else if(zoom == '3days'){
			temp.setDate(fromDate.getDate()+3);
		}else if(zoom == 'day'){
			temp.setDate(fromDate.getDate()+1);
		}else if(zoom == '8hours'){
			temp.setHours(fromDate.getHours()+8);
		}else{
			temp.setHours(fromDate.getHours()+3);
		}
		return temp;
 		
	},
	setDateByZoom:function(chartLayout){
		var zoom = chartLayout.zoom;
		var toDate = chartLayout.toDate;
		var fromDate = chartLayout.fromDate;
		fromDate.setFullYear(toDate.getFullYear()
				, toDate.getMonth()
				, toDate.getDate());
		fromDate.setHours(toDate.getHours()
				, toDate.getMinutes()
				, toDate.getSeconds()
				, toDate.getMilliseconds());
		if(zoom == 'month'){
			fromDate.setMonth(fromDate.getMonth()-1);
		}else if(zoom == 'week'){
			fromDate.setDate(fromDate.getDate()-7);
		}else if(zoom == '3days'){
			fromDate.setDate(fromDate.getDate()-3);
		}else if(zoom == 'day'){
			fromDate.setDate(fromDate.getDate()-1);
		}else if(zoom == '8hours'){
			fromDate.setHours(fromDate.getHours()-8);
		}else{
			fromDate.setHours(fromDate.getHours()-3);
		}
 		
	},
	cpDate:function(dstDate,srcDate){
		dstDate.setFullYear(srcDate.getFullYear()
				, srcDate.getMonth()
				, srcDate.getDate());
		dstDate.setHours(srcDate.getHours()
				, srcDate.getMinutes()
				, srcDate.getSeconds()
				, srcDate.getMilliseconds());
	},
	updateDate:function(date,direction,zoom){
		var tmp = 0;
		if(zoom == 'month'){
			if(direction == "prev"){
				tmp = -1;
			}else{
				tmp = 1;
			}
			date.setMonth(date.getMonth()+tmp);
		}else if(zoom == 'week'){
			if(direction == "prev"){
				tmp = -7;
			}else{
				tmp = 7;
			}
			date.setDate(date.getDate()+tmp);
		}else if(zoom == '3days'){
			if(direction == "prev"){
				tmp = -3;
			}else{
				tmp = 3;
			}
			date.setDate(date.getDate()+tmp);
		}else if(zoom == 'day'){
			if(direction == "prev"){
				tmp = -1;
			}else{
				tmp = 1;
			}
			date.setDate(date.getDate()+tmp);
		}else if(zoom == '8hours'){
			if(direction == "prev"){
				tmp = -8;
			}else{
				tmp = 8;
			}
			date.setHours(date.getHours()+tmp);
		}else{
			if(direction == "prev"){
				tmp = -3;
			}else{
				tmp = 3;
			}
			date.setHours(date.getHours()+tmp);
		}
	},
	setDate:function(chartLayout,direction){
		var zoom = chartLayout.zoom;
		var toDate = chartLayout.toDate;
		var fromDate = chartLayout.fromDate;
		var minDate = chartLayout.minDate;
		var maxDate = chartLayout.maxDate;
		
		Ext.getCmp('generalChart').updateDate(toDate,direction,zoom);
		if(toDate>maxDate){
			Ext.getCmp('generalChart').cpDate(toDate,maxDate);
		}
		Ext.getCmp('generalChart').cpDate(fromDate,toDate);
		Ext.getCmp('generalChart').updateDate(fromDate,"prev",zoom);
	},
	next:function(chartLayout){
		chartLayout.flag = 0;
		chartLayout.direction = 'next';
    	Ext.getCmp('generalChart').setDate(chartLayout,"next");
    	chartLayout.originStore.load();
	},
	prev:function(chartLayout){
		chartLayout.direction = 'prev';
		chartLayout.flag = 0;
    	Ext.getCmp('generalChart').setDate(chartLayout,"prev");
    	chartLayout.originStore.load();
	},
	afterRedraw:function(chartLayout){
    	var chart = chartLayout.query('chart')[0];
    	var timeHandler = Ext.getCmp('timeHandler');
    	if(!timeHandler){
    		timeHandler = Ext.create("app.util.TimeHandler",{});
    	}
    	
    	var hasFrom = 0, hasTo = 0;
		var toDate = chartLayout.toDate;
		var fromDate = chartLayout.fromDate;
		var minDate = chartLayout.minDate;
		var maxDate = chartLayout.maxDate;
		if(fromDate>minDate){
			hasFrom = 1;
		}
		if(toDate<maxDate){
			hasTo = 1;
		}
		var tbar = chartLayout.down('toolbar');
    	var next = tbar.down('button[itemId=next]');
    	var prev = tbar.down('button[itemId=prev]');
    	var top = tbar.down('button[itemId=top]');
    	var end = tbar.down('button[itemId=end]');
		if(!hasFrom){
			prev.setDisabled(true);
			top.setDisabled(true);
		}else{
			prev.setDisabled(false);
			top.setDisabled(false);
		}
		if(!hasTo){
			next.setDisabled(true);
			end.setDisabled(true);
		}else{
			next.setDisabled(false);
			end.setDisabled(false);
		}
	},
	calcLimit:function(chartLayout){
		var timeHandler = Ext.getCmp('timeHandler');
		if(!timeHandler){
			timeHandler = Ext.create("app.util.TimeHandler",{});
		}
		var zoom = chartLayout.zoom;
		var index = -1;
		var tabPanel = chartLayout.up('tabpanel');
		if(!tabPanel){
			index = 0;
		}else{
			index = tabPanel.up('panel').id.indexOf('15');
		}

		var step = (index>=0)?15:(24*60);
    	var chart = chartLayout.query('chart')[0];
    	var toDate = chartLayout.toDate;
    	var min = 0;
    	var da = new Date();
    	var ret = 0;
		if(zoom == 'month'){
			da.setFullYear(toDate.getFullYear()
					, toDate.getMonth()-1
					, toDate.getDate());
			da.setHours(toDate.getHours()
					, toDate.getMinutes()
					, toDate.getSeconds()
					, toDate.getMilliseconds());
			min = timeHandler.dateDiff1('d',da,toDate)*24*60;
			ret = min/step+1;
		}else if(zoom == 'week'){
			da.setFullYear(toDate.getFullYear()
					, toDate.getMonth()
					, toDate.getDate()-7);
			da.setHours(toDate.getHours()
					, toDate.getMinutes()
					, toDate.getSeconds()
					, toDate.getMilliseconds());
			min = timeHandler.dateDiff1('d',da,toDate)*24*60;
			ret = min/step+1;
		}else if(zoom == '3days'){
			min = 3*24*60;
			ret = min/step+1;
		}else if(zoom == 'day'){
			min = 24*60;
			ret = min/step+1;
		}else if(zoom == '8hours'){
			min = 8*60;
			ret = min/15+1;
		}else{
			min = 3*60;
			ret = min/15+1;
		}
		return ret;
	},
	getChartDbSuf:function(chartLayout){
		var index_15 = -1;
		var tabPanel = chartLayout.up('tabpanel');
		if(!tabPanel){
			index_15 = 0;
		}else{
			index_15 = tabPanel.up('panel').id.indexOf('15');
		}
		var suf = (index_15>=0)?"_15":"_24";
		return suf;
	},
	readDb:function(chartLayout,genChart){
		var chartDb = genChart.getChartDb(chartLayout,genChart);
		if(chartDb){
			if(chartDb.fromDate)
				chartLayout.fromDate = rs.timeStrToDate(chartDb.fromDate);
			if(chartDb.toDate)
				chartLayout.toDate = rs.timeStrToDate(chartDb.toDate);
			if(chartDb.zoom)
				chartLayout.zoom = chartDb.zoom;
		}
	},
	getChartDb:function(chartLayout,genChart){
		var suf = genChart.getChartDbSuf(chartLayout);
		var c = getCookie("generalChart"+suf);
		var chartDb = null;
//		console.log(c)
		if(c){
			chartDb = Ext.JSON.decode(c);
		}
//		var chartModule = genChart.dbChartModule+suf;
//		var chartItem = genChart.dbChartItem;
//		var chartMode = genChart.dbChartMode;
//		var json = ip.readDB(chartModule,chartItem,chartMode);
//		var chartDb = Ext.JSON.decode(json);		
		return chartDb;
	},
	regCallback:function(chartLayout,yFieldsArr){		
		var originStore = chartLayout.originStore;
		var calcLimit = this.calcLimit;
		chartLayout.toDate = new Date();
		chartLayout.fromDate = new Date();
		chartLayout.minDate = new Date();
		chartLayout.maxDate = new Date();
		chartLayout.flag = 1;
		chartLayout.start = 0;
		var url = originStore.getProxy().url;
		var index = url.indexOf('.action');
		originStore.getProxy().url = url.substring(0,index)+"ByTime.action";
		originStore.sortOnLoad = false;
		var genChart = this;
//		var readDb = this.readDb;
		originStore.on('beforeload',function(){
//			originStore.removeAll();
			var start = chartLayout.start;
			
			var limit = null;
			var from = chartLayout.fromDate;
			var to = chartLayout.toDate;
			if(!start){				
				from = null;
				to = null;
//				genChart.readDb(chartLayout,genChart);
				var chartDb = genChart.getChartDb(chartLayout,genChart);
				if(chartDb){
					if(chartDb.fromDate){
						chartLayout.fromDate = rs.timeStrToDate(chartDb.fromDate);
						from = chartLayout.fromDate;
					}
					if(chartDb.toDate){
						chartLayout.toDate = rs.timeStrToDate(chartDb.toDate);
						to = chartLayout.toDate;
					}
					if(chartDb.zoom)
						chartLayout.zoom = chartDb.zoom;
				}
			}
			limit = calcLimit(chartLayout);
			var from1 = null;
			if(from){
				from1 = new Date(from);
				var off = from1.getTimezoneOffset()
				from1.setHours(from1.getHours()+off/60)
			}
			var to1 = null;
			if(to){
				to1 = new Date(to);
				var off = to1.getTimezoneOffset()
				to1.setHours(to1.getHours()+off/60)
			}
			var flag = chartLayout.flag;
			var params = {start:start,limit:limit,from:from1,to:to1,flag:flag};			
			Ext.apply(originStore.proxy.extraParams, params);

		})

		originStore.on('load',function(){
//			Ext.suspendLayouts();
			var count = originStore.getCount();	
			var start = chartLayout.start;			
			if(!count && !start){
				chartLayout.redraw(chartLayout,null,null
			 			,chartLayout.zoom);
				return;
			}else if(count && !start){
				var timeStr = originStore.getAt(0).get('generateTime');
				var chartDb = genChart.getChartDb(chartLayout,genChart);
				if(chartDb)
					timeStr = chartDb.toDate;
				var time = rs.timeStrToDate(timeStr);
				var toDate = time;
				chartLayout.toDate.setFullYear(toDate.getFullYear()
						, toDate.getMonth()
						, toDate.getDate());
				chartLayout.toDate.setHours(toDate.getHours()
    					, toDate.getMinutes()
    					, 0
    					, 0);
				chartLayout.fromDate.setFullYear(toDate.getFullYear()
    					, toDate.getMonth()
    					, toDate.getDate());
				chartLayout.fromDate.setHours(toDate.getHours()
    					, toDate.getMinutes()
    					, 0
    					, 0);
				var zoom = chartLayout.zoom;
				if(chartDb)
					zoom = chartDb.zoom;
	     		if(zoom){
	     			var fromDate = chartLayout.fromDate;
	     			if(zoom == 'month'){
	     				fromDate.setMonth(fromDate.getMonth()-1);
	     			}else if(zoom == 'week'){
	     				fromDate.setDate(fromDate.getDate()-7);
	     			}else if(zoom == '3days'){
	     				fromDate.setDate(fromDate.getDate()-3);
	     			}else if(zoom == 'day'){
	     				fromDate.setDate(fromDate.getDate()-1);
	     			}else if(zoom == '8hours'){
	     				fromDate.setHours(fromDate.getHours()-8);
	     			}else{
	     				fromDate.setHours(fromDate.getHours()-3);
	     			}
	     		}
			}
			
			chartLayout.start = 1;
			if(chartLayout.flag==1 && count>=2){
				var timeStr0 = originStore.getAt(count-2).get('generateTime');
				var time0 = rs.timeStrToDate(timeStr0);
				var timeStr1 = originStore.getAt(count-1).get('generateTime');
				var time1 = rs.timeStrToDate(timeStr1);
				var maxTime = time0;
				var minTime = time1;
				if(maxTime<minTime){
					var tmp = maxTime;
					maxTime = minTime;
					minTime = tmp;
				}
				Ext.getCmp('generalChart').cpDate(chartLayout.maxDate,maxTime);
				Ext.getCmp('generalChart').cpDate(chartLayout.minDate,minTime);
				chartLayout.maxDate.setHours(chartLayout.maxDate.getHours()
    					, chartLayout.maxDate.getMinutes()
    					, 0
    					, 0);
				chartLayout.minDate.setHours(chartLayout.minDate.getHours()
    					, chartLayout.minDate.getMinutes()
    					, 0
    					, 0);

				if(!originStore.getAt(originStore.getCount()-1).get('uuid')){
					originStore.removeAt(originStore.getCount()-1);
				}
				if(!originStore.getAt(originStore.getCount()-1).get('uuid')){
					originStore.removeAt(originStore.getCount()-1);
				}

			}
			//默认加载min max record
			chartLayout.flag = 1;
			count = originStore.getCount();
			var removeArr = new Array();
			for(var i=0; i<count;i++){
				var model = originStore.getAt(i);
				var timeStr = model.get('generateTime');
				var time = rs.timeStrToDate(timeStr);				
				time.setHours(time.getHours()
    					, time.getMinutes()
    					, 0
    					, 0);
				model.set("generateTime1",time);
				if(time < chartLayout.fromDate){
					removeArr.push(model);
				}
			}
			if(removeArr.length > 0){
				//去除不显示的记录
//				alert("removeArr.length:"+removeArr.length
//						+"originStore.getCount:"+originStore.getCount());
				originStore.remove(removeArr);
			}

			var limit = calcLimit(chartLayout);
			var arr = new Array();
			arr.length = 2;
			arr[0] = null;
			arr[1] = null;
			var className = originStore.model;
			var index = -1;
			var tabPanel = chartLayout.up('tabpanel');
			if(!tabPanel){
				index = 0;
			}else{
				index = tabPanel.up('panel').id.indexOf('15');
			}
			var step = (index>=0)?15:24;
			var str = (index>=0)?'n':'h';
			var record = originStore.createModel({acd:30},originStore.model);
			var className = Ext.ClassManager.getName(record);			
			var chart = chartLayout.query('chart')[0];
	    	var toDate = chartLayout.toDate;
			var da = new Date();					
			da.setFullYear(toDate.getFullYear()
					, toDate.getMonth()
					, toDate.getDate());
			da.setHours(toDate.getHours()-((str=='h')?step:0)*0
					, toDate.getMinutes()-((str=='n')?step:0)*0
					, 0
					, 0);
			if(da>=chartLayout.minDate
					&& da<=chartLayout.maxDate){
				if(!originStore.findRecord('generateTime1',da)){
					var record = Ext.create(className);
					record.set('generateTime1',da);
					for(var k=0; k<yFieldsArr.length; k++){
						record.set(yFieldsArr[k],0);
					}
					arr[0] = record;
				}
			}
			var da = new Date();					
			da.setFullYear(toDate.getFullYear()
					, toDate.getMonth()
					, toDate.getDate());
			da.setHours(toDate.getHours()-((str=='h')?step:0)*(limit-1)
					, toDate.getMinutes()-((str=='n')?step:0)*(limit-1)
					, 0
					, 0);
			if(da>=chartLayout.minDate
					&& da<=chartLayout.maxDate){
				if(!originStore.findRecord('generateTime1',da)){
					var record = Ext.create(className);
					record.set('generateTime1',da);
					for(var k=0; k<yFieldsArr.length; k++){
						record.set(yFieldsArr[k],0);
					}
					arr[1]=record;
				}
			}
    	
			if(arr[0] || arr[1]){
				//首尾无记录补零			
				if(arr[1])
					originStore.add(arr[1])
//				originStore.insert(0,arr[1]);
				if(arr[0])
					originStore.add(arr[0])
					originStore.sort("generateTime1","desc");
//				originStore.add(arr[0]);
			}	

			chartLayout.redraw(chartLayout,chartLayout.fromDate,chartLayout.toDate
		 			,null);
//			Ext.resumeLayouts(true);
			var chartDb = {};
			var off = chartLayout.fromDate.getTimezoneOffset();
			chartDb.fromDate = new Date(chartLayout.fromDate);
			chartDb.fromDate.setHours(chartDb.fromDate.getHours()+off/60);
			chartDb.toDate = new Date(chartLayout.toDate);			
			chartDb.toDate.setHours(chartDb.toDate.getHours()+off/60);
			chartDb.minDate = new Date(chartLayout.minDate);			
			chartDb.minDate.setHours(chartDb.minDate.getHours()+off/60);
			chartDb.maxDate = new Date(chartLayout.maxDate);			
			chartDb.maxDate.setHours(chartDb.maxDate.getHours()+off/60);
			chartDb.zoom = chartLayout.zoom;
			var json = Ext.JSON.encode(chartDb);
			var suf = genChart.getChartDbSuf(chartLayout);			
			SetCookie("generalChart"+suf,json, "one month");
//			var chartModule = genChart.dbChartModule+suf;
//			var chartItem = genChart.dbChartItem;
//			var chartMode = genChart.dbChartMode;
//			ip.insertDB(chartModule,chartItem,chartMode,json);
		})
	}
});