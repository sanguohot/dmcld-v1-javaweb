Ext.define('app.view.operation.domain.policy.PolicyPanel',{
	extend:'Ext.panel.Panel',
//	id:'policyPanel',
	layout:'fit',
	hidden:true,
	border:false,
	initComponent: function(){
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var id = 'ruleInPolicyTab';
		if(maintenance){
			id = 'maintenanceRuleInPolicyTab';
		}
		var groupPolicy=Ext.create('app.view.operation.domain.policy.RuleInPolicy',{
//			title:lanControll.getLanValue('tiRuleList'),
			border:false,
			id:id,
			style: {
            	marginLeft: '5px',
            	marginBottom: '5px'
			},
		});
		groupPolicy.addListener("afterlayout",function(){
			privilege.procPrivilege(groupPolicy);
		},this,{single:true});
		var store = Ext.create('app.store.operation.domain.policy.PolicyInfoStore',{});
		store.on('beforeload',function(){
			store.loadFlag = false;
		})
		var policyName;
		if(maintenance){
			policyName = Ext.create('Ext.form.field.Text',{
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
			policyName = generalObj.createName('policy_name'
					,75,25,'name','Name','#DFE9F6','policyManager!checkPolicy.action',store);
		}
		var policyTab1=Ext.create('Ext.form.Panel',{
			title:lanControll.getLanValue('tiPolicyInfo'),
//			id:'policyTab1',
			store:store,
			treeName:'',
			bodyStyle: {
				background: '#DFE9F6',
			},
			border:false,
//			width: 500,
		    bodyPadding: 5,
		    autoScroll:true,
	        fieldDefaults: {
	            labelAlign: 'left',
	            labelWidth: 180,
	            anchor: '65%'
	        },
	        items: [{
	        	xtype:'hiddenfield',
	        	name:'uuid',
	        	itemId:'policyUuid'
	        },{
	        	xtype:'hiddenfield',
	        	name:'defaultFlag'
	        },{
	        	xtype:'hiddenfield',
	        	name:'domainUuid',
	        	itemId:'policyDomainUuid',
	        },{	
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Basic Info',
				ulan:'fsBasicInfo',
				width:890,
				itemId:'policy_basic_info',
				
				items:[{
					border:false,
					layout: {
			            type: 'table',
			            columns: 3
			        },
			        defaults: {
			            width:700, 
			            height: 25,
			        },
			        bodyStyle: {
						background: '#DFE9F6',

					},
					style: {
						marginLeft: '5px',
	            		marginBottom: '5px'
					},
			        items: [policyName,{
			        	xtype:'displayfield',
			        	width:20,
			        	rowspan:3,
			        },{
			    		xtype:'image',
			    		name:'imgs',
			    		rowspan: 3,
			            height: 140,
			    		width:140,
			    		border:false,
			    		fieldDefaults: {
			    			labelWidth: 180,
			    			anchor: '85%'
			    		 },
			    		src:Ext.get('resources').value+'/images/panel_logo/sim_policy.png',
			        }, {
			            xtype: 'textfield',
			            name: 'alias',
			            labelWidth: 180,
			            fieldLabel: 'Alias',
			        },{
			            xtype: 'textareafield',
			            name: 'detailDesc',
			            labelWidth: 180,
			            height:80,
			            rows:3,
			            fieldLabel: 'Description',
			            
			        }]
					}]
			  },{
		            xtype: 'fieldset',
					layout:'anchor',
					title:'Rule Info',
					ulan:'tiRuleInfo',
					itemId:'rule_info',
					layout: 'anchor',
					collapsible: false,
					collapsed: false,
					minHeight:340,
					width:890,
					items:[groupPolicy]
			 }],
			  maintenance:maintenance,
		    	createTbar:function(){
		    		var tbar = [];
		    		if(!this.maintenance){
		    			
		    			var commit = Ext.create('Ext.button.Button',{
				            text: 'Commit',
				            iconCls:'save',
				            ulan:'btCommit',
				            flag:"domain_edit",
				            disabled: true,
				            formBind: false,
				            handler: function() {
			            		var tmp = this.up('form').down('fieldcontainer[itemId=policy_name]');
			            		if(tmp.getComponent('picture').flag==0)
			                	return;
				                var form = this.up('form').getForm();
				                if (form.isValid()) {
				                	Ext.Ajax.request({
				                		url:'policyManager!updatePolicy.action',
				                		method:'POST',
				                		params:form.getValues(),
				                		callback: function (options, success, response) {
					                    	if(success){
					                    		ip.commitSuccess(policyTab1,policyTab1.store);
					                    	}else{
					                    		ip.commitFailure(policyTab1);
					                    	}
				                    	}
				                	});
				                }
				            }
				        });
		    			tbar.push(commit);
		    			tbar.push('-');
		    			ip.createEditButton(policyTab1,policyTab1.store,tbar);
		    			tbar[tbar.length-2].flag = "domain_edit";
		    		}
		    		
		    		var refresh = Ext.create('Ext.button.Button',{
			       		 xtype:'button',
			       		 text:'Refresh',
			       		ulan:'btRefresh',
			       		 iconCls:'refresh2',
			       		 flag:"domain_read",
			       		 listeners:{
			       		 	click:function(){
			        			this.up('form').store.load();
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
		    	},
		
		});
		policyTab1.addListener("afterlayout",function(){
			privilege.procPrivilege(policyTab1);
		},this,{single:true});
		policyLoadMask=new Ext.LoadMask(policyTab1, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:store
		});
	    store.on('load', function(){
	    	if(!maintenance){
				var picture = policyTab1.down('fieldcontainer[itemId=policy_name]').getComponent('picture');
				picture.update("");
				picture.flag = 2;
	    	}
	    	var r=store.getAt(0);
			policyTab1.loadRecord(r);
			
			groupPolicy.store.load();
	    });
		
		ip.initOtiose(1,policyTab1);
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[policyTab1],
	   	   	listeners:{			
				tabchange:function(tabPanel,newTab,oldTab,obj){
					controller.tabpanel_tabchange(tabPanel,newTab,oldTab,obj);
				}
			}
		}];
		this.items[0].initTabNum = this.items[0].items.length;
		for(var i=0;i<this.items[0].items.length;i++){
			lanControll.setLan(this.items[0].items[i]);
		}
		this.callParent(arguments);	
	}
});