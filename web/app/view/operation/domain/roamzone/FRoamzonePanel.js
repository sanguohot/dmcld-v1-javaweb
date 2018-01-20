Ext.define('app.view.operation.domain.roamzone.FRoamzonePanel',{
	extend:'Ext.panel.Panel',
//	id:'froamzonePanel',
	layout:'fit',
	hidden:true,
	border:false,
	initComponent: function(){
		var maintenance = (this.id.indexOf('maintenance')>=0)?1:0;
		var zoneInDomainStore = Ext.create('app.store.operation.domain.ZoneInDomainStore', {});
		var froamzoneTab1=Ext.create('Ext.grid.Panel',{
			title:lanControll.getLanValue('tiZoneList'),
//			id:'froamzoneTab1',
			itemId:'grid',
			treeName:'',
			parentNodeTid:'',
			border:false,
			autoScroll:true,
			columnLines:true,
			store: zoneInDomainStore, 
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
				{header: 'Domain Uuid',dataIndex: 'domainUuid',hidden:true},
				{header: 'Default Flage',dataIndex: 'defaultFlag',hidden:true},
			],
			listeners:{
				itemdblclick: function(grid, row, columnindex,e){
				
        			var ot=Ext.getCmp('operationTree');
        			if(maintenance){
        				ot = Ext.getCmp('maintenanceTree');
        			}
        			var uuid=row.get('uuid');
        			var rootNode=ot.getRootNode();
        			var node=rootNode.findChild('nid','roamzone_'+uuid,true);
        			
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
	    	    		text: 'Add Zone',
	    	    		ulan:'btAdd',
	    	    		iconCls:'add',
	    	    		flag:"domain_edit",
	    	    		listeners:{ 
	    	    			click: function() {
	    						var tid=this.up('panel').parentNodeTid;
	    						var addZone=Ext.getCmp('addZone');
	    						if(addZone=='undefined'||addZone==undefined){
	    							addZone = Ext.create('app.view.operation.domain.roamzone.AddZone');
	    							lanControll.setLan(addZone);
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
	    	    		},
	    			});
	    			tbar.push(add);
	    			tbar.push('-');
	    			
	    			var del = Ext.create('Ext.button.Button',{
	    	    		text:'Delete Zone',
	    	    		ulan:'btDel',
	    	    		iconCls:'remove',
	    	    		flag:"domain_edit",
	    	    		listeners:{ 
	    	    			click: function() {
	    	    					if ( froamzoneTab1.getSelectionModel().hasSelection() ){	    	    						
	    									var records = froamzoneTab1.getSelectionModel().getSelection();
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
	    									}
	    									Ext.Ajax.request({
	    				                		url:'checkManager!checkZone.action?ids='+ids+"&names="+names,
	    				                		method:'POST',
	    				                		callback: function (options, success, response) {
	    					             var obj=Ext.JSON.decode(response.responseText);			
	    					               if(obj['success']){
	    					            	   boxDelZone = lanControll.getLanValue('boxDelZone');
	    											Ext.MessageBox.confirm(boxWarnning,boxDelZone,function(e) { 																				
	    			    								if( e == 'yes' ){
	    													Ext.Ajax.request({
	    								                		url:'zoneManager!deleteZone.action?ids='+ids+"&domainUuid="+domainUuid+"&name="+name,
	    								                		method:'POST',
	    								                		callback: function (options, success, response) {
	    															
	    									                    	if(obj['success']){
	    									                    		Ext.MessageBox.alert(boxSuccess,boxDelSucc);
	    									                    		froamzoneTab1.getStore().load();
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
		froamzoneTab1.addListener("afterlayout",function(){
			privilege.procPrivilege(froamzoneTab1);
		},this,{single:true});
		
		var id = 'siteInFZoneTab';
		if(maintenance){
			id = 'maintenanceSiteInFZoneTab';
		}
		var siteTab=Ext.create('app.view.operation.domain.roamzone.site.SiteListTab',{
			id:id,
			title:lanControll.getLanValue('tiSiteList')
		});
		siteTab.addListener("afterlayout",function(){
			privilege.procPrivilege(siteTab);
		},this,{single:true});
		
		var id = 'nesInFZoneTab';
		if(maintenance){
			id = 'maintenanceNesInFZoneTab';
		}
		var nesInFZoneTab=Ext.create('app.view.operation.domain.NesInDomainTab',{
			title:tiDeviceList,
			id:id
		});
		nesInFZoneTab.addListener("afterlayout",function(){
			privilege.procPrivilege(nesInFZoneTab);
		},this,{single:true});
		this.items=[{
	       	xtype: 'tabpanel',
	       	items:[froamzoneTab1,siteTab,nesInFZoneTab],
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