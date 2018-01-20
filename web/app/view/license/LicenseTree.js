Ext.define('app.view.license.LicenseTree',{
		extend:'Ext.tree.Panel',
		id:'licenseTree',
		layout:'auto',
        enableColumnMove:false,
        hideHeaders:true,
        collapsible: false,
        useArrows: true,
        autoScroll:true,
        rootVisible: false,
        sortable:false,
        menuDisabled:true,
        multiSelect: true,
        singleExpand: false,	
		columnLines: true,	
        viewConfig : {
			loadMask : { msg:lanControll.getLanValue('maskMsg') }
		},

        initComponent: function(){
			var s=Ext.create('app.store.license.LicenseStore',{});
			s.on('load',function(store, node, records,successful,eOpts){
				lanControll.cbTreeRecords(s.getRootNode());
			})
			s.load({params: {needRefresh:1}});
			this.store=s;
			this.callParent(arguments);
		},
        // the 'columns' property is now 'headers'
//		bodyStyle: 'background-color:#F5F5F5;',
        columns: [{
            xtype: 'treecolumn', // this is so we know which column will show
            text: '',
            flex: 1,
            minWidth:275,
            sortable: false,
            dataIndex: 'name',
        }],
        mixins: {
            treeFilter: 'app.util.TreeFilter'
        },
        tbar:[{
			xtype: 'trigger',
			triggerCls: 'x-form-search-trigger',
			onTriggerClick: function () {
				this.setValue('');
				this.triggerEl.elements[0].removeCls('x-form-clear-trigger').addCls('x-form-search-trigger');
				Ext.getCmp("licenseTree").clearFilter();
				
			},
			flex:1,
			emptyText:'search',
			enableKeyEvents: true,
			listeners: {
				keyup: {
					fn: function (field, e) {
						var licenseTree=Ext.getCmp('licenseTree');
						var record=licenseTree.store.getRootNode();
						rawValue=this.getRawValue();
//						console.log(record.findChild('name','SYSTEM').findChild('eType','cloud'));
						
						if (Ext.EventObject.ALT == e.getKey()) {
							field.onTriggerClick();
						} else if(Ext.EventObject.ENTER == e.getKey()){
							Ext.getCmp('licenseTree').expandAll();
//							record.findChild('name','SYSTEM').collapseChildren();
							if(this.getRawValue()!=""){
								this.triggerEl.elements[0].removeCls('x-form-search-trigger').addCls('x-form-clear-trigger');	
							}else{
								this.triggerEl.elements[0].removeCls('x-form-clear-trigger').addCls('x-form-search-trigger');
							}
							
							Ext.getCmp("licenseTree").filterByText(this.getRawValue(),true);
							
							record.findChild('name','SYSTEM').eachChild(function(ec){
								if(ec.raw.name.toLowerCase().indexOf(rawValue.toLowerCase())>-1){
									if(ec.raw.tid<17){
										licenseTree.expandNode(ec);
									}else{
										licenseTree.collapseNode(ec);
										
										licenseTree.expandNode(ec);
									}
								}else{
									var tc=ec.childNodes;
									if(tc!=undefined && tc.length>0){
										for(var i=0;i<tc.length;i++){
											var t=tc[i];
											if(t.raw.name.toLowerCase().indexOf(rawValue.toLowerCase())>-1){
												licenseTree.expandNode(ec);
											}else{
												var ttc=t.childNodes;
												if(ttc!=undefined && ttc.length>0){
													for(var j=0;j<ttc.length;j++){
														var tt=ttc[j];
														if(tt.raw.name.toLowerCase().indexOf(rawValue.toLowerCase())>-1){
															licenseTree.expandNode(ec);
														}
													}
												}
											}
										}
									}
									
								}
							});
							
							
//							record.findChild('name','SYSTEM').findChild('name','default02').expandChildren();
//							Ext.getCmp('licenseTree').expandAll();
						}else {
//							if(this.getRawValue()!=""){
//								this.triggerEl.elements[0].removeCls('x-form-search-trigger').addCls('x-form-clear-trigger');	
//							}else{
//								this.triggerEl.elements[0].removeCls('x-form-clear-trigger').addCls('x-form-search-trigger');
//							}
////							record.findChild('name','SYSTEM').expandChildren();
//							Ext.getCmp("licenseTree").filterByText(this.getRawValue(),true);
						}
					}
				}
			}
        }],
        listeners:{
        	load:function(store, node, records,successful,eOpts ){
				if(node.childNodes[0].raw.eType=='fcloud'){
					var cns=node.childNodes[0].childNodes;
					for(var i=0;i<cns.length;i++){
						if(cns[i].raw.eType.toUpperCase()=='CLOUD'){
							var showNode=ip.readDB('lt_s_n',cns[i].raw.tid,'show');
							if(showNode==1){
								cns[i].expand(false);
							}
						}
					}
				}
			
			},
			itemexpand:function(node,eOpts ){
				if(node.raw.eType.toUpperCase()=='CLOUD'){
					ip.insertDB('lt_s_n',node.raw.tid,'show',1);
				}
			},
			itemcollapse:function(node,eOpts ){
				if(node.raw.eType.toUpperCase()=='CLOUD'){
					ip.insertDB('lt_s_n',node.raw.tid,'show',0);
				}
			},
        	itemclick:function(view,record,item,index,e){
        		console.log("record1="+record.raw.eType);
        		var icon=record.raw.iconCls;
        		var parentNode=record.parentNode;
	        	var licensePanel=Ext.getCmp('licensePanel');
				var xy=licensePanel.getPosition();
				var size=licensePanel.getSize();
        		var eType= record.raw.eType;
        		var name=record.raw.tid;
        		
        		for(var i=0; i<licensePanel.items.items.length; i++){
        			licensePanel.items.items[i].setVisible(false);
        		}
        		treeFn.record = record; 
        		var flag = privilege.procPrivilegeRead(record
        				,licensePanel,name,record.parentNode,size,treeFn);
        		if(flag){
        			return;
        		}
        		if(eType.toUpperCase()=='FCLOUD'){
        			var containerId='licFCloudCardPanel';
        			var licCardPanel=Ext.getCmp(containerId);
        			if(licCardPanel==undefined || licCardPanel==null){
        				licCardPanel=Ext.create('app.view.license.LicCardPanel',{
        					id:containerId,
        					childId:"licAllPaidInFCloudPanel"
        				});
        				licensePanel.add(licCardPanel);
        				licensePanel.doLayout();
        			}
        			licCardPanel.setVisible(true);
        		
        			
        			var licAllPaidListTab=licCardPanel.down('panel');
        			var eastSearch=licAllPaidListTab.down('panel[itemId=search]');
        			Ext.getCmp('licAllPaidInFCloudPanel').usedDomainUuid=name;
        			Ext.getCmp('licAllPaidInFCloudPanel').usedSysUuid=name;
        			var paidListGridStore=licAllPaidListTab.down('panel[itemId=grid]').getStore();
        			var params = {usedDomainUuid:name,usedSysUuid:name};
        			Ext.apply(paidListGridStore.proxy.extraParams, params);
        			
        			
        			var licSrvListTab=Ext.getCmp('licSrvListTab');
            		licSrvListTab.forceRefresh=1;
            		var eastSearch=licSrvListTab.down('panel[itemId=search]');
            		var licSrvListStore=licSrvListTab.down('panel[itemId=grid]').getStore();
                    var params = {cloudUuid:-99};
                    Ext.apply(licSrvListStore.proxy.extraParams, params);
            		
                    var licDomainListTab=Ext.getCmp('licDomainListTab');
            		licDomainListTab.forceRefresh=1;
            		var eastSearch=licDomainListTab.down('panel[itemId=search]');
            		var licDomainListStore=licDomainListTab.down('panel[itemId=grid]').getStore();
                    var params = {cloudUuid:-99};
                    Ext.apply(licDomainListStore.proxy.extraParams, params);
                    
                    var licSrvLogListTab=Ext.getCmp('licSrvLogListTab');
                    licSrvLogListTab.forceRefresh=1;
            		var eastSearch=licSrvLogListTab.down('panel[itemId=search]');
            		var licSrvLogListTabStore=licSrvLogListTab.down('panel[itemId=grid]').getStore();
                    var params = {sysUuid:0};
                    Ext.apply(licSrvLogListTabStore.proxy.extraParams, params);

                    var licDomainLogListTab=Ext.getCmp('licDomainLogListTab');
                    licDomainLogListTab.forceRefresh=1;
                    var eastSearch=licDomainLogListTab.down('panel[itemId=search]');
                    var licDomainLogListTabStore=licDomainLogListTab.down('panel[itemId=grid]').getStore();
                    var params = {domainUuid:0};
                    Ext.apply(licDomainLogListTabStore.proxy.extraParams, params);
                    
                    var licPaidLogListTab=Ext.getCmp('licPaidLogListTab');
                    licPaidLogListTab.forceRefresh=1;
                    var eastSearch=licPaidLogListTab.down('panel[itemId=search]');
                    var licPaidLogListTabStore=licPaidLogListTab.down('panel[itemId=grid]').getStore();
                    var params = {cardSn:'',usedSysUuid:0,usedDomainUuid:0};
                    Ext.apply(licPaidLogListTabStore.proxy.extraParams, params);
                    
            		
                    treeFn.load(Ext.getCmp(containerId).down('tabpanel').getActiveTab());
                    
                    licCardPanel.setVisible(true);
                    licCardPanel.setPagePosition(xy[0],xy[1]);
        			licCardPanel.setSize(size.width,size.height);
        			licCardPanel.setVisible(true);
        		}
        		
        		if(eType.toUpperCase()=='CLOUD'){
        			var containerId='licCloudCardPanel';
        			var licCardPanel=Ext.getCmp(containerId);
        			if(licCardPanel==undefined || licCardPanel==null){
        				licCardPanel=Ext.create('app.view.license.LicCloudPanel',{
        					id:containerId,
        				});
        				licensePanel.add(licCardPanel);
        				licensePanel.doLayout();
        			}
        			licCardPanel.setVisible(true);
        		
        			
        			var licSrvListTab=Ext.getCmp('licSrvInCloudListTab');
            		licSrvListTab.forceRefresh=1;
            		var eastSearch=licSrvListTab.down('panel[itemId=search]');
            		var licSrvListStore=licSrvListTab.down('panel[itemId=grid]').getStore();
                    var params = {cloudUuid:name};
                    Ext.apply(licSrvListStore.proxy.extraParams, params);
            		
                    var licDomainListTab=Ext.getCmp('licDomainInCloudListTab');
            		licDomainListTab.forceRefresh=1;
            		var eastSearch=licDomainListTab.down('panel[itemId=search]');
            		var licDomainListStore=licDomainListTab.down('panel[itemId=grid]').getStore();
                    var params = {cloudUuid:name};
                    Ext.apply(licDomainListStore.proxy.extraParams, params);
            		
                    treeFn.load(Ext.getCmp(containerId).down('tabpanel').getActiveTab());
                    
        			licCardPanel.setSize(size.width,size.height);
        			licCardPanel.setVisible(true);
        		}
        		
        		if(eType.toUpperCase()=='FSYSTEM'){
        			var containerId='licSrvFSystemPanel';
        			var licFSystemPanel=Ext.getCmp(containerId);
        			if(licFSystemPanel==undefined || licFSystemPanel==null){
        				licFSystemPanel=Ext.create('app.view.license.FLicSrvPanel',{
        					id:containerId,
        					childId:"licSrvInFSystemPanel"
        				});
        				licensePanel.add(licFSystemPanel);
        				licensePanel.doLayout();
        			}
        			licFSystemPanel.setVisible(true);
        		
        			var licSrvListTab=licFSystemPanel.down('panel');
        			var eastSearch=licSrvListTab.down('panel[itemId=search]');
        			var licSrvListTabStore=licSrvListTab.down('panel[itemId=grid]').getStore();
        			var params = {cloudUuid:parentNode.raw.tid};
        			Ext.apply(licSrvListTabStore.proxy.extraParams, params);
        			
        			licSrvListTabStore.load();
        			licFSystemPanel.setSize(size.width,size.height);
        			licFSystemPanel.setVisible(true);
        		}
        		
        		if(eType.toUpperCase()=='SYSTEM'){
        			var containerId='licSrvInfoPanel';
        			var licSrvInfoPanel=Ext.getCmp(containerId);
            		if(licSrvInfoPanel==undefined || licSrvInfoPanel==null){
            			licSrvInfoPanel=Ext.create('app.view.license.LicSrvPanel',{
            				id:containerId
            			});
            			licensePanel.add(licSrvInfoPanel);
            			licensePanel.doLayout();
            		}
            		licSrvInfoPanel.setVisible(true);
            		var formPanel=Ext.getCmp(containerId).down('form[itemId=form]');
            		formPanel.treeName=name;
            		formPanel.cloudName=parentNode.parentNode.raw.name;
            		var formStore=licSrvInfoPanel.store;
            		formStore.removeAll();
                    var params = {srvUuid:name};
                    Ext.apply(formStore.proxy.extraParams, params);
//            		formStore.load();
            		
            		var licSrvPaidListTab=Ext.getCmp('licSrvPaidListTab');
            		licSrvPaidListTab.forceRefresh=1;
            		
            		licSrvPaidListTab.usedDomainUuid=-1;
            		licSrvPaidListTab.usedSysUuid=name;
            		var eastSearch=licSrvPaidListTab.down('panel[itemId=search]');
            		var paidListGridStore=licSrvPaidListTab.down('panel[itemId=grid]').getStore();
                    var params = {usedSysUuid:name,usedDomainUuid:-1};
                    Ext.apply(paidListGridStore.proxy.extraParams, params);
            		
                    treeFn.load(Ext.getCmp(containerId).down('tabpanel').getActiveTab());
                    
            		licSrvInfoPanel.setSize(size.width,size.height);
            		licSrvInfoPanel.setVisible(true);
        		}
        		
        		if(eType.toUpperCase()=='FDOMAIN'){
        			var containerId='licDomainFDomainPanel';
        			var licFSystemPanel=Ext.getCmp(containerId);
        			if(licFSystemPanel==undefined || licFSystemPanel==null){
        				licFSystemPanel=Ext.create('app.view.license.FLicDomainPanel',{
        					id:containerId,
        					childId:"licDomainInFDomainPanel"
        				});
        				licensePanel.add(licFSystemPanel);
        				licensePanel.doLayout();
        			}
        			licFSystemPanel.setVisible(true);
        		
        			var licSrvListTab=licFSystemPanel.down('panel');
        			var eastSearch=licSrvListTab.down('panel[itemId=search]');
        			var licSrvListTabStore=licSrvListTab.down('panel[itemId=grid]').getStore();
        			var params = {cloudUuid:parentNode.raw.tid};
        			Ext.apply(licSrvListTabStore.proxy.extraParams, params);
        			
        			licSrvListTabStore.load();
        			licFSystemPanel.setSize(size.width,size.height);
        			licFSystemPanel.setVisible(true);
        		}

        		if(eType.toUpperCase()=='DOMAIN'){
        			var containerId='licDomainInfoPanel';
        			var licDomainInfoPanel=Ext.getCmp(containerId);
        			if(licDomainInfoPanel==undefined || licDomainInfoPanel==null){
        				licDomainInfoPanel=Ext.create('app.view.license.LicDomainPanel',{
        					id:containerId
        				});
        				licensePanel.add(licDomainInfoPanel);
        				licensePanel.doLayout();
        			}
        			licDomainInfoPanel.setVisible(true);
        			var formPanel=Ext.getCmp(containerId).down('form[itemId=form]');
        			formPanel.treeName=name;
        			
        			var formStore=licDomainInfoPanel.store;
        			formStore.removeAll();
        			var params = {domainUuid:name};
        			Ext.apply(formStore.proxy.extraParams, params);
//        			formStore.load();
        			
        			var licDomainPaidListTab=Ext.getCmp('licDomainPaidListTab');
        			licDomainPaidListTab.forceRefresh=1;
        			
        			licDomainPaidListTab.usedDomainUuid=name;
        			licDomainPaidListTab.usedSysUuid=-1;
        			
            		var eastSearch=licDomainPaidListTab.down('panel[itemId=search]');
        			var paidListGridStore=licDomainPaidListTab.down('panel[itemId=grid]').getStore();
        			var params = {usedDomainUuid:name,usedSysUuid:-1};
        			Ext.apply(paidListGridStore.proxy.extraParams, params);
        			
        			treeFn.load(Ext.getCmp(containerId).down('tabpanel').getActiveTab());
        			
        			licDomainInfoPanel.setSize(size.width,size.height);
        			licDomainInfoPanel.setVisible(true);
        		}
        		if(eType.toUpperCase()=='PAIDCARD'){
        			var containerId='licCardPanel';
        			var licCardPanel=Ext.getCmp(containerId);
        			if(licCardPanel==undefined || licCardPanel==null){
        				licCardPanel=Ext.create('app.view.license.LicCardPanel',{
        					id:containerId,
        					childId:"licAllPaidPanel"
        				});
        				licensePanel.add(licCardPanel);
        				licensePanel.doLayout();
        			}
        			licCardPanel.setVisible(true);
        			var licAllPaidListTab=licCardPanel.down('panel');
        			var eastSearch=licAllPaidListTab.down('panel[itemId=search]');
        			var paidListGridStore=licAllPaidListTab.down('panel[itemId=grid]').getStore();
        			var params = {usedDomainUuid:name,usedSysUuid:name};
        			Ext.apply(paidListGridStore.proxy.extraParams, params);
        			
        			paidListGridStore.load();
        			licCardPanel.setSize(size.width,size.height);
        			licCardPanel.setVisible(true);
        		}
        		
        		licensePanel.doLayout();
    		}
        }
});