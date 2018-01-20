Ext.define('app.view.operation.domain.policy.RuleInPolicy' ,{
    extend: 'Ext.panel.Panel',
    //id:'ruleInPolicyTab'
    requires: [
        'Ext.util.Format',
        'Ext.grid.Panel',
    ],
	
	layout:'fit',
	title: '',
	minHeight:300,
	width:860,
	policyId:'',
	initComponent: function() {
		var ruleInPolicyStore= Ext.create('app.store.operation.domain.policy.RuleInPolicyStore', {}); 
		ruleInPolicyStore.on('beforeload',function(){
			ruleInPolicyStore.loadFlag = false;
		})
		this.store = ruleInPolicyStore;
		var sm = Ext.create('Ext.selection.CheckboxModel');
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var ruleInPolicyGrid = Ext.create('Ext.grid.Panel', {
			itemId:'grid',
			columnLines:true,
			store: ruleInPolicyStore,
			autoScroll:true,
			selModel: sm,
			columns: [{xtype: 'rownumberer', header:'No.',align:'center', sortable: false,width:40},
			          {header: 'uuid',dataIndex:'uuid',hidden:true,align:'center'},
			          {header: 'policyUuid',dataIndex:'policyUuid',hidden:true,align:'center'},
			          {header: 'grp uuid',dataIndex:'grpUuid',hidden:true,align:'center'},
					{header: 'Rule Name',dataIndex:'name',ulan:'ruleName',hidden:true,align:'center'},
					{header: 'SIM Group',dataIndex:'grpName',align:'center',minWidth:120,width:160,flex:1},
					{header: 'specCallRate',dataIndex:'specCallRate',align:'center',width:80},
					{header: 'Priority',dataIndex:'priority',align:'center',width:80,
						renderer:function(val){  
							return rs.tranPriority(val);
						}
					},
					{header: 'Activate Type',dataIndex:'activateType',align:'center',
						renderer:function(val){  
							return rs.activateType(val);
						}
					},
					{
						header:"Condition",
						ulan:'conditionAbbr',
						minWidth:240,
						renderer: function(value,metaData,record,rowIndex,store,view){
							var str="";
							var activateType = record.get('activateType');

							var timeBegin = record.get('timeBegin');
							var timeEnd = record.get('timeEnd');
							
							var daySun = record.get('daySun');
							var dayMon = record.get('dayMon');
							var dayTue = record.get('dayTue');
							var dayWeb = record.get('dayWeb');
							var dayThu = record.get('dayThu');
							var dayFri = record.get('dayFri');
							var daySat = record.get('daySat');
							if(activateType==1){
								if(daySun>0){
									str=str+"Sun,";
								}
								if(dayMon>0){
									str=str+"Mon,";
								}
								if(dayTue>0){
									str=str+"Tue,";
								}
								if(dayWeb>0){
									str=str+"Wed,";
								}
								if(dayThu>0){
									str=str+"Thu,";
								}
								if(dayFri>0){
									str=str+"Fri,";
								}
								if(daySat>0){
									str=str+"Sat,";
								}
								str=rs.trimStr(str);
							}else if(activateType==2){
								var times="";
								console.log(timeBegin);
								if(timeBegin!=null&&timeBegin!=""){
//									rs.timeFormat1(timeBegin,'H:i');
//									var off = timeBegin.getTimezoneOffset();
//									times=(timeBegin.getHours()-off/60);
									times=timeBegin.getUTCHours()+" : "+timeBegin.getMinutes()+" - ";
//									times=rs.timeFormat1(timeBegin,'H:i')+" - ";
								}
								console.log(timeEnd);
								if(timeEnd!=null &&timeEnd!=""){
//									var off = timeEnd.getTimezoneOffset();
//									times=times+(timeEnd.getHours()-off/60)+" ";
//									times=times+" : "+timeEnd.getMinutes()+" ";
//									times=times+rs.timeFormat1(timeEnd,'H:i');
									times=times+timeEnd.getUTCHours()+" : "+timeEnd.getMinutes();
								}
								
//								str=rs.dateFormat(timeBegin,'H:i:s')+" - "+rs.dateFormat(timeEnd,'H:i:s');
								str=times;
							}
							
							return str;
			    		}
					},
					{header: 'Desc',dataIndex: 'detailDesc',minWidth:120,flex:1,hidden:true},
					{header: 'Default Flag',dataIndex: 'defaultFlag',hidden:true},
					{header: 'Domain Uuid',dataIndex: 'domainUuid',hidden:true},
			],
			
			listeners:{
				itemdblclick: function(view, record, item, index, e, eOpts){

//					var tabpanel = ruleInPolicyGrid.up('panel').up('panel');
					var uuid = record.get('uuid');
//					var prefix = 'RuleInPolicy_';
//					if(this.maintenance){
//						prefix = 'maintenance_'+prefix;
//					}
//					var id=prefix+"ruleUuid_"+uuid;
//					var tipId = prefix+'ruleTipId_'+uuid;
//					var tab = Ext.getCmp(id);
//					var params = {params : {uuid:uuid}};
//					if(tab==undefined){
//						tab = Ext.create('app.view.operation.domain.policy.RulePanel',{
//							id:id,
//							tipId:tipId,
//							params:params,
//							prefix:prefix,
//						});
//						lanControll.setLan(tab);
//						tabpanel.add(tab);
//					}
//					tab.store.load(params);
//					tab.show();
					var addGroupToPolicy=Ext.getCmp('addRule');
		    		if(addGroupToPolicy=='undefined'||addGroupToPolicy==undefined){
		    			addGroupToPolicy=Ext.create('app.view.operation.domain.policy.AddRule'); 
		    			lanControll.setLan(addGroupToPolicy);
		    		}
		    		addGroupToPolicy.title=tiSetting;
		    		addGroupToPolicy.url="ruleManager!updateRule.action";
//					addGroupToPolicy.down('form').getForm().findField('domainUuid').setValue(record.get('domainUuid'));
//					addGroupToPolicy.down('form').getForm().findField('policyUuid').setValue(record.get('policyUuid'));
//					addGroupToPolicy.down('form').getForm().findField('activateType').setValue(1);
					addGroupToPolicy.down('form').loadRecord(record);
					
					var beginTime=record.get('timeBegin');
					var endTime=record.get('timeEnd');
					if(Ext.isChrome|| Ext.isOpera ||Ext.isSafari){
						if(beginTime!=null&&beginTime!=""){
							addGroupToPolicy.down('form').getForm().findField('hoursB').setValue(beginTime.getUTCHours());
							addGroupToPolicy.down('form').getForm().findField('minutesB').setValue(beginTime.getUTCMinutes());
						}
						if(endTime!=null &&endTime!=""){
							addGroupToPolicy.down('form').getForm().findField('hoursE').setValue(endTime.getUTCHours());
							addGroupToPolicy.down('form').getForm().findField('minutesE').setValue(endTime.getUTCMinutes());
						}
					}else{
						if(beginTime!=null&&beginTime!=""){
							addGroupToPolicy.down('form').getForm().findField('hoursB').setValue(beginTime.getHours());
							addGroupToPolicy.down('form').getForm().findField('minutesB').setValue(beginTime.getMinutes());
						}
						if(endTime!=null &&endTime!=""){
							addGroupToPolicy.down('form').getForm().findField('hoursE').setValue(endTime.getHours());
							addGroupToPolicy.down('form').getForm().findField('minutesE').setValue(endTime.getMinutes());
						}
						
					}
					
			    	var groupInfoStore=addGroupToPolicy.down('form').getForm().findField('grpUuid').store;
					groupInfoStore.load({params:{domainUuid:record.get('domainUuid')}});
					addGroupToPolicy.show();
				
			
//        			var ot=Ext.getCmp('operationTree');
//        			if(maintenance){
//        				ot = Ext.getCmp('maintenanceTree');
//        			}
//        			var uuid=row.get('uuid');
//        			var rootNode=ot.getRootNode();
//        			var node=rootNode.findChild('nid','rule_'+uuid,true);
//        			
//        			ot.fireEvent('itemclick',null,node);
				},
				afterlayout:{
	    			fn:function(){
	    				this.createTbar();
	    				lanControll.setFieldSet(this);
	    			},
	    			single:true
	    		}
			},
	        viewConfig : {
				loadMask:{
					msg:lanControll.getLanValue('maskMsg')
				},
				enableTextSelection: true
			},
		  maintenance:maintenance,
	    	createTbar:function(){
	    		var tbar = [];
	    		boxMaxRule = lanControll.getLanValue('boxMaxRule');
	    		if(!this.maintenance){
	    			var add = Ext.create('Ext.button.Button',{
	    				xtype:'button',
	    				text: 'Add Rule',
	    				iconCls: 'add',
	    				flag:"domain_edit",
	    				ulan:'btAdd',
	    				listeners:{
	    					click:function(){
	    						var ruleCnt=this.up('panel').store.getCount();
	    						if(ruleCnt>=128){
	    							 Ext.MessageBox.alert(boxWarnning,boxMaxRule);
									 return;
	    						}
	    						var rulePolicyUuid=ruleInPolicyGrid.treeName;
	    			    		var ruleDomainUuid=ruleInPolicyGrid.domainUuid;
	    			    		
	    			    		Ext.Ajax.request({
			                		url:'ruleManager!countRule.action?domainUuid='+ruleDomainUuid+"&policyUuid="+rulePolicyUuid,
			                		method:'POST',
			                		callback: function (options, success, response) {
										var obj=Ext.JSON.decode(response.responseText);			
				                    	if(obj['success']){
				                    		var addGroupToPolicy=Ext.getCmp('addRule');
		    	    			    		if(addGroupToPolicy=='undefined'||addGroupToPolicy==undefined){
		    	    			    			addGroupToPolicy=Ext.create('app.view.operation.domain.policy.AddRule'); 
		    	    			    			lanControll.setLan(addGroupToPolicy);
		    	    			    		}
//		    	    			    		addGroupToPolicy.title='Add Rule';
		    	    			    		addGroupToPolicy.url='ruleManager!addRule.action';
		    	    			    		
		    	    						addGroupToPolicy.down('form').getForm().findField('domainUuid').setValue(ruleDomainUuid);
		    	    						addGroupToPolicy.down('form').getForm().findField('policyUuid').setValue(rulePolicyUuid);
		    	    						addGroupToPolicy.down('form').getForm().findField('activateType').setValue(0);
		    	    						
		    	    						
		    	    				    	var groupInfoStore=addGroupToPolicy.down('form').getForm().findField('grpUuid').store;
		    	    	        			groupInfoStore.load({params:{domainUuid:ruleDomainUuid}});
		    	    						addGroupToPolicy.show();
				                    		
				                    	}else{
				                    		if(obj['msg']=="maxRule"){
					                		Ext.MessageBox.alert(boxFailture,boxMaxRule);
					                		return;
					                	}
				                    	}
			                    	}
			                	});
	    				
	    				}
	    			}
	    			});
	    			tbar.push(add);
	    			tbar.push('-');
	    			
	    			var del = Ext.create('Ext.button.Button',{
	    				xtype:'button',
	    				text: 'Delete Rule',
	    				iconCls: 'remove',
	    				flag:"domain_edit",
	    				ulan:'btDel',
	    				listeners:{
	    					click:function(){
	    						if ( ruleInPolicyGrid.getSelectionModel().hasSelection() ){    							
	    										var records = ruleInPolicyGrid.getSelectionModel().getSelection();
	    										var ids="";
	    										var cnt=0;
	    										var domainUuid=0;
	    										var name = "";
	    										for ( var i = 0; i < records.length; i++) {
	    											if(records[i].get('defaultFlag')>0){
	    												 Ext.MessageBox.alert(boxWarnning,records[i].get('name')+boxDefault);
	    												 return;
	    											}
	    											if(i==0){
	    												domainUuid=records[i].get('domainUuid');
	    												ids=records[i].get('uuid');
	    												name = records[i].get('name');
	    											}else {
	    												cnt=1;
	    												ids=ids+","+records[i].get('uuid');
	    											}
//	    											ruleInPolicyStore.remove(records[i]);
	    										}
	    										boxDiscardList = lanControll.getLanValue('boxDiscardList');
	    									Ext.MessageBox.confirm(boxWarnning,lanControll.getLanValue('boxDelRule'),function(e) { 																				
	    										if( e == 'yes' ){
	    										Ext.Ajax.request({
	    					                		url:'ruleManager!deleteRule.action?ids='+ids+"&domainUuid="+domainUuid+"&name="+name,
	    					                		method:'POST',
	    					                		callback: function (options, success, response) {
	    												var obj=Ext.JSON.decode(response.responseText);			
	    						                    	if(obj['success']){
	    						                    		if(cnt>0){
	    						                    			Ext.MessageBox.alert(boxSuccess,boxCommitSucc+obj['msg']);
	    						                    		}else{
	    						                    			Ext.MessageBox.alert(boxSuccess,boxCommitSucc);
	    						                    		}
	    						                    		ruleInPolicyGrid.getStore().load();
	    						                    	}else{
	    						                    		Ext.MessageBox.alert(boxFailture,boxDelFail);
	    						                    	}
	    					                    	}
	    					                	});
	    									
	    									}	
	    							})
	    						}	
	    					}
	    				
	    				}
	    			});
	    			tbar.push(del);
	    			tbar.push('-');
	    		}
	    		
	    		var refresh = Ext.create('Ext.button.Button',{
		       		 xtype:'button',
		       		 text:'Refresh',
		       		ulan:'btRefresh',
		       		 iconCls:'refresh2',
		       		 flag:"domain_read",
		       		 listeners:{
		       		 	click:function(){
		        			this.up('panel').store.load();
		       	 		}
		       	 	}
	       	 	});
//	    		tbar.push(refresh);
	    		for(var i=0;i<tbar.length;i++){
	    			if(tbar[i]!='-' && tbar[i]!='->'){
	    				var text = lanControll.getLanValue(tbar[i].ulan);
	    				tbar[i].setText(text);
	    			}
	    		}
	    		var dockedItems = {
	    				xtype:'toolbar',
	    				dock: 'bottom',
	    				items:tbar
	    		};
	    		this.addDocked(dockedItems);
	    	},
		
		});
		this.items = [ ruleInPolicyGrid ];
		
		this.callParent(arguments);		
	},
		
});