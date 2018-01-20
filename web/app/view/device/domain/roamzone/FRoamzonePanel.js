Ext.define('app.view.device.domain.roamzone.FRoamzonePanel',{
	extend:'Ext.panel.Panel',
	id:'deviceFroamzonePanel',
	layout:'fit',
	hidden:true,
//	title:'AllCloudPanel',
	border:false,
	initComponent: function(){
//		var cloudPanel1=Ext.create('app.view.operation.domain.roamzone.RoamzoneTab',{});
//		var cloudPanel2=Ext.create('app.view.operation.domain.roamzone.SiteTab',{});
		var froamzoneTab=Ext.create('Ext.panel.Panel',{
			title:'Roamzone Info',
//			id:'froamzoneTab',
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
		var siteTab=Ext.create('app.view.device.domain.roamzone.SiteTab',{});
		var roamzone_store = Ext.create('app.store.RoamZoneStore', {});
		var froamzoneTab1=Ext.create('Ext.grid.Panel',{
			title:'Roamzone',
			id:'deviceFroamzoneTab1',
			treeName:'',
			border:false,
			autoScroll:true,
			columnLines:true,
			store: roamzone_store, 
			selModel: Ext.create('Ext.selection.CheckboxModel'),
			columns: [
				{header: 'RoamzoneName',dataIndex: 'roamzonename',flex:1},										
				{header: 'Desc',dataIndex: 'desc',flex:1},
			],
			tbar: [{
	    		xtype:'button',
	    		text: 'Add',
	    		iconCls:'add',
	    		listeners:{ 
	    			click: function() {
	    				var window = Ext.create('app.view.gateway.gwRoamzoneAddWindow');
	    				window.show();
	    			}						
	    		},
	    	},{
	    		text:'Mod',
	    		tooltip:'Modify a Roamzone',
	    		iconCls:'option',
	    		flag:"edit",
	    		listeners:{ 
	    			click: function() {
	    				var grid = Ext.getCmp('roamzone_grid');
	    				if(grid.getSelectionModel().hasSelection()){
	    					
	    					var record=grid.getSelectionModel().getSelection();
	    					if(record.length!=1){
	    						Ext.MessageBox.alert({title:'Error',msg:'You selected '+record.length+' records, please select only one record!'})
	    						return;
	    					}

	    					var roamzonename=record[0].get('roamzonename');
	    					var desc=record[0].get('desc');					
	    					var window = Ext.create('app.view.gateway.gwRoamzoneModWindow');

	    					if(roamzonename != undefined)
	    					window.down('form').getForm().findField('gw_roamzone_mod_roamzone').setValue(roamzonename);

	    					if(desc != undefined)
	    					window.down('form').getForm().findField('gw_roamzone_mod_desc').setValue(desc);

	    					window.show();
	    				}
	    				else{
	    					alert("Please select a record");
	    				}
	    			}
	    		}
	    	},{
	    		text:'Del',
	    		tooltip:'Delete the selected Roamzone',
	    		iconCls:'remove',
	    		listeners:{ 
	    			click: function() {
	    					var grid = Ext.getCmp('roamzone_grid');
	    					if ( grid.getSelectionModel().hasSelection() ){
	    						Ext.MessageBox.confirm(boxWarnning,"Are you sure delete current roamzone",function(e) { 																				
	    								if( e == 'yes' )
	    								{
	    									var records= grid.getSelectionModel().getSelection();
	    									for(var i=0;i<records.length;i++){
	    										grid.store.remove(records[i]);
	    									}
	    								}	
	    						})
	    					}	
	    				}		
	    		}							
	    	}],
		});
//		alert("cloudPanel1="+cloudPanel1);
		this.items=[{
	       	xtype: 'tabpanel',
//	       	id:'cloudTab',
	       	items:[froamzoneTab1]
	       
		}];
		this.callParent(arguments);	
	}
});