Ext.define('app.view.provision.ProvisionTree',{
		extend:'Ext.tree.Panel',
		id:'provisionTree',
		requires: [
			        'app.store.provision.producttype.ProductTypeStore',
			        'app.store.provision.producttype.ProductTypeModel',
			       
			    ],
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
//		bodyStyle: 'background-color:#F5F5F5;',
        viewConfig : {
			loadMask : { msg:lanControll.getLanValue('maskMsg') }
		},
		initComponent: function(){
			this.store=Ext.create('app.store.provision.ProvisionStore',{});
			var s = this.store;
			s.on('load',function(store, node, records,successful,eOpts){
				lanControll.cbTreeRecords(s.getRootNode());
			})
			this.callParent(arguments);
		},
        //the 'columns' property is now 'headers'
        columns: [{
            xtype: 'treecolumn', //this is so we know which column will show the tree
            text: '',
            flex: 1,
            minWidth:275,
            sortable: true,
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
				Ext.getCmp("provisionTree").clearFilter();
			},
			emptyText:'search',
			flex:1,
			enableKeyEvents: true,
			listeners: {
				keyup: {
					fn: function (field, e) {
						if (Ext.EventObject.ALT == e.getKey()) {
							field.onTriggerClick();
						} else {
							if(this.getRawValue()!=""){
								this.triggerEl.elements[0].removeCls('x-form-search-trigger').addCls('x-form-clear-trigger');	
							}else{
								this.triggerEl.elements[0].removeCls('x-form-clear-trigger').addCls('x-form-search-trigger');
							}
							Ext.getCmp("provisionTree").filterByText(this.getRawValue());
						}
					}
				}
			}
        },'-',{
            text: '',
            iconCls:'refresh2',
            handler: function(){
        		var store=Ext.getCmp('provisionTree').getStore();
        		try{
        			store.load();
        		}catch(e){
        			store.load();
        		}
            }
        }],
		
        listeners:{
        	itemclick:function(view,record,item,index,e){
	        	var provisionPanel=Ext.getCmp('provisionPanel');
				var xy=provisionPanel.getPosition();
				var size=provisionPanel.getSize();
        		var eType= record.raw.eType;
        		var tid=record.raw.tid;
        		var name=record.raw.name;

        		for(var i=0; i<provisionPanel.items.items.length; i++){
        			provisionPanel.items.items[i].setVisible(false);
        		}
        		treeFn.record = record; 
        		var flag = privilege.procPrivilegeRead(record
        				,provisionPanel,name,record.parentNode,size,treeFn);
        		if(flag){
        			return;
        		}
        		if(eType.toUpperCase()=='PROVISION'){
        			var fProvisioinPanel=Ext.getCmp('fProvisioinPanel');
        			if(!fProvisioinPanel){
        				fProvisioinPanel=Ext.create('app.view.provision.FProvisionPanel',{
        					id:'fProvisioinPanel',
        					border:false,
        				});
        				provisionPanel.add(fProvisioinPanel);
        			}
        			var versionListInPP=Ext.getCmp('versionListInPP');
        			var versionListTab=versionListInPP.down('panel[itemId=grid]');
        			versionListTab.productId=-1;
        			var versionListStore=versionListTab.getStore();
    		        var params = { productId:-1,status:-1};
    		        Ext.apply(versionListStore.proxy.extraParams, params);
        			versionListStore.removeAll();
//        			versionListStore.load();
        			versionListTab.down("pagingtoolbar").moveFirst();
        			
        			fProvisioinPanel.setVisible(true);
        			fProvisioinPanel.setPagePosition(xy[0],xy[1]);
        			fProvisioinPanel.setSize(size.width,size.height);
        			
        		}
        		
        		if(eType.toUpperCase()=='PRODUCTTYPE'){
        			
            		var productTypePanel=Ext.getCmp('productTypePanel');

        			var productTypeTab=productTypePanel.down('form');
        			var productTypeStore= productTypeTab.store;//Ext.create('app.store.provision.producttype.ProductTypeStore',{});
//        			productTypeStore.on('beforeload', function (productTypeStore, options) {
    		        var params = { productTypeId:tid};
    		        Ext.apply(productTypeStore.proxy.extraParams, params);
//        		    });
        			
        			
        			productTypeStore.load();
        			
        			var versionListTab=Ext.getCmp('versionListInPT').down('panel[itemId=grid]');
        			versionListTab.productId=tid;
        			var versionListStore=versionListTab.getStore();
//        			versionListStore.on('beforeload', function (versionListStore, options) {
    		        var params = { productId:tid,status:-1};
    		        Ext.apply(versionListStore.proxy.extraParams, params);
//        		    });
        			versionListStore.removeAll();
//        			versionListStore.load()
        			versionListTab.down("pagingtoolbar").moveFirst();
        			
        			var tablPanel=productTypePanel.down('tabpanel');
        			tablPanel.setActiveTab(tablPanel.getComponent(1));
        			
        			productTypePanel.setVisible(true);
        			productTypePanel.setPagePosition(xy[0],xy[1]);
        			productTypePanel.setSize(size.width,size.height);
        			
        		}
        		
        		var versionPanel=Ext.getCmp('versionPanel');
        		
        		if(eType.toUpperCase()=='VERSION'){
        			if(!versionPanel){
            			versionPanel=Ext.create('app.view.provision.producttype.version.VersionPanel',{});
            			provisionPanel.items.add(versionPanel);
            		}
        			
        			var versionTab=Ext.getCmp('versionTab');
        			var versionStore=versionTab.store;
        			
       		        var params = { uuid:tid};
        			Ext.apply(versionStore.proxy.extraParams, params);
        			versionStore.load();
//        			versionTab.down("pagingtoolbar").moveFirst();
        			
        			versionPanel.setVisible(true);
        			versionPanel.setSize(size.width,size.height);
        			try{
        				versionPanel.setPagePosition(xy[0],xy[1]);
        			}catch(e){
        				versionPanel.setPagePosition(xy[0],xy[1]);
        			}
        		}
        		
    		}
        }
        
    });