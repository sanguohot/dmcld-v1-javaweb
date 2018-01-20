Ext.define('app.view.operation.node.NodeGroupPanel',{
	extend:'Ext.panel.Panel',
//	id:'nodeGroupPanel',
	layout:'fit',
	hidden:true,
	border:false,
	nodeGroupStore:{},
	cloudUuid:-1,
	initComponent: function(){
		var store = Ext.create("app.store.operation.node.NodeGroupStore",{});
		this.nodeGroupStore = store;
		store.getProxy().url = "nodeGrpManager!getNodeGrp.action";
		store.on('beforeload',function(){
			store.loadFlag = false;
		})
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;	
		var nodeName;
		if(maintenance){
			nodeName = Ext.create('Ext.form.field.Text',{
	    		xtype: 'textfield',
				name : 'name',
				fieldLabel: 'Name',
				labelWidth: 180,
				maxLength:31,
				anchor:'75%'
			});
		}else{
			var generalObj = Ext.getCmp('GeneralObj');
			if(!generalObj){
				generalObj = Ext.create('app.util.GeneralObj',{});
			}
			nodeName = generalObj.createName('node_name'
					,75,25,'name','Name','#DFE9F6','nodeGrpManager!checkNodeGrpName.action',store);
			store.on('load',function(){
    			var picture = nodeName.getComponent('picture');
    			picture.update("");
    			picture.flag = 2;
			});
		}
		var nodeGroupTab=Ext.create('Ext.form.Panel',{
			title:lanControll.getLanValue('tiNodeGrpInfo'),
//			id:'nodeGroupTab',
			border:false,
			store:store,
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
			        items: [nodeName,{
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
			    		src:Ext.get('resources').value+'/images/panel_logo/node_group.png',
			    	
			        },{
			            xtype: 'textfield',
			            name: 'alias',
			            labelWidth: 180,
			            fieldLabel: 'Alias',
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
				height:200,
				layout: 'anchor',
				collapsible: true,
				collapsed: false,
				items:[{
		            xtype: 'displayfield',
		            name: 'defaultFlag',
		            fieldLabel: 'Default Flag',
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
		            		var temp = this.up('form').getComponent('node_basic_info').down('panel');
		            		var picture = temp.getComponent("node_name").getComponent("picture");
		            		if(picture.flag == 0){
		            			return;
		            		}
			                var form = this.up('form').getForm();		                
			                if (form.isValid()) {
			                	Ext.Ajax.request({
			                		url:'nodeGrpManager!updateNodeGrp.action',
			                		method:'POST',
			                		params:form.getValues(),
			                		callback: function (options, success, response) {
			                			var obj=Ext.JSON.decode(response.responseText);
				                    	if(obj['success']){
				                    		ip.commitSuccess(nodeGroupTab,nodeGroupTab.store);
				                    	}else{
				                    		ip.commitFailure(nodeGroupTab);
				                    	}
			                    	}
			                	});
			                }
			            }
			        });
	    			tbar.push(commit);
	    			tbar.push('-');
	    			ip.createEditButton(nodeGroupTab,nodeGroupTab.store,tbar);
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
		nodeGroupTab.addListener("afterlayout",function(){
			privilege.procPrivilege(nodeGroupTab);
		},this,{single:true});
		store.on('load',function(){
			var defaultFlag = store.getAt(0).get('defaultFlag');
			nodeGroupTab.loadRecord(store.getAt(0));
			nodeGroupTab.getForm().findField('defaultFlag').setValue(rs.defaultFlag(defaultFlag));
		});
		var id = 'NodeListPanel';
		if(maintenance){
			id = 'maintenanceNodeListPanel';
		}
		var nodeList = Ext.create("app.view.operation.node.NodeListPanel",{
			id:id,
			maintenance:maintenance
		});
		lanControll.setLan(nodeList);
		nodeList.addListener("afterlayout",function(){
			privilege.procPrivilege(nodeList);
		},this,{single:true});
		nodeList.store.on('beforeload',function(){
			nodeList.store.loadFlag = false;
		})
		ip.initOtiose(1,nodeGroupTab);
		ruleLoadMask=new Ext.LoadMask(nodeGroupTab, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:store
		});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[nodeGroupTab,nodeList],
	   	    listeners:{			
				tabchange:function(tabPanel,newTab,oldTab,obj){
					controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
				}
			}
		}];
		this.items[0].initTabNum = this.items[0].items.length;
		this.callParent(arguments);	
	}
});