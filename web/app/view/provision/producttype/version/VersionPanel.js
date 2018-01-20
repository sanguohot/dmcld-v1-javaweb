Ext.define('app.view.provision.producttype.version.VersionPanel',{
	extend:'Ext.panel.Panel',
	id:'versionPanel',
	layout:'fit',
	hidden:true,
//	title:'AllCloudPanel',
	border:false,
	
//	treeName:'',
//	getTreeName:function(){
//		return this.treeName;
//	},
	initComponent: function(){
		var versionStore=Ext.create('app.store.provision.producttype.version.VersionStore',{});
	
		var versionTab=Ext.create('Ext.form.Panel',{
			title:lanControll.getLanValue('tiVersionInfo'),
			id:'versionTab',
			store:versionStore,
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
	            xtype: 'hiddenfield',
	            name: 'uuid',
	        },{
	            xtype: 'displayfield',
	            name: 'packageVer',
	            ulan:'version',
	            fieldLabel: 'Version',
	        }, {
	            xtype: 'displayfield',
	            name: 'alias',
	            fieldLabel: 'Alias',
	        }, {
	            xtype: 'displayfield',
	            name: 'relyVer',
	            fieldLabel: 'Rely Version',
	        },{
                xtype: 'combobox',
                fieldLabel: 'Status',
                name: 'status',
                valueField: 'statusId',
                displayField: 'status',
                
                editable:false,
                queryMode: 'local',
                emptyText: '',
                store: Ext.create('Ext.data.Store', {
                    fields: ['statusId', 'status'],
                    data : [{statusId:0,status:lanControll.getLanValue('versionStatus_'+0),},{statusId:1,status:lanControll.getLanValue('versionStatus_'+1),}]
                }),
               
            }
//	        ,{
//	            xtype: 'displayfield',
//	            name: 'status',
//	            fieldLabel: 'Status',
//	        }
	        ,{
	            xtype: 'displayfield',
	            name: 'vendorId',
	            fieldLabel: 'Vendor',
	        }, {
	            xtype: 'displayfield',
	            name: 'productId',
	            ulan:'deviceType',
	            fieldLabel: 'Device Name',
	        }, {
	            xtype: 'displayfield',
	            name: 'createTime',
	            fieldLabel: 'Build Time',
	        }, {
	            xtype: 'hiddenfield',
	            name: 'updateTime',
	            fieldLabel: 'Update Time',
	        },{
	            xtype: 'textareafield',
	            name: 'detailDesc',
	            fieldLabel: 'Description',
	        }],
	        
	        createTbar:function(){
	    		var tbar = [];
	    		
    			var commit = Ext.create('Ext.button.Button',{
		            text: 'Commit',
		            iconCls:'save',
		            flag:"super_edit",
		            ulan:'btCommit',
//		            formBind: true, //only enabled once the form is valid
//		            disabled: true,
		            handler: function() {
		                var form = this.up('form').getForm();
		                if (form.isValid()) {
		                	Ext.Ajax.request({
		                		url:'versionManager!updateVersion.action',
		                		method:'POST',
		                		params:form.getValues(),
		                		callback: function (options, success, response) {
			                    	var obj=Ext.JSON.decode(response.responseText);			
			                    	if(obj['success']){
			                    		ip.commitSuccess(versionTab,versionTab.store);
			                    	}else{
			                    		ip.commitFailure(versionTab);
			                    	}
		                    	}
		                	});
		                }
		            }
		        });
    			tbar.push(commit);
    			tbar.push('-');
    			ip.createEditButton(versionTab,versionTab.store,tbar);
    			tbar[tbar.length-2].flag = "super_edit";
	    		
	    		var refresh = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Refresh',
		       		ulan:'btRefresh',
		       		 iconCls:'refresh2',
		       		 flag:'super_read',
		       		 listeners:{
		       		 	click:function(){
		        			versionTab.store.load();
		       	 		}
		       	 	}
		        });
	    		tbar.push(refresh);
	    		for(var i=0;i<tbar.length;i++){
	    			if(tbar[i]!='-' && tbar[i]!='->'){
	    				var text = lanControll.getLanValue(tbar[i].ulan);
	    				tbar[i].setText(text);
	    			}
	    		}
	    		var dockedItems = {
	    				xtype:'toolbar',
	    				dock: 'top',
	    				items:tbar
	    		};
	    		this.addDocked(dockedItems);
	    	},
			listeners:{
				afterlayout:{
	    			fn:function(){
	    				this.createTbar();
	    				lanControll.setFieldSet(this);
	    			},
	    			single:true
	    		}
	    	}
			
		});
		versionTab.addListener("afterlayout",function(){
			privilege.procPrivilege(versionTab);
		},this,{single:true});
		ip.initOtiose(1,versionTab);
		new Ext.LoadMask(versionTab, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:versionStore
		});
		versionStore.on('load',function(){
			var r=versionStore.getAt(0);
			var status=r.get('status');
			var vendor=r.get('vendorId');
			var pt=r.get('productId');
			versionTab.loadRecord(r);
			versionTab.getForm().findField('vendorId').setValue(rs.vendor(vendor));
			versionTab.getForm().findField('productId').setValue(rs.producttype(pt));
		});
		
//		var versionTab2=Ext.create('Ext.panel.Panel',{
//			title:'versionTab2',
//			border:false,
//		});
//		alert("cloudPanel1="+cloudPanel1);
		this.items=[{
	       	xtype: 'tabpanel',
//	       	id:'cloudTab',
	       	items:[versionTab]
	       
		}];
		lanControll.setLan(versionTab);
		this.callParent(arguments);	
	}
});