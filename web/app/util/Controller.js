Ext.define('app.util.Controller',{
	id:'controller',
	tabpanel_tabchange:function(tabPanel,newTab,oldTab,obj){
		if(!tabPanel.needChange){
			return;
		}
		var record = treeFn.record;
		var tab = newTab;
		var rightPanel = tabPanel.up('panel[itemId=rightPanel]');
		if(rightPanel.id == 'logPanel'){
			SetCookie("logActiveTab",tabPanel.items.indexOf(newTab), "one month");
		}
		if(rightPanel.id == 'privilegePanel'){
			SetCookie("priActiveTab",tabPanel.items.indexOf(newTab), "one month");
		}
		if(rightPanel && treeFn.specProc(record)){
			if(rightPanel.id.indexOf("monitor")>=0){
//				var index0,index1;
//				if(newTab.down('tabpanel')){
//					index0 = tabPanel.items.indexOf(newTab);
//					index1 = newTab.down('tabpanel').items.indexOf(newTab.down('tabpanel').getActiveTab());
//				}else{
//					index1 = tabPanel.items.indexOf(newTab);
//					index0 = tabPanel.up('tabpanel').items.indexOf(tabPanel.up('tabpanel').getActiveTab());
//				}
//				if(index0 <= 2)
//				rightPanel.activeArr['DEVICE'] = index0;
//				rightPanel.activeArr['DEVICE1'] = index1;
			}else if(rightPanel.id == 'logPanel'){
				
			}else if(rightPanel.id == 'privilegePanel'){
				
			}else{
				var index = tabPanel.items.indexOf(newTab);
				if(index < tabPanel.initTabNum)
				rightPanel.activeArr['DEVICE'] = index;
				
				
			}
		}
		if(!(rightPanel.id.indexOf("monitor")>=0) && !(rightPanel.id.indexOf("logPanel")>=0)
				&& !(rightPanel.id.indexOf("privilegePanel")>=0)&&!(rightPanel.id.indexOf("batchPanel")>=0)){
			rightPanel.activeArr['eType']=record.raw.eType;
			rightPanel.activeArr['index']=tabPanel.items.indexOf(tab);
		}

		if(newTab.down('tabpanel')){
			tab = newTab.down('tabpanel').getActiveTab();
			if(tab.down('tabpanel')){
				tab = tab.down('tabpanel').getActiveTab();
			}
		}
		
//		var button = tab.down('splitbutton[itemId=autoRefresh]');
//		if(button){
//			if(autoRefresh.isAuto(button)){
//				return;
//			}
//		}
		var grid = tab.down('gridpanel');
		var colAuto = null;
		if(grid && grid.columnAutoWidthPlugin) colAuto = grid.columnAutoWidthPlugin;
		if(colAuto) colAuto.suspend();
		if(tab.down("pagingtoolbar")){
			if(tab.down("pagingtoolbar").store.loadFlag){
				tab.down("pagingtoolbar").moveFirst();
				tab.down("pagingtoolbar").store.loadFlag = false;
			}
		}else if(tab.comboxStore 
			&& tab.comboxStore.loadFlag){
			tab.comboxStore.load();
			tab.comboxStore.loadFlag = false;
		}else if(tab.store 
			&& tab.store.loadFlag){
			if(tab.params){
				tab.store.load(tab.params);
			}else{
				tab.store.load();
			}
			tab.store.loadFlag = false;
		}else if(tab.originStore
				&& tab.originStore.loadFlag){
			tab.originStore.load();
			tab.originStore.loadFlag = false;
		}
		if(colAuto) colAuto.resume(true);
	},
	createCdrSearchPanel:function(cdrGrid){
		var search_grid=Ext.create('Ext.form.Panel',{
			border : false,
			bodyPadding : 5,
			itemId:'searchForm',
			defaults : {
			margins : '0 0 10 0'
			},
			items : [{
				xtype:'textfield',
				fieldLabel:'Alias',
				name:'alias',
			},{
				xtype:'textfield',
				fieldLabel:'Number',
				name:'callNumber',
			},{

	            xtype: 'combo',
	            name: 'callDirection',
	            fieldLabel: 'Direction',
				mode : 'local',
				editable:false,
				displayField : 'name',
				valueField : 'statusId',
				queryMode : 'local',
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'statusId' ],
					data : [ {
						name : '-SELECT-',
						statusId : -1
					},{
						name:lanControll.getLanValue('callDirection_'+0),
						statusId :0
					}, {
						name:lanControll.getLanValue('callDirection_'+1),
						statusId :1
					}, {
						name:lanControll.getLanValue('callDirection_'+2),
						statusId :2
					} ]
				}),
				
	        
			},{
	            xtype: 'combo',
	            name: 'callStatus',
	            fieldLabel: 'Call Status',
				mode : 'local',
				editable:false,
				displayField : 'name',
				valueField : 'statusId',
				queryMode : 'local',
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'statusId' ],
					data : [ {
						name : '-SELECT-',
						statusId : -1
					},{
						name : lanControll.getLanValue('callStatus_'+0),
						statusId :0
					}, {
						name : lanControll.getLanValue('callStatus_'+1),
						statusId : 1
					}, {
						name : lanControll.getLanValue('callStatus_'+2),
						statusId : 2
					}, {
						name : lanControll.getLanValue('callStatus_'+3),
						statusId : 3
					}, {
						name : lanControll.getLanValue('callStatus_'+4),
						statusId : 4
					}, {
						name : lanControll.getLanValue('callStatus_'+5),
						statusId : 5
					}, {
						name : lanControll.getLanValue('callStatus_'+100),
						statusId : 100
					}, {
						name : lanControll.getLanValue('callStatus_'+101),
						statusId : 101
					}, {
						name : lanControll.getLanValue('callStatus_'+102),
						statusId : 102
					}, {
						name : lanControll.getLanValue('callStatus_'+103),
						statusId : 103
					}, {
						name : lanControll.getLanValue('callStatus_'+200),
						statusId : 200
					}, {
						name : lanControll.getLanValue('callStatus_'+201),
						statusId : 201
					}, {
						name : lanControll.getLanValue('callStatus_'+202),
						statusId : 202
					} ]
				}),
				
	        },{
	            xtype: 'combo',
	            name: 'callResult',
	            fieldLabel: 'Call Result',
				mode : 'local',
				editable:false,
				displayField : 'name',
				valueField : 'statusId',
				queryMode : 'local',
				store : Ext.create('Ext.data.Store', {
					fields : [ 'name', 'statusId' ],
					data : [{
						name : '-SELECT-',
						statusId : -1
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+0),
						statusId : 0
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+1),
						statusId : 1
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+2),
						statusId : 2
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+3),
						statusId : 3
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+4),
						statusId : 4
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+5),
						statusId : 5
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+6),
						statusId : 6
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+7),
						statusId : 7
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+8),
						statusId : 8
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+9),
						statusId : 9
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+10),
						statusId : 10
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+11),
						statusId : 11
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+12),
						statusId : 12
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+13),
						statusId : 13
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+14),
						statusId : 14
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+15),
						statusId : 15
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+16),
						statusId : 16
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+17),
						statusId : 17
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+18),
						statusId : 18
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+19),
						statusId : 19
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+20),
						statusId : 20
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+21),
						statusId : 21
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+22),
						statusId : 22
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+100),
						statusId : 100
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+101),
						statusId : 101
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+102),
						statusId : 102
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+103),
						statusId : 103
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+104),
						statusId : 104
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+200),
						statusId : 200
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+201),
						statusId : 201
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+202),
						statusId : 202
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+203),
						statusId : 203
					},{
						name : lanControll.getLanValue('smsUssdCallResult_'+204),
						statusId : 204
					}]
				}),
	        },{
				xtype:'datefield',
				fieldLabel:'Start Time Begin',
				name:'startTimeB',
				format: 'Y-m-d',
			},{
				xtype:'datefield',
				fieldLabel:'Start Time End',
				name:'startTimeE',
				format: 'Y-m-d',
			},{
				xtype:'datefield',
				fieldLabel:'Result Time Begin',
				name:'resultTimeB',
				format: 'Y-m-d',
			},{
				xtype:'datefield',
				fieldLabel:'Result Time End',
				name:'resultTimeE',
				format: 'Y-m-d',
			}],
			buttons : [{
					text : 'Reset',
					ulan:'btReset1',
					flag:"domain_read",
					handler : function() {
						this.up('form').getForm().reset();
						this.up('form').getForm().findField('callDirection').setValue(-1);
						this.up('form').getForm().findField('callStatus').setValue(-1);
						this.up('form').getForm().findField('callResult').setValue(-1);
					}
			}, {
				text : 'Search',
				flag:"domain_read",
				itemId:'search',
				ulan:'btSearch',
				handler : function() {
	    			var panel = this.up('form').up('panel').up('panel');
					var gridStore=cdrGrid.store;				
					var form=this.up('form').getForm();
					var params = form.getValues();
					Ext.apply(gridStore.proxy.extraParams, params);
					var paging = cdrGrid.down("pagingtoolbar");
					paging.moveFirst();
				}
			}],
			listeners: {
		        afterRender: function(thisForm, options){
		            this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
		                enter: function(){
		                    var btn =search_grid.down('button[itemId=search]');
		                    btn.handler();
		                },
		                scope: this
		            });
		        }
		    },
		});
		
		var refresh = Ext.create("Ext.button.Button",{
      		text:'Refresh',
      		ulan:'btRefresh',
       		iconCls:'refresh2',
			listeners:{
				click:function(){
					cdrGrid.getStore().load();
				}
			}
		});
		var search = Ext.create("Ext.button.Button",{
      		text:'Search',
       		iconCls:'search',
       		ulan:'btSearch',
			listeners:{
				click:function(){
			 		var eastSearch=this.up('panel').down("panel[region=east]");
	   		 		if(eastSearch.isHidden()){
	   		 			eastSearch.expand();
	   		 		}else{
	   		 			eastSearch.collapse();
	   		 		}
				}
			}
		});
		var cdrPanel=Ext.create('Ext.panel.Panel',{
			layout:'border',
			title:tiCdrList,
			border:false,
			autoScroll:false,
			tbar:[refresh,'->',search],
			items:[{
				 region: 'center',
				 layout:'fit',
				 autoScroll:false,
				 items:[cdrGrid]
			},{
				 itemId:'search',
				 region:'east',
				 title : tiSearch,
				 collapsible: true,
				 collapsed:true,
				 width:300,
				 items:[search_grid]
			}]
		});
		return cdrPanel;
	},
	
//	saveActiveTab:function(tabPanel,newTab,oldTab,obj){
//		if(!tabPanel.activeArrs[this.record.raw.tid]){
//			tabPanel.activeArrs[this.record.raw.tid] = tabPanel.getComponent(0);
//		}else{
//			var activeTab = tabPanel.getActiveTab();
//			tabPanel.activeArrs[this.record.raw.tid] = activeTab;
//		}
//	},
});
