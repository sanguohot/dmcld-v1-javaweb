Ext.define('app.view.monitor.MonitorTree',{
		extend:'Ext.tree.Panel',
		id:'monitorTree',
		layout:'fit',
       
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
		viewConfig : {
			loadMask : { msg:lanControll.getLanValue('maskMsg') }
		},
		initComponent: function(){
			var s=Ext.create('app.store.monitor.MonitorStore',{});
			s.on('load',function(store, node, records,successful,eOpts){
				lanControll.cbTreeRecords(s.getRootNode());
			})
			this.store=s;
			this.callParent(arguments);
		},
        columns: [{
            xtype: 'treecolumn', //this is so we know which column will show the tree
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
				Ext.getCmp("monitorTree").clearFilter();
			},
			flex:1,
			emptyText:'search',
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
							Ext.getCmp("monitorTree").filterByText(this.getRawValue());
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
					Ext.getCmp("maintenanceTree").filterByText(this.getRawValue());
				}
			}
        },'-',{
//            text: 'Expand All',
//            handler: function(){
//                Ext.getCmp('monitorTree').expandAll();
//            }
//        }, {
//            text: 'Collapse All',
//            handler: function(){
//        		Ext.getCmp('monitorTree').collapseAll();
//            }
//        },{
            text: '',
            iconCls:'refresh2',
            handler: function(){
        		var store=Ext.getCmp('monitorTree').getStore();
        		try{
        			store.load({params: {needRefresh:1},});
        		}catch(e){
        			store.load({params: {needRefresh:1},});
        		}
            }
        }],
        listeners:{
			load:function(store, node, records,successful,eOpts ){
				if(node.childNodes[0].raw.eType=='fcloud'){
					var cns=node.childNodes[0].childNodes;
					for(var i=0;i<cns.length;i++){
						if(cns[i].raw.eType=='cloud'){
							var showNode=ip.readDB('mt_s_n',cns[i].raw.tid,'show');
							if(showNode==1){
								cns[i].expand(false);
							}
						}
					}
				}
				
			},
			itemexpand:function(node,eOpts ){
				if(node.raw.eType=='cloud'){
					ip.insertDB('mt_s_n',node.raw.tid,'show',1);
				}
			},
			itemcollapse:function(node,eOpts ){
				if(node.raw.eType=='cloud'){
					ip.insertDB('mt_s_n',node.raw.tid,'show',0);
				}
			},
        	itemclick:function(view,record,item,index,e){
        		
        		var icon=record.raw.iconCls;
        		var parentNode=record.parentNode;

	        	var monitorPanel=Ext.getCmp('monitorPanel');
				var xy=monitorPanel.getPosition();
				var size=monitorPanel.getSize();
        		var eType= record.raw.eType;
        		var name=record.raw.tid;

        		for(var i=0; i<monitorPanel.items.items.length; i++){
        			monitorPanel.items.items[i].setVisible(false);
        		}

        		treeFn.record = record; 
        		var flag = privilege.procPrivilegeRead(record
        				,monitorPanel,name,parentNode,size,treeFn);
        		if(flag){
        			return;
        		}
        		if(eType.toUpperCase()=='FSYSTEM'){
        			var params;
        			var fSysMonitorPanel=Ext.getCmp('fSysMonitorPanel');
        			if(!fSysMonitorPanel){
        				fSysMonitorPanel = Ext.create('app.view.monitor.system.FSysMonitorPanel', {});
        				monitorPanel.add(fSysMonitorPanel);
        				monitorPanel.doLayout();
        			}
        			fSysMonitorPanel.setVisible(true);
           			var ids="";
        			for(var i=0;i<record.childNodes.length;i++){
        				ids += (record.childNodes)[i].raw.tid;
        				if(i+1<record.childNodes.length){
        					ids += ",";
        				}
        			}
        			
        			var sysCurGrid=Ext.getCmp('fSysCurGrid');
        			sysCurGrid.treeName=ids;
        			var sysCurGridStore = sysCurGrid.getStore();
    				params = { sysUuids:ids};
    				Ext.apply(sysCurGridStore.proxy.extraParams, params);
        			
        			var pagingtoolbar = fSysMonitorPanel.down('panel').getActiveTab().down('pagingtoolbar');
        			pagingtoolbar.moveFirst();
        			
        			fSysMonitorPanel.setSize(size.width,size.height);
        			fSysMonitorPanel.setVisible(true);
        		}
        		if(eType.toUpperCase()=='SYSTEM'){
        			var params;
        			var sysMonitorPanel=Ext.getCmp('sysMonitorPanel');
        			if(!sysMonitorPanel){
        				sysMonitorPanel = Ext.create('app.view.monitor.system.SysMonitorPanel', {});
        				monitorPanel.add(sysMonitorPanel);
        				monitorPanel.doLayout();
        			}
        			sysMonitorPanel.setVisible(true);
        			var activateTab=sysMonitorPanel.down('panel').getActiveTab();
        			
        			var cmp = Ext.getCmp('sys15Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {sysUuid:name,limit:-1});
        			
        			var cmp = Ext.getCmp('sys24Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {sysUuid:name,limit:-1});
        			
        			var sys15Grid=Ext.getCmp('sys15Grid');
        			sys15Grid.treeName=name;
        			
        			var sys24Grid=Ext.getCmp('sys24Grid');
        			sys24Grid.treeName=name;
        			
        			var sysCurGrid=Ext.getCmp('sysCurGrid');
        			sysCurGrid.treeName=name;
        			
        			var sys15GridStore=sys15Grid.getStore();
    				var params = { sysUuid:name};
    				Ext.apply(sys15GridStore.proxy.extraParams, params);
        			
        			var sys24GridStore=sys24Grid.getStore();        			
    				var params = { sysUuid:name};
    				Ext.apply(sys24GridStore.proxy.extraParams, params);
        			
        			var sysCurGridStore=sysCurGrid.getStore();
    				params = { sysUuids:name};
    				Ext.apply(sysCurGridStore.proxy.extraParams, params);

        			this.run(monitorPanel,'sysMonitorPanel');
        			
        			sysMonitorPanel.setSize(size.width,size.height);
        			sysMonitorPanel.setVisible(true);
        		}
        		if(eType.toUpperCase()=='FDOMAIN'){
        			var params;
        			var fDomainMonitorPanel=Ext.getCmp('fDomainMonitorPanel');
        			if(!fDomainMonitorPanel){
        				fDomainMonitorPanel = Ext.create('app.view.monitor.domain.FDomainMonitorPanel', {});
        				monitorPanel.add(fDomainMonitorPanel);
        				monitorPanel.doLayout();
        			}
        			fDomainMonitorPanel.setVisible(true);
        			var ids="";
        			for(var i=0;i<record.childNodes.length;i++){
        				ids += (record.childNodes)[i].raw.tid;
        				if(i+1<record.childNodes.length){
        					ids += ",";
        				}
        			}
        			
        			var fDomainCurGrid=Ext.getCmp('fDomainCurGrid');
        			fDomainCurGrid.treeName=ids;
        			fDomainCurGridStore = fDomainCurGrid.getStore();
        			params = { domainUuids:ids};
    				Ext.apply(fDomainCurGridStore.proxy.extraParams, params);
        			
    				var domainNeListStore = Ext.getCmp("fDomainNeLayout").down("panel[itemId=grid]").store;
        			Ext.apply(domainNeListStore.proxy.extraParams
        					, {cloudUuid:parentNode.raw.tid,domainUuid:0,domainName:'',neAlias:''});
        			
        			this.run(monitorPanel,'fDomainMonitorPanel');
        			
        			fDomainMonitorPanel.setSize(size.width,size.height);
        			fDomainMonitorPanel.setVisible(true);
        		
        		}
        		if(eType.toUpperCase()=='DOMAIN'){
        			var domainMonitorPanel = Ext.getCmp('domainMonitorPanel');
        			if(!domainMonitorPanel){
        				domainMonitorPanel = Ext.create('app.view.monitor.domain.DomainMonitorPanel', {});
        				monitorPanel.add(domainMonitorPanel);
        				monitorPanel.doLayout();
        			}
        			domainMonitorPanel.setVisible(true);
        			var params;
        			var activateTab=domainMonitorPanel.down('panel').getActiveTab();
        			
        			var domainNeListStore = Ext.getCmp("domainNeLayout").down("panel[itemId=grid]").store;
        			Ext.apply(domainNeListStore.proxy.extraParams
        					, {domainUuid:name,domainName:'',neAlias:''});
        			
        			var cmp = Ext.getCmp('domain15Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {domainUuid:name,limit:-1});
        			
        			var cmp = Ext.getCmp('domain24Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {domainUuid:name,limit:-1});
        			
        			var domain15Grid=Ext.getCmp('domain15Grid');
        			domain15Grid.treeName=name;
        			
        			var domain24Grid=Ext.getCmp('domain24Grid');
        			domain24Grid.treeName=name;
        			
        			var domainCurGrid=Ext.getCmp('domainCurGrid');
        			domainCurGrid.treeName=name;

        			var domainCdrGrid=Ext.getCmp('domainCdrGrid');
        			domainCdrGrid.treeName=name;
        			
        			var domainSmsGrid=Ext.getCmp('domainSmsGrid');
        			domainSmsGrid.treeName=name;
        			
        			var domainUssdGrid=Ext.getCmp('domainUssdGrid');
        			domainUssdGrid.treeName=name;
        			
        			var domain15GridStore=domain15Grid.getStore();
    		        var params = { domainUuid:name};
    		        Ext.apply(domain15GridStore.proxy.extraParams, params);
        			
        			var domain24GridStore=domain24Grid.getStore();
    				var params = { domainUuid:name};
    				Ext.apply(domain24GridStore.proxy.extraParams, params);
        			
        			var domainCurGridStore=domainCurGrid.getStore();
        			params = { domainUuids:name};
    				Ext.apply(domainCurGridStore.proxy.extraParams, params);
        			
        			var domainCdrGridStore=domainCdrGrid.getStore();
    				var params = { domainUuid:name};
    				Ext.apply(domainCdrGridStore.proxy.extraParams, params);
        			
        			var domainSmsGridStore=domainSmsGrid.getStore();
    				var params = { domainUuid:name};
    				Ext.apply(domainSmsGridStore.proxy.extraParams, params);
        			
        			var domainUssdGridStore=domainUssdGrid.getStore();
    				var params = { domainUuid:name};
    				Ext.apply(domainUssdGridStore.proxy.extraParams, params);
        			
        			
        			this.run(monitorPanel,'domainMonitorPanel');
        			domainMonitorPanel.setSize(size.width,size.height);
        			domainMonitorPanel.setVisible(true);
        		}
        		
        		if(eType.toUpperCase()=='SITE'){
        			var siteMonitorPanel=Ext.getCmp('siteMonitorPanel');
        			if(!siteMonitorPanel){
        				siteMonitorPanel = Ext.create('app.view.monitor.domain.zone.SiteMonitorPanel', {});
        				monitorPanel.add(siteMonitorPanel);
        				monitorPanel.doLayout();
        			}
        			siteMonitorPanel.setVisible(true);
        			
        			var ids_tmp="";
        			var ids_tmp1="";
        			var ids_gw="";
        			var ids_ne="";
        			for(var i=0;i<record.childNodes.length;i++){
        				ids_tmp1 += (record.childNodes)[i].raw.tid;
        				ids_tmp1 += ",";
        				if((record.childNodes)[i].raw.eType.toUpperCase() == 'GW'){
        					ids_tmp += (record.childNodes)[i].raw.tid;
        					ids_tmp += ",";
        				}
        			}
        			if(ids_tmp != ""){
        				ids_gw = ids_tmp.substring(0,ids_tmp.length-1);
        			}
         			if(ids_tmp1 != ""){
        				ids_ne = ids_tmp1.substring(0,ids_tmp1.length-1);
        			}
         			
        			var gwCurGrid=Ext.getCmp('site_gwCurGrid');
        			gwCurGrid.treeName=ids_gw;
        			gwCurGrid.domainUuid=parentNode.parentNode.parentNode.raw.tid;
					var gwCurGridStore=gwCurGrid.getStore();
    				var params = { gwUuids:ids_gw,domainUuid:parentNode.parentNode.parentNode.raw.tid};
    				Ext.apply(gwCurGridStore.proxy.extraParams, params);
    				
        			var neCurGrid=Ext.getCmp('site_neCurGrid');
        			neCurGrid.treeName=ids_ne;
        			var neCurGridStore=neCurGrid.getStore();
        			Ext.apply(neCurGridStore.proxy.extraParams, { neUuids:ids_ne});
        			
    				this.run(monitorPanel,'siteMonitorPanel');
    				
        			siteMonitorPanel.setSize(size.width,size.height);
        			siteMonitorPanel.setVisible(true);
        		}
        		if(eType.toUpperCase()=='BK'){
        			var bkMonitorPanel=Ext.getCmp('bkMonitorPanel');
        			if(!bkMonitorPanel){
        				bkMonitorPanel = Ext.create('app.view.monitor.domain.zone.BkMonitorPanel', {});
        				monitorPanel.add(bkMonitorPanel);
        				monitorPanel.doLayout();
        			}
        			bkMonitorPanel.setVisible(true);
        			
        			var cmp = Ext.getCmp('bk_ne15Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {neUuids:name,limit:-1});
        			
        			var cmp = Ext.getCmp('bk_ne24Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {neUuids:name,limit:-1});
        			
        			var ne15Grid=Ext.getCmp('bk_ne15Grid');
        			ne15Grid.treeName=name;
        			
        			var ne24Grid=Ext.getCmp('bk_ne24Grid');
        			ne24Grid.treeName=name;
        			
        			var neCurGrid=Ext.getCmp('bk_neCurGrid');
        			neCurGrid.treeName=name;
        			
          			var simCurGrid=Ext.getCmp('bk_simCurGrid');
        			simCurGrid.treeName=name;
        			simCurGrid.domainUuid=parentNode.parentNode.parentNode.parentNode.raw.tid;
        			
           			var ne15GridStore=ne15Grid.getStore();
           			Ext.apply(ne15GridStore.proxy.extraParams, { neUuids:name});
 
        			var ne24GridStore=ne24Grid.getStore();
        			Ext.apply(ne24GridStore.proxy.extraParams, { neUuids:name});
        			
        			var neCurGridStore=neCurGrid.getStore();
        			Ext.apply(neCurGridStore.proxy.extraParams, { neUuids:name});
        			
    				var simCurGridStore=simCurGrid.getStore();
    				var params = { neUuid:name,domainUuid:parentNode.parentNode.parentNode.parentNode.raw.tid};
    				Ext.apply(simCurGridStore.proxy.extraParams, params);
        			
        			this.run(monitorPanel,'bkMonitorPanel');
        			
        			bkMonitorPanel.setSize(size.width,size.height);
        		}
           		if(eType.toUpperCase()=='AG'){
        			var bkMonitorPanel=Ext.getCmp('agMonitorPanel');
        			if(!bkMonitorPanel){
        				bkMonitorPanel = Ext.create('app.view.monitor.domain.zone.AgMonitorPanel', {});
        				monitorPanel.add(bkMonitorPanel);
        				monitorPanel.doLayout();
        			}
        			bkMonitorPanel.setVisible(true);
        			
        			var cmp = Ext.getCmp('ag_ne15Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {neUuids:name,limit:-1});
        			
        			var cmp = Ext.getCmp('ag_ne24Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {neUuids:name,limit:-1});
//        			
//        			var cmp = Ext.getCmp('ag_neCurPanel').down('panel[itemId=chart]');
//        			Ext.apply(cmp.originStore.proxy.extraParams
//					, {neUuids:name});
        			
        			var ne15Grid=Ext.getCmp('ag_ne15Grid');
        			ne15Grid.treeName=name;
        			
        			var ne24Grid=Ext.getCmp('ag_ne24Grid');
        			ne24Grid.treeName=name;
        			
        			var neCurGrid=Ext.getCmp('ag_neCurGrid');
        			neCurGrid.treeName=name;
        			
        			
           			var ne15GridStore=ne15Grid.getStore();
           			Ext.apply(ne15GridStore.proxy.extraParams, { neUuids:name});
 
        			var ne24GridStore=ne24Grid.getStore();
        			Ext.apply(ne24GridStore.proxy.extraParams, { neUuids:name});
        			
        			var neCurGridStore=neCurGrid.getStore();
        			Ext.apply(neCurGridStore.proxy.extraParams, { neUuids:name});
        			
        			this.run(monitorPanel,'agMonitorPanel');
        			
        			bkMonitorPanel.setSize(size.width,size.height);
        		}
        		if(eType.toUpperCase()=='TG'){
        			var bkMonitorPanel=Ext.getCmp('tgMonitorPanel');
        			if(!bkMonitorPanel){
        				bkMonitorPanel = Ext.create('app.view.monitor.domain.zone.TgMonitorPanel', {});
        				monitorPanel.add(bkMonitorPanel);
        				monitorPanel.doLayout();
        			}
        			bkMonitorPanel.setVisible(true);
        			
        			var cmp = Ext.getCmp('tg_ne15Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {neUuids:name,limit:-1});
        			
        			var cmp = Ext.getCmp('tg_ne24Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {neUuids:name,limit:-1});
        			
        			var cmp = Ext.getCmp('tg_neCurPanel').down('panel[itemId=chart]');
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {neUuids:name});
        			
        			var ne15Grid=Ext.getCmp('tg_ne15Grid');
        			ne15Grid.treeName=name;
        			
        			var ne24Grid=Ext.getCmp('tg_ne24Grid');
        			ne24Grid.treeName=name;
        			
        			var neCurGrid=Ext.getCmp('tg_neCurGrid');
        			neCurGrid.treeName=name;
        			
        			
           			var ne15GridStore=ne15Grid.getStore();
           			Ext.apply(ne15GridStore.proxy.extraParams, { neUuids:name});
 
        			var ne24GridStore=ne24Grid.getStore();
        			Ext.apply(ne24GridStore.proxy.extraParams, { neUuids:name});
        			
        			var neCurGridStore=neCurGrid.getStore();
        			Ext.apply(neCurGridStore.proxy.extraParams, { neUuids:name});
        			
        			this.run(monitorPanel,'tgMonitorPanel');
        			
        			bkMonitorPanel.setSize(size.width,size.height);
        		}
        		if(eType.toUpperCase()=='GW'){
        			var neMonitorPanel=Ext.getCmp('neMonitorPanel');
        			if(!neMonitorPanel){
        				neMonitorPanel = Ext.create('app.view.monitor.domain.zone.NeMonitorPanel', {});
        				monitorPanel.add(neMonitorPanel);
        				monitorPanel.doLayout();
        			}
        			neMonitorPanel.setVisible(true);
        			
        			var cmp = Ext.getCmp('gw_ne15Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {neUuids:name,limit:-1});
        			
        			var cmp = Ext.getCmp('gw_ne24Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {neUuids:name,limit:-1});
        			
        			var ne15Grid=Ext.getCmp('gw_ne15Grid');
        			ne15Grid.treeName=name;
        			
        			var ne24Grid=Ext.getCmp('gw_ne24Grid');
        			ne24Grid.treeName=name;
        			
        			var neCurGrid=Ext.getCmp('gw_neCurGrid');
        			neCurGrid.treeName=name;
        			
        			var gw15Grid=Ext.getCmp('gw15Grid');
        			gw15Grid.treeName=name;
        			
        			var gw24Grid=Ext.getCmp('gw24Grid');
        			gw24Grid.treeName=name;
        			
        			var gwCurGrid=Ext.getCmp('gwCurGrid');
        			gwCurGrid.treeName=name;
        			gwCurGrid.domainUuid=parentNode.parentNode.parentNode.raw.tid;

        			var gwCdrGrid=Ext.getCmp('gwCdrGrid');
        			gwCdrGrid.treeName=name;
        			
        			var gwSmsGrid=Ext.getCmp('gwSmsGrid');
        			gwSmsGrid.treeName=name;
        			var gwUssdGrid=Ext.getCmp('gwUssdGrid');
        			gwUssdGrid.treeName=name;
        			
        			var gwpCurGrid=Ext.getCmp('gw_gwpCurGrid');
        			var ids="";
        			for(var i=0;i<record.childNodes.length;i++){
        				ids += (record.childNodes)[i].raw.tid;
        				if(i+1<record.childNodes.length){
        					ids += ",";
        				}
        			}
        			gwpCurGrid.treeName=ids;
        			gwpCurGrid.domainUuid=parentNode.parentNode.parentNode.parentNode.parentNode.raw.tid;
        			
        			var ne15GridStore=ne15Grid.getStore();
        			Ext.apply(ne15GridStore.proxy.extraParams, { neUuids:name});
 
        			var ne24GridStore=ne24Grid.getStore();
        			Ext.apply(ne24GridStore.proxy.extraParams, { neUuids:name});
        			
        			var neCurGridStore=neCurGrid.getStore();
        			Ext.apply(neCurGridStore.proxy.extraParams, { neUuids:name});
        			
        			var gw15GridStore=gw15Grid.getStore();
    		        var params = { gwUuid:name};
    		        Ext.apply(gw15GridStore.proxy.extraParams, params);
   
        			var cmp = Ext.getCmp('gw15Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {gwUuid:name,limit:-1});
        			
        			var cmp = Ext.getCmp('gw24Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {gwUuid:name,limit:-1});
        			
        			var gw24GridStore=gw24Grid.getStore();
    				var params = { gwUuid:name};
    				Ext.apply(gw24GridStore.proxy.extraParams, params);
    				
        			var gwCurGridStore=gwCurGrid.getStore();
    				var params = { gwUuids:name,domainUuid:parentNode.parentNode.parentNode.parentNode.raw.tid};
    				Ext.apply(gwCurGridStore.proxy.extraParams, params);
        			
        			var gwCdrGridStore=gwCdrGrid.getStore();
    				var params = { gwUuid:name};
    				Ext.apply(gwCdrGridStore.proxy.extraParams, params);
        			
        			var gwSmsGridStore=gwSmsGrid.getStore();
        			gwSmsGridStore.on('beforeload', function (gwSmsGridStore, options) {
        				var params = { gwUuid:name};
        				Ext.apply(gwSmsGridStore.proxy.extraParams, params);
        			},this,{single :true});
        			
        			var gwUssdGridStore=gwUssdGrid.getStore();
    				var params = { gwUuid:name};
    				Ext.apply(gwUssdGridStore.proxy.extraParams, params);
        			
          			var gwpCurGridStore=gwpCurGrid.getStore();
    				var params = { gwpUuids:ids,domainUuid:parentNode.parentNode.parentNode.parentNode.raw.tid};
    				Ext.apply(gwpCurGridStore.proxy.extraParams, params);

        			this.run(monitorPanel,'neMonitorPanel');
        			
        			neMonitorPanel.setSize(size.width,size.height);
        			neMonitorPanel.setVisible(true);
        		}
        		
        		if(eType.toUpperCase()=='GWPORT'){
        			var gwpMonitorPanel=Ext.getCmp('nePortMonitorPanel');
        			if(!gwpMonitorPanel){
        				gwpMonitorPanel = Ext.create('app.view.monitor.domain.zone.port.NePortMonitorPanel', {});
        				monitorPanel.add(gwpMonitorPanel);
        				monitorPanel.doLayout();
        			}
        			gwpMonitorPanel.setVisible(true);
        			
        			var cmp = Ext.getCmp('gwp15Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {gwpUuid:name,limit:-1});
        			
        			var cmp = Ext.getCmp('gwp24Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {gwpUuid:name,limit:-1});
        			
        			var pmdGwpPanel=Ext.getCmp('pmdGwpPanel');
        			pmdGwpPanel.treeName=name;
        			
        			var gwp15Grid=Ext.getCmp('gwp15Grid');
        			gwp15Grid.treeName=name;
        			
        			var gwp24Grid=Ext.getCmp('gwp24Grid');
        			gwp24Grid.treeName=name;
        			
        			var gwpCurGrid=Ext.getCmp('gwpCurGrid');
        			gwpCurGrid.treeName=name;
        			gwpCurGrid.domainUuid=parentNode.parentNode.parentNode.parentNode.parentNode.raw.tid;
        			
        			var gwpCdrGrid=Ext.getCmp('gwpCdrGrid');
        			gwpCdrGrid.treeName=name;
        			
        			var gwpSmsGrid=Ext.getCmp('gwpSmsGrid');
        			gwpSmsGrid.treeName=name;
        			
        			var gwpUssdGrid=Ext.getCmp('gwpUssdGrid');
        			gwpUssdGrid.treeName=name;
 
        			var gwpStore=pmdGwpPanel.store;       			
    		        var params = { uuid:name};
    		        Ext.apply(gwpStore.proxy.extraParams, params);
        			
        			var gwp15GridStore=gwp15Grid.getStore();       			
    		        var params = { gwpUuid:name};
    		        Ext.apply(gwp15GridStore.proxy.extraParams, params);
        			
        			var gwp24GridStore=gwp24Grid.getStore();
    				var params = { gwpUuid:name};
    				Ext.apply(gwp24GridStore.proxy.extraParams, params);
        			
        			var gwpCurGridStore=gwpCurGrid.getStore();
    				var params = { gwpUuids:name,domainUuid:parentNode.parentNode.parentNode.parentNode.parentNode.raw.tid};
    				Ext.apply(gwpCurGridStore.proxy.extraParams, params);
        			
        			var gwpCdrGridStore=gwpCdrGrid.getStore();
    				var params = { gwpUuid:name};
    				Ext.apply(gwpCdrGridStore.proxy.extraParams, params);
        			
        			var gwpSmsGridStore=gwpSmsGrid.getStore();
    				var params = { gwpUuid:name};
    				Ext.apply(gwpSmsGridStore.proxy.extraParams, params);
        			
        			var gwpUssdGridStore=gwpUssdGrid.getStore();
    				var params = { gwpUuid:name};
    				Ext.apply(gwpUssdGridStore.proxy.extraParams, params);
        			
        			this.run(monitorPanel,'nePortMonitorPanel');
        			
        			gwpMonitorPanel.setSize(size.width,size.height);
        			gwpMonitorPanel.setVisible(true);
        		}

           		if(eType.toUpperCase()=='SIPPORT' || eType.toUpperCase()=='SS7PORT' || eType.toUpperCase()=='PRIPORT'
           			|| eType.toUpperCase()=='ETHPORT' || eType.toUpperCase()=='TGPORT' || eType.toUpperCase()=='DSPPORT'
           				|| eType.toUpperCase()=='LANPORT' || eType.toUpperCase()=='AGPORT'){
           			var peType = parentNode.parentNode.raw.eType;
           			var gwpMonitorPanel=Ext.getCmp(peType+'_'+eType+"_monitor");        			
        			if(!gwpMonitorPanel){
        				gwpMonitorPanel = Ext.create('app.view.monitor.domain.zone.port.TgMntMonitor', {
        					node:eType,
        					peType:peType,
        					id:peType+'_'+eType+"_monitor"
        				});
        				monitorPanel.add(gwpMonitorPanel);
        				monitorPanel.doLayout();
        			}
        			gwpMonitorPanel.setVisible(true);       			
        			Ext.apply(Ext.getCmp(peType+'_'+eType+"_grid"+"_15").store.proxy.extraParams
					, {portUuids:name});
        			Ext.apply(Ext.getCmp(peType+'_'+eType+"_grid"+"_24").store.proxy.extraParams
        					, {portUuids:name});
        			Ext.apply(Ext.getCmp(peType+'_'+eType+"_grid"+"_cur").store.proxy.extraParams
        					, {portUuids:name,domainUuid:parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.raw.tid});
        			
        			this.run(monitorPanel,peType+'_'+eType+"_monitor");
        			
        			gwpMonitorPanel.setSize(size.width,size.height);
        			gwpMonitorPanel.setVisible(true);
        		}

           		if(eType.toUpperCase()=='FSIP' || eType.toUpperCase()=='FSS7' || eType.toUpperCase()=='FPRI'
           			|| eType.toUpperCase()=='FETH' || eType.toUpperCase()=='FTGP' || eType.toUpperCase()=='FDSP'
           				|| eType.toUpperCase()=='FAGP' || eType.toUpperCase()=='FLAN'){
           			var peType = parentNode.raw.eType;
           			var gwpMonitorPanel=Ext.getCmp(peType+'_'+eType+"_monitor"); 			
        			if(!gwpMonitorPanel){
        				gwpMonitorPanel = Ext.create('app.view.monitor.domain.zone.port.TgMntMonitor', {
        					node:eType,
        					peType:peType,
        					id:peType+'_'+eType+"_monitor"
        				});
        				monitorPanel.add(gwpMonitorPanel);
        				monitorPanel.doLayout();
        			}
        			gwpMonitorPanel.setVisible(true);

        			var ids="";
        			for(var i=0;i<record.childNodes.length;i++){
        				ids += (record.childNodes)[i].raw.tid;
        				if(i+1<record.childNodes.length){
        					ids += ",";
        				}
        			}
    
        			Ext.apply(Ext.getCmp(peType+'_'+eType+"_grid"+"_cur").store.proxy.extraParams
        					, {portUuids:ids,domainUuid:parentNode.parentNode.parentNode.parentNode.parentNode.raw.tid});
        			
        			this.run(monitorPanel,peType+'_'+eType+"_monitor");
        			
        			gwpMonitorPanel.setSize(size.width,size.height);
        			gwpMonitorPanel.setVisible(true);
        		}
        		if(eType.toUpperCase()=='FGROUP'){
        			var params;
        			var fGroupMonitorPanel=Ext.getCmp('fGroupMonitorPanel');
        			if(!fGroupMonitorPanel){
        				fGroupMonitorPanel = Ext.create('app.view.monitor.group.FGroupMonitorPanel', {});
        				monitorPanel.add(fGroupMonitorPanel);
        				monitorPanel.doLayout();
        			}
        			fGroupMonitorPanel.setVisible(true);
        			var ids="";
        			for(var i=0;i<record.childNodes.length;i++){
        				ids += (record.childNodes)[i].raw.tid;
        				if(i+1<record.childNodes.length){
        					ids += ",";
        				}
        			}
        			
        			var groupCurGrid=Ext.getCmp('fGroupCurGrid');
        			groupCurGrid.treeName=ids;
        			groupCurGrid.domainUuid=parentNode.raw.tid;
        			groupCurGridStore = groupCurGrid.getStore();
    				params = { groupUuids:ids,domainUuid:parentNode.raw.tid};
    				Ext.apply(groupCurGridStore.proxy.extraParams, params);
        			
        			var pagingtoolbar = fGroupMonitorPanel.down('panel').getActiveTab().down('pagingtoolbar');
        			pagingtoolbar.moveFirst();
        			
        			fGroupMonitorPanel.setSize(size.width,size.height);
        			fGroupMonitorPanel.setVisible(true);
        		}
        		if(eType.toUpperCase()=='GROUP'){
        			var params;
        			var groupMonitorPanel=Ext.getCmp('groupMonitorPanel');
          			if(!groupMonitorPanel){
          				groupMonitorPanel = Ext.create('app.view.monitor.group.GroupMonitorPanel', {});
        				monitorPanel.add(groupMonitorPanel);
        				monitorPanel.doLayout();
        			}
        			groupMonitorPanel.setVisible(true);
        			
        			var cmp = Ext.getCmp('group15Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {groupUuid:name,limit:-1});
        			
        			var cmp = Ext.getCmp('group24Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {groupUuid:name,limit:-1});
        			
        			var group15Grid=Ext.getCmp('group15Grid');
        			group15Grid.treeName=name;
        			
        			var group24Grid=Ext.getCmp('group24Grid');
        			group24Grid.treeName=name;
        			
        			var groupCurGrid=Ext.getCmp('groupCurGrid');
        			groupCurGrid.treeName=name;
        			groupCurGrid.domainUuid=parentNode.parentNode.raw.tid;
        			var groupCdrGrid=Ext.getCmp('groupCdrGrid');
        			groupCdrGrid.treeName=name;
        		
        			var groupSmsGrid=Ext.getCmp('groupSmsGrid');
        			groupSmsGrid.treeName=name;
        			
        			var groupUssdGrid=Ext.getCmp('groupUssdGrid');
        			groupUssdGrid.treeName=name;

        			var simCurGrid=Ext.getCmp('grpSimCurGrid');
        			var ids="";
        			for(var i=0;i<record.childNodes.length;i++){
        				ids += (record.childNodes)[i].raw.tid;
        				if(i+1<record.childNodes.length){
        					ids += ",";
        				}
        			}
        			simCurGrid.treeName=ids;
        			simCurGrid.domainUuid=parentNode.parentNode.raw.tid;
        			
        			var group15GridStore=group15Grid.getStore();	
    		        var params = { groupUuid:name};
    		        Ext.apply(group15GridStore.proxy.extraParams, params);
        			
        			var group24GridStore=group24Grid.getStore();
    				var params = { groupUuid:name};
    				Ext.apply(group24GridStore.proxy.extraParams, params);
        			
        			var groupCurGridStore=groupCurGrid.getStore();
    				params = { groupUuids:name,domainUuid:parentNode.parentNode.raw.tid};
    				Ext.apply(groupCurGridStore.proxy.extraParams, params);
        			
        			var groupCdrGridStore=groupCdrGrid.getStore();
    				var params = { grpUuid:name};
    				Ext.apply(groupCdrGridStore.proxy.extraParams, params);
        			
        			var groupSmsGridStore=groupSmsGrid.getStore();
    				var params = { grpUuid:name};
    				Ext.apply(groupSmsGridStore.proxy.extraParams, params);
        			
        			var groupUssdGridStore=groupUssdGrid.getStore();
    				var params = { grpUuid:name};
    				Ext.apply(groupUssdGridStore.proxy.extraParams, params);
 
    				var simCurGridStore=simCurGrid.getStore();
    				var params = { simUuids:ids,domainUuid:parentNode.parentNode.raw.tid};
    				Ext.apply(simCurGridStore.proxy.extraParams, params);
        			
        			this.run(monitorPanel,'groupMonitorPanel');
        			
        			groupMonitorPanel.setSize(size.width,size.height);
        			groupMonitorPanel.setVisible(true);
        		}
        		
        		
        		if(eType.toUpperCase()=='BKPORT'){
        			var bkpSimTabPanel = Ext.getCmp('bkpSimTabPanel');
          			if(!bkpSimTabPanel){
          				bkpSimTabPanel = Ext.create('app.view.monitor.domain.zone.port.BkpSimTabPanel', {});
        				monitorPanel.add(bkpSimTabPanel);
        				monitorPanel.doLayout();
        			}
        			bkpSimTabPanel.setVisible(true);
        			
        			var cmp = Ext.getCmp('bkpSim15Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {bkpUuid:name,limit:-1});
        			
        			var cmp = Ext.getCmp('bkpSim24Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {bkpUuid:name,limit:-1});
        			
        			var pmdBkpPanel=Ext.getCmp('pmdBkpPanel');
        			pmdBkpPanel.treeName=name;
        			var bkpStore=pmdBkpPanel.store;       			
    		        var params = { uuid:name};
    		        Ext.apply(bkpStore.proxy.extraParams, params);
        			
        			var bkpSim15Grid=Ext.getCmp('bkpSim15Grid');
        			bkpSim15Grid.treeName=name;
        			var sim15GridStore=bkpSim15Grid.getStore();
    				var params = { bkpUuid:name};
    				Ext.apply(sim15GridStore.proxy.extraParams, params);
        			
        			var sim24Grid=Ext.getCmp('bkpSim24Grid');
        			sim24Grid.treeName=name;
        			var sim24GridStore=sim24Grid.getStore();
    				var params = { bkpUuid:name};
    				Ext.apply(sim24GridStore.proxy.extraParams, params);
        			
        			var simCurGrid=Ext.getCmp('bkpSimCurGrid');
        			simCurGrid.treeName=name;
        			simCurGrid.domainUuid=parentNode.parentNode.parentNode.raw.tid;
        			var simCurGridStore=simCurGrid.getStore();
    				var params = { bkpUuid:name,domainUuid:parentNode.parentNode.parentNode.raw.tid};
    				Ext.apply(simCurGridStore.proxy.extraParams, params);
        			
        			var simCdrGrid=Ext.getCmp('bkpSimCdrGrid');
        			simCdrGrid.treeName=name;
        			var simCdrGridStore=simCdrGrid.getStore();
    				var params = { bkpUuid:name};
    				Ext.apply(simCdrGridStore.proxy.extraParams, params);
        			
        			var simSmsGrid=Ext.getCmp('bkpSimSmsGrid');
        			simSmsGrid.treeName=name;
        			var simSmsGridStore=simSmsGrid.getStore();
    				var params = { bkpUuid:name};
    				Ext.apply(simSmsGridStore.proxy.extraParams, params);
        			
        			var simUssdGrid=Ext.getCmp('bkpSimUssdGrid');
        			simUssdGrid.treeName=name;
        			var simUssdGridStore=simUssdGrid.getStore();
    				var params = { bkpUuid:name};
    				Ext.apply(simUssdGridStore.proxy.extraParams, params);
        			
    				this.run(monitorPanel,'bkpSimTabPanel');
    				
        			bkpSimTabPanel.setSize(size.width,size.height);
        		}
        		
        		if(eType.toUpperCase()=='SIM'){
        			var simMonitorPanel = Ext.getCmp('simMonitorPanel');
          			if(!simMonitorPanel){
          				simMonitorPanel = Ext.create('app.view.monitor.group.sim.SimMonitorPanel', {});
        				monitorPanel.add(simMonitorPanel);
        				monitorPanel.doLayout();
        			}
        			simMonitorPanel.setVisible(true);
 
        			var cmp = Ext.getCmp('sim15Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {simUuid:name,limit:-1});
        			
        			var cmp = Ext.getCmp('sim24Panel').down('panel[itemId=chart]');
        			cmp.start = 0;
        			Ext.apply(cmp.originStore.proxy.extraParams
					, {simUuid:name,limit:-1});
        			
        			var pmdSimPanel=Ext.getCmp('pmdSimPanel');
        			pmdSimPanel.treeName=name;
        			
        			var sim15Grid=Ext.getCmp('sim15Grid');
        			sim15Grid.treeName=name;
        			
        			var sim24Grid=Ext.getCmp('sim24Grid');
        			sim24Grid.treeName=name;
        			
        			var simCurGrid=Ext.getCmp('simCurGrid');
        			simCurGrid.treeName=name;
        			simCurGrid.domainUuid=parentNode.parentNode.parentNode.raw.tid;
        			
        			var simCdrGrid=Ext.getCmp('simCdrGrid');
        			simCdrGrid.treeName=name;
        			
        			var simSmsGrid=Ext.getCmp('simSmsGrid');
        			simSmsGrid.treeName=name;
        			
        			var simUssdGrid=Ext.getCmp('simUssdGrid');
        			simUssdGrid.treeName=name;
  
        			var pmdSimPanelStore=pmdSimPanel.store;
    				var params = { uuid:name};
    				Ext.apply(pmdSimPanelStore.proxy.extraParams, params);
        			
        			var sim15GridStore=sim15Grid.getStore();
    				var params = { simUuid:name};
    				Ext.apply(sim15GridStore.proxy.extraParams, params);
        			
        			var sim24GridStore=sim24Grid.getStore();
    				var params = { simUuid:name};
    				Ext.apply(sim24GridStore.proxy.extraParams, params);
        			
        			var simCurGridStore=simCurGrid.getStore();
    				var params = { simUuids:name,domainUuid:parentNode.parentNode.parentNode.raw.tid};
    				Ext.apply(simCurGridStore.proxy.extraParams, params);
        			
        			var simCdrGridStore=simCdrGrid.getStore();
    				var params = { simUuid:name};
    				Ext.apply(simCdrGridStore.proxy.extraParams, params);
        			
        			var simSmsGridStore=simSmsGrid.getStore();
    				var params = { simUuid:name};
    				Ext.apply(simSmsGridStore.proxy.extraParams, params);
        			
        			var simUssdGridStore=simUssdGrid.getStore();
    				var params = { simUuid:name};
    				Ext.apply(simUssdGridStore.proxy.extraParams, params);
        			
        			this.run(monitorPanel,'simMonitorPanel');
        			simMonitorPanel.setSize(size.width,size.height);
        			simMonitorPanel.setVisible(true);
        		}
        		if(eType.toUpperCase()=='CLOUD' 
        			||eType.toUpperCase()=='FNODE' ||eType.toUpperCase()=='NODE'
        					||eType.toUpperCase()=='FROAMZONE' ||eType.toUpperCase()=='ROAMZONE' 
        						||eType.toUpperCase()=='PROC'){
        			var noDateToShow=Ext.getCmp('noDateToShow');
        			noDateToShow.setSize(size.width,size.height);
        			noDateToShow.setVisible(true);
        		}

    		}
        },
		saveStatus:function(monitorPanel,containerId){
        	var container = Ext.getCmp(containerId);
//			treeFn.saveTabStatus(monitorPanel,containerId);
//			treeFn.procTab(monitorPanel,containerId);
			
			var tabPanel = container.down('tabpanel');
			tabPanel.needChange = true;
			for(var i=0; i<tabPanel.items.items.length;i++){
				var container1 = tabPanel.getComponent(i);
				if(container1.down('tabpanel')){
					container1.down('tabpanel').needChange = true;
//	    			treeFn.saveTabStatus(monitorPanel,container1.id);
//	    			treeFn.procTab(monitorPanel,container1.id);
				}
			}
        },
        beforeload:function(containerId){
        	var container = Ext.getCmp(containerId);		
			var tabPanel = container.down('tabpanel');
			for(var i=0; i<tabPanel.items.items.length;i++){
				var container1 = tabPanel.getComponent(i);
    			treeFn.beforeload(container1.id);
			}
        },
        run:function(monitorPanel,containerId){
			this.saveStatus(monitorPanel,containerId);
        	var container = Ext.getCmp(containerId);		
			var tabPanel = container.down('tabpanel');
			var activeTab;			
			if(tabPanel.getActiveTab().down('tabpanel')){
				activeTab = tabPanel.getActiveTab().down('tabpanel').getActiveTab();
			}else{
				activeTab = tabPanel.getActiveTab();
			}
			this.beforeload(containerId);
			treeFn.load(activeTab);
        }
        
});