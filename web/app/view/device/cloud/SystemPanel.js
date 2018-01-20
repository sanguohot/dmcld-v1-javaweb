Ext.define('app.view.device.cloud.SystemPanel',{
	extend:'Ext.panel.Panel',
	id:'deviceSystemPanel',
	layout:'fit',
	hidden:true,
	border:false,
	initComponent: function(){
		var systemTab1=Ext.create('Ext.panel.Panel',{
			title:lanControll.getLanValue('tiSysInfo'),
			id:'deviceSystemTab1',
			treeName:'',
			border:false,
			frame: true,
			width: 500,
		    bodyPadding: 5,

	        fieldDefaults: {
	            labelAlign: 'left',
	            labelWidth: 400,
	            anchor: '100%'
	        },
	        dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				items: [
				{
					text:'Save',
					tooltip:'Save',
					iconCls:'save',
					flag:"edit",
					handler: function() {}
				}						
				]		
	        }],
	        items: [{
	            xtype: 'displayfield',
	            name: 'cloudName',
	            fieldLabel: 'Server Name',
	            value: 'SIM Server 1',
	            width:300
	        }, {
	            xtype: 'displayfield',
	            name: 'password1',
//	            inputType: 'password',
	            fieldLabel: 'Alias',
	            value:'dinstar server 1'
	        },{
	            xtype: 'displayfield',
	            name: 'cloudName',
	            fieldLabel: 'Cloud Status',
	            value: '<span style="color:green;">Running</span>'
	        },{
	            xtype: 'displayfield',
	            name: 'cloudName',
	            fieldLabel: 'Proc Num',
	            value: '10000000'
	        }, {
	            xtype: 'displayfield',
	            name: 'vendorName',
	            fieldLabel: 'HB Inverval',
	            value:'500'
	        }, {
	            xtype: 'displayfield',
	            name: 'productName',
	            fieldLabel: 'HB Dead Check',
	            value:'5000'
	        }, {
	            xtype: 'datefield',
	            name: 'date1',
	            fieldLabel: 'Create Time',
	            value:'08/11/2011'
	        },{
	            xtype: 'textareafield',
	            name: 'description',
	            fieldLabel: 'Description',
	            value: 'about sim server description',
	            width:300,
	        }],
	       
		});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[systemTab1]
	       
		}];
		this.callParent(arguments);	
	}
});