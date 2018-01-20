Ext.define('app.view.monitor.domain.NeLayout',{
	extend:'Ext.panel.Panel',
	 requires: [
               'Ext.util.Format',
               'Ext.grid.Panel',
	           ],
	layout:'border',
	treeId:'',
	viewConfig: {
		loadMask:{
			msg:lanControll.getLanValue('maskMsg')
		},
		enableTextSelection: true
	},
	title:lanControll.getLanValue('tiDeviceList'),
	forceRefresh:0,
	initComponent: function() {
		this.createView();
		this.callParent(arguments);		
	},
	createView:function(){
		this.createTbar();
		this.createItems();
	},
	createTbar:function(){
		var Refresh = Ext.create("Ext.button.Button",{
      		text:'Refresh',
      		ulan:'btRefresh',
       		iconCls:'refresh2',
			listeners:{
				click:function(){
					var grid = this.up('panel').down("panel[itemId=grid]");
					grid.getStore().load();
				}
			}
		});
		var Search = Ext.create("Ext.button.Button",{
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
		this.tbar = [Refresh,'->',Search];
	},
	createGridPanel:function(){
		var id = this.id;
		var index = id.indexOf("fDomain");
		var grid = Ext.create("app.view.monitor.domain.neList");
		if(index >= 0){
			var column = Ext.create("Ext.grid.column.Column",{
				header:"Domain Name",
				dataIndex:"domainName",
				width:120
			});
			grid.node = "fDomain";
			grid.down('headercontainer').insert(0,column);
		}else{
			grid.node = "domain";
		}
		return grid;
	},
	createSearchPanel:function(){
		
		var form = Ext.create('Ext.form.Panel',{
			border : false,
			bodyPadding : 5,
			defaults : {
				margins : '0 0 10 0'
			},
			fieldDefaults: {
		        labelAlign: 'left',
		        labelWidth: 100
		    },
			items : [{
				xtype:'textfield',
				fieldLabel:'Device Name',
				name:'neAlias',
			},{
				xtype:'textfield',
				fieldLabel:'Device SN',
				name:'productSn',
			}],
			
			buttons : [ {
					text : 'Reset',
					ulan:'btReset1',
					handler : function() {
						this.up('form').getForm().reset();
						var panel = this.up('form').up('panel').up('panel');
						var gridStore=panel.down("panel[itemId=grid]").store;				
						var form=this.up('form').getForm();
						var params = form.getValues();
						Ext.apply(gridStore.proxy.extraParams, params);
					}
			}, {
			text : 'Search',
			ulan:'btSearch',
			handler : function() {
				var panel = this.up('form').up('panel').up('panel');
				var gridStore=panel.down("panel[itemId=grid]").store;				
				var form=this.up('form').getForm();
				var params = form.getValues();
				Ext.apply(gridStore.proxy.extraParams, params);
				var paging = panel.down("pagingtoolbar");
				paging.moveFirst();
			}
			}]
		});
		
		var id = this.id;
		var index = id.indexOf("fDomain");
		if(index >= 0){
			var domainName = Ext.create("Ext.form.field.Text",{
				name:'domainName',
				fieldLabel:'Domain Name',
			});
			form.insert(0,domainName);
		}
		return form;
	},
	createItems:function(){
		 this.items=[{
			 region: 'center',
			 layout:'fit',
			 items:this.createGridPanel()						       
			},{
			 region:'east',
			 title : tiSearch,
			 collapsible: true,
			 collapsed:true,
			 width:270,
			 items:this.createSearchPanel()
			}
		 ];
	},
});
