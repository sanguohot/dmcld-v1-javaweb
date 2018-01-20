Ext.define('app.view.log.LogTree',{
		extend:'Ext.tree.Panel',
		id:'logTree',
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
        	
			var s=Ext.create('app.store.log.LogModuleStore',{});
			s.on('load',function(store, node, records,successful,eOpts){
				lanControll.cbTreeRecords(s.getRootNode());
			})
			s.load({params: {needRefresh:1,module:6}});
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
				treeFn.triggerValue='';
				this.triggerEl.elements[0].removeCls('x-form-clear-trigger').addCls('x-form-search-trigger');
				Ext.getCmp("logTree").clearFilter();
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
							Ext.getCmp("logTree").filterByText(this.getRawValue());
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
					Ext.getCmp("logTree").filterByText(this.getRawValue());
				}
			}
        },'-',{
//            text: 'Expand All',
//            handler: function(){
//                Ext.getCmp('logTree').expandAll();
//            }
//        }, {
//            text: 'Collapse All',
//            handler: function(){
//        		Ext.getCmp('logTree').collapseAll();
//            }
//        },{
            text: '',
            iconCls:'refresh2',
            handler: function(){
        		var store=Ext.getCmp('logTree').getStore();
				Ext.getCmp('logTree').down('treeview').loadMask.setDisabled(false);
        		try{
        			store.load({params: {needRefresh:1,module:6},});
        		}catch(e){
        			store.load({params: {needRefresh:1,module:6},});
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
				Ext.getCmp('logTree').setLoading(false);
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
	        	var logPanel=Ext.getCmp('logPanel');
				var xy=logPanel.getPosition();
				var size=logPanel.getSize();
        		var eType= record.raw.eType;
        		var name=record.raw.tid;
        		
        		
//    			
//    			var cmp = Ext.getCmp('idTabDisableCfg');
//    			if(cmp==undefined || cmp==null){
//    				cmp=Ext.create('app.view.maintenance.lib.TabDisableCfg',{});
//    			} 
        		for(var i=0; i<logPanel.items.items.length; i++){
        			logPanel.items.items[i].setVisible(false);
        		}
        		treeFn.openLink=this.openLink;
        		treeFn.record = record;
        		var containerId = eType+"GridContainer";
//        		operationPanel.doLayout();
//        		if(eType.toUpperCase()=='FCLOUD'){
//        			containerId='fcloudGridContainer';
//        		}
        		if(eType=='fcloud' || eType=='system' || eType=='domain'
        				|| eType=='bk' || eType=='gw' || eType=='tg' || eType=='ag'){
        			this.procItemClick(containerId,logPanel,eType,xy,size,record);
				}else{
					var noDateToShow1 = Ext.getCmp('noDateToShow1');
					if(!noDateToShow1){
						noDateToShow1=Ext.create('app.view.monitor.NoDateToShow', {id:'noDateToShow1'});
						logPanel.add(noDateToShow1);
						logPanel.doLayout();
					}
					noDateToShow1.setVisible(true);
//					noDateToShow1.setPagePosition(xy[0],xy[1]);
		            noDateToShow1.setSize(size.width,size.height);
		            noDateToShow1.setVisible(true);
				}
    		}
        },
        procItemClick:function(containerId,rightPanel,eType,xy,size,record){
        	var licCardPanel=Ext.getCmp(containerId);
			if(licCardPanel==undefined || licCardPanel==null){
				licCardPanel=Ext.create('app.view.log.GridContainer',{
					id:containerId,
				});
				rightPanel.add(licCardPanel);
				rightPanel.doLayout();
			}
			licCardPanel.setVisible(true);
//			if(eType == 'domain'){
//				var domainDescGrid = licCardPanel.down('panel[itemId=domainDescGrid]');
//				if(domainDescGrid){
//					var store = domainDescGrid.store;
//		            var params = {alarmId:null,alarmName:"",alarmDesc:''
//		            	,domainUuid:record.raw.tid,alarmLevel:-1};
//		            Ext.apply(store.proxy.extraParams, params);
//		            var form = domainDescGrid.up('panel').up('panel').down('form');
//		            var search = form.up('panel').collapse();
//		            form.getForm().reset();
//				}
//			}
			var alarmCurGrid = licCardPanel.down('panel[itemId=alarmCurGrid]');
			if(alarmCurGrid){
				var store = alarmCurGrid.store;
				var objectTypes = alarmObject.getObjectTypes(eType);
				var objectIds = alarmObject.getObjectIds(eType,record);
				if(objectTypes == ""){
					objectIds = "";
				}
	            var params = {cleanFlag:0, alarmTypes:'1', cleanTimeB:null
	    				, cleanTimeE:null, recvTimeB:null, recvTimeE:null, reportTimeB:null, reportTimeE:null
	    				, alarmLevel:null, alarmName:null, causeName:null
	    				, objectIds:objectIds,objectTypes:objectTypes,objectDesc:null};
	            Ext.apply(store.proxy.extraParams, params);
	            var form = alarmCurGrid.up('panel').up('panel').down('form');
	            var search = form.up('panel').collapse();
	            form.getForm().reset();
			}
            
			var alarmHisGrid = licCardPanel.down('panel[itemId=alarmHisGrid]');
			if(alarmHisGrid){
				var store = alarmHisGrid.store;
				var objectTypes = alarmObject.getObjectTypes(eType);
				var objectIds = alarmObject.getObjectIds(eType,record);
				if(objectTypes == ""){
					objectIds = "";
				}
	            var params = {cleanFlag:null, alarmTypes:null, cleanTimeB:null
	    				, cleanTimeE:null, recvTimeB:null, recvTimeE:null, reportTimeB:null, reportTimeE:null
	    				, alarmLevel:null, alarmName:null, causeName:null
	    				, objectIds:objectIds,objectTypes:objectTypes,objectDesc:null};
	            Ext.apply(store.proxy.extraParams, params);
	            var form = alarmHisGrid.up('panel').up('panel').down('form');
	            var search = form.up('panel').collapse();
	            form.getForm().reset();
			}
			
            var runLogGrid = licCardPanel.down('panel[itemId=runLogGrid]');
            if(runLogGrid){
	            var store = runLogGrid.store;
	            var logType = alarmObject.getObjectType(eType);
	            var objectId = logObj.getObjectId(eType,record);
	            var domainUuid = logObj.getDomainUuid(eType,record);
	            var params = {objectType:logType,objectId:objectId,domainUuid:domainUuid,timeBegin:null, timeEnd:null, log:null
	    				, domainName:null};
	            Ext.apply(store.proxy.extraParams, params);
	            var form = runLogGrid.up('panel').up('panel').down('form');
	            var search = form.up('panel').collapse();
	            form.getForm().reset();
            }
            
            var logUserGrid = licCardPanel.down('panel[itemId=logUserGrid]');
            if(logUserGrid){
	            var store = logUserGrid.store;
	            var logType = logObj.getObjectType(eType);
	            var objectId = logObj.getObjectId(eType,record);
	            var domainUuid = logObj.getDomainUuid(eType,record);
	            var params = {objectType:logType,objectId:objectId,domainUuid:domainUuid,domainName:null, userName:null, timeBegin:null
	    				, timeEnd:null, ipAddr:null, objectName:null
	    				, operate:-1, execResult:-1};
	            Ext.apply(store.proxy.extraParams, params);
	            var form = logUserGrid.up('panel').up('panel').down('form');
	            var search = form.up('panel').collapse();
	            form.getForm().reset();
            }
    		this.procCookie(containerId);
            this.beforeload(licCardPanel);
            treeFn.load(licCardPanel.getActiveTab());
            
            licCardPanel.setVisible(true);
//            licCardPanel.setPagePosition(xy[0],xy[1]);
			licCardPanel.setSize(size.width,size.height);
			licCardPanel.setVisible(true);
        },
        procCookie:function(containerId){
        	var licCardPanel=Ext.getCmp(containerId);
        	if(licCardPanel){
        		var c = getCookie("logActiveTab");
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