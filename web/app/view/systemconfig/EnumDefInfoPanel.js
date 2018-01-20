Ext.define('app.view.systemconfig.EnumDefInfoPanel',{
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
	            value:'tbl_enum_def'
	        }, {
	            xtype: 'displayfield',
	            name: 'detailDesc',
	            fieldLabel: 'Description',
	        }],
			
		});
		
		
		var tableGrid=Ext.create('app.view.systemconfig.EnumDefTypePanel',{
			id:'enumDefTypeGrid',
			title:lanControll.getLanValue('tiEnumTypeList'),
		});

		
		var tableList=Ext.create('app.view.systemconfig.EnumDefListPanel',{
			id:'enumDefListGrid',
			title:lanControll.getLanValue('tiEnumList'),
		});
		
		var typeName1=tableList.down('textfield[name=typeName1]');
		typeName1.setValue("");
		typeName1.setReadOnly(false);
		typeName1.setFieldStyle("background:#FFF");

		

		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[tableInfoTab,tableGrid,tableList]
	       
		}];
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	}
});