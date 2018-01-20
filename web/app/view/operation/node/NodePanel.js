Ext.define('app.view.operation.node.NodePanel',{
	extend:'Ext.panel.Panel',
//	id:'nodePanel',
	layout:'fit',
	hidden:true,
	border:false,
	cloudUuid:-1,
	initComponent: function(){
		var store = Ext.create('app.store.operation.node.NodeInfoStore',{});
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		
		this.store = store;	
		var nodeTab=Ext.create('Ext.form.Panel',{
			title:lanControll.getLanValue('tiNodeInfo'),
//			id:'nodeTab',
			store:store,
			border:false,
			bodyStyle: {
				background: '#DFE9F6',
			},
		    bodyPadding: 5,
		    treeName:'',

	        fieldDefaults: {
	            labelAlign: 'left',
	            labelWidth: 180,
	            anchor: '75%'
	        },

	        items: [{
	        	xtype:'hiddenfield',
	        	name:'uuid',
	        },{	
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Basic Info',
				ulan:'fsBasicInfo',
				itemId:'node_basic_info',
				items:[{
					border:false,
					layout: {
			            type: 'table',
			            columns: 3
			        },
			        defaults: {
			            width:640, 
			            height: 25,
			        },
			        bodyStyle: {
						background: '#DFE9F6',
					},
			        items: [{
			    		xtype: 'displayfield',
						name : 'name',
						fieldLabel: 'Name',
						labelWidth: 180,
						maxLength:31,
						anchor:'75%'
					},{
			        	xtype:'displayfield',
			        	width:60,
			        	rowspan:5,
			        },{
			    		xtype:'image',
			    		name:'imgs',
			    		rowspan: 5,
			            height: 140,
			    		width:140,
			    		border:false,
			    		fieldDefaults: {
			    			labelWidth: 100,
			    			anchor: '85%'
			    		 },
			    		src:Ext.get('resources').value+'/images/panel_logo/node_list.png',
			    	
			        },{
			            xtype: 'textfield',
			            name: 'alias',
			            labelWidth: 180,
			            fieldLabel: 'Alias',
			        },{

			        	xtype: 'fieldcontainer',
			        	layout:'hbox',
			    		items:[rs.createAdminStatus(null,[1,2],adminSizeObj),{
				            xtype: 'displayfield',
				            name: 'oprStatus',
				            ulan:'oprStatusSpec',
				            labelAlign: 'right',
				            labelWidth: 80,
				            fieldLabel: 'Opr',
				        },{
				            xtype: 'displayfield',
				            name: 'runStatus',
				            ulan:'runStatusSpec',
				            labelAlign: 'right',
				            labelWidth: 80,
				            fieldLabel: 'Run',
				        }]
			        },{
			            xtype: 'textareafield',
			            name: 'detailDesc',
			            labelWidth: 180,
			            height:50,
			            rows:1,
			            fieldLabel: 'Description',
			        }]
			    }]
			},{
		    	
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Detail Info',
				ulan:'fsDetailInfo',
				itemId:'node_detail_info',
				layout: 'anchor',
				collapsible: true,
				collapsed: false,
				items:[{
		            xtype: 'displayfield',
		            name: 'defaultFlag',
		            fieldLabel: 'Default Flag',
		        }, rs.createPriority(), {
		            xtype: 'displayfield',
		            name: 'ipAddr',
		            fieldLabel: 'IP Address',
		        }, {
		            xtype: 'displayfield',
		            name: 'portNo',
		            fieldLabel: 'Port No',
		        },{
		        	xtype: 'displayfield',
		        	name:'encryptType',
		        	fieldLabel: 'Encrypt Type',
		        	listeners: {
		                change: function(cmp){
				        	if(cmp.getValue()>=0 || cmp.getValue<1000){
				        		cmp.setValue(rs.encryptType(cmp.getValue()));
				        	}
		                }
		            }
		        },{
		        	xtype: 'textfield',
		        	name:'password',
		        	inputType:'password',
		        	fieldLabel: 'Password',
		        },{
		            xtype: 'displayfield',
		            name: 'bytesRx',
		            fieldLabel: 'Bytes Rx',
		        },{
		            xtype: 'displayfield',
		            name: 'bytesTx',
		            fieldLabel: 'Bytes Tx',
		        },{
		            xtype: 'displayfield',
		            name: 'allocsTot',
		            fieldLabel: 'Allocs Tot',
		        },{
		            xtype: 'displayfield',
		            name: 'allocsCur',
		            fieldLabel: 'Allocs Cur',
		        },{
		            xtype: 'displayfield',
		            name: 'lastRegTime',
		            fieldLabel: 'Last Reg Time',
		        },{
		            xtype: 'displayfield',
		            name: 'lastHbTime',
		            fieldLabel: 'Last Hb Time',
		        }]
			}],
			maintenance:maintenance,
	    	createTbar:function(){
	    		var tbar = [];
	    		if(!this.maintenance){
	    			
	    			var commit = Ext.create('Ext.button.Button',{
			            text: 'Commit',
			            iconCls:'save',
			            ulan:'btCommit',
			            flag:"super_edit",
			            disabled: true,
			            formBind: false,
			            handler: function() {
			                var form = this.up('form').getForm();
			                if (form.isValid()) {
			                	Ext.Ajax.request({
			                		url:'nodeManager!updateNode.action',
			                		method:'POST',
			                		params:form.getValues(),
			                		callback: function (options, success, response) {
				                    	if(success){
				                    		ip.commitSuccess(nodeTab,nodeTab.store);
				                    	}else{
				                    		ip.commitFailure(nodeTab);
				                    	}
			                    	}
			                	});
			                }
			            }
			        });
	    			tbar.push(commit);
	    			tbar.push('-');
	    			ip.createEditButton(nodeTab,nodeTab.store,tbar);
	    			tbar[tbar.length-2].flag = "super_edit";
	    		}
	    		
	    		var refresh = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Refresh',
		       		ulan:'btRefresh',
		       		 iconCls:'refresh2',
		       		 flag:"super_read",
		       		 listeners:{
		       		 	click:function(){
		        			this.up('form').store.load();
		       	 		}
		       	 	}
	       	 	});
	    		tbar.push(refresh);
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
	    				lanControll.setLan(this);
	    			},
	    			single:true
	    		}
	    	}
		});
		nodeTab.addListener("afterlayout",function(){
			privilege.procPrivilege(nodeTab);
		},this,{single:true});
		ip.initOtiose(1,nodeTab);
		domainLoadMask=new Ext.LoadMask(nodeTab, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:store
		});
		store.on('load',function(){
			var r=store.getAt(0);
			nodeTab.loadRecord(r);			
			var oprStatus=parseInt(r.get('oprStatus'));
			var runStatus=parseInt(r.get('runStatus'));
			var opr=nodeTab.getForm().findField('oprStatus');
			var run=nodeTab.getForm().findField('runStatus');  
			var defaultFlag=parseInt(r.get('defaultFlag'));
			var flag=nodeTab.getForm().findField('defaultFlag');
			if(defaultFlag==1){
				flag.setValue('YES');
			}else{
				flag.setValue('NO');
			}  
			opr.setValue(rs.oprStatus(oprStatus));  
			run.setValue(rs.runStatus(runStatus));
		});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[nodeTab]	       
		}];
		this.callParent(arguments);	
	}
});