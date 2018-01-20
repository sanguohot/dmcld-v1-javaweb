Ext.define('app.view.privilege.PrivilegeTree',{
		extend:'Ext.tree.Panel',
		id:'privilegeTree',
	    layout:'fit',
	    openLink:'', //record module open-source
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
		lines:false,
//		bodyStyle: 'background-color:#F5F5F5;',
		viewConfig: {
			loadMask:{
				msg:lanControll.getLanValue('maskMsg')
			}
  		},
//		viewConfig: {
//            plugins: {
//                ptype: 'treeviewdragdrop'
//            }
//        },

        initComponent: function(){
        	
			var s=Ext.create('app.store.privilege.PrivilegeStore',{});
			s.on('load',function(store, node, records,successful,eOpts){
				lanControll.cbTreeRecords(s.getRootNode());
			})
			s.load({params: {needRefresh:1,module:9}});
			this.store=s;
			this.callParent(arguments);
		},
        
			
        // the 'columns' property is now 'headers'
        columns: [{
            xtype: 'treecolumn', // this is so we know which column will show
            text: '',
            flex: 1,
            minWidth:275,
            sortable: false,
            dataIndex: 'name'
        }],
        mixins: {
            treeFilter: 'app.util.TreeFilter'
        },
        tbar:[{
			xtype: 'trigger',
			triggerCls: 'x-form-search-trigger',
			onTriggerClick: function () {
				this.setValue('');
				treeFn.triggerValue='';
				this.triggerEl.elements[0].removeCls('x-form-clear-trigger').addCls('x-form-search-trigger');
				Ext.getCmp("privilegeTree").clearFilter();
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
							treeFn.triggerValue=this.getRawValue();
							Ext.getCmp("privilegeTree").filterByText(this.getRawValue());
						}
					}
				},
				change:function(field, newValue,oldValue,eOpts ){
					if(this.getRawValue()!=""){
						this.triggerEl.elements[0].removeCls('x-form-search-trigger').addCls('x-form-clear-trigger');	
					}else{
						this.triggerEl.elements[0].removeCls('x-form-clear-trigger').addCls('x-form-search-trigger');
					}
					treeFn.triggerValue=this.getRawValue();
					Ext.getCmp("privilegeTree").filterByText(this.getRawValue());
				}
			}
        },'-',{
//            text: 'Expand All',
//            handler: function(){
//                Ext.getCmp('privilegeTree').expandAll();
//            }
//        }, {
//            text: 'Collapse All',
//            handler: function(){
//        		Ext.getCmp('privilegeTree').collapseAll();
//            }
//        },{
            text: '',
            iconCls:'refresh2',
            handler: function(){
        		var store=Ext.getCmp('privilegeTree').getStore();
				Ext.getCmp('privilegeTree').down('treeview').loadMask.setDisabled(false);
        		try{
        			store.load({params: {needRefresh:1,module:9},});
        		}catch(e){
        			store.load({params: {needRefresh:1,module:9},});
        		}
            }
        }],

        listeners:{
			load:function(store, node, records,successful,eOpts ){
				if(node.childNodes[0]!=null&&node.childNodes[0].raw.eType=='fcloud'){
					var cns=node.childNodes[0].childNodes;
					for(var i=0;i<cns.length;i++){
						if(cns[i].raw.eType=='cloud'){
							var showNode=ip.readDB('maint_s_n',cns[i].raw.tid,'show');
							if(showNode==1){
								cns[i].expand(false);
							}
						}
					}
				}
				Ext.getCmp('privilegeTree').setLoading(false);
			},
			itemexpand:function(node,eOpts ){
				if(node.raw.eType=='cloud'){
					ip.insertDB('maint_s_n',node.raw.tid,'show',1);
				}
			},
			itemcollapse:function(node,eOpts ){
				if(node.raw.eType=='cloud'){
					ip.insertDB('maint_s_n',node.raw.tid,'show',0);
				}
			},
        	itemclick:function(view,record,item,index,e){
        		
        		var icon=record.raw.iconCls;
        		var parentNode=record.parentNode;
	        	var privilegePanel=Ext.getCmp('privilegePanel');
				var xy=privilegePanel.getPosition();
				var size=privilegePanel.getSize();
        		var eType= record.raw.eType;
        		var name=record.raw.tid;
        		
     
        		for(var i=0; i<privilegePanel.items.items.length; i++){
        			privilegePanel.items.items[i].setVisible(false);
        		}
        		//取消级联操作
//        		treeFn.openLink=this.openLink;
        		treeFn.record = record;
        		var containerId = eType+"PrivilegeTabPanel";
//        		operationPanel.doLayout();
//        		if(eType.toUpperCase()=='FCLOUD'){
//        			containerId='fcloudGridContainer';
//        		}
        		if(eType.toUpperCase()!='FCLOUD' && eType.toUpperCase()!='CLOUD' &&
        			eType.toUpperCase()!='USER' && eType.toUpperCase()!='UDOMAIN'){
					var noDateToShow1 = Ext.getCmp('noDateToShow1');
					if(!noDateToShow1){
						noDateToShow1=Ext.create('app.view.monitor.NoDateToShow', {id:'noDateToShow2'});
						privilegePanel.add(noDateToShow1);
						privilegePanel.doLayout();
					}
					noDateToShow1.setVisible(true);
		            noDateToShow1.setSize(size.width,size.height);
		            noDateToShow1.setVisible(true);
				}
        		if(eType.toUpperCase()=='FCLOUD'){
        			var cloudUuid = -99;
        			var roleId = 0;
        			var domainUuid = 0;
        			this.procItemClick(cloudUuid,domainUuid,roleId,containerId,privilegePanel,eType,xy,size,record);
        		}
        		if(eType.toUpperCase()=='CLOUD'){
        			var cloudUuid = name;
        			var roleId = 0;
        			var domainUuid = 0;
        			this.procItemClick(cloudUuid,domainUuid,roleId,containerId,privilegePanel,eType,xy,size,record);
        		}
        		if(eType.toUpperCase()=='UDOMAIN'){
        			var cloudUuid = -99;
        			var roleId = roleType.getDomainAdmin();
        			var domainUuid = name;
        			this.procItemClick(cloudUuid,domainUuid,roleId,containerId,privilegePanel,eType,xy,size,record);
        		}
        		if(eType.toUpperCase()=='USER'){
        			var userPanel=Ext.getCmp(containerId);
        			if(userPanel==null || userPanel==undefined){
        				userPanel=Ext.create('app.view.operation.user.UserPanel',{
        					id:containerId
        				});
        				privilegePanel.add(userPanel);
        				privilegePanel.doLayout();
        			}
        			userPanel.setVisible(true);		
        			var userTab=userPanel.down('form');
        			var userInfoStore=userTab.store;
        	        var params = { uuid:name};
        	        Ext.apply(userInfoStore.proxy.extraParams, params);		
        	        userInfoStore.load();

        			userPanel.setSize(size.width,size.height);
        			userPanel.setVisible(true);        		
        		}
        		
    		}
        },
        procItemClick:function(cloudUuid,domainUuid,roleId,containerId,rightPanel,eType,xy,size,record){
        	var licCardPanel=Ext.getCmp(containerId);        	
			if(licCardPanel==undefined || licCardPanel==null){
				var node="super";				
				if(domainUuid > 0){
					node = "domain";
				}
				licCardPanel=Ext.create('app.view.privilege.PrivilegeTabPanel',{
					id:containerId,
					node:node,
					roleId:roleId
				});
				rightPanel.add(licCardPanel);
				rightPanel.doLayout();
			}
			licCardPanel.setVisible(true);
			var userGrid = licCardPanel.down('panel[itemId=userGrid]');			
			if(userGrid){
				userGrid.domainUuid = domainUuid;
				var store = userGrid.store;
				console.log(store.proxy.extraParams)
	            var params = {sysUuid:0,cloudUuid:cloudUuid,domainUuid:domainUuid,domainName:"",userName:""
	            		,roleId:roleId,roleId1:0,email:"",phone:""};
	            Ext.apply(store.proxy.extraParams, params);	            
	            var form = userGrid.up('panel').up('panel').down('form');
	            var search = form.up('panel').collapse();
	            form.getForm().reset();
	            
				var sysStore = form.sysStore;
				if(sysStore){
		            var params = {cloudUuid:cloudUuid,types:'server'};
		            Ext.apply(sysStore.proxy.extraParams, params);
		            sysStore.load();
				}				
			}
			var roleGrid = licCardPanel.down('panel[itemId=roleGrid]');			
			if(roleGrid){
				var store = roleGrid.store;
	            var params = {domainUuid:domainUuid
	            		,roleId:roleId};
//	            console.log(roleGrid.roleId)
	            Ext.apply(store.proxy.extraParams, params);
			}
			
			var mailGrid = licCardPanel.down('panel[itemId=mailGrid]');			
			if(mailGrid){
				var store = mailGrid.store;
	            var params = {domainUuid:domainUuid};
	            Ext.apply(store.proxy.extraParams, params);
			}
			
			this.procCookie(containerId);
            this.beforeload(licCardPanel);
            treeFn.load(licCardPanel.getActiveTab());
            
            licCardPanel.setVisible(true);
			licCardPanel.setSize(size.width,size.height);
			licCardPanel.setVisible(true);
        },
        procCookie:function(containerId){
        	var licCardPanel=Ext.getCmp(containerId);
        	if(licCardPanel){
        		var c = getCookie("priActiveTab");
        		if(c==null || c==undefined){
        			return;
        		}
        		var length = licCardPanel.items.items.length;
        		c = parseInt(c);
        		if(c+1 > length){
        			return;
        		}
        		licCardPanel.setActiveTab(c);
        	}
        },
    	beforeload:function(tabPanel){
    		if(tabPanel){
    			for(var i=0; i<tabPanel.items.items.length; i++){
    				var tab = tabPanel.getComponent(i);
    				treeFn.setLoadFlag(tab);
    			}
    		}
    	},
//       
        
});