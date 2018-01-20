Ext.define('app.view.systemconfig.TableInfoPanel',{
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
	        }, {
	            xtype: 'displayfield',
	            name: 'detailDesc',
	            fieldLabel: 'Description',
	        }],
			
		});
		
		
		var tableGrid=Ext.create('app.view.systemconfig.AlarmDescListPanel',{
			id:'alarmDescListGrid',
			title:'',
			border:false,
		});

		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[tableInfoTab,tableGrid]
	       
		}];
		this.callParent(arguments);	
	}
});