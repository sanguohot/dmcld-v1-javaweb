Ext.define('app.view.systemconfig.ObjectTypeInfoPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	hidden:true,
	border:false,
	treeName:'',
	getTreeName:function(){
		return this.treeName;
	},
	initComponent: function(){

		var tableInfoTab=Ext.create('Ext.form.Panel',{
			title:tiTableInfo,
			
			border:false,
			bodyStyle: {
				background: '#DFE9F6',
			},
			width: 500,
		    bodyPadding: 5,
		    treeName:'',

		    fieldDefaults: {
	            labelAlign: 'left',
	            anchor: '75%'
	        },
	      

	        items: [{
	            xtype: 'displayfield',
	            name: 'tableName',
	            fieldLabel: 'Table Name',
	            value:'tbl_object_type'
	        }, {
	            xtype: 'displayfield',
	            name: 'detailDesc',
	            fieldLabel: 'Description',
	        }],
			
		});
		
		
		var tableGrid=Ext.create('app.view.systemconfig.ObjectTypeListPanel',{
			id:'objectTypeListGrid',
			title:lanControll.getLanValue('tiObjectTypeList'),
		});

		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[tableInfoTab,tableGrid]
	       
		}];
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	}
});