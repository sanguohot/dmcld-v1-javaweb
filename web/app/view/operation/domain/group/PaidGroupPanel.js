Ext.define('app.view.operation.domain.group.PaidGroupPanel',{
	extend:'Ext.panel.Panel',
//	id:'paidGroupPanel',
	layout:'fit',
	hidden:true,
	border:false,
	treeId:'',
	getTreeId:function(){
		return this.treeId;
	},
	store:null,
	initComponent: function(){
		var store = Ext.create('app.store.operation.domain.paidgroup.PaidGroupInfoStore',{});
//		this.store = store;
		store.on('beforeload',function(){
			store.loadFlag = false;
		})
		var name;
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		if(maintenance){
			name = Ext.create('Ext.form.field.Text',{
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
			name = generalObj.createName('paid_group_name'
					,75,25,'name','Name','#DFE9F6','paidGroupManager!checkGroup.action',store);
			store.on('load',function(){
    			var picture = name.getComponent('picture');
    			picture.update("");
    			picture.flag = 2;
			});
		}
		
		var paidGroupTab=Ext.create('Ext.form.Panel',{
			title:lanControll.getLanValue('tiPaidGrpInfo'),
//			id:'paidGroupTab',
			treeName:'',
			store:store,
			border:false,
			bodyStyle: {
				background: '#DFE9F6',
			},
		    bodyPadding: 5,
		    forceRefresh:0,
	        fieldDefaults: {
	            labelAlign: 'left',
	            labelWidth: 180,
	            anchor: '75%'
	        },

	        items: [{
	        	xtype:'hiddenfield',
	        	name:'uuid'
	        },{
	        	xtype:'hiddenfield',
	        	name:'defaultFlag'
	        },{
	        	xtype:'hiddenfield',
	        	name:'domainUuid',
	        },{	
	            xtype: 'fieldset',
				layout:'anchor',
				title:'Basic Info',
				ulan:'fsBasicInfo',
				itemId:'paid_group_basic_info',
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
			        items: [name,{
			        	xtype:'displayfield',
			        	width:60,
			        	rowspan:3,
			        },{
			    		xtype:'image',
			    		name:'imgs',
			    		rowspan: 3,
			            height: 140,
			    		width:140,
			    		border:false,
			    		fieldDefaults: {
			    			labelWidth: 100,
			    			anchor: '85%'
			    		 },
			    		src:Ext.get('resources').value+'/images/panel_logo/paid_group.png',
			    	
			        }, {
			            xtype: 'textfield',
			            name: 'alias',
			            labelWidth: 180,
			            fieldLabel: 'Alias',
			        },{
			            xtype: 'textareafield',
			            name: 'detailDesc',
			            fieldLabel: 'Description',
			            labelWidth: 180,
			            height:80,
			            rows:3,
			        }]
			     }]
			 }, {
		            xtype: 'fieldset',
					layout:'anchor',
					title:'Detail Info',
					ulan:'fsDetailInfo',
					itemId:'paid_group_detail_info',
					layout: 'anchor',
					collapsible: true,
					collapsed: false,
					items:[{
			            xtype: 'displayfield',
			            name: 'totalCount',
			            labelWidth: 180,
			            fieldLabel: 'Total Count',
			        },{
			            xtype: 'displayfield',
			            name: 'usedCount',
			            labelWidth: 180,
			            fieldLabel: 'Used Count',
			        },{
			            xtype: 'displayfield',
			            name: 'unusedCount',
			            labelWidth: 180,
			            fieldLabel: 'Unused Count',
			        },{
			        	xtype: 'displayfield',
			        	name: 'verifyCount',
			        	labelWidth: 180,
			        	fieldLabel: 'Verify Count',
			        },{
			            xtype: 'displayfield',
			            name: 'failCount',
			            labelWidth: 180,
			            fieldLabel: 'Fail Count',
			        },{
			            xtype: 'displayfield',
			            name: 'createTime',
			            labelWidth: 180,
			            fieldLabel: 'createTime',
			        },{
			            xtype: 'displayfield',
			            name: 'updateTime',
			            labelWidth: 180,
			            fieldLabel: 'updateTime',
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
			            flag:"domain_edit",
			            disabled: true,
			            formBind: false,
			            handler: function() {
		            		var tmp = this.up('form').down('fieldcontainer[itemId=paid_group_name]');
		            		if(tmp.getComponent('picture').flag==0)
			                return;
			                var form = this.up('form').getForm();
			                if (form.isValid()) {
			                	Ext.Ajax.request({
			                		url:'paidGroupManager!updateGroup.action',
			                		method:'POST',
			                		params:form.getValues(),
			                		callback: function (options, success, response) {
				                    	var obj=Ext.JSON.decode(response.responseText);			
							                   	if(obj['success']){
							                   		ip.commitSuccess(paidGroupTab,paidGroupTab.store);
				                    	}else{
				                    		ip.commitFailure(paidGroupTab);
				                    	}
			                    	}
			                	});
			                }
			            }
			        });
	    			tbar.push(commit);
	    			tbar.push('-');
	    			ip.createEditButton(paidGroupTab,paidGroupTab.store,tbar);
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
        					var store=paidGroupTab.store;
        					store.load();
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
	    		activate: function(tab){
	    			if(tab.forceRefresh==1){
	    				tab.forceRefresh=0;
	    				tab.store.load();
	    			}
	    		},
				afterlayout:{
	    			fn:function(){
	    				this.createTbar();
	    				lanControll.setFieldSet(this);
	    				privilege.procPrivilege(paidGroupTab);
	    			},
	    			single:true
	    		}
	    	}
		});
//		paidGroupTab.addListener("afterlayout",function(){
//			privilege.procPrivilege(paidGroupTab);
//		},this,{single:true});
		paidGrpLoadMask=new Ext.LoadMask(paidGroupTab, {
			    msg:lanControll.getLanValue('maskMsg'),
			    disabled:false,
			    maskCls:'loadmaskcss',
			    store:store
		});
		store.on('load',function(){
			var r=store.getAt(0);
			paidGroupTab.loadRecord(r);
		});
		var id = 'paidListTab';
		if(maintenance){
			id = 'maintenancePaidListTab';
		}
		
		ip.initOtiose(1,paidGroupTab);
		var paidListTab=Ext.create('app.view.operation.domain.group.PaidListTab',{title:lanControll.getLanValue('tiPaidList'),id:id});
		paidListTab.addListener("afterlayout",function(){
			privilege.procPrivilege(paidListTab);
		},this,{single:true});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[paidGroupTab,paidListTab],
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