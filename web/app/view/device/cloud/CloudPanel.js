Ext.define('app.view.device.cloud.CloudPanel',{
	extend:'Ext.panel.Panel',
	id:'deviceCloudPanel',
	layout:'fit',
	hidden:true,
	border:false,
	treeName:'',
	getCloudName:function(){
		return this.cloudName;
	},
	initComponent: function(){
		var cloudTab1=Ext.create('Ext.panel.Panel',{
			title:lanControll.getLanValue('tiCloudInfo'),
			id:'DeviceCloudTab1',
			border:false,
			frame: true,
			width: 500,
		    bodyPadding: 5,
		    treeName:'',

	        fieldDefaults: {
	            labelAlign: 'left',
	            labelWidth: 120,
	            anchor: '100%'
	        },

	        items: [{
	            xtype: 'displayfield',
	            name: 'cloudName',
	            fieldLabel: 'Cloud Name',
	            value: 'SIM Cloud'
	        }, {
	            xtype: 'textfield',
	            name: 'password1',
	            inputType: 'password',
	            fieldLabel: 'Password',
	            value:'dinstar'
	        },{
	            xtype: 'displayfield',
	            name: 'cloudStatus',
	            fieldLabel: 'Cloud Status',
	            value: '<span style="color:green;">Running</span>'
	        }, {
	            xtype: 'displayfield',
	            name: 'vendorName',
	            fieldLabel: 'Device Vendor',
	            value:'dinstar'
	        }, {
	            xtype: 'displayfield',
	            name: 'productName',
	            fieldLabel: 'Device Model',
	            value:'dinstar'
	        },{
	            xtype: 'textareafield',
	            name: 'description',
	            fieldLabel: 'Description',
	            value: 'about cloud description'
	        }, {
	            xtype: 'datefield',
	            name: 'date1',
	            fieldLabel: 'Create Time',
	            value:'08/10/2011'
	        }],
	        dockedItems: [{
	            xtype: 'toolbar',
	            items: [{
	            	text:'Save',
					ulan:'btSave',
					iconCls:'save',
					flag:"edit",
					handler: function() {}
	            }]
	        }],			
		});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[cloudTab1]
	       
		}];
		this.callParent(arguments);	
	}
});