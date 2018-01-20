Ext.define('app.view.operation.domain.roamzone.site.SiteListTab',{
		extend:'Ext.panel.Panel',
		title:'',
		layout:'fit',
		treeName:'',
		initComponent: function() {
			var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
			var	siteInZoneStore = Ext.create('app.store.operation.domain.roamzone.SiteInZoneStore', {});
			siteInZoneStore.on('beforeload',function(){
				siteInZoneStore.loadFlag = false;
			});
			this.store=siteInZoneStore;
			var siteGrid = Ext.create('Ext.grid.Panel', {
				itemId:'grid',
				treeName:'',
				domainUuid:0,
				layout:'fit',
				border:false,
	   			autoScroll:true,
	   			columnLines:true,
	   			store: siteInZoneStore,
	   			viewConfig: {
	   				loadMask:{
	   					msg:lanControll.getLanValue('maskMsg')
	   				},
	   				enableTextSelection: true
	   	  		},
	   			selModel: Ext.create('Ext.selection.CheckboxModel'),
	   			columns: [
					{header: 'uuid',dataIndex: 'uuid',hidden:true,flex:1},											
	   				{header: 'Name',dataIndex: 'name',flex:1},											
	   				{header: 'Description',dataIndex: 'detailDesc',flex:1},
	   				{header: 'Default Flag',dataIndex: 'defaultFlag',hidden:true},
	   				{header: 'Zone Uuid',dataIndex: 'zoneUuid',hidden:true},
	   				{header: 'Domain Uuid',dataIndex: 'domainUuid',hidden:true},
	   			],
	   			listeners:{
					itemdblclick: function(grid, row, columnindex,e){
					
	        			var ot=Ext.getCmp('operationTree');
	        			if(maintenance){
	        				ot = Ext.getCmp('maintenanceTree');
	        			}
	        			var uuid=row.get('uuid');
	        			var rootNode=ot.getRootNode();
	        			var node=rootNode.findChild('nid','site_'+uuid,true);
	        			
	        			ot.fireEvent('itemclick',null,node);
					},
					afterlayout:{
		    			fn:function(){
		    				this.createTbar();
		    				lanControll.setFieldSet(this);
		    			},
		    			single:true
		    		}
				},
				maintenance:maintenance,
		    	createTbar:function(){
		    		var tbar = [];
		    		if(!this.maintenance){
		    			var add = Ext.create('Ext.button.Button',{
		    		   		xtype:'button',
		    		   		text: 'Add Site',
		    		   		ulan:'btAdd',
		    		   		iconCls:'add',
		    		   		flag:"domain_edit",
		    		   		listeners:{ 
		    		   			click: function() {
		       				
		    		   				var addSite=Ext.getCmp('addSite');
		    						if(addSite=='undefined'||addSite==undefined){
		    							addSite = Ext.create('app.view.operation.domain.roamzone.AddSite');
		    							lanControll.setLan(addSite);
		    						}
		    						
		    		   				var zoneUuid=siteGrid.treeName;
		    		   				var domainUuid=siteGrid.domainUuid;
		    		   				addSite.down('form').getForm().findField('domainUuid').setValue(domainUuid);
		    		   				addSite.cmpId=siteGrid.up('panel').id;
					        		var zoneUuidField = addSite.down('form').getForm().findField('zoneUuid');
					        		if(zoneUuid>0){
		    		   					zoneUuidField.setVisible(false);
		    		   					zoneUuidField.setValue(zoneUuid);
		    		   					addSite.show();
		    		   				}else{
		    		   					var comboxStore = addSite.comboxStore;
						    			comboxStore.removeAll();
						    			comboxStore.on('load',function(){
											var store0 = zoneUuidField.store;
											store0.removeAll();
											for(var i=0; i<comboxStore.getCount(); i++){
												if(comboxStore.getAt(i).get('type')=='zone'){
													store0.add(comboxStore.getAt(i));
												}
											}
											zoneUuidField.setValue(store0.getAt(0).get('uuid'));
			    		   					zoneUuidField.setVisible(true);
			    		   					addSite.show();
						    			},this,{single: true})
						    			comboxStore.load({params:{domainUuid:domainUuid,types:'zone'}});
		    		   				}
		    		   			}					
		    		   		},
		    		   	});
		    			tbar.push(add);
		    			tbar.push('-');
		    			
		    			var del = Ext.create('Ext.button.Button',{
		    		   		text:'Delete Site',
		    		   		ulan:'btDel',
		    		   		iconCls:'remove',
		    		   		flag:"domain_edit",
		    		   		listeners:{ 
		    		   			click: function() {
		    		   					if ( siteGrid.getSelectionModel().hasSelection() ){
		    		   						
		    									var records = siteGrid.getSelectionModel().getSelection();
		    									var ids="";
		    									var names="";
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
		    											names=records[i].get('name');
		    											name=records[i].get('name');
		    										}else {
		    											ids=ids+","+records[i].get('uuid');
		    											names=names+","+records[i].get('name')
		    										}
		    										
//		    												policyInDomainStore.remove(records[i]);
		    									}
		    									Ext.Ajax.request({
		    				                		url:'checkManager!checkSite.action?ids='+ids+"&names="+names,
		    				                		method:'POST',
		    				                		callback: function (options, success, response) {
		    					             var obj=Ext.JSON.decode(response.responseText);			
		    					               if(obj['success']){
		    					            	   boxDelSite = lanControll.getLanValue('boxDelSite');
		    											Ext.MessageBox.confirm(boxWarnning,boxDelSite,function(e) { 																				
		    				   							if( e == 'yes' ){
		    											Ext.Ajax.request({
		    						                		url:'siteManager!deleteSite.action?ids='+ids+"&domainUuid="+domainUuid+"&name="+name,
		    						                		method:'POST',
		    						                		callback: function (options, success, response) {
		    							                     	var obj=Ext.JSON.decode(response.responseText);			
		    										                  	if(obj['success']){
		    							                    		var zoneUuid=siteGrid.treeName;
		    							              						siteGrid.up('panel').down('panel[itemId=grid]').getStore().load({params:{zoneUuid:zoneUuid}});
		    							                    	}else{
		    							                    		Ext.MessageBox.alert(boxFailture,boxDelFail);
		    							                    	}
		    						                    	}
		    						                	})
		    										}	
		    				   						})
		    						          }else{
		    						        	  Ext.MessageBox.alert(boxWarnning,obj['msg']+boxHasChildNode);
		    						          }
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
			});

			this.items=[siteGrid];
			this.callParent(arguments);		
	}
});
