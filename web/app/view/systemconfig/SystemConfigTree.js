Ext.define('app.view.systemconfig.SystemConfigTree',{
		extend:'Ext.tree.Panel',
		id:'systemConfigTree',
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
        	
			var s=Ext.create('app.store.systemconfig.SystemConfigStore',{});
			s.on('load',function(store, node, records,successful,eOpts){
				lanControll.cbTreeRecords(s.getRootNode());
			})
			this.store=s;
			this.callParent(arguments);
		},
        
//		bodyStyle: 'background-color:#F5F5F5;',
        // the 'columns' property is now 'headers'
        columns: [{
            xtype: 'treecolumn', // this is so we know which column will show
            text: '',
            flex: 1,
            minWidth:275,
            sortable: false,
            dataIndex: 'name',
        }],
        tbar:[{
            text: lanControll.getLanValue('expandAll'),
            handler: function(){
                Ext.getCmp('systemConfigTree').expandAll();
            }
        }, {
            text: lanControll.getLanValue('collapseAll'),
            handler: function(){
        		Ext.getCmp('systemConfigTree').collapseAll();
            }
        },'->',{
            text: '',
            iconCls:'refresh2',
            handler: function(){
        		var store=Ext.getCmp('systemConfigTree').getStore();
        		try{
        			store.load({params: {needRefresh:1},});
        		}catch(e){
        			store.load({params: {needRefresh:1},});
        		}
            }
        }],

        listeners:{
        	itemclick:function(view,record,item,index,e){
        		
        		var icon=record.raw.iconCls;
        		var parentNode=record.parentNode;
	        	var systemConfigPanel=Ext.getCmp('systemConfigPanel');
				var xy=systemConfigPanel.getPosition();
				var size=systemConfigPanel.getSize();
        		var eType= record.raw.eType;
        		var name=record.raw.tid;
        		
        		var simCloudPanel=Ext.getCmp('systemConfigSimCloudPanel');
        		simCloudPanel.setVisible(false);
        		
        		var alarmDescInfoPanel=Ext.getCmp('alarmDescInfoPanel');
        		if(alarmDescInfoPanel!=undefined && alarmDescInfoPanel!=null){
        			alarmDescInfoPanel.setVisible(false);
    			}
        		var alarmDomainDescInfoPanel=Ext.getCmp('alarmDomainDescInfoPanel');
        		if(alarmDomainDescInfoPanel!=undefined && alarmDomainDescInfoPanel!=null){
        			alarmDomainDescInfoPanel.setVisible(false);
        		}
        		var objectTypeInfoPanel=Ext.getCmp('objectTypeInfoPanel');
        		if(objectTypeInfoPanel!=undefined && objectTypeInfoPanel!=null){
        			objectTypeInfoPanel.setVisible(false);
        		}
        		var causeInfoPanel=Ext.getCmp('causeInfoPanel');
        		if(causeInfoPanel!=undefined && causeInfoPanel!=null){
        			causeInfoPanel.setVisible(false);
        		}
        		var enumDefInfoPanel=Ext.getCmp('enumDefInfoPanel');
        		if(enumDefInfoPanel!=undefined && enumDefInfoPanel!=null){
        			enumDefInfoPanel.setVisible(false);
        		}
        		
        		treeFn.record = record; 
        		var flag = privilege.procPrivilegeRead(record
        				,systemConfigPanel,name,record.parentNode,size,treeFn);
        		if(flag){
        			return;
        		}
        		if(eType.toUpperCase()=='ALARMDESC'){
        			if(alarmDescInfoPanel==undefined|| alarmDescInfoPanel==null){
        				alarmDescInfoPanel=Ext.create('app.view.systemconfig.AlarmDescInfoPanel',{
        					id:'alarmDescInfoPanel'
        				});
        				systemConfigPanel.add(alarmDescInfoPanel);
        				systemConfigPanel.doLayout();
        			}
        			alarmDescInfoPanel.setVisible(true); 
        			var alarmDescListGrid=Ext.getCmp('alarmDescListGrid').down('panel').down('panel');
        			alarmDescListGridStore=alarmDescListGrid.store;
        		    if(alarmDescListGridStore.beforeload_fn != undefined){
        		    	alarmDescListGridStore.removeListener('beforeload',alarmDescListGridStore.beforeload_fn);
        		    }
        		    var beforeload_fn = function (alarmDescListGridStore, options) {
        		        var params = {};
        		        Ext.apply(alarmDescListGridStore.proxy.extraParams, params);
        		    }
        		    alarmDescListGridStore.beforeload_fn = beforeload_fn;
        		    alarmDescListGridStore.on('beforeload', beforeload_fn);
        		    alarmDescListGrid.down("pagingtoolbar").moveFirst();

        		    alarmDescInfoPanel.setSize(size.width,size.height);
        		    alarmDescInfoPanel.setVisible(true);
        			
        		}
        		if(eType.toUpperCase()=='ALARMDOMAINDESC'){
        			if(alarmDomainDescInfoPanel==undefined|| alarmDomainDescInfoPanel==null){
        				alarmDomainDescInfoPanel=Ext.create('app.view.systemconfig.AlarmDomainDescInfoPanel',{
        					id:'alarmDomainDescInfoPanel'
        				});
        				systemConfigPanel.add(alarmDomainDescInfoPanel);
        				systemConfigPanel.doLayout();
        			}
        			alarmDomainDescInfoPanel.setVisible(true); 
        			var alarmDescListGrid=Ext.getCmp('alarmDomainDescListGrid').down('panel').down('panel');
        			alarmDescListGridStore=alarmDescListGrid.store;
        			if(alarmDescListGridStore.beforeload_fn != undefined){
        				alarmDescListGridStore.removeListener('beforeload',alarmDescListGridStore.beforeload_fn);
        			}
        			var beforeload_fn = function (alarmDescListGridStore, options) {
        				var params = {};
        				Ext.apply(alarmDescListGridStore.proxy.extraParams, params);
        			}
        			alarmDescListGridStore.beforeload_fn = beforeload_fn;
        			alarmDescListGridStore.on('beforeload', beforeload_fn);
        			alarmDescListGrid.down("pagingtoolbar").moveFirst();
        			
        			alarmDomainDescInfoPanel.setSize(size.width,size.height);
        			alarmDomainDescInfoPanel.setVisible(true);
        			
        		}
        		if(eType.toUpperCase()=='OBJECTTYPE'){
        			if(objectTypeInfoPanel==undefined|| objectTypeInfoPanel==null){
        				objectTypeInfoPanel=Ext.create('app.view.systemconfig.ObjectTypeInfoPanel',{
        					id:'objectTypeInfoPanel'
        				});
        				systemConfigPanel.add(objectTypeInfoPanel);
        				systemConfigPanel.doLayout();
        			}
        			objectTypeInfoPanel.setVisible(true); 
        			var objectTypeListGrid=Ext.getCmp('objectTypeListGrid').down('panel').down('panel');
        			objectTypeListGridStore=objectTypeListGrid.store;
        			if(objectTypeListGridStore.beforeload_fn != undefined){
        				objectTypeListGridStore.removeListener('beforeload',objectTypeListGridStore.beforeload_fn);
        			}
        			var beforeload_fn = function (objectTypeListGridStore, options) {
        				var params = {};
        				Ext.apply(objectTypeListGridStore.proxy.extraParams, params);
        			}
        			objectTypeListGridStore.beforeload_fn = beforeload_fn;
        			objectTypeListGridStore.on('beforeload', beforeload_fn);
        			objectTypeListGrid.down("pagingtoolbar").moveFirst();
        			
        			objectTypeInfoPanel.setSize(size.width,size.height);
        			objectTypeInfoPanel.setVisible(true);
        			
        		}
        		if(eType.toUpperCase()=='CAUSE'){
        			if(causeInfoPanel==undefined|| causeInfoPanel==null){
        				causeInfoPanel=Ext.create('app.view.systemconfig.CauseDescInfoPanel',{
        					id:'causeInfoPanel'
        				});
        				systemConfigPanel.add(causeInfoPanel);
        				systemConfigPanel.doLayout();
        			}
        			causeInfoPanel.setVisible(true); 
        			var causeDescListGrid=Ext.getCmp('causeDescListGrid').down('panel').down('panel')
        			causeDescListGridStore=causeDescListGrid.store;
        			if(causeDescListGridStore.beforeload_fn != undefined){
        				causeDescListGridStore.removeListener('beforeload',causeDescListGridStore.beforeload_fn);
        			}
        			var beforeload_fn = function (causeDescListGridStore, options) {
        				var params = {};
        				Ext.apply(causeDescListGridStore.proxy.extraParams, params);
        			}
        			causeDescListGridStore.beforeload_fn = beforeload_fn;
        			causeDescListGridStore.on('beforeload', beforeload_fn);
        			causeDescListGrid.down("pagingtoolbar").moveFirst();
        			
        			causeInfoPanel.setSize(size.width,size.height);
        			causeInfoPanel.setVisible(true);
        			
        		}
        		if(eType.toUpperCase()=='ENUMDEF'){
        			if(enumDefInfoPanel==undefined|| enumDefInfoPanel==null){
        				enumDefInfoPanel=Ext.create('app.view.systemconfig.EnumDefInfoPanel',{
        					id:'enumDefInfoPanel'
        				});
        				systemConfigPanel.add(enumDefInfoPanel);
        				systemConfigPanel.doLayout();
        			}
        			enumDefInfoPanel.setVisible(true); 
        			var enumDefTypeGrid=Ext.getCmp('enumDefTypeGrid').down('panel').down('panel');
        			Ext.getCmp('enumDefTypeGrid').forceRefresh=1;
        			enumDefTypeGridStore=enumDefTypeGrid.store;
        			if(enumDefTypeGridStore.beforeload_fn != undefined){
        				enumDefTypeGridStore.removeListener('beforeload',enumDefTypeGridStore.beforeload_fn);
        			}
        			var beforeload_fn = function (enumDefTypeGridStore, options) {
        				var params = {};
        				Ext.apply(enumDefTypeGridStore.proxy.extraParams, params);
        			}
        			enumDefTypeGridStore.beforeload_fn = beforeload_fn;
        			enumDefTypeGridStore.on('beforeload', beforeload_fn);
        			
        			var enumDefListGrid=Ext.getCmp('enumDefListGrid').down('panel').down('panel');
        			Ext.getCmp('enumDefListGrid').forceRefresh=1;
        			enumDefListGridStore=enumDefListGrid.store;
        			if(enumDefListGridStore.beforeload_fn != undefined){
        				enumDefListGridStore.removeListener('beforeload',enumDefListGridStore.beforeload_fn);
        			}
        			var beforeload_fn = function (enumDefListGridStore, options) {
        				var params = {};
        				Ext.apply(enumDefListGridStore.proxy.extraParams, params);
        			}
        			enumDefListGridStore.beforeload_fn = beforeload_fn;
        			enumDefListGridStore.on('beforeload', beforeload_fn);
//        			enumDefListGrid.down("pagingtoolbar").moveFirst();
        			
        			enumDefInfoPanel.setSize(size.width,size.height);
        			enumDefInfoPanel.setVisible(true);
        			
        		}
        		
        		systemConfigPanel.doLayout();
    		}
        }
//       
//		{
//            "children": [],
//            "defaultFlag": 0,
//            "eType": "alarmdomaindesc",
//            "expanded": true,
//            "iconCls": "table",
//            "leaf": true,
//            "name": "tbl_alarm_domain_desc",
//            "nid": "alarmdomaindesc_1",
//            "runStatus": 0,
//            "tid": 1
//        }, 
});