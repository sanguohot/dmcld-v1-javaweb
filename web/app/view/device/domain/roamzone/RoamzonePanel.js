Ext.define('app.view.device.domain.roamzone.RoamzonePanel',{
	extend:'Ext.panel.Panel',
	id:'deviceRoamzonePanel',
	layout:'fit',
	hidden:true,
	border:false,
//	height:400,
//	width:400,
//	hideMode:'offsets',
//	collapsible:true,
//	width:500,
//	height:680,
	initComponent: function(){
	
		var roamzoneTab=Ext.create('app.view.device.domain.roamzone.RoamzoneTab',{
			title:'Card in Roamzone'
		});
		
		
		var roamzoneTab2=Ext.create('Ext.panel.Panel',{
			title:'Roamzone Info',
			id:'deviceRoamzoneTab2',
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
	            xtype: 'textfield',
	            name: 'roamzoneName',
	            fieldLabel: 'Roamzone Name',
	            value: 'shenzhen',
	        }, {
	            xtype: 'textfield',
	            name: 'alias',
//	            inputType: 'password',
	            fieldLabel: 'Alias',
	            value:'shenzhen roamzone'
	        },{
	            xtype: 'displayfield',
	            name: 'policyId',
	            fieldLabel: 'default Policy',
	            value: 'Group Policy 1'
	        }],
	       
		});
		
//		var roamzoneTab1=Ext.create('Ext.panel.Panel',{
//			border:false,
//			 requires: [
//			            'Ext.util.Format',
//			            'Ext.grid.Panel',
//			    		'app.store.RoamZoneStore'
//			        ],
//	        title:'Roamzone',
//	    	layout:'fit',
//	    		   	
//	        initComponent: function() {
//	    		var roamzone_store = Ext.create('app.store.RoamZoneStore', { });
//	    		var roamzone_grid = Ext.create('Ext.grid.Panel', {
//	    			autoScroll:true,
//	    			id:'roamzone_grid',
//	    			columnLines:true,
//	    			store: roamzone_store, 
//	    			selModel: Ext.create('Ext.selection.CheckboxModel'),
//	    			columns: [
//	    				{header: 'RoamzoneName',dataIndex: 'roamzonename',flex:1},										
//	    				{header: 'Desc',dataIndex: 'desc',flex:1},
//	    			],
//	    		});	
//	    		
//	    		this.items = [ roamzone_grid ];
//	    		//alert(this.roamzone_grid)		
//	    		this.callParent(arguments);		
//	    	},	
//			    		
//		
//		});
//		
//		var roamzoneTab2=Ext.create('Ext.panel.Panel',{
//			title:'RoamzoneTab2',
//			border:false
//		});
		
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[roamzoneTab2,roamzoneTab]
	       
		}];
		this.callParent(arguments);	
	}
	
});