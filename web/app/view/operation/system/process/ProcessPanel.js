Ext.define('app.view.operation.system.process.ProcessPanel',{
	extend:'Ext.panel.Panel',
//	id:'processPanel',
	layout:'fit',
	hidden:true,
//	title:'AllCloudPanel',
	border:false,
	initComponent: function(){
		var store = Ext.create('app.store.operation.system.process.ProcessInfoStore',{});
		this.store = store;
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var processTab=Ext.create('Ext.form.Panel',{
			title:lanControll.getLanValue('tiProcessInfo'),
//			id:'processTab',
			treeName:'',
			store:store,
			border:false,
			autoScroll:true,
			bodyStyle: {
				background: '#DFE9F6',
			},
//			width: 500,
		    bodyPadding: 5,

	        fieldDefaults: {
	            labelAlign: 'left',
	            anchor: '75%',
	            labelWidth: 180,
	        },
	       
	        items: [{
	        	xtype:'hiddenfield',
	        	name:'uuid',
	        },{
	        	xtype:'hiddenfield',
	        	name:'sysUuid',
	        },{	
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Basic Info',
				ulan:'fsBasicInfo',
				itemId:'proc_basic_info',
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
			            name: 'name',
			            labelWidth: 180,
			            fieldLabel: 'Name',
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
			    		src:Ext.get('resources').value+'/images/panel_logo/process.png',
			    	
			        }, {
			            xtype: 'textfield',
			            name: 'alias',
			            labelWidth: 180,
			            fieldLabel: 'Alias',
			        },{

			        	xtype: 'fieldcontainer',
			        	layout:'hbox',
			    		items:[rs.createAdminStatus(null,[1,2,4],adminSizeObj),{
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
			        }]
			   }]
			},{
		    	
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Detail Info',
				ulan:'fsDetailInfo',
				itemId:'proc_detail_info',
				height:200,
				layout: 'anchor',
				collapsible: true,
				collapsed: false,
				items:[{
		            xtype: 'displayfield',
		            name: 'procNo',
		            fieldLabel: 'Process No',
		        },{
		            xtype: 'displayfield',
		            name: 'loadVal',
		            fieldLabel: 'Load Value',
		        },{
		        	xtype: 'displayfield',
		        	name: 'onlineNeCount',
		        	fieldLabel: 'Online Device Count',
		        },{
		        	xtype: 'displayfield',
		        	name: 'onlineSimCard',
		        	fieldLabel: 'Online SIM Count',
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
	    					var store = this.up('form').store;
	    					var name = store.getAt(0).get('name');
			                var form = this.up('form').getForm();
			                if (form.isValid()) {
			                	Ext.Ajax.request({
			                		url:'processManager!updateProcess.action?name='+name,
			                		method:'POST',
			                		params:form.getValues(),
			                		callback: function (options, success, response) {
				                    	var obj=Ext.JSON.decode(response.responseText);
				                    	if(success){
				                    		ip.commitSuccess(processTab,processTab.store);
				                    	}else{
				                    		ip.commitFailure(processTab);
				                    	}
			                    	}
			                	});
			                }
			            }
			        });
	    			tbar.push(commit);
	    			tbar.push('-');
	    			ip.createEditButton(processTab,processTab.store,tbar);
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
		processTab.addListener("afterlayout",function(){
			privilege.procPrivilege(processTab);
		},this,{single:true});
		ip.initOtiose(1,processTab);
		ruleLoadMask=new Ext.LoadMask(processTab, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:store
		});
		
		store.on('load',function(){
			  var r=store.getAt(0);
			  var oprStatus=parseInt(r.get('oprStatus'));
			  var runStatus=parseInt(r.get('runStatus'));
			  var opr=processTab.getForm().findField('oprStatus');
			  var run=processTab.getForm().findField('runStatus');
			  processTab.loadRecord(r);
			  opr.setValue(rs.oprStatus(oprStatus));
				  
			  run.setValue(rs.runStatus(runStatus));
			  
		});

		this.items=[{
	       	xtype: 'tabpanel',
//	       	id:'cloudTab',
	       	items:[processTab]
	       
		}];
		this.callParent(arguments);	
	}
});