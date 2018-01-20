
Ext.define('app.view.operation.MaintenanceModule' ,{
    extend: 'Ext.ux.desktop.Module',

    requires: [      
        'Ext.util.Format',
        'Ext.grid.Panel',
		'Ext.ux.grid.FiltersFeature',
    ],

    id:'maintenance_win',
    alias : 'widget.maintenance',
	createWindow : function(openLink){
		if(privilege.procModule("maintenance")){
			return;
		}
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('maintenance_win');	
		if(!win){
			var MessageBox = Ext.MessageBox.show({
		           title: boxWaitTitle,
		           msg: boxLoadingMsg,
		           width:300,
		           progress:true,
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
                    do_action(function(err){
                        Ext.TaskManager.stop(task);
                        MessageBox.hide();
                        progress(desktop,MaintenanceTree,MaintenancePanel);
                    })
                    function do_action(cb){
                        setTimeout('downloadAhead()',100);
                        MaintenanceTree=Ext.create('app.view.operation.MaintenanceTree',{});
                        MaintenancePanel=Ext.create('app.view.operation.MaintenancePanel',{});
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
                                    items : [{
                                        text : 'Refresh',
                                        iconCls:'refresh2',
                                        ulan:'miRfresh',
                                        handler : function() {
                                            var tid=record.parentNode.raw.tid;
                                            Ext.getCmp('maintenanceTree').down('treeview').loadMask.maskOnDisable=false;
                                            Ext.getCmp('maintenanceTree').down('treeview').loadMask.setDisabled(true);
//							        			Ext.getCmp('maintenanceTree').down('treeview').loadMask.maskOnDisable=false;
                                            treeFn.refreshNode('maintenanceTree','froamzone_-'+tid,null);
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
                                    items : [{
                                        text : 'Refresh',
                                        iconCls:'refresh2',
                                        ulan:'miRfresh',
                                        handler : function() {
                                            Ext.getCmp('maintenanceTree').down('treeview').loadMask.maskOnDisable=false;
                                            Ext.getCmp('maintenanceTree').down('treeview').loadMask.setDisabled(true);
                                            treeFn.refreshNode('maintenanceTree','roamzone_'+tid,null);
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
                                    items : [{
                                        text : 'Refresh',
                                        iconCls:'refresh2',
                                        ulan:'miRfresh',
                                        handler : function() {
                                            Ext.getCmp('maintenanceTree').down('treeview').loadMask.maskOnDisable=false;
                                            Ext.getCmp('maintenanceTree').down('treeview').loadMask.setDisabled(true);
                                            treeFn.refreshNode('maintenanceTree','site_'+tid,null);
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
                                    items : [{
                                        text : 'Refresh',
                                        iconCls:'refresh2',
                                        ulan:'miRfresh',
                                        handler : function() {
                                            var tid=record.parentNode.raw.tid;
                                            Ext.getCmp('maintenanceTree').down('treeview').loadMask.maskOnDisable=false;
                                            Ext.getCmp('maintenanceTree').down('treeview').loadMask.setDisabled(true);
                                            treeFn.refreshNode('maintenanceTree','fgroup_-'+tid,null);
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
                                    items : [{
                                        text : 'Refresh',
                                        iconCls:'refresh2',
                                        ulan:'miRfresh',
                                        handler : function() {
                                            var tid=record.parentNode.raw.tid;
                                            Ext.getCmp('maintenanceTree').down('treeview').loadMask.maskOnDisable=false;
                                            Ext.getCmp('maintenanceTree').down('treeview').loadMask.setDisabled(true);
                                            treeFn.refreshNode('maintenanceTree','fpolicy_-'+tid,null);
                                        }
                                    }]
                                }).showAt(event.getXY());
                            }

                        };
                        MaintenanceTree.addListener('itemcontextmenu', rightClickFn, this);
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
//						progress(desktop,MaintenanceTree,MaintenancePanel);
//					}
//					else if(count == 1){
//						setTimeout('downloadAhead()',100);
//						MaintenanceTree=Ext.create('app.view.operation.MaintenanceTree',{});
//					}
//					else if(count == 2){
//						MaintenancePanel=Ext.create('app.view.operation.MaintenancePanel',{});
//					}else if(count==3){
//						 function rightClickFn(view, record, item, index, event, options) {
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
//										items : [{
//							        		text : 'Refresh',
//							        		iconCls:'refresh2',
//							        		ulan:'miRfresh',
//							        		handler : function() {
//							        			var tid=record.parentNode.raw.tid;
//							        			Ext.getCmp('maintenanceTree').down('treeview').loadMask.maskOnDisable=false;
//							    				Ext.getCmp('maintenanceTree').down('treeview').loadMask.setDisabled(true);
////							        			Ext.getCmp('maintenanceTree').down('treeview').loadMask.maskOnDisable=false;
//							        			treeFn.refreshNode('maintenanceTree','froamzone_-'+tid,null);
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
//										items : [{
//							        		text : 'Refresh',
//							        		iconCls:'refresh2',
//							        		ulan:'miRfresh',
//							        		handler : function() {
//												Ext.getCmp('maintenanceTree').down('treeview').loadMask.maskOnDisable=false;
//							    				Ext.getCmp('maintenanceTree').down('treeview').loadMask.setDisabled(true);
//							        			treeFn.refreshNode('maintenanceTree','roamzone_'+tid,null);
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
//							        	items : [{
//							        		text : 'Refresh',
//							        		iconCls:'refresh2',
//							        		ulan:'miRfresh',
//							        		handler : function() {
//								        		Ext.getCmp('maintenanceTree').down('treeview').loadMask.maskOnDisable=false;
//							    				Ext.getCmp('maintenanceTree').down('treeview').loadMask.setDisabled(true);
//							        			treeFn.refreshNode('maintenanceTree','site_'+tid,null);
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
//							        	items : [{
//							        		text : 'Refresh',
//							        		iconCls:'refresh2',
//							        		ulan:'miRfresh',
//							        		handler : function() {
//							        			var tid=record.parentNode.raw.tid;
//							        			Ext.getCmp('maintenanceTree').down('treeview').loadMask.maskOnDisable=false;
//							    				Ext.getCmp('maintenanceTree').down('treeview').loadMask.setDisabled(true);
//							        			treeFn.refreshNode('maintenanceTree','fgroup_-'+tid,null);
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
//							        	items : [{
//							        		text : 'Refresh',
//							        		iconCls:'refresh2',
//							        		ulan:'miRfresh',
//							        		handler : function() {
//							        			var tid=record.parentNode.raw.tid;
//							        			Ext.getCmp('maintenanceTree').down('treeview').loadMask.maskOnDisable=false;
//							    				Ext.getCmp('maintenanceTree').down('treeview').loadMask.setDisabled(true);
//							        			treeFn.refreshNode('maintenanceTree','fpolicy_-'+tid,null);
//							        		}
//							        	}]
//							        }).showAt(event.getXY());
//								}
//
//							};
//							MaintenanceTree.addListener('itemcontextmenu', rightClickFn, this);
//					}
					
				},
				interval:300
			};
			Ext.TaskManager.start(task);
			
			function progress(desktop,MaintenanceTree,MaintenancePanel){
				
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
					id: 'maintenance_win',
					title:lanControll.getLanValue('tiMainMnt'),
					layout: 'border',
					iconCls: 'maintain-small',
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
					border: 0,
				    style: {
				        borderColor: '#CED9E7',
				        borderStyle: 'solid'
				    },
				    margin:'0 0 0 0',
				    padding:'0 0 0 0',
					items: [{
						 region: 'west',
						 collapsible: false,
						 layout:'fit',
						 width:Math.floor(320),
						 split: true,
						 border:false,
						 autoScroll:false,
						 items:[MaintenanceTree]
					},{
						 id:'maintenanceCenterPanel',
						 region:'center',
						 height:Math.floor(mp.getHeight()),
						 border:false,
						 layout:'fit',
						 items:[MaintenancePanel]
					}]
				});
				win.show();
				
				var simCloudPanel=Ext.getCmp('maintenanceSimCloudPanel');
				if(MaintenancePanel){
					var xy=MaintenancePanel.getPosition();
					var size=MaintenancePanel.getSize();
					simCloudPanel.setSize(size.width,size.height);
					simCloudPanel.setVisible(true);
					simCloudPanel.doLayout();
				}
				if(treeFn.triggerValue){
    				win.down('trigger').setValue(treeFn.triggerValue);
    			}
				//open link when window open
				if(openLink){
					MaintenanceTree.openLink=openLink;
					var ot = Ext.getCmp('maintenanceTree');
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
            text: lanControll.getLanValue('moduleMainName'),
            iconCls:'maintain-small',
            handler : this.createWindow,
            scope: this
        };
    }
	
});