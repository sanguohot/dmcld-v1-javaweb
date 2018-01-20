Ext.define('app.view.operation.OperationModule' ,{
    extend: 'Ext.ux.desktop.Module',

    requires: [
         'Ext.window.MessageBox',
        'Ext.util.Format',
        'Ext.grid.Panel',
		'Ext.ux.grid.FiltersFeature',
    ],

    id:'operation_win',
    alias : 'widget.operation',
	createWindow : function(openLink){
		if(privilege.procModule("configuration")){
			return;
		}
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('operation_win');
		if(!win){
			var MessageBox= Ext.MessageBox.show({
		           title: boxWaitTitle,
		           msg: boxLoadingMsg,
		           width:300,
		           progress:false,
		           progressText:boxInitMsg,
		           modal:true,
		           closable:false

		       });
			var count = 0;
			var percentage = 0;
			var porgressText = 0;
			var task = {
				run:function(){
                    //通过回调实现异步加载
                    do_action (function(err){
                        Ext.TaskManager.stop(task);
                        MessageBox.hide();
                        progress(desktop,operationTree,operationPanel);
                    })
                    function do_action(cb){
                        setTimeout('downloadAhead()',100);
                        operationTree=Ext.create('app.view.operation.OperationTree',{});
                        operationPanel=Ext.create('app.view.operation.OperationPanel',{});
                        function rightClickFn(view, record, item, index, event, options) {
                            var eType=record.raw.eType;
                            var nid=record.raw.nid;
                            var tid=record.raw.tid;
                            var name=record.raw.name;
                            event.preventDefault();
                            event.stopEvent();
                            if(eType=='froamzone'){
                                Ext.create('Ext.menu.Menu', {
                                    width: 100,
                                    margin: '0 0 10 0',
                                    floating : true,
                                    plain : true,
                                    items : [ {
                                        text : 'Add Zone',
                                        iconCls:'add',
                                        ulan:'miAddZone',
                                        handler : function() {
                                            var tid=record.parentNode.raw.tid;
                                            var addZone=Ext.getCmp('addZone');
                                            if(addZone=='undefined'||addZone==undefined){
                                                addZone = Ext.create('app.view.operation.domain.roamzone.AddZone');
                                            }

                                            var policyInfoStore=Ext.create('app.store.operation.domain.PolicyInDomainStore',{});
                                            policyInfoStore.on('beforeload', function (policyInfoStore, options) {
                                                var params = { domainUuid:tid};
                                                Ext.apply(policyInfoStore.proxy.extraParams, params);
                                            });

                                            policyInfoStore.on('load',function(policyInfoStore, options){
                                                addZone.down('form').getForm().findField('policyUuid').store=policyInfoStore;
                                            });
                                            policyInfoStore.load();

                                            addZone.down('form').getForm().findField('domainUuid').setValue(tid);
                                            addZone.show();
                                        }
                                    },{
                                        text : 'Refresh',
                                        iconCls:'refresh2',
                                        ulan:'miRfresh',
                                        handler : function() {
                                            var tid=record.parentNode.raw.tid;
                                            Ext.getCmp('operationTree').down('treeview').loadMask.maskOnDisable=false;
                                            Ext.getCmp('operationTree').down('treeview').loadMask.setDisabled(true);
//							        			Ext.getCmp('operationTree').down('treeview').loadMask.maskOnDisable=false;
                                            treeFn.refreshNode('operationTree','froamzone_-'+tid,null);
                                        }
                                    }]
                                }).showAt(event.getXY());
                            }

                            if(eType=='roamzone'){
                                Ext.create('Ext.menu.Menu', {
                                    width: 100,
                                    margin: '0 0 10 0',
                                    floating : true,
                                    plain : true,
                                    items : [ {
                                        text : 'Add Site',
                                        iconCls:'add',
                                        ulan:'miAddSite',
                                        handler : function() {

                                            var addSite=Ext.getCmp('addSite');
                                            if(addSite=='undefined'||addSite==undefined){
                                                addSite = Ext.create('app.view.operation.domain.roamzone.AddSite');
                                            }
                                            addSite.cmpId='siteInZoneTab';
                                            var zoneUuid=tid;
                                            var domainUuid=record.parentNode.parentNode.raw.tid;
                                            addSite.down('form').getForm().findField('domainUuid').setValue(domainUuid);
                                            addSite.down('form').getForm().findField('zoneUuid').setValue(zoneUuid);
                                            addSite.show();
                                        }
                                    },{
                                        text : 'Refresh',
                                        iconCls:'refresh2',
                                        ulan:'miRfresh',
                                        handler : function() {
                                            Ext.getCmp('operationTree').down('treeview').loadMask.maskOnDisable=false;
                                            Ext.getCmp('operationTree').down('treeview').loadMask.setDisabled(true);
                                            treeFn.refreshNode('operationTree','roamzone_'+tid,null);
                                        }
                                    }]
                                }).showAt(event.getXY());
                            }

                            if(eType=='site'){
                                Ext.create('Ext.menu.Menu', {
                                    width: 100,
                                    margin: '0 0 10 0',
                                    floating : true,
                                    plain : true,
                                    items : [ {
                                        text : 'Add Device',
                                        iconCls:'add',
                                        ulan:'miAddDevice',
                                        handler : function() {
                                            var addNe=Ext.getCmp('addNeToSite');
                                            if(addNe=='undefined'||addNe==undefined){
                                                addNe=Ext.create('app.view.operation.domain.roamzone.site.AddNeToSite',{
                                                    treeId:tid,
                                                    id:'addNeToSite',
                                                });
                                            }
                                            addNe.gridStore = null;
                                            var domainUuid=record.parentNode.parentNode.parentNode.raw.tid;
                                            var comboxStore = addNe.comboxStore;
                                            comboxStore.removeAll();
                                            comboxStore.on('load',function(){
                                                var defaultGrpUuid = addNe.down('form').getForm().findField('defaultGrpUuid');
                                                var store0 = defaultGrpUuid.store;
                                                var policyUuid = addNe.down('form').getForm().findField('policyUuid');
                                                var store2 = policyUuid.store;

                                                store0.removeAll();
                                                store2.removeAll();
                                                for(var i=0; i<comboxStore.getCount(); i++){
                                                    if(comboxStore.getAt(i).get('type')=='policy'){
                                                        store2.add(comboxStore.getAt(i));
                                                    }else if(comboxStore.getAt(i).get('type')=='group'){
                                                        store0.add(comboxStore.getAt(i));
                                                    }
                                                }
                                                defaultGrpUuid.setValue(store0.getAt(0).get('uuid'));
                                                policyUuid.setValue(store2.getAt(0).get('uuid'));
                                                addNe.down('form').getForm().findField('productId').setValue('31');
                                                addNe.down('form').getForm().findField('siteUuid').setValue(tid);
                                                addNe.down('form').getForm().findField('domainUuid').setValue(domainUuid);
                                                addNe.show();
                                            },this,{single: true})
                                            comboxStore.load({params:{domainUuid:domainUuid,types:'policy,group'}});

                                        }

                                    },{
                                        text : 'Refresh',
                                        iconCls:'refresh2',
                                        ulan:'miRfresh',
                                        handler : function() {
                                            Ext.getCmp('operationTree').down('treeview').loadMask.maskOnDisable=false;
                                            Ext.getCmp('operationTree').down('treeview').loadMask.setDisabled(true);
                                            treeFn.refreshNode('operationTree','site_'+tid,null);
                                        }
                                    }]
                                }).showAt(event.getXY());
                            }

                            if(eType=='fgroup'){
                                Ext.create('Ext.menu.Menu', {
                                    width: 100,
                                    margin: '0 0 10 0',
                                    floating : true,
                                    plain : true,
                                    items : [ {
                                        text : 'Add Group',
                                        iconCls:'add',
                                        ulan:'miAddGroup',
                                        handler : function() {
                                            var addGroup=Ext.getCmp('addGroup');
                                            var tid=record.parentNode.raw.tid;

                                            if(addGroup=='undefined'||addGroup==undefined){
                                                addGroup = Ext.create('app.view.operation.domain.group.AddGroup');
                                            }

                                            var comboxStore = Ext.create("app.store.util.ComboxStore",{})
                                            var form=addGroup.down('form').getForm();
                                            var zoneStore=form.findField('zoneUuid').store;
                                            var hbmTestGrpUuidStore=form.findField('hbmTestGrpUuid').store;
                                            var hbmMasterGrpUuidStore=form.findField('hbmMasterGrpUuid').store;
                                            var hbmPromNextGrpStore=form.findField('hbmPromNextGrp').store;
                                            var hbmNextBlockedGrpStore=form.findField('hbmNextBlockedGrp').store;
                                            var paidGrpUuid=form.findField('paidGrpUuid').store;
                                            comboxStore.removeAll();

                                            zoneStore.removeAll();
                                            hbmTestGrpUuidStore.removeAll();
                                            hbmMasterGrpUuidStore.removeAll();
                                            hbmPromNextGrpStore.removeAll();
                                            hbmNextBlockedGrpStore.removeAll();
                                            paidGrpUuid.removeAll();

                                            hbmTestGrpUuidStore.add({id:0,name:'NULL'});
                                            hbmMasterGrpUuidStore.add({id:0,name:'NULL'});
                                            hbmPromNextGrpStore.add({id:0,name:'NULL'});
                                            hbmNextBlockedGrpStore.add({id:0,name:'NULL'});
                                            paidGrpUuid.add({id:0,name:'NULL'});

                                            comboxStore.removeAll();
                                            comboxStore.on('load',function(){
                                                for(var i=0; i<comboxStore.getCount(); i++){
                                                    if(comboxStore.getAt(i).get('type')=='zone'){
                                                        zoneStore.add(comboxStore.getAt(i));
                                                    }else if(comboxStore.getAt(i).get('type')=='group'){
                                                        hbmTestGrpUuidStore.add(comboxStore.getAt(i));
                                                        hbmMasterGrpUuidStore.add(comboxStore.getAt(i));
                                                        hbmPromNextGrpStore.add(comboxStore.getAt(i));
                                                        hbmNextBlockedGrpStore.add(comboxStore.getAt(i));
                                                    }else if(comboxStore.getAt(i).get('type')=='paidgroup'){
                                                        paidGrpUuid.add(comboxStore.getAt(i));
                                                    }
                                                }

                                            },this,{single: true})
                                            comboxStore.load({params:{domainUuid:tid,types:'zone,group,paidgroup'}});

//												var domainUuid=Ext.getCmp('groupDomainUuid');
                                            addGroup.down('form').getForm().findField('domainUuid').setValue(tid);
                                            addGroup.show();

                                        }

                                    },{
                                        text : 'Refresh',
                                        iconCls:'refresh2',
                                        ulan:'miRfresh',
                                        handler : function() {
                                            var tid=record.parentNode.raw.tid;
                                            Ext.getCmp('operationTree').down('treeview').loadMask.maskOnDisable=false;
                                            Ext.getCmp('operationTree').down('treeview').loadMask.setDisabled(true);
                                            treeFn.refreshNode('operationTree','fgroup_-'+tid,null);
                                        }
                                    }]
                                }).showAt(event.getXY());
                            }


                            if(eType=='fpolicy'){
                                Ext.create('Ext.menu.Menu', {
                                    width: 100,
                                    margin: '0 0 10 0',
                                    floating : true,
                                    plain : true,
                                    items : [ {
                                        text : 'Add Policy',
                                        iconCls:'add',
                                        ulan:'miAddPolicy',
                                        handler : function() {
                                            var addPolicy=Ext.getCmp('addPolicy');
                                            var tid=record.parentNode.raw.tid;
                                            if(addPolicy=='undefined'||addPolicy==undefined){
                                                addPolicy = Ext.create('app.view.operation.domain.policy.AddPolicy');
                                            }

                                            addPolicy.down('form').getForm().findField('domainUuid').setValue(tid);
                                            addPolicy.show();
                                        }

                                    },{
                                        text : 'Refresh',
                                        iconCls:'refresh2',
                                        ulan:'miRfresh',
                                        handler : function() {
                                            var tid=record.parentNode.raw.tid;
                                            Ext.getCmp('operationTree').down('treeview').loadMask.maskOnDisable=false;
                                            Ext.getCmp('operationTree').down('treeview').loadMask.setDisabled(true);
                                            treeFn.refreshNode('operationTree','fpolicy_-'+tid,null);
                                        }
                                    }]
                                }).showAt(event.getXY());
                            }

                            if(eType=='policy'){
                                Ext.create('Ext.menu.Menu', {
                                    width: 100,
                                    margin: '0 0 10 0',
                                    floating : true,
                                    plain : true,
                                    items : [ {
                                        text : 'Add Rule',
                                        iconCls:'add',
                                        ulan:'miAddRule',
                                        handler : function() {

                                            var rulePolicyUuid=tid;
                                            var ruleDomainUuid=record.parentNode.parentNode.raw.tid;
                                            Ext.Ajax.request({
                                                url:'ruleManager!countRule.action?domainUuid='+ruleDomainUuid+"&policyUuid="+rulePolicyUuid,
                                                method:'POST',
                                                callback: function (options, success, response) {
                                                    var obj=Ext.JSON.decode(response.responseText);
                                                    if(obj['success']){
                                                        var addRule=Ext.getCmp('addRule');
                                                        if(addRule=='undefined'||addRule==undefined){
                                                            addRule = Ext.create('app.view.operation.domain.policy.AddRule');
                                                        }
                                                        addRule.down('form').getForm().findField('domainUuid').setValue(ruleDomainUuid);
                                                        addRule.down('form').getForm().findField('policyUuid').setValue(rulePolicyUuid);
                                                        addRule.down('form').getForm().findField('activateType').setValue(1);

                                                        var groupInfoStore=addRule.down('form').getForm().findField('grpUuid').store;
                                                        groupInfoStore.load({params:{domainUuid:ruleDomainUuid}});
                                                        addRule.show();

                                                    }else{
                                                        if(obj['msg']=="maxRule"){
                                                            boxMaxRule = lanControll.getLanValue('boxMaxRule');
                                                            Ext.MessageBox.alert(boxFailture,boxMaxRule);
                                                            return;
                                                        }
                                                    }
                                                }
                                            });

                                        }

                                    }]
                                }).showAt(event.getXY());
                            }
                        };
                        operationTree.addListener('itemcontextmenu', rightClickFn, this);
                        cb(null);
                    }

//					count += 3;
//					percentage = count/10;
//					//alert(count)
//					progressText = percentage*100+boxCompletedMsg;
//					MessageBox.updateProgress(percentage, progressText);
//					if(count>10){
//						Ext.TaskManager.stop(task);
//						MessageBox.hide();
//						progress(desktop,operationTree,operationPanel);
//					}
//					if(count==3){
//		        		 setTimeout('downloadAhead()',100);
//		        		 operationTree=Ext.create('app.view.operation.OperationTree',{});
//		        	}else if(count==6){
//		        		 operationPanel=Ext.create('app.view.operation.OperationPanel',{});
//		        	}else if(count==9){
//		            	 function rightClickFn(view, record, item, index, event, options) {
//								var eType=record.raw.eType;
//								var nid=record.raw.nid;
//								var tid=record.raw.tid;
//								var name=record.raw.name;
//								event.preventDefault();
//								event.stopEvent();
//								if(eType=='froamzone'){
//									Ext.create('Ext.menu.Menu', {
//										width: 100,
//										margin: '0 0 10 0',
//										floating : true,
//										plain : true,
//										items : [ {
//											text : 'Add Zone',
//											iconCls:'add',
//											ulan:'miAddZone',
//											handler : function() {
//												var tid=record.parentNode.raw.tid;
//												var addZone=Ext.getCmp('addZone');
//												if(addZone=='undefined'||addZone==undefined){
//													addZone = Ext.create('app.view.operation.domain.roamzone.AddZone');
//							        			}
//
//												var policyInfoStore=Ext.create('app.store.operation.domain.PolicyInDomainStore',{});
//							         			policyInfoStore.on('beforeload', function (policyInfoStore, options) {
//							         				var params = { domainUuid:tid};
//							         		        Ext.apply(policyInfoStore.proxy.extraParams, params);
//							         		    });
//
//							         			policyInfoStore.on('load',function(policyInfoStore, options){
//							         				addZone.down('form').getForm().findField('policyUuid').store=policyInfoStore;
//							         			});
//							         			policyInfoStore.load();
//
//												addZone.down('form').getForm().findField('domainUuid').setValue(tid);
//							    				addZone.show();
//											}
//										},{
//							        		text : 'Refresh',
//							        		iconCls:'refresh2',
//							        		ulan:'miRfresh',
//							        		handler : function() {
//							        			var tid=record.parentNode.raw.tid;
//							        			Ext.getCmp('operationTree').down('treeview').loadMask.maskOnDisable=false;
//							    				Ext.getCmp('operationTree').down('treeview').loadMask.setDisabled(true);
////							        			Ext.getCmp('operationTree').down('treeview').loadMask.maskOnDisable=false;
//							        			treeFn.refreshNode('operationTree','froamzone_-'+tid,null);
//							        		}
//							        	}]
//									}).showAt(event.getXY());
//								}
//
//								if(eType=='roamzone'){
//									Ext.create('Ext.menu.Menu', {
//										width: 100,
//										margin: '0 0 10 0',
//										floating : true,
//										plain : true,
//										items : [ {
//											text : 'Add Site',
//											iconCls:'add',
//											ulan:'miAddSite',
//											handler : function() {
//
//												var addSite=Ext.getCmp('addSite');
//												if(addSite=='undefined'||addSite==undefined){
//													addSite = Ext.create('app.view.operation.domain.roamzone.AddSite');
//												}
//												addSite.cmpId='siteInZoneTab';
//												var zoneUuid=tid;
//								   				var domainUuid=record.parentNode.parentNode.raw.tid;
//								   				addSite.down('form').getForm().findField('domainUuid').setValue(domainUuid);
//								   				addSite.down('form').getForm().findField('zoneUuid').setValue(zoneUuid);
//												addSite.show();
//											}
//										},{
//							        		text : 'Refresh',
//							        		iconCls:'refresh2',
//							        		ulan:'miRfresh',
//							        		handler : function() {
//												Ext.getCmp('operationTree').down('treeview').loadMask.maskOnDisable=false;
//							    				Ext.getCmp('operationTree').down('treeview').loadMask.setDisabled(true);
//							        			treeFn.refreshNode('operationTree','roamzone_'+tid,null);
//							        		}
//							        	}]
//									}).showAt(event.getXY());
//								}
//
//								if(eType=='site'){
//									Ext.create('Ext.menu.Menu', {
//							            width: 100,
//							            margin: '0 0 10 0',
//							            floating : true,
//							        	plain : true,
//							        	items : [ {
//							        		text : 'Add Device',
//							        		iconCls:'add',
//							        		ulan:'miAddDevice',
//							        		handler : function() {
//							        			var addNe=Ext.getCmp('addNeToSite');
//								        			if(addNe=='undefined'||addNe==undefined){
//								        				addNe=Ext.create('app.view.operation.domain.roamzone.site.AddNeToSite',{
//								        					treeId:tid,
//								        					id:'addNeToSite',
//								        			});
//							        			}
//								        		addNe.gridStore = null;
//							        			var domainUuid=record.parentNode.parentNode.parentNode.raw.tid;
//							        			var comboxStore = addNe.comboxStore;
//							        			comboxStore.removeAll();
//							        			comboxStore.on('load',function(){
//							        				var defaultGrpUuid = addNe.down('form').getForm().findField('defaultGrpUuid');
//							    					var store0 = defaultGrpUuid.store;
//							    					var policyUuid = addNe.down('form').getForm().findField('policyUuid');
//							    					var store2 = policyUuid.store;
//
//							    					store0.removeAll();
//							    					store2.removeAll();
//							    					for(var i=0; i<comboxStore.getCount(); i++){
//							    						if(comboxStore.getAt(i).get('type')=='policy'){
//							    							store2.add(comboxStore.getAt(i));
//							    						}else if(comboxStore.getAt(i).get('type')=='group'){
//							    							store0.add(comboxStore.getAt(i));
//							    						}
//							    					}
//							    					defaultGrpUuid.setValue(store0.getAt(0).get('uuid'));
//							    					policyUuid.setValue(store2.getAt(0).get('uuid'));
//							    					addNe.down('form').getForm().findField('productId').setValue('31');
//													addNe.down('form').getForm().findField('siteUuid').setValue(tid);
//													addNe.down('form').getForm().findField('domainUuid').setValue(domainUuid);
//							    					addNe.show();
//							        			},this,{single: true})
//							        			comboxStore.load({params:{domainUuid:domainUuid,types:'policy,group'}});
//
//							        		}
//
//							        	},{
//							        		text : 'Refresh',
//							        		iconCls:'refresh2',
//							        		ulan:'miRfresh',
//							        		handler : function() {
//								        		Ext.getCmp('operationTree').down('treeview').loadMask.maskOnDisable=false;
//							    				Ext.getCmp('operationTree').down('treeview').loadMask.setDisabled(true);
//							        			treeFn.refreshNode('operationTree','site_'+tid,null);
//							        		}
//							        	}]
//							        }).showAt(event.getXY());
//								}
//
//								if(eType=='fgroup'){
//									Ext.create('Ext.menu.Menu', {
//							            width: 100,
//							            margin: '0 0 10 0',
//							            floating : true,
//							        	plain : true,
//							        	items : [ {
//							        		text : 'Add Group',
//							        		iconCls:'add',
//							        		ulan:'miAddGroup',
//							        		handler : function() {
//							        			var addGroup=Ext.getCmp('addGroup');
//							        			var tid=record.parentNode.raw.tid;
//
//							        			if(addGroup=='undefined'||addGroup==undefined){
//							        				addGroup = Ext.create('app.view.operation.domain.group.AddGroup');
//							        			}
//
//							        			var comboxStore = Ext.create("app.store.util.ComboxStore",{})
//							        			var form=addGroup.down('form').getForm();
//							        			var zoneStore=form.findField('zoneUuid').store;
//							        			var hbmTestGrpUuidStore=form.findField('hbmTestGrpUuid').store;
//							        			var hbmMasterGrpUuidStore=form.findField('hbmMasterGrpUuid').store;
//							        			var hbmPromNextGrpStore=form.findField('hbmPromNextGrp').store;
//							        			var hbmNextBlockedGrpStore=form.findField('hbmNextBlockedGrp').store;
//							        			var paidGrpUuid=form.findField('paidGrpUuid').store;
//							        			comboxStore.removeAll();
//
//							        			zoneStore.removeAll();
//						            			hbmTestGrpUuidStore.removeAll();
//						            			hbmMasterGrpUuidStore.removeAll();
//						            			hbmPromNextGrpStore.removeAll();
//						            			hbmNextBlockedGrpStore.removeAll();
//						            			paidGrpUuid.removeAll();
//
//						            			hbmTestGrpUuidStore.add({id:0,name:'NULL'});
//						            			hbmMasterGrpUuidStore.add({id:0,name:'NULL'});
//						            			hbmPromNextGrpStore.add({id:0,name:'NULL'});
//						            			hbmNextBlockedGrpStore.add({id:0,name:'NULL'});
//						            			paidGrpUuid.add({id:0,name:'NULL'});
//
//							        			comboxStore.removeAll();
//							        			comboxStore.on('load',function(){
//							        				for(var i=0; i<comboxStore.getCount(); i++){
//							    						if(comboxStore.getAt(i).get('type')=='zone'){
//							    							zoneStore.add(comboxStore.getAt(i));
//							    						}else if(comboxStore.getAt(i).get('type')=='group'){
//							    							hbmTestGrpUuidStore.add(comboxStore.getAt(i));
//							    							hbmMasterGrpUuidStore.add(comboxStore.getAt(i));
//							    							hbmPromNextGrpStore.add(comboxStore.getAt(i));
//							    							hbmNextBlockedGrpStore.add(comboxStore.getAt(i));
//							    						}else if(comboxStore.getAt(i).get('type')=='paidgroup'){
//							    							paidGrpUuid.add(comboxStore.getAt(i));
//							    						}
//							    					}
//
//							        			},this,{single: true})
//							        			comboxStore.load({params:{domainUuid:tid,types:'zone,group,paidgroup'}});
//
////												var domainUuid=Ext.getCmp('groupDomainUuid');
//							        			addGroup.down('form').getForm().findField('domainUuid').setValue(tid);
//							        			addGroup.show();
//
//							        		}
//
//							        	},{
//							        		text : 'Refresh',
//							        		iconCls:'refresh2',
//							        		ulan:'miRfresh',
//							        		handler : function() {
//							        			var tid=record.parentNode.raw.tid;
//							        			Ext.getCmp('operationTree').down('treeview').loadMask.maskOnDisable=false;
//							    				Ext.getCmp('operationTree').down('treeview').loadMask.setDisabled(true);
//							        			treeFn.refreshNode('operationTree','fgroup_-'+tid,null);
//							        		}
//							        	}]
//							        }).showAt(event.getXY());
//								}
//
//
//								if(eType=='fpolicy'){
//									Ext.create('Ext.menu.Menu', {
//							            width: 100,
//							            margin: '0 0 10 0',
//							            floating : true,
//							        	plain : true,
//							        	items : [ {
//							        		text : 'Add Policy',
//							        		iconCls:'add',
//							        		ulan:'miAddPolicy',
//							        		handler : function() {
//							        			var addPolicy=Ext.getCmp('addPolicy');
//							        			var tid=record.parentNode.raw.tid;
//							        			if(addPolicy=='undefined'||addPolicy==undefined){
//							        				addPolicy = Ext.create('app.view.operation.domain.policy.AddPolicy');
//							        			}
//
//							        			addPolicy.down('form').getForm().findField('domainUuid').setValue(tid);
//							        			addPolicy.show();
//							        		}
//
//							        	},{
//							        		text : 'Refresh',
//							        		iconCls:'refresh2',
//							        		ulan:'miRfresh',
//							        		handler : function() {
//							        			var tid=record.parentNode.raw.tid;
//							        			Ext.getCmp('operationTree').down('treeview').loadMask.maskOnDisable=false;
//							    				Ext.getCmp('operationTree').down('treeview').loadMask.setDisabled(true);
//							        			treeFn.refreshNode('operationTree','fpolicy_-'+tid,null);
//							        		}
//							        	}]
//							        }).showAt(event.getXY());
//								}
//
//								if(eType=='policy'){
//									Ext.create('Ext.menu.Menu', {
//							            width: 100,
//							            margin: '0 0 10 0',
//							            floating : true,
//							        	plain : true,
//							        	items : [ {
//							        		text : 'Add Rule',
//							        		iconCls:'add',
//							        		ulan:'miAddRule',
//							        		handler : function() {
//
//								        		var rulePolicyUuid=tid;
//									    		var ruleDomainUuid=record.parentNode.parentNode.raw.tid;
//								        		Ext.Ajax.request({
//							                		url:'ruleManager!countRule.action?domainUuid='+ruleDomainUuid+"&policyUuid="+rulePolicyUuid,
//							                		method:'POST',
//							                		callback: function (options, success, response) {
//														var obj=Ext.JSON.decode(response.responseText);
//								                    	if(obj['success']){
//								                    		var addRule=Ext.getCmp('addRule');
//										        			if(addRule=='undefined'||addRule==undefined){
//										        				addRule = Ext.create('app.view.operation.domain.policy.AddRule');
//										        			}
//												    		addRule.down('form').getForm().findField('domainUuid').setValue(ruleDomainUuid);
//												    		addRule.down('form').getForm().findField('policyUuid').setValue(rulePolicyUuid);
//												    		addRule.down('form').getForm().findField('activateType').setValue(1);
//
//										        			var groupInfoStore=addRule.down('form').getForm().findField('grpUuid').store;
//										        			groupInfoStore.load({params:{domainUuid:ruleDomainUuid}});
//										        			addRule.show();
//
//								                    	}else{
//								                    		if(obj['msg']=="maxRule"){
//								                    			boxMaxRule = lanControll.getLanValue('boxMaxRule');
//									                		Ext.MessageBox.alert(boxFailture,boxMaxRule);
//									                		return;
//									                	}
//								                    	}
//							                    	}
//							                	});
//
//							        		}
//
//							        	}]
//							        }).showAt(event.getXY());
//								}
//							};
//							operationTree.addListener('itemcontextmenu', rightClickFn, this);
//		        	}
				},
				interval:300
			};
			Ext.TaskManager.start(task);
			function progress(desktop,operationTree,operationPanel){

//				var view=ip.readDB('apv',0,'view');
//				var height=0;
//				var max=false;
//				if(view==2){
//					height=180;
//					max=true;
//				}else{
//					height=0;
//					max=false;
//				}
				
				var mp=Ext.getCmp('mp');
            	win = desktop.createWindow({
					id: 'operation_win',
					title:lanControll.getLanValue('tiConfigMnt'),
					layout: 'border',
					iconCls: 'operation-small',
					closable:true,
					resizable:false,
				    draggable:false,
				    maximizable:false,
				    minimizable:false,
					closeAction: 'hide',
					autoScroll:false,
					width: Math.floor(desktop.getWidth()-mp.getWidth()),//1024,
					height:Math.floor(mp.getHeight()),//680,
					x:mp.getWidth()+2,
					y:0,
	//				bodyStyle: 'padding: 2px;',
					border: 0,
				    style: {
				        borderColor: '#CED9E7',
				        borderStyle: 'solid'
				    },
				    margin:'0 0 0 0',
				    padding:'0 0 0 0',
					items: [{
						 region: 'west',
						 layout:'fit',
						 width:Math.floor(320),
						 collapsible: false,
						 split: true,
						 border:false,
						 autoScroll:false,
						 items:[operationTree]
					 	},{
						 id:'operationCenterPanel',
						 region:'center',
						 height:Math.floor(mp.getHeight()),
						 border:false,
						 layout:'fit',
						 items:[operationPanel]
					}],
					});	
					win.show();
					
					var simCloudPanel=Ext.getCmp('simCloudPanel');
					if(operationPanel){
						var size=operationPanel.getSize();
						simCloudPanel.setSize(size.width,size.height);
						simCloudPanel.setVisible(true);
						simCloudPanel.doLayout();
					}
					if(treeFn.triggerValue){
	    				win.down('trigger').setValue(treeFn.triggerValue);
	    			}
					//open link when window open
					if(openLink){
						operationTree.openLink=openLink;
						var ot = Ext.getCmp('operationTree');
						var rootNode=ot.getRootNode();
						var node=rootNode.findChild('nid',openLink,true);
	    				if(node){
	    					var temp=node;
		    				for(var c=0;c<5;c++){
		    					if(temp.parentNode){
		    						temp=temp.parentNode;
		    						if(temp){
		    							if(!temp.isExpanded()){
		    								ot.expandNode(temp);
		    							}
		    						}
		    					}else{
		    						break;
		    					}
		    				}
							ot.getSelectionModel().select(node);
							ot.fireEvent('itemclick',null,node);
							ot.getSelectionModel().setLastFocused(node);
	    				}
					}
             
			}
		}
		return win;
	},
	
    init : function(){
        this.launcher = {
            text: lanControll.getLanValue('moduleConfigName'),
            iconCls:'operation-small',
            handler : this.createWindow,
            scope: this
        };
    }
	
});