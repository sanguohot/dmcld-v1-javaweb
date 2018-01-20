Ext.define('app.view.log.LicDomainLogGrid',{
	extend:'Ext.panel.Panel',
	 requires: [
              'Ext.util.Format',
              'Ext.grid.Panel',
              'Ext.toolbar.Paging',
	           ],
	title:'',
	layout:'border',
	treeId:'',
	store:null,
	border:false,
	loadFlag:true,
	initComponent: function() {
		var gridStore= Ext.create("app.store.log.LicDomainLogStore");
		this.store = gridStore;
		var sm = Ext.create('Ext.selection.CheckboxModel');		
		var grid = Ext.create('Ext.grid.Panel', {
			itemId:'grid',
			treeName:'',
			parentNodeTid:'',
			border:false,
			columnLines:true,
			store: gridStore, 
			selModel: sm,
			viewConfig: {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
	  		},
			columns: [
					{header: 'Uuid',dataIndex: 'uuid',hidden:true},
					{header: 'domainUuid',dataIndex: 'domainUuid',},
					{header: 'domainName',dataIndex: 'domainName',},
					{header: 'actionStatus',dataIndex: 'actionStatus'},
					{header: 'actionResult', dataIndex: 'actionResult'},
					{header: 'actionTime', dataIndex: 'actionTime',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,},
					{header: 'trialRecharge', dataIndex: 'trialRecharge',},
					{header: 'trialDiff', dataIndex: 'trialDiff',},
					{header: 'trialBalance', dataIndex: 'trialBalance',},
					{header: 'premiumRecharge', dataIndex: 'premiumRecharge',},
					{header: 'premiumDiff', dataIndex: 'premiumDiff',},
					{header: 'premiumBalance', dataIndex: 'premiumBalance',},
					{header: 'signType', dataIndex: 'signType',hidden:true},
					{header: 'maxSimCard', dataIndex: 'maxSimCard',},
					{header: 'serviceApi', dataIndex: 'serviceApi',hidden:true},
					{header: 'hbmFeatures', dataIndex: 'hbmFeatures',},
					{header: 'hbmFeatures02', dataIndex: 'hbmFeatures02',hidden:true},
					{header: 'hbmFeatures03', dataIndex: 'hbmFeatures03',hidden:true},
					{header: 'validDays', dataIndex: 'validDays',},
					{header: 'expiredDate',dataIndex: 'expiredDate',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,hidden:true},
					{header: 'signDate',dataIndex: 'signDate',xtype: 'datecolumn',format:'Y-m-d H:i:s',width:120,hidden:true},
					{header: 'leftDays', dataIndex: 'leftDays',hidden:true},
					{header: 'detailDesc', dataIndex: 'detailDesc',hidden:true},
			],
			dockedItems:[{
			     dock: 'bottom',
				 xtype: 'pagingtoolbar',
			     store: gridStore,
			     pageSize: 25,
			     displayInfo: true,
			}]
		});

		this.tbar=[{
	       		 xtype:'button',
	       		 text:'Refresh',
	       		 ulan:'btRefresh',
	       		 iconCls:'refresh2',
	       		 listeners:{
	       		 	click:function(){
						this.up('panel').down('panel[itemId=grid]').getStore().load();
	       	 		}
	       	 	}
	       	 },'->',{
	       		 xtype:'button',
	       		 text:'Search',
	       		 ulan:'btSearch',
	       		 iconCls:'search',
	       		 listeners:{
	       		 	click:function(){
	       		 		var eastSearch=this.up('panel').down('panel[itemId=search]');
	       		 		if(eastSearch.isHidden()){
	       		 			eastSearch.expand();
	       		 		}else{
	       		 			eastSearch.collapse();
	       		 		}
	       	 		}
	       	 	}
	    }];	
		
		var search_grid=Ext.create('Ext.form.Panel',{
			border : false,
			bodyPadding : 5,
			defaults : {
			margins : '0 0 10 0',
			labelWidth:120
			},
			items : [{
				xtype:'textfield',
				fieldLabel:'Domain Name',
				name:'domainName',
			}],
			
			buttons : [{
					text : 'Reset',
					ulan:'btReset1',
					handler : function() {
						this.up('form').getForm().reset();
					}
			},{
				text : 'Search',
				ulan:'btSearch',
				handler : function() {
					var store = this.up('form').up('panel').up('panel').store;
					var form=this.up('form').getForm();
					var params = form.getValues();
					Ext.apply(store.proxy.extraParams, params);
					this.up('form').up('panel').up('panel').down('pagingtoolbar').moveFirst();
				}
			}]
		});
		
		var store = this.store;
		var params = search_grid.getValues();
		Ext.apply(store.proxy.extraParams, params);
		this.items=[
		   {
			 region: 'center',
			 layout:'fit',
			 border:false,
			 items:[grid]
			},{
			 itemId:'search',
			 region:'east',
			 title : tiSearch,
			 collapsible: true,
			 collapsed:true,
			 border:false,
			 width:300,
			 items:[search_grid]
		 }];
		this.callParent(arguments);		
	},
	listeners:{
		activate: function(tab){
			if(this.loadFlag){
				this.loadFlag=false;
				this.store.load();
			}
		}
	}
})