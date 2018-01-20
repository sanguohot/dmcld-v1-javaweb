Ext.define('app.view.monitor.domain.zone.NeSMSMonitor', {
	extend : 'Ext.panel.Panel',
	id : 'neSmsMonitorPanel',
	layout : 'fit',
	hidden : true,
	// title:'AllCloudPanel',
	border : false,
	treeName : '',
	getTreeName : function() {
		return this.treeName;
	},
	initComponent : function() {
		var smsMonitorStore=Ext.create('app.store.monitor.NeSMSMonitorStore',{});
		var smsMonitorTab = Ext.create('Ext.panel.Panel', {
			id : 'neSmsMonitorTab',
			title : 'SMS Count/SMS Success Rate',
			// renderTo: Ext.getBody(),
			layout : 'fit',
			items : {
				xtype : 'chart',
				animate : false,
				store:smsMonitorStore,
				insetPadding : 30,
				legend : {
					position : 'right'
				},
				gradients : [ {
					angle : 90,
					id : 'bar-gradient',
					stops : {
						0 : {
							color : '#99BBE8'
						},
						70 : {
							color : '#77AECE'
						},
						100 : {
							color : '#77AECE'
						}
					}
				} ],
				axes : [ {
					type : 'Numeric',
					minimum : 0,
					maximum : 100,
					position : 'left',
					fields : [ 'data1' ],
					title : false,
					grid : true,
					label : {
						renderer : Ext.util.Format.numberRenderer('0,0'),
						font : '10px Arial'
					}
				}, {
					type : 'Category',
					position : 'bottom',
					fields : [ 'name' ],
					title : false,
					grid : true,
					label : {
						font : '11px Arial',
						renderer : function(name) {
							return name;// .substr(0, 3);
					}
					}
				} ],
				series : [
						{
							type : 'column',
							axis : 'left',
							xField : 'name',
							yField : 'data1',
							style : {
								fill : 'url(#bar-gradient)',
								'stroke-width' : 3
							},
							markerConfig : {
								type : 'circle',
								size : 4,
//								theme : 'Red',
								radius : 4,
								'stroke-width' : 0,
								fill : '#38B8BF',
								stroke : '#38B8BF'
							}
						},
						{
							type : 'line',
							axis : 'left',
							xField : 'name',
							yField : 'data2',
							tips : {
								trackMouse : true,
								width : 130,
								height : 25,
								renderer : function(storeItem, item) {
									this.setTitle(storeItem.get('data2')
											+ ' visits in '
											+ storeItem.get('name') + ' hour');// .substr(0,
																				// 3));
								}
							},
							style : {
								fill : '#18428E',
								stroke : '#18428E',
								'stroke-width' : 3
							},
							markerConfig : {
								type : 'circle',
								size : 4,
								radius : 4,
								'stroke-width' : 0,
								fill : '#18428E',
								stroke : '#18428E'
							}
						} ]
			}
		});
		
		
		
		this.items = [ {
			xtype : 'tabpanel',
			// id:'cloudTab',
			items : [ smsMonitorTab ]

		} ];
		this.callParent(arguments);
	}
});