Ext.define('app.view.systemconfig.CauseDesc',{
	extend:'Ext.panel.Panel',
	layout:'border',
	hidden:false,
	border:false,
	title:lanControll.getLanValue('causeDesc'),
	initComponent: function(){
		var causeListStore= Ext.create('app.store.systemconfig.CauseDescStore',{}); 
		var sm = Ext.create('Ext.selection.CheckboxModel');
		sm = null;
		this.store = causeListStore;
		var columns = [
						{header: 'Uuid',dataIndex: 'uuid',hidden:true},
						{header: 'Cause Id',dataIndex: 'causeId',width:120,},
						{header: 'Cause Name',dataIndex: 'causeName',width:120}
		               ];
		var isCn = lanControll.isCn();
		if(isCn){
			columns.push({header: 'Description',dataIndex: 'causeDescCn',ulan:'causeDescAbbr'});
		}else{
			columns.push({header: 'Description',dataIndex: 'causeDesc'});
		}
		var causeList=Ext.create('Ext.grid.Panel',{
			title:'',
			border:false,
			layout:'fit',
			autoScroll:true,
			columnLines:true,
			selModel: sm,
			store: causeListStore, 
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			columns: columns,
			listeners:{	
			},
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				items:[{
		       		 xtype:'button',
		       		 text:'Refresh',
		       		ulan:'btRefresh',
		       		 iconCls:'refresh2',
		       		 flag:"super_read",
		       		 listeners:{
		       		 	click:function(){
		        		    var page=causeList.down('pagingtoolbar');
		        		    page.moveFirst();
		       	 		}
		       	 	}
		       	 },'->',{
		       		 xtype:'button',
		       		 text:'Search',
		       		ulan:'btSearch',
		       		 iconCls:'search',
		       		 flag:"super_read",
		       		 listeners:{
		       		 	click:function(){
		       		 		var eastSearch=Ext.getCmp("causeDesc_east_search1");
		       		 		if(eastSearch.isHidden()){
		       		 			eastSearch.expand();
		       		 		}else{
		       		 			eastSearch.collapse();
		       		 		}
		       	 		}
		       	 	}
				}]
			},{
				itemId:'pagingtoolbar',
			     dock: 'bottom',
				 xtype: 'pagingtoolbar',
			     store: causeListStore ,
			     displayInfo: true,
			     
			}],	
			
		});
		causeList.addListener("afterlayout",function(){
			privilege.procPrivilege(causeList);
		},this,{single:true});
		var search_grid=Ext.create('Ext.form.Panel',{
			border : false,
			bodyPadding : 5,
			defaults : {
			margins : '0 0 10 0'
			},
			items : [ {
				xtype:'textfield',
				fieldLabel:'Cause Id',
				name:'causeId',
			},{
				xtype:'textfield',
				fieldLabel:'Cause Name',
				name:'causeName',
			},{
				xtype:'textfield',
				fieldLabel:'Description',
				name:'causeDesc',
			}
	        ],
			
			buttons : [{
					text : 'Reset',
					ulan:'btReset1',
					flag:"super_read",
					handler : function() {
						this.up('form').getForm().reset();
					}
			},{
				text : 'Search',
				flag:"super_read",
				ulan:'btSearch',
				handler : function() {
					var form=this.up('form').getForm();
        		    var causeListStore=causeList.getStore();
					var params = form.getValues();
					causeListStore.on('beforeload', function (causeListStore, options) {
        		        var params = form.getValues();
        		        Ext.apply(causeListStore.proxy.extraParams, params);
        		    },this,{single: true});
					var page=causeList.down('pagingtoolbar');
					page.moveFirst();
				}
			}]
		});
		
		 this.items=[{
			 region: 'center',
			 layout:'fit',
			 border:false,
			 items:[causeList]
			},{
			 id:'causeDesc_east_search1',
			 itemId:'search',
			 region:'east',
			 title : tiSearch,
			 collapsible: true,
			 collapsed:true,
			 width:300,
			 items:[search_grid]
		 }];
		
		this.callParent(arguments);	
	}
});