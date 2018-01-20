Ext.define('app.view.operation.domain.policy.RulePanel',{
	extend:'Ext.panel.Panel',
//	id:'rulePanel',
	layout:'fit',
	hidden:false,
	border:false,
	store:null,
	closable:true,
	title:lanControll.getLanValue('tiRuleInfo'),
	initComponent: function(){
		var store = Ext.create('app.store.operation.domain.policy.rule.RuleInfoStore',{});
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		this.store = store;	
		var panel = this;
		var params = panel.params;
		var ruleName;
		if(maintenance){
			ruleName = Ext.create('Ext.form.field.Text',{
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
			ruleName = generalObj.createName('rule_name'
					,75,25,'name','Name','#DFE9F6','ruleManager!checkRule.action',store);
			store.on('load',function(){
    			var picture = ruleName.getComponent('picture');
    			picture.update("");
    			picture.flag = 2;
			});
		}
		var comboxStore = Ext.create("app.store.util.ComboxStore",{});
		this.comboxStore = comboxStore;
		var RuleTab1=Ext.create('Ext.form.Panel',{
			treeName:'',
			store:store,
			border:false,
			comboxStore:comboxStore,
			bodyStyle: {
				background: '#DFE9F6',
			},
			border : false,
			bodyPadding : 5,

			fieldDefaults: {
	            labelAlign: 'left',
	            labelWidth: 180,
	            anchor: '75%'
	        },

			items : [{
				xtype:'hiddenfield',
				name:'uuid',
			} ,{
				xtype:'hiddenfield',
				name:'policyUuid',
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
				itemId:'rule_basic_info',
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
			        items: [ruleName,{
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
			    		src:Ext.get('resources').value+'/images/panel_logo/sim_rule.png',
			    	
			        }, {
			            xtype: 'textfield',
			            name: 'alias',
			            labelWidth: 180,
			            fieldLabel: 'Alias',
			        }, {
						xtype : 'textareafield',
						fieldLabel : 'Description',
						name:'detailDesc',
						margins : '0',
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
				itemId:'rule_detail_info',
				height:200,
				layout: 'anchor',
				collapsible: true,
				collapsed: false,
				items:[{
					name : 'grpUuid',
					ulan:'group',
					xtype : 'combo',
					mode : 'local',
					editable:false,
					fieldLabel : 'Group',
					displayField : 'name',
					valueField : 'uuid',
					queryMode : 'local',
					store:comboxStore,
				},{xtype:'numberfield',fieldLabel: 'Specific Call Billing Rate(min)',decimalPrecision:3,name: 'specCallRate',value:3,minValue:0},{

					name : 'activateType',
					xtype : 'combo',
					mode : 'local',
					editable:false,
					fieldLabel : 'Activate Type',
					displayField : 'name',
					valueField : 'typeId',
					queryMode : 'local',
					store : Ext.create('Ext.data.Store', {
						fields : [ 'name', 'typeId' ],
						data : [ {
							name : lanControll.getLanValue('activateType_'+0),
							typeId : 0
						}, {
							name : lanControll.getLanValue('activateType_'+1),
							typeId : 1
						}, {
							name : lanControll.getLanValue('activateType_'+2),
							typeId : 2
						} ]
					}),
					listeners:{ 
			   			change: function(field,newValue,oldValue,opts) {
							var form = this.up(form);
//							alert("field="+field+" nv="+newValue+"  ov="+oldValue+"  opts="+opts);
							if(newValue==1){
								form.down('fieldcontainer[itemId=validWeekDay]').show();
								form.down('fieldcontainer[itemId=timeWorked]').hide();
							}else if(newValue==2){
								form.down('fieldcontainer[itemId=validWeekDay]').hide();
								form.down('fieldcontainer[itemId=timeWorked]').show();
							}else{
								form.down('fieldcontainer[itemId=validWeekDay]').hide();
								form.down('fieldcontainer[itemId=timeWorked]').hide();
							}
							
						}
					}
				},rs.createPriority(), {
					 xtype: 'fieldcontainer',
			            fieldLabel: lanControll.getLanValue('validWeekDay'),
			            defaultType: 'checkboxfield',
			            name:'validWeekDay',
			            itemId:'validWeekDay',
			            layout : 'hbox',
						items : [ {
							boxLabel : 'Sun',
							name : 'daySun',
							inputValue : 1,
						}, {
							boxLabel : 'Mon ',
							name : 'dayMon',
							inputValue : 2,
						}, {
							boxLabel : 'Tue',
							name : 'dayTue',
							inputValue : 3,
						},  {
							boxLabel : 'Wed',
							name : 'dayWeb',
							inputValue : 4,
						}, {
							boxLabel : 'Thu',
							name : 'dayThu',
							inputValue : 5,
						}, {
							boxLabel : 'Fri',
							name : 'dayFri',
							inputValue : 6,
						}, {
							boxLabel : 'Sat',
							name : 'daySat',
							inputValue : 7,
//							inputValue : 6,
//							checked : true
						} ]
					},{
						xtype:'hiddenfield',
						name:'timeBegin',
					},{
						xtype:'hiddenfield',
						name:'timeEnd'
					}, {
						xtype : 'fieldcontainer',
						fieldLabel : lanControll.getLanValue('timeWorked'),
						name:'timeWorked',
						itemId:'timeWorked',
						combineErrors : false,
						layout : 'hbox',
						defaults : {
							hideLabel : true
						},
						items : [ {
							name : 'hoursB',
							xtype : 'numberfield',
							width : 48,
							value : 0,
							allowBlank : false,
							minValue:0,
							maxValue:23
						}, {
							xtype : 'displayfield',
							value : lanControll.getLanValue('hour'),
							ulan:'hour'
						}, {
							name : 'minutesB',
							xtype : 'numberfield',
							width : 48,
							value : 0,
							allowBlank : false,
							minValue:0,
							maxValue:59
						}, {
							xtype : 'displayfield',
							value : lanControll.getLanValue('min'),
							ulan:'min'
						}, {
							xtype : 'component',
							width : 10
						}, {
							xtype : 'displayfield',
							value : lanControll.getLanValue('to'),
							ulan:'to',
							width : 30
						}, {
							name : 'hoursE',
							xtype : 'numberfield',
							width : 48,
							value : 23,
							allowBlank : false,
							minValue:0,
							maxValue:23
						}, {
							xtype : 'displayfield',
							value : lanControll.getLanValue('hour'),
							ulan:'hour'
						}, {
							name : 'minutesE',
							xtype : 'numberfield',
							width : 48,
							value : 59,
							allowBlank : false,
							minValue:0,
							maxValue:59
						}, {
							xtype : 'displayfield',
							value : lanControll.getLanValue('min'),
							ulan:'min'
						} ]
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
			        		var tmp = this.up('form').down('fieldcontainer[itemId=rule_name]');
			        		if(tmp.getComponent('picture').flag==0)
			            	return;
			        		
			        		var form1=this.up('form');
			                var form = form1.getForm();
			                var hoursB=form.findField('hoursB').getValue();
			                var minutesB=form.findField('minutesB').getValue();
			                var hoursE=form.findField('hoursE').getValue();
			                var minutesE=form.findField('minutesE').getValue();
			                form.findField('timeBegin').setValue('2012-01-01 '+hoursB+':'+minutesB+':00');
			                form.findField('timeEnd').setValue('2012-01-01 '+hoursE+':'+minutesE+':00');
			                if (form.isValid()) {
			                	Ext.Ajax.request({
			                		url:'ruleManager!updateRule.action',
			                		method:'POST',
			                		params:form.getValues(),
			                		callback: function (options, success, response) {
				                    	var obj=Ext.JSON.decode(response.responseText);			
				                    	if(obj['success']){
//				                    		ip.commitSuccess(RuleTab1,RuleTab1.store);
				                    		ip.initOtiose(1,RuleTab1);
	    	                    			RuleTab1.down('button[ulan=btCommit]').setDisabled(true);
	    	                    			RuleTab1.down('button[ulan=btCommit]').formBind=false;
	    	                    			RuleTab1.down('button[ulan=btCancel]').setIconCls('edit');
	    	                    			RuleTab1.down('button[ulan=btCancel]').setText('Edit');
		    	                    		var params = form1.up('panel').params;
    	                					store.load(params);
    	            						panel.show();
				                    	}else{
				                    		ip.commitFailure(RuleTab1);
				                    	}
			                    	}
			                	});
			                }
			            }
			        });
	    			tbar.push(commit);
	    			tbar.push('-');
	    			ip.createEditButton(RuleTab1,RuleTab1.store,tbar);
	    			tbar[tbar.length-2].flag = "domain_edit";
	    			
	    		}
	    		
	    		
	    		
	    		var refresh = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Refresh',
		       		ulan:'btRefresh',
		       		 iconCls:'refresh2',
		       		 listeners:{
		       		 	click:function(){
//				    			var params = this.up('form').up('panel').params;
//								store.load(params);
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
				afterlayout:{
	    			fn:function(){
	    				this.createTbar();
	    				lanControll.setFieldSet(this);
	    				privilege.procPrivilege(RuleTab1);
	    			},
	    			single:true
	    		}
	    	},
		});
		
		ip.initOtiose(1,RuleTab1);
		var tab = RuleTab1;
		ruleLoadMask=new Ext.LoadMask(tab, {
		    msg:lanControll.getLanValue('maskMsg'),
		    disabled:false,
		    maskCls:'loadmaskcss',
		    store:store
		});
	    store.on('load', function(){
			if(!maintenance){
				var picture = tab.down('fieldcontainer[itemId=rule_name]').getComponent('picture');
				picture.update("");
				picture.flag = 2;
			}
			var r=store.getAt(0);
			tab.loadRecord(r);
			
			panel.setTitle(r.get('name'));
			
			var beginTime=r.get('timeBegin');
			var endTime=r.get('timeEnd');
			if(Ext.isChrome|| Ext.isOpera ||Ext.isSafari){
				if(beginTime!=null&&beginTime!=""){
					tab.getForm().findField('hoursB').setValue(beginTime.getUTCHours());
					tab.getForm().findField('minutesB').setValue(beginTime.getUTCMinutes());
				}
				if(endTime!=null &&endTime!=""){
					tab.getForm().findField('hoursE').setValue(endTime.getUTCHours());
					tab.getForm().findField('minutesE').setValue(endTime.getUTCMinutes());
				}
			}else{
				if(beginTime!=null&&beginTime!=""){
					tab.getForm().findField('hoursB').setValue(beginTime.getHours());
					tab.getForm().findField('minutesB').setValue(beginTime.getMinutes());
				}
				if(endTime!=null &&endTime!=""){
					tab.getForm().findField('hoursE').setValue(endTime.getHours());
					tab.getForm().findField('minutesE').setValue(endTime.getMinutes());
				}
				
			}
			var grpUuidStore = tab.getForm().findField('grpUuid').store;
			var comboxStore= Ext.create("app.store.util.ComboxStore",{});
			var domainUuid =parseInt(r.get('domainUuid'));
			comboxStore.on('load',function(){      	
				grpUuidStore.removeAll();
				grpUuidStore.add({uuid:-1,name:'-SELECT-'});
				
				for(var i=0; i<comboxStore.getCount(); i++){
					if(comboxStore.getAt(i).get('type')=='group'){
						grpUuidStore.add(comboxStore.getAt(i));
					}
				}
				tab.getForm().findField('grpUuid').setValue(r.get('grpUuid'));
			},this,{single: true})
			comboxStore.load({params:{domainUuid:domainUuid,types:'group'}});
		});
	   
		this.items=[RuleTab1];
		this.callParent(arguments);	
	}
});