Ext.define('app.view.provision.producttype.ProductTypePanel',{
	extend:'Ext.panel.Panel',
//	id:'productTypePanel',
	requires: [
		        'app.view.provision.producttype.VersionListPanel',
		       ],
	layout:'fit',
	hidden:true,
	border:false,
	treeName:'',
	getTreeName:function(){
		return this.treeName;
	},
	initComponent: function(){
		var productTypeStore=Ext.create('app.store.provision.producttype.ProductTypeStore',{});
		
		var productTypeTab=Ext.create('Ext.form.Panel',{
			title:lanControll.getLanValue('tiProductType'),
//			id:'productTypeTab',
			border:false,
			bodyStyle: {
				background: '#DFE9F6',
			},
			width: 500,
		    bodyPadding: 5,
		    treeName:'',
		    store:productTypeStore,
		    fieldDefaults: {
	            labelAlign: 'left',
	            anchor: '75%'
	        },
	      

	        items: [{
	            xtype: 'displayfield',
	            name: 'productId',
	            ulan:'deviceType',
	            fieldLabel: 'Device Type',
	        }, {
	            xtype: 'displayfield',
	            name: 'productName',
	            fieldLabel: 'Device Model',
	        }],
			
		});
		productTypeStore.on('load',function(){
			var r=productTypeStore.getAt(0);
			productTypeTab.loadRecord(r);
		});
		
		var productTypeTab2=Ext.create('app.view.provision.producttype.VersionListPanel',{
			id:'versionListInPT',
			title:lanControll.getLanValue('tiVersionList'),
			border:false,
		});
		productTypeTab2.addListener("afterlayout",function(){
			privilege.procPrivilege(productTypeTab2);
		},this,{single:true});
		this.items=[{
	       	xtype: 'tabpanel',
//	       	id:'cloudTab',
	       	items:[productTypeTab,productTypeTab2]
	       
		}];
		this.callParent(arguments);	
	}
});